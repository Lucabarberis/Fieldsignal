# Supabase migration (for when you're ready)

The admin works locally today by reading and writing MDX files in
`content/blog/`. That breaks on Vercel (read-only filesystem). When
you're ready to put the admin on the live site, migrate to Supabase.

## Why Supabase

- Postgres database (free 500 MB)
- Built-in Auth (email/password, magic link, OAuth)
- Storage for images (later)
- Same project will serve future features — client portal, expert
  portal, transcripts library

## Prerequisites

1. Free Supabase account at https://supabase.com
2. New Supabase project (pick a region close to your users)
3. Save these three values from Settings → API:
   - Project URL → goes in `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → goes in `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret key → goes in `SUPABASE_SERVICE_ROLE_KEY`
     (server-only — never expose to the browser)

## Steps

### 1. Install the client

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 2. Add `.env.local`

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Make sure `.env.local` is git-ignored (it already is in the default
Next.js `.gitignore`).

### 3. Create the schema

In the Supabase SQL editor, run:

```sql
create table posts (
  slug text primary key,
  title text not null,
  description text not null,
  body text not null,
  author text not null,
  primary_keyword text,
  tags text[],
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz not null default now(),
  updated_at timestamptz
);

-- Public can read published posts only.
alter table posts enable row level security;

create policy "public reads published posts"
on posts for select
using (status = 'published');

-- Authenticated admins can do anything.
create policy "admins do everything"
on posts for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
```

### 4. Seed from existing MDX

Write a one-off script that reads every file in `content/blog/`,
parses the frontmatter, and inserts into the `posts` table. Run it
once locally:

```bash
npm run db:seed-posts
```

### 5. Swap the implementation

Edit `lib/db/posts.ts`:

```ts
// Change this line:
export const posts: PostsRepo = fsImpl;

// To:
import { supabaseImpl } from "./supabase-posts";
export const posts: PostsRepo = supabaseImpl;
```

Create `lib/db/supabase-posts.ts` implementing the same `PostsRepo`
interface. The admin and public pages don't change.

### 6. Add auth

Install Auth.js or use Supabase Auth directly. Wrap `/admin/*` with
middleware that redirects unauthenticated requests to `/admin/login`.

Suggested approach with Supabase Auth:

```ts
// middleware.ts at project root
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();
  // ... Supabase session check, redirect to /admin/login if missing
}

export const config = { matcher: "/admin/:path*" };
```

### 7. Remove the dev-only warning banner

Delete the red banner in `app/admin/layout.tsx`. Auth now gates the
admin properly.

### 8. Deploy

`git push` to GitHub. Vercel rebuilds. `/admin` works in production.

## Scheduled posts in production

Locally, scheduled posts (`status: published` + future `publishedAt`)
appear automatically because the dev server re-reads on every request.

In production, the blog is statically generated. A post scheduled for
tomorrow at 09:00 is **not in today's build** and will stay invisible
until something triggers a rebuild or page revalidation.

The simplest fix once you're on Supabase + Vercel: a Vercel Cron job
that hits a revalidation endpoint every hour.

### Step 1 — Create the revalidate route

```ts
// app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidatePath("/resources/blog");
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ ok: true, at: new Date().toISOString() });
}
```

### Step 2 — Add the secret

```env
# .env.local
REVALIDATE_SECRET=pick-a-long-random-string
```

### Step 3 — Schedule the cron

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/revalidate?secret=$REVALIDATE_SECRET",
      "schedule": "0 * * * *"
    }
  ]
}
```

Vercel will hit the endpoint every hour. Posts whose `publishedAt`
just crossed into the past will appear on the public site within an
hour of their scheduled time.

If you want hour-precision later, switch to ISR with
`revalidate: 3600` on the blog routes — same effect, less config.

If you want minute-precision (rare for a blog), use a webhook scheduled
at the exact `publishedAt` time via Inngest, Trigger.dev or similar.

## What stays the same

- All admin UI components (`PostForm`, `AdminLayout`, etc.)
- All server actions (`createPostAction`, `updatePostAction`, etc.)
- All public blog pages (`/resources/blog`, `/resources/blog/[slug]`)
- All other public pages
- The brand system, the seven components, the Tailwind config

## Estimated time

- Supabase setup: 15 min
- Schema + RLS policies: 10 min
- Seed script: 30 min
- Swap implementation file: 30 min
- Auth + middleware: 1 hour
- Test + deploy: 30 min

**Total: ~3 hours.**
