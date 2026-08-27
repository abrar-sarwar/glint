"use client";

import Link from "next/link";
import { X } from "lucide-react";
import type { GraphEdge, GraphNode } from "@/data/types";
import { ConfidencePill, IdTag, StatusPill } from "@/components/ui/Pills";
import { Cites } from "@/components/intel/SourceDrawer";
import { Field } from "@/components/ui/Page";
import { cn, formatDate, formatDateTime } from "@/lib/utils";

/** A serialisable slice of an event, claim, or hypothesis for the graph drawer. */
export interface DrawerRecord {
  id: string;
  kind: "event" | "claim" | "hypothesis";
  title: string;
  date?: string;
  summary: string;
  analystAssessment?: string;
  supportingSourceIds: string[];
  contradictingSourceIds?: string[];
  lastUpdated: string;
  href: string;
  whatChanged?: string;
  relatedClaimIds?: string[];
}

export interface DrawerLink {
  edge: GraphEdge;
  other?: GraphNode;
  outgoing: boolean;
}

const relationLabel: Record<GraphEdge["relation"], string> = {
  precedes: "precedes",
  enables: "enables",
  produces: "produces",
  triggers: "triggers",
  "responds-to": "responds to",
  "unknown-link": "link not established",
};

export function IntelDrawer({
  node,
  record,
  related,
  links = [],
  onSelect,
  onClose,
}: {
  node: GraphNode;
  record?: DrawerRecord;
  related: GraphNode[];
  links?: DrawerLink[];
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  const isFrontier = node.kind === "frontier";
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button aria-label="Close" className="absolute inset-0 bg-bg-inset/70" onClick={onClose} />
      <aside
        className={cn(
          "relative flex h-full w-full max-w-[560px] flex-col border-l bg-bg-surface animate-fade-up",
          isFrontier ? "border-crit-dim" : "border-line"
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div className="min-w-0">
            <div className={cn("label", isFrontier ? "text-crit" : "")}>
              {isFrontier ? "Current frontier" : node.kind === "unknown" ? "Unknown" : "Campaign node"}
            </div>
            <h2 className="mt-2 text-xl font-semibold leading-snug text-ink-primary">{record?.title ?? node.label}</h2>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <ConfidencePill confidence={node.confidence} size="md" />
              <StatusPill status={node.status} size="md" />
              {record && <IdTag id={record.id} />}
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="shrink-0 border border-line p-1.5 text-ink-muted hover:border-line-strong hover:text-ink-primary">
            <X size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {record ? (
            <>
              <div className="divide-y divide-line border-y border-line">
                {record.date && (
                  <Field label="Date" mono>
                    {record.date.length > 10 ? formatDateTime(record.date) : formatDate(record.date)}
                  </Field>
                )}
                <Field label="Evidence">
                  <p className="text-[15px] leading-relaxed text-ink-secondary">{record.summary}</p>
                </Field>
                {record.whatChanged && (
                  <Field label="What changed">
                    <p className="text-[15px] leading-relaxed text-ink-secondary">{record.whatChanged}</p>
                  </Field>
                )}
                {record.analystAssessment && (
                  <Field label="Assessment">
                    <p className="border-l-2 border-assess-dim pl-3 text-[15px] leading-relaxed text-ink-secondary">{record.analystAssessment}</p>
                  </Field>
                )}
                {node.competingExplanations && node.competingExplanations.length > 0 && (
                  <Field label="Competing explanations">
                    <ul className="flex flex-col gap-2">
                      {node.competingExplanations.map((c) => (
                        <li key={c} className="text-[15px] leading-relaxed text-ink-secondary">
                          <span className="mr-2 text-ink-faint">·</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </Field>
                )}
                <Field label="Sources">
                  <Cites ids={record.supportingSourceIds} />
                  {record.contradictingSourceIds && record.contradictingSourceIds.length > 0 && (
                    <div className="mt-2">
                      <Cites label="Contradicting" ids={record.contradictingSourceIds} />
                    </div>
                  )}
                </Field>
                {record.relatedClaimIds && record.relatedClaimIds.length > 0 && (
                  <Field label="Claims">
                    <div className="flex flex-wrap gap-2">
                      {record.relatedClaimIds.map((c) => (
                        <Link key={c} href={`/claims#${c}`} className="font-mono text-xs text-claim hover:underline">
                          {c}
                        </Link>
                      ))}
                    </div>
                  </Field>
                )}
                {links.length > 0 && (
                  <Field label="Links">
                    <ul className="flex flex-col gap-2.5">
                      {links.map(({ edge, other, outgoing }) => (
                        <li key={edge.id} className="text-sm">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="font-mono text-xs text-ink-faint">{outgoing ? "to" : "from"}</span>
                            <button onClick={() => other && onSelect(other.id)} className="text-ink-primary hover:underline">{other?.label ?? "?"}</button>
                            <span className={cn("font-mono text-xs", edge.relation === "unknown-link" ? "text-ink-muted" : "text-ink-secondary")}>{relationLabel[edge.relation]}</span>
                            <ConfidencePill confidence={edge.confidence} />
                          </div>
                          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-ink-muted">
                            <span>{edge.label}</span>
                            <Cites ids={edge.sourceIds} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Field>
                )}
                {related.length > 0 && (
                  <Field label="Related nodes">
                    <div className="flex flex-wrap gap-2">
                      {related.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => onSelect(r.id)}
                          className="border border-line px-2 py-1 text-xs text-ink-secondary hover:border-line-strong hover:text-ink-primary"
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </Field>
                )}
                <Field label="Last updated" mono>
                  {formatDate(record.lastUpdated)}
                </Field>
              </div>
              <Link href={record.href} className="mt-5 inline-block text-sm text-ink-muted hover:text-ink-primary">
                Open the full record
              </Link>
            </>
          ) : (
            <p className="text-[15px] text-ink-muted">This node has no record attached.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
