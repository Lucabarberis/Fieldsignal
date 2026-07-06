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
