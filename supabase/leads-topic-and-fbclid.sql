-- ═══════════════════════════════════════════════════════════════════
-- LEADS — add `topic` and `fbclid`
-- ═══════════════════════════════════════════════════════════════════
--
-- topic
--   Both forms now ask "what are you researching?" as a dropdown rather
--   than a written brief. It was being folded into the message text,
--   which works for reading but not for counting: you cannot group by a
--   sentence. As a column it answers "which keyword brings diligence
--   buyers and which brings market-sizing?" — worth more than cost per
--   lead alone, because it tells you what the traffic is actually for.
--
--   It also carries "Joining as an expert", which is an enquiry but not
--   a sales lead. Without somewhere to record that, people applying to
--   join the network get counted as demand.
--
-- fbclid
--   Meta's click identifier, the counterpart to gclid. Needed before any
--   Meta spend, or paid social leads arrive with no way to trace them
--   back to the ad that produced them.
--
-- Both nullable and additive. The running code neither reads nor writes
-- them until the matching deploy lands, and the insert degrades if this
-- has not been run yet. Order does not matter.
-- ═══════════════════════════════════════════════════════════════════

alter table public.leads
  add column if not exists topic text;

alter table public.leads
  add column if not exists fbclid text;

-- The per-topic rollup groups on this.
create index if not exists leads_topic_idx
  on public.leads (topic)
  where topic is not null;
