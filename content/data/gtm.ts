/**
 * Go-To-Market Intelligence — the /gtm-intelligence section.
 *
 * The company-side counterpart to the fund-side research in /use-cases.
 * Same shape every time: put the growth question to people who have already
 * run the channel at a comparable company, and write up the negative result
 * as carefully as the positive one.
 *
 * Compliance rule that governs every line in this file: the people we
 * interview are six months or more removed from the companies they are asked
 * to discuss (see /compliance/expert-vetting). We do not source a
 * competitor's sitting head of growth to hand over this quarter's plan. Copy
 * must describe pattern recognition from operators who ran the motion, never
 * insider access to a live playbook.
 *
 * Evidence rule: claims about what we have found should trace back to the
 * nine published channel-discovery studies in case-studies.ts (category
 * "direct"). If a claim cannot be checked against a published study, either
 * cut it or mark it as a general observation. Do not invent metrics.
 *
 * House rule, same as case-studies.ts: no engagement prices here. Pricing
 * lives on /pricing.
 */

export type GtmPage = {
  slug: string;
  id: string;
  name: string;              // tile NAME (uppercased)
  title: string;             // <title> tag, ≤60 chars
  description: string;       // meta description
  oneLiner: string;          // hub tile body
  pageLede: string;          // detail-page lede paragraph
  /** Who we put on the call. */
  whoWeAsk: readonly string[];
  /** Trigger moments — when this engagement earns its keep. */
  whenToRun: readonly string[];
  /** Deliverables, named as concretely as we can name them. */
  whatYouGet: readonly string[];
  /** What the client has to supply. Sets expectations before the kick-off. */
  whatWeNeed: readonly string[];
  /** The questions we actually put to the operators. */
  questionsWeAsk: readonly string[];
  /**
   * The negative result. The part that saves the most money and the part
   * most research skips.
   */
  ruleOut: {
    label: string;
    meta: string;
    items: readonly { name: string; why: string }[];
  };
  /**
   * Honest limits. What this method cannot tell you, stated before you buy
   * it rather than discovered afterwards.
   */
  limits: readonly { name: string; why: string }[];
  /** A worked example, drawn from a published study wherever one exists. */
  worked: {
    label: string;
    setup: string;
    did: string;
    found: string;
    /** Slug in case-studies.ts, so the reader can check the full write-up. */
    studySlug?: string;
  };
  timeline: string;
  faq: readonly { q: string; a: string }[];
  relatedSlugs: readonly string[];
  /** Slugs in case-studies.ts (category "direct") that evidence this page. */
  caseStudySlugs: readonly string[];
  primaryKW: string;
};

/**
 * The acquisition channels we hold an opinion on, rendered on the hub.
 * Where a claim references our own tests, it refers to the nine published
 * channel-discovery studies.
 */
export const GTM_CHANNELS: readonly { name: string; note: string }[] = [
  {
    name: "Cold outbound",
    note: "Won or shared the win in seven of our nine published channel tests. It suits a buyer you can name and put on a list. When it fails, the list is usually wrong well before the copy is.",
  },
  {
    name: "Paid search",
    note: "Depends entirely on whether people already search for the category. It won outright for self-storage software and live lessons. It lost outright for a creator platform, a new PR marketplace, a social app and a functional drink, and the reason was the same every time: nobody searches for a category they have never heard of.",
  },
  {
    name: "Paid social",
    note: "Good at reaching a lot of people cheaply, bad at proving any of them are your buyer. It won for a consumer rewards app and a DTC drink, where people discover things by scrolling. It lost for self-storage software, fleet-safety hardware and escrow payments, where the purchase is considered and the buyer is at work.",
  },
  {
    name: "SEO and content",
    note: "Pays back over quarters rather than weeks, which is the wrong shape for a team that needs a channel working by June. Still worth starting early where the category has search demand, because the curve only begins when you do.",
  },
  {
    name: "Partnerships",
    note: "Slow to build and awkward to attribute. It also produced the sharpest step change we have seen in these tests, when a single agency partner brought a batch of brands with it. Worth the patience where someone else already aggregates your buyer.",
  },
  {
    name: "Referral",
    note: "Rarely the first channel and often the cheapest one after the first channel works. In two of our tests it turned an expensive win into an affordable one, because customers who liked the product kept introducing others at close to no cost.",
  },
  {
    name: "Events and field",
    note: "Should be measured on pilots and qualified conversations months later, not badges scanned on the day. For enterprise hardware sold to a short, named buyer list, it beat every paid channel we put against it.",
  },
  {
    name: "Community and creator",
    note: "Works where your buyer already gathers. Building the gathering yourself is a different project on a longer timeline, and teams routinely underestimate how much longer.",
  },
  {
    name: "Marketplaces and app stores",
    note: "Distribution you rent rather than own. Fine while it lasts. Price in the risk that the platform changes its ranking, raises its fees, or decides to compete with you directly.",
  },
  {
    name: "PR and earned media",
    note: "Moves hiring and fundraising more reliably than it moves pipeline. Budget it as a credibility line unless you have evidence of your own that says otherwise.",
  },
];

/**
 * Aggregate findings across the nine published channel-discovery studies.
 * Rendered on the hub. Every line here should be checkable against those
 * write-ups — that is the point of publishing it.
 */
