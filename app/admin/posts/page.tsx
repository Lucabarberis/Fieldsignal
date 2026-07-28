import Link from "next/link";
import { AdminTabs } from "@/components/AdminTabs";
import { PostsBrowser } from "@/components/PostsBrowser";
import { loadAdminPostsView, type SearchParams } from "../_helpers";

/**
 * /admin/posts — the blog post list.
 *
 * Used to live at /admin; moved when the admin grew a fourth section and
 * /admin became a hub.
 */

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { results, counts, q } = await loadAdminPostsView("all", searchParams);

  return (
    <div className="px-4 sm:px-9 py-12">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-sans font-medium text-section leading-[1] tracking-[-0.022em] text-ink">
            All posts
          </h1>
          <p className="font-mono text-mono uppercase tracking-[0.08em] text-ink-3 mt-2">
            {counts.all} post{counts.all === 1 ? "" : "s"} total
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-red text-paper px-6 py-3 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors"
        >
          New post →
        </Link>
      </div>

      <AdminTabs active="all" counts={counts} />

      <PostsBrowser
        basePath="/admin/posts"
        results={results}
        q={q}
        emptyMessage="No posts yet."
        emptyCtaLabel="Write the first one"
        emptyCtaHref="/admin/posts/new"
      />
    </div>
  );
}
