import { tactics, techniques, type Tactic } from "@/data/techniques";
import { detections } from "@/data/detections";
import { cn } from "@/lib/utils";

interface Cell {
  technique_id: string;
  name: string;
  status: "production" | "draft" | "none";
  detection_count: number;
}

function buildHeatmap(): Record<Tactic, Cell[]> {
  const out: Record<string, Cell[]> = {};
  for (const tactic of tactics) out[tactic] = [];
  for (const t of techniques) {
    const matching = detections.filter((d) => d.mitre_techniques.includes(t.id));
    const status = matching.some((m) => m.status === "production")
      ? "production"
      : matching.some((m) => m.status === "draft")
        ? "draft"
        : "none";
    const cell: Cell = {
      technique_id: t.id,
      name: t.name,
      status,
      detection_count: matching.length,
    };
    for (const tac of t.tactics) out[tac].push(cell);
  }
  return out as Record<Tactic, Cell[]>;
}

export default function CoveragePage() {
  const heat = buildHeatmap();
  const visibleTactics = tactics.filter((t) => heat[t].length > 0);

  const totalTechniques = techniques.length;
  const covered = techniques.filter((t) =>
    detections.some(
      (d) => d.mitre_techniques.includes(t.id) && d.status !== "stub"
    )
  ).length;
  const fullyCovered = techniques.filter((t) =>
    detections.some(
      (d) => d.mitre_techniques.includes(t.id) && d.status === "production"
    )
  ).length;

  return (
    <div className="px-8 py-8">
      <div className="flex items-end justify-between border-b border-line pb-5">
        <div>
          <div className="stamp text-[10px] uppercase text-ink-faint">
            Coverage
          </div>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-primary">
            ATT&amp;CK heatmap
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Detection coverage across the techniques exercised by the
            ShinyHunters cluster. Cells are coloured by the highest status of
            any matching rule.
          </p>
        </div>
        <div className="hidden flex-col items-end gap-1 sm:flex">
          <div className="font-mono text-[11px] uppercase tracking-label text-ink-muted">
            Tracked <span className="text-ink-primary">{totalTechniques}</span>
            <span className="text-ink-dim"> · </span>
            Covered{" "}
            <span className="text-accent-terminal">{covered}</span>
            <span className="text-ink-dim"> · </span>
            Production{" "}
            <span className="text-accent-terminal">{fullyCovered}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-5">
        <Legend swatch="bg-accent-terminal/55" label="Production" />
        <Legend swatch="bg-accent-amber/30" label="Draft" />
        <Legend swatch="bg-line/40" label="Not yet covered" />
      </div>

      <div className="mt-6 overflow-x-auto">
        <div
          className="grid gap-px bg-line"
          style={{
            gridTemplateColumns: `repeat(${visibleTactics.length}, minmax(192px, 1fr))`,
          }}
        >
          {visibleTactics.map((t) => (
            <div
              key={t}
              className="bg-bg-surface px-3 py-2.5 font-mono text-[10px] uppercase tracking-label text-ink-secondary"
            >
              {t}
            </div>
          ))}
          {visibleTactics.map((t) => (
            <div key={`col-${t}`} className="flex flex-col gap-px bg-line">
              {heat[t].map((cell) => {
                const fill =
                  cell.status === "production"
                    ? "bg-accent-terminal/15 hover:bg-accent-terminal/25 border-accent-terminal/40"
                    : cell.status === "draft"
                      ? "bg-accent-amber/10 hover:bg-accent-amber/20 border-accent-amber/40"
                      : "bg-bg-surface hover:bg-bg-elevated border-line";
                return (
                  <div
                    key={`${t}-${cell.technique_id}`}
                    className={cn(
                      "border-l-2 px-3 py-3 transition-colors",
                      fill
                    )}
                    title={`${cell.technique_id} ${cell.name}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "font-mono text-xs",
                          cell.status === "production"
                            ? "text-accent-terminal"
                            : cell.status === "draft"
                              ? "text-accent-amber"
                              : "text-ink-faint"
                        )}
                      >
                        {cell.technique_id}
                      </span>
                      {cell.detection_count > 0 && (
                        <span className="font-mono text-[10px] tabular text-ink-muted">
                          x{cell.detection_count}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 line-clamp-2 text-sm leading-snug text-ink-primary">
                      {cell.name}
                    </div>
                  </div>
                );
              })}
              {heat[t].length === 0 && (
                <div className="bg-bg-surface px-3 py-3 font-mono text-xs text-ink-dim">
                  None
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-px bg-line lg:grid-cols-3">
        <SummaryCell
          title="Strongest coverage"
          body="Identity-based access (T1078) and bulk cloud-storage extraction (T1530). The two techniques that anchor every ShinyHunters intrusion."
        />
        <SummaryCell
          title="Active gaps"
          body="Reconnaissance (T1593) and infostealer credential acquisition (T1589.001) sit upstream of internal telemetry. They rely on external feeds."
        />
        <SummaryCell
          title="Next sprint"
          body="Promote det-canvas-impersonation-burst, det-vishing-helpdesk-reset, and det-bulk-api-job-non-mfa-session from draft to production."
        />
      </div>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("h-3 w-5 border border-line", swatch)} />
      <span className="font-mono text-[11px] uppercase tracking-label text-ink-muted">
        {label}
      </span>
    </div>
  );
}

function SummaryCell({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-bg-surface p-5">
      <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
        {title}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{body}</p>
    </div>
  );
}
