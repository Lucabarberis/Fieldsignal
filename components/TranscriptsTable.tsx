import Link from "next/link";
import { isScheduled } from "@/lib/db/transcripts";
import type { TranscriptMeta } from "@/lib/db/transcript-types";
import { deleteTranscriptAction } from "@/app/admin/transcripts/actions";

/**
 * Admin transcripts table. Mirrors PostsTable but for transcripts.
 *
 *   <TranscriptsTable transcripts={list} emptyMessage="..." emptyCta={...} />
 */
type Props = {
  transcripts: TranscriptMeta[];
  emptyMessage?: string;
  emptyCtaLabel?: string;
  emptyCtaHref?: string;
};

export function TranscriptsTable({
  transcripts,
  emptyMessage = "No transcripts yet.",
  emptyCtaLabel,
  emptyCtaHref,
}: Props) {
  if (transcripts.length === 0) {
    return (
      <div className="bg-paper-2 px-7 py-10 text-center">
        <p className="text-body text-ink-2 mb-4">{emptyMessage}</p>
        {emptyCtaLabel && emptyCtaHref && (
          <Link
            href={emptyCtaHref}
            className="font-mono text-mono uppercase tracking-[0.14em] text-ink hover:text-red transition-colors"
          >
            {emptyCtaLabel} →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="border border-rule">
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-6 px-6 py-3 bg-paper-2 border-b border-rule font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
        <span>Status</span>
        <span>Topic / role</span>
        <span>Date</span>
        <span>Words</span>
        <span className="text-right">Actions</span>
      </div>

      {transcripts.map((t, i) => {
        const sched = isScheduled(t);
        const statusLabel = sched
          ? "◐ Scheduled"
          : t.status === "published"
            ? "● Live"
            : "○ Draft";
        const statusClass = sched
          ? "text-ink"
          : t.status === "published"
            ? "text-red"
            : "text-ink-3";

        return (
          <div
            key={t.slug}
            className={`grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-6 px-6 py-4 items-center ${
              i > 0 ? "border-t border-rule" : ""
            }`}
          >
            <span
              className={`font-mono text-mono uppercase tracking-[0.08em] ${statusClass}`}
            >
              {statusLabel}
            </span>

            <div className="min-w-0">
              <Link
                href={`/admin/transcripts/${t.slug}/edit`}
                className="block text-ink font-sans font-medium text-[15px] hover:text-red transition-colors truncate"
              >
                {t.topicLabel}
              </Link>
              <span className="font-mono text-micro text-ink-3 truncate block">
                {t.expertRole}
              </span>
            </div>

            <span className="font-mono text-micro text-ink-3 uppercase tracking-[0.08em]">
              {new Date(t.publishedAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </span>

            <span className="font-mono text-micro text-ink-3 uppercase tracking-[0.08em]">
              {t.wordCount.toLocaleString()}
            </span>

            <div className="flex gap-3 items-center justify-end">
              {t.status === "published" && !sched && (
                <Link
                  href={`/transcripts/${t.slug}`}
                  target="_blank"
                  className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 hover:text-ink transition-colors"
                >
                  View
                </Link>
              )}
              <Link
                href={`/admin/transcripts/${t.slug}/edit`}
                className="font-mono text-micro uppercase tracking-[0.12em] text-ink hover:text-red transition-colors"
              >
                Edit
              </Link>
              <form action={deleteTranscriptAction}>
                <input type="hidden" name="slug" value={t.slug} />
                <button
                  type="submit"
                  className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 hover:text-red transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}
