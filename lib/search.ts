import { events } from "@/data/events";
import { claims } from "@/data/claims";
import { sources } from "@/data/sources";
import { evidence } from "@/data/evidence";
import { drops } from "@/data/drops";
import { hypotheses } from "@/data/hypotheses";
import { mediaRecords, narratives } from "@/data/media";
import { checkpoints } from "@/data/checkpoints";
import { actor } from "@/data/actor";

export type SearchKind =
  | "event"
  | "claim"
  | "source"
  | "evidence"
  | "drop"
  | "hypothesis"
  | "narrative"
  | "media"
  | "checkpoint"
  | "entity"
  | "legal";

export interface SearchItem {
  id: string;
  kind: SearchKind;
  title: string;
  snippet: string;
  href: string;
  date?: string;
  meta?: string;
}

function build(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const e of events) {
    items.push({
      id: e.id,
      kind: e.category === "legal" ? "legal" : "event",
      title: e.title,
      snippet: e.summary,
      href: `/timeline#${e.id}`,
      date: e.occurredAt,
      meta: `${e.category} · ${e.confidence}`,
    });
  }
  for (const c of claims) {
    items.push({
      id: c.id,
      kind: "claim",
      title: c.statement,
      snippet: c.rationale,
      href: `/claims#${c.id}`,
      date: c.lastUpdated,
      meta: c.status,
    });
  }
  for (const s of sources) {
    items.push({
      id: s.id,
      kind: "source",
      title: s.title,
      snippet: `${s.publisher}${s.author ? " · " + s.author : ""} · ${s.reliabilityNotes}`,
      href: `/sources#${s.id}`,
      date: s.publishedDate,
      meta: `tier ${s.tier}`,
    });
  }
  for (const v of evidence) {
    items.push({
      id: v.id,
      kind: "evidence",
      title: v.title,
      snippet: v.analystNote,
      href: `/evidence#${v.id}`,
      date: v.date,
      meta: `${v.evidenceType} · ${v.reliability}`,
    });
  }
  for (const d of drops) {
    items.push({
      id: d.id,
      kind: "drop",
      title: d.reportedTitle,
      snippet: d.description,
      href: `/drops#${d.id}`,
      date: d.date,
      meta: d.mediaType,
    });
  }
  for (const h of hypotheses) {
    items.push({
      id: h.id,
      kind: "hypothesis",
      title: h.title,
      snippet: h.summary,
      href: `/access#${h.id}`,
      meta: h.confidence,
    });
  }
  for (const n of narratives) {
    items.push({
      id: n.id,
      kind: "narrative",
      title: n.label,
      snippet: n.description,
      href: `/media#${n.id}`,
      date: n.firstSeen,
      meta: n.confidence,
    });
  }
  for (const m of mediaRecords) {
    items.push({
      id: m.id,
      kind: "media",
      title: m.title,
      snippet: `${m.outlet} · ${m.framing}`,
      href: `/media#${m.id}`,
      date: m.publishedAt,
      meta: m.channel,
    });
  }
  for (const k of checkpoints) {
    items.push({
      id: k.id,
      kind: "checkpoint",
      title: k.label,
      snippet: k.description,
      href: `/#${k.id}`,
      date: k.date,
      meta: k.kind,
    });
  }
  // Entities
  const entities = [
    { id: "ENT-cyberleek", name: actor.alias, snippet: actor.summary, href: "/actor" },
    { id: "ENT-rockstar", name: "Rockstar Games", snippet: "Developer of Grand Theft Auto VI.", href: "/timeline?filter=rockstar" },
    { id: "ENT-take-two", name: "Take-Two Interactive", snippet: "Rockstar's parent company; plaintiff in the subpoena filings.", href: "/timeline?filter=legal" },
    { id: "ENT-microsoft", name: "Microsoft", snippet: "Subpoena recipient.", href: "/timeline?filter=legal" },
    { id: "ENT-discord", name: "Discord", snippet: "Subpoena recipient; platform used for distribution.", href: "/timeline?filter=legal" },
  ];
  for (const en of entities) {
    items.push({ id: en.id, kind: "entity", title: en.name, snippet: en.snippet, href: en.href });
  }
  return items;
}

export const searchIndex: SearchItem[] = build();

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .split(/[^a-z0-9$#-]+/)
    .filter((t) => t.length > 1);
}

export function search(query: string, limit = 24): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = tokenize(q);
  const scored = searchIndex
    .map((item) => {
      const hay = `${item.id} ${item.title} ${item.snippet} ${item.meta ?? ""}`.toLowerCase();
      let score = 0;
      if (item.id.toLowerCase().includes(q)) score += 20;
      if (item.title.toLowerCase().includes(q)) score += 10;
      for (const t of tokens) {
        if (item.title.toLowerCase().includes(t)) score += 4;
        else if (hay.includes(t)) score += 1;
      }
      return { item, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || (b.item.date ?? "").localeCompare(a.item.date ?? ""));
  return scored.slice(0, limit).map((s) => s.item);
}
