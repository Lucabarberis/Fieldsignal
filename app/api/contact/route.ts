import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

/**
 * Contact form endpoint.
 *
 * Delivers each enquiry two ways:
 *  1. Email to CONTACT_TO via Resend (required — RESEND_API_KEY must be set)
 *  2. Row appended to a Google Sheet via Apps Script webhook
 *     (optional — set SHEETS_WEBHOOK_URL to enable)
 *
 * Plain HTML form POST in, 303 redirect out — works without client JS.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

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
      subject: `New enquiry — ${name}${company ? `, ${company}` : ""}`,
      text: [
        `Name:    ${name}`,
        `Company: ${company || "—"}`,
        `Email:   ${email}`,
        ``,
        `Message:`,
        message,
        ``,
        `— sent from the contact form at ${SITE.url}/contact`,
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
  try {
    const firstName =
      name
        .split(/\s+/)[0]
        .replace(/[^\p{L}\p{M}'’-]/gu, "")
        .slice(0, 30) || "there";
    const autoReplyFrom =
      process.env.AUTOREPLY_FROM ?? `Miles at FieldSignal <${SITE.contactEmail}>`;

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: autoReplyFrom,
        to: [email],
        subject: "Got your message",
        text: [
          `Hi ${firstName},`,
          ``,
          `Thanks for reaching out — your message just landed in my inbox, and I read every one personally.`,
          ``,
          `I'll come back to you shortly, usually within a few hours on business days. If it's urgent, just reply to this email and say so — I'll bump it up.`,
          ``,
          `Talking soon,`,
          ``,
          `Miles`,
          `FieldSignal · fieldsignalhq.com`,
        ].join("\n"),
      }),
    });
  } catch (err) {
    console.error("[contact] auto-reply failed", err);
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
        }),
      });
    } catch (err) {
      console.error("[contact] Sheets webhook failed", err);
    }
  }

  return redirect("/contact/thank-you");
}
