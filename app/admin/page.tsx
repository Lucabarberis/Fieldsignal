import Link from "next/link";
import { loadAdminPosts } from "./_helpers";
import { loadAdminTranscripts } from "./transcripts/_helpers";
import { socialPostedCount, leadCounts } from "@/lib/db/admin-counts";

/**
 * /admin — the hub.
 *
 * Four sections is one too many for a text nav to carry, so this is the
 * front door. The posts list that used to live here moved to /admin/posts.
 *
 * The line at the foot of each card is the point of the page. A total on
 * its own tells you nothing you'd act on; "3 drafts · 2 scheduled" tells
 * you where to go next. Cards with nothing outstanding say so, which is
 * equally worth knowing at a glance.
 */

export const dynamic = "force-dynamic";

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
  const [posts, transcripts, socialPosted, leads] = await Promise.all([
    loadAdminPosts(),
    loadAdminTranscripts(),
    socialPostedCount().catch(() => 0),
    leadCounts(),
  ]);

  const cards: Card[] = [
    {
      href: "/admin/posts",
      label: "Posts",
      blurb: "Blog articles. Write, schedule and publish.",
      total: String(posts.counts.all),
      totalLabel: "posts",
      attention: [
        plural(posts.counts.drafts, "draft"),
        posts.counts.scheduled > 0 ? `${posts.counts.scheduled} scheduled` : "",
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
    </div>
  );
}
