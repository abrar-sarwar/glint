import type { Metadata } from "next";
import { actor } from "@/data/actor";
import { PageHeader, Section, Field, Panel } from "@/components/ui/Page";
import { ClaimStatusPill, ConfidencePill, Chip } from "@/components/ui/Pills";
import { Cites } from "@/components/intel/SourceDrawer";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Actor" };

const channelTone: Record<string, "evidence" | "crit" | "assess" | "neutral"> = {
  active: "evidence",
  suspended: "assess",
  removed: "crit",
  unknown: "neutral",
};

export default function ActorPage() {
  return (
    <div className="px-8 py-8">
      <PageHeader
        kicker={`Actor dossier · first observed ${formatDate(actor.firstObserved)} · updated ${formatDate(actor.lastUpdated)}`}
        title={actor.alias}
        lede={actor.summary}
        right={
          <div className="flex flex-col items-end gap-2">
            <div className="label">Also written as</div>
            <div className="flex flex-wrap justify-end gap-1.5">{actor.aliasVariants.map((a) => <Chip key={a}>{a}</Chip>)}</div>
          </div>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel kicker="Observed" title="Infrastructure and channels the record documents" tone="evidence">
          <p className="text-[15px] leading-relaxed text-ink-secondary">{actor.firstObservedNote}</p>
          <ul className="mt-4 divide-y divide-line border-t border-line">
            {actor.channels.map((c) => (
              <li key={`${c.platform}-${c.identifier}`} className="py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[15px] font-semibold text-ink-primary">{c.platform}</span>
                  <span className="font-mono text-xs text-ink-secondary">{c.identifier}</span>
                  <Chip tone={channelTone[c.status]}>{c.status}</Chip>
                  {c.firstSeen && <span className="font-mono text-xs text-ink-faint">since {formatDate(c.firstSeen)}</span>}
                </div>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{c.note}</p>
                <div className="mt-1"><Cites ids={c.sourceIds} /></div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel kicker="Speculation" title="Attribution theories, none of them authoritative" tone="assess">
          <p className="text-[15px] leading-relaxed text-ink-secondary">
            LEEK does not identify anyone as CyberLeek. The theories below are recorded because they circulate, with the status the evidence supports.
          </p>
          <ul className="mt-4 divide-y divide-line border-t border-line">
            {actor.attributionTheories.map((t) => (
              <li key={t.id} id={t.id} className="py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <ClaimStatusPill status={t.status} />
                  <ConfidencePill confidence={t.confidence} />
                  <Chip>{t.origin}</Chip>
                </div>
                <div className="mt-2 text-[15px] font-semibold text-ink-primary">{t.theory}</div>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{t.evidence}</p>
                <div className="mt-1"><Cites ids={t.sourceIds} /></div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Section kicker="Public statements" title="What CyberLeek has said, dated" description="Actor statements are recorded as actor claims. A statement being on this list says nothing about whether it is true.">
        <ol className="divide-y divide-line border-y border-line">
          {actor.statements.map((s, i) => (
            <li key={i} className="grid grid-cols-1 gap-x-6 gap-y-1 py-4 md:grid-cols-[150px_1fr]">
              <div>
                <div className="font-mono text-sm text-ink-primary">{formatDate(s.date)}</div>
                <div className="mt-0.5 text-xs text-ink-faint">{s.medium}</div>
              </div>
              <div>
                <p className="text-[15px] leading-relaxed text-ink-secondary">{s.summary}</p>
                {s.quote && <blockquote className="mt-2 border-l-2 border-claim-dim pl-3 text-[15px] italic leading-relaxed text-ink-primary">{s.quote}</blockquote>}
                <div className="mt-1.5"><Cites ids={s.sourceIds} /></div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel kicker="Stated ideology" title="The manifesto position" tone="claim">
          <p className="text-[15px] leading-relaxed text-ink-secondary">{actor.ideology.summary}</p>
          <div className="mt-2"><Cites ids={actor.ideology.sourceIds} /></div>
          <div className="label mt-5">Demands</div>
          <ul className="mt-2 flex flex-col gap-2">
            {actor.demands.map((d, i) => (
              <li key={i} className="text-[15px] leading-relaxed text-ink-primary">
                <span className="mr-2 text-ink-faint">·</span>{d.text} <Cites ids={d.sourceIds} />
              </li>
            ))}
          </ul>
        </Panel>
        <Panel kicker="Cryptocurrency" title="$CYBERLEEK" tone="claim">
          <p className="text-[15px] leading-relaxed text-ink-secondary">{actor.cryptocurrency.summary}</p>
          <div className="mt-2"><Cites ids={actor.cryptocurrency.sourceIds} /></div>
        </Panel>
      </div>

      <Section kicker="Indicators" title="Observations with their confidence">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="label">Language</div>
            <ul className="mt-2 divide-y divide-line border-y border-line">
              {actor.languageIndicators.map((x, i) => (
                <li key={i} className="py-3">
                  <p className="text-[15px] leading-relaxed text-ink-secondary">{x.observation}</p>
                  <div className="mt-1.5 flex items-center gap-2"><ConfidencePill confidence={x.confidence} /><Cites ids={x.sourceIds} /></div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label">Infrastructure</div>
            <ul className="mt-2 divide-y divide-line border-y border-line">
              {actor.infrastructure.map((x, i) => (
                <li key={i} className="py-3">
                  <p className="text-[15px] leading-relaxed text-ink-secondary">{x.observation}</p>
                  <div className="mt-1.5 flex items-center gap-2"><ConfidencePill confidence={x.confidence} /><Cites ids={x.sourceIds} /></div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="label">Historical alias references</div>
            <ul className="mt-2 divide-y divide-line border-y border-line">
              {actor.historicalAliasReferences.map((x, i) => (
                <li key={i} className="py-3">
                  <p className="text-[15px] leading-relaxed text-ink-secondary">{x.note}</p>
                  <div className="mt-1.5 flex items-center gap-2"><ConfidencePill confidence={x.confidence} /><Cites ids={x.sourceIds} /></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <div className="mt-10 border border-line px-5 py-4">
        <Field label="Handling">
          LEEK records online handles only when they appear in court filings or major reporting, and only as what they are there: discovery targets or community theories. It publishes no personal details.
        </Field>
      </div>
    </div>
  );
}
