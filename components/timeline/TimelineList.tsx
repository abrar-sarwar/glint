"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { EventCategory, TimelineEvent } from "@/data/types";
import { ConfidencePill, StatusPill, Chip, IdTag } from "@/components/ui/Pills";
import { Cites } from "@/components/intel/SourceDrawer";
import { categoryToken, cn, formatDate, formatDateTime } from "@/lib/utils";

type FilterKey = "all" | "leaks" | "claims" | "legal" | "media" | "rockstar" | "corrections" | "crypto" | "community" | "platforms";

const FILTERS: { key: FilterKey; label: string; categories: EventCategory[] | null }[] = [
  { key: "all", label: "All", categories: null },
  { key: "leaks", label: "Leaks", categories: ["leak"] },
  { key: "claims", label: "Actor statements", categories: ["actor-statement"] },
  { key: "legal", label: "Legal", categories: ["legal", "take-two"] },
  { key: "platforms", label: "Platforms", categories: ["microsoft", "discord", "platform"] },
  { key: "rockstar", label: "Rockstar", categories: ["rockstar"] },
  { key: "media", label: "Media", categories: ["media"] },
  { key: "corrections", label: "Corrections", categories: ["correction", "misinformation"] },
  { key: "crypto", label: "Token", categories: ["cryptocurrency"] },
  { key: "community", label: "Community", categories: ["community", "investigation"] },
];

function keyFromParam(p: string | null): FilterKey {
  if (!p) return "all";
  const direct = FILTERS.find((f) => f.key === p);
  if (direct) return direct.key;
  const byCategory = FILTERS.find((f) => f.categories?.includes(p as EventCategory));
  return byCategory?.key ?? "all";
}

export function TimelineList({ events }: { events: TimelineEvent[] }) {
  const params = useSearchParams();
  const [filter, setFilter] = useState<FilterKey>(() => keyFromParam(params.get("filter")));
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const visible = useMemo(() => {
    const f = FILTERS.find((x) => x.key === filter);
    return events.filter((e) => {
      if (f?.categories && !f.categories.includes(e.category)) return false;
      if (verifiedOnly && e.confidence !== "verified" && e.confidence !== "high") return false;
      return true;
    });
  }, [events, filter, verifiedOnly]);

  const days = useMemo(() => {
    const map = new Map<string, TimelineEvent[]>();
    for (const e of visible) {
      const d = e.occurredAt.slice(0, 10);
      map.set(d, [...(map.get(d) ?? []), e]);
    }
    return Array.from(map.entries());
  }, [visible]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const f of FILTERS) c[f.key] = f.categories ? events.filter((e) => f.categories!.includes(e.category)).length : events.length;
    return c;
  }, [events]);

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-8 border-b border-line bg-bg-base/95 px-8 py-3 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "border px-2.5 py-1 text-sm transition-colors",
                filter === f.key
                  ? "border-ink-primary bg-bg-elevated text-ink-primary"
                  : "border-line text-ink-muted hover:border-line-strong hover:text-ink-primary"
              )}
            >
              {f.label}
              <span className="ml-1.5 font-mono text-xs text-ink-faint">{counts[f.key]}</span>
            </button>
          ))}
          <label className="ml-auto inline-flex cursor-pointer items-center gap-2 text-sm text-ink-muted">
            <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="accent-evidence" />
            Verified and high confidence only
          </label>
        </div>
      </div>

      {days.length === 0 && (
        <p className="py-10 text-[15px] text-ink-muted">No events match this filter yet.</p>
      )}

      <ol className="mt-2">
        {days.map(([day, items]) => (
          <li key={day} className="grid grid-cols-1 gap-x-8 border-b border-line py-8 md:grid-cols-[170px_1fr]">
            <div className="md:sticky md:top-20 md:self-start">
              <div className="text-2xl font-semibold tracking-tight text-ink-primary">{formatDate(day)}</div>
              <div className="mt-1 font-mono text-xs text-ink-faint">
                {items.length} event{items.length === 1 ? "" : "s"}
              </div>
            </div>
            <ol className="flex flex-col gap-8">
              {items.map((e) => {
                const cat = categoryToken(e.category);
                const reportedDiffers = e.reportedAt && e.reportedAt.slice(0, 10) !== e.occurredAt.slice(0, 10);
                return (
                  <li key={e.id} id={e.id} className="scroll-mt-24">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className={cn("inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-label-tight", cat.color)}>
                        <span className={cn("h-1.5 w-1.5", cat.dot)} />
                        {cat.label}
                      </span>
                      <span className="font-mono text-xs text-ink-faint">
                        occurred {e.occurredAt.length > 10 ? formatDateTime(e.occurredAt) : formatDate(e.occurredAt)}
                        {e.occurredPrecision !== "exact" && e.occurredPrecision !== "day" ? " (approx.)" : ""}
                      </span>
                      {reportedDiffers && (
                        <span className="font-mono text-xs text-ink-faint">reported {formatDate(e.reportedAt)}</span>
                      )}
                      <IdTag id={e.id} className="ml-auto" />
                    </div>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-ink-primary">{e.title}</h3>
                    <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-ink-secondary">{e.summary}</p>
                    <p className="mt-3 max-w-3xl border-l-2 border-line-strong pl-3 text-[15px] leading-relaxed text-ink-muted">
                      <span className="label mr-2">What changed</span>
                      {e.whatChanged}
                    </p>
                    {e.analystAssessment && (
                      <p className="mt-3 max-w-3xl border-l-2 border-assess-dim pl-3 text-[15px] leading-relaxed text-ink-secondary">
                        <span className="label mr-2 text-assess">Assessment</span>
                        {e.analystAssessment}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <ConfidencePill confidence={e.confidence} />
                      <StatusPill status={e.status} />
                      {e.affectedEntities.map((a) => (
                        <Chip key={a}>{a}</Chip>
                      ))}
                      {e.evidenceTypes.map((t) => (
                        <Chip key={t} tone="info">{t}</Chip>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                      <Cites ids={e.supportingSourceIds} label="Sources" />
                      {e.contradictingSourceIds && e.contradictingSourceIds.length > 0 && (
                        <Cites ids={e.contradictingSourceIds} label="Contradicting" />
                      )}
                      {e.relatedClaimIds && e.relatedClaimIds.length > 0 && (
                        <span className="inline-flex flex-wrap items-center gap-1.5">
                          <span className="label mr-1">Claims</span>
                          {e.relatedClaimIds.map((c) => (
                            <Link key={c} href={`/claims#${c}`} className="font-mono text-claim hover:underline">{c}</Link>
                          ))}
                        </span>
                      )}
                      {e.relatedDropIds && e.relatedDropIds.length > 0 && (
                        <span className="inline-flex flex-wrap items-center gap-1.5">
                          <span className="label mr-1">Drops</span>
                          {e.relatedDropIds.map((d) => (
                            <Link key={d} href={`/drops#${d}`} className="font-mono text-ink-secondary hover:underline">{d}</Link>
                          ))}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  );
}
