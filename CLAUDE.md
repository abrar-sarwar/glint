# LEEK

This file is the source of truth for every future session in this repository.
Treat it as load-bearing. If something here conflicts with a casual request,
surface the conflict before deviating.

---

## 1. Product

**LEEK** (brand: `LEEK`; expanded descriptor, used sparingly: Live Evidence &
Exposure Knowledge) is an open-source intelligence case file documenting the
ongoing **CyberLeek / Grand Theft Auto VI** leak campaign that began in public
on 2026-08-18.

It is a living, evidence-driven reconstruction: what happened, what the
evidence proves, and what remains unknown. It is not a SIEM, not a detection
library, not a leak mirror, and not a fan site.

| Aspect | Value |
| --- | --- |
| Stack | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| Run | `npm run dev` then http://localhost:3000 |
| Data | Typed TS records under `/data`; generated JSON under `/data/generated` |
| Backend | None. Static-friendly. No env vars required to build or run |
| Pipeline | `npm run intel:update` (RSS/API discovery), scheduled by `.github/workflows/intel-update.yml` |

---

## 2. The intelligence standard (non-negotiable)

1. **Never invent an attack chain.** The public record does not establish how
   CyberLeek obtained the build. Initial access is `UNKNOWN` and that is a
   finding. Do not write "phishing to credentials to VPN to build" anywhere.
2. **Every factual record cites a source id** (`LEEK-SRC-nnn`). Citations
   render as `[S014]` and open the source drawer. `npm run intel:validate`
   fails on an uncited fact.
3. **Status vocabulary is fixed** (see `data/types.ts`):
   confidence `verified | high | moderate | low | unknown`;
   assessment status `supported | actor-claim | community-claim | disputed |
   retracted | false | unknown`; claim status adds `probable | unresolved |
   speculation`. Never convert speculation into fact. Retracted claims keep
   their full history.
4. **Event date is not article date.** `occurredAt` is when it happened;
   `reportedAt` is when the earliest source published, when different.
5. **Source priority** (tier 1 strongest): court filings, Rockstar, Take-Two,
   platforms, CyberLeek's own statements (as actor claims), investigative
   journalism, gaming journalism, security researchers, blockchain data,
   community research, social posts. Community discussion is intelligence,
   not primary evidence.
6. **No doxxing.** Never identify a private individual as CyberLeek. Handles
   appear only when they are in court filings or major reporting, and only as
   discovery targets or community theories.
7. **No redistribution.** Do not link to, embed, host, or describe how to
   obtain leaked footage, builds, ISOs, or archives. Cite the reporting.
8. **When sources conflict, document the conflict.** Do not pick the dramatic
   version.
9. **MITRE ATT&CK is not the centre.** Map a technique only when a documented
   behaviour supports it. Sparse coverage communicates uncertainty.
10. **The pipeline never publishes.** `intel:update` writes only to
    `data/generated` and marks everything `needs-analyst-review`. Promotion
    into `/data/*.ts` is a human edit.

---

## 3. Writing rules

- No em-dashes and no en-dashes anywhere (prose, code comments, commit
  messages). Use commas, periods, parentheses, or "to". The validator fails
  on them.
- Plain, sober, human prose. Short sentences. No hype words, no marketing
  copy, no imperative calls to action.
- Names: CyberLeek, Rockstar, Take-Two, GTA VI.
- Readable type: body 15px, section titles 22px, page titles 32 to 48px,
  nothing below 11px. One bold typographic moment per page. No SOC theatre
  (no running clocks, corner brackets, or fake system status).

---

## 4. Routes

