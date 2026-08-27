/**
 * LEEK intelligence-integrity validator.
 *
 *   npm run intel:validate
 *
 * Fails (exit 1) on any violation of the evidence rules the case file
 * promises: every fact cites a source, every id resolves, retractions keep
 * their history, the graph is grounded, and no GLINT-era content survives.
 * The same checks run under vitest (tests/integrity.test.ts).
 */
import fs from "node:fs";
import path from "node:path";
import { events } from "../data/events";
import { claims } from "../data/claims";
import { sources } from "../data/sources";
import { evidence } from "../data/evidence";
import { drops } from "../data/drops";
import { hypotheses } from "../data/hypotheses";
import { checkpoints } from "../data/checkpoints";
import { actor } from "../data/actor";
import { mediaRecords, narratives, deadMansSwitch, mediaReactionChain } from "../data/media";
import { impactSections, exposureSurface, legalActions, financialFigures } from "../data/impact";
import { recommendations } from "../data/recommendations";
import { graphNodes, graphEdges } from "../data/graph";
import { currentAssessment, whatWeKnow, frontierNotes } from "../data/case";
import type { ClaimStatus, Confidence, AssessmentStatus } from "../data/types";

export interface Failure {
  check: string;
  detail: string;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?(\.\d+)?Z)?$/;
const CLAIM_STATUSES: ClaimStatus[] = ["supported", "probable", "unresolved", "actor-claim", "speculation", "disputed", "retracted", "false"];
const CONFIDENCES: Confidence[] = ["verified", "high", "moderate", "low", "unknown"];
const ASSESSMENT_STATUSES: AssessmentStatus[] = ["supported", "actor-claim", "community-claim", "disputed", "retracted", "false", "unknown"];

const ROOT = path.resolve(__dirname, "..");

function normalizeUrl(u: string): string {
  try {
    const url = new URL(u);
    url.hash = "";
    for (const k of Array.from(url.searchParams.keys())) {
      if (k.startsWith("utm_") || k === "s" || k === "ref") url.searchParams.delete(k);
    }
    let s = url.toString().toLowerCase();
    s = s.replace(/^https?:\/\/(www\.)?/, "");
    return s.replace(/\/+$/, "");
  } catch {
    return u.trim().toLowerCase();
  }
}

function walk(dir: string, exts: string[], out: string[] = []): string[] {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".next" || name === ".git") continue;
      walk(p, exts, out);
    } else if (exts.some((e) => name.endsWith(e))) {
      out.push(p);
    }
  }
  return out;
}

