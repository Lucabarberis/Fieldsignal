import { SectionBand } from "@/components/SectionBand";

/**
 * Email capture for the daily briefing.
 *
 * WHY THIS IS ON THE PAGE AT ALL. Nobody bookmarks a URL and checks it every
 * morning. A daily briefing is delivered, not visited — the webpage is where
 * somebody decides whether they want it, and email is where they actually
 * read it. Without this the page has no way of turning a reader into anything.
 *
 * A PLAIN FORM POST, no client JS. Same approach as /contact: the browser does
 * the submitting, so it works with scripts blocked and there is no hydration
 * cost on an otherwise static page.
 *
 * IT ONLY CAPTURES. Nothing is sent to anyone from here — the address lands in
 * the same leads table the contact form writes to, tagged so it can be told
 * apart. Actually mailing people is a separate, deliberate decision with
 * consent obligations attached, and it is not something a signup form should
 * quietly start doing.
 */
export function RiseFinderSubscribe({ num = "03" }: { num?: string }) {
  return (
    <>
      <SectionBand num={num} label="Get it by email" meta="Every morning" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <p className="text-body text-ink-2 mb-6">
          The briefing is written once a day. Leave an address and it comes to
          you instead of you coming to it.
        </p>
        <form
          action="/api/risefinder/subscribe"
          method="POST"
          className="flex flex-col sm:flex-row max-w-xl"
        >
          <label htmlFor="rf-email" className="sr-only">
            Email address
          </label>
          {/* The field needs a background AND a border. The first version used
              bg-paper, which is the page's own background — the input was
              invisible and the placeholder looked like stray body text. */}
          <input
            id="rf-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className="flex-1 bg-paper-3 border border-ink px-4 py-3.5 font-mono text-mono text-ink placeholder:text-ink-3 outline-none focus:border-red sm:border-r-0"
          />
          {/* Bots fill everything; humans never see this. */}
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <button
            type="submit"
            className="bg-ink text-paper border border-ink px-6 py-3.5 font-mono text-micro uppercase tracking-[0.14em] font-medium hover:bg-red hover:border-red transition-colors mt-px sm:mt-0"
          >
            Subscribe →
          </button>
        </form>
        <p className="mt-4 font-mono text-micro uppercase tracking-[0.08em] text-ink-3">
          One email a day. Unsubscribe in one click.
        </p>
      </div>
    </>
  );
}
