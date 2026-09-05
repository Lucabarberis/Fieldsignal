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
import { SITE } from "@/lib/site";
import { expertPages, getExpertPage } from "@/content/data/experts-pages";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return expertPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getExpertPage(slug);
  if (!p) return {};
  return pageMetadata({
    title: p.title,
    description: p.description,
    path: `/experts/${slug}`,
  });
}

export default async function ExpertSubPage({ params }: Props) {
  const { slug } = await params;
  const page = getExpertPage(slug);
  if (!page) notFound();

  const siblings = expertPages.filter((p) => p.slug !== page.slug).slice(0, 3);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Experts", url: "/experts" },
          { name: page.name, url: `/experts/${slug}` },
        ]}
      />
      {page.faq && (
        <FAQSchema
          items={page.faq.map((f) => ({ question: f.q, answer: f.a }))}
        />
      )}

      <PageHeader
        current={page.name}
        parent={{ label: "For Experts", href: "/experts" }}
        title={page.title.split(" - ")[0]}
        lede={page.pageLede}
        meta={[
          { label: "For", value: "Experts" },
          { label: "Application", value: "5 minutes" },
          { label: "Payment", value: "5 business days" },
        ]}
      />

      {/* ── Body sections (numbered) ──────────────────────────────── */}
      {page.sections.map((s, i) => (
        <div key={s.heading}>
          <SectionBand
            num={String(i + 1).padStart(2, "0")}
            label={s.heading}
            meta={i === 0 ? "Read this first" : "—"}
          />
          <div className="px-4 sm:px-9 py-8 max-w-4xl">
            <p className="font-sans text-[17px] leading-[1.55] text-ink-2">
              {s.body}
            </p>
          </div>
        </div>
      ))}

      {/* ── Optional checklist ─────────────────────────────────── */}
      {page.checklist && page.checklist.length > 0 && (
        <>
          <SectionBand
            num={String(page.sections.length + 1).padStart(2, "0")}
            label="Requirements"
            meta={`${page.checklist.length} items`}
          />
          <div className="px-4 sm:px-9 py-8 max-w-4xl">
            <Checklist items={[...page.checklist]} />
          </div>
        </>
      )}

      {/* ── Optional FAQ ───────────────────────────────────────── */}
      {page.faq && page.faq.length > 0 && (
        <>
          <SectionBand
            num={String(
              page.sections.length + (page.checklist ? 2 : 1),
            ).padStart(2, "0")}
            label="Frequently Asked"
            meta={`${page.faq.length} questions`}
          />
          <div className="p-4 sm:p-9">
            <article className="bg-paper px-7 pt-6 pb-5">
              <dl className="flex flex-col">
                {page.faq.map((f, i) => (
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
                      <p className="text-[13px] leading-[1.55] text-ink-2">
                        {f.a}
                      </p>
                    </div>
                  </div>
                ))}
              </dl>
            </article>
          </div>
        </>
      )}

      {/* ── Related expert pages ───────────────────────────────── */}
      {siblings.length > 0 && (
        <>
          <SectionBand
            num="99"
            label="Other Pages For Experts"
            meta={`${siblings.length} more`}
          />
          <div className="p-4 sm:p-9">
            <TileGrid cols={3}>
              {siblings.map((s) => (
                <Tile
                  key={s.slug}
                  id={s.id}
                  name={s.name}
                  cta="Read"
                  href={`/experts/${s.slug}`}
                >
                  <p>{s.oneLiner}</p>
                </Tile>
              ))}
            </TileGrid>
          </div>
        </>
      )}

      <CtaBand
        title={
          <>Apply to join the network. <span className="text-red">5 minutes.</span></>
        }
        meta={
          <>
            Questions first?{" "}
            <a
              href="/contact?topic=Joining+as+an+expert"
              className="underline decoration-rule-2 underline-offset-2 hover:text-red hover:decoration-red transition-colors"
            >
              {SITE.contactEmail}
            </a>
          </>
        }
        ctaLabel="Apply Now"
        ctaHref="/contact"
      />
    </>
  );
}