export const GTM_EVIDENCE: readonly { finding: string; detail: string }[] = [
  {
    finding: "Search demand is the whole question for Google",
    detail:
      "Across the nine, paid search won outright twice, lost outright four times, and produced a thin secondary stream in the other three. Both wins came from categories buyers already searched for by name: storage software, a specific skill to learn. Every loss came from a category that did not yet exist in the buyer's head. Budget and creative did not change that in a single case.",
  },
  {
    finding: "Paid social splits on whether the buyer is at work",
    detail:
      "It carried the consumer engagements, where discovery happens by scrolling. It lost every considered B2B purchase we tested it on: back-office software, enterprise hardware, high-value payments. Fleet safety managers do not buy a wearable device from an Instagram ad.",
  },
  {
    finding: "Outbound is the default answer for a nameable buyer",
    detail:
      "Where the buyer set was small enough to list, outbound won or shared the win. That covers seven of the nine, including the retail and partner side of two consumer businesses whose customer-facing channel was something else entirely. It is unfashionable and it keeps working, because a defined list is the one asset paid channels cannot replicate.",
  },
  {
    finding: "The second channel usually makes the first one affordable",
    detail:
      "Referral and partnerships rarely won on their own. They repeatedly turned a working but expensive channel into a cheap one, which is a different and less celebrated kind of win.",
  },
  {
    finding: "The bar you measure against decides the answer",
    detail:
      "Every study measured to something the client could not fake: a published guide, an activated trial, a launched campaign, a booked pilot, a completed transaction. Sign-ups and clicks would have ranked the channels differently, and wrongly, in most of them.",
  },
];

