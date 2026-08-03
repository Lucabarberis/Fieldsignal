import { NextResponse } from "next/server";
import { leads } from "@/lib/db/leads";

/**
 * RiseFinder briefing signup.
 *
 * Deliberately narrower than /api/contact. That endpoint handles an enquiry —
 * name, company, topic, attribution, a notification email to the team. This
 * one takes an address and nothing else, because asking for more at a signup
 * is how you get no signups.
 *
 * IT ONLY STORES. No welcome email, no confirmation send, nothing outbound.
 * The address lands in the same leads table with topic "risefinder" so it can
 * be counted and told apart. Mailing people is a separate decision with
 * consent obligations attached, and a subscribe form should not quietly start
 * doing it — least of all before anyone has decided what the mail says.
 *
 * Plain form POST in, 303 redirect out, so it works with JavaScript disabled.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  const form = await request.formData();
  const redirect = (path: string) =>
    NextResponse.redirect(new URL(path, request.url), 303);

  // Honeypot. Bots fill every field; the input is hidden from people.
  if (String(form.get("company_website") ?? "").trim()) {
    return redirect("/risefinder?subscribed=1");
  }

  const email = String(form.get("email") ?? "").trim();
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return redirect("/risefinder?error=email");
  }

  try {
    await leads.record({
      name: "RiseFinder subscriber",
      email,
      topic: "risefinder",
      message: "Subscribed to the RiseFinder daily briefing.",
    });
  } catch (err) {
    // A failed write must not look like success — somebody who thinks they
    // subscribed and hears nothing has been told a lie by the interface.
    console.error("[risefinder/subscribe] could not store address", err);
    return redirect("/risefinder?error=store");
  }

  return redirect("/risefinder?subscribed=1");
}
