import Link from "next/link";
import { PostsTable } from "@/components/PostsTable";
import type { PostPage } from "@/lib/db/posts";

/**
 * Search box + results + paging for the admin post lists.
 *
 * A plain GET form, so searching works without client JS and every result
 * set has its own shareable URL. Submitting always lands on page 1 —
 * there is no hidden `page` field — because keeping the old page number
 * across a new search is how you end up staring at an empty page 7.
 */

type Props = {
  /** Route this list lives on, e.g. "/admin/posts". Form target and page links. */
  basePath: string;
  results: PostPage;
  q: string;
  emptyMessage: string;
  emptyCtaLabel?: string;
  emptyCtaHref?: string;
};

function pageHref(basePath: string, q: string, page: number): string {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

const PAGE_BTN =
  "px-4 py-2 font-mono text-mono uppercase tracking-[0.12em] border border-ink text-ink hover:bg-ink hover:text-paper transition-colors";

export function PostsBrowser({
  basePath,
  results,
  q,
  emptyMessage,
  emptyCtaLabel,
  emptyCtaHref,
}: Props) {
  const { rows, total, page, perPage, pageCount } = results;
  const firstOnPage = total === 0 ? 0 : (page - 1) * perPage + 1;
  const lastOnPage = Math.min(page * perPage, total);

  return (
    <>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <form action={basePath} method="GET" className="flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search title or slug…"
            aria-label="Search posts by title or slug"
            className="w-64 max-w-full bg-paper-3 border border-rule-2 rounded-none appearance-none px-4 py-2 font-sans text-[15px] leading-[1.4] text-ink placeholder:text-ink-3 focus:outline-none focus:border-ink transition-colors"
          />
          <button
            type="submit"
            className="bg-ink text-paper px-5 py-2 font-mono text-mono uppercase tracking-[0.12em] hover:bg-red transition-colors cursor-pointer"
          >
            Search
          </button>
          {q && (
            <Link
              href={basePath}
              className="flex items-center px-4 font-mono text-mono uppercase tracking-[0.12em] text-ink-3 hover:text-red transition-colors"
            >
              Clear
            </Link>
          )}
        </form>

        <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
          {total === 0
            ? "No matches"
            : `${firstOnPage}–${lastOnPage} of ${total}`}
        </span>
      </div>

      <PostsTable
        posts={rows}
        emptyMessage={q ? `Nothing matches “${q}”.` : emptyMessage}
        emptyCtaLabel={q ? undefined : emptyCtaLabel}
        emptyCtaHref={q ? undefined : emptyCtaHref}
      />

      {pageCount > 1 && (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-between gap-4 mt-6"
        >
          {page > 1 ? (
            <Link href={pageHref(basePath, q, page - 1)} className={PAGE_BTN}>
              ← Previous
            </Link>
          ) : (
            <span />
          )}

          <span className="font-mono text-micro uppercase tracking-[0.12em] text-ink-3">
            Page {page} of {pageCount}
          </span>

          {page < pageCount ? (
            <Link href={pageHref(basePath, q, page + 1)} className={PAGE_BTN}>
              Next →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </>
  );
}
