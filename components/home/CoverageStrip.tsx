import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { detections, detectionStats } from "@/data/detections";
import { techniques, type Tactic } from "@/data/techniques";

const tacticOrder: Tactic[] = [
  "Reconnaissance",
  "Initial Access",
  "Credential Access",
  "Defense Evasion",
  "Collection",
  "Exfiltration",
  "Impact",
];

export function CoverageStrip() {
  const stats = detectionStats();

  const perTactic: Record<string, { total: number; covered: number }> = {};
  for (const t of techniques) {
    for (const tactic of t.tactics) {
      if (!perTactic[tactic]) perTactic[tactic] = { total: 0, covered: 0 };
      perTactic[tactic].total++;
      const has = detections.some(
        (d) => d.mitre_techniques.includes(t.id) && d.status !== "stub"
      );
      if (has) perTactic[tactic].covered++;
    }
  }

  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-line pb-2.5">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
          Detection coverage
        </h2>
        <Link
          href="/coverage"
          className="group inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink-primary"
        >
          Open ATT&amp;CK heatmap
          <ArrowUpRight
            size={13}
            strokeWidth={1.8}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-12 gap-px bg-line">
        <div className="col-span-12 grid grid-cols-3 gap-px bg-line lg:col-span-3">
          <Counter label="Rules" value={stats.total} />
          <Counter label="Production" value={stats.production} accent="terminal" />
          <Counter label="Draft" value={stats.draft} accent="amber" />
        </div>

        <div className="col-span-12 bg-bg-surface p-6 lg:col-span-9">
          <div className="stamp text-[10px] uppercase text-ink-faint">
            Coverage by tactic
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {tacticOrder.map((tactic) => {
              const v = perTactic[tactic] ?? { total: 0, covered: 0 };
              const pct = v.total === 0 ? 0 : Math.round((v.covered / v.total) * 100);
              const intensity =
                pct >= 80
                  ? "bg-accent-terminal/55"
                  : pct >= 50
                    ? "bg-accent-terminal/30"
                    : pct > 0
                      ? "bg-accent-amber/30"
                      : "bg-line/40";
              return (
                <div
                  key={tactic}
                  className="overflow-hidden border border-line bg-bg-elevated/40"
                >
                  <div className={`h-1 w-full ${intensity}`} />
                  <div className="px-2.5 py-2">
                    <div className="stamp text-[9px] uppercase leading-tight text-ink-muted">
                      {tactic}
                    </div>
                    <div className="mt-2 flex items-baseline justify-between">
                      <span className="font-display text-lg font-semibold tabular text-ink-primary">
                        {pct}
                        <span className="text-xs text-ink-muted">%</span>
                      </span>
                      <span className="font-mono text-[10px] text-ink-faint">
                        {v.covered}/{v.total}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Counter({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "terminal" | "amber";
}) {
  return (
    <div className="bg-bg-surface p-5">
      <div className="stamp text-[10px] uppercase text-ink-faint">{label}</div>
      <div
        className={
          "mt-2 font-display text-3xl font-semibold tabular " +
          (accent === "terminal"
            ? "text-accent-terminal"
            : accent === "amber"
              ? "text-accent-amber"
              : "text-ink-primary")
        }
      >
        {value}
      </div>
    </div>
  );
}
