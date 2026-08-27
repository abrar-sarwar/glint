import type { Metadata } from "next";
import Link from "next/link";
import { deadMansSwitch, narratives } from "@/data/media";
import { claims } from "@/data/claims";
import { PageHeader, Section, Panel } from "@/components/ui/Page";
import { ClaimStatusPill, ConfidencePill, NarrativePill, IdTag } from "@/components/ui/Pills";
import { PropagationChainView } from "@/components/intel/PropagationChainView";
import { Cites } from "@/components/intel/SourceDrawer";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dead man's switch" };

export default function DeadMansSwitchPage() {
  const chainClaims = deadMansSwitch.claimIds.map((id) => claims.find((c) => c.id === id)).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const related = narratives.filter((n) => deadMansSwitch.claimIds.includes(n.underlyingClaimId));
  const origin = deadMansSwitch.steps.find((s) => s.kind === "origin");
  const corrections = deadMansSwitch.steps.filter((s) => s.kind === "correction");
  return (
    <div className="px-8 py-8">
      <PageHeader
        kicker={`Case study · ${deadMansSwitch.id} · updated ${formatDate(deadMansSwitch.lastUpdated)}`}
        title={deadMansSwitch.title}
        lede={deadMansSwitch.summary}
        right={
          <div className="flex flex-col items-end gap-2">
            <div className="label">Current assessment</div>
            <ConfidencePill confidence={deadMansSwitch.assessmentConfidence} size="md" />
          </div>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel kicker="Origin" title="Where the claim came from" tone="claim">
          <p className="text-[15px] leading-relaxed text-ink-secondary">{origin?.description ?? "Origin not established."}</p>
          {origin && <div className="mt-2 flex items-center gap-3">{origin.date && <span className="font-mono text-xs text-ink-faint">{formatDate(origin.date)}</span>}<Cites ids={origin.sourceIds} /></div>}
        </Panel>
        <Panel kicker="Actor authentication" title="Did CyberLeek confirm the exact claim?" tone="assess">
          {chainClaims.filter((c) => c.id === "LEEK-CLM-032").map((c) => (
            <div key={c.id}>
              <div className="flex items-center gap-2"><ClaimStatusPill status={c.status} /><ConfidencePill confidence={c.confidence} /></div>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">{c.rationale}</p>
            </div>
          ))}
        </Panel>
        <Panel kicker="Corrections" title="Who walked it back, and when" tone="evidence">
          <ul className="flex flex-col gap-3">
            {corrections.length === 0 && <li className="text-[15px] text-ink-muted">No correction recorded.</li>}
            {corrections.map((s) => (
              <li key={s.step}>
                <div className="text-[15px] font-semibold text-ink-primary">{s.label}</div>
                <div className="mt-1 flex items-center gap-3">{s.date && <span className="font-mono text-xs text-ink-faint">{formatDate(s.date)}</span>}<Cites ids={s.sourceIds} /></div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Section kicker="Propagation chain" title="How the story moved" description="Actor activity and narrative activity are different things. This chain records the narrative: who said it first, who repeated it, who challenged it, and what remains.">
        <PropagationChainView chain={deadMansSwitch} />
      </Section>

      <Section kicker="Claims" title="Registry entries this case study governs">
        <ul className="divide-y divide-line border-y border-line">
          {chainClaims.map((c) => (
            <li key={c.id} className="grid grid-cols-1 gap-3 py-4 md:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap items-center gap-2"><ClaimStatusPill status={c.status} /><ConfidencePill confidence={c.confidence} /><IdTag id={c.id} /></div>
                <Link href={`/claims#${c.id}`} className="mt-2 block text-lg font-semibold leading-snug text-ink-primary hover:underline">{c.statement}</Link>
                <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-ink-secondary">{c.rationale}</p>
              </div>
              <ol className="min-w-[220px] border-l border-line pl-4 text-sm md:pl-5">
                {c.history.map((h, i) => (
                  <li key={i} className="py-1">
                    <span className="font-mono text-xs text-ink-faint">{formatDate(h.date)}</span>{" "}
                    <span className="text-ink-secondary">{h.status}</span>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </Section>

      {related.length > 0 && (
        <Section kicker="Narratives" title="Narrative clusters built on these claims">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {related.map((n) => (
              <li key={n.id} className="border border-line bg-bg-surface px-5 py-4">
                <div className="flex items-center gap-2"><NarrativePill confidence={n.confidence} /><span className="font-mono text-xs text-ink-faint">first seen {formatDate(n.firstSeen)}</span></div>
                <Link href={`/media#${n.id}`} className="mt-2 block text-[15px] font-semibold text-ink-primary hover:underline">{n.label}</Link>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{n.description}</p>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
