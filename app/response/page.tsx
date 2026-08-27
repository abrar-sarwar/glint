import type { Metadata } from "next";
import Link from "next/link";
import { recommendations } from "@/data/recommendations";
import type { Horizon } from "@/data/types";
import { PageHeader, Section } from "@/components/ui/Page";
import { IdTag } from "@/components/ui/Pills";
import { Cite } from "@/components/intel/SourceDrawer";

export const metadata: Metadata = { title: "Response" };

const HORIZONS: { key: Horizon; title: string; note: string }[] = [
  { key: "immediate", title: "Immediate", note: "Days. Preserve, scope, contain, and communicate." },
  { key: "near-term", title: "Near-term", note: "Weeks to months. Close the control gaps the case exposes." },
  { key: "strategic", title: "Strategic", note: "Quarters. Assume unreleased work can escape and design for it." },
];

function RelatedLink({ id }: { id: string }) {
  if (id.startsWith("LEEK-SRC-")) return <Cite id={id} />;
  const href = id.startsWith("LEEK-CLM-") ? `/claims#${id}` : id.startsWith("LEEK-EVT-") ? `/timeline#${id}` : id.startsWith("LEEK-HYP-") ? `/access#${id}` : "#";
  return <Link href={href} className="font-mono text-xs text-ink-muted hover:text-ink-primary">{id.replace("LEEK-", "")}</Link>;
}

export default function ResponsePage() {
  return (
    <div className="px-8 py-8">
      <PageHeader
        kicker={`Defensive recommendations · ${recommendations.length}`}
        title="What should Rockstar do next?"
        lede="Every recommendation says why it matters in this case, tied to a fact in the record. Nothing here describes offensive technique, and none of it is generic control boilerplate."
      />
      {HORIZONS.map((h) => {
        const list = recommendations.filter((r) => r.horizon === h.key);
        return (
          <Section key={h.key} kicker={h.note} title={h.title} id={h.key}>
            <ol className="divide-y divide-line border-y border-line">
              {list.map((r, i) => (
                <li key={r.id} id={r.id} className="grid grid-cols-1 gap-x-8 gap-y-3 py-5 lg:grid-cols-[48px_1fr_1fr]">
                  <div className="font-mono text-2xl tabular text-ink-dim">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <div className="flex items-center gap-2"><h3 className="text-lg font-semibold leading-snug text-ink-primary">{r.title}</h3><IdTag id={r.id} /></div>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">{r.action}</p>
                  </div>
                  <div className="border-l-2 border-assess-dim pl-4">
                    <div className="label text-assess">Why this matters in this case</div>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink-secondary">{r.whyThisCase}</p>
                    {r.relatedIds.length > 0 && <div className="mt-2 flex flex-wrap items-center gap-2">{r.relatedIds.map((id) => <RelatedLink key={id} id={id} />)}</div>}
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        );
      })}
    </div>
  );
}
