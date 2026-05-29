#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════
 * FieldSignal MCP Server
 * ═══════════════════════════════════════════════════════════════════
 *
 * Local Model Context Protocol server that gives Claude direct
 * read/write access to the FieldSignal Supabase database.
 *
 * Exposes tools for:
 *   - posts table (list/get/create/update/delete/schedule)
 *   - transcripts table (list/get/create/update/delete/schedule)
 *   - blog-images storage bucket (upload)
 *
 * Conventions mirror lib/db/posts.ts and lib/db/transcripts.ts so
 * anything created here is indistinguishable from rows created via
 * the admin UI.
 *
 * Transport: stdio.
 * Auth: Supabase service-role key (bypasses RLS).
 * ═══════════════════════════════════════════════════════════════════
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase client ────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "[fieldsignal-mcp] Missing env vars. Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// ─── Slugify (matches lib/db/posts.ts + lib/db/transcripts.ts) ──────

function slugify(input, max = 100) {
  return String(input ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip combining marks
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, max);
}

const slugifyPost = (s) => slugify(s, 100);
const slugifyTranscript = (s) => slugify(s, 120);

// ─── Row ↔ domain mapping ──────────────────────────────────────────

function rowToPostMeta(row) {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    author: row.author,
    tags: row.tags ?? [],
    status: row.status,
    publishedAt: (row.published_at ?? "").slice(0, 10),
    updatedAt: row.updated_at ? row.updated_at.slice(0, 10) : undefined,
  };
}

function rowToPost(row) {
  return { ...rowToPostMeta(row), body: row.body };
}

function rowToTranscript(row) {
  return {
    slug: row.slug,
    id: row.display_id,
    title: row.title,
    description: row.description,
    expertRole: row.expert_role,
    companyContext: row.company_context,
    companySlug: row.company_slug,
    topicSlug: row.topic_slug,
    topicLabel: row.topic_label,
    industrySlugs: row.industry_slugs ?? [],
    publishedAt: (row.published_at ?? "").slice(0, 10),
    updatedAt: row.updated_at ? row.updated_at.slice(0, 10) : undefined,
    wordCount: row.word_count,
    preview: row.preview,
    gatedTeaser: row.gated_teaser,
    gatedContent: row.gated_content ?? undefined,
    relatedSlugs: row.related_slugs ?? [],
    primaryKW: row.primary_kw,
    status: row.status,
    complianceConfirmed: row.compliance_confirmed,
  };
}

function rowToTranscriptMeta(row) {
  const t = rowToTranscript(row);
  return {
    slug: t.slug,
    id: t.id,
    title: t.title,
    description: t.description,
    status: t.status,
    publishedAt: t.publishedAt,
    topicLabel: t.topicLabel,
    companyContext: t.companyContext,
  };
}

// ─── Helpers ───────────────────────────────────────────────────────

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function ok(data) {
  return {
    content: [
      { type: "text", text: JSON.stringify(data, null, 2) },
    ],
  };
}

function err(message) {
  return {
    isError: true,
    content: [
      { type: "text", text: String(message) },
    ],
  };
}

async function safeCall(fn) {
  try {
    return await fn();
  } catch (e) {
    return err(e instanceof Error ? e.message : String(e));
  }
}

// ─── Tool definitions ──────────────────────────────────────────────

