import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { TileGrid } from "@/components/TileGrid";
import { Tile } from "@/components/Tile";
import { CtaBand } from "@/components/CtaBand";
import { Checklist } from "@/components/Checklist";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { platformPages, getPlatformPage } from "@/content/data/platform";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return platformPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPlatformPage(slug);
  if (!p) return {};
  return pageMetadata({
    title: p.title,
    description: p.description,
    path: `/platform/${slug}`,
  });
}

export default async function PlatformSubPage({ params }: Props) {
  const { slug } = await params;
  const p = getPlatformPage(slug);
  if (!p) notFound();

  const siblings = platformPages.filter((s) => s.slug !== p.slug).slice(0, 3);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Platform", url: "/platform" },
          { name: p.name, url: `/platform/${slug}` },
        ]}
      />
      <FAQSchema items={p.faq.map((f) => ({ question: f.q, answer: f.a }))} />

      <PageHeader
        current={p.name}
        title={p.title.split(" - ")[0]}
        lede={p.pageLede}
        meta={[
          { label: "Module", value: p.name },
          { label: "Status", value: "Shipping + roadmap" },
        ]}
      />

      {/* ── 01 — Shipping today ───────────────────────────────────── */}
      <SectionBand
        num="01"
        label="Shipping Today"
        meta={`${p.shipping.length} live capabilities`}
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <Checklist items={[...p.shipping]} />
      </div>

      {/* ── 02 — Roadmap ──────────────────────────────────────────── */}
      <SectionBand
        num="02"
        label="On The Roadmap"
        meta={`${p.roadmap.length} planned`}
      />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <p className="text-[13px] text-ink-3 mb-4">
          Honest disclosure: not yet shipping. Tracked publicly so buyers know what to expect.
        </p>
        <Checklist items={[...p.roadmap]} />
      </div>

      {/* ── 03 — FAQ ──────────────────────────────────────────────── */}
      <SectionBand
        num="03"
        label="Frequently Asked"
        meta={`${p.faq.length} questions`}
      />
      <div className="p-4 sm:p-9">
        <article className="bg-paper px-7 pt-6 pb-5">
          <dl className="flex flex-col">
            {p.faq.map((f, i) => (
              <div
                key={f.q}
                className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 py-4 ${
                  i > 0 ? "border-t border-rule" : ""
                }`}
              >
                <dt className="font-mono text-mono text-red font-semibold opacity-[0.78] mt-0.5">
                  Q.{String(i + 1).padStart(2, "0")}
                </dt>
                <div>
                  <p className="font-sans font-semibold text-ink text-[15px] mb-1">
                    {f.q}
                  </p>
                  <p className="text-[13px] leading-[1.55] text-ink-2">{f.a}</p>
                </div>
              </div>
            ))}
          </dl>
        </article>
      </div>

      {/* ── 04 — Sibling modules ──────────────────────────────────── */}
      {siblings.length > 0 && (
        <>
          <SectionBand
            num="04"
            label="Other Platform Modules"
            meta={`${siblings.length} more`}
          />
          <div className="p-4 sm:p-9">
            <TileGrid cols={3}>
              {siblings.map((s) => (
                <Tile
                  key={s.slug}
                  id={s.id}
                  name={s.name}
                  cta="Learn more"
                  href={`/platform/${s.slug}`}
                >
                  <p>{s.oneLiner}</p>
                </Tile>
              ))}
            </TileGrid>
          </div>
        </>
      )}

      <CtaBand
        title={<>Want to see <span className="text-red">{p.name.toLowerCase()}</span> in action?</>}
        meta={<>30-minute walkthrough. No sales pitch.</>}
        ctaLabel="Book a Demo"
        ctaHref="/contact/book-a-demo"
      />
    </>
  );
}
