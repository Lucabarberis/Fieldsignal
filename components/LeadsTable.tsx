import {
  LEAD_STATUSES,
  STATUS_LABELS,
  isMeeting,
  type Lead,
} from "@/lib/db/leads";
import { setLeadStatusAction } from "@/app/admin/leads/actions";

/**
 * Admin leads table.
 *
 * Each lead is a summary row plus a <details> holding what they actually
 * wrote — otherwise the only way to read an enquiry is to go and find the
 * notification email, which defeats the point of having the list.
 *
 * <details> rather than a client component: no JS, no state, and the
 * status form stays outside the <summary> so clicking the select doesn't
 * toggle the panel.
 */

const DATE = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const COLS = "grid-cols-[auto_1fr_auto_auto_auto]";

/** Attribution worth seeing when a row is opened, in display order. */
function traceLine(lead: Lead): string {
  return [
    lead.landingPath,
    lead.utmCampaign && `campaign: ${lead.utmCampaign}`,
    lead.utmTerm && `term: ${lead.utmTerm}`,
    lead.gclid && `gclid: ${lead.gclid}`,
  ]
    .filter(Boolean)
    .join("  ·  ");
}

export function LeadsTable({
  rows,
  emptyMessage = "No leads yet.",
}: {
  rows: Lead[];
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="bg-paper-2 px-7 py-10 text-center">
        <p className="text-body text-ink-2">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="border border-rule">
      <div
        className={`grid ${COLS} gap-x-6 px-6 py-3 bg-paper-2 border-b border-rule font-mono text-micro uppercase tracking-[0.12em] text-ink-3`}
      >
        <span>Source</span>
        <span>Who</span>
        <span>Keyword</span>
        <span>Received</span>
        <span className="text-right">Status</span>
      </div>

      {rows.map((lead, i) => {
        const paid = lead.source !== "organic";
        const trace = traceLine(lead);

        return (
          <div key={lead.id} className={i > 0 ? "border-t border-rule" : ""}>
            <div className={`grid ${COLS} gap-x-6 px-6 py-4 items-center`}>
              <span
                className={`font-mono text-micro uppercase tracking-[0.1em] ${
                  paid ? "text-red font-semibold" : "text-ink-3"
                }`}
              >
                {paid ? "● Ads" : "○ Organic"}
              </span>

              <span className="min-w-0">
                <span className="block text-body text-ink truncate">
                  {lead.name}
                  {lead.company ? (
                    <span className="text-ink-3"> · {lead.company}</span>
                  ) : null}
                </span>
                <a
                  href={`mailto:${lead.email}`}
                  className="block font-mono text-micro tracking-[0.04em] text-ink-2 hover:text-red transition-colors truncate"
                >
                  {lead.email}
                </a>
              </span>

              <span className="font-mono text-micro tracking-[0.04em] text-ink-2">
                {lead.keyword ?? "—"}
              </span>

              <span className="font-mono text-micro tracking-[0.04em] text-ink-3 whitespace-nowrap">
                {DATE.format(new Date(lead.submittedAt))}
              </span>

              <form
                action={setLeadStatusAction}
                className="flex justify-end items-center gap-2"
              >
                <input type="hidden" name="id" value={lead.id} />
                <select
                  name="status"
                  defaultValue={lead.status}
                  aria-label={`Status for ${lead.name}`}
                  className={`bg-paper-3 border border-rule-2 rounded-none appearance-none px-3 py-1.5 font-mono text-micro uppercase tracking-[0.1em] cursor-pointer focus:outline-none focus:border-ink transition-colors ${
                    isMeeting(lead.status)
                      ? "text-red font-semibold"
                      : "text-ink-2"
                  }`}
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="font-mono text-micro uppercase tracking-[0.1em] text-ink-3 hover:text-red transition-colors cursor-pointer"
                >
                  Save
                </button>
              </form>
            </div>

            {(lead.message || trace) && (
              <details className="px-6 pb-4 -mt-1">
                <summary className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 hover:text-red transition-colors cursor-pointer">
                  What they wrote
                </summary>
                {lead.message && (
                  <p className="text-body text-ink-2 whitespace-pre-wrap mt-3 max-w-3xl border-l-4 border-rule-2 pl-4">
                    {lead.message}
                  </p>
                )}
                {trace && (
                  <p className="font-mono text-micro tracking-[0.04em] text-ink-3 mt-3 break-words">
                    {trace}
                  </p>
                )}
              </details>
            )}
          </div>
        );
      })}
    </div>
  );
}
