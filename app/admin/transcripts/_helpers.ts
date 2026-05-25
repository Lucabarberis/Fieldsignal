/**
 * Helpers for the admin transcripts views. Mirrors app/admin/_helpers.ts.
 */

import { transcriptsRepo, isScheduled } from "@/lib/db/transcripts";
import type { TranscriptMeta } from "@/lib/db/transcript-types";

export type AdminTranscriptsBundle = {
  all: TranscriptMeta[];
  live: TranscriptMeta[];
  scheduled: TranscriptMeta[];
  drafts: TranscriptMeta[];
  counts: {
    all: number;
    scheduled: number;
    drafts: number;
  };
};

export async function loadAdminTranscripts(): Promise<AdminTranscriptsBundle> {
  const all = await transcriptsRepo.list({ includeUnpublished: true });
  const scheduled = all.filter((t) => isScheduled(t));
  const drafts = all.filter((t) => t.status === "draft");
  const live = all.filter((t) => t.status === "published" && !isScheduled(t));
  return {
    all,
    live,
    scheduled,
    drafts,
    counts: {
      all: all.length,
      scheduled: scheduled.length,
      drafts: drafts.length,
    },
  };
}
