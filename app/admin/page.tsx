import Link from "next/link";
import { posts } from "@/lib/db/posts";
import { loadAdminTranscripts } from "./transcripts/_helpers";
import { socialPostedCount, leadCounts } from "@/lib/db/admin-counts";

/**
 * /admin — the hub.
 *
 * Four sections is one too many for a text nav to carry, so this is the
 * front door. The posts list that used to live here moved to /admin/posts.
 *
 * The line at the foot of each card is the point of the page. A total on
 * its own is decoration; "3 drafts · 2 scheduled" is the thing you'd act
 * on. Cards with nothing pending say "nothing outstanding" rather than
 * going blank, so silence is never ambiguous.
 */

export const dynamic = "force-dynamic";

/** How far ahead the publishing schedule looks. */
const UPCOMING_DAYS = 7;

type Card = {
  href: string;
  label: string;
  blurb: string;
  total: string;
  totalLabel: string;
  /** Outstanding work. Empty means nothing needs doing. */
  attention: string[];
};

/** "3 drafts" / "1 draft" / "" when there are none. */
function plural(n: number, one: string, many = `${one}s`): string {
  if (n <= 0) return "";
  return `${n} ${n === 1 ? one : many}`;
}

const DAY = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

function SectionCard({ card }: { card: Card }) {
  return (
    <Link
      href={card.href}
      className="group bg-paper hover:bg-paper-3 transition-colors p-6 flex flex-col"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-mono uppercase tracking-[0.12em] text-ink font-medium">
          {card.label}
        </span>
        <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 group-hover:text-red transition-colors">
          Open →
        </span>
      </div>

      <div className="mt-5 flex items-baseline gap-2">
        <span className="font-sans font-medium text-[40px] leading-[0.9] tracking-[-0.028em] text-ink tabular-nums">
          {card.total}
        </span>
        <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
          {card.totalLabel}
        </span>
      </div>

      <p className="text-body text-ink-2 mt-4">{card.blurb}</p>

      <div className="mt-auto pt-4 border-t border-rule font-mono text-micro uppercase tracking-[0.1em]">
        {card.attention.length > 0 ? (
          <span className="text-red font-semibold">
            {card.attention.join(" · ")}
          </span>
        ) : (
          <span className="text-ink-3">Nothing outstanding</span>
        )}
      </div>
    </Link>
  );
}

