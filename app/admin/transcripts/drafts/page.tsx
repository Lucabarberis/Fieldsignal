import Link from "next/link";
import { AdminTranscriptTabs } from "@/components/AdminTranscriptTabs";
import { TranscriptsTable } from "@/components/TranscriptsTable";
import { loadAdminTranscripts } from "../_helpers";

export default async function DraftTranscriptsPage() {
  const { drafts, counts } = await loadAdminTranscripts();

  return (
    <div className="px-9 py-12">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-sans font-medium text-section leading-[1] tracking-[-0.022em] text-ink">
            Drafts
          </h1>
          <p className="font-mono text-mono uppercase tracking-[0.08em] text-ink-3 mt-2">
            {counts.drafts} draft transcript{counts.drafts === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/admin/transcripts/new"
          className="bg-red text-paper px-6 py-3 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors"
        >
          New transcript →
        </Link>
      </div>

      <AdminTranscriptTabs active="drafts" counts={counts} />

      <TranscriptsTable
        transcripts={drafts}
        emptyMessage="No drafts. Start one to save it here without publishing."
        emptyCtaLabel="Start a draft"
        emptyCtaHref="/admin/transcripts/new"
      />
    </div>
  );
}
