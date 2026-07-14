-- ═══════════════════════════════════════════════════════════════════
-- SOCIAL CONTENT HUB — `social_post_status`
-- ═══════════════════════════════════════════════════════════════════
--
-- Backs the Posted tick on /admin/social.
--
-- Post CONTENT lives in the repo (content/social/posts.json) — it is
-- static and costs nothing to read. Only the tick state lives here, one
-- small row per post that has been ticked. A post with no row is "todo".
--
-- That keeps a page load at ~15KB of Supabase egress instead of ~3MB.
--
-- Run once in the Supabase SQL editor, then seed with:
--   node --env-file=.env.local scripts/seed-social-status.mjs
--
-- RLS is ON with NO policies, so the anon key reads nothing. Only the
-- service-role client (used by the auth-gated admin) can see it.
-- ═══════════════════════════════════════════════════════════════════

create table if not exists public.social_post_status (
  key        text primary key,   -- stable content-derived id from posts.json
  status     text not null default 'todo' check (status in ('todo', 'posted')),
  updated_at timestamptz not null default now()
);

alter table public.social_post_status enable row level security;

-- If you already created the fat `social_posts` table from the earlier
-- version, it is no longer used. Drop it to reclaim the space:
--   drop table if exists public.social_posts;
