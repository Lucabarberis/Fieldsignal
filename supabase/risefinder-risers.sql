-- Risers over an arbitrary date range.
--
-- WHY A FUNCTION AND NOT A QUERY FROM THE APP. The three fixed windows the
-- RiseFinder page ships with (1, 7 and 30 days) are precomputed by the Python
-- pipeline and baked into content/data/risefinder.json at deploy time. A
-- reader asking "who was rising on 15 August" or "top app risers between the
-- 10th and the 20th" is asking a question that cannot be precomputed, because
-- the set of questions is every pair of dates.
--
-- So those go to Postgres live. This function is the ONLY place that
-- computation exists on the SQL side, and it deliberately mirrors
-- `risefinder/windows.py` rule for rule:
--
--   * the baseline is the last reading at or before the start of the range
--   * a baseline older than the range start by more than p_lag_days is
--     REJECTED rather than used — a reading from three weeks before the window
--     does not describe the window, and using it anyway is how "top movers
--     this week" quietly becomes "top movers this month"
--   * a baseline below the metric's noise floor is dropped, because a package
--     going from 2 weekly downloads to 6 is +200% and means nothing
--   * killed and deprioritized entities never appear
--
-- If windows.py changes, this changes with it. Two implementations of one rule
-- is the standing risk here and there is no way around it: the page needs
-- precomputed answers to be fast and live answers to be arbitrary.
--
-- captured_on is TEXT in ISO-8601 ('2026-08-15'), which sorts and compares
-- correctly as text in both SQLite and Postgres. That is why the parameters
-- are text and not date: casting here would only add a way to disagree with
-- the column.

create or replace function risefinder_risers(
  p_source        text,
  p_metric        text,
  p_from          text,
  p_to            text,
  p_min_baseline  double precision default 0,
  p_limit         int  default 25,
  p_lag_days      int  default 3,
  -- RANKS RUN THE OTHER WAY. Majestic and Tranco measure position, where
  -- 460,092 improving to 11,003 is a rise, and every other metric here is a
  -- count where bigger is better. Computing a rank the ordinary way returns a
  -- leaderboard of the domains falling fastest, presented as the ones rising.
  p_lower_is_better boolean default false
)
returns table (
  entity_key   text,
  name         text,
  entity_type  text,
  description  text,
  listing_url  text,
  domain       text,
  github_repo  text,
  npm_package  text,
  pypi_package text,
  hf_model     text,
  app_store_id text,
  was          double precision,
  now_value    double precision,
  from_day     text,
  to_day       text,
  gain_pct     double precision
)
language sql
stable
as $$
  with baseline as (
    -- DISTINCT ON takes the last reading at or before the range start, per
    -- entity. The stale-baseline rule is applied here rather than after, so a
    -- rejected baseline removes the row instead of silently widening it.
    select distinct on (s.entity_key)
           s.entity_key, s.value, s.captured_on
      from snapshots s
     where s.source = p_source
       and s.metric = p_metric
       and s.captured_on <= p_from
       and s.captured_on >= to_char(p_from::date - p_lag_days, 'YYYY-MM-DD')
     order by s.entity_key, s.captured_on desc
  ),
  latest as (
    select distinct on (s.entity_key)
           s.entity_key, s.value, s.captured_on
      from snapshots s
     where s.source = p_source
       and s.metric = p_metric
       and s.captured_on <= p_to
       and s.captured_on >  p_from
     order by s.entity_key, s.captured_on desc
  )
  select e.entity_key, e.name, e.entity_type, e.description, e.listing_url,
         e.domain, e.github_repo, e.npm_package, e.pypi_package, e.hf_model,
         e.app_store_id,
         b.value  as was,
         l.value  as now_value,
         b.captured_on as from_day,
         l.captured_on as to_day,
         round((100.0 * (case when p_lower_is_better
                              then b.value - l.value
                              else l.value - b.value end) / b.value)::numeric,
               1)::double precision as gain_pct
    from baseline b
    join latest   l on l.entity_key = b.entity_key
    join entities e on e.entity_key = b.entity_key
   where b.value > 0
     -- THE FLOOR IS A CEILING FOR A RANK, and treating it as a floor was
     -- backwards. For a count, "at least 25 stars" excludes the noise. For a
     -- rank, where smaller is better, "at least 25" excludes nothing and
     -- "at least 200,000" would keep only the WORST ranked domains, which is
     -- the opposite of the intent. universe.py has always capped Majestic and
     -- Tranco at rank 200,000 for the same reason: the bottom of a
     -- million-row list churns constantly and means nothing.
     and (case when p_lower_is_better
               then b.value <= p_min_baseline
               else b.value >= p_min_baseline end)
     and (case when p_lower_is_better then l.value < b.value else l.value > b.value end)
     and e.gate_status not in ('killed', 'deprioritized')
   order by gain_pct desc
   limit greatest(1, least(p_limit, 100));
