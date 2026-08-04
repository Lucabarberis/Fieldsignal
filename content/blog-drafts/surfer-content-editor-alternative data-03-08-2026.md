# Alternative Data: What It Is and How Funds Use It

Alternative data refers to non-traditional, non-broker research information that investors use alongside company filings, earnings reports, and corporate disclosures. It's data gathered from nontraditional sources, and it's reshaping how investment firms build conviction. Here's what you need to know.

## What is alternative data? (fast answer)

Alternative data is information generated as a byproduct of digital and physical activity, not curated for investors. Think credit card transactions, mobile app usage, web traffic, satellite imagery, social media commentary. It reflects real-world behavior continuously, rather than on a quarterly reporting schedule.

Funds use alternative data to get timelier signals on company performance, consumer demand, and risk than they can from traditional financial data alone. It provides insights before traditional financial disclosures hit the wire, giving asset managers and hedge fund managers a window into what's actually happening at a business between earnings calls.

The alternative data market is expected to grow significantly. Some projections put the CAGR at 54.4% until 2030. By one estimate, the market hit USD 18.8 billion in 2025 and could reach USD 276.9 billion by 2033. Buy-side firms reportedly spend billions on alternative data annually, and demand for alternative data has surged over the past decade. Roughly [78% of funds now use or expect to use alt data](https://alternativedata.org/stats/), up from 52% in 2016.

To be clear: alternative data doesn't replace traditional data or broker research. It narrows the information gap between real-world activity and reported numbers. It provides insights beyond traditional financial data, helping you form sharper hypotheses and catch risks earlier.

## How alternative data is generated and classified

Alternative data generated from different origins carries different cost, noise, and compliance risk profiles. Understanding where data comes from helps you evaluate what's worth buying.

Traditional data sources, like 10-Ks, company filings, broker research, and pricing feeds, are structured and arrive on fixed schedules. Alternative data is collected from sensors, satellites, and public records, plus digital systems and mobile devices that weren't built for investors. It can include credit card transactions and social media commentary, among many other signals.

The literature groups alternative data sources into three origin classes:

1. **Individual-generated data.** Social media posts, product reviews, expert interviews, support forum threads. These capture intent, satisfaction, and expectations.

2. **Business process-generated data.** Aggregated credit card transactions, e-commerce order logs, payroll data, logistics and supply chain records. Produced by companies during normal operations.

3. **Sensor-generated data.** Satellite imagery of parking lots, AIS ship tracking, flight tracking for corporate jets, IoT sensors in factories. Common types of alternative data include satellite imagery and credit card transactions across these categories.

Much of this is unstructured data. It requires data science skills, computing power, and infrastructure (NLP pipelines, image processing, geospatial analysis) before it becomes investable. That's a real barrier for lean teams.

![An aerial photograph captures a bustling commercial shipping port, showcasing rows of stacked containers and cargo ships docked along the waterfront. This scene reflects the critical role of alternative data sources in the finance industry, as data generated from such ports can inform investment decisions and provide insights into consumer behavior and market movements.](https://images.surferseo.art/c15cfa5b-5f21-44fb-82cc-cd680b6387c1.png)

## Major types of alternative data investors actually buy

Despite thousands of alternative datasets on the market, most spending from hedge funds, mutual funds, and private equity firms lands in a handful of categories.

**Consumer transaction data.** Aggregated debit and credit card transaction records, bank account aggregation, and email receipt parsing. Credit card transactions are a common type of alternative data and held roughly [17.6% of alt data provider revenue share in 2025](https://www.grandviewresearch.com/industry-analysis/alternative-data-market). Funds use this to forecast retailer revenues and benchmark private companies against public comps.

**Web and app usage.** Site traffic, conversion funnels, mobile app usage downloads, and active user counts. Web traffic data indicates consumer interest before purchases occur, making it useful for flagging growth or churn ahead of earnings reports.

**Geolocation and foot traffic.** Anonymized GPS or mobile ad ID data tied to physical points of interest. Visit counts and dwell time at retail locations, gyms, restaurants. Providers like [ADVAN FiT](https://advanresearch.com/products/fit) offer ticker-level foot traffic across 10,000+ tickers and 9M+ POIs.

**Web-scraped data.** Prices, product listings, reviews, job postings. Scraped data is heavily used in e-commerce, travel, and hiring trend analysis for near-real-time supply and demand signals.

**Sentiment data.** Natural language processing scores applied to social media, forums, news, and expert transcripts. Social media commentary provides insights into consumer sentiment and can quantify tone shifts over time through sentiment analysis.

**Satellite and geospatial imagery.** Satellite imagery can monitor construction progress, inventory at ports, and supply chain issues. IoT sensors collect real-time data on consumer behavior and industrial output.

## Individual-generated alt data: from social sentiment to expert insight

Individual generated data tends to be noisy, but it's uniquely rich on intent, satisfaction, and expectations. That makes it valuable for identifying patterns that quantitative data alone won't show.

Social media commentary on Twitter/X, Reddit, TikTok, and Weibo gives early signals on product adoption, backlash, or viral marketing effects. Social sentiment shifts can precede formal announcements by days or weeks. Product reviews and app store ratings help financial analysts understand feature reception, pricing sensitivity, and competitive positioning.

Tracking spikes in app usage for fintech, food delivery, or gaming and tying them to trade theses is now standard. AI is used to streamline analysis of alternative data across these text-heavy sources, making it faster to extract consumer insights and marketing strategies signals from millions of posts.

Expert interviews are a high-signal form of individual-generated data. Former employees, customers, suppliers, or partners share what they saw on the ground. These insights are qualitative but can be structured into themes, metric ranges, and operational benchmarks. Alternative data is analyzed using a combination of technology and human input, and expert insight sits squarely on the human side. Companies use alternative data like this for market research and consumer insights.

At [FieldSignal](https://www.fieldsignalhq.com/), most alternative data we help clients access is expert insight, not exhaust from apps or sensors. It gives context to the numbers you already have.

## Business process and sensor data: transactions, foot traffic, and beyond

These categories are the backbone of most paid data subscriptions. They're easier to quantify, backtest, and integrate into models, which is why institutional investors favor them.

Consumer transaction data works through panels that aggregate and anonymize card spend. Funds correlate this spend to reported revenue at public retailers or subscription businesses. It's effective for forecasting quarterly sales for a specific ticker or benchmarking a private company against public comps using financial transactions.

Foot traffic data measures visit counts to malls, QSR chains, gyms, and big-box retailers. It can forecast same-store sales or indicate share shifts between brands. Geolocation data assesses economic activity in real estate investments and retail site selection.

Satellite data has grown more sophisticated. Recent [academic work combines synthetic aperture radar and nighttime lights to nowcast port-level trade flows](https://arxiv.org/abs/2604.15444) with strong out-of-sample accuracy. Alternative data helps predict company performance and stock market movements when these sensor feeds are modeled correctly.

Ancillary sensor datasets include weather, ship and truck telematics, and flight tracking. Risk management involves analyzing shipping data and weather patterns for commodity, travel, and industrial theses.

These sources often require long historical backfills and serious data science effort to separate real market signals from noise and seasonality.

![A satellite view showcases agricultural land characterized by diverse crop patterns and intricate irrigation systems, illustrating the use of satellite imagery in analyzing farming practices. This visual data can provide actionable insights for investment decisions in the finance industry, particularly for asset managers and hedge fund managers looking to understand market movements and consumer behavior.](https://images.surferseo.art/5537d1e2-57f8-4d28-97e8-a1c2c9b5cce6.png)

## How funds integrate alt data into research workflows

Hedge funds, long-only managers, and PE/VC teams use alt data differently, but the integration pattern follows a common structure. Integration of alternative data with traditional financial models can be complex, but it follows a repeatable process.

A common 5-step workflow:

1. **Define the question.** Revenue growth? Churn? Market entry? Risk detection?

2. **Shortlist relevant alternative data providers.** Based on data type, geography, latency, cost, compliance.

3. **Run a backtest or pilot.** Check data against known historical performance and earnings.

4. **Integrate into models.** Build a scorecard or quantitative model combining alt signals with financial statements.

5. **Monitor and iterate.** Watch for drift, vendor methodology changes, false positives.

Discretionary long/short equity funds combine credit card data, web traffic, and expert calls to build confidence before and after earnings. PE and growth equity teams use alt data during commercial due diligence: validating customer concentration, churn, unit economics, and market share claims.

Corporate strategy teams and M&A analysts increasingly use alternative data for market entry sizing, competitive intensity checks, and pricing intelligence. Alternative data is used for corporate strategy and competitive analysis across the finance industry and beyond. It's utilized across various industries including finance and retail.

Alt data is rarely used stand-alone. It's paired with financial statements, broker research, internal CRM data, and management commentary. Over 1,190 full-time alternative data employees were estimated in 2017, and that number has grown substantially. Investors use alternative data to anticipate market trends and to identify market trends potentially ahead of competitors. Using alternative data can enhance investment decision accuracy. It's become essential for investment decision-making.

Smaller firms often lack in-house data science, so they rely on curated dashboards, data vendors, and expert networks to translate raw data into actionable insights and inform investment decisions.

## Benefits and limits of alternative data for investors

Alternative data is now standard at institutional funds, but it isn't a magic bullet.

**Benefits.** Timeliness: intraday or weekly signals vs quarterly financial analysis cycles. Granularity: store-level, SKU-level, cohort-level data that helps identify patterns invisible in aggregate numbers. Orthogonal views: alt data can surface contradictions between management narratives and on-the-ground reality, giving you a competitive edge.

Alt data surfaces risk early. Slowing app usage before a guidance cut, falling foot traffic before consensus revisions. Combining it with broker research and expert views improves conviction, especially in crowded consensus trades. It helps you make better data analysis and risk assessment decisions.

**Limits.** Data quality and noise are significant challenges of using alternative data. Sample bias in card panels can underrepresent certain demographics or geographies. Survivorship bias means new entrants may lack history. Data vendors change methodology without warning, breaking historical continuity.

Compliance with privacy laws is critical when using alternative data. GDPR, CCPA, and material nonpublic information rules require rigorous review. Alternative data may violate privacy, raising regulatory concerns if sourcing and anonymization aren't handled properly. Financial inclusion considerations add another layer.

High costs associated with alternative data include acquisition and processing expenses. Smaller firms should focus on a small number of high-signal alternative data sets plus high-quality primary research instead of collecting everything. Economic indicators from a few trusted sources beat a dozen noisy feeds.

## Choosing and working with alternative data providers

The endless choice of top alternative data providers is a real problem. Selection mistakes waste budget and time.

Evaluation criteria worth checking:

* **Coverage.** Geography, sectors, historical depth.

* **Sampling methodology.** Panel size, data generation methods, cleaning processes.

* **Frequency and latency.** T+1, hourly, daily refresh.

* **Privacy and compliance.** How each provider handles anonymization, consent, audit trails.

Practical questions to ask a data provider: How is the data sourced? What's excluded? What biases are known? What's the refresh cycle? Have there been major methodology changes since 2020?

Integration matters too. Check file formats, APIs, documentation, and whether they provide example code or data science support. The financial world moves fast, and onboarding delays kill projects.

Pricing models vary. Flat annual licenses vs usage-based pricing change total cost of ownership. Infrastructure costs for storage and compute can double what you pay the vendor. Don't overpay for alternative datasets whose signal you can't statistically validate in your current stack.

Many funds now mix "hard" data providers (card panels, satellite data, patent data) with expert networks like [FieldSignal](https://fieldsignalhq.com/resources/blog/expert-networks-in-2026-how-deal-teams-actually-use-them) to get both quantitative and qualitative edges from different alternative data sources.

## Where FieldSignal fits: expert insights as alternative data

FieldSignal is a boutique expert network, not a card or satellite data vendor. If you're priced out of GLG, AlphaSights, Third Bridge, or Guidepoint, this matters.

FieldSignal connects you with former employees, customers, channel partners, and suppliers who speak to unit economics, tech stack decisions, churn drivers, and competitive dynamics. These conversations function as alternative data: they're individual-generated, non-broker primary research that provides context on why quantitative signals are changing.

Use cases for the target reader:

* **PE/VC associates.** Pre-investment diligence on growth claims, customer satisfaction, pricing power.

* **Corporate strategy teams.** Competitive intelligence, market entry validation, leadership assessment.

* **Founders.** Pre-launch or pre-fundraise market validation with real customer and industry feedback.

Operational details that matter: pay-per-use pricing with no annual retainers, no minimum commitment. Expert honoraria are passed through without markup. Compliance infrastructure matches what you'd get at GLG or Guidepoint: expert vetting, exclusion lists, MNPI screening, confidentiality agreements.

Unlike large networks, FieldSignal doesn't require opaque contract minimums. You can scope one-off projects, run structured surveys, or set up multi-expert panel calls. Such data from a company's investor relations department or management team tells you one story. Experts who worked inside the business tell you another.

You can combine expert transcripts with your existing alt data feeds (card spend, app usage trends) to test hypotheses quickly without building a big internal data team.

![A group of professionals is engaged in a focused discussion around a modern conference table, equipped with laptops, as they analyze alternative data sources to inform investment decisions and gain a competitive edge in the finance industry. The atmosphere suggests collaboration on data analysis related to company performance and market movements.](https://images.surferseo.art/1ae6460a-aabb-4bab-a486-ad41280be434.png)

## Practical playbooks: using alt data across the deal cycle

Here are four concrete playbooks tying alt data and expert insight to specific project phases.

### Pre-LOI playbook (PE/VC)

Use web-scraped data and app usage metrics to build a quick market map. Layer in web traffic trends and review data to size the opportunity. Then run 3 to 5 FieldSignal expert calls to sanity-check growth, churn, and pricing claims. This gives you timely insights before you commit resources.

### Exclusive diligence playbook

Combine credit card transactions or other business process data with store and app reviews. Pair with detailed expert interviews on go-to-market efficiency, customer satisfaction, and unit economics. You're cross-referencing the data gathered from digital sources with what people who worked inside the company actually experienced.

### Post-close portfolio monitoring

Track alternative data signals like foot traffic or app DAUs for early warning of market movements. Schedule periodic expert check-ins to understand what's driving changes. Is churn increasing? New competitor entering? Operational issues?

### Corporate M&A or strategy playbook

Use alternative data to size demand in a new region or segment. Scrape competitor prices and product offerings. Then talk to local customers, ex-employees, or distributors through FieldSignal to understand how incumbents really compete. Investors use alternative data here to inform investment decisions and strategic planning.

Each playbook works for lean teams. You don't need a dedicated alternative data group or full-time data science staff. Disciplined, repeatable use of a few targeted inputs plus structured expert work outperforms ad hoc "interesting datasets" every time. The stock market rewards process, not volume of information.

## Summary and next step

Alternative data is non-traditional information, from card data and web/app usage to foot traffic, sentiment, and expert insight, that now sits alongside financial statements and broker research as a core input for the finance industry. It gives you a view into consumer behavior, competitive dynamics, and operational reality that traditional sources alone can't provide.

The edge comes from how you integrate alt data into your research process, not from hoarding the most datasets.

FieldSignal gives you access to high-signal, compliant expert-generated alternative data without committing to a six-figure retainer. Pay-per-use, no minimums, pass-through costs.

**See if FieldSignal fits your project.** Send a 2 to 3 sentence description of your research scope to [miles@fieldsignalhq.com](mailto:miles@fieldsignalhq.com) and you'll get a fast, concrete quote.