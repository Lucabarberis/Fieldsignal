"use server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Upload an image to Supabase Storage and return its public URL.
 * Called from the admin's MarkdownEditor when the user pastes/drops
 * an image. Auth-gated by proxy.ts.
 *
 * @param formData expects a single file under field name "file"
 */
export async function uploadBlogImageAction(formData: FormData): Promise<{
  url?: string;
  error?: string;
}> {
  try {
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return { error: "No file uploaded" };
    }

    const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!allowed.includes(file.type)) {
      return { error: `Unsupported file type: ${file.type}` };
    }
    if (file.size > 10 * 1024 * 1024) {
      return { error: "File too large (max 10 MB)" };
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const safeName = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
    const filename = `${Date.now()}-${safeName || "pasted"}.${ext}`;

    const supabase = createSupabaseAdminClient();
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return { error: uploadError.message };
    }

    const { data: pub } = supabase.storage.from("blog-images").getPublicUrl(filename);
    return { url: pub.publicUrl };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Unknown error" };
  }
}
