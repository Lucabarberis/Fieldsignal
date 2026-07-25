/**
 * Transcript body renderer.
 *
 * Transcript text is stored as blank-line-separated paragraphs, each prefixed
 * "Q: " (analyst) or "A: " (expert). This renders those as a real two-column
 * transcript — speaker marker in the gutter, text in the measure — rather than
 * an undifferentiated run of <p>s.
 *
 * Legacy records predate the Q/A convention and are plain prose. Any paragraph
 * without a recognised prefix falls through to a plain body paragraph, so old
 * and new content can coexist while the library is migrated.
 */

type Turn =
  | { speaker: "Q" | "A"; text: string }
  | { speaker: null; text: string };

const PREFIX = /^([QA])\s*:\s*/;

export function parseTurns(body: string): Turn[] {
  return body
    .split(/\n\n+/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => {
      const match = para.match(PREFIX);
      if (!match) return { speaker: null, text: para };
      return {
        speaker: match[1] as "Q" | "A",
        text: para.slice(match[0].length),
      };
    });
}

export function TranscriptBody({ body }: { body: string }) {
  const turns = parseTurns(body);

  return (
    <div className="flex flex-col gap-5">
      {turns.map((turn, i) =>
        turn.speaker === null ? (
          <p
            key={i}
            className="font-sans text-[16px] leading-[1.65] text-ink-2"
          >
            {turn.text}
          </p>
        ) : (
          <div
            key={i}
            className="grid grid-cols-[1.25rem_1fr] sm:grid-cols-[1.75rem_1fr] gap-x-3 sm:gap-x-5"
          >
            {/* Line-height is pinned to the adjacent paragraph's first line box
                (15px x 1.6 = 24px for Q, 16px x 1.65 = 26.4px for A) so the
                marker sits on the same baseline as the text it labels. */}
            <span
              aria-hidden="true"
              className={`font-mono text-mono font-semibold ${
                turn.speaker === "Q"
                  ? "text-red leading-[24px]"
                  : "text-ink-3 leading-[26.4px]"
              }`}
            >
              {turn.speaker}
            </span>
            <p
              className={
                turn.speaker === "Q"
                  ? "font-sans text-[15px] leading-[1.6] text-ink font-medium"
                  : "font-sans text-[16px] leading-[1.65] text-ink-2"
              }
            >
              <span className="sr-only">
                {turn.speaker === "Q" ? "Analyst: " : "Expert: "}
              </span>
              {turn.text}
            </p>
          </div>
        ),
      )}
    </div>
  );
}
