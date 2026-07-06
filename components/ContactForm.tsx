import { SITE } from "@/lib/site";

/**
 * Contact form — posts to /api/contact, which emails the enquiry via
 * Resend and (optionally) logs it to a Google Sheet. Plain HTML form,
 * no client JS required.
 */

const LABEL =
  "block font-mono text-micro uppercase tracking-[0.12em] text-ink-2 mb-2";
const FIELD =
  "w-full bg-paper-3 border border-rule-2 rounded-none appearance-none px-4 py-3 font-sans text-[15px] leading-[1.4] text-ink placeholder:text-ink-3 focus:outline-none focus:border-ink transition-colors";

export function ContactForm() {
  return (
    <form action="/api/contact" method="POST" className="max-w-3xl">
      {/* honeypot — bots fill it, humans never see it */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label htmlFor="cf-name" className={LABEL}>
            Full name
          </label>
          <input
            id="cf-name"
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="cf-company" className={LABEL}>
            Company
          </label>
          <input
            id="cf-company"
            type="text"
            name="company"
            required
            autoComplete="organization"
            placeholder="Your company"
            className={FIELD}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-email" className={LABEL}>
            Work email
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@yourcompany.com"
            className={FIELD}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className={LABEL}>
            How can we help?
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            placeholder="Industry, role or decision you're researching — a couple of sentences is plenty."
            className={FIELD}
          />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 mt-7 bg-red text-paper px-6 py-3.5 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors cursor-pointer"
      >
        Send Message →
      </button>
      <p className="font-mono text-micro text-ink-3 uppercase tracking-[0.08em] mt-4">
        Lands directly with a senior researcher · response &lt; 4h, {SITE.hours}
      </p>
    </form>
  );
}
