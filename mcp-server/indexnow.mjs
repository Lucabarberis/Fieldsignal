/**
 * IndexNow client — notifies Bing/Yandex/DuckDuckGo (and ChatGPT search via Bing's index)
 * when URLs are created, updated, or deleted.
 *
 * Protocol: https://www.indexnow.org/documentation
 *
 * The key is published at /{INDEXNOW_KEY}.txt on the live domain, which the
 * search engines fetch to verify ownership before accepting submissions.
 *
 * Google does NOT participate in IndexNow — they removed their sitemap ping
 * endpoint in 2023 and have not adopted any replacement. For Google, manual
 * URL Inspection or sitemap-based discovery is still the only option.
 */

const INDEXNOW_KEY = "2682ac193c2f84549a65c2122f151bfb";
const HOST = "fieldsignalhq.com";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const API_ENDPOINT = "https://api.indexnow.org/IndexNow";

/**
 * Notify IndexNow that one or more URLs have changed.
 * Fails silently — indexing is fire-and-forget, never block the calling tool.
 *
 * @param {string[]} urls Absolute URLs (must be on https://fieldsignalhq.com)
 * @returns {Promise<{ok: boolean, status?: number, error?: string}>}
 */
export async function pingIndexNow(urls) {
  if (!Array.isArray(urls) || urls.length === 0) {
    return { ok: false, error: "no urls" };
  }

  // Filter to URLs on our host only — IndexNow rejects mixed hosts in one batch
  const valid = urls.filter((u) => {
    try {
      return new URL(u).host === HOST;
    } catch {
      return false;
    }
  });
  if (valid.length === 0) return { ok: false, error: "no valid urls for host" };

  try {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // Bing rejects requests with Node's default User-Agent with HTTP 403.
        // Setting an explicit one makes the request behave like a real client.
        "User-Agent": "FieldSignal-IndexNow/1.0 (+https://fieldsignalhq.com)",
        "Accept": "*/*",
      },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: valid,
      }),
    });
    // IndexNow returns 200/202 on success. 4xx if key not verifiable yet
    // (e.g. deploy hasn't published the key file). Don't throw — log.
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

/**
 * Convenience: ping IndexNow for a single blog post slug, both the post
 * URL and the blog index (so Bing re-crawls the listing).
 *
 * @param {string} slug Post slug, e.g. "expert-call-transcripts-..."
 */
export async function pingBlogPost(slug) {
  return pingIndexNow([
    `https://${HOST}/resources/blog/${slug}`,
    `https://${HOST}/resources/blog`,
  ]);
}
