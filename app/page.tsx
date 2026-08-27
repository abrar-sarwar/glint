import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStatus, currentAssessment, whatWeKnow, whatWeDoNotKnow, frontierNotes } from "@/data/case";
import { graphNodes, graphEdges } from "@/data/graph";
import { events } from "@/data/events";
import { claims } from "@/data/claims";
import { hypotheses } from "@/data/hypotheses";
import { CampaignGraph } from "@/components/graphs/CampaignGraph";
import type { DrawerRecord } from "@/components/intel/IntelDrawer";
import { Cites } from "@/components/intel/SourceDrawer";
import { ClaimStatusPill, ConfidencePill, Chip, ExposurePill, IdTag } from "@/components/ui/Pills";
import { Panel, Section, Stat } from "@/components/ui/Page";
import {
  stats,
  latestVerifiedEvent,
  latestEvent,
  upcomingCheckpoints,
  exposedDimensions,
  retractions,
  openQuestions,
} from "@/lib/intel";
import { formatDate, formatDateTime, formatStamp, todayIso } from "@/lib/utils";

function buildRecords(): Record<string, DrawerRecord> {
  const wanted = new Set(graphNodes.map((n) => n.intelId));
  const out: Record<string, DrawerRecord> = {};
  for (const e of events) {
    if (!wanted.has(e.id)) continue;
    out[e.id] = {
      id: e.id,
      kind: "event",
      title: e.title,
      date: e.occurredAt,
      summary: e.summary,
      analystAssessment: e.analystAssessment,
      supportingSourceIds: e.supportingSourceIds,
      contradictingSourceIds: e.contradictingSourceIds,
      lastUpdated: e.lastUpdated,
      href: `/timeline#${e.id}`,
      whatChanged: e.whatChanged,
      relatedClaimIds: e.relatedClaimIds,
    };
  }
  for (const c of claims) {
    if (!wanted.has(c.id)) continue;
    out[c.id] = {
      id: c.id,
      kind: "claim",
      title: c.statement,
      date: c.history[c.history.length - 1]?.date,
      summary: c.rationale,
      supportingSourceIds: c.supportingSourceIds,
      contradictingSourceIds: c.contradictingSourceIds,
      lastUpdated: c.lastUpdated,
      href: `/claims#${c.id}`,
      relatedClaimIds: c.relatedClaimIds,
    };
  }
  for (const h of hypotheses) {
    if (!wanted.has(h.id)) continue;
    out[h.id] = {
      id: h.id,
      kind: "hypothesis",
      title: h.title,
      summary: h.summary,
      analystAssessment: h.whatWouldConfirm,
      supportingSourceIds: h.sourceIds,
      lastUpdated: caseStatus.latestSync.slice(0, 10),
      href: `/access#${h.id}`,
    };
  }
  return out;
}

