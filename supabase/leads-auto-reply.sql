-- ═══════════════════════════════════════════════════════════════════
-- LEADS — add `auto_reply`
-- ═══════════════════════════════════════════════════════════════════
--
-- Brings the table to parity with the Google Sheet, whose last column
-- records the acknowledgement email sent to the enquirer — or the marker
-- "(auto reply failed to send)" when Resend rejected it.
--
-- That failure marker is the reason this is worth storing. Without it
-- there is no way to tell, weeks later, that someone wrote in and never
-- got a reply.
--
-- Adding a nullable column is backward compatible: the currently
-- deployed code neither reads nor writes it and carries on unaffected.
-- Run this in the Supabase SQL editor whenever suits.
-- ═══════════════════════════════════════════════════════════════════

alter table public.leads
  add column if not exists auto_reply text;
