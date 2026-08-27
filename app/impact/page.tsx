import type { Metadata } from "next";
import { impactSections, exposureSurface, legalActions, financialFigures } from "@/data/impact";
import { PageHeader, Section } from "@/components/ui/Page";
import { ExposureMatrix } from "@/components/impact/ExposureMatrix";
import { Chip, ConfidencePill, IdTag } from "@/components/ui/Pills";
import { Cites } from "@/components/intel/SourceDrawer";
import { cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Impact" };

export default function ImpactPage() {
  return (
    <div className="px-8 py-8">
      <PageHeader
        kicker="Impact assessment"
        title="What is exposed, and what only might be"
        lede="Observed impact is something that verifiably happened. Potential impact is analyst reasoning from the observed facts, and is labelled as such. No dollar value is assigned to intellectual property, and no market figure appears without its source and date."
      />

      <Section kicker="Exposure surface" title="Twelve dimensions, one status each" description="Not an exposure rate. A status is only as strong as the evidence beside it." id="exposure">
        <ExposureMatrix dimensions={exposureSurface} />
      </Section>

      {impactSections.map((sec) => (
        <Section key={sec.key} kicker="Impact" title={sec.title} description={sec.intro} id={sec.key}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {(["observed", "potential"] as const).map((kind) => {
              const items = sec.items.filter((i) => i.kind === kind);
              return (
                <div key={kind} className={cn("border bg-bg-surface", kind === "observed" ? "border-evidence-dim" : "border-assess-dim")}>
                  <div className="border-b border-line px-5 py-3">
                    <span className={cn("label", kind === "observed" ? "text-evidence" : "text-assess")}>{kind === "observed" ? "Observed" : "Potential"}</span>
                  </div>
                  <ul className="divide-y divide-line">
                    {items.length === 0 && <li className="px-5 py-4 text-sm text-ink-muted">Nothing recorded.</li>}
                    {items.map((it) => (
                      <li key={it.title} className="px-5 py-4">
                        <div className="text-[15px] font-semibold text-ink-primary">{it.title}</div>
                        <p className="mt-1 text-[15px] leading-relaxed text-ink-secondary">{it.body}</p>
                        <div className="mt-1.5"><Cites ids={it.sourceIds} /></div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Section>
      ))}

      <Section kicker="Financial" title="Reported figures" description="Every number is as reported by its source on its date. Market moves are observed; attributing them to the leaks is an inference the sources themselves make with varying care." id="figures">
        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-bg-surface"><tr className="label"><th className="px-4 py-3 font-normal">Figure</th><th className="px-4 py-3 font-normal">Value</th><th className="px-4 py-3 font-normal">Date</th><th className="px-4 py-3 font-normal">Kind</th><th className="px-4 py-3 font-normal">Note</th><th className="px-4 py-3 font-normal">Sources</th></tr></thead>
            <tbody className="divide-y divide-line align-top">
              {financialFigures.map((f) => (
                <tr key={f.label}>
                  <td className="px-4 py-3 text-[15px] text-ink-primary">{f.label}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-[15px] tabular text-ink-primary">{f.value}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink-secondary">{formatDate(f.date)}</td>
                  <td className="px-4 py-3"><Chip tone={f.kind === "observed" ? "evidence" : "assess"}>{f.kind}</Chip></td>
                  <td className="px-4 py-3 text-sm leading-relaxed text-ink-secondary">{f.note}</td>
                  <td className="px-4 py-3"><Cites ids={f.sourceIds} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section kicker="Legal tracker" title="Notices, subpoenas, orders, and platform responses" id="legal-tracker">
        <ol className="divide-y divide-line border-y border-line">
          {legalActions.map((l) => (
            <li key={l.id} id={l.id} className="grid grid-cols-1 gap-x-6 gap-y-2 py-4 md:grid-cols-[130px_1fr_260px]">
              <div>
                <div className="font-mono text-sm text-ink-primary">{formatDate(l.date)}{l.datePrecision === "approximate" ? " ~" : ""}</div>
                <div className="mt-1"><Chip tone={l.kind === "court-order" || l.kind === "dmca-subpoena" ? "info" : l.kind === "criminal-investigation" ? "crit" : "neutral"}>{l.kind}</Chip></div>
              </div>
              <div>
                <div className="text-[15px] font-semibold text-ink-primary">{l.title}</div>
                {(l.court || l.caseNumber || l.judge) && (
                  <div className="mt-1 font-mono text-xs text-ink-faint">{[l.court, l.caseNumber, l.judge].filter(Boolean).join(" · ")}</div>
                )}
                <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">{l.summary}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2"><ConfidencePill confidence={l.confidence} /><Cites ids={l.sourceIds} /><IdTag id={l.id} /></div>
              </div>
              <div className="border-l border-line pl-4">
                <div className="label">Status</div>
                <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{l.status}</p>
                {l.nextDate && <div className="mt-2 font-mono text-xs text-crit">next {formatDate(l.nextDate)}</div>}
                <div className="mt-2 flex flex-wrap gap-1">{l.parties.map((p) => <Chip key={p}>{p}</Chip>)}</div>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
