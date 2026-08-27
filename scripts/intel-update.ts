/**
 * LEEK source discovery pipeline.
 *
 *   npm run intel:update
 *
 * SOURCE DISCOVERY -> NORMALISATION -> DEDUPLICATION -> ENTITY EXTRACTION ->
 * CLAIM EXTRACTION -> SOURCE RELIABILITY -> CORROBORATION CHECK ->
 * TIMELINE MATCHING -> STATUS ASSESSMENT -> PENDING INTELLIGENCE
 *
 * The pipeline only ever writes under data/generated. It never edits the
 * typed case file, and it never assigns a "supported" status. With an
 * ANTHROPIC_API_KEY it asks Claude to classify items; without one it runs
 * rules-only. Either way every item is marked "needs-analyst-review".
 *
 * Feeds are public RSS/JSON endpoints used within their published terms:
 * Google News RSS, Bing News RSS, the GDELT DOC API, and the CourtListener
 * REST API (anonymous or with COURTLISTENER_TOKEN).
 */
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { XMLParser } from "fast-xml-parser";
import { sources } from "../data/sources";
import { events } from "../data/events";
import type {
  AssessmentStatus,
  DiscoveredSource,
  EventCategory,
  LastSync,
  PendingEvent,
  SourceTier,
} from "../data/types";

const ROOT = path.resolve(__dirname, "..");
const GEN = path.join(ROOT, "data", "generated");

export const SEARCH_TERMS = [
  "CyberLeek",
  "Cyberleek",
  "GTA VI leak",
  "GTA 6 leak",
  "Take-Two CyberLeek",
  "Rockstar CyberLeek",
  "CyberLeek Microsoft",
  "CyberLeek Discord",
  "CyberLeek subpoena",
  "CyberLeek dead man switch",
  "CyberLeek arrest",
  "CyberLeek $CYBERLEEK",
];

/* ------------------------------------------------------------------ */
/* Normalisation                                                       */
/* ------------------------------------------------------------------ */

export function normalizeUrl(raw: string): string {
  try {
    const u = new URL(raw.trim());
    u.hash = "";
    for (const k of Array.from(u.searchParams.keys())) {
      if (/^(utm_|fbclid|gclid|ref|s|src|mc_)/.test(k)) u.searchParams.delete(k);
    }
    let s = u.toString();
    s = s.replace(/^https?:\/\/(www\.|amp\.)?/, "").replace(/\/amp\/?$/, "");
    return s.replace(/\/+$/, "").toLowerCase();
  } catch {
    return raw.trim().toLowerCase();
  }
}

