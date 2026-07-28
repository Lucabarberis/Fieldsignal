-- ═══════════════════════════════════════════════════════════════════
-- LEADS — `leads`
-- ═══════════════════════════════════════════════════════════════════
--
-- Every contact-form submission, with the ad attribution that produced
-- it and the outcome it turned into. Backs /admin/leads.
--
-- WHY THIS EXISTS
--
-- Cost per lead can be read off a spreadsheet: count rows, divide by
-- spend. Cost per MEETING cannot — it needs each lead's outcome tracked
-- over time, and a booking to attach itself to the lead that produced
-- it. That is a row you update, not a line you append, which is what
-- makes this a table rather than another sheet column.
--
-- The Google Sheet keeps running alongside this. It is the no-login
-- view for whoever is running the campaigns; this is the durable record
-- and the target for the Calendly booking webhook.
--
-- Run once in the Supabase SQL editor.
-- ═══════════════════════════════════════════════════════════════════

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  submitted_at  timestamptz not null default now(),

  -- What they told us
  name          text not null,
  company       text,
  email         text not null,
  message       text,

  -- Where they came from. All empty for an organic /contact submission.
  source        text not null default 'organic',
  keyword       text,           -- human-readable, e.g. "glg alternative"
  keyword_slug  text,           -- the /lp/<slug> that served them
  gclid         text,           -- Google's click id, for offline conversion import
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_term      text,
  landing_path  text,

  -- What happened next. This column is the whole reason for the table:
  -- 'meeting_booked' onwards is the numerator of cost per meeting.
  status        text not null default 'new'
                check (status in ('new','contacted','meeting_booked',
                                  'meeting_held','won','lost')),
  meeting_at    timestamptz,    -- set by the Calendly webhook, later
  notes         text,

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Newest first is the only ordering the admin list uses.
create index if not exists leads_submitted_at_idx
  on public.leads (submitted_at desc);

-- The cost-per-keyword rollup groups on this.
create index if not exists leads_keyword_slug_idx
  on public.leads (keyword_slug)
  where keyword_slug is not null;

-- The Calendly webhook will match a booking to a lead by email.
create index if not exists leads_email_idx
  on public.leads (lower(email));

-- ─── Access ────────────────────────────────────────────────────────
--
-- RLS on. The public contact form runs with the ANON key and needs to
-- write exactly one thing: a new lead. It gets an insert policy and
-- nothing else — with no select policy, the anon key can submit a lead
-- but can never read one back, so a leaked anon key does not expose the
-- lead list.
--
-- The admin reads via the service-role client, which bypasses RLS
-- entirely, and is only reachable behind the /admin auth gate in
-- proxy.ts.

alter table public.leads enable row level security;

drop policy if exists "contact form may insert a lead" on public.leads;
create policy "contact form may insert a lead"
  on public.leads for insert
  to anon, authenticated
  with check (true);
