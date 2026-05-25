import Link from "next/link";

/**
 * Admin filter tabs. Shown above the posts table on every list view.
 *
 *   <AdminTabs active="scheduled" counts={{ all, scheduled, drafts }} />
 */

type Counts = {
  all: number;
  scheduled: number;
  drafts: number;
};

type Active = "all" | "scheduled" | "drafts";

type TabDef = {
  key: Active;
  label: string;
  href: string;
};

const TABS: TabDef[] = [
  { key: "all", label: "All", href: "/admin" },
  { key: "scheduled", label: "Scheduled", href: "/admin/scheduled" },
  { key: "drafts", label: "Drafts", href: "/admin/drafts" },
];

export function AdminTabs({ active, counts }: { active: Active; counts: Counts }) {
  return (
    <nav className="border-b border-rule flex gap-px bg-rule mb-8">
      {TABS.map((tab) => {
        const count = counts[tab.key];
        const isActive = tab.key === active;
        return (
          <Link
            key={tab.key}
            href={tab.href}
            className={`flex items-baseline gap-2 px-6 py-3 font-mono text-mono uppercase tracking-[0.14em] transition-colors ${
              isActive
                ? "bg-paper text-ink font-semibold"
                : "bg-paper-2 text-ink-3 hover:text-ink hover:bg-paper"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-micro ${
                isActive ? "text-red" : "text-ink-3"
              }`}
            >
              {count}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
