"use client";

import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

export function StatusBar({ daysToDeadline }: { daysToDeadline: number }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const utc = now ? now.toISOString().slice(11, 16) + " UTC" : "        ";
  const dateStr = now
    ? now.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        timeZone: "UTC",
      })
    : "          ";

  const deadlineText =
    daysToDeadline <= 0
      ? "Canvas deadline passed"
      : daysToDeadline === 1
        ? "Canvas deadline tomorrow"
        : `Canvas deadline in ${daysToDeadline} days`;

  return (
    <div className="relative flex h-10 shrink-0 items-center gap-4 border-b border-line bg-bg-surface px-6 text-xs text-ink-muted">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse-dot bg-accent-terminal" />
        <span className="stamp text-[10px] uppercase text-ink-secondary">
          Online
        </span>
      </div>

      <span className="text-ink-dim">·</span>

      <div className="font-mono tabular text-[11px] tracking-label-tight text-ink-muted">
        {dateStr} <span className="text-ink-dim">·</span> {utc}
      </div>

      <div className="ml-auto flex items-center gap-2 text-accent-amber">
        <ShieldAlert size={13} strokeWidth={1.6} />
        <span className="font-mono text-[11px] uppercase tracking-label">
          {deadlineText}
        </span>
      </div>
    </div>
  );
}
