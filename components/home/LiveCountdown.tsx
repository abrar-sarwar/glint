"use client";

import { useEffect, useState } from "react";
import { computeCountdown, type CountdownParts } from "@/lib/utils";

export function LiveCountdown({ initial }: { initial: CountdownParts }) {
  const [parts, setParts] = useState<CountdownParts>(initial);

  useEffect(() => {
    const update = () => setParts(computeCountdown(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl font-semibold tabular leading-none text-accent-terminal">
          T<span className="text-accent-terminal-dim">−</span>
          {String(parts.days).padStart(2, "0")}
        </span>
        <span className="stamp text-[10px] uppercase text-ink-muted">days</span>
      </div>
      <div className="mt-1.5 font-mono text-[11px] tabular text-ink-muted">
        {String(parts.hours).padStart(2, "0")}h{" "}
        {String(parts.minutes).padStart(2, "0")}m remaining
      </div>
    </div>
  );
}