const tools = [
  // ─── Posts ────────────────────────────────────────────────────────
  {
    name: "list_posts",
    description:
      "List blog posts. Returns slug, title, description, status, publishedAt for each. Defaults to 20 most recent posts of any status.",
    inputSchema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: ["draft", "published", "all"],
          description: "Filter by status (default: 'all'). 'published' includes future-dated scheduled posts.",
        },
        limit: {
          type: "number",
          description: "Maximum rows to return (default 20).",
        },
      },
    },
  },
  {
    name: "get_post",
    description: "Fetch a single blog post (including full markdown body) by slug.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
    },
  },
  {
    name: "create_post",
    description:
      "Create a new blog post. Slug is auto-derived from title using the same algorithm as the admin UI. Defaults: status='draft', publishedAt=today, author='FieldSignal Team', tags=[].",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        body: { type: "string", description: "Markdown body." },
        author: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        status: { type: "string", enum: ["draft", "published"] },
        publishedAt: { type: "string", description: "ISO date YYYY-MM-DD. Future date + status='published' = scheduled." },
        slug: { type: "string", description: "Optional explicit slug; otherwise derived from title." },
      },
      required: ["title", "description", "body"],
    },
  },
  {
    name: "update_post",
    description:
      "Partial update of a blog post. Only provided fields are changed. Returns the updated row.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        body: { type: "string" },
        author: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        status: { type: "string", enum: ["draft", "published"] },
        publishedAt: { type: "string" },
      },
      required: ["slug"],
    },
  },
  {
    name: "delete_post",
    description: "Delete a blog post by slug. Irreversible.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
    },
  },
  {
    name: "schedule_post",
    description:
      "Schedule a post for future publication: sets status='published' and publishedAt to the given future ISO date. The public site already filters published_at <= now, so this acts as a scheduled release.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string" },
        publishedAt: { type: "string", description: "Future ISO date YYYY-MM-DD." },
      },
      required: ["slug", "publishedAt"],
    },
  },

  // ─── Transcripts ──────────────────────────────────────────────────
  {
    name: "list_transcripts",
    description:
      "List transcripts. Returns slug, display id, title, description, status, publishedAt, topic and company.",
    inputSchema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          enum: ["draft", "published", "all"],
        },
        limit: { type: "number" },
      },
    },
  },
  {
    name: "get_transcript",
    description: "Fetch a single transcript (including preview + gated content) by slug.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
    },
  },
  {
    name: "create_transcript",
    description:
      "Create a new transcript. Slug auto-derived from title. display_id auto-incremented from current row count. See lib/db/transcript-types.ts for field semantics. complianceConfirmed MUST be true to publish.",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        expertRole: { type: "string", description: "Anonymised role descriptor — NEVER a real name." },
        companyContext: { type: "string" },
        companySlug: { type: "string" },
        topicSlug: { type: "string" },
        topicLabel: { type: "string" },
        industrySlugs: { type: "array", items: { type: "string" } },
        wordCount: { type: "number" },
        preview: { type: "string", description: "Free preview text (target 300-500 words)." },
        gatedTeaser: { type: "string", description: "1-2 sentences teasing the paywalled content." },
        gatedContent: { type: "string" },
        relatedSlugs: { type: "array", items: { type: "string" } },
        primaryKW: { type: "string" },
        status: { type: "string", enum: ["draft", "published"] },
        complianceConfirmed: { type: "boolean", description: "Required true to publish." },
        publishedAt: { type: "string" },
        slug: { type: "string" },
      },
      required: [
        "title",
        "description",
        "expertRole",
        "companyContext",
        "companySlug",
        "topicSlug",
        "topicLabel",
        "industrySlugs",
        "wordCount",
        "preview",
        "gatedTeaser",
        "primaryKW",
      ],
    },
  },
  {
    name: "update_transcript",
    description: "Partial update of a transcript. Only provided fields are changed.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        expertRole: { type: "string" },
        companyContext: { type: "string" },
        companySlug: { type: "string" },
        topicSlug: { type: "string" },
        topicLabel: { type: "string" },
        industrySlugs: { type: "array", items: { type: "string" } },
        wordCount: { type: "number" },
        preview: { type: "string" },
        gatedTeaser: { type: "string" },
        gatedContent: { type: "string" },
        relatedSlugs: { type: "array", items: { type: "string" } },
        primaryKW: { type: "string" },
        status: { type: "string", enum: ["draft", "published"] },
        complianceConfirmed: { type: "boolean" },
        publishedAt: { type: "string" },
      },
      required: ["slug"],
    },
  },
  {
    name: "delete_transcript",
    description: "Delete a transcript by slug. Irreversible.",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string" } },
      required: ["slug"],
    },
  },
  {
    name: "schedule_transcript",
    description:
      "Schedule a transcript for future publication: sets status='published' and publishedAt to the given future ISO date.",
    inputSchema: {
      type: "object",
      properties: {
        slug: { type: "string" },
        publishedAt: { type: "string" },
      },
      required: ["slug", "publishedAt"],
    },
  },

  // ─── Storage ──────────────────────────────────────────────────────
  {
    name: "upload_image",
    description:
      "Upload a base64-encoded image to the 'blog-images' Supabase Storage bucket and return its public URL. Use this URL directly in markdown post bodies.",
    inputSchema: {
      type: "object",
      properties: {
        filename: { type: "string", description: "Original filename (used for slug, e.g. 'cover.png')." },
        base64: { type: "string", description: "Base64-encoded image bytes (no data URI prefix)." },
        mimeType: {
          type: "string",
          description: "Image mime type, e.g. image/png, image/jpeg, image/webp, image/gif, image/svg+xml.",
        },
      },
      required: ["filename", "base64", "mimeType"],
    },
  },
];

