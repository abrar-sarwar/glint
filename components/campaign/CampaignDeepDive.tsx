"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ChevronRight,
  Clock,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import type { Campaign, IOC } from "@/data/campaigns";
import { detectionById } from "@/data/detections";
import { sourceById } from "@/data/sources";
import { techniqueById } from "@/data/techniques";
import { KillChainFlow } from "@/components/graphs/KillChainFlow";
import { ConfidencePill } from "@/components/ui/ConfidencePill";
import { MitreBadge } from "@/components/ui/MitreBadge";
import { SeverityPill } from "@/components/ui/SeverityPill";
import { ObservedBadge, SyntheticBadge } from "@/components/ui/SyntheticBadge";
import { cn, formatDate } from "@/lib/utils";

function StatusPill({ status }: { status: Campaign["status"] }) {
  if (status === "ongoing-extortion") {
    return (
      <span className="inline-flex items-center gap-1.5 border border-accent-crit/50 bg-accent-crit/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-label text-accent-crit">
        <span className="h-1.5 w-1.5 animate-pulse-dot bg-accent-crit" />
        Active extortion
      </span>
    );
  }
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 border border-accent-amber/50 bg-accent-amber/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-label text-accent-amber">
        <span className="h-1.5 w-1.5 animate-pulse-dot bg-accent-amber" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 border border-line bg-bg-elevated px-2 py-0.5 font-mono text-[10px] uppercase tracking-label text-ink-muted">
      <span className="h-1.5 w-1.5 bg-ink-faint" />
      Historical
    </span>
  );
}

function IocRow({ ioc }: { ioc: IOC }) {
  return (
    <tr className="group border-b border-line/40 hover:bg-bg-elevated/40">
      <td className="px-4 py-3 font-mono text-[11px] uppercase tracking-label text-ink-faint">
        {ioc.type}
      </td>
      <td className="px-4 py-3 font-mono text-sm text-ink-primary">
        <div className="flex flex-wrap items-center gap-2">
          <span className="break-all">{ioc.value}</span>
          {ioc.synthetic ? <SyntheticBadge /> : <ObservedBadge />}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-ink-muted">{ioc.context}</td>
      <td className="px-4 py-3 font-mono text-[11px] uppercase tracking-label text-ink-faint">
        {ioc.source_id
          ? (sourceById(ioc.source_id)?.publisher ?? ioc.source_id)
          : "Unsourced"}
      </td>
    </tr>
  );
}

