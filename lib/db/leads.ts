/**
 * ═══════════════════════════════════════════════════════════════════
 * LEADS DATA LAYER
 * ═══════════════════════════════════════════════════════════════════
 *
 * Backs /admin/leads. See supabase/leads.sql for the schema and the
 * reasoning behind the table.
 *
 * TWO CLIENTS, ON PURPOSE:
 *
 *   record()  → anon client, respecting RLS. Called from the PUBLIC
 *               /api/contact route, which must never hold the
 *               service-role key. The insert policy is the only thing
 *               the anon key can do to this table.
 *
 *   list()    → service-role client, bypassing RLS. Called only from
 *               /admin, which proxy.ts gates behind auth.
 * ═══════════════════════════════════════════════════════════════════
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Where a lead came from. */
export type LeadSource = "organic" | "google-ads" | "meta-ads";

/** Outcome. Anything from meeting_booked on counts toward cost per meeting. */
export const LEAD_STATUSES = [
  "new",
  "contacted",
  "meeting_booked",
  "meeting_held",
  "won",
  "lost",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Statuses that mean a meeting actually got on the calendar. */
const MEETING_STATUSES: readonly LeadStatus[] = [
  "meeting_booked",
  "meeting_held",
  "won",
];

export function isMeeting(status: LeadStatus): boolean {
  return MEETING_STATUSES.includes(status);
}

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  meeting_booked: "Meeting booked",
  meeting_held: "Meeting held",
  won: "Won",
  lost: "Lost",
};

export interface Lead {
  id: string;
  submittedAt: string;
  name: string;
  company: string | null;
  email: string;
  message: string | null;
  source: LeadSource;
  keyword: string | null;
  keywordSlug: string | null;
  gclid: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  landingPath: string | null;
  status: LeadStatus;
  meetingAt: string | null;
  notes: string | null;
  /** The acknowledgement we sent them, or the marker recording that it failed. */
  autoReply: string | null;
}

/** What /api/contact hands over. Everything but name/email is optional. */
export interface LeadInput {
  name: string;
  email: string;
  company?: string;
  message?: string;
  source?: LeadSource;
  keyword?: string;
  keywordSlug?: string;
  gclid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  landingPath?: string;
  autoReply?: string;
}

/** One row of the per-keyword rollup — the number the ad test exists to find. */
export interface KeywordRollup {
  keyword: string;
  keywordSlug: string;
  leads: number;
  meetings: number;
}

/**
 * The hand-written `Database` type doesn't know about `leads`. Drop the
 * generic rather than hand-editing the generated file — same approach
 * as lib/db/social.ts.
 */
type AnyClient = SupabaseClient;

/** Supabase snake_case row → our camelCase Lead. */
function toLead(row: Record<string, unknown>): Lead {
  return {
    id: row.id as string,
    submittedAt: row.submitted_at as string,
    name: row.name as string,
    company: (row.company as string) ?? null,
    email: row.email as string,
    message: (row.message as string) ?? null,
    source: (row.source as LeadSource) ?? "organic",
    keyword: (row.keyword as string) ?? null,
    keywordSlug: (row.keyword_slug as string) ?? null,
    gclid: (row.gclid as string) ?? null,
    utmSource: (row.utm_source as string) ?? null,
    utmMedium: (row.utm_medium as string) ?? null,
    utmCampaign: (row.utm_campaign as string) ?? null,
    utmTerm: (row.utm_term as string) ?? null,
    landingPath: (row.landing_path as string) ?? null,
    status: (row.status as LeadStatus) ?? "new",
    meetingAt: (row.meeting_at as string) ?? null,
    notes: (row.notes as string) ?? null,
    autoReply: (row.auto_reply as string) ?? null,
  };
}

export const leads = {
  /**
   * Store a submission. Called from the public contact route with the
   * anon client, so this can only ever insert — never read.
   *
   * Throws on failure. The caller treats it as best-effort: the
   * notification email is the backstop, and losing a sheet row or a
   * database row must never lose the enquiry itself.
   */
  async record(input: LeadInput): Promise<void> {
    const supabase = (await createSupabaseServerClient()) as unknown as AnyClient;

    const row: Record<string, unknown> = {
      name: input.name,
      email: input.email,
      company: input.company || null,
      message: input.message || null,
      source: input.source ?? "organic",
      keyword: input.keyword || null,
      keyword_slug: input.keywordSlug || null,
      gclid: input.gclid || null,
      utm_source: input.utmSource || null,
      utm_medium: input.utmMedium || null,
      utm_campaign: input.utmCampaign || null,
      utm_term: input.utmTerm || null,
      landing_path: input.landingPath || null,
      auto_reply: input.autoReply || null,
    };

    const { error } = await supabase.from("leads").insert(row);
    if (!error) return;

    // `auto_reply` was added after the table shipped. If this build is
    // running against a database where supabase/leads-auto-reply.sql has
    // not been applied yet, drop the field and keep the lead — losing an
    // enquiry over one nullable column would be an absurd trade.
    if (error.message.includes("auto_reply")) {
      delete row.auto_reply;
      const retry = await supabase.from("leads").insert(row);
      if (!retry.error) return;
      throw new Error(`leads.record failed: ${retry.error.message}`);
    }

    throw new Error(`leads.record failed: ${error.message}`);
  },

  /** Every lead, newest first. Admin only. */
  async list(): Promise<Lead[]> {
    const supabase = createSupabaseAdminClient() as unknown as AnyClient;

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) {
      throw new Error(
        `leads.list failed: ${error.message}. Did you run supabase/leads.sql?`,
      );
    }

    return (data ?? []).map(toLead);
  },

  /** Set a lead's outcome. Admin only. */
  async setStatus(id: string, status: LeadStatus): Promise<void> {
    if (!LEAD_STATUSES.includes(status)) {
      throw new Error(`Invalid status "${status}"`);
    }

    const supabase = createSupabaseAdminClient() as unknown as AnyClient;

    const { error } = await supabase
      .from("leads")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) throw new Error(`leads.setStatus failed: ${error.message}`);
  },
};

/**
 * Leads and meetings grouped by keyword, busiest first.
 *
 * Divide Google Ads spend for a keyword by `leads` for cost per lead,
 * and by `meetings` for cost per meeting. Organic leads carry no
 * keyword and are excluded.
 */
export function rollupByKeyword(all: Lead[]): KeywordRollup[] {
  const byslug = new Map<string, KeywordRollup>();

  for (const lead of all) {
    if (!lead.keywordSlug) continue;

    const row = byslug.get(lead.keywordSlug) ?? {
      keyword: lead.keyword ?? lead.keywordSlug,
      keywordSlug: lead.keywordSlug,
      leads: 0,
      meetings: 0,
    };

    row.leads += 1;
    if (isMeeting(lead.status)) row.meetings += 1;
    byslug.set(lead.keywordSlug, row);
  }

  return [...byslug.values()].sort(
    (a, b) => b.leads - a.leads || a.keyword.localeCompare(b.keyword),
  );
}
