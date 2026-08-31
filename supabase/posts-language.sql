-- Add a language to every post.
--
-- The blog is becoming multi-market: German, French and Japanese articles
-- publish alongside the English ones. They are NOT translations of each
-- other -- each targets its own keyword in its own market -- so there is no
-- hreflang relationship to declare. What matters is that each page states
-- the language it is actually written in, so search engines and screen
-- readers stop treating a German article as English.
--
-- Existing rows are all English, hence the default. The default also keeps
-- older writes (and any caller that has not been updated) correct rather
-- than silently NULL.
--
-- Run once against the project:  psql "$DATABASE_URL" -f supabase/posts-language.sql

alter table public.posts
  add column if not exists language text not null default 'en';

-- Guard the vocabulary at the database, not just in TypeScript. A typo'd
-- locale would otherwise reach the <html lang> attribute and the sitemap.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'posts_language_check'
  ) then
    alter table public.posts
      add constraint posts_language_check
      check (language in ('en', 'de', 'fr', 'ja'));
  end if;
end $$;

-- The public blog index and the sitemap both filter by language, on top of
-- the existing status/published_at predicates.
create index if not exists posts_language_published_at_idx
  on public.posts (language, published_at desc);

comment on column public.posts.language is
  'BCP-47 language of the post body. Drives the lang attribute, schema.org inLanguage, and the blog index filter. Posts are independent per market, not translations of one another.';
