"use client";

import { useMemo, useState, useTransition } from "react";
import type { SocialPost, SocialStatus } from "@/lib/db/social";
import { setSocialStatusAction } from "@/app/admin/social/actions";

/**
 * Social content hub — client shell.
 *
 * Filtering, copy-to-clipboard and the Posted tick. Status lives in
 * Postgres (not localStorage), so it follows you across browsers and
 * machines. We update local state optimistically and fire the server
 * action; the page revalidates behind us.
 */

const PLATFORMS = ["Reddit", "Medium", "LinkedIn", "Substack", "X", "Quora", "WSO"] as const;

const ACCENT: Record<string, string> = {
  Reddit: "#FF4500",
  Medium: "#161613",
  LinkedIn: "#0A66C2",
  Substack: "#FF6719",
  X: "#111111",
  Quora: "#B92B27",
  WSO: "#1F6F5C",
};

/** Copy rich HTML so bold/lists/links survive the paste into Medium, Substack, Quora, WSO, Reddit. */
function copyRich(html: string, plain: string) {
  const div = document.createElement("div");
  div.contentEditable = "true";
  div.innerHTML = html;
  div.style.position = "fixed";
  div.style.left = "-9999px";
  document.body.appendChild(div);

  const range = document.createRange();
  range.selectNodeContents(div);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);

  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  sel?.removeAllRanges();
  document.body.removeChild(div);

  if (!ok && navigator.clipboard && "ClipboardItem" in window) {
    navigator.clipboard.write([
      new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([plain], { type: "text/plain" }),
      }),
    ]);
  }
}

function copyPlain(text: string) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch {
    navigator.clipboard?.writeText(text);
  }
  document.body.removeChild(ta);
}

