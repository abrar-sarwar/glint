import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { campaigns } from "@/data/campaigns";
import { ConfidencePill } from "@/components/ui/ConfidencePill";

const oneLiners: Record<string, string> = {
  "salesloft-drift":
    "OAuth refresh tokens leaked in a public Drift GitHub repo. Replayed against ~760 customer Salesforce orgs.",
  "snowflake-c5537":
    "Years of stolen infostealer creds replayed against Snowflake tenants without MFA. ~165 victim orgs.",
  "canvas-extortion":
    "Active extortion against the Canvas LMS. Sample data published, ransom deadline May 12.",
};

export function RecentCampaigns() {
  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-line pb-2.5">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
          Tracked campaigns
        </h2>
        <Link
          href="/campaigns/salesloft-drift"
          className="group inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink-primary"
        >
          All campaigns
          <ArrowUpRight
            size={13}
            strokeWidth={1.8}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-px bg-line lg:grid-cols-3">
        {campaigns.map((c) => {
          const active =
            c.status === "active" || c.status === "ongoing-extortion";
          return (
            <Link
              key={c.id}
              href={`/campaigns/${c.slug}`}
              className="group flex flex-col bg-bg-surface p-6 transition-colors hover:bg-bg-elevated/60"
            >
              <div className="flex items-center gap-2">
                <span
                  className={
                    "h-1.5 w-1.5 " +
                    (active
                      ? "bg-accent-crit animate-pulse-dot"
                      : "bg-ink-faint")
                  }
                />
                <span
                  className={
                    "stamp text-[10px] uppercase " +
                    (active ? "text-accent-crit" : "text-ink-muted")
                  }
                >
                  {active ? "Active" : "Historical"}
                </span>
                <span className="ml-auto font-mono text-[11px] text-ink-faint">
                  {c.attribution_aliases[0]}
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg font-semibold leading-tight tracking-tight text-ink-primary group-hover:text-accent-terminal-bright">
                {c.short_label}
              </h3>
              <div className="mt-1 font-mono text-xs text-ink-faint">
                {c.time_period}
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-secondary">
                {oneLiners[c.id] ?? c.summary.split(".")[0] + "."}
              </p>

              <div className="mt-auto pt-6 flex items-center justify-between">
                <ConfidencePill confidence={c.attribution_confidence} />
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  className="text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-terminal"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
