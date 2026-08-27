/**
 * Derived intelligence helpers.
 *
 * Nothing in here is authored. Every value is computed from the typed records
 * under /data so the UI, the validator, and the report script all agree.
 */
import { events } from "@/data/events";
import { claims } from "@/data/claims";
import { sources } from "@/data/sources";
import { evidence } from "@/data/evidence";
import { drops } from "@/data/drops";
import { checkpoints } from "@/data/checkpoints";
import { hypotheses } from "@/data/hypotheses";
import { mediaRecords, narratives } from "@/data/media";
import { exposureSurface, legalActions } from "@/data/impact";
import { recommendations } from "@/data/recommendations";
import type {
  Checkpoint,
  Claim,
  ClaimStatus,
  Confidence,
  Drop,
  EvidenceRecord,
  ExposureDimension,
  Source,
  TimelineEvent,
} from "@/data/types";

/* ------------------------------------------------------------------ */
/* Ordering                                                            */
/* ------------------------------------------------------------------ */

export function byDateAsc<T>(pick: (t: T) => string) {
  return (a: T, b: T) => pick(a).localeCompare(pick(b));
}
export function byDateDesc<T>(pick: (t: T) => string) {
  return (a: T, b: T) => pick(b).localeCompare(pick(a));
}

export const eventsChronological: TimelineEvent[] = [...events].sort(
  byDateAsc((e) => e.occurredAt)
);
export const eventsNewestFirst: TimelineEvent[] = [...eventsChronological].reverse();

/* ------------------------------------------------------------------ */
/* Cross references                                                    */
/* ------------------------------------------------------------------ */

export function claimsSupportedBySource(sourceId: string): Claim[] {
  return claims.filter((c) => c.supportingSourceIds.includes(sourceId));
}

export function claimsContradictedBySource(sourceId: string): Claim[] {
  return claims.filter((c) => c.contradictingSourceIds.includes(sourceId));
}

export function eventsCitingSource(sourceId: string): TimelineEvent[] {
  return eventsChronological.filter(
    (e) =>
      e.supportingSourceIds.includes(sourceId) ||
      (e.contradictingSourceIds ?? []).includes(sourceId)
  );
}

export function evidenceForClaim(claimId: string): EvidenceRecord[] {
  return evidence.filter((v) => v.claimsSupported.includes(claimId));
}

export function eventsForClaim(claimId: string): TimelineEvent[] {
  return eventsChronological.filter((e) =>
    (e.relatedClaimIds ?? []).includes(claimId)
  );
}

export function dropsForClaim(claimId: string): Drop[] {
  return drops.filter((d) => d.relatedClaimIds.includes(claimId));
}

export function sourcesFor(ids: string[] | undefined): Source[] {
  if (!ids) return [];
  const byId = new Map(sources.map((s) => [s.id, s]));
  return ids.map((id) => byId.get(id)).filter((s): s is Source => Boolean(s));
}

/* ------------------------------------------------------------------ */
/* Case statistics                                                     */
/* ------------------------------------------------------------------ */

const claimStatuses: ClaimStatus[] = [
  "supported",
  "probable",
  "unresolved",
  "actor-claim",
  "speculation",
  "disputed",
  "retracted",
  "false",
];

export const claimCounts: Record<ClaimStatus, number> = Object.fromEntries(
  claimStatuses.map((s) => [s, claims.filter((c) => c.status === s).length])
) as Record<ClaimStatus, number>;

const confidences: Confidence[] = ["verified", "high", "moderate", "low", "unknown"];

export const eventConfidenceCounts: Record<Confidence, number> = Object.fromEntries(
  confidences.map((c) => [c, events.filter((e) => e.confidence === c).length])
) as Record<Confidence, number>;

export const stats = {
  sources: sources.length,
  primarySources: sources.filter((s) => s.primary).length,
  events: events.length,
  verifiedEvents: events.filter((e) => e.confidence === "verified").length,
  claims: claims.length,
  actorClaims: claimCounts["actor-claim"],
  disputedClaims: claimCounts.disputed,
  retractedClaims: claimCounts.retracted,
  falseClaims: claimCounts.false,
  supportedClaims: claimCounts.supported,
  unresolvedClaims: claimCounts.unresolved,
  evidence: evidence.length,
  drops: drops.length,
  hypotheses: hypotheses.length,
  mediaRecords: mediaRecords.length,
  narratives: narratives.length,
  recommendations: recommendations.length,
  legalActions: legalActions.length,
  correctionEvents: events.filter((e) => e.category === "correction").length,
};

/* ------------------------------------------------------------------ */
/* Frontier                                                            */
/* ------------------------------------------------------------------ */

/** The most recent event the record supports at "verified" confidence. */
export const latestVerifiedEvent: TimelineEvent | undefined = eventsNewestFirst.find(
  (e) => e.confidence === "verified"
);

/** The most recent event of any confidence, used for "latest reported". */
export const latestEvent: TimelineEvent | undefined = eventsNewestFirst[0];

export function upcomingCheckpoints(today: string): Checkpoint[] {
  return [...checkpoints]
    .filter((c) => c.date.slice(0, 10) >= today)
    .sort(byDateAsc((c) => c.date));
}

export function pastCheckpoints(today: string): Checkpoint[] {
  return [...checkpoints]
    .filter((c) => c.date.slice(0, 10) < today)
    .sort(byDateDesc((c) => c.date));
}

export const exposedDimensions: ExposureDimension[] = exposureSurface.filter(
  (d) => d.status === "publicly-demonstrated" || d.status === "partially-exposed"
);

/** Retracted or false claims, for the command view. */
export const retractions: Claim[] = claims.filter(
  (c) => c.status === "retracted" || c.status === "false"
);

export const openQuestions: Claim[] = claims.filter(
  (c) => c.status === "unresolved" || c.status === "disputed"
);
