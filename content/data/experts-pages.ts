/**
 * Supply-side acquisition pages — Wave 4, SEO brief §4.11.
 *
 * These pages target experts (the supply side of the marketplace),
 * not buyers. Keep the tone direct and respect their time — most
 * experts are operating professionals, not full-time consultants.
 */

export type ExpertPage = {
  slug: string;
  id: string;
  name: string;
  title: string;
  description: string;
  oneLiner: string;
  pageLede: string;
  /** Headings + body paragraphs as alternating string array. Renderable. */
  sections: readonly { heading: string; body: string }[];
  /** Optional checklist block (e.g. application requirements). */
  checklist?: readonly string[];
  /** Optional FAQ-style entries. */
  faq?: readonly { q: string; a: string }[];
  primaryKW: string;
};

export const expertPages: readonly ExpertPage[] = [
  {
    slug: "become-an-expert",
    id: "01",
    name: "BECOME AN EXPERT",
    title: "Become an Industry Expert - Apply in 5 Minutes",
    description:
      "Apply to join the network. We accept operators, executives, specialists and ex-regulators with at least 5 years of relevant experience.",
    oneLiner:
      "Apply to join. 5-minute application. We accept ops, execs, specialists, ex-regulators with 5+ years experience.",
    pageLede:
      "FieldSignal exists because serious buyers need to talk to people who've actually done the job — not consultants explaining it. If you've spent five or more years operating in a defined field, you probably qualify. Application takes five minutes.",
    sections: [
      {
        heading: "Who we accept",
        body:
          "Current operators, recent ex-operators, executive-level specialists, ex-regulators and category specialists with at least five years of relevant operating experience. We are explicit about what we don't accept: career consultants without operating background, students or junior researchers, and anyone whose employer policy prohibits external paid consultations without going through their internal vendor process.",
      },
      {
        heading: "What happens after you apply",
        body:
          "We review every application within 5 business days. If accepted, we'll schedule a 15-minute onboarding call to confirm your areas of expertise, set your rate (based on seniority and category), and walk through the compliance attestations you'll sign before each call. Most experts have their first call within 2-3 weeks of onboarding.",
      },
      {
        heading: "How rates are set",
        body:
          "Rates are set by seniority and category — currently ranging from €150/hour for early-career specialists to €1,500/hour for senior C-level executives in scarce categories. We don't haggle. The rate is yours; we charge clients a separate sourcing fee on top.",
      },
    ],
    checklist: [
      "5+ years operating experience in a defined field",
      "Currently employed or recently departed (within 24 months)",
      "Willing to sign per-call compliance attestations",
      "Comfortable with documented audit trail for each call",
      "Able to commit to 1-3 hours per month for active categories",
    ],
    primaryKW: "become an industry expert",
  },
  {
    slug: "how-it-works",
    id: "02",
    name: "HOW IT WORKS",
    title: "How It Works for Experts - From Application to First Call",
    description:
      "What happens after you apply, how clients find you, how calls are scheduled, how you get paid.",
    oneLiner:
      "Application to first call to payment — the full lifecycle, explained directly.",
    pageLede:
      "We respect your time, so this page explains the full lifecycle directly. Application takes 5 minutes. Onboarding takes one 15-minute call. Calls are scheduled with at least 48 hours notice (usually more). Payment lands in 5 business days, every time.",
    sections: [
      {
        heading: "Step 01 — Application",
        body:
          "Apply via the form on the Become an Expert page. We review within 5 business days. Required: CV/LinkedIn, areas of expertise (3-5 categories), preferred call language(s), and any conflicts of interest you want flagged proactively.",
      },
      {
        heading: "Step 02 — Onboarding call",
        body:
          "If accepted, we schedule a 15-minute onboarding call. We confirm your categories and seniority, set your rate, and walk you through the per-call compliance attestation. No paperwork beyond a single master expert agreement.",
      },
      {
        heading: "Step 03 — Client briefs come in",
        body:
          "When a client brief matches your profile, we contact you with the topic, the proposed call length (most are 60 minutes), the client's general type (no client identity disclosed pre-acceptance), and the proposed time slots. You accept or decline. There's no penalty for declining and no minimum activity requirement.",
      },
      {
        heading: "Step 04 — Pre-call attestation",
        body:
          "Before the call connects, you'll sign a per-call attestation: you have no MNPI on the topic, no NDA conflict, no prior employer policy prohibiting the consultation, and any conflicts have been disclosed. Standard practice — same compliance posture as GLG, AlphaSights and Third Bridge.",
      },
      {
        heading: "Step 05 — The call",
        body:
          "Calls are conducted on our platform with optional recording (you can decline recording). Most run 60 minutes. The client briefs the topic upfront; you respond conversationally based on your direct experience.",
      },
      {
        heading: "Step 06 — Payment",
        body:
          "Payment is processed within 5 business days of the call. Bank transfer, no platform fees deducted from your rate. Tax handling is your responsibility (we issue a payment record for your records).",
      },
    ],
    primaryKW: "how expert networks work for experts",
  },
  {
    slug: "payment-and-rates",
    id: "03",
    name: "PAYMENT & RATES",
    title: "Expert Payment and Rates - €150 to €1,500 per Call",
    description:
      "Rates set by experience and category. Paid within 5 business days. No platform fees taken from your rate.",
    oneLiner:
      "€150–€1,500 per call by seniority and category. Paid in 5 business days. No platform-fee deduction from your rate.",
    pageLede:
      "We don't haggle on rates and we don't deduct platform fees from what you earn. The rate set during onboarding is what you receive, paid via bank transfer within 5 business days of every call.",
    sections: [
      {
        heading: "Rate framework",
        body:
          "Rates are set by two factors: seniority of operating experience (years in role + level) and category scarcity (how rare your specific expertise is in our network). Most experts are in the €300–€800/hour range. The top tier (€1,000–€1,500/hour) is reserved for ex-C-suite executives in highly scarce categories.",
      },
      {
        heading: "Payment timing",
        body:
          "Payment is processed within 5 business days of the call. Bank transfer in EUR, GBP or USD. No payment threshold — you're paid for every individual call, not aggregated monthly.",
      },
      {
        heading: "No deductions",
        body:
          "The rate set at onboarding is the rate you receive. We charge clients a separate sourcing fee on top of what we pay you. You should never see a platform fee, processing fee or any other deduction.",
      },
      {
        heading: "Rate increases",
        body:
          "Rates are reviewed annually based on demand. If demand for your category is strong, your rate goes up. We're transparent about this — most experts who do 10+ calls per year see a rate increase at their annual review.",
      },
    ],
    primaryKW: "expert network rates",
  },
  {
    slug: "code-of-conduct",
    id: "04",
    name: "CODE OF CONDUCT",
    title: "Expert Code of Conduct - What You Can and Cannot Discuss",
    description:
      "Clear rules on confidentiality, NDAs, MNPI and conflicts of interest. Read this before your first call.",
    oneLiner:
      "The rules. Confidentiality, NDAs, MNPI, conflicts. Mandatory reading before your first call.",
    pageLede:
      "These rules exist to protect you, your former employers and our clients. Breaking them results in immediate and permanent removal from the network. We're explicit because clarity protects everyone.",
    sections: [
      {
        heading: "MNPI rules",
        body:
          "Material non-public information (MNPI) cannot be discussed. If you currently hold MNPI on a topic — for example, you're a current employee of a publicly-traded company being researched — you must decline the call. We enforce a 6-month cooling-off period after departure from any publicly-traded employer before you can discuss that employer specifically.",
      },
      {
        heading: "NDA conflicts",
        body:
          "Active NDAs with former employers, customers or partners on the topic of the call must be disclosed at the per-call attestation stage. If the NDA prohibits the discussion, decline the call. Don't try to discuss around an NDA — it endangers you and the client.",
      },
      {
        heading: "Conflicts of interest",
        body:
          "Disclose proactively if you have a current commercial relationship with the topic company (board seat, advisory role, current consulting engagement, equity holdings >€100k). We'll then decide whether the call can proceed with disclosure or whether you should decline.",
      },
      {
        heading: "Client identity confidentiality",
        body:
          "Client identity is confidential. You're told the client's general type (e.g. PE fund, corporate strategy team) but not their specific identity. Don't ask, don't speculate publicly, and don't share what you discussed with anyone outside the call.",
      },
      {
        heading: "Removal grounds",
        body:
          "We remove experts immediately and permanently for: knowingly discussing MNPI; misrepresenting credentials at application; refusing per-call attestation; discussing protected NDA content; or sharing client-identifying information externally.",
      },
    ],
    primaryKW: "expert code of conduct",
  },
  {
    slug: "compliance-for-experts",
    id: "05",
    name: "COMPLIANCE FOR EXPERTS",
    title: "Compliance Rules for Experts - Attestations and Restrictions",
    description:
      "Per-call attestations, 6-month cooling-off, NDA disclosure and exclusion-list rules. Mandatory reading.",
    oneLiner:
      "Per-call attestations, cooling-off rules, NDA disclosure and exclusion lists.",
    pageLede:
      "Compliance is what keeps FieldSignal a network that institutional clients trust — and what protects you from professional risk. The rules below are non-negotiable and apply to every call.",
    sections: [
      {
        heading: "Per-call attestations",
        body:
          "Before every call you sign a short attestation confirming: (a) you have no MNPI on the topic; (b) no NDA prohibits the discussion; (c) you have disclosed any active commercial relationships; (d) you are not currently in a quiet/restriction period imposed by an employer. The attestation takes 90 seconds. Refusing to sign means the call doesn't happen.",
      },
      {
        heading: "Cooling-off periods",
        body:
          "A 6-month cooling-off period applies from your departure date from any publicly-traded employer before you can discuss that employer specifically. The cooling-off is shorter (typically 3 months) for non-public employers, depending on category sensitivity.",
      },
      {
        heading: "Exclusion lists",
        body:
          "Clients can submit exclusion lists — companies whose experts must NOT be matched to their briefs. We maintain >2,000 active exclusion entries across institutional clients. If your former employer is on a client's exclusion list, you'll not be matched to that client's briefs.",
      },
      {
        heading: "Sector-specific rules",
        body:
          "Healthcare KOLs follow ABPI/PhRMA disclosure standards; financial-services experts follow MAR/insider-list rules; defense experts follow ITAR/export-control rules where applicable. Sector-specific overlays are presented to you in the per-call attestation when relevant.",
      },
      {
        heading: "Audit trail",
        body:
          "Every call generates a 7-year audit record: brief, attestation, expert profile (anonymised to client), call recording (if you consented), and post-call notes. Records are retained per the data-protection page and produced on regulatory request.",
      },
    ],
    primaryKW: "expert compliance",
  },
  {
    slug: "expert-faq",
    id: "06",
    name: "EXPERT FAQ",
    title: "Expert FAQ - Common Questions From Network Members",
    description:
      "Answers to the questions experts ask most often. Payment, scheduling, compliance, taxes and dispute resolution.",
    oneLiner:
      "Answers to what experts actually ask: payment, scheduling, compliance, taxes, disputes.",
    pageLede:
      "Direct answers to the questions experts ask most often. If your question isn't covered here, contact us — we'll usually respond within one business day.",
    sections: [
      {
        heading: "Frequency of calls",
        body:
          "Most active experts do 5–20 calls per year. Highly sought-after categories can see 30+ calls per year. We don't impose a minimum activity requirement; you accept or decline each brief as it suits you.",
      },
      {
        heading: "Tax handling",
        body:
          "You are responsible for your own tax handling. We issue a payment record for each call (showing date, amount and our entity details). Most experts handle expert-network income as self-employed/sole-trader income; consult your accountant for your jurisdiction.",
      },
      {
        heading: "Conflicts with current employer",
        body:
          "If your current employer prohibits external paid consulting, you cannot accept calls without going through their approval process. We can't help you bypass that — it's your responsibility to know your employer's policy.",
      },
      {
        heading: "Dispute resolution",
        body:
          "Disputes are rare. If a client and expert disagree about whether a call delivered value, we handle the situation directly with both parties — the expert is paid for delivered time regardless of client satisfaction (unless the call breaches the code of conduct).",
      },
      {
        heading: "Leaving the network",
        body:
          "You can leave the network at any time by emailing us. We'll remove your profile within 5 business days. Past call records are retained per the 7-year audit-trail requirement (anonymised after departure if requested).",
      },
    ],
    faq: [
      {
        q: "Do I have to sign an exclusivity agreement?",
        a: "No. You can be on multiple expert networks. We don't ask about other networks and don't prohibit working with them.",
      },
      {
        q: "What if I miss a scheduled call?",
        a: "Notify us as early as possible. We'll reschedule with the client. Repeated missed calls without notice will result in removal from the active expert pool.",
      },
      {
        q: "Can I refer colleagues?",
        a: "Yes. See /experts/refer-an-expert — we pay €100 for each successful referral who completes their first paid call.",
      },
      {
        q: "Do I need to record calls?",
        a: "No. Recording is at the client's request and requires your explicit consent before each call. You can decline recording without penalty.",
      },
    ],
    primaryKW: "expert network FAQ",
  },
  {
    slug: "refer-an-expert",
    id: "07",
    name: "REFER AN EXPERT",
    title: "Refer an Expert - €100 per Successful Referral",
    description:
      "Refer a colleague to the network. €100 per referral who completes their first paid call.",
    oneLiner:
      "€100 per successful referral. Email us with their name and category — we do the rest.",
    pageLede:
      "Most of our best experts come from referrals. If a colleague would be useful in the network, refer them. €100 lands in your account when their first paid call is complete — no caps, no quarterly minimums.",
    sections: [
      {
        heading: "How to refer",
        body:
          "Email referrals@fieldsignalhq.com with: (a) the colleague's name and email; (b) their primary category of expertise; (c) a one-sentence description of why they'd be useful in the network. We'll reach out and walk them through the application.",
      },
      {
        heading: "When you get paid",
        body:
          "Payment of €100 is processed within 5 business days of your referral completing their first paid call. We notify you proactively when the payment is triggered.",
      },
      {
        heading: "What counts as a successful referral",
        body:
          "A referral is successful when: (a) the colleague applies via the link we send them; (b) they're accepted into the network; (c) they complete at least one paid call. There's no quota — refer as many colleagues as you think would be useful.",
      },
      {
        heading: "What we won't do",
        body:
          "We don't accept referrals without the colleague's consent — we'll never cold-email someone based on a referral. If they decline the network, they decline; we don't pressure or follow up beyond the initial outreach.",
      },
    ],
    primaryKW: "refer an expert",
  },
] as const;

/** Helper: look up an expert sub-page by slug. */
export function getExpertPage(slug: string): ExpertPage | undefined {
  return expertPages.find((p) => p.slug === slug);
}
