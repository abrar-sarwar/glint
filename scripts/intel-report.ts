/**
 * Prints the case status block.
 *
 *   npm run intel:report
 */
import { claims } from "../data/claims";
import { checkpoints } from "../data/checkpoints";
import { caseStatus } from "../data/case";
import lastSyncJson from "../data/generated/last-sync.json";
import type { LastSync } from "../data/types";
import discovered from "../data/generated/discovered-sources.json";
import pending from "../data/generated/pending-events.json";
import { stats, latestVerifiedEvent, latestEvent, upcomingCheckpoints } from "../lib/intel";

const lastSync = lastSyncJson as LastSync;
const today = new Date().toISOString().slice(0, 10);
const next = upcomingCheckpoints(today)[0];
const byStatus = (s: string) => claims.filter((c) => c.status === s).length;

const rows: [string, string][] = [
  ["Case", caseStatus.name],
  ["Status", caseStatus.statusLabel],
  ["First observed", caseStatus.firstObserved],
  ["Initial access", caseStatus.initialAccess.toUpperCase()],
  ["Attribution", caseStatus.attribution.toUpperCase()],
  ["", ""],
  ["Sources", String(stats.sources)],
  ["Primary sources", String(stats.primarySources)],
  ["Events", String(stats.events)],
  ["Verified events", String(stats.verifiedEvents)],
  ["Evidence records", String(stats.evidence)],
  ["Drops", String(stats.drops)],
  ["Claims", String(stats.claims)],
  ["  supported", String(byStatus("supported"))],
  ["  probable", String(byStatus("probable"))],
  ["  unresolved", String(byStatus("unresolved"))],
  ["  actor claims", String(byStatus("actor-claim"))],
  ["  speculation", String(byStatus("speculation"))],
  ["  disputed", String(byStatus("disputed"))],
  ["  retracted", String(byStatus("retracted"))],
  ["  false", String(byStatus("false"))],
  ["Hypotheses", String(stats.hypotheses)],
  ["Media records", String(stats.mediaRecords)],
  ["Narratives", String(stats.narratives)],
  ["Legal actions", String(stats.legalActions)],
  ["Recommendations", String(stats.recommendations)],
  ["", ""],
  ["Latest event", latestEvent ? `${latestEvent.occurredAt.slice(0, 10)}  ${latestEvent.title} [${latestEvent.confidence}]` : "none"],
  ["Latest verified", latestVerifiedEvent ? `${latestVerifiedEvent.occurredAt.slice(0, 10)}  ${latestVerifiedEvent.title}` : "none"],
  ["Next checkpoint", next ? `${next.date.slice(0, 10)}  ${next.label}` : `none after ${today} (${checkpoints.length} on record)`],
  ["Last sync", `${lastSync.ranAt}  (${lastSync.analysisMode}, ${lastSync.feeds.length} feeds)`],
  ["Discovered sources", `${discovered.length} total, ${pending.length} pending events`],
  ["Current frontier", latestVerifiedEvent ? `public record stops at ${latestVerifiedEvent.occurredAt.slice(0, 10)}; identity and initial access unresolved` : "unknown"],
];

console.log("\nLEEK INTELLIGENCE STATUS\n");
for (const [k, v] of rows) console.log(k ? `${k.padEnd(22)} ${v}` : "");
console.log("");
