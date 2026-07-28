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
 * The message is shown INLINE rather than behind a toggle. It was
 * collapsed first time round and went unnoticed, which is a fair verdict
 * on hiding the one thing you open the page to read.
 *
 * Everything else — every column the Google Sheet carries — sits behind
 * "All fields", including empty ones, so it's obvious when something
 * didn't come through rather than merely absent.
 */

const SHORT = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const FULL = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const COLS = "grid-cols-[auto_1fr_auto_auto_auto]";

/** Every stored field, in the order the sheet lists them. */
function allFields(lead: Lead): { label: string; value: string }[] {
  return [
    { label: "Submitted", value: FULL.format(new Date(lead.submittedAt)) },
    { label: "Name", value: lead.name },
    { label: "Company", value: lead.company ?? "" },
    { label: "Email", value: lead.email },
    { label: "Source", value: lead.source },
    { label: "Keyword", value: lead.keyword ?? "" },
    { label: "Keyword slug", value: lead.keywordSlug ?? "" },
    { label: "GCLID", value: lead.gclid ?? "" },
    { label: "UTM source", value: lead.utmSource ?? "" },
    { label: "UTM medium", value: lead.utmMedium ?? "" },
    { label: "UTM campaign", value: lead.utmCampaign ?? "" },
    { label: "UTM term", value: lead.utmTerm ?? "" },
    { label: "Landing page", value: lead.landingPath ?? "" },
    { label: "Status", value: STATUS_LABELS[lead.status] },
    {
      label: "Meeting at",
      value: lead.meetingAt ? FULL.format(new Date(lead.meetingAt)) : "",
    },
  ];
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

        return (
          <div key={lead.id} className={i > 0 ? "border-t border-rule" : ""}>
            <div className={`grid ${COLS} gap-x-6 px-6 pt-4 items-center`}>
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
                {SHORT.format(new Date(lead.submittedAt))}
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

            {/* The enquiry itself — always visible. */}
            <div className="px-6 pt-3">
              <p className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mb-2">
                Message
              </p>
              {lead.message ? (
                <p className="text-body text-ink whitespace-pre-wrap bg-paper-2 border-l-4 border-rule-2 px-4 py-3 max-w-3xl">
                  {lead.message}
                </p>
              ) : (
                <p className="text-body text-ink-3">(no message)</p>
              )}
            </div>

            <details className="px-6 py-4 group">
              <summary className="inline-flex items-center gap-2 border border-rule-2 px-3 py-1.5 font-mono text-micro uppercase tracking-[0.12em] text-ink-2 hover:border-ink hover:text-ink transition-colors cursor-pointer select-none">
                All fields
              </summary>

              <dl className="mt-4 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-6 gap-y-2 max-w-3xl">
                {allFields(lead).map((f) => (
                  <div key={f.label} className="contents">
                    <dt className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
                      {f.label}
                    </dt>
                    <dd
                      className={`font-mono text-micro tracking-[0.04em] break-words ${
                        f.value ? "text-ink-2" : "text-ink-3"
                      }`}
                    >
                      {f.value || "—"}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 mt-5 mb-2">
                Auto reply sent to them
              </p>
              <p
                className={`text-body whitespace-pre-wrap max-w-3xl ${
                  lead.autoReply?.startsWith("(")
                    ? "text-red font-medium"
                    : "text-ink-2"
                }`}
              >
                {lead.autoReply ?? "— (not recorded for this lead)"}
              </p>
            </details>
          </div>
        );
      })}
    </div>
  );
}