export function SocialHub({ posts }: { posts: SocialPost[] }) {
  const [statuses, setStatuses] = useState<Record<string, SocialStatus>>(() =>
    Object.fromEntries(posts.map((p) => [p.key, p.status])),
  );
  const [platform, setPlatform] = useState<string>("all");
  const [wave, setWave] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState("");
  const [, startTransition] = useTransition();

  function flash(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(""), 1700);
  }

  function setPostStatus(key: string, next: SocialStatus) {
    setStatuses((s) => ({ ...s, [key]: next }));
    startTransition(async () => {
      try {
        await setSocialStatusAction(key, next);
      } catch {
        // Roll back if the write failed, so the UI never lies.
        setStatuses((s) => ({ ...s, [key]: next === "posted" ? "todo" : "posted" }));
        flash("Could not save — try again");
      }
    });
  }

  function onCopyBody(p: SocialPost) {
    if (p.bodyCopyMode === "rich" && p.bodyCopyHtml) {
      copyRich(p.bodyCopyHtml, p.bodyCopyText);
    } else {
      copyPlain(p.bodyCopyText);
    }
    if (statuses[p.key] !== "posted") {
      setPostStatus(p.key, "posted");
      flash("Copied — ticked as Posted");
    } else {
      flash("Copied");
    }
  }

  const counts = useMemo(() => {
    const byPlatform: Record<string, number> = { all: posts.length };
    for (const p of PLATFORMS) byPlatform[p] = posts.filter((x) => x.platform === p).length;
    const posted = posts.filter((p) => statuses[p.key] === "posted").length;
    return { byPlatform, posted, todo: posts.length - posted };
  }, [posts, statuses]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (platform !== "all" && p.platform !== platform) return false;
      if (wave !== "all" && String(p.wave) !== wave) return false;
      if (status !== "all" && (statuses[p.key] ?? "todo") !== status) return false;
      if (q) {
        const hay = [
          p.blogTitle,
          p.angle,
          `${p.platform} #${p.postNum}`,
          ...p.fields.map((f) => f.text),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [posts, platform, wave, status, query, statuses]);

  const chip =
    "font-mono text-mono uppercase tracking-[0.08em] px-3 py-1.5 border border-ink cursor-pointer transition-colors";

  return (
    <div>
      {/* ─── Controls ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-paper border-b border-ink/15 py-3 mb-2">
        <div className="flex gap-1.5 flex-wrap mb-2">
          {(["all", ...PLATFORMS] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`${chip} ${
                platform === p ? "bg-ink text-paper" : "bg-paper-3 text-ink hover:bg-paper-2"
              }`}
            >
              {p === "all" ? "All" : p}
              <span className="ml-1.5 opacity-60">{counts.byPlatform[p] ?? 0}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-1.5 items-center flex-wrap">
          <span className="font-mono text-mono uppercase tracking-[0.08em] text-ink-3 mr-1">
            Wave
          </span>
          {["all", "1", "2", "3"].map((w) => (
            <button
              key={w}
              onClick={() => setWave(w)}
              className={`${chip} ${
                wave === w ? "bg-red text-paper border-red" : "bg-paper-3 text-ink hover:bg-paper-2"
              }`}
            >
              {w === "all" ? "All" : w}
            </button>
          ))}

          <span className="font-mono text-mono uppercase tracking-[0.08em] text-ink-3 mx-1">
            Status
          </span>
          {(
            [
              ["all", "All", posts.length],
              ["todo", "To do", counts.todo],
              ["posted", "Posted", counts.posted],
            ] as const
          ).map(([val, label, n]) => (
            <button
              key={val}
              onClick={() => setStatus(val)}
              className={`${chip} ${
                status === val ? "bg-ink text-paper" : "bg-paper-3 text-ink hover:bg-paper-2"
              }`}
            >
              {label}
              <span className="ml-1.5 opacity-60">{n}</span>
            </button>
          ))}

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, blogs, angles…"
            className="flex-1 min-w-[200px] border border-ink bg-white px-3 py-1.5 font-sans text-[14px] text-ink placeholder:text-ink-3"
          />
          <span className="font-mono text-mono text-ink-3 tabular-nums">
            {visible.length} of {posts.length}
          </span>
        </div>
      </div>

      {/* ─── Cards ────────────────────────────────────────────── */}
      {visible.length === 0 ? (
        <p className="text-center text-ink-3 py-20 font-sans">
          No posts match. Clear the search or widen the filters.
        </p>
      ) : (
        visible.map((p) => {
          const done = (statuses[p.key] ?? "todo") === "posted";
          const isOpen = expanded[p.key];
          return (
            <div
              key={p.key}
              className={`border border-ink/15 border-l-4 mt-4 px-5 py-4 ${
                done ? "bg-[#EAF3EC]" : "bg-paper-3"
              }`}
              style={{ borderLeftColor: ACCENT[p.platform] ?? "#161613" }}
            >
              <div className="flex gap-2 items-center flex-wrap mb-2">
                <span
                  className="font-mono text-mono uppercase tracking-[0.06em] px-2 py-0.5 text-white"
                  style={{ backgroundColor: ACCENT[p.platform] ?? "#161613" }}
                >
                  {p.platform}
                </span>
                <span className="font-mono text-mono font-bold px-2 py-0.5 bg-ink text-paper">
                  {p.platform} #{p.postNum}
                </span>
                <span className="font-mono text-mono uppercase tracking-[0.06em] px-2 py-0.5 bg-paper-2 text-ink-2">
                  Wave {p.wave}
                </span>
                <span className="font-mono text-mono uppercase tracking-[0.06em] px-2 py-0.5 bg-paper-2 text-ink-2">
                  Blog #{p.blogNum}
                </span>
                {done && (
                  <span className="font-mono text-mono uppercase tracking-[0.06em] px-2 py-0.5 bg-[#1a7f37] text-white">
                    Posted
                  </span>
                )}
                <span className="font-sans text-[13px] italic text-ink-2">{p.angle}</span>
              </div>

              <p className="font-sans text-[12px] text-ink-3 mb-3">
                Source:{" "}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0A66C2] hover:underline"
                >
                  {p.blogTitle}
                </a>
              </p>

              {/* Posted tick */}
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <label
                  className={`inline-flex items-center gap-2 px-3 py-1.5 border cursor-pointer select-none font-sans text-[13px] font-semibold ${
                    done
                      ? "bg-[#1a7f37] text-white border-[#1a7f37]"
                      : "bg-paper-3 text-ink border-ink"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => setPostStatus(p.key, done ? "todo" : "posted")}
                    className="w-4 h-4 cursor-pointer accent-[#1a7f37]"
                  />
                  Posted
                </label>
                {p.schedDate && (
                  <span className="font-mono text-mono text-[#8a5a00]">
                    scheduled {p.schedDate}
                  </span>
                )}
              </div>

              {/* Platform-specific fields */}
              {p.fields
                .filter((f) => f.text)
                .map((f) => (
                  <div
                    key={f.label}
                    className="flex gap-3 items-start border border-ink/15 bg-paper px-3 py-2 mb-2"
                  >
                    <span className="font-mono text-mono uppercase tracking-[0.06em] text-ink-3 min-w-[80px] pt-0.5">
                      {f.label}
                    </span>
                    <span className="flex-1 font-sans text-[14px] text-ink whitespace-pre-wrap break-words">
                      {f.text}
                    </span>
                    {f.copy && (
                      <button
                        onClick={() => {
                          copyPlain(f.text);
                          flash("Copied");
                        }}
                        className="font-mono text-mono uppercase tracking-[0.06em] border border-ink/20 bg-paper-3 px-2.5 py-1 hover:bg-paper-2 cursor-pointer"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                ))}

              {/* Body — X renders as a copyable post + reply chain; everything else as HTML */}
              {p.tweets?.length ? (
                <div className={`my-2 overflow-auto ${isOpen ? "" : "max-h-[420px]"}`}>
                  {p.tweets.map((t, i) => {
                    const n = t.text.length;
                    return (
                      <div key={i} className="border border-ink/15 bg-white mb-2">
                        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-ink/15 bg-paper">
                          <span className="font-mono text-mono font-bold tracking-[0.08em] text-ink">
                            {t.role}
                          </span>
                          <span
                            className="font-mono text-mono ml-auto"
                            style={{ color: n <= 280 ? "#1a7f37" : "#c0392b" }}
                          >
                            {n}/280
                          </span>
                          <button
                            onClick={() => {
                              copyPlain(t.text);
                              flash(`Copied ${t.role.toLowerCase()}`);
                            }}
                            className="font-mono text-mono uppercase tracking-[0.06em] border border-ink bg-paper-3 px-2 py-0.5 hover:bg-ink hover:text-paper cursor-pointer"
                          >
                            Copy
                          </button>
                        </div>
                        <p className="px-3 py-2 font-sans text-[14px] text-ink whitespace-pre-wrap break-words">
                          {t.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  className={`border border-ink/15 bg-white px-4 py-3 my-2 font-sans text-[14.5px] leading-relaxed overflow-auto social-body ${
                    isOpen ? "" : "max-h-[340px]"
                  }`}
                  dangerouslySetInnerHTML={{ __html: p.bodyHtml }}
                />
              )}
              <button
                onClick={() => setExpanded((e) => ({ ...e, [p.key]: !isOpen }))}
                className="font-sans text-[12px] text-ink-3 underline cursor-pointer"
              >
                {isOpen ? "Collapse" : "Expand"}
              </button>

              <div className="mt-2">
                <button
                  onClick={() => onCopyBody(p)}
                  className="bg-ink text-paper px-4 py-2 font-mono text-mono uppercase tracking-[0.1em] hover:bg-red transition-colors cursor-pointer"
                >
                  {p.tweets?.length
                    ? "Copy whole chain"
                    : p.bodyCopyMode === "rich"
                      ? "Copy body (formatted)"
                      : "Copy body"}
                </button>
              </div>

              <p className="font-sans text-[11.5px] text-ink-3 mt-2">{p.copyHint}</p>
              {p.notes && (
                <p className="font-sans text-[12px] text-ink-3 mt-2 pt-2 border-t border-dashed border-ink/15">
                  <b className="text-ink-2">Why it works:</b> {p.notes}
                </p>
              )}
            </div>
          );
        })
      )}

      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-8 bg-ink text-paper px-5 py-3 font-sans text-[13px] font-semibold z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
