import type { PropagationChain, PropagationKind } from "@/data/types";
import { Cites } from "@/components/intel/SourceDrawer";
import { ConfidencePill } from "@/components/ui/Pills";
import { cn, formatDate } from "@/lib/utils";

const kindStyle: Record<PropagationKind, { label: string; rail: string; text: string }> = {
  origin: { label: "Origin", rail: "bg-claim", text: "text-claim" },
  amplification: { label: "Social amplification", rail: "bg-ink-muted", text: "text-ink-secondary" },
  media: { label: "Media reporting", rail: "bg-info", text: "text-info" },
  influencer: { label: "Creator amplification", rail: "bg-ink-muted", text: "text-ink-secondary" },
  community: { label: "Community reaction", rail: "bg-ink-faint", text: "text-ink-muted" },
  challenge: { label: "Source challenge", rail: "bg-assess", text: "text-assess" },
  correction: { label: "Correction", rail: "bg-evidence", text: "text-evidence" },
  assessment: { label: "Current assessment", rail: "bg-crit", text: "text-crit" },
};

export function PropagationChainView({ chain, compact = false }: { chain: PropagationChain; compact?: boolean }) {
  return (
    <ol className="relative">
      {chain.steps.map((s, i) => {
        const st = kindStyle[s.kind];
        const last = i === chain.steps.length - 1;
        return (
          <li key={s.step} className="grid grid-cols-[28px_1fr] gap-x-5 md:grid-cols-[200px_28px_1fr]">
            <div className="hidden pb-8 pt-1 md:block">
              <div className={cn("label", st.text)}>{st.label}</div>
              {s.date && <div className="mt-1 font-mono text-xs text-ink-faint">{formatDate(s.date)}</div>}
            </div>
            <div className="relative flex justify-center">
              <span className={cn("z-10 mt-1.5 h-3 w-3 shrink-0", st.rail, s.kind === "assessment" && "animate-pulse-dot")} />
              {!last && <span className="absolute top-4 h-full w-px bg-line" />}
            </div>
            <div className={cn("pb-8", last && "pb-0")}>
              <div className="md:hidden">
                <span className={cn("label", st.text)}>{st.label}</span>
                {s.date && <span className="ml-3 font-mono text-xs text-ink-faint">{formatDate(s.date)}</span>}
              </div>
              <h3 className={cn("font-semibold leading-snug text-ink-primary", compact ? "text-[15px]" : "text-lg", s.kind === "assessment" && "text-crit")}>
                {s.label}
              </h3>
              <p className={cn("mt-1.5 max-w-3xl leading-relaxed text-ink-secondary", compact ? "text-sm" : "text-[15px]")}>{s.description}</p>
              <div className="mt-2">
                <Cites ids={s.sourceIds} />
              </div>
            </div>
          </li>
        );
      })}
      <li className="mt-6 border border-crit-dim bg-crit-faint/40 px-5 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="label text-crit">Assessment</span>
          <ConfidencePill confidence={chain.assessmentConfidence} />
        </div>
        <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-ink-primary">{chain.assessment}</p>
      </li>
    </ol>
  );
}
