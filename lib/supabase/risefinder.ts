/**
 * Server-only Supabase client for the RiseFinder pipeline's database.
 *
 * A SECOND PROJECT, NOT A SECOND CLIENT FOR THE SAME ONE. The website's
 * Supabase project holds leads, posts and transcripts. The RiseFinder pipeline
 * writes its entities and snapshots to a different project entirely — it was
 * set up on its own, months apart, and nothing ever needed both until the
 * risers page started answering custom date ranges.
 *
 * `createSupabaseAdminClient()` therefore CANNOT serve this: pointed at the
 * website's project it returns PGRST202 "could not find the function", which
 * reads exactly like a migration that failed to apply rather than a query sent
 * to the wrong database.
 *
 * Needs RISEFINDER_SUPABASE_URL and RISEFINDER_SUPABASE_SERVICE_ROLE_KEY, which
 * must be set in Vercel as well as in .env.local or custom ranges will work
 * locally and fail in production.
 */

import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function createRiseFinderClient(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.RISEFINDER_SUPABASE_URL;
  const key = process.env.RISEFINDER_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    // NAMES THE VARIABLE THAT IS ACTUALLY MISSING, and lists the RISEFINDER_
    // names the deployment can see. "Missing one of these two" cost three
    // rounds of guessing at a name that a dashboard truncates in the middle,
    // when the environment knows the answer exactly.
    //
    // Names only. A variable name is not a secret and a value always is, so
    // nothing here reads process.env[...] for its contents.
    const present = Object.keys(process.env)
      .filter((k) => k.startsWith("RISEFINDER_"))
      .sort();
    const missing = [
      !url && "RISEFINDER_SUPABASE_URL",
      !key && "RISEFINDER_SUPABASE_SERVICE_ROLE_KEY",
    ].filter(Boolean);
    throw new Error(
      `Missing ${missing.join(" and ")}. ` +
        `This deployment can see: ${present.length ? present.join(", ") : "no RISEFINDER_ variables at all"}. ` +
        "These point at the RiseFinder pipeline's Supabase project, which is a " +
        "different project from the website's.",
    );
  }

  // THE SHAPE OF THE VALUE, CHECKED BEFORE THE CLIENT REJECTS IT. createClient
  // answers "Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL", which is
  // accurate and does not say the likeliest cause: the whole .env line was
  // pasted into the dashboard, so the value is
  // "SUPABASE_URL=https://..." rather than "https://...". Quotes and a
  // trailing newline do the same thing and look identical in a form field.
  if (!/^https?:\/\//.test(url.trim())) {
    // SHOWS THE START OF THE VALUE, because describing the mistake twice has
    // not fixed it and the value itself says immediately what was pasted.
    //
    // A Supabase project URL is not a secret -- the same host is shipped to
    // every browser as NEXT_PUBLIC_SUPABASE_URL. A service key very much is,
    // so if the value looks like a JWT it is described rather than echoed, in
    // case the two were pasted into each other's boxes.
    const looksLikeKey = /^ey[A-Za-z0-9_-]{8,}/.test(url.trim());
    const preview = looksLikeKey
      ? "the value looks like a JWT — a service key appears to have been pasted into the URL field"
      : `the value starts: "${url.slice(0, 32)}"`;
    throw new Error(
      "RISEFINDER_SUPABASE_URL does not start with http:// or https://. It is " +
        `${url.length} characters long and ${preview}. It should be exactly ` +
        "https://<project-ref>.supabase.co and nothing else — no variable name, " +
        "no equals sign, no quotes, no second line.",
    );
  }

  cached = createClient(url.trim(), key.trim(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
