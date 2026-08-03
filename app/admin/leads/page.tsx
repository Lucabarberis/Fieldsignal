import { LeadsTable } from "@/components/LeadsTable";
import { leads, rollupByKeyword, isMeeting } from "@/lib/db/leads";
import { isSubscriber } from "@/lib/risefinder";

/**
 * /admin/leads — every enquiry, and what each keyword actually bought.
 *
 * The rollup at the top is the point of the page: leads and meetings per
 * keyword. Put the spend for a keyword next to those two numbers and you
 * have cost per lead and cost per meeting, which is the entire question
 * the paid-search test exists to answer.
 */

export const metadata = { title: "Leads — FieldSignal" };

/** Always read fresh — a lead that arrived a minute ago must show up. */
export const dynamic = "force-dynamic";

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
        {label}
      </span>
      <span className="font-sans text-wide text-ink">{value}</span>
    </div>
  );
}

export default async function AdminLeadsPage() {
  // Until supabase/leads.sql has been run the table doesn't exist. That's
  // an expected first-visit state, not a crash — say what to do about it.
  let all;
  try {
    all = await leads.list();
  } catch (err) {
    return (
      <div className="px-4 sm:px-9 py-12 max-w-3xl">
        <h1 className="font-sans font-medium text-section leading-[1] tracking-[-0.022em] text-ink">
          Leads
        </h1>
        <div className="bg-paper-2 border-l-4 border-red px-5 py-4 mt-6">
          <p className="text-body text-ink font-medium">
            The leads table doesn&apos;t exist yet.
          </p>
        </div>
        <p className="text-body text-ink-2 mt-4">
          Open the Supabase SQL editor, paste the contents of{" "}
          <code className="font-mono text-mono">supabase/leads.sql</code>, and
          run it once. Reload this page afterwards.
        </p>
        <p className="font-mono text-micro text-ink-3 mt-6 break-words">
          {err instanceof Error ? err.message : String(err)}
        </p>
      </div>
    );
  }

  // RiseFinder subscribers live in this table too, and they are not leads.
  // Counting them here would make cost per lead fall every time somebody
  // signed up for a free briefing — a number improving for a reason that has
  // nothing to do with the ads it exists to measure. They have their own page.
  all = all.filter((l) => !isSubscriber(l));

  const paid = all.filter((l) => l.source !== "organic");
  const meetings = all.filter((l) => isMeeting(l.status));
  const paidMeetings = paid.filter((l) => isMeeting(l.status));
  const rollup = rollupByKeyword(all);

  return (
    <div className="px-4 sm:px-9 py-12">
      <div className="mb-8">
        <h1 className="font-sans font-medium text-section leading-[1] tracking-[-0.022em] text-ink">
          Leads
        </h1>
        <p className="font-mono text-mono uppercase tracking-[0.08em] text-ink-3 mt-2">
          {all.length} total · {paid.length} from ads · {meetings.length} meeting
          {meetings.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="bg-paper-2 border border-rule px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <Stat label="All leads" value={all.length} />
        <Stat label="From ads" value={paid.length} />
        <Stat label="Meetings booked" value={meetings.length} />
        <Stat
          label="Ads → meeting"
          value={
            paid.length === 0
              ? "—"
              : `${Math.round((paidMeetings.length / paid.length) * 100)}%`
          }
        />
      </div>

      {rollup.length > 0 && (
        <section className="mb-12">
          <div className="bg-paper-2 px-4 sm:px-6 py-3.5 border-y border-rule-2 flex justify-between items-center flex-wrap gap-2 font-mono text-mono uppercase">
            <span>
              <span className="text-red font-semibold">01</span>
              <span className="mx-2 text-ink-3">/</span>
              <h2 className="inline m-0 p-0 text-mono font-medium text-ink">
                By Keyword
              </h2>
            </span>
            <span className="text-ink-3">
              Divide spend by these for cost per lead and per meeting
            </span>
          </div>

          <div className="border-x border-b border-rule">
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 px-6 py-3 bg-paper-2 border-b border-rule font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
              <span>Keyword</span>
              <span className="text-right">Leads</span>
              <span className="text-right">Meetings</span>
            </div>
            {rollup.map((row, i) => (
              <div
                key={row.keywordSlug}
                className={`grid grid-cols-[1fr_auto_auto] gap-x-6 px-6 py-3 items-center ${
                  i > 0 ? "border-t border-rule" : ""
                }`}
              >
                <span className="text-body text-ink truncate">{row.keyword}</span>
                <span className="font-mono text-mono text-ink text-right tabular-nums">
                  {row.leads}
                </span>
                <span
                  className={`font-mono text-mono text-right tabular-nums ${
                    row.meetings > 0 ? "text-red font-semibold" : "text-ink-3"
                  }`}
                >
                  {row.meetings}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="bg-paper-2 px-4 sm:px-6 py-3.5 border-y border-rule-2 flex justify-between items-center flex-wrap gap-2 font-mono text-mono uppercase mb-px">
        <span>
          <span className="text-red font-semibold">
            {rollup.length > 0 ? "02" : "01"}
          </span>
          <span className="mx-2 text-ink-3">/</span>
          <h2 className="inline m-0 p-0 text-mono font-medium text-ink">
            Every Lead
          </h2>
        </span>
        <span className="text-ink-3">Newest first</span>
      </div>

      <LeadsTable
        rows={all}
        emptyMessage="No leads yet. They'll appear here the moment someone submits the contact form."
      />
    </div>
  );
}
