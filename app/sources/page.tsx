import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { sources } from "@/data/sources";
import type { SourceTier } from "@/data/types";
import lastSyncJson from "@/data/generated/last-sync.json";
import discovered from "@/data/generated/discovered-sources.json";
import pending from "@/data/generated/pending-events.json";
import type { DiscoveredSource, LastSync, PendingEvent } from "@/data/types";
import { PageHeader, Section, Panel } from "@/components/ui/Page";
import { Chip, IdTag } from "@/components/ui/Pills";
import { claimsSupportedBySource, claimsContradictedBySource, eventsCitingSource } from "@/lib/intel";
import { formatDate, formatDateTime, shortSourceRef, tierLabel } from "@/lib/utils";

export const metadata: Metadata = { title: "Sources" };

const statusTone: Record<string, "evidence" | "assess" | "crit" | "neutral"> = {
  active: "evidence",
  corrected: "assess",
  retracted: "crit",
  removed: "crit",
  superseded: "neutral",
};

export default function SourcesPage() {
  const lastSync = lastSyncJson as LastSync;
  const tiers = Array.from(new Set(sources.map((s) => s.tier))).sort((a, b) => a - b) as SourceTier[];
  const discoveredList = discovered as DiscoveredSource[];
  const pendingList = pending as PendingEvent[];
  const primary = sources.filter((s) => s.primary).length;
  return (
    <div className="px-8 py-8">
      <PageHeader
        kicker={`Source registry · ${sources.length} sources · ${primary} primary`}
        title="Every source, graded"
        lede="Sources are ranked by how close they are to the fact: court records first, then the companies involved, the platforms, the actor's own words (as claims), journalism by quality, researchers, blockchain data, and community discussion last. Community discussion is valuable intelligence. It is not primary evidence."
      />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]" id="sync">
        <Panel kicker="Methodology" title="Source priority" tone="info">
          <ol className="grid grid-cols-1 gap-x-8 gap-y-1.5 text-[15px] text-ink-secondary sm:grid-cols-2">
            {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as SourceTier[]).map((t) => (
              <li key={t} className="flex gap-3"><span className="w-5 font-mono text-ink-faint">{t}</span><span>{tierLabel(t)}</span></li>
            ))}
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Clicking any [S000] citation anywhere in LEEK opens the source record. Supported and contradicted claims are computed from the claim registry, not typed by hand.
          </p>
        </Panel>
        <Panel kicker="Automatic update" title="Source sync" tone={lastSync.feeds.length === 0 ? "neutral" : "evidence"}>
          <dl className="divide-y divide-line text-sm">
            <div className="flex justify-between py-2"><dt className="text-ink-muted">Last run</dt><dd className="font-mono text-ink-primary">{formatDateTime(lastSync.ranAt)}</dd></div>
            <div className="flex justify-between py-2"><dt className="text-ink-muted">Mode</dt><dd className="font-mono text-ink-primary">{lastSync.analysisMode}</dd></div>
            <div className="flex justify-between py-2"><dt className="text-ink-muted">Feeds</dt><dd className="font-mono text-ink-primary">{lastSync.feeds.filter((f) => f.ok).length} ok / {lastSync.feeds.length}</dd></div>
            <div className="flex justify-between py-2"><dt className="text-ink-muted">Discovered</dt><dd className="font-mono text-ink-primary">{lastSync.discovered} ({lastSync.newSinceLastRun} new)</dd></div>
            <div className="flex justify-between py-2"><dt className="text-ink-muted">Pending review</dt><dd className="font-mono text-ink-primary">{lastSync.pending}</dd></div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            A scheduled job searches public feeds every six hours and files anything new as pending. Nothing enters the case file without analyst review.
          </p>
        </Panel>
      </div>

      {(discoveredList.length > 0 || pendingList.length > 0) && (
        <Section kicker="Pending intelligence" title="Needs analyst review" description="Discovered by the pipeline and not yet assessed. Not evidence.">
          <ul className="divide-y divide-line border-y border-line">
            {pendingList.filter((p) => p.reviewStatus === "needs-analyst-review").slice(0, 30).map((p) => (
              <li key={p.id} className="py-3">
                <div className="flex flex-wrap items-center gap-2"><Chip tone="assess">{p.category ?? "unclassified"}</Chip><span className="font-mono text-xs text-ink-faint">reported {formatDate(p.reportedAt)}</span><IdTag id={p.id} /></div>
                <div className="mt-1 text-[15px] text-ink-primary">{p.title}</div>
                <p className="mt-1 text-sm text-ink-muted">{p.note}</p>
              </li>
            ))}
            {discoveredList.filter((d) => d.reviewStatus === "needs-analyst-review").slice(0, 40).map((d) => (
              <li key={d.id} className="py-3">
                <div className="flex flex-wrap items-center gap-2"><Chip>{d.publisher}</Chip>{d.suggestedTier && <Chip tone="info">tier {d.suggestedTier}</Chip>}<span className="font-mono text-xs text-ink-faint">{d.publishedAt ? formatDate(d.publishedAt) : "undated"} · {d.feed}</span></div>
                <a href={d.url} target="_blank" rel="noreferrer noopener" className="mt-1 block text-[15px] text-ink-primary hover:underline">{d.title}</a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {tiers.map((tier) => {
        const list = sources.filter((s) => s.tier === tier);
        return (
          <Section key={tier} kicker={`Tier ${tier}`} title={tierLabel(tier)} id={`tier-${tier}`} right={<span className="font-mono text-sm text-ink-faint">{list.length}</span>}>
            <ol className="divide-y divide-line border-y border-line">
              {list.map((s) => {
                const supports = claimsSupportedBySource(s.id);
                const contradicts = claimsContradictedBySource(s.id);
                const cites = eventsCitingSource(s.id).length;
                return (
                  <li key={s.id} id={s.id} className="scroll-mt-6 grid grid-cols-1 gap-x-8 gap-y-2 py-4 lg:grid-cols-[96px_1fr_300px]">
                    <div>
                      <div className="font-mono text-sm font-semibold text-info">[{shortSourceRef(s.id)}]</div>
                      <IdTag id={s.id} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-ink-muted">{s.publisher}{s.author ? ` · ${s.author}` : ""}</span>
                        <Chip tone={s.primary ? "evidence" : "neutral"}>{s.primary ? "primary" : "secondary"}</Chip>
                        <Chip tone={statusTone[s.status]}>{s.status}</Chip>
                        <Chip>{s.type}</Chip>
                      </div>
                      <a href={s.url} target="_blank" rel="noreferrer noopener" className="mt-1.5 inline-flex items-start gap-1.5 text-[15px] font-semibold leading-snug text-ink-primary hover:underline">
                        {s.title}<ExternalLink size={13} className="mt-1 shrink-0 text-ink-faint" />
                      </a>
                      <div className="mt-1 font-mono text-xs text-ink-faint">
                        published {formatDate(s.publishedDate)}{s.eventDate ? ` · event ${formatDate(s.eventDate)}` : ""} · retrieved {formatDate(s.retrievedDate)}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{s.reliabilityNotes}</p>
                      {s.excerpt && <blockquote className="mt-2 border-l-2 border-line-strong pl-3 text-sm italic leading-relaxed text-ink-muted">{s.excerpt}</blockquote>}
                    </div>
                    <div className="border-l border-line pl-4 text-sm">
                      <div className="label">Used by</div>
                      <div className="mt-1 text-ink-secondary">{cites} timeline event{cites === 1 ? "" : "s"}</div>
                      {supports.length > 0 && (
                        <div className="mt-2">
                          <div className="label text-evidence">Supports</div>
                          <div className="mt-1 flex flex-wrap gap-1.5">{supports.map((c) => <Link key={c.id} href={`/claims#${c.id}`} className="font-mono text-xs text-evidence hover:underline">{c.id.replace("LEEK-", "")}</Link>)}</div>
                        </div>
                      )}
                      {contradicts.length > 0 && (
                        <div className="mt-2">
                          <div className="label text-crit">Contradicts</div>
                          <div className="mt-1 flex flex-wrap gap-1.5">{contradicts.map((c) => <Link key={c.id} href={`/claims#${c.id}`} className="font-mono text-xs text-crit hover:underline">{c.id.replace("LEEK-", "")}</Link>)}</div>
                        </div>
                      )}
                      {s.archiveUrl && <a href={s.archiveUrl} className="mt-2 block text-xs text-ink-muted hover:text-ink-primary">archive</a>}
                    </div>
                  </li>
                );
              })}
            </ol>
          </Section>
        );
      })}
    </div>
  );
}