export default async function AdminHub() {
  // Independent reads — fire them together rather than in sequence.
  // socialPostedCount is the one that can fail on a fresh database, and a
  // missing tick table shouldn't take the whole hub down with it.
  const [postCounts, upcomingPosts, transcripts, socialPosted, leads] =
    await Promise.all([
      posts.counts(),
      posts.upcoming(UPCOMING_DAYS),
      loadAdminTranscripts(),
      socialPostedCount().catch(() => 0),
      leadCounts(),
    ]);

  const cards: Card[] = [
    {
      href: "/admin/posts",
      label: "Posts",
      blurb: "Blog articles. Write, schedule and publish.",
      total: String(postCounts.all),
      totalLabel: "posts",
      attention: [
        plural(postCounts.drafts, "draft"),
        postCounts.scheduled > 0 ? `${postCounts.scheduled} scheduled` : "",
      ].filter(Boolean),
    },
    {
      href: "/admin/transcripts",
      label: "Transcripts",
      blurb: "The expert call transcript library.",
      total: String(transcripts.counts.all),
      totalLabel: "transcripts",
      attention: [
        plural(transcripts.counts.drafts, "draft"),
        transcripts.counts.scheduled > 0
          ? `${transcripts.counts.scheduled} scheduled`
          : "",
      ].filter(Boolean),
    },
    {
      href: "/admin/social",
      label: "Social",
      blurb: "Ready-to-post copy across seven platforms.",
      total: String(socialPosted),
      totalLabel: "posted",
      attention: [],
    },
    {
      href: "/admin/leads",
      label: "Leads",
      blurb: "Enquiries, and what each ad keyword bought.",
      total: String(leads.all),
      totalLabel: "leads",
      attention: [
        leads.fromAds > 0 ? `${leads.fromAds} from ads` : "",
        plural(leads.meetings, "meeting"),
      ].filter(Boolean),
    },
  ];

  // Posts and transcripts going live in the next week, interleaved by date.
  // Publish dates are staggered months out, so without this the only way to
  // know what lands on Thursday is to open the scheduled list and read.
  // Reading the clock is the intent here: async Server Component, marked
  // force-dynamic, evaluated per request on the server. The purity rule
  // guards client render, where a changing clock would desync hydration.
  // eslint-disable-next-line react-hooks/purity
  const cutoff = new Date(Date.now() + UPCOMING_DAYS * 86_400_000)
    .toISOString()
    .slice(0, 10);
  const upcoming = [
    ...upcomingPosts.map((p) => ({
      key: `post-${p.slug}`,
      date: p.publishedAt,
      title: p.title,
      kind: "Post",
      href: `/admin/posts/${p.slug}/edit`,
    })),
    ...transcripts.scheduled
      .filter((t) => t.publishedAt <= cutoff)
      .map((t) => ({
        key: `transcript-${t.slug}`,
        date: t.publishedAt,
        title: t.title,
        kind: "Transcript",
        href: `/admin/transcripts/${t.slug}/edit`,
      })),
  ].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="px-4 sm:px-9 py-12">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-sans font-medium text-section leading-[1] tracking-[-0.022em] text-ink">
            Admin
          </h1>
          <p className="font-mono text-mono uppercase tracking-[0.08em] text-ink-3 mt-2">
            Everything that runs the site
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/admin/posts/new"
            className="bg-red text-paper px-6 py-3 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors"
          >
            New post →
          </Link>
          <Link
            href="/admin/transcripts/new"
            className="border border-ink text-ink px-6 py-3 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink hover:text-paper transition-colors"
          >
            New transcript →
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-rule border border-rule">
        {cards.map((card) => (
          <SectionCard key={card.href} card={card} />
        ))}
      </div>

      <section className="mt-12">
        <div className="bg-paper-2 px-4 sm:px-6 py-3.5 border-y border-rule-2 flex justify-between items-center flex-wrap gap-2 font-mono text-mono uppercase">
          <span>
            <span className="text-red font-semibold">01</span>
            <span className="mx-2 text-ink-3">/</span>
            <h2 className="inline m-0 p-0 text-mono font-medium text-ink">
              Publishing This Week
            </h2>
          </span>
          <span className="text-ink-3">Next {UPCOMING_DAYS} days</span>
        </div>

        {upcoming.length === 0 ? (
          <div className="border-x border-b border-rule px-6 py-8 text-center">
            <p className="text-body text-ink-2">
              Nothing goes live in the next {UPCOMING_DAYS} days.
            </p>
            <Link
              href="/admin/scheduled"
              className="inline-block mt-3 font-mono text-mono uppercase tracking-[0.14em] text-ink hover:text-red transition-colors"
            >
              See the full schedule →
            </Link>
          </div>
        ) : (
          <div className="border-x border-b border-rule">
            {upcoming.map((item, i) => (
              <Link
                key={item.key}
                href={item.href}
                className={`grid grid-cols-[auto_auto_1fr] gap-x-6 px-6 py-3 items-center hover:bg-paper-3 transition-colors ${
                  i > 0 ? "border-t border-rule" : ""
                }`}
              >
                <span className="font-mono text-micro uppercase tracking-[0.1em] text-red font-semibold whitespace-nowrap">
                  {DAY.format(new Date(item.date))}
                </span>
                <span className="font-mono text-micro uppercase tracking-[0.1em] text-ink-3 whitespace-nowrap">
                  {item.kind}
                </span>
                <span className="text-body text-ink truncate">{item.title}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