export function normalizeTitle(t: string): string {
  return t
    .toLowerCase()
    .replace(/\s+[-|:]\s+[a-z0-9 .'&]+$/i, "")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/* ------------------------------------------------------------------ */
/* Rules: reliability, entities, claims, category                      */
/* ------------------------------------------------------------------ */

const TIER_BY_HOST: [RegExp, SourceTier][] = [
  [/courtlistener\.com|uscourts\.gov|pacer\.gov/, 1],
  [/rockstargames\.com/, 2],
  [/take2games\.com|sec\.gov/, 3],
  [/microsoft\.com|discord\.com|github\.blog|blog\.google|x\.com\/safety/, 4],
  [/cyber-leek/, 5],
  [/reuters\.com|apnews\.com|bloomberg\.com|nytimes\.com|wsj\.com|ft\.com|bbc\.(co\.uk|com)|theguardian\.com|variety\.com|wired\.com|theverge\.com|arstechnica\.com|mashable\.com|pcmag\.com|techcrunch\.com|404media\.co/, 6],
  [/ign\.com|kotaku\.com|gamespot\.com|pcgamer\.com|polygon\.com|eurogamer\.net|gamesradar\.com|insider-gaming\.com|gamesindustry\.biz|videogameschronicle\.com|forbes\.com/, 7],
  [/malwarebytes\.com|cyberscoop\.com|bleepingcomputer\.com|therecord\.media|krebsonsecurity\.com|darkreading\.com/, 8],
  [/coingecko\.com|solscan\.io|dexscreener\.com|defined\.fi|arweave\.net|viewblock\.io/, 9],
  [/gtaforums\.com|gtabase\.com|resetera\.com|neogaf\.com/, 10],
  [/reddit\.com|x\.com|twitter\.com|t\.me|youtube\.com|tiktok\.com|facebook\.com|instagram\.com|bsky\.app/, 11],
];

export function suggestTier(url: string): SourceTier {
  const host = hostOf(url);
  for (const [re, tier] of TIER_BY_HOST) if (re.test(host) || re.test(url)) return tier;
  return 7;
}

const ENTITY_RULES: [RegExp, string][] = [
  [/cyber ?leek/i, "CyberLeek"],
  [/rockstar/i, "Rockstar Games"],
  [/take[- ]two|ttwo/i, "Take-Two Interactive"],
  [/microsoft|github/i, "Microsoft / GitHub"],
  [/discord/i, "Discord"],
  [/google|youtube/i, "Google / YouTube"],
  [/\bx corp\b|twitter/i, "X Corp"],
  [/netflix/i, "Netflix"],
  [/stop killing games/i, "Stop Killing Games"],
  [/\$?cyberleek token|memecoin|meme coin|solana/i, "$CYBERLEEK holders"],
];

const CLAIM_RULES: [RegExp, string][] = [
  [/playable|working build|game build/i, "LEEK-CLM-001"],
  [/full (?:\S+ ){0,3}game|entire game|complete game|whole game|full build/i, "LEEK-CLM-002"],
  [/still has access|retains access|ongoing access/i, "LEEK-CLM-003"],
  [/\bfake\b|ai[- ]generated|authentic/i, "LEEK-CLM-004"],
  [/xbox|dev ?kit/i, "LEEK-CLM-006"],
  [/pc build|pc version|pirated/i, "LEEK-CLM-007"],
  [/rockstar india|outsourc/i, "LEEK-CLM-008"],
  [/dead man/i, "LEEK-CLM-012"],
  [/release (the|a) (full )?build|release the game/i, "LEEK-CLM-013"],
  [/manifesto|pre-?order|physical disc/i, "LEEK-CLM-014"],
  [/memecoin|meme coin|token|crypto/i, "LEEK-CLM-015"],
  [/kurtaj|lapsus/i, "LEEK-CLM-018"],
  [/shinyhunters/i, "LEEK-CLM-019"],
  [/marketing stunt|marketing ploy|conspiracy/i, "LEEK-CLM-021"],
  [/ransom|demand|\$1[56]\d,?\d{3}/i, "LEEK-CLM-022"],
  [/subpoena|dmca|court|judge/i, "LEEK-CLM-023"],
  [/billion|market value|stock|shares/i, "LEEK-CLM-025"],
  [/second leaker|separate leaker/i, "LEEK-CLM-026"],
  [/\biso\b/i, "LEEK-CLM-027"],
  [/offline|goes dark|website down|over\b/i, "LEEK-CLM-028"],
  [/spoiler|prologue|lucia|story/i, "LEEK-CLM-029"],
  [/arrest|identified|unmask|who is/i, "LEEK-CLM-016"],
];

const CATEGORY_RULES: [RegExp, EventCategory][] = [
  [/retract|walk(s|ed)? back|debunk|correct|not true|was fake/i, "correction"],
  [/subpoena|court|judge|dmca|lawsuit|filing/i, "legal"],
  [/arrest|investigat|police|fbi|unmask/i, "investigation"],
  [/rockstar (says|statement|responds|breaks silence)/i, "rockstar"],
  [/take[- ]two (says|statement|shares|stock)|market value|billion/i, "take-two"],
  [/microsoft|github/i, "microsoft"],
  [/discord/i, "discord"],
  [/token|memecoin|meme coin|crypto|solana/i, "cryptocurrency"],
  [/fake|hoax|misinformation|rumou?r/i, "misinformation"],
  [/manifesto|ultimatum|demands|telegram statement/i, "actor-statement"],
  [/leak|footage|gameplay|clip|video|map/i, "leak"],
  [/reddit|forum|fans|community/i, "community"],
];

export function rulesClassify(title: string, snippet = ""): NonNullable<DiscoveredSource["classification"]> {
  const text = `${title} ${snippet}`;
  const entities = ENTITY_RULES.filter(([re]) => re.test(text)).map(([, e]) => e);
  const claims = Array.from(new Set(CLAIM_RULES.filter(([re]) => re.test(text)).map(([, c]) => c)));
  const category = CATEGORY_RULES.find(([re]) => re.test(text))?.[1];
  const suggestedStatus: AssessmentStatus = category === "correction" ? "retracted" : "unknown";
  return { entities, claims, category, suggestedStatus, model: "rules-only" };
}

/** Very small timeline matcher: shares three or more meaningful words with an existing event title. */
export function matchEvent(title: string): string | undefined {
  const words = new Set(normalizeTitle(title).split(" ").filter((w) => w.length > 3));
  let best: { id: string; score: number } | undefined;
  for (const e of events) {
    const ew = normalizeTitle(e.title).split(" ").filter((w) => w.length > 3);
    const score = ew.filter((w) => words.has(w)).length;
    if (score >= 3 && (!best || score > best.score)) best = { id: e.id, score };
  }
  return best?.id;
}

/* ------------------------------------------------------------------ */
/* Feeds                                                               */
/* ------------------------------------------------------------------ */

interface RawItem {
  url: string;
  title: string;
  publisher: string;
  publishedAt?: string;
  snippet?: string;
  feed: string;
  query: string;
}

async function fetchText(url: string, headers: Record<string, string> = {}, ms = 15000): Promise<string> {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try {
    const res = await fetch(url, { headers: { "user-agent": "LEEK-intel/0.2 (+https://github.com/abrar-sarwar/leek)", ...headers }, signal: ctl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

const xml = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

function rssItems(text: string): { title: string; link: string; pubDate?: string; source?: string; description?: string }[] {
  const doc = xml.parse(text);
  const channel = doc?.rss?.channel;
  if (!channel) return [];
  const items = Array.isArray(channel.item) ? channel.item : channel.item ? [channel.item] : [];
  return items.map((it: Record<string, unknown>) => ({
    title: String((it.title as { "#text"?: string })?.["#text"] ?? it.title ?? ""),
    link: String(it.link ?? ""),
    pubDate: it.pubDate ? String(it.pubDate) : undefined,
    source: typeof it.source === "object" && it.source ? String((it.source as { "#text"?: string })["#text"] ?? "") : it.source ? String(it.source) : undefined,
    description: it.description ? String(it.description) : undefined,
  }));
}

function isoOrUndefined(d?: string): string | undefined {
  if (!d) return undefined;
  const t = new Date(d);
  return Number.isNaN(t.getTime()) ? undefined : t.toISOString();
}

async function googleNews(term: string): Promise<RawItem[]> {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(term)}&hl=en-US&gl=US&ceid=US:en`;
  return rssItems(await fetchText(url)).map((it) => ({
    url: it.link,
    title: it.title.replace(/\s+-\s+[^-]+$/, ""),
    publisher: it.source ?? hostOf(it.link),
    publishedAt: isoOrUndefined(it.pubDate),
    snippet: it.description?.replace(/<[^>]+>/g, " ").slice(0, 400),
    feed: "google-news",
    query: term,
  }));
}

async function bingNews(term: string): Promise<RawItem[]> {
  const url = `https://www.bing.com/news/search?q=${encodeURIComponent(term)}&format=rss`;
  return rssItems(await fetchText(url)).map((it) => ({
    url: it.link,
    title: it.title,
    publisher: hostOf(it.link),
    publishedAt: isoOrUndefined(it.pubDate),
    snippet: it.description?.replace(/<[^>]+>/g, " ").slice(0, 400),
    feed: "bing-news",
    query: term,
  }));
}

async function gdelt(): Promise<RawItem[]> {
  const q = encodeURIComponent('"CyberLeek" OR ("GTA VI" leak) OR ("GTA 6" leak)');
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${q}&mode=artlist&maxrecords=100&format=json&timespan=7d&sort=datedesc`;
  const json = JSON.parse(await fetchText(url)) as { articles?: { url: string; title: string; seendate?: string; domain?: string }[] };
  return (json.articles ?? []).map((a) => ({
    url: a.url,
    title: a.title,
    publisher: a.domain ?? hostOf(a.url),
    publishedAt: a.seendate ? isoOrUndefined(a.seendate.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, "$1-$2-$3T$4:$5:$6Z")) : undefined,
    feed: "gdelt",
    query: "CyberLeek OR GTA VI leak",
  }));
}

async function courtListener(): Promise<RawItem[]> {
  const q = encodeURIComponent('"Take-Two Interactive" AND (CyberLeek OR "Grand Theft Auto")');
  const url = `https://www.courtlistener.com/api/rest/v4/search/?type=r&q=${q}&order_by=dateFiled%20desc`;
  const headers: Record<string, string> = process.env.COURTLISTENER_TOKEN ? { Authorization: `Token ${process.env.COURTLISTENER_TOKEN}` } : {};
  const json = JSON.parse(await fetchText(url, headers)) as {
    results?: { caseName?: string; docketNumber?: string; dateFiled?: string; docket_absolute_url?: string; court?: string }[];
  };
  return (json.results ?? [])
    .filter((r) => r.docket_absolute_url)
    .map((r) => ({
      url: `https://www.courtlistener.com${r.docket_absolute_url}`,
      title: `${r.caseName ?? "Docket"} ${r.docketNumber ?? ""}`.trim(),
      publisher: `CourtListener (${r.court ?? "court"})`,
      publishedAt: r.dateFiled ? `${r.dateFiled}T00:00:00Z` : undefined,
      feed: "courtlistener",
      query: "Take-Two Interactive",
    }));
}

/* ------------------------------------------------------------------ */
/* AI classification (optional)                                        */
/* ------------------------------------------------------------------ */

const CLASSIFY_TOOL = {
  name: "classify_sources",
  description: "Classify discovered reporting about the CyberLeek / GTA VI campaign for analyst review.",
  input_schema: {
    type: "object" as const,
    properties: {
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            entities: { type: "array", items: { type: "string" } },
            claims: { type: "array", items: { type: "string" }, description: "LEEK-CLM ids the item bears on" },
            category: { type: "string", enum: ["leak", "actor-statement", "media", "legal", "rockstar", "take-two", "microsoft", "discord", "platform", "community", "cryptocurrency", "misinformation", "correction", "investigation"] },
            suggestedStatus: { type: "string", enum: ["actor-claim", "community-claim", "disputed", "retracted", "unknown"], description: "Never 'supported'. Rumours stay unknown." },
            suggestedTier: { type: "integer", minimum: 1, maximum: 11 },
            note: { type: "string", description: "One sentence for the analyst: what is new, and what is unverified." },
          },
          required: ["id", "entities", "claims", "suggestedStatus", "note"],
        },
      },
    },
    required: ["items"],
  },
};

async function aiClassify(items: DiscoveredSource[]): Promise<Map<string, Partial<DiscoveredSource["classification"]> & { note?: string; suggestedTier?: SourceTier }>> {
  const out = new Map<string, Partial<DiscoveredSource["classification"]> & { note?: string; suggestedTier?: SourceTier }>();
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key || items.length === 0) return out;
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey: key });
  const model = process.env.LEEK_MODEL ?? "claude-opus-5";
  const claimIndex = fs.existsSync(path.join(ROOT, "data", "claims.ts"))
    ? (await import("../data/claims")).claims.map((c) => `${c.id}: ${c.statement}`).join("\n")
    : "";
  for (let i = 0; i < items.length; i += 20) {
    const batch = items.slice(i, i + 20);
    try {
      const res = await client.messages.create({
        model,
        max_tokens: 4000,
        system:
          "You classify news items about the CyberLeek / GTA VI leak campaign for a human analyst. You never decide that something is true. Attribute claims to who made them: CyberLeek statements are actor-claim, Reddit/forum theories are community-claim, contradictions between credible outlets are disputed, withdrawn reports are retracted, everything else is unknown. Do not speculate about initial access or identity.\n\nClaim registry:\n" +
          claimIndex,
        tools: [CLASSIFY_TOOL],
        tool_choice: { type: "tool", name: "classify_sources" },
        messages: [
          {
            role: "user",
            content: batch.map((b) => `id=${b.id}\ntitle=${b.title}\npublisher=${b.publisher}\nurl=${b.url}\npublished=${b.publishedAt ?? "unknown"}`).join("\n\n"),
          },
        ],
      });
      for (const block of res.content) {
        if (block.type === "tool_use" && block.name === "classify_sources") {
          const input = block.input as { items: { id: string; entities: string[]; claims: string[]; category?: EventCategory; suggestedStatus: AssessmentStatus; suggestedTier?: number; note: string }[] };
          for (const it of input.items) {
            const status = it.suggestedStatus === ("supported" as AssessmentStatus) ? "unknown" : it.suggestedStatus;
            out.set(it.id, { entities: it.entities, claims: it.claims, category: it.category, suggestedStatus: status, model, note: it.note, suggestedTier: it.suggestedTier as SourceTier | undefined });
          }
        }
      }
    } catch (err) {
      console.error(`AI classification failed for batch ${i / 20 + 1}: ${(err as Error).message}`);
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(path.join(GEN, file), "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(file: string, value: unknown) {
  fs.mkdirSync(GEN, { recursive: true });
  fs.writeFileSync(path.join(GEN, file), JSON.stringify(value, null, 2) + "\n");
}

/** Items published before the campaign's first public activity are noise for this case. Undated items are kept for review. */
export const MIN_PUBLISHED = "2026-08-01";

export function dedupe(items: RawItem[], known: Set<string>, knownTitles: Set<string>): RawItem[] {
  const out: RawItem[] = [];
  for (const it of items) {
    if (!it.url || !it.title) continue;
    if (it.publishedAt && it.publishedAt.slice(0, 10) < MIN_PUBLISHED) continue;
    const u = normalizeUrl(it.url);
    const t = normalizeTitle(it.title);
    if (known.has(u) || (t && knownTitles.has(t))) continue;
    known.add(u);
    if (t) knownTitles.add(t);
    out.push(it);
  }
  return out;
}

async function main() {
  const ranAt = new Date().toISOString();
  const feeds: LastSync["feeds"] = [];
  const raw: RawItem[] = [];

  const run = async (name: string, fn: () => Promise<RawItem[]>) => {
    try {
      const items = await fn();
      raw.push(...items);
      feeds.push({ name, ok: true, items: items.length });
    } catch (err) {
      feeds.push({ name, ok: false, items: 0, error: (err as Error).message });
    }
  };

  for (const term of SEARCH_TERMS) await run(`google-news:${term}`, () => googleNews(term));
  for (const term of SEARCH_TERMS.slice(0, 4)) await run(`bing-news:${term}`, () => bingNews(term));
  await run("gdelt", gdelt);
  await run("courtlistener", courtListener);

  const existing = readJson<DiscoveredSource[]>("discovered-sources.json", []);
  const known = new Set<string>([...sources.map((s) => normalizeUrl(s.url)), ...existing.map((d) => normalizeUrl(d.url))]);
  const knownTitles = new Set<string>([...sources.map((s) => normalizeTitle(s.title)), ...existing.map((d) => normalizeTitle(d.title))]);
  const fresh = dedupe(raw, known, knownTitles);

  const discovered: DiscoveredSource[] = fresh.map((it) => ({
    id: `DISC-${createHash("sha1").update(normalizeUrl(it.url)).digest("hex").slice(0, 10)}`,
    url: it.url,
    title: it.title,
    publisher: it.publisher,
    publishedAt: it.publishedAt,
    discoveredAt: ranAt,
    feed: it.feed,
    query: it.query,
    suggestedTier: suggestTier(it.url),
    reviewStatus: "needs-analyst-review",
    classification: { ...rulesClassify(it.title, it.snippet), matchedEventId: matchEvent(it.title) },
  }));

  const ai = await aiClassify(discovered);
  const analysisMode: LastSync["analysisMode"] = ai.size > 0 ? "ai" : "rules-only";
  for (const d of discovered) {
    const c = ai.get(d.id);
    if (!c) continue;
    d.classification = {
      entities: c.entities ?? d.classification?.entities ?? [],
      claims: c.claims ?? d.classification?.claims ?? [],
      category: c.category ?? d.classification?.category,
      suggestedStatus: c.suggestedStatus ?? "unknown",
      matchedEventId: d.classification?.matchedEventId,
      model: c.model,
    };
    if (c.suggestedTier) d.suggestedTier = c.suggestedTier;
  }

  // Corroboration: items sharing a normalised title with another fresh item corroborate each other.
  const titleGroups = new Map<string, string[]>();
  for (const d of discovered) {
    const t = normalizeTitle(d.title);
    titleGroups.set(t, [...(titleGroups.get(t) ?? []), d.id]);
  }
  for (const d of discovered) {
    const peers = (titleGroups.get(normalizeTitle(d.title)) ?? []).filter((id) => id !== d.id);
    if (peers.length && d.classification) d.classification.corroboratedBySourceIds = peers;
  }

  const pendingExisting = readJson<PendingEvent[]>("pending-events.json", []);
  const pendingKnown = new Set(pendingExisting.map((p) => normalizeTitle(p.title)));
  const eventCategories: EventCategory[] = ["legal", "rockstar", "take-two", "leak", "correction", "investigation", "actor-statement", "microsoft", "discord", "platform"];
  const pendingNew: PendingEvent[] = discovered
    .filter((d) => d.classification?.category && eventCategories.includes(d.classification.category) && !d.classification.matchedEventId)
    .filter((d) => !pendingKnown.has(normalizeTitle(d.title)))
    .map((d) => ({
      id: `PEND-${d.id.slice(5)}`,
      title: d.title,
      reportedAt: d.publishedAt ?? ranAt,
      category: d.classification?.category,
      sourceUrls: [d.url],
      suggestedStatus: d.classification?.suggestedStatus ?? "unknown",
      reviewStatus: "needs-analyst-review",
      note: ai.get(d.id)?.note ?? "Rules-only classification. Confirm the event date from the article body before promoting; the reportedAt value is the publication time, not the event time.",
    }));

  const signals = readJson<{ date: string; feed: string; count: number; domains: string[] }[]>("media-signals.json", []);
  const day = ranAt.slice(0, 10);
  for (const f of feeds) {
    const items = fresh.filter((r) => `${r.feed}:${r.query}` === f.name || r.feed === f.name);
    if (items.length === 0) continue;
    signals.push({ date: day, feed: f.name, count: items.length, domains: Array.from(new Set(items.map((i) => hostOf(i.url)))).slice(0, 12) });
  }

  const allDiscovered = [...existing, ...discovered];
  const allPending = [...pendingExisting, ...pendingNew];
  const lastSync: LastSync = {
    ranAt,
    feeds,
    discovered: allDiscovered.length,
    newSinceLastRun: discovered.length,
    pending: allPending.filter((p) => p.reviewStatus === "needs-analyst-review").length,
    analysisMode,
  };

  writeJson("discovered-sources.json", allDiscovered);
  writeJson("pending-events.json", allPending);
  writeJson("media-signals.json", signals);
  writeJson("last-sync.json", lastSync);

  console.log(`intel:update ${ranAt}`);
  for (const f of feeds) console.log(`  ${f.ok ? "ok " : "ERR"} ${f.name.padEnd(40)} ${f.ok ? f.items : f.error}`);
  console.log(`  ${discovered.length} new sources (${allDiscovered.length} total), ${pendingNew.length} new pending events, mode ${analysisMode}`);
}

if (process.argv[1] && /intel-update\.ts$/.test(process.argv[1])) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