export function CampaignDeepDive({ campaign }: { campaign: Campaign }) {
  const [selectedStep, setSelectedStep] = useState<number>(
    campaign.kill_chain_stages[0].step
  );

  const stage = useMemo(
    () => campaign.kill_chain_stages.find((s) => s.step === selectedStep),
    [campaign, selectedStep]
  );
  const detection = stage?.detection_id
    ? detectionById(stage.detection_id)
    : undefined;
  const technique = stage ? techniqueById(stage.mitre_id) : undefined;

  const allIocs = useMemo(() => {
    const list: IOC[] = [];
    for (const s of campaign.kill_chain_stages) {
      if (s.iocs) list.push(...s.iocs);
    }
    return list;
  }, [campaign]);

  return (
    <div className="flex flex-col gap-10 px-8 py-8">
      {/* Breadcrumb + header */}
      <div>
        <div className="flex items-center gap-2 text-[11px]">
          <Link
            href="/"
            className="font-mono uppercase tracking-label text-ink-faint hover:text-ink-primary"
          >
            Operations
          </Link>
          <ChevronRight size={11} className="text-ink-dim" />
          <span className="font-mono uppercase tracking-label text-ink-faint">
            Campaigns
          </span>
          <ChevronRight size={11} className="text-ink-dim" />
          <span className="font-mono uppercase tracking-label text-ink-secondary">
            {campaign.short_label}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill status={campaign.status} />
              <ConfidencePill confidence={campaign.attribution_confidence} />
              <Pip>Attribution ShinyHunters</Pip>
              <Pip>{campaign.attribution_aliases.join(", ")}</Pip>
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-primary">
              {campaign.name}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-ink-secondary">
              {campaign.summary}
            </p>
          </div>

          <div className="grid w-full max-w-md grid-cols-3 gap-px bg-line">
            <Vital label="Period" value={campaign.time_period} />
            <Vital
              label="Victims"
              value={
                campaign.victims.length === 1
                  ? campaign.victims[0].name.split(" ")[0]
                  : String(campaign.victims.length)
              }
              sub={campaign.victims.length === 1 ? "single" : "confirmed"}
            />
            <Vital
              label="Stages"
              value={String(campaign.kill_chain_stages.length)}
            />
          </div>
        </div>
      </div>

      {/* Initial access banner */}
      <div className="border-l-2 border-accent-amber bg-bg-surface px-5 py-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={13} strokeWidth={1.6} className="text-accent-amber" />
          <span className="font-mono text-[10px] uppercase tracking-label text-accent-amber">
            Initial access
          </span>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">
          {campaign.initial_access_vector}
        </p>
      </div>

      {/* Kill chain */}
      <section>
        <div className="flex items-end justify-between border-b border-line pb-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-ink-primary">
              Kill chain
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Click any stage to see what to detect.
            </p>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
            {campaign.kill_chain_stages.length} stages
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-px bg-line lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="relative h-[380px] bg-bg-surface">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-[0.12]"
            />
            <KillChainFlow
              stages={campaign.kill_chain_stages}
              selectedStep={selectedStep}
              onSelect={setSelectedStep}
            />
          </div>

          <aside className="bg-bg-surface p-6">
            {stage && (
              <>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-ink-faint">
                    Stage {String(stage.step).padStart(2, "0")}
                  </span>
                  <span className="text-ink-dim">·</span>
                  <MitreBadge id={stage.mitre_id} />
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight text-ink-primary">
                  {stage.stage_label}
                </h3>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-label text-ink-faint">
                  {stage.technique_name}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
                  {stage.description}
                </p>

                <div className="mt-5 border-l-2 border-accent-info bg-bg-elevated/40 px-3 py-2.5">
                  <div className="font-mono text-[10px] uppercase tracking-label text-accent-info">
                    What to detect
                  </div>
                  <p className="mt-1 text-sm leading-snug text-ink-secondary">
                    {stage.what_to_detect}
                  </p>
                </div>

                {detection ? (
                  <Link
                    href={`/detections#${detection.id}`}
                    className="mt-4 flex items-start gap-3 border border-line bg-bg-elevated/40 p-3 transition-colors hover:border-accent-terminal/50"
                  >
                    <ShieldCheck
                      size={15}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-accent-terminal"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <SeverityPill severity={detection.severity} />
                        <span className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
                          {detection.id}
                        </span>
                      </div>
                      <div className="mt-2 text-sm font-semibold text-ink-primary">
                        {detection.title}
                      </div>
                      <div className="mt-1 line-clamp-2 text-xs leading-snug text-ink-muted">
                        {detection.description}
                      </div>
                    </div>
                    <ChevronRight
                      size={12}
                      className="mt-1 shrink-0 text-ink-faint"
                    />
                  </Link>
                ) : (
                  <div className="mt-4 border border-dashed border-line/60 bg-bg-elevated/20 px-3 py-3">
                    <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
                      No detection mapped
                    </div>
                    <div className="mt-1 text-xs leading-snug text-ink-muted">
                      Out of band signal or pre-incident reconnaissance.
                      Typically surfaced via threat intel feeds rather than
                      internal telemetry.
                    </div>
                  </div>
                )}

                {technique && (
                  <div className="mt-5 border-t border-line/60 pt-4">
                    <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
                      ATT&amp;CK tactic{technique.tactics.length > 1 ? "s" : ""}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {technique.tactics.map((t) => (
                        <Pip key={t}>{t}</Pip>
                      ))}
                    </div>
                  </div>
                )}

                {stage.iocs && stage.iocs.length > 0 && (
                  <div className="mt-5 border-t border-line/60 pt-4">
                    <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
                      Stage IOCs
                    </div>
                    <ul className="mt-2 space-y-3">
                      {stage.iocs.map((i) => (
                        <li key={i.value} className="border border-line bg-bg-elevated/30 p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
                              {i.type}
                            </span>
                            {i.synthetic ? <SyntheticBadge /> : <ObservedBadge />}
                          </div>
                          <div className="mt-1.5 break-all font-mono text-xs text-ink-primary">
                            {i.value}
                          </div>
                          <div className="mt-1 text-xs leading-snug text-ink-muted">
                            {i.context}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </aside>
        </div>
      </section>

      {/* Two-up: Timeline + Victims */}
      <section className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <div className="flex items-end justify-between border-b border-line pb-3">
            <h2 className="text-xl font-semibold tracking-tight text-ink-primary">
              Timeline
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
              {campaign.timeline_events.length} events
            </span>
          </div>
          <ol className="mt-4 border border-line bg-bg-surface">
            {campaign.timeline_events.map((ev, i) => {
              const isLast = i === campaign.timeline_events.length - 1;
              return (
                <li
                  key={ev.date + i}
                  className={cn(
                    "relative grid grid-cols-[152px_1fr] gap-4 px-5 py-4",
                    !isLast && "border-b border-line/60"
                  )}
                >
                  <div className="relative flex items-start">
                    <span className="mt-[5px] h-2 w-2 shrink-0 bg-accent-terminal" />
                    <span className="ml-3 font-mono text-xs tabular text-ink-secondary">
                      {ev.date}
                    </span>
                    {!isLast && (
                      <span className="absolute left-1 top-3 bottom-[-16px] w-px bg-line" />
                    )}
                  </div>
                  <div className="flex items-start gap-3">
                    <p className="text-sm leading-relaxed text-ink-secondary">
                      {ev.event}
                    </p>
                    {ev.source_id && (
                      <a
                        href={sourceById(ev.source_id)?.url}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-auto shrink-0 text-ink-faint hover:text-accent-terminal"
                        title={sourceById(ev.source_id)?.publisher}
                      >
                        <ExternalLink size={12} strokeWidth={1.5} />
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div>
          <div className="flex items-end justify-between border-b border-line pb-3">
            <h2 className="text-xl font-semibold tracking-tight text-ink-primary">
              Confirmed victims
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
              {campaign.victims.length} entries
            </span>
          </div>
          <ul className="mt-4 divide-y divide-line border border-line bg-bg-surface">
            {campaign.victims.map((v) => {
              const src = sourceById(v.source_id);
              return (
                <li key={v.name} className="px-5 py-3.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="text-base font-semibold text-ink-primary">
                      {v.name}
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
                      {v.sector}
                    </span>
                  </div>
                  {v.scope && (
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {v.scope}
                    </p>
                  )}
                  {src && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-label text-ink-faint hover:text-accent-terminal"
                    >
                      <ExternalLink size={11} strokeWidth={1.5} />{" "}
                      {src.publisher}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-4 grid grid-cols-1 gap-px bg-line">
            <div className="bg-bg-surface p-4">
              <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
                Data stolen
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                {campaign.data_stolen}
              </p>
            </div>
            <div className="bg-bg-surface p-4">
              <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
                Monetisation
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                {campaign.monetization_method}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IOCs */}
      <section>
        <div className="flex items-end justify-between border-b border-line pb-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-ink-primary">
              Indicators of compromise
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Synthetic IOCs are clearly marked. Treat as illustrative only.
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
            {allIocs.length} indicators
          </span>
        </div>
        <div className="mt-4 overflow-x-auto border border-line bg-bg-surface">
          {allIocs.length === 0 ? (
            <div className="px-5 py-8 text-center font-mono text-[11px] uppercase tracking-label text-ink-faint">
              No IOCs published for this campaign
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line bg-bg-elevated/50 font-mono text-[10px] uppercase tracking-label text-ink-faint">
                  <th className="px-4 py-3 font-normal">Type</th>
                  <th className="px-4 py-3 font-normal">Value</th>
                  <th className="px-4 py-3 font-normal">Context</th>
                  <th className="px-4 py-3 font-normal">Source</th>
                </tr>
              </thead>
              <tbody>
                {allIocs.map((i) => (
                  <IocRow key={`${i.type}-${i.value}`} ioc={i} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Sources */}
      <section>
        <div className="flex items-end justify-between border-b border-line pb-3">
          <h2 className="text-xl font-semibold tracking-tight text-ink-primary">
            Sources
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
            {campaign.source_ids.length} citations
          </span>
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-px bg-line md:grid-cols-2">
          {campaign.source_ids.map((sid) => {
            const s = sourceById(sid);
            if (!s) return null;
            return (
              <li key={sid} className="bg-bg-surface p-4">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-2.5"
                >
                  <ExternalLink
                    size={12}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-ink-faint group-hover:text-accent-terminal"
                  />
                  <div className="min-w-0">
                    <div className="text-sm leading-snug text-ink-primary group-hover:text-accent-terminal">
                      {s.title}
                    </div>
                    <div className="mt-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-ink-faint">
                      <span>{s.publisher}</span>
                      <span className="text-ink-dim">·</span>
                      <Clock size={9} strokeWidth={1.5} />
                      <span>{formatDate(s.date)}</span>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function Pip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center border border-line bg-bg-elevated px-2 py-0.5 font-mono text-[11px] text-ink-secondary">
      {children}
    </span>
  );
}

function Vital({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-bg-surface p-3">
      <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
        {label}
      </div>
      <div className="mt-1.5 text-base font-semibold text-ink-primary">
        {value}
      </div>
      {sub && (
        <div className="mt-0.5 font-mono text-[10px] uppercase tracking-label text-ink-faint">
          {sub}
        </div>
      )}
    </div>
  );
}
