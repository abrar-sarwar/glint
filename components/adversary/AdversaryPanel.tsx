"use client";

import { useMemo, useState } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import {
  shinyhunters,
  adversaryGraphEntities,
  adversaryGraphEdges,
  type RelatedEntityNode,
} from "@/data/adversaries";
import { campaignById } from "@/data/campaigns";
import { sourceById } from "@/data/sources";
import { AdversaryGraph } from "@/components/graphs/AdversaryGraph";
import { ConfidencePill } from "@/components/ui/ConfidencePill";
import { MitreBadge } from "@/components/ui/MitreBadge";
import { cn, entityTypeToken, formatDate } from "@/lib/utils";

function MainDossier() {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
        Primary entity
      </div>
      <h2 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-primary">
        ShinyHunters
      </h2>
      <div className="mt-1 font-display text-sm italic text-ink-muted">
        Also known as Scattered LAPSUS$ Hunters
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <ConfidencePill confidence={shinyhunters.attribution_confidence} />
        <Pip>{shinyhunters.motivation}</Pip>
        <Pip>Sophistication {shinyhunters.sophistication}</Pip>
      </div>

      <p className="mt-5 text-[15px] leading-relaxed text-ink-secondary">
        {shinyhunters.summary}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-px bg-line">
        <Stat label="First observed" value={shinyhunters.first_observed} />
        <Stat
          label="Aliases tracked"
          value={String(shinyhunters.aliases.length)}
        />
      </div>

      {/* Aliases */}
      <Section title="UNC aliases" hint="Mandiant cluster designations">
        <ul className="divide-y divide-line/60">
          {shinyhunters.aliases.map((a) => (
            <li key={a.designation} className="py-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-ink-primary">
                  {a.designation}
                </span>
                <span className="font-mono text-[11px] text-ink-faint">
                  first seen {a.first_seen}
                </span>
              </div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-label text-ink-faint">
                Tracked by {a.tracked_by}
              </div>
              <p className="mt-1.5 text-sm leading-snug text-ink-muted">
                {a.scope}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Victimology */}
      <Section
        title="Victimology"
        hint={shinyhunters.victimology.targeting_pattern}
      >
        <div className="grid grid-cols-1 gap-px bg-line">
          <div className="bg-bg-surface p-3">
            <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
              Sectors
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {shinyhunters.victimology.sectors.map((s) => (
                <Pip key={s}>{s}</Pip>
              ))}
            </div>
          </div>
          <div className="bg-bg-surface p-3">
            <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
              Geography
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {shinyhunters.victimology.geographic_focus.map((s) => (
                <Pip key={s}>{s}</Pip>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* TTPs */}
      <Section title="Signature techniques" hint="MITRE ATT&CK alignment">
        <ul>
          {shinyhunters.signature_ttps.map((ttp, i) => (
            <li
              key={ttp.mitre_id}
              className={cn(
                "flex items-start gap-3 py-3",
                i !== shinyhunters.signature_ttps.length - 1 &&
                  "border-b border-line/40"
              )}
            >
              <MitreBadge id={ttp.mitre_id} className="mt-0.5 shrink-0" />
              <p className="flex-1 text-sm leading-snug text-ink-secondary">
                {ttp.notes}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Notable breaches */}
      <Section title="Notable breaches">
        <ul className="divide-y divide-line/60">
          {shinyhunters.notable_breaches.map((b) => (
            <li key={b.campaign_id} className="py-3">
              <div className="font-mono text-[11px] text-ink-faint">
                {b.date}
              </div>
              <div className="mt-1 text-base font-semibold text-ink-primary">
                {b.short_label}
              </div>
              <div className="mt-1 text-sm leading-snug text-ink-muted">
                {b.victims_summary}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Sources */}
      <Section title="Sources">
        <ul className="divide-y divide-line/60">
          {shinyhunters.source_ids.map((sid) => {
            const s = sourceById(sid);
            if (!s) return null;
            return (
              <li key={sid} className="py-2.5">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-2"
                >
                  <ExternalLink
                    size={12}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-ink-faint group-hover:text-accent-terminal"
                  />
                  <div className="min-w-0">
                    <div className="text-sm leading-snug text-ink-secondary group-hover:text-accent-terminal">
                      {s.title}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-label text-ink-faint">
                      {s.publisher} · {formatDate(s.date)}
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </Section>
    </div>
  );
}

function EntityDossier({ entity }: { entity: RelatedEntityNode }) {
  const tok = entityTypeToken(entity.type);
  const incomingEdges = adversaryGraphEdges.filter(
    (e) => e.target === entity.id || e.source === entity.id
  );
  const linkedCampaign = useMemo(() => {
    if (entity.type !== "victim") return undefined;
    const breach = shinyhunters.notable_victims.find((v) =>
      v.name.toLowerCase().includes(entity.label.toLowerCase().split(" ")[0])
    );
    if (!breach) return undefined;
    return campaignById(breach.campaign_id);
  }, [entity]);

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className={cn("h-1.5 w-1.5", tok.dot)} />
        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-label",
            tok.color
          )}
        >
          {tok.label}
        </span>
      </div>
      <h2 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight text-ink-primary">
        {entity.label}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-secondary">
        {entity.detail}
      </p>

      <Section title="Relationships">
        <ul className="divide-y divide-line/40">
          {incomingEdges.map((e) => {
            const otherId = e.source === entity.id ? e.target : e.source;
            const other = adversaryGraphEntities.find((x) => x.id === otherId);
            if (!other) return null;
            const otherTok = entityTypeToken(other.type);
            return (
              <li
                key={`${e.source}-${e.target}`}
                className="flex items-center gap-3 py-2.5 text-sm"
              >
                <span className={cn("h-1 w-1", otherTok.dot)} />
                <span className="font-mono text-[11px] text-ink-faint">
                  {e.label}
                </span>
                <ChevronRight size={11} className="text-ink-dim" />
                <span className="text-ink-primary">{other.label}</span>
              </li>
            );
          })}
        </ul>
      </Section>

      {linkedCampaign && (
        <div className="mt-6 border border-line bg-bg-elevated/40 p-4">
          <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
            Linked campaign
          </div>
          <div className="mt-1 text-base font-semibold text-ink-primary">
            {linkedCampaign.short_label}
          </div>
          <div className="mt-1 font-mono text-xs text-ink-muted">
            {linkedCampaign.time_period} ·{" "}
            {linkedCampaign.attribution_aliases.join(", ")}
          </div>
          <a
            href={`/campaigns/${linkedCampaign.slug}`}
            className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-label text-accent-terminal hover:underline"
          >
            View dossier <ChevronRight size={11} />
          </a>
        </div>
      )}
    </div>
  );
}

export function AdversaryPanel() {
  const [selected, setSelected] = useState<string>("shinyhunters");

  const entity = useMemo(
    () => adversaryGraphEntities.find((e) => e.id === selected),
    [selected]
  );

  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-[minmax(0,1fr)_440px]">
      <div className="relative flex flex-col">
        <div className="flex items-center justify-between border-b border-line px-6 py-3">
          <div className="font-mono text-[11px] uppercase tracking-label text-ink-muted">
            Cluster topology
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <Legend dot="bg-accent-crit" label="Actor" />
            <Legend dot="bg-accent-amber" label="Alias" />
            <Legend dot="bg-accent-info" label="Affiliate" />
            <Legend dot="bg-ink-faint" label="Victim" />
          </div>
        </div>
        <div className="relative flex-1 bg-bg-base">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-[0.15]"
          />
          <AdversaryGraph selected={selected} onSelect={setSelected} />
        </div>
        <div className="border-t border-line bg-bg-surface px-6 py-2.5 font-mono text-[11px] uppercase tracking-label text-ink-faint">
          Click any node. {adversaryGraphEntities.length} entities,{" "}
          {adversaryGraphEdges.length} edges.
        </div>
      </div>

      <aside className="overflow-y-auto border-line lg:border-l">
        <div className="px-6 py-7">
          {selected === "shinyhunters" || !entity ? (
            <MainDossier />
          ) : (
            <EntityDossier entity={entity} />
          )}
        </div>
      </aside>
    </div>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7">
      <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
        {title}
      </div>
      {hint && <p className="mt-1 text-sm leading-snug text-ink-muted">{hint}</p>}
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg-surface p-3">
      <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
        {label}
      </div>
      <div className="mt-1.5 font-mono text-base text-ink-primary tabular">
        {value}
      </div>
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

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("h-1.5 w-1.5", dot)} />
      <span className="font-mono uppercase tracking-label text-ink-faint">
        {label}
      </span>
    </div>
  );
}
