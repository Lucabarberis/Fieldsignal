import { PageHeader } from "@/components/PageHeader";
import { SectionBand } from "@/components/SectionBand";
import { CtaBand } from "@/components/CtaBand";
import { CostEstimator } from "@/components/CostEstimator";
import { BackButton } from "@/components/BackButton";
import { BreadcrumbSchema } from "@/components/SchemaOrg";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import Link from "next/link";

/**
 * Free interactive tool — Expert Network Cost Estimator.
 *
 * Link-magnet page: the interactive companion to the Pricing & Pay
 * Benchmark post. Industry-standard bands only; FieldSignal's own
 * pricing stays on /pricing.
 */

export const metadata = pageMetadata({
  title: "Expert Network Cost Estimator — Free Tool",
  description:
    "Estimate what your expert research project costs at industry-standard rates: per-call ranges by seniority, rush premiums, package discounts, and the real effect of annual minimums.",
  path: "/tools/expert-network-cost-estimator",
});

export default function CostEstimatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools/expert-network-cost-estimator" },
          {
            name: "Expert Network Cost Estimator",
            url: "/tools/expert-network-cost-estimator",
          },
        ]}
      />

      <div className="px-4 sm:px-9 pt-6">
        <BackButton />
      </div>

      <PageHeader
        current="Cost Estimator"
        title="Expert Network Cost Estimator"
        lede={
          <>
            What should an expert research project cost? Set your project
            below and get an instant estimate at{" "}
            <b>industry-standard 2026 rates</b> — including what the same
            project effectively costs under a six-figure annual minimum.
          </>
        }
        meta={[
          { label: "Type", value: "Free interactive tool" },
          { label: "Data source", value: "2026 Pricing & Pay Benchmark" },
          { label: "Updated", value: "Annually" },
        ]}
      />

      <SectionBand num="01" label="Estimate your project" meta="3 inputs · instant result" />
      <CostEstimator />

      <SectionBand num="02" label="How this works" meta="Methodology" />
      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <p className="font-sans text-[16px] leading-[1.65] text-ink-2">
          Estimates use the positioning bands published in our{" "}
          <Link
            href="/resources/blog/expert-network-pricing-and-pay-benchmark-2026"
            className="text-ink underline underline-offset-2 hover:text-red transition-colors"
          >
            Expert Network Pricing &amp; Pay Benchmark 2026
          </Link>
          : per-call client rates of €500–€1,500 at full-service networks,
          scaled by expert seniority; rush premiums of 10–30%; multi-call
          package discounts of 20–40% for fixed scope; and low-to-mid
          six-figure annual minimums at the largest providers. These are
          industry ranges compiled from published rate cards and
          buyer-reported quotes — not quotes from any specific vendor.
          Writers and researchers are welcome to cite this tool with a link.
        </p>
      </div>

      <CtaBand
        title={
          <>
            Want a real number instead of a range?{" "}
            <span className="text-red">Brief us.</span>
          </>
        }
        meta={<>First quote in 24h. Pay-per-use, no annual minimum.</>}
        ctaLabel="Get a Quote"
        ctaHref={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(
          "Project quote — via cost estimator",
        )}`}
      />
    </>
  );
}
