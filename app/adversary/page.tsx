import { AdversaryPanel } from "@/components/adversary/AdversaryPanel";

export default function AdversaryPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="paper-grain relative flex items-end justify-between border-b border-line px-8 py-5">
        <div>
          <div className="stamp text-[10px] uppercase text-ink-faint">
            Adversary dossier
          </div>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-primary">
            ShinyHunters cluster
          </h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            Click any node in the graph to inspect that entity.
          </p>
        </div>
        <div className="hidden flex-col items-end gap-1.5 sm:flex">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse-dot bg-accent-crit" />
            <span className="stamp text-[10px] uppercase text-accent-crit">
              Active priority 01
            </span>
          </div>
          <div className="stamp text-[10px] uppercase text-ink-faint">
            CrowdStrike, Mandiant · refreshed continuously
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <AdversaryPanel />
      </div>
    </div>
  );
}
