import type { Metadata } from "next";
import Link from "next/link";
import { evidence } from "@/data/evidence";
import { PageHeader } from "@/components/ui/Page";
import { ConfidencePill, Chip, IdTag } from "@/components/ui/Pills";
import { Cite, Cites } from "@/components/intel/SourceDrawer";
import { cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Evidence" };

const reliabilityNote: Record<string, string> = {
  A: "Court record or corporate statement",
  B: "Original reporting by an established outlet",
  C: "Secondary or syndicated reporting",
  D: "Community analysis",
  E: "Anonymous or unverifiable post",
};

const contradictionTone: Record<string, "evidence" | "assess" | "crit"> = {
  uncontradicted: "evidence",
  "partially-contradicted": "assess",
  contradicted: "crit",
};

export default function EvidencePage() {
  const sorted = [...evidence].sort((a, b) => a.date.localeCompare(b.date));
  const grades = ["A", "B", "C", "D", "E"].map((g) => ({ g, n: evidence.filter((v) => v.reliability === g).length }));
  return (
    <div className="px-8 py-8">
      <PageHeader
        kicker={`Evidence ledger · ${evidence.length} records`}
        title="What each claim rests on"
        lede="One row per piece of evidence: what it is, where it came from, which claims it bears on, how reliable the source is, and whether anything contradicts it. Dates are the date of the evidence itself."
        right={
          <div className="flex flex-col gap-1 text-sm">
            {grades.map(({ g, n }) => (
              <span key={g} className="flex items-center gap-3 text-ink-muted"><span className="w-4 font-mono text-ink-primary">{g}</span><span className="w-6 tabular font-mono text-ink-primary">{n}</span><span>{reliabilityNote[g]}</span></span>
            ))}
          </div>
        }
      />
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[1180px] text-left text-sm">
          <thead>
            <tr className="label border-b border-line">
              <th className="py-3 pr-3 font-normal">ID</th>
              <th className="py-3 pr-3 font-normal">Date</th>
              <th className="py-3 pr-3 font-normal">Evidence</th>
              <th className="py-3 pr-3 font-normal">Source</th>
              <th className="py-3 pr-3 font-normal">Type</th>
              <th className="py-3 pr-3 font-normal">Claims</th>
              <th className="py-3 pr-3 font-normal">Grade</th>
              <th className="py-3 pr-3 font-normal">Confidence</th>
              <th className="py-3 pr-3 font-normal">Contradiction</th>
              <th className="py-3 font-normal">Checked</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line align-top">
            {sorted.map((v) => (
              <tr key={v.id} id={v.id} className="scroll-mt-6">
                <td className="py-4 pr-3"><IdTag id={v.id} /></td>
                <td className="whitespace-nowrap py-4 pr-3 font-mono text-xs text-ink-secondary">{formatDate(v.date)}</td>
                <td className="w-[380px] py-4 pr-3">
                  <div className="text-[15px] font-semibold leading-snug text-ink-primary">{v.title}</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{v.analystNote}</p>
                  {v.corroboratingSourceIds.length > 0 && <div className="mt-1.5"><Cites label="Corroborated by" ids={v.corroboratingSourceIds} /></div>}
                </td>
                <td className="py-4 pr-3"><Cite id={v.sourceId} /><div className="mt-1 text-xs text-ink-faint">{v.sourceType}</div></td>
                <td className="py-4 pr-3"><Chip tone="info">{v.evidenceType}</Chip></td>
                <td className="w-[150px] py-4 pr-3"><div className="flex flex-wrap gap-1">{v.claimsSupported.map((c) => <Link key={c} href={`/claims#${c}`} className="font-mono text-xs text-claim hover:underline">{c.replace("LEEK-", "")}</Link>)}</div></td>
                <td className="py-4 pr-3"><span className={cn("inline-block border px-2 py-0.5 font-mono text-sm", v.reliability === "A" || v.reliability === "B" ? "border-evidence-dim text-evidence" : v.reliability === "C" ? "border-line-strong text-ink-secondary" : "border-assess-dim text-assess")}>{v.reliability}</span></td>
                <td className="py-4 pr-3"><ConfidencePill confidence={v.confidence} /></td>
                <td className="py-4 pr-3"><Chip tone={contradictionTone[v.contradictionStatus]}>{v.contradictionStatus}</Chip></td>
                <td className="whitespace-nowrap py-4 font-mono text-xs text-ink-faint">in {formatDate(v.dateIngested)}<br />chk {formatDate(v.dateLastChecked)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