export const gtmPages: readonly GtmPage[] = [
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "growth-operator-interviews",
    id: "01",
    name: "GROWTH OPERATOR INTERVIEWS",
    title: "Growth Operator Interviews - Heads of Growth",
    description:
      "One-hour calls with former VPs of Marketing, CMOs and Heads of Growth from competing and comparable companies. What they ran, what it cost, and what they would not repeat.",
    oneLiner:
      "Calls with the VPs of Marketing and Heads of Growth who already ran your motion somewhere else.",
    pageLede:
      "You are about to spend money answering a question other people have already answered with theirs. We find those people and put them on a call with you: former VPs of Marketing, CMOs, Heads of Growth and demand-generation leads at companies selling to the same buyer. Most of them will tell you exactly where the budget went, how long it took to admit a channel was not working, and what they would do differently with your constraints.",
    whoWeAsk: [
      "Former VPs of Marketing and CMOs at direct competitors, past the six-month cooling-off window",
      "Heads of Growth at companies selling to the same buyer at a similar price point",
      "Demand-generation and performance leads who personally held the channel budget",
      "First marketing hires and founders who built the motion from nothing",
      "Agency and fractional operators who have run the category across several accounts",
    ],
    whenToRun: [
      "You are about to fund a channel nobody on the team has run before",
      "A competitor is visibly growing and no internal explanation holds up",
      "The founder-led channel has plateaued and the second one is a guess",
      "A new VP of Marketing wants an outside read before committing to a plan",
      "The board is asking why acquisition cost moved and you have theories rather than evidence",
      "An agency is pitching hard and you want a second opinion from someone with no fee at stake",
    ],
    whatYouGet: [
      "60-minute calls with operators screened for direct experience of your motion",
      "A written discussion guide, agreed with you before the first call",
      "An anonymised profile of each operator before you commit to the call",
      "Full transcript within one business day",
      "A written synthesis across the set: where operators agreed, where they contradicted each other, and what the disagreement tells you",
      "Compliance attestation on file for every call, retained seven years",
    ],
    whatWeNeed: [
      "The question, written down. A paragraph is enough and we will help you sharpen it",
      "Your current channel numbers, however rough, so operators have something concrete to react to",
      "A list of companies you consider comparable, plus any you would rather we avoided",
      "About two hours of someone senior's time across the engagement, if you want to sit in on calls",
    ],
    questionsWeAsk: [
      "Which channel produced your first hundred customers, and would you start there again?",
      "What did you spend on that produced nothing, and how long did it take to admit it?",
      "What did a qualified lead cost once you stripped out the ones that never closed?",
      "Which competitor's growth do you rate, and what do you think they are actually doing?",
      "What did you believe when you started that turned out to be wrong?",
      "If you were handed our budget tomorrow, what would you refuse to spend it on?",
    ],
    ruleOut: {
      label: "Who Does Not Get On The Call",
      meta: "Screening, and why it is strict",
      items: [
        {
          name: "Anyone inside the cooling-off window",
          why: "Operators must be six months or more past their last day at any company they are asked to discuss. A sitting competitor executive is not a source we will use, however willing they are.",
        },
        {
          name: "Advisors who never held the budget",
          why: "Strategy consultants and board advisors can describe the plan. We want the person who watched the spend fail and had to explain it to a board.",
        },
        {
          name: "Operators from a different buyer",
          why: "Selling software to enterprise procurement and selling the same software to owner-operators are different jobs. Adjacent-sounding experience produces confident answers that do not transfer.",
        },
        {
          name: "Anyone we cannot verify",
          why: "Employment history is checked before an operator is proposed. If the record does not support the claim on the profile, the call does not happen.",
        },
        {
          name: "Anything touching material non-public information",
          why: "Unannounced launches, live deal terms and unreleased figures are out of scope. Calls are monitored and we end them when a line is approached.",
        },
        {
          name: "Anyone with a stake in your decision",
          why: "An operator who now sells the channel they are being asked to assess is conflicted. We disclose the conflict and, in most cases, we do not use them.",
        },
      ],
    },
    limits: [
      {
        name: "It will not tell you what works for you",
        why: "It tells you what happened to them, in detail, with the reasoning. Applying that to your product, price and stage is a judgement call, and we will make ours explicit rather than pretend it is a finding.",
      },
      {
        name: "It is not a substitute for running the test",
        why: "Six operators can tell you a channel is unlikely to work and still be wrong about you. What they reliably do is change what you test first and what you stop funding.",
      },
      {
        name: "Small samples behave like small samples",
        why: "Five or six calls are enough to see a pattern and nowhere near enough to be statistically confident. Where you need a number rather than a pattern, the benchmarks engagement is the right tool.",
      },
      {
        name: "Nothing confidential comes out of it",
        why: "The cooling-off rule and the MNPI screen exist for good reasons and they cost you something real. What survives is the durable stuff, which is most of what matters for a channel decision.",
      },
    ],
    worked: {
      label: "A pay-per-click PR marketplace",
      setup:
        "The company had built a marketplace where brands pay publishers per click for editorial coverage. The model was genuinely new, which meant nobody was searching for it. The team wanted to know where its buyers actually were.",
      did: "We interviewed performance-marketing and PR leads who had bought in the category, alongside agency operators who had run the buying for several brands.",
      found:
        "Its VP Marketing put it plainly afterwards: they had invented a category, so nobody was searching for them yet. Once that was clear, the plan moved to reaching the named buyer directly instead of waiting for search demand that was not coming.",
      studySlug: "gtm-performance-pr-marketplace",
    },
    timeline: "3–5 days to first call",
    faq: [
      {
        q: "Are these people currently working at my competitors?",
        a: "No. Every expert must be at least six months removed from any company they are asked to discuss, measured from their last day of employment, board service or active advisory work. What you get is pattern recognition from someone who ran the motion, not a sitting insider handing over a live plan. In practice the rule costs less than it sounds: acquisition economics and channel dynamics move a lot more slowly than quarterly plans do.",
      },
      {
        q: "Is it legal to ask a competitor's former growth lead how they grew?",
        a: "Yes, inside the framework that governs every FieldSignal call. The cooling-off rule, the ban on requesting or sharing material non-public information, live monitoring and a seven-year audit trail all apply here exactly as they do on the investor side. What is out of scope is any current confidential plan, unannounced launch or unreleased figure. If a call drifts toward one, we stop it.",
      },
      {
        q: "How is this different from asking my own network?",
        a: "Your network is small, friendly, shares your assumptions and has a reason to be encouraging. We screen for people with no relationship to you, brief them on a specific written question, and run the call on the record. The value is usually in the operator who tells you something you did not want to hear.",
      },
      {
        q: "How many calls do I need?",
        a: "Three tells you what one person believes. Six to eight starts producing a pattern, including the operators who contradict each other, which is often the most useful part. For a single channel question most clients run five to eight. For a full channel strategy, twelve to twenty across several operator types.",
      },
      {
        q: "Can I join the calls myself?",
        a: "Yes, and most clients do. You can also send the question and take the transcript and synthesis instead. Both are common, and joining tends to produce better follow-up questions than we would think to ask.",
      },
      {
        q: "What happens if an operator turns out to be wrong?",
        a: "It happens, and we would rather it happened visibly. The synthesis reports dissent instead of averaging it away, so when two operators disagree you see both positions and our read on which one fits your situation better.",
      },
    ],
    relatedSlugs: ["channel-discovery", "icp-and-buyer-research", "gtm-benchmarks"],
    caseStudySlugs: ["gtm-travel-creator-platform", "gtm-performance-pr-marketplace"],
    primaryKW: "growth operator interviews",
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "channel-discovery",
    id: "02",
    name: "CHANNEL DISCOVERY",
    title: "GTM Channel Discovery - Find What Actually Works",
    description:
      "We test five acquisition channels against one qualified-customer bar and report which one works, which do not, and why. Ranked channels and a budget plan in five to eight weeks.",
    oneLiner:
      "Five channels tested against one qualified bar. You get a ranking, the reasoning, and a budget plan.",
    pageLede:
      "Most teams find their channel by spending across four at once and reading the wreckage six months later. This does the same job deliberately. We agree a qualified-customer bar you cannot fake, test the candidate channels against it in parallel, cut each one the moment its signal stalls, and write up why every channel won or lost. Nine of these are published on the site, so you can see the shape of the output before you commit to anything.",
    whoWeAsk: [
      "Growth operators who have run each candidate channel for a buyer like yours",
      "Buyers in your target segment, on how they actually found their current vendor",
      "Agency leads with visibility of channel economics across several comparable accounts",
      "Former performance leads at competitors, on what their cost per qualified lead really was",
    ],
    whenToRun: [
      "Budget is approved and nobody can say where it should go",
      "The founder-led channel has stopped scaling and the next one is a guess",
      "You have just raised, and headcount and spend are about to go up against an unproven motion",
      "You are entering a new segment or geography where the existing channel may not transfer",
      "A channel is being defended internally on sunk cost rather than evidence",
      "Two people on the leadership team disagree and neither has data",
    ],
    whatYouGet: [
      "A written qualified-customer definition, agreed before anything is tested",
      "Parallel tests across the candidate channels, each with a stop condition set in advance",
      "Weekly read-outs while the tests run, so nothing lands as a surprise at the end",
      "A ranking by qualified customers produced, not by clicks, sign-ups or impressions",
      "The reasoning behind every result, including every channel we tell you to drop",
      "A budget allocation plan weighted to the channels that cleared the bar",
    ],
    whatWeNeed: [
      "Enough test budget for each paid channel to reach a readable signal. We size this with you first and will say if it is too thin to learn anything",
      "Access to your analytics and CRM, or whatever you use to see what happened after the click",
      "Someone who can approve creative and copy inside a few days, since a slow approval loop is the most common cause of a slipped timeline",
      "Agreement, in writing, on the qualified bar before we start. This is the part clients want to skip and the part that decides whether the results mean anything",
    ],
    questionsWeAsk: [
      "What counts as a customer worth acquiring, and what have we been counting instead?",
      "Where does this buyer go when they decide to solve this problem?",
      "Does search intent for this category already exist, or would we be creating the demand?",
      "Which channels can isolate this buyer, and which can only reach a crowd containing them?",
      "At what cost per qualified customer does each channel stop making sense?",
      "What would have to be true for the channel we are least excited about to win?",
    ],
    ruleOut: {
      label: "Channels To Avoid",
      meta: "Findings we deliver as often as wins",
      items: [
        {
          name: "Paid search where no intent exists",
          why: "This is the single most common negative finding in our published work. Four of nine engagements ended with Google ruled out, and the reason never varied: buyers do not search for a category they have not heard of, so there is no demand to capture and the auction just bills you for finding out.",
        },
        {
          name: "Broad paid social for a considered B2B purchase",
          why: "It lost in every considered B2B test we ran it in, including back-office software, fleet hardware and high-value payments. Reach stays cheap and qualification does not, so cost per qualified customer lands several times above the headline cost per lead.",
        },
        {
          name: "Influencer spend without a fit test first",
          why: "Audience size is not audience relevance, and the spend is usually justified after the fact by impressions, which is why it survives longer than it should. It worked well for a DTC drink and produced very little for a creator platform, and the difference was whether the audience contained buyers.",
        },
        {
          name: "SEO as the first channel",
          why: "It compounds, which means it pays late. A team that needs a working channel this quarter and picks content will spend two quarters finding that out. Start it early by all means, but do not count it as the answer to the immediate question.",
        },
        {
          name: "Everything at twenty percent of budget",
          why: "Splitting spend evenly across five channels means none of them reaches the volume needed to read a signal. It looks prudent in a board deck and it produces five inconclusive results instead of one useful one.",
        },
        {
          name: "Brand spend before a channel works",
          why: "Brand makes a working channel cheaper. It does not make a broken one work, and it is close to impossible to hold accountable while you are still looking for the first channel that converts.",
        },
      ],
    },
    limits: [
      {
        name: "A test tells you about the version you tested",
        why: "A channel can fail on the offer, the creative, the list or the landing page rather than on the channel itself. We separate these where the data allows and flag it plainly when we cannot.",
      },
      {
        name: "Some channels cannot be read in eight weeks",
        why: "SEO, community and most partnerships pay back over quarters. We can assess whether they are worth starting and what they would cost, but a short test will not tell you what they return.",
      },
      {
        name: "Thin budget produces a thin answer",
        why: "Below a certain spend the result is noise wearing the costume of a finding. We will tell you before we start if the budget cannot support a readable test, which sometimes means recommending you do not run one yet.",
      },
      {
        name: "Sometimes the honest answer is that none of them work",
        why: "That is usually a positioning or ICP problem in a channel costume. We say so and point you at the buyer research rather than sell a second round of the same test.",
      },
    ],
    worked: {
      label: "A platform for travel creators",
      setup:
        "The company let travel creators build and sell interactive guides to their followers. Growth depended on signing creators who already had an audience. Budget was approved and could not be spread five ways on faith.",
      did: "We tested five channels against one bar: creators who actually published a guide, rather than anyone who signed up. Each channel was cut the moment its qualified-signup signal stalled.",
      found:
        "Outbound won, and referral made it cheaper still because the creators who joined kept introducing others for almost nothing. Google lost outright — creators do not search for a way to sell travel guides, so there was no intent to capture. Meta and broad influencer spend could not isolate creators with real audiences, so cost per active creator ran too high.",
      studySlug: "gtm-travel-creator-platform",
    },
    timeline: "5–8 weeks",
    faq: [
      {
        q: "Do you run the ads yourselves?",
        a: "No. We design the test, agree the qualified bar, set the stop conditions and read the result. Execution runs through your team or your agency. We do not sell media, take commission or manage spend, which is the whole reason our answer on whether a channel is worth running is worth having.",
      },
      {
        q: "What counts as a qualified customer?",
        a: "Whatever you cannot fake. Across the nine published studies it has been a published guide, an activated trial, a launched campaign, a booked pilot and a completed transaction. In B2B software it is usually a qualified opportunity rather than a demo request. Agreeing this is most of the work, and skipping it is why so many channel tests are unreadable afterwards.",
      },
      {
        q: "Why five channels?",
        a: "It is what has fitted the budget and the calendar in practice, not a rule. Five is enough to cover the plausible candidates and few enough that each one gets the volume it needs to be readable. If your situation only has three realistic candidates we will test three and say so.",
      },
      {
        q: "What if the answer is that none of the channels work?",
        a: "We deliver it. It has usually meant the buyer definition or the positioning is wrong rather than the channels, and the right next step is the ICP work, not another round of tests.",
      },
      {
        q: "How much budget do the tests need?",
        a: "It depends on your price point and how many buyers exist, so we size it with you before starting. The honest version: if the budget cannot get each paid channel to a readable signal, the test will produce noise, and we would rather tell you that upfront than take the fee.",
      },
      {
        q: "Can we run this while our current channels keep going?",
        a: "Yes, and most clients do. The tests run alongside whatever is already working. We only ask that you do not change the existing spend mid-test, because it makes the comparison unreadable.",
      },
    ],
    relatedSlugs: ["channel-teardowns", "growth-operator-interviews", "gtm-benchmarks"],
    caseStudySlugs: [
      "gtm-travel-creator-platform",
      "gtm-self-storage-saas",
      "gtm-escrow-payments-fintech",
    ],
    primaryKW: "gtm channel discovery",
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "channel-teardowns",
    id: "03",
    name: "CHANNEL TEARDOWNS",
    title: "Channel Teardowns - One Channel, Taken Apart",
    description:
      "One acquisition channel taken apart by operators who have run it for your buyer. What it costs, where it breaks, and what has to be true before it pays.",
    oneLiner:
      "One channel, taken apart by the operators who ran it. Economics, failure modes, preconditions.",
    pageLede:
      "Sometimes the question is not which channel but whether this one will work. A teardown takes a single channel — outbound, paid search, partnerships, whatever is on the table — and puts it in front of operators who have run it for a buyer like yours. You end up with the real economics, the failure modes in the order they usually appear, and an honest list of what has to be true before it pays.",
    whoWeAsk: [
      "Operators who ran this specific channel at a company selling to your buyer",
      "The person who killed it, where a comparable company tried it and stopped",
      "Agency leads holding comparable data across several accounts in the same channel",
      "Customers who arrived through this channel, on what actually got their attention",
    ],
    whenToRun: [
      "A channel is being proposed internally and nobody in the room has run it",
      "An existing channel is degrading and you need to know whether it is fixable",
      "An agency is pitching and you want an independent read before signing a twelve-month contract",
      "You are copying a competitor's visible motion without knowing its economics",
      "The board is pushing a channel you suspect is wrong for this buyer and you need more than a hunch",
    ],
    whatYouGet: [
      "Realistic economics for the channel in your category, sourced from operators rather than published averages",
      "The failure modes, in the order they usually show up",
      "Preconditions: what has to be true before this channel pays, written as a checklist you can hold up against your own situation",
      "A verdict — run it, run it later, or do not run it — with the reasoning attached",
      "Transcripts from every call behind the verdict, so you can check our reading against the source",
    ],
    whatWeNeed: [
      "The channel, and what is prompting the question. An agency pitch and a board mandate produce different research",
      "What you have already tried in the channel, including the parts that went badly",
      "Your rough price point and sales cycle, since both change the economics more than anything else",
      "A named internal owner. Teardowns that land with nobody accountable tend to change nothing",
    ],
    questionsWeAsk: [
      "What did this channel cost you per closed customer, fully loaded?",
      "How long before you knew it was working, and what was the first honest signal?",
      "What broke it — creative, list, offer, targeting, or the buyer simply not being there?",
      "Who does this channel work for, and how are they different from us?",
      "What did you have in place that made it work, and would it have worked without that?",
      "If we run it anyway, what is the cheapest way to find out we were wrong?",
    ],
    ruleOut: {
      label: "Verdicts We Deliver",
      meta: "The teardown often ends in no",
      items: [
        {
          name: "Right channel, wrong sequence",
          why: "The channel works in the category but not at your stage. We say when to revisit it and what has to be in place first, which is more useful than declaring it dead.",
        },
        {
          name: "Works for them, not for you",
          why: "A competitor's visible channel usually rests on an asset you do not have: an installed base, a brand, a partner who aggregates the buyer, a founder with an audience. Copying the surface without the asset is the expensive version of the same idea.",
        },
        {
          name: "The economics only close at a price you do not charge",
          why: "Plenty of channels work at a higher contract value. If the arithmetic needs a price point twice yours, you are looking at a pricing decision rather than a channel one, and it is worth naming that before the spend starts.",
        },
        {
          name: "Structurally unattributable",
          why: "Some channels cannot be measured well enough to manage. Worth running only if you can live with spending against a number you will never fully trust, and worth deciding that consciously.",
        },
        {
          name: "It works and it will not scale",
          why: "A channel can be genuinely profitable and capped at a volume that does not move your plan. Small buyer populations do this a lot, and the ceiling rarely appears in a pitch deck.",
        },
        {
          name: "Fine channel, wrong buyer",
          why: "In the fleet-safety engagement, consumer-style ads were being run at an enterprise sale. The channel was not broken. The match between channel and buyer was.",
        },
      ],
    },
    limits: [
      {
        name: "Operator economics are ranges, not your numbers",
        why: "You are getting what it cost people like you, which is a far better starting point than a published average and still not a forecast. We present ranges and say how many operators each one rests on.",
      },
      {
        name: "Recall degrades",
        why: "Operators remember the shape of a result better than the decimal places. We prefer a range someone is confident about to a precise number they are reconstructing, and we mark which is which.",
      },
      {
        name: "A verdict is a judgement, not a proof",
        why: "We will tell you what we think and why. Reasonable people with the same transcripts could reach a different call, which is exactly why you get the transcripts.",
      },
      {
        name: "Some channels have no comparable operators",
        why: "For genuinely novel motions there may be nobody who has run it for your buyer. When that is the case we say so before taking the engagement rather than substituting adjacent experience and hoping.",
      },
    ],
    worked: {
      label: "Fleet driver-safety hardware",
      setup:
        "The company made a wearable device and dashboard that detects driver drowsiness for commercial fleets. Its buyers were fleet and safety managers at logistics operators. Paid ads were running with no clear return and the founder wanted to know whether they ever could.",
      did: "We put paid channels up against direct outreach and in-person events, measured to booked pilots and qualified sales conversations rather than clicks.",
      found:
        "Outbound and industry events won, because a small, known set of buyers answered direct approaches and wanted to see the product in person. Google and LinkedIn captured a thin stream from fleets already researching fatigue monitoring. Meta lost outright. As the founder put it afterwards, they had been running consumer-style ads for an enterprise sale to a short, named list.",
      studySlug: "gtm-fleet-safety-hardware",
    },
    timeline: "2–4 weeks",
    faq: [
      {
        q: "Which channels can you tear down?",
        a: "Cold outbound, paid search, paid social, SEO and content, partnerships and co-marketing, referral, events and field, community and creator, marketplaces and app stores, and PR. If your motion involves something not on that list, ask. The only real constraint is whether we can source operators who have run it for your buyer.",
      },
      {
        q: "Is this a benchmark report?",
        a: "No. Published benchmarks average across companies that share nothing but a software category, which is why every team reading one quietly assumes it sits on the good side of the median. A teardown is sourced from named-role operators who sold to your buyer, and the ranges arrive with the reasoning behind them. If you want survey-scale numbers instead, that is the benchmarks engagement.",
      },
      {
        q: "Can you tear down a channel we already run?",
        a: "It is one of the most common versions of this work. We interview operators who ran it elsewhere and compare their economics and failure modes against yours. The usual finding is that the channel is fine and one input is wrong, which is a much cheaper fix than switching channels.",
      },
      {
        q: "How many operators go into one teardown?",
        a: "Typically five to eight for a single channel. Fewer than four and you are reading one person's experience. More than about ten and the marginal call stops changing the picture, though we will run more where operators are split.",
      },
      {
        q: "What if your verdict contradicts our agency?",
        a: "Then you have two views and one of them comes from people with no fee riding on the answer. We are happy to put the findings in front of the agency, and their response to the operator evidence is usually informative in itself.",
      },
    ],
    relatedSlugs: ["channel-discovery", "growth-operator-interviews", "gtm-benchmarks"],
    caseStudySlugs: [
      "gtm-performance-pr-marketplace",
      "gtm-fleet-safety-hardware",
      "gtm-dtc-wellness-beverage",
    ],
    primaryKW: "marketing channel teardown",
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "icp-and-buyer-research",
    id: "04",
    name: "ICP & BUYER RESEARCH",
    title: "ICP and Buyer Research - Who Actually Buys",
    description:
      "Interviews with real buyers and the operators who sold to them, establishing who your customer actually is, who signs, and where they were before they bought.",
    oneLiner:
      "Who actually buys, who signs, and where they were before they bought. From buyers, not personas.",
    pageLede:
      "A lot of channel failures are ICP failures that took six months and a budget to surface. Before you spend against a buyer definition, it is worth testing whether that buyer exists, holds the budget, and is anywhere near the place you plan to reach them. We interview people who recently bought in your category, including the ones who bought from a competitor and the ones who decided to do nothing.",
    whoWeAsk: [
      "Buyers in your target segment who bought in this category in the last year",
      "Buyers who evaluated and chose a competitor, or chose nobody at all",
      "Former sales leaders at competitors, on who signed versus who merely took the meeting",
      "Operators who repositioned mid-flight and can describe the ICP they abandoned and why",
    ],
    whenToRun: [
      "Channels are underperforming and targeting keeps taking the blame",
      "Deals stall at the same stage and nobody can name the missing approver",
      "You are moving up or down market and the old buyer definition is being carried over untested",
      "Two teams inside the company describe the customer differently",
      "The ICP was written by the founders three years ago and has never been retested",
      "You sell to two sides of a marketplace and one side is being neglected by default",
    ],
    whatYouGet: [
      "A buyer definition grounded in interviews, with the segments that did not survive named explicitly",
      "The buying committee: who evaluates, who blocks, who signs, and who can kill it alone",
      "Trigger events — what was happening in the business the week the buyer started looking",
      "Where the buyer was before they bought, which is the part that makes any of this usable for channel work",
      "Verbatim quotes, with consent, that you can put in front of your own team",
    ],
    whatWeNeed: [
      "Your current ICP, however informal. Testing an existing definition is faster and cheaper than building one from nothing",
      "Introductions to lost deals if you have them. Buyers who chose someone else are the most useful and hardest to reach",
      "Your CRM stage definitions, so we can see where deals actually die rather than where they are recorded as dying",
      "Tolerance for an answer you will not enjoy. This engagement regularly contradicts the plan",
    ],
    questionsWeAsk: [
      "What was happening in your business the week you decided to solve this?",
      "Who else had to say yes, and who could have killed it on their own?",
      "Where were you looking, and what did you type or ask when you started?",
      "What nearly stopped you buying, and what did the vendor do that helped?",
      "Which vendors did you rule out before speaking to anyone, and why?",
      "Six months on, would you buy it again?",
    ],
    ruleOut: {
      label: "Buyers To Stop Chasing",
      meta: "Segments that do not survive contact",
      items: [
        {
          name: "The enthusiastic non-buyer",
          why: "Takes every meeting, gives excellent feedback, holds no budget. Entire pipelines get built on this person because the activity metrics look healthy right up until the quarter closes.",
        },
        {
          name: "The user who is not the purchaser",
          why: "Targeting the person who will use the product when a different function signs the contract produces high engagement and low revenue. It is common in tools sold into operations, and it usually shows up as a stalled stage rather than a lost deal.",
        },
        {
          name: "Segments that only close with heroic sales effort",
          why: "They do close, so nobody questions them. They also consume several times the sales cost of an adjacent segment, which only becomes visible when someone measures cost to acquire per segment instead of in aggregate.",
        },
        {
          name: "The aspirational logo tier",
          why: "Large accounts that appear in the plan because they would look good on the website. Usually a different product, a different cycle length and, honestly, a different company.",
        },
        {
          name: "The side of the marketplace nobody owns",
          why: "In two-sided businesses one side tends to get the budget and the other gets hope. In the live-lessons engagement, demand and supply needed completely different channels, and only one of them was being funded.",
        },
        {
          name: "The buyer you inherited from the pitch deck",
          why: "Fundraising narratives calcify. A definition written to make a market look big is not the same as one written to make targeting work, and the two drift apart quietly.",
        },
      ],
    },
    limits: [
      {
        name: "Buyers reconstruct their reasoning",
        why: "People rationalise after the fact. We ask about sequence and specific events rather than motivation, because what someone did in a given week is far more reliable than why they say they did it.",
      },
      {
        name: "Lost deals are hard to reach",
        why: "Buyers who chose a competitor are the most valuable interviews and the least willing. We get them more often than not, and we tell you the achieved split rather than quietly filling the gap with easier interviews.",
      },
      {
        name: "It will not size your market",
        why: "This tells you who buys and why. How many of them exist is a different question, and /use-cases/market-sizing is the engagement for it.",
      },
      {
        name: "Redefining the ICP is the easy part",
        why: "Acting on it means changing targeting, messaging, comp plans and sometimes the roadmap. We can tell you what the buyer research says. Whether the organisation will accept it is not something research decides.",
      },
    ],
    worked: {
      label: "A marketplace for live lessons",
      setup:
        "The company ran a marketplace for booking live lessons and masterclasses from experts. It had two sides — learners who buy and creators who teach — and growth spend was going out with no clear read on returns.",
      did: "We split the research by side, measuring the demand side to completed bookings rather than clicks or views, and reading creator acquisition on teachers who actually published and stayed active.",
      found:
        "Learners searched for the specific skill they wanted, so search converted and paid social filled the funnel cheaply without closing bookings. Supply behaved completely differently: active teachers introduced other experts far more cheaply than paid acquisition ever did. The two sides needed separate channels and separate budgets.",
      studySlug: "gtm-live-lessons-marketplace",
    },
    timeline: "3–5 weeks",
    faq: [
      {
        q: "How is this different from talking to our own customers?",
        a: "Your customers already chose you, so they can only explain why the current motion works. This deliberately includes buyers who chose a competitor and buyers who chose nothing, because that is where the positioning and channel problems are visible.",
      },
      {
        q: "Do you produce personas?",
        a: "No. Personas are a summary format that tends to outlive the evidence underneath them. You get the buyer definition, the committee, the triggers, the segments we ruled out, and the interviews they came from.",
      },
      {
        q: "We already have an ICP. Can you just test it?",
        a: "Yes, and it is the faster and cheaper version. Send us the definition and we will interview against it, then report which parts held, which did not, and how confident we are in each.",
      },
      {
        q: "How many interviews does this take?",
        a: "Usually fifteen to thirty, split across current buyers, competitor buyers and no-decision buyers. Below about twelve you cannot separate a pattern from a personality.",
      },
      {
        q: "Will you talk to our existing customers?",
        a: "If you want us to, yes, and it is often worth including a few for contrast. We would not build the engagement on them, for the reason above.",
      },
    ],
    relatedSlugs: ["channel-discovery", "growth-operator-interviews", "gtm-benchmarks"],
    caseStudySlugs: ["gtm-social-rewards-app", "gtm-live-lessons-marketplace"],
    primaryKW: "icp research",
  },

  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "gtm-benchmarks",
    id: "05",
    name: "GTM BENCHMARKS",
    title: "GTM Benchmarks - Numbers From Comparable Firms",
    description:
      "Acquisition cost, conversion, cycle length and team shape collected from operators at genuinely comparable companies, with the sample size published alongside every range.",
    oneLiner:
      "Acquisition cost, conversion, cycle length and team shape from companies genuinely like yours.",
    pageLede:
      "Published benchmark reports average across companies that share nothing but a software category, which is why every team reading one assumes it sits on the good side of the median. We collect the same numbers from a screened set of operators at genuinely comparable companies, and we publish the sample size next to every range — including when the sample is small.",
    whoWeAsk: [
      "Growth and marketing leaders at companies matched on buyer, price point and motion",
      "Finance and revenue-operations leads who owned the numbers rather than presented them",
      "Former operators at direct competitors, on the economics they inherited and left behind",
      "Agency and fractional leads who can give ranges across several comparable accounts",
    ],
    whenToRun: [
      "The board is asking whether your acquisition cost is normal and nobody can answer",
      "Planning season, and next year's targets are being set off internal history alone",
      "A channel looks expensive and you have nothing outside the company to compare it against",
      "Sales cycle length is being blamed on the market with no external reference point",
      "You are sizing a growth team and guessing at the shape of it",
      "You are preparing to raise and expect to be asked about efficiency",
    ],
    whatYouGet: [
      "Ranges for acquisition cost, conversion and cycle length, split by channel and segment",
      "The sample described honestly: how many operators, how comparable, how recent",
      "Team shape at your stage — headcount, seniority mix, and what comparable companies outsourced",
      "Where you sit against each range, and which gaps are worth acting on rather than merely noting",
      "The anonymised raw responses, so you can check the reasoning instead of taking the median on trust",
    ],
    whatWeNeed: [
      "Your own numbers, calculated the way you calculate them. We will normalise, but we need the raw definition first",
      "A clear statement of what counts as comparable to you: buyer, price point, motion, geography",
      "Willingness to contribute your figures to the anonymised aggregate. Reciprocity is a large part of why operators answer",
      "Realism about sample size. A tightly defined comparable set is more useful and smaller than a broad one",
    ],
    questionsWeAsk: [
      "What did you pay to acquire a customer in this channel, fully loaded?",
      "What share of leads from this channel reached a real opportunity?",
      "How long from first touch to signature, and where did the time actually go?",
      "How many people ran this, and which parts did you outsource?",
      "What changed in the last year, and was it you or the market?",
      "Which of your own numbers would you not trust if someone else quoted them to you?",
    ],
    ruleOut: {
      label: "Benchmarks To Distrust",
      meta: "Why most published numbers mislead",
      items: [
        {
          name: "Vendor-published category averages",
          why: "Collected from the vendor's own customers and framed to make the vendor's category look efficient. Directionally interesting and structurally biased, and the methodology section usually tells you so if you read it.",
        },
        {
          name: "Blended acquisition cost",
          why: "A single blended figure hides the one channel doing the work and the three being subsidised by it. Ask for the split before acting on it, and be suspicious when the split is not available.",
        },
        {
          name: "Any range without a sample size",
          why: "A benchmark that does not say how many companies it rests on is not a benchmark. We publish ours, including the times it is twelve rather than fifty.",
        },
        {
          name: "Numbers from a different price point",
          why: "Acquisition economics scale with contract value. A benchmark drawn from companies charging ten times your price is describing a different business with the same job title.",
        },
        {
          name: "Medians presented without spread",
          why: "The distance between the top and bottom quartile is usually more informative than the middle, and it is the first thing dropped when a benchmark is turned into a slide.",
        },
        {
          name: "Anything more than two years old",
          why: "Paid channel costs, platform rules and buyer behaviour have all moved sharply since 2023. An old benchmark is a historical record rather than a target.",
        },
      ],
    },
    limits: [
      {
        name: "Self-reported numbers carry self-reporting bias",
        why: "Operators round in flattering directions, and finance and marketing rarely calculate acquisition cost the same way. We ask how the number was built, publish the definition alongside it, and accept ranges rather than push for precision that does not exist.",
      },
      {
        name: "A tight comparable set means a small sample",
        why: "The more precisely you define comparability, the fewer companies qualify. You can have twelve genuinely comparable respondents or fifty loosely comparable ones. We will tell you which you are getting before we start.",
      },
      {
        name: "We cannot benchmark you against a named company",
        why: "Against the segment, yes. Against a specific named competitor's current figures, no — that runs into the cooling-off rule and, for public companies, into material non-public information.",
      },
      {
        name: "A benchmark is not a target",
        why: "Being above the median is not automatically a problem and being below it is not automatically fine. What the number is for is starting a better internal argument than the one you are currently having.",
      },
    ],
    worked: {
      label: "What nine channel tests showed in aggregate",
      setup:
        "Across the nine channel-discovery engagements published on this site, the same channels came up repeatedly against different buyers, price points and categories.",
      did: "We looked at how each channel performed across all nine, and at what separated the wins from the losses rather than at the headline result.",
      found:
        "Paid search won outright twice and lost outright four times, and the split was always whether category search demand already existed. Paid social carried the consumer engagements and lost every considered B2B one. Outbound won or shared the win in seven. None of that is a benchmark you should apply to your own plan blind, but it is the kind of pattern a benchmark engagement is built to establish properly, with a defined sample and a stated method.",
    },
    timeline: "3–6 weeks",
    faq: [
      {
        q: "How do you get people to share real numbers?",
        a: "Anonymity, reciprocity and payment. Responses are anonymised before they reach you, participants receive the aggregate, and operators are compensated for their time. We also accept ranges instead of pushing for false precision, which raises both the response rate and the honesty.",
      },
      {
        q: "How large is the sample?",
        a: "It depends on how narrowly you define comparable. A broad category question can reach fifty or more responses. A tightly defined set of direct comparables might be twelve. We agree the target before starting and report the achieved number either way, including when it lands short of what we hoped.",
      },
      {
        q: "Can you benchmark us against named competitors?",
        a: "Against the segment, yes. Against a named company's current figures, no. That runs into the cooling-off rule and, for public companies, into material non-public information. What we can source is what former operators there experienced at least six months ago.",
      },
      {
        q: "How do you handle everyone calculating CAC differently?",
        a: "We ask how the number was built before we ask what it is — whether it includes salaries, agency fees, tooling, blended or paid-only. Then we normalise where we can and publish the definition where we cannot. A benchmark without a stated definition is close to useless.",
      },
      {
        q: "Do we have to share our own numbers?",
        a: "It is not mandatory, but it is a large part of why operators agree to answer. Contributing to the anonymised aggregate is the norm and it improves what you get back.",
      },
    ],
    relatedSlugs: ["channel-teardowns", "channel-discovery", "growth-operator-interviews"],
    caseStudySlugs: ["gtm-ai-fashion-imaging", "gtm-self-storage-saas"],
    primaryKW: "gtm benchmarks",
  },
] as const;
