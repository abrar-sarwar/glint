# GLINT — Graph-Linked Intel for Network Threats

This file is the source of truth for every future session in this repository.
Treat its contents as load-bearing. If something here conflicts with a casual
request, surface the conflict before deviating.

---

## 1. Product

**GLINT** is a published threat-intelligence product profiling the
**ShinyHunters / Scattered LAPSUS$ Hunters** cluster and its three flagship
campaigns. It is an internal SOC-style web application — *not* a marketing
site, *not* a tutorial demo, *not* a generic SaaS dashboard.

Reference aesthetic: CrowdStrike Falcon, Mandiant Advantage, Splunk Enterprise
Security, Recorded Future. Dense, sourced, professional, terminal-influenced.

| Aspect | Value |
| --- | --- |
| Stack | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| Run | `npm run dev` → http://localhost:3000 |
| Backend | None. All data lives in typed TS files under `/data` |
| Build target | Static-friendly; no env vars required |

---

## 2. Threat-Actor Focus

**ShinyHunters / Scattered LAPSUS$ Hunters** — a financially motivated
eCrime cluster active since ~2020 that has rebranded across multiple
Mandiant-tracked UNC numbers. Confirmed aliases are UNC5537 (Snowflake),
UNC6040 (Salesforce vishing), and UNC6395 (Salesloft Drift OAuth). The
self-styled "Scattered LAPSUS$ Hunters" Telegram channel formed in mid-2025.
Do not invent additional UNC labels. Only add a UNC alias if a specific
Mandiant or Google TIG source can be cited.

### Three flagship campaigns

1. **Snowflake C5537** — credential-stuffing of Snowflake tenants lacking
   MFA using infostealer-harvested credentials. Public victims include
   AT&T, Ticketmaster (Live Nation), Santander, Advance Auto Parts,
   LendingTree. Disclosed June 2024.
2. **Salesloft Drift / Salesforce OAuth supply-chain.** UNC6395
   stole Drift OAuth refresh tokens via secrets exposed
   in a Drift GitHub repository (TruffleHog scan), pivoted into
   ~700–760 customer Salesforce tenants, and bulk-exported records
   (≈1.5B). Disclosed August 2025.
3. **Instructure / Canvas extortion** — claimed compromise of ~9,000
   educational institutions / 275M users; ransom deadline **2026-05-12**.
   Active campaign; intel still developing.

---

## 3. Visual Design Principles

### Palette (Tailwind tokens defined in `tailwind.config.ts`)

| Token | Hex | Use |
| --- | --- | --- |
| `bg.base` | `#0a0e1a` | Page background |
| `bg.surface` | `#0f1524` | Card/panel surface |
| `bg.elevated` | `#141b2d` | Elevated panel, hover state |
| `border.default` | `#1f2a3f` | Hairline borders |
| `border.strong` | `#2b3a55` | Stronger separation |
| `text.primary` | `#e6edf7` | Body text |
| `text.muted` | `#8b97ad` | Secondary text |
| `text.faint` | `#5a6478` | Metadata, captions |
| `accent.terminal` | `#00ff88` | Primary accent (links, brand, OK status) |
| `accent.amber` | `#ffaa00` | Alert / elevated severity |
| `accent.crit` | `#ff3b5c` | Critical severity |
| `accent.info` | `#4d9fff` | Informational |

### Typography
- **Inter Tight** for UI body / sans (deployed via `next/font/google`)
- **JetBrains Mono** for IDs, IPs, hashes, queries, timestamps

### Style rules
- Sharp corners. Border-radius 0–4 px maximum. No `rounded-3xl`, no pills with
  pure circles outside of status dots.
- Dense information layouts; tabular over card-heavy.
- Status pills: rectangular with 2 px radius, 1 px border, monospaced label.
- Terminal-style streaming feeds where appropriate.
- Hairline borders > soft shadows. No drop shadows that look like CSS toys.
- Subtle scanline / grid background overlay only on the operations dashboard.

### Forbidden
- Gradients (except for very subtle 1–2 % luminosity transitions on hero
  surfaces — never decorative gradients).
- Soft shadows, neumorphism, glass-morphism.
- Emoji-heavy UI (icons via `lucide-react` only).
- Marketing copy: *"revolutionary"*, *"next-gen"*, *"AI-powered"*, *"cutting
  edge"*, *"transform your"*, hero CTAs with pricing.

---

## 4. Required Pages (App Router)

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `app/page.tsx` | Operations dashboard |
| `/adversary` | `app/adversary/page.tsx` | ShinyHunters profile + relationship graph |
| `/campaigns/[slug]` | `app/campaigns/[slug]/page.tsx` | Per-campaign deep-dive + kill chain |
| `/detections` | `app/detections/page.tsx` | Searchable detection-rule library |
| `/hunting` | `app/hunting/page.tsx` | Hunt console + synthetic log streaming |
| `/coverage` | `app/coverage/page.tsx` | MITRE ATT&CK heatmap |
| `/brief` | `app/brief/page.tsx` | One-page printable executive brief |
| `/about` | `app/about/page.tsx` | Methodology + sources |

Polish bar (must feel real):
1. `/`
2. `/adversary`
3. `/campaigns/salesloft-drift`

The remainder may be functional stubs that read from `/data` — but no lorem
ipsum, ever. Every line of copy is sourced or is professionally written UI
chrome.

