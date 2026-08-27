/**
 * LEEK intelligence model.
 *
 * Every record in /data is one of the types below. IDs follow the case-file
 * convention LEEK-<KIND>-<NNN>:
 *
 *   LEEK-SRC  source (citation)
 *   LEEK-EVT  timeline event
 *   LEEK-EVD  evidence record
 *   LEEK-CLM  claim
 *   LEEK-DRP  reported release ("drop")
 *   LEEK-HYP  initial-access hypothesis
 *   LEEK-MED  media / community record
 *   LEEK-NAR  narrative cluster
 *   LEEK-REC  defensive recommendation
 *   LEEK-CHK  known future checkpoint
 *   LEEK-GRF  campaign-graph node
 *
 * The confidence and status vocabularies are deliberately small. They are
 * enforced by `npm run intel:validate`.
 */

/** How strongly the public record supports the object. */
export type Confidence = "verified" | "high" | "moderate" | "low" | "unknown";

/** What kind of thing the object is, epistemically. */
export type AssessmentStatus =
  | "supported"
  | "actor-claim"
  | "community-claim"
  | "disputed"
  | "retracted"
  | "false"
  | "unknown";

/** Claim-registry vocabulary (section 11 of the brief). */
export type ClaimStatus =
  | "supported"
  | "probable"
  | "unresolved"
  | "actor-claim"
  | "speculation"
  | "disputed"
  | "retracted"
  | "false";

export interface IntelligenceObject {
  id: string;
  title: string;
  summary: string;
  /** ISO date (YYYY-MM-DD) or datetime the underlying event occurred. */
  eventDate?: string;
  firstObserved?: string;
  lastUpdated: string;
  confidence: Confidence;
  status: AssessmentStatus;
  supportingSourceIds: string[];
  contradictingSourceIds?: string[];
  analystAssessment?: string;
}

/* ------------------------------------------------------------------ */
/* Sources                                                             */
/* ------------------------------------------------------------------ */

/**
 * Source priority tiers (section 21 of the brief). Lower is stronger.
 *  1 court filings / legal documents
 *  2 Rockstar statements
 *  3 Take-Two statements / filings
 *  4 Microsoft / Discord / platform statements
 *  5 CyberLeek's own public statements (actor claims only)
 *  6 high-quality investigative journalism
 *  7 established gaming journalism
 *  8 cybersecurity researchers
 *  9 public blockchain data
 * 10 community research
 * 11 Reddit / forums / social posts
 */
export type SourceTier = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type SourceType =
  | "court-filing"
  | "rockstar-statement"
  | "take-two-statement"
  | "platform-statement"
  | "actor-statement"
  | "investigative-journalism"
  | "gaming-journalism"
  | "tech-journalism"
  | "financial-press"
  | "security-research"
  | "blockchain-data"
  | "community-research"
  | "social-post"
  | "reference";

export type SourceStatus =
  | "active"
  | "removed"
  | "corrected"
  | "retracted"
  | "superseded";

export interface Source {
  id: string;
  publisher: string;
  author?: string;
  title: string;
  url: string;
  /** Date the source was published (ISO). */
  publishedDate: string;
  /** Date of the event the source describes, where different. */
  eventDate?: string;
  retrievedDate: string;
  primary: boolean;
  tier: SourceTier;
  type: SourceType;
  reliabilityNotes: string;
  claimsSupported?: string[];
  claimsContradicted?: string[];
  status: SourceStatus;
  archiveUrl?: string;
  /** Short verbatim excerpt that carries the load-bearing fact. */
  excerpt?: string;
}

/* ------------------------------------------------------------------ */
/* Events                                                              */
/* ------------------------------------------------------------------ */

export type EventCategory =
  | "leak"
  | "actor-statement"
  | "media"
  | "legal"
  | "rockstar"
  | "take-two"
  | "microsoft"
  | "discord"
  | "platform"
  | "community"
  | "cryptocurrency"
  | "misinformation"
  | "correction"
  | "investigation";