// ─── Tool handlers ─────────────────────────────────────────────────

const handlers = {
  // ─── Posts ────────────────────────────────────────────────────────
  async list_posts(args = {}) {
    const status = args.status ?? "all";
    const limit = typeof args.limit === "number" ? args.limit : 20;

    let q = supabase
      .from("posts")
      .select("slug,title,description,status,published_at,updated_at,author,tags")
      .order("published_at", { ascending: false })
      .limit(limit);
    if (status === "draft") q = q.eq("status", "draft");
    if (status === "published") q = q.eq("status", "published");

    const { data, error } = await q;
    if (error) throw new Error(`list_posts failed: ${error.message}`);
    return ok((data ?? []).map(rowToPostMeta));
  },

  async get_post(args) {
    if (!args?.slug) throw new Error("slug is required");
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", args.slug)
      .maybeSingle();
    if (error) throw new Error(`get_post failed: ${error.message}`);
    if (!data) return ok(null);
    return ok(rowToPost(data));
  },

  async create_post(args) {
    if (!args?.title) throw new Error("title is required");
    if (!args?.description) throw new Error("description is required");
    if (typeof args?.body !== "string") throw new Error("body is required");

    const slug = args.slug ? slugifyPost(args.slug) : slugifyPost(args.title);
    if (!slug) throw new Error("Cannot derive a slug from the title");

    // Collision pre-check
    const { data: existing } = await supabase
      .from("posts")
      .select("slug")
      .eq("slug", slug)
      .maybeSingle();
    if (existing) throw new Error(`A post with slug "${slug}" already exists`);

    const payload = {
      slug,
      title: args.title,
      description: args.description,
      body: args.body,
      author: args.author ?? "FieldSignal Team",
      tags: Array.isArray(args.tags) ? args.tags : [],
      status: args.status ?? "draft",
      published_at: args.publishedAt ?? todayISO(),
    };

    const { data, error } = await supabase
      .from("posts")
      .insert(payload)
      .select("*")
      .single();
    if (error) throw new Error(`create_post failed: ${error.message}`);
    return ok(rowToPost(data));
  },

  async update_post(args) {
    if (!args?.slug) throw new Error("slug is required");
    const { slug, ...rest } = args;

    const update = {};
    if (rest.title !== undefined) update.title = rest.title;
    if (rest.description !== undefined) update.description = rest.description;
    if (rest.body !== undefined) update.body = rest.body;
    if (rest.author !== undefined) update.author = rest.author;
    if (rest.tags !== undefined) update.tags = rest.tags;
    if (rest.status !== undefined) update.status = rest.status;
    if (rest.publishedAt !== undefined) update.published_at = rest.publishedAt;

    if (Object.keys(update).length === 0) {
      throw new Error("update_post requires at least one field besides slug");
    }

    const { data, error } = await supabase
      .from("posts")
      .update(update)
      .eq("slug", slug)
      .select("*")
      .single();
    if (error) throw new Error(`update_post failed: ${error.message}`);
    if (!data) throw new Error(`No post with slug "${slug}"`);
    return ok(rowToPost(data));
  },

  async delete_post(args) {
    if (!args?.slug) throw new Error("slug is required");
    const safe = slugifyPost(args.slug);
    if (!safe || safe !== args.slug) throw new Error(`Invalid slug "${args.slug}"`);
    const { error } = await supabase.from("posts").delete().eq("slug", safe);
    if (error) throw new Error(`delete_post failed: ${error.message}`);
    return ok({ ok: true });
  },

  async schedule_post(args) {
    if (!args?.slug) throw new Error("slug is required");
    if (!args?.publishedAt) throw new Error("publishedAt is required");
    return handlers.update_post({
      slug: args.slug,
      status: "published",
      publishedAt: args.publishedAt,
    });
  },

  // ─── Transcripts ──────────────────────────────────────────────────
  async list_transcripts(args = {}) {
    const status = args.status ?? "all";
    const limit = typeof args.limit === "number" ? args.limit : 20;

    let q = supabase
      .from("transcripts")
      .select(
        "slug,display_id,title,description,status,published_at,updated_at,topic_label,company_context",
      )
      .order("published_at", { ascending: false })
      .limit(limit);
    if (status === "draft") q = q.eq("status", "draft");
    if (status === "published") q = q.eq("status", "published");

    const { data, error } = await q;
    if (error) throw new Error(`list_transcripts failed: ${error.message}`);
    return ok((data ?? []).map(rowToTranscriptMeta));
  },

  async get_transcript(args) {
    if (!args?.slug) throw new Error("slug is required");
    const { data, error } = await supabase
      .from("transcripts")
      .select("*")
      .eq("slug", args.slug)
      .maybeSingle();
    if (error) throw new Error(`get_transcript failed: ${error.message}`);
    if (!data) return ok(null);
    return ok(rowToTranscript(data));
  },

  async create_transcript(args) {
    const required = [
      "title",
      "description",
      "expertRole",
      "companyContext",
      "companySlug",
      "topicSlug",
      "topicLabel",
      "industrySlugs",
      "wordCount",
      "preview",
      "gatedTeaser",
      "primaryKW",
    ];
    for (const k of required) {
      if (args?.[k] === undefined || args?.[k] === null) {
        throw new Error(`${k} is required`);
      }
    }

    const slug = args.slug ? slugifyTranscript(args.slug) : slugifyTranscript(args.title);
    if (!slug) throw new Error("Cannot derive a slug from the title");

    const { data: existing } = await supabase
      .from("transcripts")
      .select("slug")
      .eq("slug", slug)
      .maybeSingle();
    if (existing) throw new Error(`A transcript with slug "${slug}" already exists`);

    // Derive display_id from current row count
    const { count, error: countErr } = await supabase
      .from("transcripts")
      .select("*", { count: "exact", head: true });
    if (countErr) throw new Error(`create_transcript count failed: ${countErr.message}`);
    const displayId = String((count ?? 0) + 1).padStart(2, "0");

    const payload = {
      slug,
      display_id: displayId,
      title: args.title,
      description: args.description,
      expert_role: args.expertRole,
      company_context: args.companyContext,
      company_slug: args.companySlug,
      topic_slug: args.topicSlug,
      topic_label: args.topicLabel,
      industry_slugs: args.industrySlugs,
      word_count: args.wordCount,
      preview: args.preview,
      gated_teaser: args.gatedTeaser,
      gated_content: args.gatedContent ?? "",
      related_slugs: Array.isArray(args.relatedSlugs) ? args.relatedSlugs : [],
      primary_kw: args.primaryKW,
      status: args.status ?? "draft",
      compliance_confirmed: Boolean(args.complianceConfirmed),
      published_at: args.publishedAt ?? todayISO(),
    };

    const { data, error } = await supabase
      .from("transcripts")
      .insert(payload)
      .select("*")
      .single();
    if (error) throw new Error(`create_transcript failed: ${error.message}`);
    return ok(rowToTranscript(data));
  },

  async update_transcript(args) {
    if (!args?.slug) throw new Error("slug is required");
    const { slug, ...rest } = args;

    const map = {
      title: "title",
      description: "description",
      expertRole: "expert_role",
      companyContext: "company_context",
      companySlug: "company_slug",
      topicSlug: "topic_slug",
      topicLabel: "topic_label",
      industrySlugs: "industry_slugs",
      wordCount: "word_count",
      preview: "preview",
      gatedTeaser: "gated_teaser",
      gatedContent: "gated_content",
      relatedSlugs: "related_slugs",
      primaryKW: "primary_kw",
      status: "status",
      complianceConfirmed: "compliance_confirmed",
      publishedAt: "published_at",
    };

    const update = {};
    for (const [k, col] of Object.entries(map)) {
      if (rest[k] !== undefined) update[col] = rest[k];
    }
    if (Object.keys(update).length === 0) {
      throw new Error("update_transcript requires at least one field besides slug");
    }

    const { data, error } = await supabase
      .from("transcripts")
      .update(update)
      .eq("slug", slug)
      .select("*")
      .single();
    if (error) throw new Error(`update_transcript failed: ${error.message}`);
    if (!data) throw new Error(`No transcript with slug "${slug}"`);
    return ok(rowToTranscript(data));
  },

  async delete_transcript(args) {
    if (!args?.slug) throw new Error("slug is required");
    const safe = slugifyTranscript(args.slug);
    if (!safe || safe !== args.slug) throw new Error(`Invalid slug "${args.slug}"`);
    const { error } = await supabase.from("transcripts").delete().eq("slug", safe);
    if (error) throw new Error(`delete_transcript failed: ${error.message}`);
    return ok({ ok: true });
  },

  async schedule_transcript(args) {
    if (!args?.slug) throw new Error("slug is required");
    if (!args?.publishedAt) throw new Error("publishedAt is required");
    return handlers.update_transcript({
      slug: args.slug,
      status: "published",
      publishedAt: args.publishedAt,
    });
  },

  // ─── Storage ──────────────────────────────────────────────────────
  async upload_image(args) {
    if (!args?.filename) throw new Error("filename is required");
    if (!args?.base64) throw new Error("base64 is required");
    if (!args?.mimeType) throw new Error("mimeType is required");

    const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!allowed.includes(args.mimeType)) {
      throw new Error(`Unsupported mime type: ${args.mimeType}`);
    }

    const buffer = Buffer.from(args.base64, "base64");
    if (buffer.length === 0) throw new Error("Decoded image is empty");
    if (buffer.length > 10 * 1024 * 1024) throw new Error("Image too large (max 10 MB)");

    const ext = args.filename.split(".").pop()?.toLowerCase() || args.mimeType.split("/")[1] || "png";
    const safeName = args.filename
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
    const objectName = `${Date.now()}-${safeName || "image"}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(objectName, buffer, {
        contentType: args.mimeType,
        upsert: false,
      });
    if (uploadError) throw new Error(`upload_image failed: ${uploadError.message}`);

    const { data: pub } = supabase.storage.from("blog-images").getPublicUrl(objectName);
    return ok({ url: pub.publicUrl, objectName });
  },
};

// ─── MCP server wiring ─────────────────────────────────────────────

const server = new Server(
  {
    name: "fieldsignal-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const handler = handlers[name];
  if (!handler) {
    return err(`Unknown tool: ${name}`);
  }
  return safeCall(() => handler(args ?? {}));
});

// ─── Boot ──────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[fieldsignal-mcp] ready on stdio");
}

main().catch((e) => {
  console.error("[fieldsignal-mcp] fatal:", e);
  process.exit(1);
});
