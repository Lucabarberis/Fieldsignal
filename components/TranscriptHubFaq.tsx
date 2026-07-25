import { SectionBand } from "@/components/SectionBand";
import { FAQSchema } from "@/components/SchemaOrg";

/**
 * A short, data-driven FAQ for the transcript hub pages
 * (/transcripts/by-topic|by-company|by-industry). These pages previously
 * carried no answerable question — their only question-phrased heading was
 * the closing CTA ("Need a custom call…?"), which forfeits featured-snippet
 * eligibility. This renders one genuinely page-specific Q&A (built from the
 * actual transcripts on the page) plus a compliance answer, both visible and
 * as FAQPage schema.
 */
type Item = { expertRole: string };

export function TranscriptHubFaq({
  label,
  sectionNum,
  items,
}: {
  label: string;
  sectionNum: string;
  items: readonly Item[];
}) {
  const roles = [...new Set(items.map((t) => t.expertRole))].slice(0, 3);
  const n = items.length;
  const faq = [
    {
      q: `What do these ${label} expert transcripts cover?`,
      a: `${n} anonymised expert interview${n === 1 ? "" : "s"} on ${label}.${
        roles.length ? ` Contributors include ${roles.join("; ")}.` : ""
      } Every transcript has a free preview; full transcripts are available on subscription.`,
    },
    {
      q: `Are the experts behind these ${label} transcripts vetted and compliant?`,
      a: `Yes. Each interview is with a vetted former operator, fully anonymised, and MNPI-screened under FieldSignal's compliance framework.`,
    },
  ];

  return (
    <>
      <FAQSchema items={faq.map((f) => ({ question: f.q, answer: f.a }))} />
      <SectionBand num={sectionNum} label="Frequently Asked" meta={`${faq.length} questions`} />
      <div className="p-4 sm:p-9">
        <article className="bg-paper px-7 pt-6 pb-5">
          <dl className="flex flex-col">
            {faq.map((f, i) => (
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
    </>
  );
}
