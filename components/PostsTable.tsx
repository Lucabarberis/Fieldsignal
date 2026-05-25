import Link from "next/link";
import { isScheduled } from "@/lib/db/posts";
import type { PostMeta } from "@/lib/db/types";
import { deletePostAction } from "@/app/admin/actions";

/**
 * Shared admin posts table. Renders any list of post metadata with
 * status badges, edit/view/delete actions.
 *
 *   <PostsTable posts={posts} emptyMessage="..." emptyCta={...} />
 */
type Props = {
  posts: PostMeta[];
  emptyMessage?: string;
  emptyCtaLabel?: string;
  emptyCtaHref?: string;
};

export function PostsTable({
  posts,
  emptyMessage = "No posts yet.",
  emptyCtaLabel,
  emptyCtaHref,
}: Props) {
  if (posts.length === 0) {
    return (
      <div className="bg-paper-2 px-7 py-10 text-center">
        <p className="text-body text-ink-2 mb-4">{emptyMessage}</p>
        {emptyCtaLabel && emptyCtaHref && (
          <Link
            href={emptyCtaHref}
            className="font-mono text-mono uppercase tracking-[0.14em] text-ink hover:text-red transition-colors"
          >
            {emptyCtaLabel} →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="border border-rule">
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-6 px-6 py-3 bg-paper-2 border-b border-rule font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
        <span>Status</span>
        <span>Title</span>
        <span>Date</span>
        <span>Author</span>
        <span className="text-right">Actions</span>
      </div>

      {posts.map((p, i) => {
        const sched = isScheduled(p);
        const statusLabel = sched
          ? "◐ Scheduled"
          : p.status === "published"
            ? "● Live"
            : "○ Draft";
        const statusClass = sched
          ? "text-ink"
          : p.status === "published"
            ? "text-red"
            : "text-ink-3";

        return (
          <div
            key={p.slug}
            className={`grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-6 px-6 py-4 items-center ${
              i > 0 ? "border-t border-rule" : ""
            }`}
          >
            <span
              className={`font-mono text-mono uppercase tracking-[0.08em] ${statusClass}`}
            >
              {statusLabel}
            </span>

            <div className="min-w-0">
              <Link
                href={`/admin/posts/${p.slug}/edit`}
                className="block text-ink font-sans font-medium text-[15px] hover:text-red transition-colors truncate"
              >
                {p.title}
              </Link>
              <span className="font-mono text-micro text-ink-3 truncate block">
                /{p.slug}
              </span>
            </div>

            <span className="font-mono text-micro text-ink-3 uppercase tracking-[0.08em]">
              {new Date(p.publishedAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </span>

            <span className="font-mono text-micro text-ink-3 uppercase tracking-[0.08em]">
              {p.author}
            </span>

            <div className="flex gap-3 items-center justify-end">
              {p.status === "published" && !sched && (
                <Link
                  href={`/resources/blog/${p.slug}`}
                  target="_blank"
                  className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 hover:text-ink transition-colors"
                >
                  View
                </Link>
              )}
              <Link
                href={`/admin/posts/${p.slug}/edit`}
                className="font-mono text-micro uppercase tracking-[0.12em] text-ink hover:text-red transition-colors"
              >
                Edit
              </Link>
              <form action={deletePostAction}>
                <input type="hidden" name="slug" value={p.slug} />
                <button
                  type="submit"
                  className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3 hover:text-red transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}
