import { SectionBand } from "@/components/SectionBand";

/**
 * How to read a RiseFinder briefing.
 *
 * SHARED, BECAUSE IT DRIFTED. This text lived inline on the front page only,
 * which meant an archived day showed entries and percentages with no
 * explanation of the method at all, and archived pages are what people share.
 * It also meant a correction landed in one place: the paragraph about sources
 * sharing data underneath described a rule removed weeks earlier, and the
 * network figure quoted here had aged from 161 domains to 2,601 without anyone
 * noticing, because there was nothing to compare it against.
 *
 * EVERY NUMBER BELOW IS CHECKABLE against the database, and should be re-checked
 * when it changes rather than left to age:
 *   2,601   entities with gate_status 'killed' and a link-network reason
 *   2,046   the largest single network, on .it, 98% of that TLD's entries
 *   83,000  domains compared when testing Majestic against Tranco
 */
export function RiseFinderMethod({ num }: { num: string }) {
  return (
    <>
      <SectionBand num={num} label="How to read this" meta="Method" />

      <div className="px-4 sm:px-9 py-8 max-w-4xl">
        <div className="text-body text-ink-2 space-y-4">
          <p>
            Every number here is a <b>rate of change</b>, never a total. Size is
            not news. The largest repository on GitHub is not rising, it arrived
            years ago. What this looks for is movement, and specifically
            movement that more than one unrelated source noticed on the same
            day.
          </p>
          <p>
            That second condition is the whole method. Stars can be bought,
            backlinks can be built, app installs can be farmed. This project has
            already killed 2,601 domains for sitting inside link networks, one
            of which ran to 2,046 sites and covered 98% of everything it tracked
            on .it. All of them were manufacturing the exact signal one of these
            sources measures. Faking two unrelated signals at once is far harder
            work, so a repository seen moving by GitHub <i>and</i> HackerNews,
            or an app seen by the App Store <i>and</i> Google Play, counts for
            more than a bigger number in one place.
          </p>
          <p>
            Whether two sources are genuinely independent is measured rather
            than assumed. Majestic ranks domains by backlinks and Tranco ranks
            them by traffic, and the two were treated as one voice for weeks.
            Comparing their daily movement across 83,000 domains showed no
            relationship at all, so they now count as two. Any pair that turns
            out to share data underneath gets folded back into one.
          </p>
          <p>
            Entries are written to be read rather than scanned. When the
            evidence is thin, or the story behind it does not hold up, the entry
            is left out rather than published with a caveat.
          </p>
        </div>
      </div>
    </>
  );
}
