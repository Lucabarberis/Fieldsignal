"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import TurndownService from "turndown";
import { uploadBlogImageAction } from "@/app/admin/upload-actions";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

/** HTML → Markdown converter (configured once at module load). */
const turndown = new TurndownService({
  headingStyle: "atx",        // # H1 instead of underlines
  bulletListMarker: "-",
  codeBlockStyle: "fenced",   // ``` blocks
  emDelimiter: "_",
  linkStyle: "inlined",
});
// Strip Surfer/Google Docs noise: empty spans, font tags, color styles
turndown.addRule("stripStyleSpans", {
  filter: (node) =>
    node.nodeName === "SPAN" &&
    !node.textContent?.trim(),
  replacement: () => "",
});
// Preserve images (with src)
turndown.addRule("imagesWithAlt", {
  filter: "img",
  replacement: (_content, node) => {
    const el = node as HTMLElement;
    const src = el.getAttribute("src") ?? "";
    const alt = el.getAttribute("alt") ?? "";
    return src ? `![${alt}](${src})` : "";
  },
});

/**
 * Markdown editor for blog post bodies.
 *
 * Built on @uiw/react-md-editor with two custom paste behaviours:
 *
 *   1. Paste an image (from clipboard or screen-cap) → uploads to
 *      Supabase Storage → inserts ![alt](url) at cursor.
 *
 *   2. Paste a URL while text is selected → wraps the selected text
 *      as [selected text](url). The same as Slack/Notion/GDocs.
 *
 * Also exposes a hidden input named `body` so the form submission
 * picks up the current value as plain text — no client/server
 * controlled-component plumbing required.
 */

// Editor uses browser APIs, must be client-side only
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type Props = {
  /** Hidden input name (submitted with the form). Default "body". */
  name?: string;
  /** Initial markdown content. */
  initial?: string;
  /** Placeholder shown when empty. */
  placeholder?: string;
};

