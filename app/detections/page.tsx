import { DetectionLibrary } from "@/components/detections/DetectionLibrary";
import { detectionStats } from "@/data/detections";

export default function DetectionsPage() {
  const stats = detectionStats();
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-end justify-between border-b border-line px-8 py-5">
        <div>
          <div className="stamp text-[10px] uppercase text-ink-faint">
            Detection engineering
          </div>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-primary">
            Rule library
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            14 rules across Sigma, CrowdStrike Falcon LogScale, and Splunk SPL.
          </p>
        </div>
        <div className="hidden flex-col items-end gap-1 sm:flex font-mono text-[11px] uppercase tracking-label">
          <div className="flex items-center gap-3 text-ink-muted">
            <span>
              <span className="text-accent-terminal">{stats.production}</span>{" "}
              production
            </span>
            <span className="text-ink-dim">·</span>
            <span>
              <span className="text-accent-amber">{stats.draft}</span> draft
            </span>
            <span className="text-ink-dim">·</span>
            <span>{stats.total} total</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <DetectionLibrary />
      </div>
    </div>
  );
}
