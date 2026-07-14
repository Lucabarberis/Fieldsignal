import { SocialHub } from "@/components/SocialHub";
import { socialPosts } from "@/lib/db/social";

/**
 * /admin/social — the social content hub.
 *
 * Every post derived from the blog articles, across Reddit, Medium,
 * LinkedIn, Substack, X, Quora and WSO. Copy each one in the right
 * format for its platform and tick it off when it's scheduled or live.
 *
 * Status is stored in Postgres, so it follows you between browsers and
 * machines — unlike the offline HTML version, which used localStorage.
 *
 * Auth: proxy.ts gates all of /admin. Noindex: app/admin/layout.tsx.
 */

// Status changes constantly; never serve a stale list.
export const dynamic = "force-dynamic";

export default async function AdminSocialPage() {
  const posts = await socialPosts.list();
  const posted = posts.filter((p) => p.status === "posted").length;

  return (
    <div className="px-4 sm:px-9 py-12">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-sans font-medium text-section leading-[1] tracking-[-0.022em] text-ink">
            Social content
          </h1>
          <p className="font-mono text-mono uppercase tracking-[0.08em] text-ink-3 mt-2">
            {posts.length} posts · {posted} posted · {posts.length - posted} to do
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="border border-ink/15 bg-paper-3 px-6 py-10">
          <p className="font-sans text-ink mb-3">No social posts yet.</p>
          <p className="font-sans text-[14px] text-ink-2 leading-relaxed">
            Run the migration in <code className="font-mono">supabase/social_posts.sql</code>, then
            seed the table:
          </p>
          <pre className="font-mono text-[12px] bg-paper-2 text-ink px-4 py-3 mt-3 overflow-x-auto">
            node --env-file=.env.local scripts/seed-social-to-supabase.mjs
          </pre>
        </div>
      ) : (
        <SocialHub posts={posts} />
      )}
    </div>
  );
}
