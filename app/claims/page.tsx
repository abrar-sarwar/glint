import type { Metadata } from "next";
import Link from "next/link";
import { claims } from "@/data/claims";
import type { ClaimStatus } from "@/data/types";
import { PageHeader } from "@/components/ui/Page";
import { ClaimStatusPill, ConfidencePill, Chip, IdTag } from "@/components/ui/Pills";
import { Cites } from "@/components/intel/SourceDrawer";
import { claimCounts } from "@/lib/intel";
import { claimStatusToken, cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Claims" };

const ORDER: { status: ClaimStatus; note: string }[] = [
  { status: "supported", note: "Primary evidence or multiple independent reliable sources." },
  { status: "probable", note: "Strong evidence without definitive primary confirmation." },
  { status: "unresolved", note: "The question is live and the evidence does not settle it." },
  { status: "disputed", note: "Credible sources disagree." },
  { status: "actor-claim", note: "Asserted by CyberLeek and not independently verified." },
  { status: "speculation", note: "Community, media, or analyst theory without supporting evidence." },
  { status: "retracted", note: "Published, then withdrawn or corrected. History retained." },
  { status: "false", note: "Disproved by the evidence." },
];

export default function ClaimsPage() {
  return (
    <div className="px-8 py-8">
      <PageHeader
        kicker={`Claim registry · ${claims.length} claims`}
        title="Every claim, with a status and a reason"
        lede="Speculation never becomes fact here. Each statement is graded against the evidence, keeps its full history, and links to the sources on both sides."
        right={
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-4">
            {ORDER.map(({ status }) => {
              const t = claimStatusToken(status);
              return (
                <a key={status} href={`#status-${status}`} className="flex items-center gap-2 text-sm text-ink-muted hover:text-ink-primary">
                  <span className={cn("h-2 w-2", t.dot)} />
                  <span className="tabular font-mono text-ink-primary">{claimCounts[status]}</span>
                  <span>{t.label}</span>
                </a>
              );
            })}
          </div>
        }
      />

      {ORDER.map(({ status, note }) => {
        const list = claims.filter((c) => c.status === status);
        if (list.length === 0) return null;
        const t = claimStatusToken(status);
        return (
          <section key={status} id={`status-${status}`} className="mt-12 scroll-mt-6">
            <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
              <div>
                <h2 className={cn("text-2xl font-semibold tracking-tight", t.color, t.strike && "strike")}>{t.label}</h2>
                <p className="mt-1 text-sm text-ink-muted">{note}</p>
              </div>
              <span className="font-mono text-sm text-ink-faint">{list.length}</span>
            </div>
            <ol className="divide-y divide-line">
              {list.map((c) => (
                <li key={c.id} id={c.id} className="scroll-mt-6 grid grid-cols-1 gap-x-8 gap-y-3 py-6 lg:grid-cols-[1fr_320px]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <ClaimStatusPill status={c.status} />
                      <ConfidencePill confidence={c.confidence} />
                      <Chip>{c.category}</Chip>
                      <Chip tone={c.origin === "actor" ? "claim" : c.origin === "official" ? "info" : "neutral"}>origin: {c.origin}</Chip>
                      <IdTag id={c.id} className="ml-auto" />
                    </div>
                    <h3 className={cn("mt-3 text-lg font-semibold leading-snug text-ink-primary", t.strike && "strike")}>{c.statement}</h3>
                    <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-secondary">
                      <span className="label mr-2">Why</span>{c.rationale}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                      <Cites ids={c.supportingSourceIds} label="Supporting" />
                      <Cites ids={c.contradictingSourceIds} label="Contradicting" />
                      {c.evidenceIds.length > 0 && (
                        <span className="inline-flex flex-wrap items-center gap-1.5">
                          <span className="label mr-1">Evidence</span>
                          {c.evidenceIds.map((v) => <Link key={v} href={`/evidence#${v}`} className="font-mono text-evidence hover:underline">{v.replace("LEEK-", "")}</Link>)}
                        </span>
                      )}
                      {c.relatedClaimIds && c.relatedClaimIds.length > 0 && (
                        <span className="inline-flex flex-wrap items-center gap-1.5">
                          <span className="label mr-1">Related</span>
                          {c.relatedClaimIds.map((r) => <Link key={r} href={`#${r}`} className="font-mono text-claim hover:underline">{r.replace("LEEK-", "")}</Link>)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="border-l border-line pl-5">
                    <div className="label">History</div>
                    <ol className="mt-2 flex flex-col gap-2.5">
                      {c.history.map((h, i) => {
                        const ht = claimStatusToken(h.status);
                        return (
                          <li key={i} className="text-sm">
                            <div className="flex items-center gap-2">
                              <span className={cn("h-1.5 w-1.5", ht.dot)} />
                              <span className="font-mono text-xs text-ink-faint">{formatDate(h.date)}</span>
                              <span className={cn("font-mono text-xs", ht.color)}>{ht.label}</span>
                            </div>
                            <p className="mt-0.5 pl-3.5 leading-relaxed text-ink-muted">{h.note}</p>
                          </li>
                        );
                      })}
                    </ol>
                    <div className="mt-3 font-mono text-xs text-ink-faint">updated {formatDate(c.lastUpdated)}</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
