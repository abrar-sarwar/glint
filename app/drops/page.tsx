import type { Metadata } from "next";
import Link from "next/link";
import { drops } from "@/data/drops";
import { PageHeader, Field } from "@/components/ui/Page";
import { ConfidencePill, Chip, IdTag } from "@/components/ui/Pills";
import { Cites } from "@/components/intel/SourceDrawer";
import { cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Drops" };

const takedownTone: Record<string, "evidence" | "assess" | "crit" | "neutral"> = {
  removed: "evidence",
  "partially-removed": "assess",
  circulating: "crit",
  unknown: "neutral",
};

export default function DropsPage() {
  const sorted = [...drops].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <div className="px-8 py-8">
      <PageHeader
        kicker={`Drops · ${drops.length} reported releases`}
        title="What CyberLeek released"
        lede="An index of every publicly reported release, described from the reporting rather than hosted. LEEK stores metadata and analysis only. It does not link to, embed, or mirror the material."
      />

      <div className="mt-8 overflow-x-auto border border-line">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-bg-surface">
            <tr className="label">
              <th className="px-4 py-3 font-normal">Date</th>
              <th className="px-4 py-3 font-normal">Reported title</th>
              <th className="px-4 py-3 font-normal">Type</th>
              <th className="px-4 py-3 font-normal">Authenticity</th>
              <th className="px-4 py-3 font-normal">Takedown</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {sorted.map((d) => (
              <tr key={d.id} className="hover:bg-bg-elevated/50">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink-secondary">
                  {formatDate(d.date)}{d.datePrecision === "approximate" ? " ~" : ""}
                </td>
                <td className="px-4 py-3">
                  <Link href={`#${d.id}`} className="text-[15px] text-ink-primary hover:underline">{d.reportedTitle}</Link>
                  <span className="ml-2"><IdTag id={d.id} /></span>
                </td>
                <td className="px-4 py-3"><Chip>{d.mediaType}</Chip></td>
                <td className="px-4 py-3"><ConfidencePill confidence={d.authenticity} /></td>
                <td className="px-4 py-3"><Chip tone={takedownTone[d.takedown.status]}>{d.takedown.status}</Chip></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ol className="mt-10 flex flex-col gap-8">
        {sorted.map((d) => (
          <li key={d.id} id={d.id} className="scroll-mt-6 border border-line bg-bg-surface">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-6 py-4">
              <div>
                <div className="font-mono text-xs text-ink-faint">{formatDate(d.date)}{d.datePrecision === "approximate" ? " (approximate)" : ""}</div>
                <h2 className="mt-1 text-xl font-semibold text-ink-primary">{d.reportedTitle}</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Chip>{d.mediaType}</Chip>
                <ConfidencePill confidence={d.authenticity} size="md" />
                <IdTag id={d.id} />
              </div>
            </div>
            <div className="divide-y divide-line px-6">
              <Field label="Description"><p className="text-[15px] leading-relaxed">{d.description}</p></Field>
              <Field label="Reveals">
                <ul className="flex flex-wrap gap-2">
                  {d.reveals.map((r) => <Chip key={r} tone="info">{r}</Chip>)}
                </ul>
              </Field>
              <Field label="Security"><p className="text-[15px] leading-relaxed">{d.securityRelevance}</p></Field>
              <Field label="Development"><p className="text-[15px] leading-relaxed">{d.developmentRelevance}</p></Field>
              <Field label="Marketing"><p className="text-[15px] leading-relaxed">{d.marketingRelevance}</p></Field>
              <Field label="Authenticity"><p className="text-[15px] leading-relaxed">{d.authenticityNote}</p></Field>
              {d.watermark && <Field label="Watermark" mono>{d.watermark}</Field>}
              <Field label="Takedown">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone={takedownTone[d.takedown.status]}>{d.takedown.status}</Chip>
                  {d.takedown.note && <span className="text-[15px] text-ink-secondary">{d.takedown.note}</span>}
                </div>
              </Field>
              <Field label="Claims">
                <div className="flex flex-wrap gap-2">
                  {d.relatedClaimIds.map((c) => <Link key={c} href={`/claims#${c}`} className="font-mono text-xs text-claim hover:underline">{c}</Link>)}
                </div>
              </Field>
              <Field label="Sources"><Cites ids={d.sourceIds} /></Field>
            </div>
          </li>
        ))}
      </ol>
      <p className={cn("mt-8 text-sm text-ink-faint")}>Dates marked ~ are approximate: the reporting gives a day range rather than a timestamp.</p>
    </div>
  );
}
