import type { ExposureDimension, ExposureStatus } from "@/data/types";
import { ExposurePill } from "@/components/ui/Pills";
import { Cites } from "@/components/intel/SourceDrawer";
import { cn } from "@/lib/utils";

const order: ExposureStatus[] = ["publicly-demonstrated", "partially-exposed", "possible", "unknown", "no-public-evidence"];

const cellTone: Record<ExposureStatus, string> = {
  "publicly-demonstrated": "bg-crit-faint border-crit-dim",
  "partially-exposed": "bg-assess-faint border-assess-dim",
  possible: "bg-bg-elevated border-line-strong",
  unknown: "bg-hatch-muted border-line border-dashed",
  "no-public-evidence": "bg-evidence-faint/40 border-evidence-dim/60",
};

export function ExposureMatrix({ dimensions }: { dimensions: ExposureDimension[] }) {
  const counts = order.map((s) => ({ s, n: dimensions.filter((d) => d.status === s).length }));
  return (
    <div>
      <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-5">
        {counts.map(({ s, n }) => (
          <div key={s} className={cn("border px-4 py-3", cellTone[s])}>
            <div className="text-2xl font-semibold tabular text-ink-primary">{n}</div>
            <div className="mt-1"><ExposurePill status={s} /></div>
          </div>
        ))}
      </div>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {dimensions.map((d) => (
          <div key={d.key} id={`exposure-${d.key}`} className="grid grid-cols-1 gap-x-6 gap-y-2 py-4 md:grid-cols-[200px_190px_1fr]">
            <div className="text-[15px] font-semibold text-ink-primary">{d.label}</div>
            <div><ExposurePill status={d.status} size="md" /></div>
            <div>
              <p className="text-[15px] leading-relaxed text-ink-secondary">{d.rationale}</p>
              <div className="mt-1.5"><Cites ids={d.sourceIds} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