export type EvidenceType =
  | "corporate-statement"
  | "court-filing"
  | "journalism"
  | "actor-publication"
  | "screenshot"
  | "video-description"
  | "social-post"
  | "community-analysis"
  | "blockchain-data"
  | "infrastructure-observation"
  | "correction";

export type DatePrecision = "exact" | "day" | "approximate";

export interface TimelineEvent extends IntelligenceObject {
  category: EventCategory;
  /** When the event occurred. Never the article date. */
  occurredAt: string;
  occurredPrecision: DatePrecision;
  /** When the earliest cited source published, if it differs. */
  reportedAt?: string;
  affectedEntities: string[];
  evidenceTypes: EvidenceType[];
  /** What changed in the case because of this event. */
  whatChanged: string;
  relatedClaimIds?: string[];
  relatedDropIds?: string[];
  relatedEvidenceIds?: string[];
}

/* ------------------------------------------------------------------ */
/* Evidence ledger                                                     */
/* ------------------------------------------------------------------ */

export type Reliability = "A" | "B" | "C" | "D" | "E";

export interface EvidenceRecord {
  id: string;
  title: string;
  date: string;
  sourceId: string;
  sourceType: SourceType;
  evidenceType: EvidenceType;
  /** Claim IDs this record bears on. */
  claimsSupported: string[];
  reliability: Reliability;
  confidence: Confidence;
  corroboratingSourceIds: string[];
  contradictionStatus: "uncontradicted" | "partially-contradicted" | "contradicted";
  analystNote: string;
  archivedUrl?: string;
  dateIngested: string;
  dateLastChecked: string;
}

/* ------------------------------------------------------------------ */
/* Claims                                                              */
/* ------------------------------------------------------------------ */

export type ClaimCategory =
  | "possession"
  | "access"
  | "identity"
  | "motivation"
  | "dead-mans-switch"
  | "legal"
  | "impact"
  | "cryptocurrency"
  | "misinformation";

export interface ClaimHistoryEntry {
  date: string;
  status: ClaimStatus;
  note: string;
}

export interface Claim {
  id: string;
  statement: string;
  category: ClaimCategory;
  status: ClaimStatus;
  confidence: Confidence;
  /** Who originated the claim. */
  origin: "actor" | "community" | "media" | "official" | "analyst";
  /** The "why" behind the status. */
  rationale: string;
  supportingSourceIds: string[];
  contradictingSourceIds: string[];
  evidenceIds: string[];
  /** Full status history. Retracted claims keep every prior state. */
  history: ClaimHistoryEntry[];
  relatedClaimIds?: string[];
  lastUpdated: string;
}

/* ------------------------------------------------------------------ */
/* Drops                                                               */
/* ------------------------------------------------------------------ */

export type MediaType =
  | "video"
  | "video-set"
  | "screenshot"
  | "map-image"
  | "text"
  | "poll"
  | "audio";

export interface Drop {
  id: string;
  /** Date the material appeared publicly. */
  date: string;
  datePrecision: DatePrecision;
  reportedTitle: string;
  mediaType: MediaType;
  description: string;
  reveals: string[];
  securityRelevance: string;
  developmentRelevance: string;
  marketingRelevance: string;
  authenticity: Confidence;
  authenticityNote: string;
  sourceIds: string[];
  takedown: {
    status: "removed" | "partially-removed" | "circulating" | "unknown";
    note?: string;
  };
  relatedClaimIds: string[];
  /** Watermark or caption text reported on the material, if any. */
  watermark?: string;
}

/* ------------------------------------------------------------------ */
/* Initial-access hypotheses                                           */
/* ------------------------------------------------------------------ */

