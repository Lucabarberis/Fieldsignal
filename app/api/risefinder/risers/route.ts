import { NextResponse } from "next/server";
import { createRiseFinderClient } from "@/lib/supabase/risefinder";
import catalogue from "@/content/data/risefinder.json";
import { entityUrl } from "@/lib/risefinder";

/**
 * Risers over an arbitrary date range.
 *
 * WHY THIS ROUTE EXISTS AT ALL, on a page that is otherwise a static build.
 * The 1, 7 and 30 day windows are precomputed by the Python pipeline and baked
 * into risefinder.json at deploy time, which is why they are instant. "Who was
 * rising on 15 August" and "top app risers between the 10th and the 20th" are
 * not precomputable — the set of possible questions is every pair of dates —
 * so those go live to Postgres, where the whole snapshot history already sits
 * because the pipeline mirrors it there nightly.
 *
 * IT TALKS TO A DIFFERENT SUPABASE PROJECT FROM THE REST OF THE SITE. The
 * pipeline's database is its own project; see lib/supabase/risefinder.ts.
 *
 * THE SERVICE ROLE KEY IS USED AND MUST STAY HERE. `risefinder_risers` is
 * revoked from anon precisely so this cannot be called from a browser with the
 * public key: it scans a 900,000-row table and an unauthenticated caller could
 * ask for a year of every source in a loop. The limit is clamped in the SQL as
 * well as here, so a crafted request cannot widen it.
 *
 * WHAT MAY BE ASKED IS FIXED BY THE CATALOGUE, not by the caller. `source` is
 * looked up in the same risefinder.json the page renders from, and the metric
 * and noise floor come from that entry — so this endpoint cannot be pointed at
 * an arbitrary (source, metric) pair, and it cannot answer with a different
 * noise floor than the precomputed windows used. A reader switching between a
 * fixed window and a custom range gets two answers to the same question, and
 * they have to be computed the same way or one of them is a lie.
 */

/** Widest range the endpoint will answer, in days. */
const MAX_SPAN = 366;
const ISO = /^\d{4}-\d{2}-\d{2}$/;

type Box = {
  id: string;
  /**
   * The snapshot table's own source name. Differs from `id` where one source
   * supplies two boxes — Crunchbase publishes both a rank and a funding-round
   * count, so the ids are "crunchbase:cb_rank" and "crunchbase:cb_funding_rounds"
   * while the rows for both live under source "crunchbase".
   */
  db_source?: string;
  label: string;
  unit_noun: string;
  metric: string;
  metric_key: string | null;
  min_baseline: number;
  lower_is_better: boolean;
};

function daysBetween(from: string, to: string) {
  return (Date.parse(to) - Date.parse(from)) / 86_400_000;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const source = (url.searchParams.get("source") ?? "").trim();
  const from = (url.searchParams.get("from") ?? "").trim();
  const to = (url.searchParams.get("to") ?? "").trim();
  const limit = Math.min(
    Math.max(Number(url.searchParams.get("limit") ?? 25) || 25, 1),
    100,
  );

  const bad = (message: string) =>
    NextResponse.json({ error: message }, { status: 400 });

  if (!ISO.test(from) || !ISO.test(to)) {
    return bad("from and to must be dates in YYYY-MM-DD form.");
  }
  const span = daysBetween(from, to);
  if (!Number.isFinite(span)) return bad("from and to must be real dates.");
  if (span <= 0) return bad("to must be after from.");
  if (span > MAX_SPAN) return bad(`Range must be ${MAX_SPAN} days or fewer.`);

  // Cast through unknown: the JSON's inferred type is a union of every box
  // shape the exporter has ever written, and TypeScript will not narrow it to
  // Box on its own. The fields are validated below rather than by the compiler.
  const box = (catalogue.explorer as unknown as Box[]).find(
    (b) => b.id === source,
  );
  if (!box) return bad("Unknown source.");
  if (!box.metric_key) {
    // The two universe sources are computed from stored rank files on disk, not
    // from the snapshot table, so Postgres cannot answer for them. Said plainly
    // rather than returning an empty list that reads as "nothing moved".
    return bad(
      `${box.label} is computed from stored rank files rather than the snapshot history, so custom ranges are not available for it yet.`,
    );
  }

  // The generated database types are produced from the tables and know nothing
  // about functions added by migration, so `rpc` types its own arguments as
  // `undefined`. Regenerating the types would fix it properly; until then this
  // one call is untyped and its result is shaped by the Row type below.
  // MISSING CREDENTIALS ARE A DEPLOYMENT STATE, NOT A CRASH. The pipeline's
  // Supabase details are a separate pair of environment variables from the
  // website's, so the first deploy after this shipped can legitimately reach
  // here without them. `createRiseFinderClient` throws in that case, which
  // surfaces as an unhandled 500 and an empty console — indistinguishable from
  // the query being broken. Caught and named instead, so the page says what is
  // actually wrong and the fixed windows above carry on working regardless.
  let client;
  try {
    client = createRiseFinderClient();
  } catch {
    return NextResponse.json(
      {
        error:
          "Custom ranges are not configured on this deployment yet. The fixed " +
          "1, 7 and 30 day windows are unaffected.",
      },
      { status: 503 },
    );
  }

  const supabase = client as unknown as {
    rpc: (
      fn: string,
      args: Record<string, unknown>,
    ) => Promise<{ data: unknown; error: { message: string } | null }>;
  };
  const { data, error } = await supabase.rpc("risefinder_risers", {
    p_source: box.db_source ?? source,
    p_metric: box.metric_key,
    p_from: from,
    p_to: to,
    p_min_baseline: box.min_baseline,
    p_limit: limit,
  });

  if (error) {
    console.error("risefinder_risers failed", error);
    return NextResponse.json(
      { error: "Could not query the riser history." },
      { status: 502 },
    );
  }

  type Row = {
    entity_key: string;
    name: string;
    entity_type: string;
    description: string | null;
    listing_url: string | null;
    domain: string | null;
    github_repo: string | null;
    npm_package: string | null;
    pypi_package: string | null;
    hf_model: string | null;
    app_store_id: string | null;
    was: number;
    now_value: number;
    from_day: string;
    to_day: string;
    gain_pct: number;
  };

  const items = ((data ?? []) as Row[]).map((r) => ({
    key: r.entity_key,
    name: r.name,
    url: entityUrl(r.entity_key, r),
    description: r.description?.trim() || null,
    lower_is_better: box.lower_is_better,
    was: r.was,
    now: r.now_value,
    unit: box.metric,
    gain_pct: r.gain_pct,
    from_day: r.from_day,
    to_day: r.to_day,
    // CORROBORATION IS NOT AVAILABLE HERE, and is returned empty rather than
    // omitted. The precomputed windows know it because every source was built
    // in one pass and could be compared; one range query against one source
    // cannot see the others without running the whole set. An empty array
    // renders as "single source", which is the honest reading: this query
    // checked one.
    also_in: [] as string[],
  }));

  return NextResponse.json(
    { source: box.id, label: box.label, from, to, items },
    // A given (source, from, to) never changes once those days are collected,
    // so the answer is cacheable for a long time. Kept to an hour anyway
    // because a range ending today gains rows as today's collection lands.
    { headers: { "Cache-Control": "public, max-age=0, s-maxage=3600" } },
  );
}
