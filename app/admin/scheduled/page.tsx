import Link from "next/link";
import { AdminTabs } from "@/components/AdminTabs";
import { PostsTable } from "@/components/PostsTable";
import { loadAdminPosts } from "../_helpers";

export default async function ScheduledPostsPage() {
  const { scheduled, counts } = await loadAdminPosts();

  return (
    <div className="px-4 sm:px-9 py-12">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-sans font-medium text-section leading-[1] tracking-[-0.022em] text-ink">
            Scheduled posts
          </h1>
          <p className="font-mono text-mono uppercase tracking-[0.08em] text-ink-3 mt-2">
            {counts.scheduled} post{counts.scheduled === 1 ? "" : "s"} waiting to go live
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-red text-paper px-6 py-3 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors"
        >
          New post →
        </Link>
      </div>

      <AdminTabs active="scheduled" counts={counts} />

      <PostsTable
        posts={scheduled}
        emptyMessage="No scheduled posts. Set a future publish date and Status: Published to schedule a post."
        emptyCtaLabel="Schedule one now"
        emptyCtaHref="/admin/posts/new"
      />
    </div>
  );
}
