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
  p_lag_days      int  default 3
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
         round((100.0 * (l.value - b.value) / b.value)::numeric, 1)::double precision
           as gain_pct
    from baseline b
    join latest   l on l.entity_key = b.entity_key
    join entities e on e.entity_key = b.entity_key
   where b.value > 0
     and b.value >= p_min_baseline
     and l.value > b.value
     and e.gate_status not in ('killed', 'deprioritized')
   order by gain_pct desc
   limit greatest(1, least(p_limit, 100));
$$;

-- Read-only and called only from a server route holding the service role key.
-- Granting to anon as well would put an unbounded scan of the snapshot table
-- behind a public key, which is the one thing this table cannot afford.
revoke all on function risefinder_risers(text, text, text, text, double precision, int, int) from public, anon;
grant execute on function risefinder_risers(text, text, text, text, double precision, int, int) to service_role;

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
grant execute on function risefinder_risers(text, text, text, text, double precision, int, int) to authenticator;

-- The function reads snapshots by (source, metric, captured_on) on every call.
-- Without this it is a sequential scan of ~933,000 rows per request.
create index if not exists idx_snapshots_source_metric_day
  on snapshots (source, metric, captured_on);
