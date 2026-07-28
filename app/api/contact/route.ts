import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { isLandingPageSlug, LANDING_PAGE_BY_SLUG } from "@/lib/landing-pages";
import { leads } from "@/lib/db/leads";

/**
 * Contact form endpoint.
 *
 * Delivers each enquiry two ways:
 *  1. Email to CONTACT_TO via Resend (required — RESEND_API_KEY must be set)
 *  2. Row appended to a Google Sheet via Apps Script webhook
 *     (optional — set SHEETS_WEBHOOK_URL to enable)
 *
 * Plain HTML form POST in, 303 redirect out — works without client JS.
 *
 * Leads from paid-search landing pages (/lp/*) additionally carry the
 * keyword that paid for them plus the ad click's tracking parameters, so
 * cost per lead can be read per keyword rather than blended. Those fields
 * are absent on the organic /contact form and simply stay empty.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Ad-click parameters carried through from the landing page. */
const TRACKING_FIELDS = [
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "landing_path",
] as const;

export async function POST(request: Request) {
  const form = await request.formData();

  const redirect = (path: string) =>
    NextResponse.redirect(new URL(path, request.url), 303);

  // Honeypot filled → bot. Pretend success, deliver nothing.
  if (String(form.get("_honey") ?? "").trim()) {
    return redirect("/contact/thank-you");
  }

  const name = String(form.get("name") ?? "").trim();
  const company = String(form.get("company") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return redirect("/contact?error=invalid");
  }

  // Attribution. `kw` is only trusted if it names a real landing page —
  // that keeps arbitrary submitted text out of the notification email and
  // out of the lead sheet.
  const kwRaw = String(form.get("kw") ?? "").trim();
  const kw = isLandingPageSlug(kwRaw) ? kwRaw : "";
  const keyword = kw ? LANDING_PAGE_BY_SLUG[kw].keyword : "";

  const tracking: Record<string, string> = {};
  for (const field of TRACKING_FIELDS) {
    const value = String(form.get(field) ?? "")
      .trim()
      .slice(0, 200);
    if (value) tracking[field] = value;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY not set — enquiry NOT delivered", {
      name,
      company,
      email,
    });
    return redirect("/contact?error=send");
  }

  const to = process.env.CONTACT_TO ?? SITE.contactEmail;
  const from =
    process.env.CONTACT_FROM ?? `FieldSignal Website <contact@${SITE.domain}>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `${kw ? "[Ads] " : ""}New enquiry: ${name}${company ? `, ${company}` : ""}`,
      text: [
        `Name:    ${name}`,
        `Company: ${company || "(not given)"}`,
        `Email:   ${email}`,
        ``,
        `Message:`,
        message,
        ``,
        ...(kw
          ? [
              `── Paid search ─────────────────────────────`,
              `Keyword: ${keyword}`,
              `Page:    ${SITE.url}/lp/${kw}`,
              ...TRACKING_FIELDS.filter((f) => tracking[f]).map(
                (f) => `${f.padEnd(8)} ${tracking[f]}`,
              ),
              ``,
            ]
          : []),
        `Sent from the contact form at ${SITE.url}${tracking.landing_path ?? "/contact"}`,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return redirect("/contact?error=send");
  }

  // Personal auto-reply from Miles. Best-effort: a failure here must not
  // fail the submission. Body is fully static (plus a sanitised first
  // name) so the form can't be abused to send arbitrary content.
  const firstName =
    name
      .split(/\s+/)[0]
      .replace(/[^\p{L}\p{M}'’-]/gu, "")
      .slice(0, 30) || "there";
  const replyText = [
    `Hi ${firstName},`,
    ``,
    `Thanks for getting in touch. Your message is sitting in my inbox and I read every one myself.`,
    ``,
    `You'll hear back from me shortly, usually within a few hours on a weekday. If it can't wait, reply to this email and tell me and I'll get to yours first.`,
    ``,
    `Talking soon,`,
    ``,
    `Miles`,
    `FieldSignal`,
    `fieldsignalhq.com`,
  ].join("\n");

  // Recorded in the sheet: the exact text sent, or a failure marker.
  let autoReplyRecord = "(auto reply failed to send)";
  try {
    const autoReplyFrom =
      process.env.AUTOREPLY_FROM ?? `Miles at FieldSignal <${SITE.contactEmail}>`;

    const reply = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: autoReplyFrom,
        to: [email],
        subject: "Got your message",
        text: replyText,
      }),
    });
    if (reply.ok) autoReplyRecord = replyText;
    else console.error("[contact] auto-reply error", reply.status, await reply.text());
  } catch (err) {
    console.error("[contact] auto-reply failed", err);
  }

  // Lead record — the durable one, and the row a Calendly booking will
  // later attach itself to. Best-effort like the sheet: the email above
  // has already gone, so a database failure must not fail the request.
  try {
    await leads.record({
      name,
      email,
      company,
      message,
      source: kw ? "google-ads" : "organic",
      keyword,
      keywordSlug: kw,
      gclid: tracking.gclid,
      utmSource: tracking.utm_source,
      utmMedium: tracking.utm_medium,
      utmCampaign: tracking.utm_campaign,
      utmTerm: tracking.utm_term,
      landingPath: tracking.landing_path,
    });
  } catch (err) {
    console.error("[contact] lead record failed", err);
  }

  // Lead log — best-effort; a sheet failure must never lose the email.
  const webhook = process.env.SHEETS_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submittedAt: new Date().toISOString(),
          name,
          company,
          email,
          message,
          autoReply: autoReplyRecord,
          // Paid-search attribution. Empty on organic /contact submissions.
          // NOTE: the Apps Script must be updated to write these to columns —
          // until then they arrive in the payload but are not recorded.
          source: kw ? "google-ads" : "organic",
          keyword,
          keywordSlug: kw,
          gclid: tracking.gclid ?? "",
          utmSource: tracking.utm_source ?? "",
          utmMedium: tracking.utm_medium ?? "",
          utmCampaign: tracking.utm_campaign ?? "",
          utmTerm: tracking.utm_term ?? "",
          landingPath: tracking.landing_path ?? "",
        }),
      });
    } catch (err) {
      console.error("[contact] Sheets webhook failed", err);
    }
  }

  // Paid-search leads land on the ads thank-you page, which fires the
  // conversion event and offers the scheduling link as the next step.
  return redirect(kw ? `/lp/thank-you?kw=${encodeURIComponent(kw)}` : "/contact/thank-you");
}
