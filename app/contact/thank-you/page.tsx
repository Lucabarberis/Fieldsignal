import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { TrackFormSubmit } from "@/components/TrackFormSubmit";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Message Received",
  description: "Your enquiry is with a senior researcher. Response under 4 hours during business hours.",
  path: "/contact/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <>
      <TrackFormSubmit />
      <PageHeader
        current="Thank you"
        title="Message received."
        lede={
          <>
            Your enquiry is with a senior researcher — <b>not a triage queue</b>. Typical response is under 4 hours, {SITE.hours}.
          </>
        }
        meta={[
          { label: "Response time", value: "< 4h typical" },
          { label: "Working week", value: SITE.hours },
        ]}
      />

      <div className="px-4 sm:px-9 py-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3.5 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-red transition-colors"
        >
          Back to Home →
        </Link>
        <Link
          href="/transcripts"
          className="inline-flex items-center gap-2 border border-ink text-ink px-6 py-3.5 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors"
        >
          Browse Transcripts →
        </Link>
      </div>
    </>
  );
}