export default function CommandView() {
  const today = todayIso();
  const next = upcomingCheckpoints(today);
  const records = buildRecords();

  const ledger: { k: string; v: React.ReactNode; tone?: string }[] = [
    { k: "Case status", v: "ACTIVE", tone: "text-crit" },
    { k: "First observed", v: formatStamp(caseStatus.firstObserved) },
    { k: "Initial access", v: "UNKNOWN", tone: "text-ink-secondary bg-hatch-muted border border-dashed border-line-strong px-2" },
    { k: "Attribution", v: "UNRESOLVED", tone: "text-assess" },
    { k: "Latest verified", v: formatStamp(caseStatus.latestVerifiedEventDate) },
    { k: "Latest sync", v: formatDateTime(caseStatus.latestSync).toUpperCase() },
  ];

  return (
    <div className="px-8 py-8">
      {/* Case header */}
      <header className="grid grid-cols-1 gap-8 border-b border-line pb-8 lg:grid-cols-[1fr_420px]">
        <div>
          <div className="label">Case file · {caseStatus.classification}</div>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-ink-primary md:text-6xl">LEEK</h1>
          <div className="mt-3 font-mono text-lg uppercase tracking-label text-ink-secondary md:text-xl">
            {caseStatus.shortName}
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary">
            A living reconstruction of the CyberLeek campaign against Grand Theft Auto VI: what happened, what the public
            evidence proves, and what remains unknown. Every claim carries a status and a source.
          </p>
        </div>
        <dl className="self-end border border-line bg-bg-surface">
          {ledger.map((row) => (
            <div key={row.k} className="grid grid-cols-[150px_1fr] items-center gap-4 border-b border-line px-5 py-3 last:border-b-0">
              <dt className="label">{row.k}</dt>
              <dd className={`font-mono text-sm tracking-label-tight ${row.tone ?? "text-ink-primary"} inline-block w-fit`}>{row.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Counts */}
      <div className="mt-8 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-3 xl:grid-cols-6">
        <Stat label="Verified events" value={stats.verifiedEvents} sub={`${stats.events} events on record`} tone="evidence" />
        <Stat label="Actor claims" value={stats.actorClaims} sub="asserted only by CyberLeek" tone="claim" />
        <Stat label="Disputed" value={stats.disputedClaims} sub="credible sources disagree" tone="assess" />
        <Stat label="Retracted or false" value={stats.retractedClaims + stats.falseClaims} sub={`${stats.correctionEvents} corrections in the timeline`} tone="crit" />
        <Stat label="Exposure categories" value={exposedDimensions.length} sub="of 12 partially or publicly exposed" />
        <Stat label="Sources" value={stats.sources} sub={`${stats.primarySources} primary`} />
      </div>

      {/* Assessment */}
      <Section kicker="Current assessment" title="Where the evidence stands" className="mt-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
          {currentAssessment.map((p, i) => (
            <div key={i} className={i === 0 ? "lg:col-span-2" : ""}>
              <p className="max-w-3xl text-base leading-relaxed text-ink-primary">{p.text}</p>
              <div className="mt-2"><Cites ids={p.sourceIds} /></div>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel kicker="What we know" title="Supported by the public record" tone="evidence">
          <ul className="flex flex-col divide-y divide-line">
            {whatWeKnow.map((p, i) => (
              <li key={i} className="py-3 first:pt-0 last:pb-0">
                <p className="text-[15px] leading-relaxed text-ink-primary">{p.text}</p>
                <div className="mt-1.5"><Cites ids={p.sourceIds} /></div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel kicker="What we do not know" title="Open questions the record cannot answer" tone="crit">
          <ul className="flex flex-col divide-y divide-line">
            {whatWeDoNotKnow.map((p) => (
              <li key={p.text} className="py-3 first:pt-0 last:pb-0">
                <div className="text-[15px] font-semibold text-ink-primary">{p.text}</div>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{p.note}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Graph */}
      <Section
        kicker="Campaign graph"
        title="From unknown access to the current frontier"
        description="Each node opens its record. Edges say only what the sources support: an arrow means one thing preceded another unless the link is labelled otherwise."
        right={<Link href="/timeline" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink-primary">Full timeline <ArrowRight size={14} /></Link>}
      >
        <CampaignGraph nodes={graphNodes} edges={graphEdges} records={records} />
      </Section>

      {/* Frontier */}
      <Section kicker="Current frontier" title="Where the public evidence stops" id="frontier">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          <div>
            {frontierNotes.map((p, i) => (
              <div key={i} className="border-l-2 border-crit pl-4">
                <p className="max-w-3xl text-base leading-relaxed text-ink-primary">{p.text}</p>
                <div className="mt-2"><Cites ids={p.sourceIds} /></div>
              </div>
            ))}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {latestVerifiedEvent && (
                <div className="border border-line bg-bg-surface px-5 py-4">
                  <div className="label text-evidence">Latest verified event</div>
                  <Link href={`/timeline#${latestVerifiedEvent.id}`} className="mt-2 block text-[15px] font-semibold text-ink-primary hover:underline">
                    {latestVerifiedEvent.title}
                  </Link>
                  <div className="mt-1 font-mono text-xs text-ink-faint">
                    {formatDate(latestVerifiedEvent.occurredAt)} · <IdTag id={latestVerifiedEvent.id} />
                  </div>
                </div>
              )}
              {latestEvent && latestEvent.id !== latestVerifiedEvent?.id && (
                <div className="border border-line bg-bg-surface px-5 py-4">
                  <div className="label">Latest reported event</div>
                  <Link href={`/timeline#${latestEvent.id}`} className="mt-2 block text-[15px] font-semibold text-ink-primary hover:underline">
                    {latestEvent.title}
                  </Link>
                  <div className="mt-1 flex items-center gap-2 font-mono text-xs text-ink-faint">
                    {formatDate(latestEvent.occurredAt)} <ConfidencePill confidence={latestEvent.confidence} />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6">
              <div className="label">Unresolved and disputed claims</div>
              <ul className="mt-2 divide-y divide-line border-y border-line">
                {openQuestions.slice(0, 6).map((c) => (
                  <li key={c.id} className="flex items-start gap-3 py-2.5">
                    <ClaimStatusPill status={c.status} className="mt-0.5 shrink-0" />
                    <Link href={`/claims#${c.id}`} className="text-[15px] text-ink-secondary hover:text-ink-primary">{c.statement}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="border border-crit-dim bg-bg-surface">
              <div className="border-b border-line px-5 py-3">
                <div className="label text-crit">Known checkpoints</div>
              </div>
              <ul className="divide-y divide-line">
                {next.length === 0 && <li className="px-5 py-4 text-sm text-ink-muted">No dated checkpoints after {formatDate(today)}.</li>}
                {next.map((k) => (
                  <li key={k.id} id={k.id} className="px-5 py-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-sm text-ink-primary">{k.date.length > 10 ? formatDateTime(k.date) : formatDate(k.date)}</span>
                      <Chip tone={k.kind === "legal" ? "info" : k.kind === "release" || k.kind === "marketing" ? "assess" : "neutral"}>{k.kind}</Chip>
                    </div>
                    <div className="mt-1 text-[15px] font-semibold text-ink-primary">{k.label}</div>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{k.description}</p>
                    <div className="mt-1.5 flex items-center gap-2"><ConfidencePill confidence={k.confidence} /><Cites ids={k.sourceIds} /></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 border border-line bg-bg-surface">
              <div className="border-b border-line px-5 py-3">
                <div className="label">Retracted and false</div>
              </div>
              <ul className="divide-y divide-line">
                {retractions.map((c) => (
                  <li key={c.id} className="px-5 py-3">
                    <Link href={`/claims#${c.id}`} className="strike text-[15px] text-ink-secondary hover:text-ink-primary">{c.statement}</Link>
                    <div className="mt-1.5"><ClaimStatusPill status={c.status} /></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 border border-line bg-bg-surface">
              <div className="border-b border-line px-5 py-3">
                <div className="label">Exposure surface</div>
              </div>
              <ul className="divide-y divide-line">
                {exposedDimensions.map((d) => (
                  <li key={d.key} className="flex items-center justify-between gap-3 px-5 py-2.5">
                    <Link href={`/impact#exposure-${d.key}`} className="text-[15px] text-ink-secondary hover:text-ink-primary">{d.label}</Link>
                    <ExposurePill status={d.status} />
                  </li>
                ))}
              </ul>
              <Link href="/impact" className="block border-t border-line px-5 py-3 text-sm text-ink-muted hover:text-ink-primary">All twelve dimensions</Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