| Route | Purpose |
| --- | --- |
| `/` | Command view: case ledger, counts, current assessment, what we know / do not know, campaign graph, current frontier and checkpoints |
| `/timeline` | Filterable event ledger (occurred vs reported dates) |
| `/drops` | Index of publicly reported releases (metadata only) |
| `/actor` | CyberLeek dossier: channels, statements, ideology, token, indicators, attribution theories |
| `/claims` | Claim registry grouped by status, with rationale and history |
| `/access` | "How did CyberLeek get GTA VI?" leads with UNKNOWN, then the hypothesis matrix |
| `/dead-mans-switch` | Propagation-chain case study of the retracted dead man's switch story |
| `/media` | Narrative clusters with confidence, media reaction chain, coverage timeline |
| `/impact` | Exposure surface (12 dimensions), impact sections (observed vs potential), financial figures, legal tracker |
| `/response` | Defensive recommendations by horizon, each with "why this matters in this case" |
| `/evidence` | Evidence ledger |
| `/sources` | Source registry by tier, sync status, pending intelligence |

Global search: Cmd/Ctrl+K (`lib/search.ts`).

---

## 5. Data model

```
data/
  types.ts            all interfaces and vocabularies
  sources.ts          LEEK-SRC-nnn  citation registry (tiered)
  events.ts           LEEK-EVT-nnn  timeline, chronological, sequential ids
  drops.ts            LEEK-DRP-nnn  reported releases
  claims.ts           LEEK-CLM-nnn  claim registry with history
  evidence.ts         LEEK-EVD-nnn  evidence ledger
  hypotheses.ts       LEEK-HYP-nnn  initial-access hypotheses
  actor.ts            dossier (attribution theories LEEK-ATT-nnn)
  media.ts            LEEK-MED-nnn records, LEEK-NAR-nnn narratives, LEEK-CHN-nnn chains
  impact.ts           impact sections, exposure surface, LEEK-LGL-nnn legal actions, figures
  recommendations.ts  LEEK-REC-nnn
  checkpoints.ts      LEEK-CHK-nnn dated future checkpoints
  graph.ts            campaign graph nodes and edges (every edge cites sources)
  case.ts             analyst text for the command view
  generated/          pipeline output (discovered sources, pending events, signals, last sync)
lib/
  intel.ts            derived counts and cross references (never authored)
  search.ts           global search index
  utils.ts            formatters and semantic tokens
scripts/
  intel-update.ts     discovery pipeline
  intel-validate.ts   integrity checks (also run by vitest)
  intel-report.ts     status block
tests/                vitest suites
```

Source `claimsSupported` / `claimsContradicted` are derived from
`claims.ts` at runtime; do not type them by hand.

---

## 6. Visual language

Graphite near-black ground, hairline separators, sharp corners (radius 0 to
3px), Inter Tight for UI and JetBrains Mono for ids, dates, and labels.
Semantic accents only, defined in `tailwind.config.ts`:

| Token | Meaning |
| --- | --- |
| `evidence` (muted green) | supported, verified |
| `assess` (amber) | analyst assessment, moderate confidence, disputed |
| `claim` (violet) | actor claim |
| `crit` (red) | current frontier, critical, retracted or false (with strike-through) |
| `info` (blue) | legal, platform, media reference |
| `ink.muted` (gray) | uncertainty |

Forbidden: gradients, glassmorphism, soft shadows, rounded SaaS cards,
gamer-neon, emoji in UI, marketing copy. The unknown initial-access node is
hatched; the current-frontier node is red with a subtle pulse and nothing
more.

---

## 7. Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm test               # vitest: integrity, search, utils, pipeline
npm run intel:validate # fails on integrity violations
npm run intel:report   # status block
npm run intel:update   # discover sources into data/generated (optional ANTHROPIC_API_KEY)
```

Run lint, typecheck, build, test, and intel:validate before claiming work is
done. Fix what you introduce.

---

## 8. House rules for future sessions

- Do not add a backend, a UI library, or a database.
- Do not add a source without a registry entry; do not cite a source that is
  not in `data/sources.ts`.
- Update `lastUpdated` on any record you change; add a history entry when a
  claim's status changes.
- New events go in chronological position and ids are renumbered to stay
  sequential (the validator checks).
- If new reporting resolves a question (initial access, identity), record it
  as a new event with its source and move the claim through its history.
  Do not edit the past.
- The build footer reads: `LEEK v0.2.0 · build YYYY-MM-DD · TLP:CLEAR`.
