"use server";

import { revalidatePath } from "next/cache";
import { leads, LEAD_STATUSES, type LeadStatus } from "@/lib/db/leads";

/**
 * Server actions for the leads admin.
 *
 * Only one for now: move a lead along the pipeline. Marking a lead
 * "meeting booked" is what makes cost per meeting computable before the
 * Calendly webhook exists to do it automatically.
 *
 * Reachable only from /admin, which proxy.ts gates behind auth.
 */

export async function setLeadStatusAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim() as LeadStatus;

  if (!id) throw new Error("setLeadStatusAction: missing lead id");
  if (!LEAD_STATUSES.includes(status)) {
    throw new Error(`setLeadStatusAction: invalid status "${status}"`);
  }

  await leads.setStatus(id, status);
  revalidatePath("/admin/leads");
}
