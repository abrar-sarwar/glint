import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  AssessmentStatus,
  ClaimStatus,
  Confidence,
  EventCategory,
  ExposureStatus,
  NarrativeConfidence,
  SourceTier,
} from "@/data/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ------------------------------------------------------------------ */
/* Dates                                                               */
/* ------------------------------------------------------------------ */

export function formatDate(iso: string | undefined): string {
  if (!iso) return "";
  const d = new Date(iso.length === 10 ? iso + "T00:00:00Z" : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateTime(iso: string | undefined): string {
  if (!iso) return "";
  if (iso.length === 10) return formatDate(iso);
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return (
    d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }) +
    " " +
    d.toISOString().slice(11, 16) +
    " UTC"
  );
}

/** "18 AUG 2026" style used in the hero. */
export function formatStamp(iso: string | undefined): string {
  return formatDate(iso).toUpperCase();
}

export function todayIso(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function dayOnly(iso: string): string {
  return iso.slice(0, 10);
}

export function daysBetween(a: string, b: string): number {
  const da = Date.UTC(
    Number(a.slice(0, 4)),
    Number(a.slice(5, 7)) - 1,
    Number(a.slice(8, 10))
  );
  const db = Date.UTC(
    Number(b.slice(0, 4)),
    Number(b.slice(5, 7)) - 1,
    Number(b.slice(8, 10))
  );
  return Math.round((db - da) / 86_400_000);
}

/* ------------------------------------------------------------------ */
/* IDs                                                                 */
/* ------------------------------------------------------------------ */

/** LEEK-SRC-014 -> S014 */
export function shortSourceRef(id: string): string {
  const m = id.match(/LEEK-SRC-(\d+)/);
  return m ? `S${m[1]}` : id;
}

export function shortId(id: string): string {
  return id.replace(/^LEEK-/, "");
}

/* ------------------------------------------------------------------ */
/* Semantic tokens                                                     */
/* ------------------------------------------------------------------ */

export interface Token {
  label: string;
  color: string;
  bg: string;
  border: string;
  dot: string;
  strike?: boolean;
}

export function confidenceToken(c: Confidence): Token {
  switch (c) {
    case "verified":
      return {
        label: "Verified",
        color: "text-evidence",
        bg: "bg-evidence-faint",
        border: "border-evidence-dim",
        dot: "bg-evidence",
      };
    case "high":
      return {
        label: "High confidence",
        color: "text-evidence",
        bg: "bg-evidence-faint/60",
        border: "border-evidence-dim/70",
        dot: "bg-evidence-dim",
      };
    case "moderate":
      return {
        label: "Moderate confidence",
        color: "text-assess",
        bg: "bg-assess-faint",
        border: "border-assess-dim",
        dot: "bg-assess",
      };
    case "low":
      return {
        label: "Low confidence",
        color: "text-ink-secondary",
        bg: "bg-bg-elevated",
        border: "border-line-strong",
        dot: "bg-ink-muted",
      };
    case "unknown":
      return {
        label: "Unknown",
        color: "text-ink-muted",
        bg: "bg-hatch-muted",
        border: "border-line border-dashed",
        dot: "bg-ink-faint",
      };
  }
}

export function statusToken(s: AssessmentStatus): Token {
  switch (s) {
    case "supported":
      return {
        label: "Supported",
        color: "text-evidence",
        bg: "bg-evidence-faint",
        border: "border-evidence-dim",
        dot: "bg-evidence",
      };
    case "actor-claim":
      return {
        label: "Actor claim",
        color: "text-claim",
        bg: "bg-claim-faint",
        border: "border-claim-dim",
        dot: "bg-claim",
      };
    case "community-claim":
      return {
        label: "Community claim",
        color: "text-ink-secondary",
        bg: "bg-bg-elevated",
        border: "border-line-strong",
        dot: "bg-ink-muted",
      };
    case "disputed":
      return {
        label: "Disputed",
        color: "text-assess",
        bg: "bg-assess-faint",
        border: "border-assess-dim",
        dot: "bg-assess",
      };
    case "retracted":
      return {
        label: "Retracted",
        color: "text-crit",
        bg: "bg-crit-faint",
        border: "border-crit-dim",
        dot: "bg-crit",
        strike: true,
      };
    case "false":
      return {
        label: "False",
        color: "text-crit",
        bg: "bg-crit-faint",
        border: "border-crit-dim",
        dot: "bg-crit",
        strike: true,
      };
    case "unknown":
      return {
        label: "Unknown",
        color: "text-ink-muted",
        bg: "bg-hatch-muted",
        border: "border-line border-dashed",
        dot: "bg-ink-faint",
      };
  }
}

export function claimStatusToken(s: ClaimStatus): Token {
  switch (s) {
    case "supported":
      return {
        label: "Supported",
        color: "text-evidence",
        bg: "bg-evidence-faint",
        border: "border-evidence-dim",
        dot: "bg-evidence",
      };
    case "probable":
      return {
        label: "Probable",
        color: "text-evidence",
        bg: "bg-evidence-faint/50",
        border: "border-evidence-dim/60",
        dot: "bg-evidence-dim",
      };
    case "unresolved":
      return {
        label: "Unresolved",
        color: "text-ink-secondary",
        bg: "bg-hatch-muted",
        border: "border-line-strong border-dashed",
        dot: "bg-ink-muted",
      };
    case "actor-claim":
      return {
        label: "Actor claim",
        color: "text-claim",
        bg: "bg-claim-faint",
        border: "border-claim-dim",
        dot: "bg-claim",
      };
    case "speculation":
      return {
        label: "Speculation",
        color: "text-ink-muted",
        bg: "bg-bg-elevated",
        border: "border-line",
        dot: "bg-ink-faint",
      };
    case "disputed":
      return {
        label: "Disputed",
        color: "text-assess",
        bg: "bg-assess-faint",
        border: "border-assess-dim",
        dot: "bg-assess",
      };
    case "retracted":
      return {
        label: "Retracted",
        color: "text-crit",
        bg: "bg-crit-faint",
        border: "border-crit-dim",
        dot: "bg-crit",
        strike: true,
      };
    case "false":
      return {
        label: "False",
        color: "text-crit",
        bg: "bg-crit-faint",
        border: "border-crit-dim",
        dot: "bg-crit",
        strike: true,
      };
  }
}

export function narrativeToken(c: NarrativeConfidence): Token {
  switch (c) {
    case "verified":
      return confidenceToken("verified");
    case "unverified":
      return {
        label: "Unverified",
        color: "text-claim",
        bg: "bg-claim-faint",
        border: "border-claim-dim",
        dot: "bg-claim",
      };
    case "disputed":
      return statusToken("disputed");
    case "retracted":
      return statusToken("retracted");
  }
}

export function exposureToken(s: ExposureStatus): Token {
  switch (s) {
    case "publicly-demonstrated":
      return {
        label: "Publicly demonstrated",
        color: "text-crit",
        bg: "bg-crit-faint",
        border: "border-crit-dim",
        dot: "bg-crit",
      };
    case "partially-exposed":
      return {
        label: "Partially exposed",
        color: "text-assess",
        bg: "bg-assess-faint",
        border: "border-assess-dim",
        dot: "bg-assess",
      };
    case "possible":
      return {
        label: "Possible",
        color: "text-ink-secondary",
        bg: "bg-bg-elevated",
        border: "border-line-strong",
        dot: "bg-ink-muted",
      };
    case "no-public-evidence":
      return {
        label: "No public evidence",
        color: "text-evidence",
        bg: "bg-evidence-faint/50",
        border: "border-evidence-dim/60",
        dot: "bg-evidence-dim",
      };
    case "unknown":
      return {
        label: "Unknown",
        color: "text-ink-muted",
        bg: "bg-hatch-muted",
        border: "border-line border-dashed",
        dot: "bg-ink-faint",
      };
  }
}

export function categoryToken(c: EventCategory): { label: string; color: string; dot: string } {
  switch (c) {
    case "leak":
      return { label: "Leak", color: "text-claim", dot: "bg-claim" };
    case "actor-statement":
      return { label: "Actor statement", color: "text-claim", dot: "bg-claim" };
    case "cryptocurrency":
      return { label: "Cryptocurrency", color: "text-claim", dot: "bg-claim-dim" };
    case "legal":
      return { label: "Legal", color: "text-info", dot: "bg-info" };
    case "take-two":
      return { label: "Take-Two", color: "text-info", dot: "bg-info" };
    case "rockstar":
      return { label: "Rockstar", color: "text-evidence", dot: "bg-evidence" };
    case "microsoft":
      return { label: "Microsoft", color: "text-info", dot: "bg-info-dim" };
    case "discord":
      return { label: "Discord", color: "text-info", dot: "bg-info-dim" };
    case "platform":
      return { label: "Platform", color: "text-info", dot: "bg-info-dim" };
    case "media":
      return { label: "Media", color: "text-ink-secondary", dot: "bg-ink-muted" };
    case "community":
      return { label: "Community", color: "text-ink-secondary", dot: "bg-ink-faint" };
    case "misinformation":
      return { label: "Misinformation", color: "text-crit", dot: "bg-crit" };
    case "correction":
      return { label: "Correction", color: "text-assess", dot: "bg-assess" };
    case "investigation":
      return { label: "Investigation", color: "text-assess", dot: "bg-assess-dim" };
  }
}

export function tierLabel(t: SourceTier): string {
  switch (t) {
    case 1:
      return "Court / legal record";
    case 2:
      return "Rockstar statement";
    case 3:
      return "Take-Two statement";
    case 4:
      return "Platform statement";
    case 5:
      return "Actor statement";
    case 6:
      return "Investigative journalism";
    case 7:
      return "Gaming journalism";
    case 8:
      return "Security research";
    case 9:
      return "Blockchain data";
    case 10:
      return "Community research";
    case 11:
      return "Social / forum post";
  }
}

export const buildInfo = {
  name: "LEEK",
  version: "0.2.0",
  build: "2026-08-27",
  classification: "TLP:CLEAR",
  programLine: "Live Evidence & Exposure Knowledge",
};
