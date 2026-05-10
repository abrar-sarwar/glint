"use client";

import { useEffect, useMemo, useState } from "react";

interface FeedItem {
  id: number;
  ts: string;
  level: "info" | "amber" | "crit" | "ok";
  source: string;
  body: string;
}

const seedItems: Omit<FeedItem, "id" | "ts">[] = [
  {
    level: "amber",
    source: "intel.feed",
    body: "Canvas extortion. New 3.2 GB sample dump posted on Telegram.",
  },
  {
    level: "info",
    source: "graph.svc",
    body: "Linked Canvas Free-For-Teacher abuse pattern across 12 institutional tenants.",
  },
  {
    level: "crit",
    source: "alert.engine",
    body: "Rule det-oauth-consent-non-corporate matched. Principal svc-mkt-ops, IP 198.51.100.42.",
  },
  {
    level: "ok",
    source: "rule.lib",
    body: "Promoted det-snowflake-new-asn-copy to production.",
  },
  {
    level: "info",
    source: "intel.feed",
    body: "Mandiant updated UNC6395 indicators. 4 new ASNs added to the Drift OAuth replay set.",
  },
  {
    level: "amber",
    source: "ioc.svc",
    body: "Synthetic IOC drift-staging.example resolved against beacon corpus. No live traffic.",
  },
  {
    level: "info",
    source: "stealer.feed",
    body: "12 corporate-domain credentials added to watchlist from a Lumma batch.",
  },
  {
    level: "ok",
    source: "hunt.engine",
    body: "Weekly Drift token replay hunt completed. 0 candidate replays.",
  },
  {
    level: "amber",
    source: "telemetry",
    body: "Salesforce Bulk API baseline drift on a Drift Connected App. Up 92% versus 90 day p95.",
  },
  {
    level: "crit",
    source: "intel.feed",
    body: "ShinyHunters extortion countdown live for Canvas. Sample data continues to leak.",
  },
];

function timestamp(d: Date): string {
  return d.toISOString().slice(11, 19);
}

function colorFor(level: FeedItem["level"]) {
  switch (level) {
    case "crit":
      return "text-accent-crit";
    case "amber":
      return "text-accent-amber";
    case "ok":
      return "text-accent-terminal";
    default:
      return "text-accent-info";
  }
}

function dotFor(level: FeedItem["level"]) {
  switch (level) {
    case "crit":
      return "bg-accent-crit";
    case "amber":
      return "bg-accent-amber";
    case "ok":
      return "bg-accent-terminal";
    default:
      return "bg-accent-info";
  }
}

export function ActivityFeed() {
  const [mounted, setMounted] = useState(false);

  const initial = useMemo<FeedItem[]>(
    () =>
      seedItems.map((s, i) => ({
        ...s,
        id: i,
        ts: `00:00:${String(i * 3).padStart(2, "0")}`,
      })),
    []
  );

  const [items, setItems] = useState<FeedItem[]>(initial);

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    setItems((prev) =>
      prev.map((it, i) => {
        const t = new Date(now.getTime() - (prev.length - i) * 47 * 1000);
        return { ...it, ts: timestamp(t) };
      })
    );

    const interval = setInterval(() => {
      const pick = seedItems[Math.floor(Math.random() * seedItems.length)];
      const newItem: FeedItem = {
        ...pick,
        id: Date.now(),
        ts: timestamp(new Date()),
      };
      setItems((prev) => [newItem, ...prev].slice(0, 14));
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full flex-col bg-bg-surface">
      <div className="flex h-12 items-center justify-between border-b border-line px-5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse-dot bg-accent-terminal" />
          <span className="stamp text-[10px] uppercase text-ink-secondary">
            Activity feed
          </span>
        </div>
        <span className="stamp text-[10px] uppercase text-accent-terminal">
          Live
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul>
          {items.map((it) => (
            <li
              key={it.id}
              className={
                "group border-b border-line/60 px-5 py-3 " +
                (mounted ? "animate-feed-in" : "")
              }
            >
              <div className="flex items-center gap-2">
                <span className={`h-1 w-1 shrink-0 ${dotFor(it.level)}`} />
                <span className="font-mono text-[10px] tabular text-ink-faint">
                  {it.ts}
                </span>
                <span className="text-ink-dim">·</span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-label ${colorFor(it.level)}`}
                >
                  {it.source}
                </span>
              </div>
              <p className="mt-1 text-[13px] leading-snug text-ink-secondary">
                {it.body}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-line px-5 py-3">
        <span className="stamp text-[9px] uppercase text-ink-faint">
          Synthetic stream, representative of live operations
        </span>
      </div>
    </div>
  );
}
