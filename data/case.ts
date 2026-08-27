/**
 * Case-level analyst content for the command view and the README.
 *
 * Everything here is written by the analyst and cites the source registry.
 * Counts and "latest" values are derived in lib/intel.ts, not typed here.
 */
import lastSync from "./generated/last-sync.json";
import { events } from "./events";

const verifiedDates = events
  .filter((e) => e.confidence === "verified")
  .map((e) => e.occurredAt)
  .sort();

export const caseStatus = {
  name: "CyberLeek / Grand Theft Auto VI",
  shortName: "CYBERLEEK / GTA VI",
  status: "active" as const,
  statusLabel: "Active intelligence case",
  /** First public CyberLeek material. Earlier infrastructure dates are community claims. */
  firstObserved: "2026-08-18",
  firstObservedNote:
    "First public gameplay clips and map images. Community forensic timelines place domain registration around 2026-08-14 and a dark-web post on 2026-08-17; those are community claims, not verified events.",
  initialAccess: "unknown" as const,
  attribution: "unresolved" as const,
  latestSync: lastSync.ranAt,
  latestVerifiedEventDate: verifiedDates[verifiedDates.length - 1] ?? "2026-08-18",
  classification: "TLP:CLEAR",
};

export interface CasePoint {
  text: string;
  sourceIds: string[];
}

export const currentAssessment: CasePoint[] = [
  {
    text: "Since 2026-08-18 an unidentified person or group using the name CyberLeek has published short gameplay clips, stitched map images, and, from 2026-08-26, prologue story footage from an unreleased Grand Theft Auto VI build. Take-Two has treated the material as its copyrighted work, issuing takedowns and obtaining court-issued DMCA subpoenas, and Rockstar acknowledged the leaked gameplay videos in a statement on 2026-08-26. The public record supports the assessment that CyberLeek had interactive control of a development build at least as recent as 2025.",
    sourceIds: ["LEEK-SRC-026", "LEEK-SRC-022", "LEEK-SRC-001", "LEEK-SRC-003", "LEEK-SRC-007", "LEEK-SRC-021"],
  },
  {
    text: "How that build was obtained is not established anywhere in the public record. No court filing, company statement, or credible report explains the initial access, and LEEK does not fill that gap with a hypothetical chain. Attribution is likewise unresolved: the only named targets are online handles listed in Take-Two's subpoena petitions and a community forensic theory, none of which is authoritative attribution.",
    sourceIds: ["LEEK-SRC-002", "LEEK-SRC-004", "LEEK-SRC-028", "LEEK-SRC-094"],
  },
  {
    text: "The campaign has a pronounced information component: a consumer-rights manifesto, a Solana token used to vote on the next release, ultimatums to Rockstar, and a media cycle that at one point carried a dead man's switch story that its original outlets later withdrew. Separating what CyberLeek did from what was said about CyberLeek is the main analytic task of this case file.",
    sourceIds: ["LEEK-SRC-016", "LEEK-SRC-044", "LEEK-SRC-054", "LEEK-SRC-011"],
  },
];

export const whatWeKnow: CasePoint[] = [
  {
    text: "CyberLeek published GTA VI gameplay clips and map images beginning 2026-08-18, with new material on most days through 2026-08-26.",
    sourceIds: ["LEEK-SRC-026", "LEEK-SRC-045", "LEEK-SRC-017"],
  },
  {
    text: "A clip released on 2026-08-20 ends with the player shooting the word LEEK into a wall, which requires someone controlling a running build rather than replaying captured video.",
    sourceIds: ["LEEK-SRC-022", "LEEK-SRC-025", "LEEK-SRC-016"],
  },
  {
    text: "Take-Two filed four DMCA subpoena petitions in the Southern District of New York on 2026-08-20 and 2026-08-21, directed at Microsoft (GitHub), Discord, Google (YouTube), and X Corp. Judges issued the Microsoft and Discord subpoenas on 2026-08-21; the Google petition drew a request for more information on 2026-08-24.",
    sourceIds: ["LEEK-SRC-001", "LEEK-SRC-003", "LEEK-SRC-005", "LEEK-SRC-006"],
  },
  {
    text: "Rockstar posted a statement on 2026-08-26 describing the gameplay leaks as heartbreaking for its team. It did not address the actor's demands.",
    sourceIds: ["LEEK-SRC-007", "LEEK-SRC-101", "LEEK-SRC-108"],
  },
  {
    text: "CyberLeek published a manifesto against digital pre-orders and paid single-player unlocks, launched a Solana token, and used token votes to pick the next clip. Stop Killing Games rejected the tactics on 2026-08-19.",
    sourceIds: ["LEEK-SRC-016", "LEEK-SRC-026", "LEEK-SRC-011"],
  },
  {
    text: "Reports that CyberLeek had a dead man's switch and would release the full build if arrested were withdrawn by their original outlets on 2026-08-23.",
    sourceIds: ["LEEK-SRC-044", "LEEK-SRC-054", "LEEK-SRC-080"],
  },
  {
    text: "In the early hours of 2026-08-27, wallets tied to the token creator moved out roughly $250,000 to $270,000 and $CYBERLEEK fell about 86 percent from its peak. Whether that ends the campaign is not established.",
    sourceIds: ["LEEK-SRC-110", "LEEK-SRC-111", "LEEK-SRC-112"],
  },
];

export const whatWeDoNotKnow: { text: string; note: string }[] = [
  {
    text: "Actor identity",
    note: "No authoritative attribution exists. Handles named in subpoena petitions are targets of discovery, not findings.",
  },
  {
    text: "Precise initial access mechanism",
    note: "No filing, statement, or credible report explains how the build was obtained. LEEK records this as UNKNOWN.",
  },
  {
    text: "Whether build access remains active",
    note: "New clips through 2026-08-26 show continued possession of material; they do not show whether any live access persists.",
  },
  {
    text: "Exact volume of material possessed",
    note: "Only what has been published is known. Claims of a complete game are actor claims.",
  },
  {
    text: "Whether additional unreleased material exists",
    note: "The actor has promised more; promises are not evidence.",
  },
  {
    text: "Provenance of every circulated clip",
    note: "Reuploads, edits, AI fakes, and a separate map leaker complicate attribution of individual clips to CyberLeek.",
  },
];

export const frontierNotes: CasePoint[] = [
  {
    text: "The furthest point the public record supports: CyberLeek still possessed and was publishing new material from a GTA VI development build on 2026-08-26, including prologue story footage; in the early hours of 2026-08-27 the token creator's wallets withdrew most of the proceeds; and Take-Two's identification effort is in the court-ordered discovery stage with platform responses pending. Nothing in the record says the material is exhausted.",
    sourceIds: ["LEEK-SRC-021", "LEEK-SRC-007", "LEEK-SRC-110", "LEEK-SRC-111", "LEEK-SRC-001", "LEEK-SRC-003", "LEEK-SRC-086"],
  },
];