export function MarkdownBodyEditor({
  name = "body",
  initial = "",
  placeholder = "Write your post in markdown. Paste images directly — they'll upload to storage automatically.",
}: Props) {
  const [value, setValue] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /** Find the underlying <textarea> inside the MDEditor DOM. */
  const findTextarea = useCallback((): HTMLTextAreaElement | null => {
    if (!wrapperRef.current) return null;
    return wrapperRef.current.querySelector("textarea");
  }, []);

  /** Insert markdown at the current cursor position. */
  const insertAtCursor = useCallback(
    (text: string) => {
      const ta = findTextarea();
      if (!ta) {
        setValue((v) => v + text);
        return;
      }
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const next = value.slice(0, start) + text + value.slice(end);
      setValue(next);
      // Move cursor to end of inserted text on next tick
      requestAnimationFrame(() => {
        ta.focus();
        const newPos = start + text.length;
        ta.setSelectionRange(newPos, newPos);
      });
    },
    [value, findTextarea],
  );

  /** Wrap currently selected text in markdown. */
  const wrapSelection = useCallback(
    (left: string, right: string) => {
      const ta = findTextarea();
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = value.slice(start, end);
      const next = value.slice(0, start) + left + selected + right + value.slice(end);
      setValue(next);
      requestAnimationFrame(() => {
        ta.focus();
        const newPos = end + left.length + right.length;
        ta.setSelectionRange(newPos, newPos);
      });
    },
    [value, findTextarea],
  );

  /** Handle paste events on the wrapper (captures clipboard images + URLs). */
  useEffect(() => {
    const ta = findTextarea();
    if (!ta) return;

    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      // ─── Image paste? ────────────────────────────────────────
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (!file) continue;

          setUploading(true);
          setError(null);
          try {
            const fd = new FormData();
            fd.append("file", file);
            const result = await uploadBlogImageAction(fd);
            if (result.error) {
              setError(`Upload failed: ${result.error}`);
              return;
            }
            if (result.url) {
              insertAtCursor(`\n\n![](${result.url})\n\n`);
            }
          } finally {
            setUploading(false);
          }
          return;
        }
      }

      // ─── URL paste over selection? ────────────────────────────
      const text = e.clipboardData?.getData("text/plain") ?? "";
      const urlPattern = /^https?:\/\/\S+$/i;
      if (urlPattern.test(text.trim())) {
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        if (start !== end) {
          // Text is selected — wrap it as a markdown link
          e.preventDefault();
          const selected = value.slice(start, end);
          const next = value.slice(0, start) + `[${selected}](${text.trim()})` + value.slice(end);
          setValue(next);
          requestAnimationFrame(() => {
            ta.focus();
            const newPos = start + selected.length + text.trim().length + 4;
            ta.setSelectionRange(newPos, newPos);
          });
          return;
        }
        // If nothing selected, let the default paste behaviour happen (just pastes the URL)
        return;
      }

      // ─── Rich HTML paste (Surfer SEO, Google Docs, Notion etc.) ─
      // If the clipboard contains HTML, convert it to markdown so we
      // keep headings, bold, lists, links etc.
      const html = e.clipboardData?.getData("text/html") ?? "";
      if (html && html.length > 0) {
        // Quick sanity: only convert if HTML is more than a basic <span>
        // wrapper around plain text. Otherwise, let the plain-text path
        // take over (avoid converting raw character copies).
        const hasStructure = /<(h[1-6]|p|ul|ol|li|a|strong|em|img|table)/i.test(html);
        if (hasStructure) {
          e.preventDefault();
          const markdown = turndown.turndown(html).trim();
          if (markdown) {
            insertAtCursor("\n\n" + markdown + "\n\n");
          }
        }
      }
    };

    ta.addEventListener("paste", handlePaste);
    return () => ta.removeEventListener("paste", handlePaste);
  }, [value, findTextarea, insertAtCursor]);

  /** Prompt for URL and insert markdown link. */
  const insertLink = useCallback(() => {
    const url = window.prompt("Enter URL (https://...)");
    if (!url) return;
    const ta = findTextarea();
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    if (start !== end) {
      const selected = value.slice(start, end);
      const next = value.slice(0, start) + `[${selected}](${url})` + value.slice(end);
      setValue(next);
    } else {
      insertAtCursor(`[link text](${url})`);
    }
  }, [value, findTextarea, insertAtCursor]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 items-center flex-wrap">
        <ToolbarButton onClick={() => wrapSelection("**", "**")} title="Bold (Cmd+B)">
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton onClick={() => wrapSelection("_", "_")} title="Italic (Cmd+I)">
          <em>i</em>
        </ToolbarButton>
        <ToolbarButton onClick={() => insertAtCursor("\n\n## ")} title="Heading">
          H2
        </ToolbarButton>
        <ToolbarButton onClick={() => insertAtCursor("\n\n### ")} title="Sub-heading">
          H3
        </ToolbarButton>
        <span className="text-ink-3">·</span>
        <ToolbarButton onClick={insertLink} title="Insert link">
          🔗 Link
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;
              setUploading(true);
              setError(null);
              try {
                const fd = new FormData();
                fd.append("file", file);
                const result = await uploadBlogImageAction(fd);
                if (result.error) setError(`Upload failed: ${result.error}`);
                else if (result.url) insertAtCursor(`\n\n![](${result.url})\n\n`);
              } finally {
                setUploading(false);
              }
            };
            input.click();
          }}
          title="Upload image"
        >
          🖼 Image
        </ToolbarButton>
        <ToolbarButton onClick={() => insertAtCursor("\n\n- ")} title="Bullet list">
          • List
        </ToolbarButton>
        <ToolbarButton onClick={() => wrapSelection("`", "`")} title="Inline code">
          {"</>"}
        </ToolbarButton>

        <span className="flex-1" />
        {uploading && (
          <span className="font-mono text-micro uppercase tracking-[0.10em] text-ink-3">
            Uploading…
          </span>
        )}
        {error && (
          <span className="font-mono text-micro uppercase tracking-[0.10em] text-red">
            {error}
          </span>
        )}
      </div>

      <div ref={wrapperRef} data-color-mode="light">
        <MDEditor
          value={value}
          onChange={(v) => setValue(v ?? "")}
          height={600}
          preview="edit"
          textareaProps={{ placeholder, name: undefined }}
          previewOptions={{ rehypePlugins: [] }}
        />
      </div>

      {/* Hidden field — the form picks this up on submit */}
      <input type="hidden" name={name} value={value} />

      <div className="bg-paper-2 border-l-4 border-rule px-5 py-3 font-mono text-micro uppercase tracking-[0.08em] text-ink-3 leading-relaxed">
        <div className="text-ink font-semibold mb-1">Quick tips</div>
        <div>• <span className="text-ink">Paste from Surfer SEO / Google Docs / Notion</span> — formatting auto-converts to markdown (headings, bold, lists, links all kept)</div>
        <div>• <span className="text-ink">Paste an image</span> from your clipboard — it uploads to Supabase automatically</div>
        <div>• <span className="text-ink">Select text</span>, then paste a URL → it becomes a link</div>
        <div>• Or use the <span className="text-ink">🔗 Link</span> button</div>
        <div>• <span className="text-ink">Markdown</span> works directly: # heading, **bold**, _italic_, [text](url), ![alt](url)</div>
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="font-mono text-mono uppercase tracking-[0.10em] text-ink-2 bg-paper-2 border border-rule hover:bg-paper hover:text-ink px-3 py-1.5 transition-colors cursor-pointer"
    >
      {children}
    </button>
  );
}
