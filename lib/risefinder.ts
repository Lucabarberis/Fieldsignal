/**
 * Shared helpers for the RiseFinder pages.
 *
 * Dates are formatted in UTC on purpose. A briefing is stamped with the day the
 * pipeline ran, which is a UTC date with no time attached — parsing it in the
 * viewer's zone would show "1 August" to anyone west of Greenwich and quietly
 * make the archive disagree with itself.
 */

/**
 * The topic every RiseFinder signup is stored under.
 *
 * Subscribers share the `leads` table with contact-form enquiries, so this
 * string is the only thing separating them. It is defined once here and used
 * by the API route that writes it, the leads page that excludes it, and the
 * subscribers page that selects on it — three places that must agree, and
 * would silently stop agreeing if each spelled it out for itself.
 */
export const SUBSCRIBER_TOPIC = "risefinder";

/** True for a RiseFinder signup rather than a sales enquiry. */
export function isSubscriber(lead: { topic: string | null }): boolean {
  return lead.topic === SUBSCRIBER_TOPIC;
}

export function formatBriefingDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Where a reader goes to see the thing itself.
 *
 * A DELIBERATE SECOND COPY of `risefinder/links.py` in the RiseFinder
 * pipeline, and the only one in this repo. The precomputed windows arrive with
 * their URLs already built by the Python side; the custom-range API queries
 * Postgres directly and gets entity columns back with no URL attached, so the
 * rule has to exist here too. If one changes, change both — the failure mode
 * is a custom-range row linking somewhere the same row in a fixed window does
 * not, which is invisible until somebody clicks it.
 */
export function entityUrl(
  key: string,
  row: {
    listing_url?: string | null;
    domain?: string | null;
    github_repo?: string | null;
    npm_package?: string | null;
    pypi_package?: string | null;
    hf_model?: string | null;
    app_store_id?: string | null;
    name?: string | null;
  },
): string | null {
  // A stored listing URL beats every rule below. Six marketplaces mint keys of
  // the form 'plugin:<market>:<slug>' and no rule can tell them apart reliably
  // enough to guess an address.
  const stored = row.listing_url?.trim();
  if (stored) return stored;

  const [kind, ...tail] = key.split(":");
  const rest = tail.join(":");

  switch (kind) {
    case "repo":
      return `https://github.com/${row.github_repo || rest}`;
    case "app":
      return row.app_store_id
        ? `https://apps.apple.com/app/id${row.app_store_id}`
        : null;
    case "domain":
      return `https://${row.domain || rest}`;
    case "npm":
      return `https://www.npmjs.com/package/${row.npm_package || rest}`;
    case "pypi":
      return `https://pypi.org/project/${row.pypi_package || rest}/`;
    case "model":
      return `https://huggingface.co/${row.hf_model || row.name}`;
    case "dataset":
      return `https://huggingface.co/datasets/${row.name}`;
    case "extension":
      return `https://chromewebstore.google.com/detail/${rest.split(":").pop()}`;
    case "shopify_app":
      return `https://apps.shopify.com/${rest}`;
    case "plugin": {
      const [market, slug] = rest.includes(":")
        ? [rest.slice(0, rest.indexOf(":")), rest.slice(rest.indexOf(":") + 1)]
        : ["wordpress", rest];
      if (market === "wordpress") return `https://wordpress.org/plugins/${slug}/`;
      if (market === "woo") return `https://woocommerce.com/products/${slug}/`;
      if (market === "hubspot")
        return `https://ecosystem.hubspot.com/marketplace/apps/${slug}`;
      if (market === "notion") return `https://www.notion.com/integrations/${slug}`;
      // No stored URL and no derivable one. Unlinked is the honest outcome —
      // a plausible wrong page is worse than no page.
      return null;
    }
    default:
      // ProductHunt launches land here on purpose: every outbound URL they
      // publish is a producthunt.com/r/ redirect, and resolving one returns 403.
      return null;
  }
}