export function runChecks(): Failure[] {
  const fail: Failure[] = [];
  const f = (check: string, detail: string) => fail.push({ check, detail });

  const sourceIds = new Set(sources.map((s) => s.id));
  const claimIds = new Set(claims.map((c) => c.id));
  const eventIds = new Set(events.map((e) => e.id));
  const evidenceIds = new Set(evidence.map((v) => v.id));
  const dropIds = new Set(drops.map((d) => d.id));
  const hypothesisIds = new Set(hypotheses.map((h) => h.id));
  const narrativeIds = new Set(narratives.map((n) => n.id));
  const nodeIds = new Set(graphNodes.map((n) => n.id));
  const tierById = new Map(sources.map((s) => [s.id, s.tier]));

  const checkSources = (owner: string, ids: string[] | undefined, required = true) => {
    if (!ids || ids.length === 0) {
      if (required) f("source-required", `${owner} cites no source`);
      return;
    }
    for (const id of ids) if (!sourceIds.has(id)) f("source-resolves", `${owner} cites unknown source ${id}`);
  };
  const checkClaims = (owner: string, ids: string[] | undefined) => {
    for (const id of ids ?? []) if (!claimIds.has(id)) f("claim-resolves", `${owner} references unknown claim ${id}`);
  };
  const checkDate = (owner: string, field: string, value: string | undefined, required = true) => {
    if (value === undefined) {
      if (required) f("date-required", `${owner}.${field} missing`);
      return;
    }
    if (!ISO_DATE.test(value)) f("date-format", `${owner}.${field} is not ISO: ${value}`);
  };

  /* Sources */
  const seenUrl = new Map<string, string>();
  for (const s of sources) {
    if (!/^LEEK-SRC-\d{3}$/.test(s.id)) f("id-format", `source id ${s.id}`);
    checkDate(s.id, "publishedDate", s.publishedDate);
    checkDate(s.id, "retrievedDate", s.retrievedDate);
    if (!s.url.startsWith("http")) f("source-url", `${s.id} has no URL`);
    if (!s.reliabilityNotes || s.reliabilityNotes.length < 20) f("source-reliability", `${s.id} lacks reliability notes`);
    const n = normalizeUrl(s.url);
    if (seenUrl.has(n)) f("source-duplicate", `${s.id} duplicates ${seenUrl.get(n)} (${s.url})`);
    seenUrl.set(n, s.id);
    if (s.tier < 1 || s.tier > 11) f("source-tier", `${s.id} tier ${s.tier}`);
  }

  /* Events */
  let prev = "";
  events.forEach((e, i) => {
    if (!/^LEEK-EVT-\d{3}$/.test(e.id)) f("id-format", `event id ${e.id}`);
    const expected = `LEEK-EVT-${String(i + 1).padStart(3, "0")}`;
    if (e.id !== expected) f("event-sequence", `${e.id} at position ${i + 1}, expected ${expected}`);
    checkDate(e.id, "occurredAt", e.occurredAt);
    checkDate(e.id, "reportedAt", e.reportedAt, false);
    checkDate(e.id, "lastUpdated", e.lastUpdated);
    if (e.occurredAt.slice(0, 10) < prev.slice(0, 10)) f("timeline-order", `${e.id} (${e.occurredAt}) precedes ${prev}`);
    prev = e.occurredAt;
    checkSources(e.id, e.supportingSourceIds);
    checkSources(`${e.id}.contradicting`, e.contradictingSourceIds, false);
    checkClaims(e.id, e.relatedClaimIds);
    for (const d of e.relatedDropIds ?? []) if (!dropIds.has(d)) f("drop-resolves", `${e.id} references unknown drop ${d}`);
    for (const v of e.relatedEvidenceIds ?? []) if (!evidenceIds.has(v)) f("evidence-resolves", `${e.id} references unknown evidence ${v}`);
    if (!CONFIDENCES.includes(e.confidence)) f("vocab", `${e.id} confidence ${e.confidence}`);
    if (!ASSESSMENT_STATUSES.includes(e.status)) f("vocab", `${e.id} status ${e.status}`);
    if (!e.whatChanged) f("event-whatchanged", `${e.id} has no whatChanged`);
    if (e.affectedEntities.length === 0) f("event-entities", `${e.id} has no affected entities`);
    if (e.confidence === "verified") {
      const primary = e.supportingSourceIds.some((id) => (tierById.get(id) ?? 99) <= 4);
      if (!primary && e.supportingSourceIds.length < 2) f("verified-provenance", `${e.id} is verified with a single non-primary source`);
    }
    if (e.status === "supported" && e.confidence === "unknown") f("status-confidence", `${e.id} supported but confidence unknown`);
  });

  /* Claims */
  for (const c of claims) {
    if (!/^LEEK-CLM-\d{3}$/.test(c.id)) f("id-format", `claim id ${c.id}`);
    if (!CLAIM_STATUSES.includes(c.status)) f("vocab", `${c.id} status ${c.status}`);
    if (!CONFIDENCES.includes(c.confidence)) f("vocab", `${c.id} confidence ${c.confidence}`);
    if (!c.rationale || c.rationale.length < 60) f("claim-rationale", `${c.id} rationale too short`);
    if (c.history.length === 0) f("claim-history", `${c.id} has no history`);
    for (const h of c.history) checkDate(`${c.id}.history`, "date", h.date);
    if (c.history[c.history.length - 1]?.status !== c.status) f("claim-history", `${c.id} last history status ${c.history[c.history.length - 1]?.status} != ${c.status}`);
    if (c.status === "retracted") {
      const priorNonRetracted = c.history.slice(0, -1).some((h) => h.status !== "retracted");
      if (!priorNonRetracted) f("retraction-history", `${c.id} is retracted but keeps no prior status`);
      if (c.contradictingSourceIds.length === 0) f("retraction-evidence", `${c.id} retracted without a contradicting source`);
    }
    if (c.status === "supported") {
      const primary = c.supportingSourceIds.some((id) => (tierById.get(id) ?? 99) <= 4);
      if (!primary && c.supportingSourceIds.length < 2) f("supported-provenance", `${c.id} supported without primary or multiple sources`);
      if (c.confidence === "low" || c.confidence === "unknown") f("status-confidence", `${c.id} supported with ${c.confidence} confidence`);
    }
    if (c.status === "false" && c.contradictingSourceIds.length === 0) f("false-evidence", `${c.id} marked false without contradicting source`);
    if (c.status === "speculation" && (c.confidence === "verified" || c.confidence === "high")) f("status-confidence", `${c.id} speculation with ${c.confidence} confidence`);
    if (c.status === "actor-claim" && c.confidence === "verified") f("status-confidence", `${c.id} actor claim marked verified`);
    checkSources(c.id, [...c.supportingSourceIds, ...c.contradictingSourceIds]);
    checkClaims(c.id, c.relatedClaimIds);
    for (const v of c.evidenceIds) if (!evidenceIds.has(v)) f("evidence-resolves", `${c.id} references unknown evidence ${v}`);
    checkDate(c.id, "lastUpdated", c.lastUpdated);
  }

  /* Evidence */
  for (const v of evidence) {
    if (!/^LEEK-EVD-\d{3}$/.test(v.id)) f("id-format", `evidence id ${v.id}`);
    checkSources(v.id, [v.sourceId, ...v.corroboratingSourceIds]);
    checkClaims(v.id, v.claimsSupported);
    if (v.claimsSupported.length === 0) f("evidence-claims", `${v.id} bears on no claim`);
    checkDate(v.id, "date", v.date);
    checkDate(v.id, "dateIngested", v.dateIngested);
    checkDate(v.id, "dateLastChecked", v.dateLastChecked);
    if (!/^[A-E]$/.test(v.reliability)) f("vocab", `${v.id} reliability ${v.reliability}`);
  }

  /* Drops */
  for (const d of drops) {
    if (!/^LEEK-DRP-\d{3}$/.test(d.id)) f("id-format", `drop id ${d.id}`);
    checkDate(d.id, "date", d.date);
    checkSources(d.id, d.sourceIds);
    checkClaims(d.id, d.relatedClaimIds);
    if (!CONFIDENCES.includes(d.authenticity)) f("vocab", `${d.id} authenticity ${d.authenticity}`);
    if (/https?:\/\/(www\.)?(youtube\.com|youtu\.be|x\.com|twitter\.com|t\.me|arweave|mega\.nz|pixeldrain|streamable)/i.test(JSON.stringify(d))) f("leak-links", `${d.id} contains a direct link to circulated material`);
  }

  /* Hypotheses */
  for (const h of hypotheses) {
    if (!/^LEEK-HYP-\d{3}$/.test(h.id)) f("id-format", `hypothesis id ${h.id}`);
    checkSources(h.id, h.sourceIds, h.origin !== "analyst");
    if (!CONFIDENCES.includes(h.confidence)) f("vocab", `${h.id} confidence ${h.confidence}`);
    if (h.confidence === "verified" || h.confidence === "high") {
      const primary = h.sourceIds.some((id) => (tierById.get(id) ?? 99) <= 4);
      if (!primary) f("uncited-attack-chain", `${h.id} asserts ${h.confidence} confidence for an access mechanism without a primary source`);
    }
    if (!h.whatWouldConfirm) f("hypothesis-confirm", `${h.id} has no whatWouldConfirm`);
    for (const t of h.attack ?? []) if (!/^T\d{4}(\.\d{3})?$/.test(t)) f("attack-format", `${h.id} technique ${t}`);
  }

  /* Checkpoints */
  for (const k of checkpoints) {
    if (!/^LEEK-CHK-\d{3}$/.test(k.id)) f("id-format", `checkpoint id ${k.id}`);
    checkDate(k.id, "date", k.date);
    checkSources(k.id, k.sourceIds);
  }

  /* Actor */
  checkDate("actor", "firstObserved", actor.firstObserved);
  checkDate("actor", "lastUpdated", actor.lastUpdated);
  for (const ch of actor.channels) checkSources(`actor.channel:${ch.identifier}`, ch.sourceIds);
  for (const st of actor.statements) {
    checkDate(`actor.statement:${st.date}`, "date", st.date);
    checkSources(`actor.statement:${st.date}`, st.sourceIds);
  }
  checkSources("actor.ideology", actor.ideology.sourceIds);
  for (const d of actor.demands) checkSources(`actor.demand:${d.text.slice(0, 30)}`, d.sourceIds);
  checkSources("actor.cryptocurrency", actor.cryptocurrency.sourceIds);
  for (const x of actor.languageIndicators) checkSources(`actor.language:${x.observation.slice(0, 30)}`, x.sourceIds);
  for (const x of actor.infrastructure) checkSources(`actor.infra:${x.observation.slice(0, 30)}`, x.sourceIds);
  for (const x of actor.historicalAliasReferences) checkSources(`actor.alias:${x.note.slice(0, 30)}`, x.sourceIds);
  for (const t of actor.attributionTheories) {
    checkSources(t.id, t.sourceIds);
    if (!CLAIM_STATUSES.includes(t.status)) f("vocab", `${t.id} status ${t.status}`);
    if (t.status === "supported" || t.confidence === "verified" || t.confidence === "high") f("attribution-overreach", `${t.id} asserts attribution beyond the public record`);
  }

  /* Media */
  const urlToSource = new Map(sources.map((s) => [normalizeUrl(s.url), s.id]));
  for (const m of mediaRecords) {
    if (!/^LEEK-MED-\d{3}$/.test(m.id)) f("id-format", `media id ${m.id}`);
    checkDate(m.id, "publishedAt", m.publishedAt);
    for (const n of m.narrativeIds) if (!narrativeIds.has(n)) f("narrative-resolves", `${m.id} references unknown narrative ${n}`);
    if (m.sourceId) {
      if (!sourceIds.has(m.sourceId)) f("source-resolves", `${m.id} cites unknown source ${m.sourceId}`);
    } else {
      const match = urlToSource.get(normalizeUrl(m.url));
      if (!match) f("media-source", `${m.id} has no registry source for ${m.url}`);
    }
  }
  for (const n of narratives) {
    if (!/^LEEK-NAR-\d{3}$/.test(n.id)) f("id-format", `narrative id ${n.id}`);
    if (!claimIds.has(n.underlyingClaimId)) f("claim-resolves", `${n.id} underlying claim ${n.underlyingClaimId}`);
    checkSources(n.id, n.sourceIds);
    checkDate(n.id, "firstSeen", n.firstSeen);
  }
  for (const chain of [deadMansSwitch, mediaReactionChain]) {
    checkClaims(chain.id, chain.claimIds);
    checkDate(chain.id, "lastUpdated", chain.lastUpdated);
    if (chain.steps.length < 5) f("chain-steps", `${chain.id} has fewer than five steps`);
    chain.steps.forEach((s, i) => {
      if (s.step !== i + 1) f("chain-sequence", `${chain.id} step ${s.step} at position ${i + 1}`);
      checkSources(`${chain.id}.step${s.step}`, s.sourceIds, s.kind !== "assessment");
      checkDate(`${chain.id}.step${s.step}`, "date", s.date, false);
    });
    if (chain.id === "LEEK-CHN-001" && chain.steps[chain.steps.length - 1]?.kind !== "assessment") f("chain-assessment", `${chain.id} does not end in an assessment`);
    if (!chain.assessment || chain.assessment.length < 80) f("chain-assessment", `${chain.id} assessment is missing or too short`);
  }

  /* Impact, exposure, legal, finance, recommendations */
  for (const sec of impactSections) for (const it of sec.items) checkSources(`impact.${sec.key}:${it.title}`, it.sourceIds);
  const expectedDims = ["source-code", "playable-build", "unreleased-gameplay", "narrative", "game-map", "mechanics", "internal-infrastructure", "employee-data", "credentials", "partner-systems", "marketing-plan", "development-timeline"];
  const dimKeys = exposureSurface.map((d) => d.key);
  for (const k of expectedDims) if (!dimKeys.includes(k)) f("exposure-dimension", `missing exposure dimension ${k}`);
  for (const d of exposureSurface) {
    checkSources(`exposure.${d.key}`, d.sourceIds, d.status !== "unknown" && d.status !== "no-public-evidence");
    if (d.status === "publicly-demonstrated" && d.sourceIds.length < 2) f("exposure-provenance", `${d.key} publicly demonstrated with one source`);
  }
  for (const l of legalActions) {
    if (!/^LEEK-LGL-\d{3}$/.test(l.id)) f("id-format", `legal id ${l.id}`);
    checkDate(l.id, "date", l.date);
    checkDate(l.id, "nextDate", l.nextDate, false);
    checkSources(l.id, l.sourceIds);
    if (l.confidence === "verified" && !l.sourceIds.some((id) => (tierById.get(id) ?? 99) <= 4)) f("verified-provenance", `${l.id} verified without a primary source`);
  }
  for (const fig of financialFigures) {
    checkSources(`finance:${fig.label}`, fig.sourceIds);
    checkDate(`finance:${fig.label}`, "date", fig.date);
  }
  for (const r of recommendations) {
    if (!/^LEEK-REC-\d{3}$/.test(r.id)) f("id-format", `recommendation id ${r.id}`);
    if (!r.whyThisCase || r.whyThisCase.length < 40) f("recommendation-why", `${r.id} lacks whyThisCase`);
    for (const id of r.relatedIds) {
      if (!(claimIds.has(id) || sourceIds.has(id) || eventIds.has(id) || hypothesisIds.has(id))) f("related-resolves", `${r.id} references unknown id ${id}`);
    }
  }

  /* Case text */
  for (const p of [...currentAssessment, ...whatWeKnow, ...frontierNotes]) checkSources(`case:${p.text.slice(0, 40)}`, p.sourceIds);

  /* Graph */
  const intelIds = new Set([...eventIds, ...claimIds, ...hypothesisIds]);
  if (graphNodes[0]?.kind !== "unknown") f("graph-unknown-first", "campaign graph must start with the unknown initial-access node");
  if (graphNodes[graphNodes.length - 1]?.kind !== "frontier") f("graph-frontier-last", "campaign graph must end in the current frontier node");
  for (const n of graphNodes) {
    if (!intelIds.has(n.intelId)) f("graph-node-resolves", `${n.id} opens unknown intelligence object ${n.intelId}`);
    for (const r of n.relatedNodeIds ?? []) if (!nodeIds.has(r)) f("graph-node-resolves", `${n.id} relates to unknown node ${r}`);
    if (n.kind === "unknown" && n.status !== "unknown") f("graph-unknown-status", `${n.id} is the unknown node but status is ${n.status}`);
  }
  for (const e of graphEdges) {
    if (!nodeIds.has(e.source) || !nodeIds.has(e.target)) f("graph-edge-resolves", `${e.id} connects unknown nodes`);
    checkSources(e.id, e.sourceIds, e.relation !== "unknown-link");
    if ((e.relation === "enables" || e.relation === "triggers") && e.confidence !== "verified" && e.confidence !== "high") {
      f("graph-causation", `${e.id} claims '${e.relation}' at ${e.confidence} confidence; use precedes or unknown-link`);
    }
  }

  /* README citations resolve */
  const readme = fs.readFileSync(path.join(ROOT, "README.md"), "utf8");
  for (const m of readme.matchAll(/\[S(\d{3})\]/g)) {
    const id = `LEEK-SRC-${m[1]}`;
    if (!sourceIds.has(id)) f("readme-citation", `README cites unknown source ${id}`);
  }

  /* Text hygiene across the product */
  // data/generated holds raw third-party titles from the pipeline and is exempt from prose rules.
  const textFiles = [
    ...walk(path.join(ROOT, "app"), [".ts", ".tsx"]),
    ...walk(path.join(ROOT, "components"), [".ts", ".tsx"]),
    ...walk(path.join(ROOT, "lib"), [".ts", ".tsx"]),
    ...walk(path.join(ROOT, "data"), [".ts"]),
    path.join(ROOT, "README.md"),
    path.join(ROOT, "CLAUDE.md"),
  ];
  const banned = [/UNC5537/, /UNC6040/, /UNC6395/, /Salesloft/i, /Snowflake/i, /Instructure/i, /Scattered LAPSUS/i, /Sigma YAML/i, /LogScale/i, /Splunk/i, /\bGLINT\b/, /synthetic:\s*true/];
  for (const file of textFiles) {
    const text = fs.readFileSync(file, "utf8");
    const rel = path.relative(ROOT, file);
    for (const re of banned) if (re.test(text)) f("legacy-content", `${rel} matches ${re}`);
    if (/ShinyHunters/.test(text) && !rel.startsWith("data/")) f("legacy-content", `${rel} mentions ShinyHunters outside the claim registry`);
    if (/[—–]/.test(text)) {
      const line = text.split("\n").findIndex((l) => /[—–]/.test(l)) + 1;
      f("style-dashes", `${rel}:${line} contains an em-dash or en-dash`);
    }
    if (/\b(10|172\.(1[6-9]|2\d|3[01])|192\.168)\.\d{1,3}\.\d{1,3}\b/.test(text) || /\.example\b/.test(text)) f("synthetic-ioc", `${rel} contains a synthetic indicator`);
  }

  return fail;
}

function main() {
  const failures = runChecks();
  if (failures.length === 0) {
    console.log(`intel:validate OK. ${sources.length} sources, ${events.length} events, ${claims.length} claims, ${evidence.length} evidence records, ${graphNodes.length} graph nodes.`);
    return;
  }
  console.error(`intel:validate FAILED with ${failures.length} finding${failures.length === 1 ? "" : "s"}:\n`);
  for (const x of failures) console.error(`  [${x.check}] ${x.detail}`);
  process.exit(1);
}

if (process.argv[1] && /intel-validate\.ts$/.test(process.argv[1])) main();
