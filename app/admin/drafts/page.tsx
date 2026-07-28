import Link from "next/link";
import { AdminTabs } from "@/components/AdminTabs";
import { PostsBrowser } from "@/components/PostsBrowser";
import { loadAdminPostsView, type SearchParams } from "../_helpers";

export default async function DraftPostsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { results, counts, q } = await loadAdminPostsView(
    "drafts",
    searchParams,
  );

  return (
    <div className="px-4 sm:px-9 py-12">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-sans font-medium text-section leading-[1] tracking-[-0.022em] text-ink">
            Drafts
          </h1>
          <p className="font-mono text-mono uppercase tracking-[0.08em] text-ink-3 mt-2">
            {counts.drafts} draft{counts.drafts === 1 ? "" : "s"} not yet
            published
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-red text-paper px-6 py-3 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors"
        >
          New post →
        </Link>
      </div>

      <AdminTabs active="drafts" counts={counts} />

      <PostsBrowser
        basePath="/admin/drafts"
        results={results}
        q={q}
        emptyMessage="No drafts. Start a post in draft state to save it without publishing."
        emptyCtaLabel="Start a draft"
        emptyCtaHref="/admin/posts/new"
      />
    </div>
  );
}
