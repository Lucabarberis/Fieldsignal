import Link from "next/link";
import type { Post } from "@/lib/db/types";

/**
 * Shared post-form component.
 *
 * Used by /admin/posts/new and /admin/posts/[slug]/edit. The form is
 * plain HTML — no client-side JS. Submits to a server action passed in
 * by the page.
 */
type Props = {
  mode: "new" | "edit";
  initial?: Post;
  saved?: boolean;
  /** A server action — passed as the form's `action` attribute. */
  action: (formData: FormData) => void | Promise<void>;
};

export function PostForm({ mode, initial, saved, action }: Props) {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="px-9 py-12 max-w-5xl">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-sans font-medium text-section leading-[1] tracking-[-0.022em] text-ink">
            {mode === "new" ? "New post" : "Edit post"}
          </h1>
          {initial && (
            <p className="font-mono text-mono uppercase tracking-[0.08em] text-ink-3 mt-2">
              /{initial.slug}
            </p>
          )}
        </div>
        <Link
          href="/admin"
          className="font-mono text-mono uppercase tracking-[0.14em] text-ink-3 hover:text-ink transition-colors"
        >
          ← All posts
        </Link>
      </div>

      {saved && (
        <div className="bg-paper-2 border-l-4 border-red px-5 py-3 mb-8 font-mono text-mono uppercase tracking-[0.08em] text-ink">
          Saved
        </div>
      )}

      <form action={action} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-px bg-rule">
        {/* ─── Main column ────────────────────────────────────── */}
        <div className="bg-paper p-7 space-y-6">
          <Field label="Title" hint="The H1 on the post. 50–70 chars works well for SEO.">
            <input
              type="text"
              name="title"
              required
              defaultValue={initial?.title}
              autoFocus
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[18px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          <Field
            label="Description"
            hint="The meta description, 140–160 chars. Also shown in the blog listing."
          >
            <textarea
              name="description"
              required
              rows={3}
              defaultValue={initial?.description}
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[15px] text-ink resize-y focus:outline-none focus:border-ink"
            />
          </Field>

          <Field label="Body" hint="Markdown. Supports headings, lists, links, blockquotes, code.">
            <textarea
              name="body"
              required
              rows={28}
              defaultValue={initial?.body}
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-mono text-[13px] leading-[1.6] text-ink resize-y focus:outline-none focus:border-ink"
              placeholder={"# Heading\n\nWrite your post in Markdown.\n\n## Subheading\n\n- bullet one\n- bullet two\n\n[Link text](https://example.com)"}
            />
          </Field>
        </div>

        {/* ─── Sidebar ────────────────────────────────────────── */}
        <aside className="bg-paper p-7 space-y-6">
          <Field
            label="Status"
            hint="Drafts stay hidden. Published goes live on the publish date — if that date is in the future, the post is scheduled and appears automatically when the date arrives."
          >
            <select
              name="status"
              defaultValue={initial?.status ?? "draft"}
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[15px] text-ink focus:outline-none focus:border-ink"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>

          <Field
            label="Slug"
            hint="URL path. Leave blank to auto-generate from the title."
          >
            <input
              type="text"
              name="slug"
              defaultValue={initial?.slug}
              placeholder="auto-from-title"
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-mono text-[13px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          <Field label="Author" hint="Displayed in the post header and JSON-LD.">
            <input
              type="text"
              name="author"
              required
              defaultValue={initial?.author ?? "Miles"}
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[15px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          <Field
            label="Publish date"
            hint="Defaults to today. Pick a future date + set status to Published to schedule the post."
          >
            <input
              type="date"
              name="publishedAt"
              defaultValue={initial?.publishedAt ?? today}
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-mono text-[13px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          {initial && initial.status === "published" && initial.publishedAt > today && (
            <div className="bg-paper-2 border-l-4 border-red px-4 py-3 font-mono text-mono uppercase tracking-[0.08em] text-ink">
              ◐ Scheduled for {new Date(initial.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "2-digit" })}
            </div>
          )}

          <Field
            label="Tags"
            hint="Optional. Comma-separated."
          >
            <input
              type="text"
              name="tags"
              defaultValue={initial?.tags?.join(", ") ?? ""}
              placeholder="company, methodology"
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[15px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          <div className="pt-4 border-t border-rule">
            <button
              type="submit"
              className="w-full bg-red text-paper px-6 py-3 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors cursor-pointer"
            >
              {mode === "new" ? "Create post →" : "Save changes →"}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="font-mono text-micro uppercase tracking-[0.12em] text-ink mb-1">
        {label}
      </div>
      {hint && (
        <div className="font-mono text-micro text-ink-3 mb-2">{hint}</div>
      )}
      {children}
    </label>
  );
}