---

## 5. Required Visualisations

| Surface | Library | Notes |
| --- | --- | --- |
| Adversary relationship graph | `reactflow` | ShinyHunters at center; nodes coloured by entity type (`actor`/`alias`/`victim`/`affiliate`) |
| Kill-chain flow per campaign | `reactflow` | Horizontal layout, MITRE technique nodes, click → side panel with detection mapping |
| MITRE ATT&CK heatmap | Custom CSS grid | Tactics as columns, techniques as cells, fill driven by `/data/detections.ts` |
| Campaign timeline | `recharts` | Horizontal timeline 2024 → 2026 |
| Infrastructure network map | `cytoscape` + `react-cytoscapejs` | Force-directed, attacker infra ↔ pivot ↔ victim envs |
| Live hunt feed | Custom + `reactflow` | Synthetic log generator, terminal-style stream, graph that builds over time |

---

## 6. Content Rules (Non-Negotiable)

1. **Cite every claim.** Primary sources only: CrowdStrike Counter Adversary
   Operations / Global Threat Report, Mandiant M-Trends and blog,
   Intel 471, Krebs on Security, original vendor disclosures (Snowflake,
   Salesloft, Salesforce, Instructure), MITRE ATT&CK. Citations live in
   `/data/sources.ts` and are referenced by ID.
2. **Mark synthetic IOCs.** Any fabricated IP, domain, hash, or username must
   be tagged `synthetic: true` in the data and visually badged
   `SYNTHETIC` in the UI. Real IOCs are only used when published in primary
   sources, and the source must be cited next to the indicator.
3. **MITRE ATT&CK technique IDs throughout.** Core set used across the
   product:
   - T1078 Valid Accounts
   - T1199 Trusted Relationship
   - T1528 Steal Application Access Token
   - T1550.001 Use Alternate Authentication Material: Application Access Token
   - T1552 Unsecured Credentials
   - T1566.004 Phishing: Spearphishing Voice
   - T1110.004 Brute Force: Credential Stuffing
   - T1530 Data from Cloud Storage
   - T1567 Exfiltration Over Web Service
   - T1589.001 / T1589.002 Gather Victim Identity Information
   - T1593 Search Open Websites/Domains (Salesloft Drift recon)
   - T1657 Financial Theft (extortion)
4. **Tone.** Structured. Sourced. Sober. Modeled on CrowdStrike Counter
   Adversary Operations and Mandiant intel. No hype, no marketing words, no
   imperative calls to action.

---

## 7. Deliverable Counts

- **12–15 detection rules**, each in three formats: Sigma YAML, CrowdStrike
  Falcon LogScale CQL, Splunk SPL.
  - Three are fully built (Salesforce Bulk API export anomaly; Snowflake
    new-ASN login → external-stage COPY INTO; OAuth app consent grant from
    non-corporate IDP).
  - The remainder are stubbed with title, MITRE coverage, severity, and
    log source so that the heatmap and library are populated.
- **5–6 hunt hypotheses**, each with hypothesis, rationale, query
  pseudocode, expected output, triage steps, and MITRE coverage.
- **1 executive brief** page, single-page-printable.

---

## 8. Repository Layout

```
app/                        # App Router pages and layouts
  layout.tsx                # Root shell: sidebar + status bar
  page.tsx                  # /  Operations dashboard
  adversary/page.tsx
  campaigns/[slug]/page.tsx
  detections/page.tsx
  hunting/page.tsx
  coverage/page.tsx
  brief/page.tsx
  about/page.tsx
  globals.css
components/
  shell/                    # Sidebar, StatusBar
  ui/                       # SeverityPill, MitreBadge, DataCard, etc.
  graphs/                   # AdversaryGraph, KillChainFlow, HeatmapGrid
  home/                     # Dashboard widgets
  campaign/                 # Kill-chain side panel, IOC table, timeline
data/
  adversaries.ts            # ShinyHunters dossier
  campaigns.ts              # Three flagship campaign objects
  techniques.ts             # MITRE technique catalogue (core set)
  detections.ts             # Rule library
  hunts.ts                  # Hunt hypotheses
  sources.ts                # Citation list, referenced by id
lib/
  utils.ts                  # cn(), formatters
  killchain.ts              # Helpers for chain → React Flow nodes/edges
public/                     # Static assets
```

---

## 9. House Rules for Future Sessions

- Don't introduce a backend. Data stays in `/data`.
- Don't add a UI library (shadcn, Mantine, Chakra). Tailwind primitives only.
- Don't fabricate threat-intel claims. If a fact isn't in `/data/sources.ts`,
  either add a source or don't make the claim.
- Don't soften the aesthetic toward "marketing dashboard" — sharp corners,
  monospaced metadata, dense data.
- IOCs must be tagged synthetic vs. real, and the synthetic ones should look
  like obviously-fake values (e.g. RFC 1918, `.example`, well-known test
  hashes) so a reader cannot mistake them for genuine indicators.
- Today's in-product clock should treat the date as current; the Canvas
  campaign page assumes today is on or before 2026-05-12 (deadline).

---

## 10. Build/Version Footer

Show in sidebar bottom and `/about`:
```
GLINT v0.1.0 · build YYYY-MM-DD · TLP:CLEAR · Counter-Adversary Operations
```
