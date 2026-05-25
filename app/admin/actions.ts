"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { posts, slugify } from "@/lib/db/posts";
import type { PostInput, PostStatus } from "@/lib/db/types";

/**
 * Server actions for the admin.
 *
 * Each action validates a FormData payload, calls the data repo,
 * revalidates affected paths (so the public blog refreshes), then
 * redirects.
 *
 * NOTE: These run server-side only. They write to the filesystem in
 * dev. When swapped to Supabase, they'll be writing to Postgres
 * instead — no API change needed in this file beyond what's already
 * abstracted by `posts`.
 */

function readForm(fd: FormData): PostInput {
  const title = String(fd.get("title") ?? "").trim();
  const description = String(fd.get("description") ?? "").trim();
  const slugInput = String(fd.get("slug") ?? "").trim();
  const author = String(fd.get("author") ?? "").trim();
  const tagsRaw = String(fd.get("tags") ?? "").trim();
  const body = String(fd.get("body") ?? "");
  const publishedAt = String(fd.get("publishedAt") ?? "").trim();
  const status = (String(fd.get("status") ?? "draft") as PostStatus);

  if (!title) throw new Error("Title is required");
  if (!description) throw new Error("Description is required");
  if (!author) throw new Error("Author is required");
  if (!body.trim()) throw new Error("Body cannot be empty");

  const tags = tagsRaw
    ? tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : undefined;

  return {
    title,
    description,
    author,
    body,
    slug: slugInput || undefined,
    publishedAt: publishedAt || undefined,
    tags,
    status,
  };
}

function revalidatePublicBlog(slug?: string) {
  revalidatePath("/resources/blog");
  revalidatePath("/resources");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/resources/blog/${slug}`);
}

export async function createPostAction(fd: FormData) {
  const input = readForm(fd);
  const post = await posts.create(input);
  revalidatePublicBlog(post.slug);
  redirect(`/admin/posts/${post.slug}/edit?saved=1`);
}

export async function updatePostAction(originalSlug: string, fd: FormData) {
  const input = readForm(fd);
  const post = await posts.update(originalSlug, input);
  revalidatePublicBlog(post.slug);
  if (post.slug !== originalSlug) revalidatePath(`/resources/blog/${originalSlug}`);
  redirect(`/admin/posts/${post.slug}/edit?saved=1`);
}

export async function deletePostAction(fd: FormData) {
  const raw = String(fd.get("slug") ?? "").trim();
  if (!raw) throw new Error("Missing slug");
  // Re-slugify to defend against path-traversal payloads (e.g. "../../etc/passwd")
  const slug = slugify(raw);
  if (!slug || slug !== raw) throw new Error("Invalid slug");
  await posts.delete(slug);
  revalidatePublicBlog(slug);
  redirect("/admin");
}

/** Exposed for the form's "Auto-generate slug" feature. */
export async function deriveSlugAction(title: string): Promise<string> {
  return slugify(title);
}
