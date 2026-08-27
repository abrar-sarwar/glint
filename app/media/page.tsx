import type { Metadata } from "next";
import Link from "next/link";
import { mediaRecords, narratives, mediaReactionChain } from "@/data/media";
import type { MediaChannel } from "@/data/types";
import { PageHeader, Section } from "@/components/ui/Page";
import { NarrativePill, Chip, IdTag, ClaimStatusPill } from "@/components/ui/Pills";
import { Cite, Cites } from "@/components/intel/SourceDrawer";
import { PropagationChainView } from "@/components/intel/PropagationChainView";
import { claims } from "@/data/claims";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Media" };

const channelLabel: Record<MediaChannel, string> = {
  mainstream: "Mainstream press",
  gaming: "Gaming press",
  tech: "Tech press",
  cybersecurity: "Security community",
  financial: "Financial press",
  youtube: "YouTube",
  reddit: "Reddit",
  x: "X",
  tiktok: "TikTok",
  discord: "Discord reporting",
  forum: "Forums",
};

export default function MediaPage() {
  const byChannel = (Object.keys(channelLabel) as MediaChannel[]).map((ch) => ({ ch, n: mediaRecords.filter((m) => m.channel === ch).length })).filter((x) => x.n > 0);
  const timeline = [...mediaRecords].sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
  return (
    <div className="px-8 py-8">
      <PageHeader
        kicker={`Media intelligence · ${mediaRecords.length} records · ${narratives.length} narratives`}
        title="How the campaign spread"
        lede="A threat actor can affect a company without touching another system, by shaping what is said about it. This page tracks the coverage, the narratives it carried, and whether the claim under each narrative holds up."
        right={
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-3">
            {byChannel.map(({ ch, n }) => (
              <span key={ch} className="text-ink-muted"><span className="tabular font-mono text-ink-primary">{n}</span> {channelLabel[ch]}</span>
            ))}
          </div>
        }
      />

      <Section kicker="Narrative clusters" title="What the coverage claimed, and whether it holds" description="Narrative confidence is the status of the underlying claim today, not the confidence of the outlets that carried it.">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {narratives.map((n) => {
            const claim = claims.find((c) => c.id === n.underlyingClaimId);
            return (
              <li key={n.id} id={n.id} className="scroll-mt-6 flex flex-col border border-line bg-bg-surface px-5 py-4">
                <div className="flex flex-wrap items-center gap-2"><NarrativePill confidence={n.confidence} size="md" /><IdTag id={n.id} /></div>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-ink-primary">&ldquo;{n.label}&rdquo;</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-secondary">{n.description}</p>
                {claim && (
                  <div className="mt-3 border-t border-line pt-3">
                    <div className="label">Underlying claim</div>
                    <div className="mt-1.5 flex items-start gap-2"><ClaimStatusPill status={claim.status} className="mt-0.5 shrink-0" /><Link href={`/claims#${claim.id}`} className="text-sm text-ink-secondary hover:text-ink-primary">{claim.statement}</Link></div>
                  </div>
                )}
                <div className="mt-3 flex flex-wrap gap-1.5">{n.carriers.map((c) => <Chip key={c}>{c}</Chip>)}</div>
                <div className="mt-2 flex items-center gap-3 text-xs"><span className="font-mono text-ink-faint">first seen {formatDate(n.firstSeen)}</span><Cites ids={n.sourceIds} /></div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section kicker="Media reaction graph" title="From actor publication to correction" description={mediaReactionChain.summary}>
        <PropagationChainView chain={mediaReactionChain} compact />
      </Section>

      <Section kicker="Media timeline" title="Coverage in order" description="Publication dates, not event dates. Framing notes record how each piece handled authenticity and attribution.">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead>
              <tr className="label border-b border-line">
                <th className="py-3 pr-4 font-normal">Published</th>
                <th className="py-3 pr-4 font-normal">Channel</th>
                <th className="py-3 pr-4 font-normal">Outlet and title</th>
                <th className="py-3 pr-4 font-normal">Narratives</th>
                <th className="py-3 font-normal">Framing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line align-top">
              {timeline.map((m) => (
                <tr key={m.id} id={m.id} className="scroll-mt-6">
                  <td className="whitespace-nowrap py-3 pr-4 font-mono text-xs text-ink-secondary">{formatDate(m.publishedAt)}</td>
                  <td className="py-3 pr-4"><Chip>{channelLabel[m.channel]}</Chip></td>
                  <td className="w-[360px] py-3 pr-4">
                    <div className="text-xs text-ink-faint">{m.outlet}{m.author ? ` · ${m.author}` : ""}</div>
                    <a href={m.url} target="_blank" rel="noreferrer noopener" className="text-[15px] text-ink-primary hover:underline">{m.title}</a>
                    {m.sourceId && <span className="ml-2"><Cite id={m.sourceId} /></span>}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-1">{m.narrativeIds.map((n) => <a key={n} href={`#${n}`} className="font-mono text-xs text-ink-muted hover:text-ink-primary">{n.replace("LEEK-", "")}</a>)}</div>
                  </td>
                  <td className="py-3 text-sm leading-relaxed text-ink-secondary">{m.framing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
