# fieldsignal-mcp

Local **Model Context Protocol** (MCP) server that gives Claude Code direct
read/write access to the FieldSignal Supabase database (`posts`, `transcripts`)
and the `blog-images` storage bucket.

It is the same data layer as `lib/db/posts.ts` and `lib/db/transcripts.ts`,
exposed as MCP tools. Anything Claude creates here is indistinguishable from
rows created via the admin UI.

## What this lets Claude do

- List, read, create, update, delete, and schedule **blog posts**
- List, read, create, update, delete, and schedule **transcripts**
- Upload images to the `blog-images` Supabase Storage bucket and get back a
  public URL ready to drop into a markdown post body

All writes use the **service-role key** so they bypass RLS. Keep that key
local — never commit it.

## Prerequisites

- **Node.js 18+** (`node -v`)
- This file lives at `fieldsignal-next/mcp-server/`; the credentials it needs
  already exist in `fieldsignal-next/.env.local`

## Install

```bash
cd /Users/guildyharvey/Desktop/Fieldsignal/fieldsignal-next/mcp-server
npm install
```

That's it — no build step. The server is a single ES-module file
(`index.mjs`) executed by Node.

## Configure Claude Code

Claude Code reads MCP server config from `~/.claude.json`. Add an entry under
`mcpServers` — create that key if it doesn't already exist.

```json
{
  "mcpServers": {
    "fieldsignal": {
      "command": "node",
      "args": [
        "/Users/guildyharvey/Desktop/Fieldsignal/fieldsignal-next/mcp-server/index.mjs"
      ],
      "env": {
        "NEXT_PUBLIC_SUPABASE_URL": "https://YOUR-PROJECT-REF.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "<paste-from-.env.local>"
      }
    }
  }
}
```

> Copy the real values from `fieldsignal-next/.env.local` (which is gitignored).
> Never commit the real `SUPABASE_SERVICE_ROLE_KEY` to this repo — GitHub Push
> Protection will block the push, and even if it didn't, the key would be
> publicly readable.
> If you ever rotate the service-role key, update both `.env.local` and
> `~/.claude.json`.

Restart Claude Code (close + reopen the terminal session, or `:q` and relaunch).

## Verify it's wired up

Inside Claude Code:

- Run `/mcp` — `fieldsignal` should be listed as connected.
- Or ask Claude: *"List my draft posts using the FieldSignal MCP tools."*
  Claude should call `list_posts` with `status: "draft"` and return results.

If the server fails to start, Claude Code surfaces the stderr from `node`.
The most common cause is missing env vars — make sure both
`NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set in the
`env` block above.

## Tools exposed

| Tool                  | What it does                                                                 |
| --------------------- | ---------------------------------------------------------------------------- |
| `list_posts`          | List posts (filter by `draft` / `published` / `all`, default 20 rows).       |
| `get_post`            | Fetch a single post including markdown body, by slug.                        |
| `create_post`         | Create a new post; slug auto-derived from title.                             |
| `update_post`         | Partial update of a post by slug.                                            |
| `delete_post`         | Delete a post by slug. Irreversible.                                         |
| `schedule_post`       | Set `status=published` + future `publishedAt` to schedule a post.            |
| `list_transcripts`    | List transcripts.                                                            |
| `get_transcript`      | Fetch a single transcript (preview + gated content), by slug.                |
| `create_transcript`   | Create a new transcript; slug auto-derived; `display_id` auto-incremented.   |
| `update_transcript`   | Partial update of a transcript by slug.                                      |
| `delete_transcript`   | Delete a transcript by slug. Irreversible.                                   |
| `schedule_transcript` | Schedule a transcript for future publication.                                |
| `upload_image`        | Upload a base64-encoded image to `blog-images` and return its public URL.    |

## Conventions

- Slug derivation matches `lib/db/posts.ts` (`max 100`) and
  `lib/db/transcripts.ts` (`max 120`): lowercase, non-alphanumerics → hyphens,
  trim edges.
- `status: "published"` + future `publishedAt` = **scheduled**. The public
  site already filters `published_at <= now`, so a future date acts as a
  release date without extra plumbing.
- `create_transcript` requires `complianceConfirmed: true` to publish — same
  rule as the admin form. **Never use real expert names** in `expertRole`;
  always anonymise.
- All errors are returned as MCP tool errors with a clean message — the
  server never crashes the stdio transport on a bad call.

## Security notes

- This server runs **locally** and only over **stdio** — there's no network
  listener. Only the Claude Code process that spawned it can talk to it.
- The service-role key is passed via the MCP `env` block in `~/.claude.json`,
  so it stays out of this repo. Don't commit `~/.claude.json` anywhere.
- If you ever want to share this MCP server with another teammate, give them
  their own service-role key (or revoke and rotate after sharing).

## Manual smoke test

You can run the server directly to confirm it boots:

```bash
# Substitute your real values from .env.local (do NOT paste the secret here
# if you'll commit/share this terminal output anywhere):
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=<paste-from-.env.local> \
node /Users/guildyharvey/Desktop/Fieldsignal/fieldsignal-next/mcp-server/index.mjs
```

It will print `[fieldsignal-mcp] ready on stdio` and then wait for JSON-RPC
input. Ctrl-C to quit.