export interface Hypothesis {
  id: string;
  title: string;
  /** Where the hypothesis came from. Analyst hypotheses are labelled as such. */
  origin: "credible-reporting" | "community" | "actor" | "analyst";
  summary: string;
  supportingEvidence: string[];
  contradictingEvidence: string[];
  confidence: Confidence;
  whatWouldConfirm: string;
  sourceIds: string[];
  /** MITRE ATT&CK technique IDs, only where a documented behaviour supports them. */
  attack?: string[];
}

/* ------------------------------------------------------------------ */
/* Impact & exposure                                                   */
/* ------------------------------------------------------------------ */

export type ExposureStatus =
  | "no-public-evidence"
  | "possible"
  | "partially-exposed"
  | "publicly-demonstrated"
  | "unknown";

export interface ExposureDimension {
  key: string;
  label: string;
  status: ExposureStatus;
  rationale: string;
  sourceIds: string[];
}

export interface ImpactItem {
  title: string;
  body: string;
  kind: "observed" | "potential";
  sourceIds: string[];
}

export interface ImpactSection {
  key: string;
  title: string;
  intro: string;
  items: ImpactItem[];
}

/* ------------------------------------------------------------------ */
/* Media intelligence                                                  */
/* ------------------------------------------------------------------ */

export type MediaChannel =
  | "mainstream"
  | "gaming"
  | "tech"
  | "cybersecurity"
  | "financial"
  | "youtube"
  | "reddit"
  | "x"
  | "tiktok"
  | "discord"
  | "forum";

export interface MediaRecord {
  id: string;
  outlet: string;
  channel: MediaChannel;
  title: string;
  url: string;
  publishedAt: string;
  author?: string;
  narrativeIds: string[];
  framing: string;
  sourceId?: string;
}

export type NarrativeConfidence =
  | "verified"
  | "unverified"
  | "disputed"
  | "retracted";

export interface Narrative {
  id: string;
  label: string;
  description: string;
  underlyingClaimId: string;
  confidence: NarrativeConfidence;
  firstSeen: string;
  carriers: string[];
  sourceIds: string[];
}

export type PropagationKind =
  | "origin"
  | "amplification"
  | "media"
  | "influencer"
  | "community"
  | "challenge"
  | "correction"
  | "assessment";

export interface PropagationStep {
  step: number;
  kind: PropagationKind;
  label: string;
  date?: string;
  description: string;
  sourceIds: string[];
}

/* ------------------------------------------------------------------ */
/* Recommendations & checkpoints                                       */
/* ------------------------------------------------------------------ */

export type Horizon = "immediate" | "near-term" | "strategic";

export interface Recommendation {
  id: string;
  horizon: Horizon;
  title: string;
  action: string;
  whyThisCase: string;
  relatedIds: string[];
}

export interface Checkpoint {
  id: string;
  date: string;
  datePrecision: DatePrecision;
  label: string;
  kind: "legal" | "platform" | "marketing" | "release" | "actor" | "investigation";
  description: string;
  confidence: Confidence;
  sourceIds: string[];
}

/* ------------------------------------------------------------------ */
/* Campaign graph                                                      */
/* ------------------------------------------------------------------ */

export type GraphNodeKind =
  | "unknown"
  | "access"
  | "material"
  | "identity"
  | "campaign"
  | "drop"
  | "intel"
  | "manifesto"
  | "token"
  | "distribution"
  | "media"
  | "legal"
  | "platform"
  | "response"
  | "frontier";

export interface GraphNode {
  id: string;
  label: string;
  kind: GraphNodeKind;
  /** The intelligence object (event or claim) this node opens. */
  intelId: string;
  confidence: Confidence;
  status: AssessmentStatus;
  /** Competing explanations shown in the drawer. */
  competingExplanations?: string[];
  relatedNodeIds?: string[];
}

export type EdgeRelation =
  | "precedes"
  | "enables"
  | "produces"
  | "triggers"
  | "responds-to"
  | "unknown-link";

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relation: EdgeRelation;
  label: string;
  confidence: Confidence;
  /** Every edge carries provenance. */
  sourceIds: string[];
}

