import Link from "next/link";
import type { Transcript } from "@/lib/db/transcript-types";
import { industries } from "@/content/data/industries";

/**
 * Shared transcript form. Used by /admin/transcripts/new and
 * /admin/transcripts/[slug]/edit. Plain HTML — no client JS.
 */
type Props = {
  mode: "new" | "edit";
  initial?: Transcript;
  saved?: boolean;
  action: (formData: FormData) => void | Promise<void>;
};

export function TranscriptForm({ mode, initial, saved, action }: Props) {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="px-9 py-12 max-w-6xl">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-sans font-medium text-section leading-[1] tracking-[-0.022em] text-ink">
            {mode === "new" ? "New transcript" : "Edit transcript"}
          </h1>
          {initial && (
            <p className="font-mono text-mono uppercase tracking-[0.08em] text-ink-3 mt-2">
              /{initial.slug}
            </p>
          )}
        </div>
        <Link
          href="/admin/transcripts"
          className="font-mono text-mono uppercase tracking-[0.14em] text-ink-3 hover:text-ink transition-colors"
        >
          ← All transcripts
        </Link>
      </div>

      {saved && (
        <div className="bg-paper-2 border-l-4 border-red px-5 py-3 mb-8 font-mono text-mono uppercase tracking-[0.08em] text-ink">
          Saved
        </div>
      )}

      {/* Anonymisation reminder banner */}
      <div className="bg-red text-paper px-6 py-3 mb-8 font-mono text-mono uppercase tracking-[0.10em]">
        ⚠ All expert and client identities must be removed before publishing. Use role-based descriptors.
      </div>

      <form action={action} className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-px bg-rule">
        {/* ─── Main column ────────────────────────────────────── */}
        <div className="bg-paper p-7 space-y-6">
          <Field label="Title" hint="The H1. Format: 'Role, Company — Topic'. Example: 'Ex-VP Sales, Enterprise SaaS — EDR Consolidation'.">
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
            label="Description (meta)"
            hint="140-160 chars. Shown in Google SERP and tile previews."
          >
            <textarea
              name="description"
              required
              rows={3}
              defaultValue={initial?.description}
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[15px] text-ink resize-y focus:outline-none focus:border-ink"
            />
          </Field>

          <Field
            label="Expert role (anonymised)"
            hint="The expert's role descriptor — NO real names. Example: 'Former VP Sales at a major EDR vendor'."
          >
            <input
              type="text"
              name="expertRole"
              required
              defaultValue={initial?.expertRole}
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[15px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          <Field
            label="Free preview"
            hint="300-500 words per SEO brief §4.14. Publish-time validation enforces a minimum of 200. Markdown supported via the rendering layer (basic — paragraphs separated by blank lines)."
          >
            <textarea
              name="preview"
              required
              rows={20}
              defaultValue={initial?.preview}
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[14px] leading-[1.6] text-ink resize-y focus:outline-none focus:border-ink"
              placeholder="The free preview shown to everyone. Aim for 300-500 words. Separate paragraphs with a blank line."
            />
          </Field>

          <Field
            label="Gated teaser"
            hint="1-2 sentences describing what's behind the paywall. Shown above the subscribe CTA."
          >
            <textarea
              name="gatedTeaser"
              required
              rows={3}
              defaultValue={initial?.gatedTeaser}
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[14px] text-ink resize-y focus:outline-none focus:border-ink"
              placeholder="Full transcript includes specific deal-economics breakdowns, named buyer reactions, and..."
            />
          </Field>

          <Field
            label="Gated content (full transcript)"
            hint="Optional. The remaining content shown to paying subscribers. Leave blank if you only have the preview today."
          >
            <textarea
              name="gatedContent"
              rows={12}
              defaultValue={initial?.gatedContent ?? ""}
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[14px] leading-[1.6] text-ink resize-y focus:outline-none focus:border-ink"
              placeholder="The 3,000+ remaining words of the transcript. (Optional — leave blank if not ready yet.)"
            />
          </Field>
        </div>

        {/* ─── Sidebar ────────────────────────────────────────── */}
        <aside className="bg-paper p-7 space-y-6">
          <Field
            label="Status"
            hint="Drafts hidden. Published + future date = scheduled. Publishing requires compliance attestation."
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
            label="Publish date"
            hint="Future date + Published status = scheduled. Auto-publishes when date arrives."
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
            label="Slug"
            hint="URL path. Leave blank to auto-generate from title."
          >
            <input
              type="text"
              name="slug"
              defaultValue={initial?.slug}
              placeholder="auto-from-title"
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-mono text-[13px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          <Field
            label="Company context (anonymised)"
            hint="Used as the /by-company aggregator label. Example: 'Top-15 US bank'."
          >
            <input
              type="text"
              name="companyContext"
              required
              defaultValue={initial?.companyContext}
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[14px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          <Field
            label="Company slug"
            hint="URL slug for /by-company. Leave blank to derive from company context."
          >
            <input
              type="text"
              name="companySlug"
              defaultValue={initial?.companySlug}
              placeholder="auto-from-company-context"
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-mono text-[13px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          <Field
            label="Topic label"
            hint="Human-readable topic. Example: 'EDR Vendor Consolidation'."
          >
            <input
              type="text"
              name="topicLabel"
              required
              defaultValue={initial?.topicLabel}
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[14px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          <Field
            label="Topic slug"
            hint="URL slug for /by-topic. Leave blank to derive from topic label."
          >
            <input
              type="text"
              name="topicSlug"
              defaultValue={initial?.topicSlug}
              placeholder="auto-from-topic-label"
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-mono text-[13px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          <Field
            label="Industries"
            hint={`Comma-separated industry slugs. Must match industries.ts. Available: ${industries.map((i) => i.slug).join(", ")}`}
          >
            <input
              type="text"
              name="industrySlugs"
              required
              defaultValue={initial?.industrySlugs?.join(", ") ?? ""}
              placeholder="technology, financial-services"
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-mono text-[13px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          <Field
            label="Word count"
            hint="Total word count of the full transcript (preview + gated). Honest disclosure."
          >
            <input
              type="number"
              name="wordCount"
              min="0"
              defaultValue={initial?.wordCount ?? 0}
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-mono text-[13px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          <Field
            label="Related transcript slugs"
            hint="Optional. Comma-separated slugs of related transcripts for cross-link block."
          >
            <input
              type="text"
              name="relatedSlugs"
              defaultValue={initial?.relatedSlugs?.join(", ") ?? ""}
              placeholder="ex-vp-sales-..., former-ciso-..."
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-mono text-[13px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          <Field
            label="Primary keyword"
            hint="The SEO keyword this transcript targets."
          >
            <input
              type="text"
              name="primaryKW"
              defaultValue={initial?.primaryKW ?? ""}
              className="w-full bg-paper-3 border border-rule px-4 py-3 font-sans text-[14px] text-ink focus:outline-none focus:border-ink"
            />
          </Field>

          {/* Compliance attestation — required to publish */}
          <div className="pt-4 border-t border-rule">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="complianceConfirmed"
                defaultChecked={initial?.complianceConfirmed ?? false}
                className="mt-1 w-5 h-5 cursor-pointer accent-red"
              />
              <span className="font-mono text-micro uppercase tracking-[0.10em] text-ink">
                I confirm this transcript is anonymised + MNPI-screened
                <span className="block text-ink-3 normal-case tracking-[0.06em] mt-1">
                  Required to publish. Drafts can be saved without confirming.
                </span>
              </span>
            </label>
          </div>

          <div className="pt-4 border-t border-rule">
            <button
              type="submit"
              className="w-full bg-red text-paper px-6 py-3 font-mono text-mono uppercase font-medium tracking-[0.14em] hover:bg-ink transition-colors cursor-pointer"
            >
              {mode === "new" ? "Create transcript →" : "Save changes →"}
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
