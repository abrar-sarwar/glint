import { StatCards } from "@/components/home/StatCards";
import { HeroTracking } from "@/components/home/HeroTracking";
import { RecentCampaigns } from "@/components/home/RecentCampaigns";
import { CoverageStrip } from "@/components/home/CoverageStrip";
import { ActivityFeed } from "@/components/home/ActivityFeed";
import { formatToday, todayIso } from "@/lib/utils";

export default function HomePage() {
  const today = new Date();
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="paper-grain relative flex flex-col gap-8 px-8 py-7">
        {/* Page header */}
        <div className="flex items-end justify-between border-b border-line pb-4">
          <div>
            <div className="stamp text-[10px] uppercase text-ink-faint">
              Workspace · Counter-adversary operations
            </div>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-primary">
              Operations
            </h1>
            <p className="mt-1.5 max-w-xl text-[14px] leading-relaxed text-ink-muted">
              ShinyHunters cluster, three flagship campaigns, current detection
              coverage.
            </p>
          </div>
          <div className="hidden flex-col items-end gap-1 sm:flex">
            <div className="stamp text-[10px] uppercase text-accent-terminal">
              Today · {formatToday(today)}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
              Updated continuously · {todayIso(today)}
            </div>
          </div>
        </div>

        <HeroTracking />
        <StatCards />
        <RecentCampaigns />
        <CoverageStrip />

        <div className="mt-auto border-t border-line pt-4 stamp text-[9px] uppercase text-ink-faint">
          All claims sourced to public reporting · TLP:CLEAR · Refreshed{" "}
          {todayIso(today)}
        </div>
      </div>

      <aside className="hidden border-l border-line lg:flex lg:flex-col">
        <ActivityFeed />
      </aside>
    </div>
  );
}