/* ------------------------------------------------------------------ */
/* Actor                                                               */
/* ------------------------------------------------------------------ */

export interface ActorChannel {
  platform: string;
  identifier: string;
  status: "active" | "suspended" | "removed" | "unknown";
  firstSeen?: string;
  note: string;
  sourceIds: string[];
}

export interface ActorStatement {
  date: string;
  medium: string;
  summary: string;
  quote?: string;
  sourceIds: string[];
}

export interface AttributionTheory {
  id: string;
  theory: string;
  origin: "community" | "media" | "actor" | "official";
  evidence: string;
  confidence: Confidence;
  status: ClaimStatus;
  sourceIds: string[];
}

export interface ActorDossier {
  alias: string;
  aliasVariants: string[];
  firstObserved: string;
  firstObservedNote: string;
  summary: string;
  channels: ActorChannel[];
  statements: ActorStatement[];
  ideology: { summary: string; sourceIds: string[] };
  demands: { text: string; sourceIds: string[] }[];
  cryptocurrency: { summary: string; sourceIds: string[] };
  languageIndicators: { observation: string; confidence: Confidence; sourceIds: string[] }[];
  infrastructure: { observation: string; confidence: Confidence; sourceIds: string[] }[];
  historicalAliasReferences: { note: string; confidence: Confidence; sourceIds: string[] }[];
  attributionTheories: AttributionTheory[];
  lastUpdated: string;
}

/* ------------------------------------------------------------------ */
/* Legal tracker                                                       */
/* ------------------------------------------------------------------ */

export type LegalActionKind =
  | "dmca-takedown"
  | "dmca-subpoena"
  | "court-order"
  | "platform-response"
  | "criminal-investigation"
  | "civil-litigation";

export interface LegalAction {
  id: string;
  date: string;
  datePrecision: DatePrecision;
  title: string;
  kind: LegalActionKind;
  court?: string;
  caseNumber?: string;
  judge?: string;
  parties: string[];
  /** Short plain-language status, e.g. "subpoena issued 2026-08-21; compliance sought by 2026-09-04". */
  status: string;
  summary: string;
  /** Next known date attached to this action, if any. */
  nextDate?: string;
  confidence: Confidence;
  sourceIds: string[];
}

/* ------------------------------------------------------------------ */
/* Propagation chains (dead man's switch case study, media reaction)   */
/* ------------------------------------------------------------------ */

export interface PropagationChain {
  id: string;
  title: string;
  summary: string;
  steps: PropagationStep[];
  /** Where the record stands today, written as analyst assessment. */
  assessment: string;
  assessmentConfidence: Confidence;
  claimIds: string[];
  lastUpdated: string;
}

/* ------------------------------------------------------------------ */
/* Generated (pipeline) types                                          */
/* ------------------------------------------------------------------ */

export interface DiscoveredSource {
  id: string;
  url: string;
  title: string;
  publisher: string;
  publishedAt?: string;
  discoveredAt: string;
  feed: string;
  query: string;
  suggestedTier?: SourceTier;
  reviewStatus: "needs-analyst-review" | "classified" | "promoted" | "dismissed";
  classification?: {
    entities: string[];
    claims: string[];
    category?: EventCategory;
    corroboratedBySourceIds?: string[];
    matchedEventId?: string;
    suggestedStatus?: AssessmentStatus;
    model?: string;
  };
}

export interface PendingEvent {
  id: string;
  title: string;
  occurredAt?: string;
  reportedAt: string;
  category?: EventCategory;
  sourceUrls: string[];
  suggestedStatus: AssessmentStatus;
  reviewStatus: "needs-analyst-review" | "promoted" | "dismissed";
  note: string;
}

export interface LastSync {
  ranAt: string;
  feeds: { name: string; ok: boolean; items: number; error?: string }[];
  discovered: number;
  newSinceLastRun: number;
  pending: number;
  analysisMode: "ai" | "rules-only";
}