$$;

-- Read-only and called only from a server route holding the service role key.
-- Granting to anon as well would put an unbounded scan of the snapshot table
-- behind a public key, which is the one thing this table cannot afford.
revoke all on function risefinder_risers(text, text, text, text, double precision, int, int, boolean) from public, anon;
grant execute on function risefinder_risers(text, text, text, text, double precision, int, int, boolean) to service_role;

-- AND TO `authenticator`, WHICH IS NOT THE SAME AS MAKING IT PUBLIC.
--
-- PostgREST builds its schema cache while connected as `authenticator`, and
-- that role is NOINHERIT in Supabase — it holds anon, authenticated and
-- service_role but inherits nothing from them until it SET ROLEs. So with the
-- revoke above and no grant here, the function is invisible to the cache and
-- every call returns PGRST202 "Could not find the function ... in the schema
-- cache", which reads exactly like the migration never ran.
--
-- Execution is still gated: PostgREST switches role per request, so an
-- anonymous caller runs as `anon`, which the revoke above left with no EXECUTE
-- and therefore still cannot call this. This grant buys visibility, not access.
grant execute on function risefinder_risers(text, text, text, text, double precision, int, int, boolean) to authenticator;

-- The function reads snapshots by (source, metric, captured_on) on every call.
-- Without this it is a sequential scan of ~933,000 rows per request.
create index if not exists idx_snapshots_source_metric_day
  on snapshots (source, metric, captured_on);

-- ---------------------------------------------------------------------------
-- Many sources, one round trip
-- ---------------------------------------------------------------------------
-- WHY THIS EXISTS AND `Promise.all` DOES NOT DO THE JOB. Asking eighteen
-- sources for a custom range meant eighteen calls from Vercel to Supabase.
-- Measured: each query PLANS AND EXECUTES IN 21ms against the index, and each
-- round trip costs 370 to 1,000ms. So the work was 0.4 seconds and the talking
-- about the work was 7.5, which overran the statement timeout and returned
-- nothing at all.
--
-- Bounding the concurrency did not help, because concurrency was never the
-- problem. The fix is to stop having the conversation eighteen times: hand the
-- whole list over as JSON and let Postgres loop.
--
-- The per-source function is called through LATERAL rather than reimplemented,
-- so there is exactly one definition of what a riser is and no chance of the
-- single-source and merged answers drifting apart.
create or replace function risefinder_risers_multi(
  p_specs    jsonb,
  p_from     text,
  p_to       text,
  p_limit    int default 25,
  p_lag_days int default 3
)
returns table (
  source_label text,
  entity_key   text,
  name         text,
  entity_type  text,
  description  text,
  listing_url  text,
  domain       text,
  github_repo  text,
  npm_package  text,
  pypi_package text,
  hf_model     text,
  app_store_id text,
  was          double precision,
  now_value    double precision,
  from_day     text,
  to_day       text,
  gain_pct     double precision
)
language sql
stable
as $$
  select s.label, r.entity_key, r.name, r.entity_type, r.description,
         r.listing_url, r.domain, r.github_repo, r.npm_package, r.pypi_package,
         r.hf_model, r.app_store_id, r.was, r.now_value, r.from_day, r.to_day,
         r.gain_pct
    from jsonb_to_recordset(p_specs) as s(
           source text, metric text, min_baseline double precision,
           lower_is_better boolean, label text)
   cross join lateral risefinder_risers(
           s.source, s.metric, p_from, p_to, s.min_baseline,
           p_limit, p_lag_days, coalesce(s.lower_is_better, false)) r
   order by r.gain_pct desc
   limit greatest(1, least(p_limit, 100));
$$;

revoke all on function risefinder_risers_multi(jsonb, text, text, int, int) from public, anon;
grant execute on function risefinder_risers_multi(jsonb, text, text, int, int) to service_role, authenticator;
