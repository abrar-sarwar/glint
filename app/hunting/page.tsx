import { ChevronRight, Database, Play, Repeat } from "lucide-react";
import { hunts } from "@/data/hunts";
import { campaignById } from "@/data/campaigns";
import { MitreBadge } from "@/components/ui/MitreBadge";

export default function HuntingPage() {
  return (
    <div className="px-8 py-8">
      <div className="flex items-end justify-between border-b border-line pb-5">
        <div>
          <div className="stamp text-[10px] uppercase text-ink-faint">
            Hunting
          </div>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-primary">
            Hunt console
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Six hypotheses anchored to ShinyHunters tradecraft. Each one ships
            with a query, an expected output, and a triage path.
          </p>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
          {hunts.length} hypotheses
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-px bg-line lg:grid-cols-2">
        {hunts.map((h) => {
          const camps = h.related_campaign_ids
            .map((id) => campaignById(id))
            .filter(Boolean) as { short_label: string; slug: string }[];
          return (
            <article key={h.id} className="flex flex-col bg-bg-surface p-7">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
                  {h.id}
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-label text-ink-muted">
                  <Repeat size={10} strokeWidth={1.5} />
                  {h.recommended_cadence}
                </span>
              </div>

              <h2 className="mt-3 text-lg font-semibold leading-snug text-ink-primary">
                {h.hypothesis}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                {h.rationale}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                {h.mitre_techniques.map((t) => (
                  <MitreBadge key={t} id={t} />
                ))}
                {camps.map((c) => (
                  <a
                    key={c.slug}
                    href={`/campaigns/${c.slug}`}
                    className="inline-flex items-center border border-line bg-bg-elevated px-2 py-1 font-mono text-[11px] text-ink-secondary hover:text-accent-terminal"
                  >
                    {c.short_label}
                  </a>
                ))}
              </div>

              <div className="mt-5">
                <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
                  Query
                </div>
                <pre className="mt-2 max-h-[260px] overflow-auto border border-line bg-bg-inset p-3 font-mono text-[12px] leading-relaxed text-ink-primary">
                  {h.query_pseudocode}
                </pre>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-px bg-line">
                <div className="border-l-2 border-accent-info bg-bg-surface p-4">
                  <div className="font-mono text-[10px] uppercase tracking-label text-accent-info">
                    Expected output
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                    {h.expected_output}
                  </p>
                </div>
                <div className="bg-bg-surface p-4">
                  <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
                    Triage
                  </div>
                  <ol className="mt-2 space-y-2">
                    {h.triage_steps.map((step, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm leading-relaxed text-ink-secondary"
                      >
                        <span className="font-mono text-[11px] tabular text-accent-terminal">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-4">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-ink-faint">
                  <Database size={11} strokeWidth={1.5} />
                  {h.data_sources.join(", ")}
                </div>
                <button
                  type="button"
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-2 border border-line bg-bg-elevated px-3 py-1.5 font-mono text-[10px] uppercase tracking-label text-ink-faint opacity-70"
                  title="Hunt execution available in v0.2"
                >
                  <Play size={11} strokeWidth={2} />
                  Run hunt
                  <ChevronRight size={11} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
