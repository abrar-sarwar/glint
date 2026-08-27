/**
 * LEEK impact assessment.
 *
 * Four exports:
 *   impactSections   what the campaign has done, and could do, to Rockstar and
 *                    Take-Two across IP, marketing, development, legal,
 *                    financial and reputational dimensions. Every item is
 *                    either "observed" (it verifiably happened, with sources)
 *                    or "potential" (analyst reasoning, written as assessment
 *                    and citing the observed facts it extrapolates from).
 *   exposureSurface  twelve dimensions with a strict status vocabulary. This
 *                    is not a rate or a score; it records what the public
 *                    record demonstrates, suggests, or does not touch.
 *   legalActions     the legal tracker, chronological.
 *   financialFigures reported numbers only, each with its measurement window
 *                    and the conflicts between outlets. No figure here is
 *                    LEEK's own estimate.
 *
 * Nothing in this file states or implies how CyberLeek obtained access. The
 * public record has not established that, and the exposure surface treats
 * that gap as a finding.
 */

import type {
  ExposureDimension,
  ImpactSection,
  LegalAction,
} from "./types";

export interface FinancialFigure {
  label: string;
  value: string;
  /** ISO date of the measurement or report. */
  date: string;
  kind: "observed" | "potential";
  sourceIds: string[];
  /** Measurement window, method, and any conflict between outlets. */
  note: string;
}

/* ------------------------------------------------------------------ */
/* Exposure surface                                                    */
/* ------------------------------------------------------------------ */

export const exposureSurface: ExposureDimension[] = [
  {
    key: "source-code",
    label: "Source code",
    status: "no-public-evidence",
    rationale:
      "No clip, filing, or report in the record shows source code, shader files, or engine internals attributed to CyberLeek; every drop is rendered gameplay, screenshots, or a stitched map. The 2022 Lapsus$ incident did involve a claim of code access, and outlets note this campaign has made no such claim. A separate group's August 20 claim to hold internal files is uncorroborated and is not part of the CyberLeek case.",
    sourceIds: ["LEEK-SRC-052", "LEEK-SRC-014", "LEEK-SRC-091", "LEEK-SRC-072"],
  },
  {
    key: "playable-build",
    label: "Playable build",
    status: "partially-exposed",
    rationale:
      "The August 20 clip in which bullet holes spell LEEK on a wall shows that someone was controlling a running build interactively, and Rockstar's August 26 statement acknowledged that gameplay videos leaked; together these establish that a build was in someone's hands. They do not establish that CyberLeek itself holds the build rather than receiving footage from a source, which Forbes raised as an alternative, nor the platform, completeness, or current availability of that build, and no build has been released. That is why this dimension is partially exposed rather than publicly demonstrated.",
    sourceIds: ["LEEK-SRC-022", "LEEK-SRC-025", "LEEK-SRC-040", "LEEK-SRC-007", "LEEK-SRC-102", "LEEK-SRC-016"],
  },
  {
    key: "unreleased-gameplay",
    label: "Unreleased gameplay",
    status: "publicly-demonstrated",
    rationale:
      "More than a dozen gameplay clips circulated between August 18 and August 26, covering driving, combat, flying, stores, a strip club, a nudist resort, a nightclub and a beach, with outlets counting between 11 and 16 clips depending on method. Take-Two issued takedowns from the first day and Rockstar's statement refers to leaked gameplay videos without qualification.",
    sourceIds: ["LEEK-SRC-045", "LEEK-SRC-043", "LEEK-SRC-017", "LEEK-SRC-103", "LEEK-SRC-007", "LEEK-SRC-034"],
  },
  {
    key: "narrative",
    label: "Narrative",
    status: "partially-exposed",
    rationale:
      "On August 26 the actor posted about four and a half minutes of the Lucia prologue, the first story content, after earlier clips had shown only short cutscene fragments (a VPN conversation, a boat scene with Cal Hampton, a bathroom encounter). Outlets that watched it say it stays close to what the 2023 trailer already showed of Lucia in prison, with some additional backstory. The main plot, mission structure, and ending have not appeared.",
    sourceIds: ["LEEK-SRC-021", "LEEK-SRC-031", "LEEK-SRC-048", "LEEK-SRC-026", "LEEK-SRC-045"],
  },
  {
    key: "game-map",
    label: "Game map",
    status: "publicly-demonstrated",
    rationale:
      "A full map of Leonida, assembled from in-game screenshots, circulated on August 18 and the GTA mapping community found it consistent with years of reconstruction from official material. Plane clips on August 20 and 23 showed the world from above. The map is past containment according to every outlet that tracked re-uploads, and a second, separate map-data leak was claimed on August 20 without corroboration.",
    sourceIds: ["LEEK-SRC-026", "LEEK-SRC-012", "LEEK-SRC-023", "LEEK-SRC-043", "LEEK-SRC-072"],
  },
  {
    key: "mechanics",
    label: "Mechanics",
    status: "publicly-demonstrated",
    rationale:
      "The clips show a focus meter, fuel and vehicle-health indicators with refuel and repair at pumps, a six-star wanted level with identification icons, Zombix pills with diminishing effect, loadout and storage prompts, clone-key and smash-window options, fishing spots, disarm and taunt prompts, and a wasted screen. These are visible on screen and were catalogued by several outlets, with the caveat that the build is older and any system may change before launch.",
    sourceIds: ["LEEK-SRC-043", "LEEK-SRC-045", "LEEK-SRC-026", "LEEK-SRC-016", "LEEK-SRC-046"],
  },
  {
    key: "internal-infrastructure",
    label: "Internal infrastructure",
    status: "no-public-evidence",
    rationale:
      "Nothing public shows Rockstar servers, source control, build pipelines, or internal tooling. Bloomberg reported on August 21 that Rockstar did not know how the material got out, and the researcher framing of an insider-style investigation is opinion rather than evidence of network compromise. Absence of evidence here is not evidence of absence, but the record contains none.",
    sourceIds: ["LEEK-SRC-053", "LEEK-SRC-066", "LEEK-SRC-014"],
  },
  {
    key: "employee-data",
    label: "Employee data",
    status: "no-public-evidence",
    rationale:
      "CyberLeek has not claimed or shown personnel records, and no outlet reports any. The April 2026 third-party incident that reached Rockstar data is a separate matter that Rockstar described as involving limited, unimportant company information, and Mashable found no established connection to CyberLeek.",
    sourceIds: ["LEEK-SRC-016", "LEEK-SRC-013"],
  },
  {
    key: "credentials",
    label: "Credentials",
    status: "unknown",
    rationale:
      "Whether any Rockstar, partner, or platform credential or token was used is not addressed by any filing or report. The route by which the material was obtained is unestablished, and every hypothesis about it in the press is speculation. Until Rockstar or a court says otherwise, this dimension stays unknown rather than clear.",
    sourceIds: ["LEEK-SRC-053", "LEEK-SRC-016", "LEEK-SRC-085"],
  },
  {
    key: "partner-systems",
    label: "Partner systems",
    status: "unknown",
    rationale:
      "Speculation that the build came through an outsourcing partner circulated within days and a separate group attached a partner-employee claim to its own alleged material, but no source corroborates either. The Microsoft subpoena seeks records of Microsoft's internal investigation of the persona, which shows a platform holder is looking, not that a partner was involved. The dimension is unknown, not cleared.",
    sourceIds: ["LEEK-SRC-085", "LEEK-SRC-062", "LEEK-SRC-072", "LEEK-SRC-002", "LEEK-SRC-029"],
  },
  {
    key: "marketing-plan",
    label: "Marketing plan",
    status: "possible",
    rationale:
      "No marketing asset, schedule, or plan document has appeared, and the physical-disc decision the actor protests was already public. What the build shows, however, is content Rockstar was holding for the Netflix Extended Look on August 27, and outlets judged that at least some reveal moments were pre-empted. The exposure is inferential: the plan itself is not out, but the surprises it depended on partly are.",
    sourceIds: ["LEEK-SRC-026", "LEEK-SRC-052", "LEEK-SRC-018", "LEEK-SRC-106", "LEEK-SRC-069"],
  },
  {
    key: "development-timeline",
    label: "Development timeline",
    status: "partially-exposed",
    rationale:
      "The clips reveal the state of the game at one point in development: press dated the build to 2025 from a January 2025 radio track and Forbes' read, Insider Gaming put it at 2024 or earlier from metadata, and the actor's August 26 on-screen text called it recent and the game not ready, which is an actor claim. That is a snapshot of progress, not a schedule, and no milestone or internal date has appeared.",
    sourceIds: ["LEEK-SRC-045", "LEEK-SRC-025", "LEEK-SRC-043", "LEEK-SRC-031", "LEEK-SRC-050"],
  },
];

/* ------------------------------------------------------------------ */
/* Legal tracker                                                       */
/* ------------------------------------------------------------------ */

const SDNY = "U.S. District Court, S.D.N.Y.";
const TAKE_TWO = "Take-Two Interactive Software, Inc.";

export const legalActions: LegalAction[] = [
  {
    id: "LEEK-LGL-001",
    date: "2026-08-18",
    datePrecision: "approximate",
    title: "DMCA takedown notices begin against the leaked clips and map",
    kind: "dmca-takedown",
    parties: [TAKE_TWO, "X Corp.", "Google LLC (YouTube)", "Reddit", "Streamable"],
    status: "ongoing; re-uploads continue to outpace removals",
    summary:
      "Copyright notices against posts carrying the footage were reported from the first day of the drops, and outlets treated the takedowns as the earliest signal that the material was genuine. Later filings attach the notices sent to Discord, GitHub, YouTube and X as exhibits. Takedowns have not contained the material: re-uploads with cropped watermarks and altered audio followed each wave.",
    confidence: "high",
    sourceIds: ["LEEK-SRC-034", "LEEK-SRC-026", "LEEK-SRC-043", "LEEK-SRC-016", "LEEK-SRC-064", "LEEK-SRC-068"],
  },
  {
    id: "LEEK-LGL-002",
    date: "2026-08-19",
    datePrecision: "day",
    title: "Takedown notice to GitHub for the cyberleek-leak-research repository",
    kind: "dmca-takedown",
    parties: [TAKE_TWO, "Microsoft Corporation (GitHub)"],
    status: "notice filed as Exhibit 1 to the Cendali declaration; Mashable reported the repository still online on 2026-08-21",
    summary:
      "The notice that became the statutory predicate for the Microsoft subpoena targets a GitHub repository named in the petition and asks that the entire repository be disabled. Mashable noted it was unclear whether the repository belonged to the actor, who had been communicating through a website and Telegram.",
    confidence: "high",
    sourceIds: ["LEEK-SRC-002", "LEEK-SRC-001", "LEEK-SRC-018", "LEEK-SRC-032"],
  },
  {
    id: "LEEK-LGL-003",
    date: "2026-08-20",
    datePrecision: "day",
    title: "512(h) subpoena request to Microsoft Corporation (GitHub)",
    kind: "dmca-subpoena",
    court: SDNY,
    caseNumber: "1:26-mc-00421",
    judge: "Jennifer L. Rochon",
    parties: [`${TAKE_TWO} (petitioner)`, "Microsoft Corporation (subpoena recipient)"],
    status: "subpoena issued 2026-08-21; compliance sought by 2026-09-04",
    summary:
      "Filed by Kirkland and Ellis under 17 U.S.C. 512(h) with a proposed subpoena, a proposed order, and a declaration attaching the GitHub notice. As reported by Kotaku, the subpoena seeks Microsoft's internal business and investigative records on the cyberleek persona and, for accounts tied to listed Discord servers, account IDs, registration emails, registration and last-login IP addresses, phone numbers, linked Google and Xbox connections, device identifiers (MachineGuid and MSA), and GTA, Rockstar or Cyberleek content from OneDrive. Tom's Hardware characterised the request as Windows device identifiers for everyone in three Discord servers.",
    nextDate: "2026-09-04",
    confidence: "verified",
    sourceIds: ["LEEK-SRC-001", "LEEK-SRC-002", "LEEK-SRC-029", "LEEK-SRC-041", "LEEK-SRC-013", "LEEK-SRC-061", "LEEK-SRC-069", "LEEK-SRC-100"],
  },
  {
    id: "LEEK-LGL-004",
    date: "2026-08-20",
    datePrecision: "day",
    title: "512(h) subpoena request to Discord, Inc.",
    kind: "dmca-subpoena",
    court: SDNY,
    caseNumber: "1:26-mc-00422",
    judge: "Andrew L. Carter, Jr.",
    parties: [`${TAKE_TWO} (petitioner)`, "Discord, Inc. (subpoena recipient)"],
    status: "subpoena issued 2026-08-21; compliance sought by 2026-09-04; Discord reported not yet served as of 2026-08-24",
    summary:
      "The petition names a Discord server reached by an invitation link and associates it with three accounts (CYBERLEEK, CINEMATICROCKSTAR, and Surfer24k with replacement handles) and two community servers, one of them the editors' server of streamer DarkViperAU, who said publicly he knew nothing. The subpoena seeks identifying information for all accounts that were members of or communicated in the listed servers from 2026-06-01 onward, including IP logs, phone numbers, connected accounts and device identifiers. Malwarebytes and PC Gamer noted this could reach hundreds or thousands of users with no known connection to the leaks.",
    nextDate: "2026-09-04",
    confidence: "verified",
    sourceIds: ["LEEK-SRC-003", "LEEK-SRC-004", "LEEK-SRC-029", "LEEK-SRC-018", "LEEK-SRC-036", "LEEK-SRC-013", "LEEK-SRC-100"],
  },
  {
    id: "LEEK-LGL-005",
    date: "2026-08-21",
    datePrecision: "day",
    title: "Order directing the clerk to issue the Microsoft subpoena",
    kind: "court-order",
    court: SDNY,
    caseNumber: "1:26-mc-00421",
    judge: "Jennifer L. Rochon",
    parties: [TAKE_TWO, "Microsoft Corporation"],
    status: "entered 2026-08-21; docket shows the miscellaneous case terminated the same day",
    summary:
      "Having considered the declaration and supporting documents, the court found good reason to issue an order directing the clerk to issue the subpoena for Microsoft as sought by the petitioner. Kotaku amended its headline the same day to clarify that Take-Two had asked the court to order the records.",
    confidence: "verified",
    sourceIds: ["LEEK-SRC-001", "LEEK-SRC-029", "LEEK-SRC-100"],
  },
  {
    id: "LEEK-LGL-006",
    date: "2026-08-21",
    datePrecision: "day",
    title: "Order directing the clerk to issue the Discord subpoena",
    kind: "court-order",
    court: SDNY,
    caseNumber: "1:26-mc-00422",
    judge: "Andrew L. Carter, Jr.",
    parties: [TAKE_TWO, "Discord, Inc."],
    status: "entered 2026-08-21; docket shows the miscellaneous case terminated the same day",
    summary:
      "The order, in the same form as the Microsoft order, directs the clerk to issue the subpoena for Discord as sought by the petitioner. Issuance is not service: Discord said three days later that it had not yet received the subpoena.",
    confidence: "verified",
    sourceIds: ["LEEK-SRC-003", "LEEK-SRC-100", "LEEK-SRC-014", "LEEK-SRC-086"],
  },
  {
    id: "LEEK-LGL-007",
    date: "2026-08-21",
    datePrecision: "day",
    title: "512(h) subpoena request to Google LLC (YouTube)",
    kind: "dmca-subpoena",
    court: SDNY,
    caseNumber: "1:26-mc-00425",
    judge: "John P. Cronan",
    parties: [`${TAKE_TWO} (petitioner)`, "Google LLC (subpoena recipient)"],
    status: "pending; memo endorsement of 2026-08-24 requires Take-Two to supplement its application",
    summary:
      "Filed by Rachel Bandli with a declaration attaching a takedown notice to YouTube. The court did not issue the subpoena on the papers: on 2026-08-24 Judge Cronan noted that the petitioner had given no information on how it identified the online personas it sought to subpoena, or its basis for associating them with the identified YouTube video, and ordered prompt supplementation. CyberScoop reported the Google petition as the one of four still unapproved.",
    confidence: "verified",
    sourceIds: ["LEEK-SRC-005", "LEEK-SRC-019", "LEEK-SRC-014", "LEEK-SRC-015"],
  },
  {
    id: "LEEK-LGL-008",
    date: "2026-08-21",
    datePrecision: "day",
    title: "512(h) subpoena request to X Corp.",
    kind: "dmca-subpoena",
    court: SDNY,
    caseNumber: "1:26-mc-00426",
    judge: "Analisa Torres",
    parties: [`${TAKE_TWO} (petitioner)`, "X Corp. (subpoena recipient)"],
    status: "an order was entered on the docket on 2026-08-24 (Doc. 5); its text is not captured; CyberScoop reported the X subpoena granted",
    summary:
      "Filed by Rachel Bandli with a declaration attaching a takedown notice to X Corp. The docket shows assignment to Judge Torres and an order entered on 2026-08-24, but the order's text is not in the record, so LEEK records it as entered rather than characterising it. No compliance date for X has been reported.",
    confidence: "verified",
    sourceIds: ["LEEK-SRC-006", "LEEK-SRC-019", "LEEK-SRC-014", "LEEK-SRC-015"],
  },
  {
    id: "LEEK-LGL-009",
    date: "2026-08-21",
    datePrecision: "day",
    title: "Microsoft says it is working closely with Take-Two and Rockstar; reported served",
    kind: "platform-response",
    parties: ["Microsoft Corporation", TAKE_TWO, "Rockstar Games"],
    status: "cooperation stated by Xbox CTO Scott Van Vliet; service reported in a Windows Central headline syndicated by Yahoo, not confirmed by Microsoft in the record",
    summary:
      "Van Vliet said Microsoft is working closely with Take-Two and Rockstar to support efforts to protect creative works and intellectual property. The petition's request for Microsoft's internal investigative records on the persona suggests Microsoft had already been looking, which the statement neither confirms nor denies. Whether the leaked build touched Xbox or Microsoft services is not established.",
    confidence: "high",
    sourceIds: ["LEEK-SRC-065", "LEEK-SRC-060", "LEEK-SRC-032", "LEEK-SRC-002"],
  },
  {
    id: "LEEK-LGL-010",
    date: "2026-08-24",
    datePrecision: "day",
    title: "Memo endorsement: Take-Two must explain how it identified the YouTube personas",
    kind: "court-order",
    court: SDNY,
    caseNumber: "1:26-mc-00425",
    judge: "John P. Cronan",
    parties: [TAKE_TWO, "Google LLC"],
    status: "supplementation ordered; no further docket activity captured as of 2026-08-25",
    summary:
      "The endorsement is the only judicial pushback in the four proceedings. It does not deny the subpoena; it withholds it until Take-Two shows the basis for linking the named personas to the posting at issue. It signals that the identification method behind the requests, which the Microsoft and Discord petitions did not have to explain, can be examined.",
    confidence: "verified",
    sourceIds: ["LEEK-SRC-005", "LEEK-SRC-014"],
  },
  {
    id: "LEEK-LGL-011",
    date: "2026-08-24",
    datePrecision: "day",
    title: "Discord: complies with valid subpoenas, and has not yet been served",
    kind: "platform-response",
    parties: ["Discord, Inc.", TAKE_TWO],
    status: "not served as of 2026-08-24 (reported 2026-08-25); Discord says it will consider validity, scope and user privacy when served",
    summary:
      "Discord's first position, on 2026-08-21, was that it reviews and complies with valid DMCA subpoenas when received. On 2026-08-24 a Discord representative said the company had not yet received Take-Two's subpoena and would consider user privacy if and when it did; PC Gamer and DualShockers reported this on 2026-08-25, with PC Gamer framing the request as IP addresses and phone numbers of thousands. The gap between issuance and service makes the 2026-09-04 date uncertain for Discord.",
    nextDate: "2026-09-04",
    confidence: "high",
    sourceIds: ["LEEK-SRC-086", "LEEK-SRC-036", "LEEK-SRC-100", "LEEK-SRC-060", "LEEK-SRC-014"],
  },
  {
    id: "LEEK-LGL-012",
    date: "2026-08-27",
    datePrecision: "approximate",
    title: "Criminal investigation: not publicly confirmed",
    kind: "criminal-investigation",
    parties: ["No agency has been named"],
    status: "not publicly confirmed",
    summary:
      "No law-enforcement agency has announced an investigation and no charging document exists in the record. The four S.D.N.Y. matters are civil miscellaneous proceedings under the DMCA, not prosecutions, and no lawsuit against a named defendant has been filed. Some outlets have gone further than the record: AS asserted that two Discord channels were under investigation by law enforcement without sourcing it, GadgetReview said criminal referrals could plausibly follow subpoena returns while noting none had been reported, and BigGo noted that a KYC exchange linked to the token could be subpoenaed. Unverified reports of an FBI arrest circulated on 2026-08-21 and were not substantiated by any outlet. LEEK records the status as not confirmed and the confidence as unknown.",
    confidence: "unknown",
    sourceIds: ["LEEK-SRC-069", "LEEK-SRC-068", "LEEK-SRC-062", "LEEK-SRC-091", "LEEK-SRC-014", "LEEK-SRC-065", "LEEK-SRC-114"],
  },
];

/* ------------------------------------------------------------------ */
/* Financial figures                                                   */
/* ------------------------------------------------------------------ */

export const financialFigures: FinancialFigure[] = [
  {
    label: "Take-Two market value decline (peak to trough)",
    value: "$2.83 billion",
    date: "2026-08-21",
    kind: "observed",
    sourceIds: ["LEEK-SRC-063", "LEEK-SRC-062"],
    note:
      "By one tally: TTWO at $248.13 before the leaks spread on 2026-08-18 to an intraday low that BigGo gives as $231.60 and BeInCrypto (via Yahoo Finance) as $232.84, measured over under two days. Shares closed at $240.15 on 2026-08-21 and both outlets put the persisting loss at about $1.5 billion. The market value claim is recorded as disputed in the claim registry because outlets use different windows and GameSpot noted other factors on the share price in the same week.",
  },
  {
    label: "Take-Two market value decline (headline rounding)",
    value: "Nearly $3 billion",
    date: "2026-08-21",
    kind: "observed",
    sourceIds: ["LEEK-SRC-062"],
    note:
      "BigGo's headline figure. The body of the same piece gives $2.83 billion, so this is a rounding of the peak-to-trough number above rather than a separate measurement. Beebom and Insider Gaming reported over $2 billion, EGW roughly $1 billion, and Windows Central a 2 percent weekly decline; the spread reflects reference dates, not different events.",
  },
  {
    label: "Take-Two share-price decline since the day before the leaks",
    value: "4.8 percent ($249 to $237)",
    date: "2026-08-20",
    kind: "observed",
    sourceIds: ["LEEK-SRC-064"],
    note:
      "Finbold's window runs from 2026-08-17 to 2026-08-20 and its own characterisation was that the leaks were not affecting the stock to a dramatic degree; it also noted a 3.45 percent five-day move and that TTWO was down 5.8 percent year to date against a 12.4 percent gain for the S&P 500.",
  },
  {
    label: "Take-Two share price during the leak week",
    value: "About $245 to about $236 per share",
    date: "2026-08-20",
    kind: "observed",
    sourceIds: ["LEEK-SRC-027"],
    note:
      "GameSpot's framing was that market capitalisation had lost billions; it did not show the arithmetic. It listed confounders in the same week: CEO Strauss Zelnick's sale of about $10 million in shares, a quarterly loss of more than $30 million with net bookings down, and a stock already down more than 6 percent year to date. Zelnick said the 2022 leak had no financial impact.",
  },
  {
    label: "$CYBERLEEK nominal market capitalisation, liquidity and volume",
    value: "About $1.23 million cap, about $198,000 liquidity, $3.89 million volume",
    date: "2026-08-20",
    kind: "observed",
    sourceIds: ["LEEK-SRC-016"],
    note:
      "Mashable's snapshot at 13:23 ET on 2026-08-20 from a token dashboard: $0.001227 per token times one billion tokens. Liquidity was a small fraction of the paper valuation and the ten largest wallets held 51.6 percent of supply, so price and cap figures for this token are point-in-time and easily moved.",
  },
  {
    label: "$CYBERLEEK peak rally and market capitalisation",
    value: "About $22 million cap after a 1,400 percent 24-hour rise",
    date: "2026-08-23",
    kind: "observed",
    sourceIds: ["LEEK-SRC-089", "LEEK-SRC-091", "LEEK-SRC-088", "LEEK-SRC-087"],
    note:
      "BeInCrypto reported the rally and a cap of about $22 million with volume above $112 million; Bleap cites a $25 million peak. Cryptopolitan put the cap at over $14 million on 2026-08-25 after a 9 percent daily decline, and CoinGecko's page is point-in-time. None of these figures is revenue to the actor; they describe a speculative token whose supply was reportedly burned by the actor on 2026-08-23.",
  },
  {
    label: "Estimated trading-fee income to the actor",
    value: "$40,000 to $60,000 in fees; about $4,400 per day",
    date: "2026-08-20",
    kind: "observed",
    sourceIds: ["LEEK-SRC-062", "LEEK-SRC-033", "LEEK-SRC-015", "LEEK-SRC-013", "LEEK-SRC-113", "LEEK-SRC-091"],
    note:
      "What is observed is that the estimate was published, not the income itself. It comes from a GTAForums researcher (Vice Cit) who traced token funding on-chain and estimated about $29,000 of setup cost recouped on day one and roughly $2.1 million of daily volume yielding about $4,400 a day in fees; IGN, PCMag, BigGo and Malwarebytes relayed it. Kotaku argued on 2026-08-21 that the campaign looked like a crypto scheme built on creator fees, citing about $11.8 million traded on 2026-08-18, a figure Bleap repeats. No official party has verified the actor's proceeds.",
  },
  {
    label: "Contact fee posted on the actor's site",
    value: "400 XMR, reported as about $169,000 (PCMag) or about $165,000 (Bleap)",
    date: "2026-08-21",
    kind: "observed",
    sourceIds: ["LEEK-SRC-015", "LEEK-SRC-091", "LEEK-SRC-026"],
    note:
      "An actor-posted price, not a ransom demand to Rockstar: the contact tab offered advertisers watermark placements or custom footage, with the Monero transfer guaranteeing a reply over Session. The dollar conversions differ because of the Monero price on the day each outlet wrote; Bleap also gives $165,450. No payment has been reported, and the actor said it is not asking publishers to pay to stop the leaks.",
  },
  {
    label: "Transfers out of the $CYBERLEEK creator wallets",
    value: "About $250,000 (Kotaku, Dexerto) to $270,000 (CoinDesk)",
    date: "2026-08-27",
    kind: "observed",
    sourceIds: ["LEEK-SRC-110", "LEEK-SRC-111", "LEEK-SRC-112"],
    note:
      "In the early hours of 2026-08-27 the wallets that created the token moved funds out. Kotaku and Dexerto relay a GTAForums on-chain breakdown of close to $250,000; CoinDesk gives $270,000 from its own on-chain reading. The gap reflects which transfers were counted and the token price at the moment of counting. Kotaku framed the transfers as a sign the leaks could be over; that is an inference, and no official party has confirmed who controls the wallets.",
  },
  {
    label: "$CYBERLEEK price and market capitalisation after the transfers",
    value: "About 86 percent fall: $0.034 peak to under $0.005; cap from about $23.39 million to $3.23 million",
    date: "2026-08-27",
    kind: "observed",
    sourceIds: ["LEEK-SRC-112", "LEEK-SRC-111", "LEEK-SRC-110"],
    note:
      "Dexerto's figures. The peak cap it cites ($23.39 million) differs from BeInCrypto's about $22 million and Bleap's $25 million, all point-in-time readings of a thinly backed token. The fall is the third distinct price regime in nine days (launch-day surge, 2026-08-23 rally, 2026-08-27 collapse) and it is the actor's holders, not Take-Two, who bore it.",
  },
];

/* ------------------------------------------------------------------ */
/* Impact sections                                                     */
/* ------------------------------------------------------------------ */

export const impactSections: ImpactSection[] = [
  {
    key: "ip",
    title: "Intellectual property exposure",
    intro:
      "The campaign has exposed an unfinished snapshot of GTA VI rather than the game itself: rendered gameplay, a stitched map, on-screen systems, and since August 26 a slice of story. No dollar value is assigned to any of it here, because none can be defended from the record. What follows separates what has verifiably appeared from what a build in someone else's hands could still reveal.",
    items: [
      {
        title: "Gameplay mechanics are on public view",
        body:
          "The clips show a focus meter that rises with basketball shots, fuel and vehicle-health indicators with refuel and repair options at pumps, a six-star wanted level with icons that appear to track clothing, face and vehicle, Zombix pills whose effect weakens with use, loadout and storage prompts at a vehicle, clone-key and smash-window options when stealing cars, fishing spots, disarm, taunt, defuse and warn prompts, a stamina bar, an honor-style icon, and a wasted screen. GamingBible reported in-game days about three times the length of GTA V's. Every outlet that catalogued these systems added that the build is older and any of them may change or be cut.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-043", "LEEK-SRC-045", "LEEK-SRC-026", "LEEK-SRC-016", "LEEK-SRC-046", "LEEK-SRC-056"],
      },
      {
        title: "The world map is out and corroborated",
        body:
          "Images of the full Leonida map, assembled from in-game screenshots, circulated on August 18 and the GTA mapping community found that numerous details lined up with years of reconstruction from official material. Two plane clips then showed the world from above. A separate map-data leak from a different source was claimed on August 20 and remains uncorroborated.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-026", "LEEK-SRC-012", "LEEK-SRC-023", "LEEK-SRC-043", "LEEK-SRC-072"],
      },
      {
        title: "Missions: only fragments have been reported",
        body:
          "What outlets describe is a raid on a sugar refinery at Ambrosia in the taser clip, store robberies in the hypercar clips, and a 'Return to Lucia' objective at the end of the gas-station clip. No mission list, structure, or late-game content has appeared, and nothing in the record supports claims about the ending.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-045", "LEEK-SRC-026", "LEEK-SRC-050", "LEEK-SRC-016"],
      },
      {
        title: "Narrative exposure began on August 26",
        body:
          "The Lucia prologue, about four and a half minutes posted to Telegram, is the first story content; outlets that watched it say it stays close to the prison setting the 2023 trailer already showed while adding backstory. Earlier clips carried only cutscene fragments: a conversation about using a VPN, a boat scene with Cal Hampton, and a bathroom encounter. Rockstar's statement the same day said the intended experience may now be impacted by some spoilers.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-021", "LEEK-SRC-031", "LEEK-SRC-048", "LEEK-SRC-026", "LEEK-SRC-102"],
      },
      {
        title: "Characters shown are the ones already announced",
        body:
          "Jason Duval appears throughout and Lucia Caminos in the prologue and a brief cutscene glimpse; Cal Hampton appears in a boat scene. All three were already part of Rockstar's official material, and the Dazed feature published on August 26 gave official detail on switching between the two leads. No unannounced major character has been reported.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-031", "LEEK-SRC-021", "LEEK-SRC-045", "LEEK-SRC-026"],
      },
      {
        title: "The internal development state is visible, and its date is disputed",
        body:
          "The footage is plainly unfinished: glitched animation in the gas-station clip, unfinished UI, and captures at 720p. Beebom dated the build to 2025 or later from a radio track released in January 2025 and Forbes said likely 2025; Insider Gaming said 2024 or earlier from metadata; the actor's on-screen text on August 26 called the build actually recent and the game not ready at all, which is an actor claim. The claim registry carries the build date as probable for 2025 or earlier, with moderate confidence.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-045", "LEEK-SRC-025", "LEEK-SRC-043", "LEEK-SRC-050", "LEEK-SRC-031"],
      },
      {
        title: "Unreleased technology drew attention of its own",
        body:
          "The beach and nightclub clips of August 25 were singled out by TechRadar and Kotaku for crowd density and variety, and earlier clips showed volumetric clouds and long draw distances from the air. These are engineering results Rockstar had not shown, now benchmarked in public from an older build.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-039", "LEEK-SRC-103", "LEEK-SRC-043", "LEEK-SRC-045"],
      },
      {
        title: "Marketing assets and release strategy: inferred, not leaked",
        body:
          "Assessment. No marketing asset, plan, or schedule has appeared, and the physical-disc decision the actor protests was already public through Take-Two's own statements. What a build in someone else's hands exposes is the reveal sequence itself: DSOGaming judged that the strip-club clip may have spoiled a surprise planned for the Netflix Extended Look, and the prologue arrived the day before it. If the build reaches further into the game than the clips so far, the remaining reveal moments up to November 19 are the exposure.",
        kind: "potential",
        sourceIds: ["LEEK-SRC-026", "LEEK-SRC-069", "LEEK-SRC-052", "LEEK-SRC-106", "LEEK-SRC-025"],
      },
    ],
  },
  {
    key: "marketing",
    title: "Marketing exposure",
    intro:
      "Rockstar's approach to GTA VI has been to show very little for a very long time, and the campaign took that choice away nine days before the first official gameplay showcase. The observed effects are on reveal control, communications and the press cycle. The effects on audience surprise and on the Netflix window are assessments.",
    items: [
      {
        title: "Loss of reveal control before the Netflix Extended Look",
        body:
          "The first substantial GTA VI gameplay the public saw came from the actor on August 18, with the Extended Look scheduled for August 27 at 15:00 ET on Netflix and on YouTube six hours later. Mashable wrote that Rockstar's promotional plans had been completely overshadowed, and Bloomberg reported that the reveal date was nonetheless kept.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-018", "LEEK-SRC-016", "LEEK-SRC-106", "LEEK-SRC-062", "LEEK-SRC-053", "LEEK-SRC-109"],
      },
      {
        title: "A forced statement on August 26",
        body:
          "Rockstar's first public words came eight days into the campaign and one day before the showcase: a post addressed 'Dear all' calling the leaks heartbreaking for the team, saying this was not how it intended people to see the game, apologising for the wait for official information, and asking people to wait for November 19. It did not mention the actor or the demands. Within hours the actor posted the prologue.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-007", "LEEK-SRC-101", "LEEK-SRC-102", "LEEK-SRC-020", "LEEK-SRC-108", "LEEK-SRC-048"],
      },
      {
        title: "The press cycle now runs on the actor's schedule",
        body:
          "GameSpot, Beebom, IGN, Mashable and TechRadar all maintained rolling timelines, IGN headlined a sixth straight day of leaks, Notebookcheck counted a twelfth leak two days before the showcase, and OpenCritic's item on Netflix's own update ran under an 'amid ongoing leaks' framing. Each drop, and each poll announcing a drop, has been a story before Rockstar published anything.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-026", "LEEK-SRC-045", "LEEK-SRC-032", "LEEK-SRC-103", "LEEK-SRC-106", "LEEK-SRC-017"],
      },
      {
        title: "Community attention is steered by token votes",
        body:
          "Polls paid in $CYBERLEEK chose the plane clip (more than 147,000 tokens, 64.4 percent), the nudist-resort clip, and then whether to release a Lucia-led prologue; Insider Gaming reported one participant spending about $80 on a vote. The option list itself becomes news and gaming forums argue over it, so the actor sets the agenda for discussion of the game without spending anything. The claim that votes decide releases is recorded as probable.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-016", "LEEK-SRC-051", "LEEK-SRC-059", "LEEK-SRC-032", "LEEK-SRC-017"],
      },
      {
        title: "Spoiler fatigue and reduced surprise",
        body:
          "Assessment. Rockstar itself said the intended experience may be impacted by spoilers, and the prologue is now circulating. Against that, the former Rockstar North technical director argued that most future players do not seek out clips, and researchers quoted by CyberScoop said the campaign has functioned as an underground marketing campaign for the game. Both can be true: the audience that follows every drop is small but it is the audience that shapes launch conversation.",
        kind: "potential",
        sourceIds: ["LEEK-SRC-102", "LEEK-SRC-066", "LEEK-SRC-014", "LEEK-SRC-031"],
      },
      {
        title: "Pressure on the Netflix window",
        body:
          "Assessment. The Extended Look's value to Netflix rests on a six-hour exclusive window for the first real look at the game; unpolished footage has been circulating for nine days. Bloomberg reported no change to the plan. Some commentators argue the contrast between debug-quality clips and the finished presentation could work in Rockstar's favour; reports of Netflix's own reaction exist only as second-hand headlines and are not relied on here.",
        kind: "potential",
        sourceIds: ["LEEK-SRC-106", "LEEK-SRC-062", "LEEK-SRC-053", "LEEK-SRC-109", "LEEK-SRC-066"],
      },
      {
        title: "The marketing-stunt narrative had room to grow",
        body:
          "Theories that the leaks were a Rockstar or Take-Two marketing operation circulated by August 24, and an Infoblox researcher told CyberScoop he initially assumed the same until the legal response showed a real investigation. Eight days of silence gave that reading time to spread; it is recorded in the claim registry and treated as false on the evidence of the filings and Rockstar's statement.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-024", "LEEK-SRC-014", "LEEK-SRC-007"],
      },
    ],
  },
  {
    key: "development",
    title: "Development impact",
    intro:
      "The only inside view of Rockstar's development response is Bloomberg's August 21 reporting, relayed by GTABoom, IGN and Polygon, plus Rockstar's own statement. Everything else about what the studio must now be doing is assessment, and it is marked as such. No schedule change has been reported.",
    items: [
      {
        title: "Employee morale, in Rockstar's own words",
        body:
          "Rockstar said it would be an understatement to call the leaks heartbreaking for its team. Bloomberg reported that a senior executive emailed staff to denounce the leaker, that developers who returned to the office full time after 2022 were angry that another build had escaped, and that management was sending morale-boosting messages. Those emails are reported, not published.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-007", "LEEK-SRC-053", "LEEK-SRC-109", "LEEK-SRC-066", "LEEK-SRC-032"],
      },
      {
        title: "An all-hands internal response with no known cause",
        body:
          "Per Bloomberg, as of the afternoon of August 21 Rockstar had not identified who was behind CyberLeek or how the material got out, and the internal response was described as all hands on deck. That is the one observed fact about the investigation's state; it has not been updated publicly since.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-053", "LEEK-SRC-109", "LEEK-SRC-066", "LEEK-SRC-038"],
      },
      {
        title: "Incident-response distraction in the final stretch",
        body:
          "Assessment. An all-hands response three months before launch draws engineering, IT and leadership time away from finishing the game. Nothing in the record measures that cost, and the 2022 precedent, in which Take-Two told investors the leak caused no disruption, suggests the studio will not disclose it. The daily cadence of drops means the distraction is ongoing rather than a single event.",
        kind: "potential",
        sourceIds: ["LEEK-SRC-053", "LEEK-SRC-109", "LEEK-SRC-062", "LEEK-SRC-045"],
      },
      {
        title: "Build-security review",
        body:
          "Assessment. A review of who could reach the identified build, on which devices, and through which pipelines is the obvious next step and is what the Microsoft subpoena's request for device identifiers implies Take-Two is pursuing from the outside. No source reports the review, its scope, or any resulting change to how builds are distributed.",
        kind: "potential",
        sourceIds: ["LEEK-SRC-041", "LEEK-SRC-029", "LEEK-SRC-091", "LEEK-SRC-014"],
      },
      {
        title: "Partner review",
        body:
          "Assessment. Speculation about an outsourcing-partner origin circulated within days and a separate group attached a partner-employee claim to its own alleged material; neither is corroborated. A review of partner access is warranted precisely because the record cannot exclude it, but no source reports that one has occurred and LEEK does not treat the speculation as a lead.",
        kind: "potential",
        sourceIds: ["LEEK-SRC-085", "LEEK-SRC-062", "LEEK-SRC-072"],
      },
      {
        title: "Infrastructure investigation",
        body:
          "Assessment. Take-Two's request for Microsoft's internal investigative records on the persona shows a platform holder is investigating on its side, and the Xbox CTO's statement of close cooperation is consistent with that. Whether the leaked build ever touched Microsoft services is not established, and no source describes an investigation of Rockstar's own infrastructure beyond Bloomberg's report that the cause was unknown.",
        kind: "potential",
        sourceIds: ["LEEK-SRC-002", "LEEK-SRC-029", "LEEK-SRC-065", "LEEK-SRC-053", "LEEK-SRC-109"],
      },
      {
        title: "Possible development disruption",
        body:
          "Assessment. No delay has been reported: the November 19 date was confirmed in a July filing and Bloomberg reported no change. The actor's on-screen claim that the game is not ready at all is an actor claim with no support. Leaks of this kind have not moved GTA dates before, but a leaker who can generate new material on demand is a longer disruption than the 2022 dump was.",
        kind: "potential",
        sourceIds: ["LEEK-SRC-062", "LEEK-SRC-053", "LEEK-SRC-109", "LEEK-SRC-031", "LEEK-SRC-027", "LEEK-SRC-066"],
      },
    ],
  },
  {
    key: "legal",
    title: "Legal impact",
    intro:
      "Take-Two has moved through takedown notices to four DMCA 512(h) proceedings in the Southern District of New York within four days of the first drop. The proceedings are civil identification tools, not lawsuits against a named defendant, and no criminal investigation has been publicly confirmed. The breadth of what is sought has become an issue in its own right.",
    items: [
      {
        title: "DMCA notices from day one",
        body:
          "Takedowns were reported from August 18 and were the first signal outlets used to judge the material genuine. The notices sent to GitHub, Discord, YouTube and X are attached as exhibits to the four petitions. Re-uploads with cropped watermarks and altered audio have outpaced removals, and the map is past containment.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-034", "LEEK-SRC-026", "LEEK-SRC-002", "LEEK-SRC-004", "LEEK-SRC-068"],
      },
      {
        title: "Four subpoena petitions and what they ask for",
        body:
          "Microsoft (1:26-mc-00421) and Discord (1:26-mc-00422) were filed on August 20 and issued by Judges Rochon and Carter on August 21; Google (1:26-mc-00425, Judge Cronan) and X Corp (1:26-mc-00426, Judge Torres) followed on August 21. Per Kotaku the Microsoft subpoena seeks Microsoft's internal investigative records on the persona plus account IDs, emails, IP addresses, phone numbers, linked accounts, device identifiers (MachineGuid and MSA) and OneDrive content, and Tom's Hardware summarised it as Windows device identifiers for everyone in three Discord servers; the Discord subpoena covers all members of the listed servers since June 1, 2026. Kotaku and Notebookcheck report a September 4 compliance date for Microsoft and Discord.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-001", "LEEK-SRC-003", "LEEK-SRC-005", "LEEK-SRC-006", "LEEK-SRC-029", "LEEK-SRC-041", "LEEK-SRC-103", "LEEK-SRC-004"],
      },
      {
        title: "Judicial pushback on the Google petition",
        body:
          "On August 24 Judge Cronan declined to issue the Google subpoena on the papers, noting that Take-Two had given no information on how it identified the YouTube personas or its basis for associating them with the video at issue, and ordered prompt supplementation. It is the only instance so far of a court examining the identification method behind the requests.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-005", "LEEK-SRC-014"],
      },
      {
        title: "Platform responses",
        body:
          "Xbox CTO Scott Van Vliet said Microsoft is working closely with Take-Two and Rockstar to protect creative works; a Windows Central headline said Microsoft had been served. Discord said on August 21 that it complies with valid subpoenas and on August 24 that it had not yet been served and would weigh user privacy. Streamer DarkViperAU, whose editors' server is named, said publicly he knew nothing and that Rockstar had not contacted him.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-065", "LEEK-SRC-060", "LEEK-SRC-086", "LEEK-SRC-036", "LEEK-SRC-029"],
      },
      {
        title: "Third-party privacy exposure has become the story",
        body:
          "Malwarebytes wrote that if the platforms comply, hundreds or thousands of people with no known connection to the leaks could have identifying information handed to Take-Two; PC Gamer framed the request as IP addresses and phone numbers of thousands; CyberScoop quoted a former FBI cyber official on the breadth of the device-identifier request. The legal tool chosen to find one persona now carries a reputational cost of its own.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-013", "LEEK-SRC-036", "LEEK-SRC-014"],
      },
      {
        title: "Litigation status: identification only, so far",
        body:
          "All four matters are miscellaneous 512(h) proceedings; the Microsoft and Discord dockets were marked terminated on August 21 once the issuing orders were entered. No complaint against a named defendant, no civil action for damages, and no application for injunctive relief appears in the record, and GadgetReview noted that no filings of that kind had been reported.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-001", "LEEK-SRC-003", "LEEK-SRC-005", "LEEK-SRC-006", "LEEK-SRC-068"],
      },
      {
        title: "Criminal investigation: not publicly confirmed",
        body:
          "No agency has announced an investigation and the record contains no charging document. AS asserted that two Discord channels were under law-enforcement investigation without sourcing it; Bleap and GadgetReview discuss possible charges and referrals as hypotheticals; BigGo noted that the KYC exchange linked to the token could be subpoenaed. LEEK records the status as not confirmed.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-069", "LEEK-SRC-068", "LEEK-SRC-091", "LEEK-SRC-062"],
      },
      {
        title: "What subpoena returns could set in motion",
        body:
          "Assessment. If Microsoft and Discord produce records around September 4, and if Take-Two satisfies Judge Cronan on the Google petition, the company will hold identifying data on named accounts and on many bystanders. That is the point at which a civil action against a named defendant, a referral, or further subpoenas (a crypto exchange, per two outlets' speculation) become possible. None of that is in the record today.",
        kind: "potential",
        sourceIds: ["LEEK-SRC-068", "LEEK-SRC-005", "LEEK-SRC-013", "LEEK-SRC-062", "LEEK-SRC-065"],
      },
    ],
  },
  {
    key: "financial",
    title: "Financial impact",
    intro:
      "The measured financial effects in the record are a share-price move in the week of August 18, on which outlets disagree because they use different windows, and the actor's own token economics, which ended in a reported cash-out on August 27. Everything about sales, pre-orders and launch reception is assessment without numbers. Figures are collected separately in financialFigures with their conflicts noted.",
    items: [
      {
        title: "A share-price decline, sized differently by every outlet",
        body:
          "Finbold: 4.8 percent, $249 to $237, from August 17 to August 20. Yahoo Finance (BeInCrypto) and BigGo: about $2.83 billion of market value from $248.13 to an intraday low given as $232.84 or $231.60, in under two days, with BigGo's headline rounding to nearly $3 billion. Beebom and Insider Gaming: over $2 billion. EGW: roughly $1 billion. Windows Central: 2 percent for the week. The claim registry carries the $2.8 to 3 billion figure as disputed.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-064", "LEEK-SRC-063", "LEEK-SRC-062", "LEEK-SRC-027", "LEEK-SRC-082", "LEEK-SRC-065"],
      },
      {
        title: "Partial recovery within days",
        body:
          "TTWO closed at $240.15 on August 21, up 1.31 percent on the day, leaving about $1.5 billion of the peak-to-trough figure outstanding by BigGo's tally; EGW reported the stock back near $244 and TweakTown said shares had mostly recovered. The persistent effect is therefore smaller than the headline and was still moving when the corpus was collected.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-062", "LEEK-SRC-063", "LEEK-SRC-082", "LEEK-SRC-061"],
      },
      {
        title: "Confounders in the same week",
        body:
          "GameSpot listed other things acting on the price: CEO Strauss Zelnick's sale of about $10 million in shares, a quarterly report showing a loss of more than $30 million with net bookings down, and a stock already down more than 6 percent for the year. Finbold noted TTWO had underperformed the S&P 500 all year. Attributing the whole move to the leaks is not supported.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-027", "LEEK-SRC-064"],
      },
      {
        title: "The actor's own economics",
        body:
          "The token's nominal cap was about $1.23 million on August 20 and reportedly about $22 million at its August 23 peak; a community researcher estimated $40,000 to $60,000 in trading fees at about $4,400 a day; the site posted a 400 XMR contact fee (about $165,000 to $169,000) for advertisers; and at least one voter reportedly paid about $80 to steer a release. These are the reported figures; no official party has verified what the actor actually received.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-016", "LEEK-SRC-089", "LEEK-SRC-062", "LEEK-SRC-015", "LEEK-SRC-091", "LEEK-SRC-051", "LEEK-SRC-113"],
      },
      {
        title: "The creator wallets cashed out on August 27",
        body:
          "In the early hours of August 27, hours before the Netflix Extended Look, the wallets that created $CYBERLEEK transferred out roughly $250,000 by a GTAForums on-chain breakdown relayed by Kotaku and Dexerto, or $270,000 by CoinDesk's own reading. The token then fell about 86 percent from a $0.034 peak to under $0.005, and its cap from about $23.39 million to $3.23 million. Kotaku read the transfers as a sign the leaks could be over; Kotaku had argued six days earlier that the campaign looked like a crypto scheme built on creator fees, with about $11.8 million traded on August 18. Whether the campaign has ended is not established.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-110", "LEEK-SRC-111", "LEEK-SRC-112", "LEEK-SRC-113"],
      },
      {
        title: "Pre-order behaviour",
        body:
          "Assessment. Take-Two's CEO described an exceptional start to pre-orders in the August earnings call, before the leaks, and no post-leak pre-order data exists in the record. The 2022 leak had no reported effect on sales. The plausible directions are both open: heightened attention could lift pre-orders, and spoilers or a perception of an unfinished game could dampen them. No number is offered because none is available.",
        kind: "potential",
        sourceIds: ["LEEK-SRC-060", "LEEK-SRC-027", "LEEK-SRC-062", "LEEK-SRC-014"],
      },
      {
        title: "Review scores and launch reception",
        body:
          "Assessment. If the actor continues to release story content up to November 19, critics and players will meet parts of the game already knowing them, and comparisons between the older build and the shipped game will frame reception. There is no basis for estimating an effect on scores or sales, and the former Rockstar North technical director's view is that people will still play it.",
        kind: "potential",
        sourceIds: ["LEEK-SRC-066", "LEEK-SRC-031", "LEEK-SRC-025"],
      },
      {
        title: "Cost of the response",
        body:
          "Assessment. Legal fees across four proceedings, an all-hands internal investigation, and any security changes are real costs with no reported figure. The precedent is the 2022 incident, which Rockstar told a UK court cost it $5 million and thousands of staff hours; the BBC's combined figure across Rockstar, Uber and Nvidia was over $10 million. No comparable figure exists for this case.",
        kind: "potential",
        sourceIds: ["LEEK-SRC-091", "LEEK-SRC-014", "LEEK-SRC-099", "LEEK-SRC-053", "LEEK-SRC-109"],
      },
    ],
  },
  {
    key: "reputational",
    title: "Reputational impact",
    intro:
      "Reputation is running in two directions. Rockstar and Take-Two are being judged on security, on silence and then on the breadth of their legal response. The actor is being judged on the distance between its consumer-rights framing and its monetisation, and on the misinformation that attached itself to the persona.",
    items: [
      {
        title: "Rockstar and Take-Two: a third pre-release exposure since 2022",
        body:
          "Outlets place this campaign in a sequence with the 2022 Lapsus$ leak and the 2023 early trailer, and Malwarebytes adds the April 2026 third-party incident. DSOGaming's summary was that Rockstar's security definitely has some issues. The company's own reporting through Bloomberg, that the cause was unknown days in, did not help that reading.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-016", "LEEK-SRC-052", "LEEK-SRC-013", "LEEK-SRC-099", "LEEK-SRC-053", "LEEK-SRC-109"],
      },
      {
        title: "Silence, then a statement received as sincere",
        body:
          "Eight days without comment drew 'radio silence' headlines and room for the marketing-stunt theory. The August 26 statement was reported consistently across Mashable, Tom's Hardware, Forbes, VideoCardz, GamesHub, ComicBook.com and Kotaku, which called the apology for the lack of official information uncharacteristic. Tom's Hardware noted it avoided the leaker's demands, which some read as discipline and the actor read as provocation.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-034", "LEEK-SRC-031", "LEEK-SRC-101", "LEEK-SRC-105", "LEEK-SRC-020", "LEEK-SRC-048"],
      },
      {
        title: "Take-Two: the subpoenas' breadth as overreach",
        body:
          "A security vendor, a former FBI official and the gaming press have all framed the Discord and Microsoft requests as reaching thousands of uninvolved users, and a named streamer publicly objected to his server's inclusion. Judge Cronan's demand for an explanation on the Google petition gave that critique a judicial footnote. The identification effort is now a privacy story as much as a copyright one.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-013", "LEEK-SRC-014", "LEEK-SRC-036", "LEEK-SRC-029", "LEEK-SRC-005"],
      },
      {
        title: "Rockstar and Take-Two: what this could become",
        body:
          "Assessment. If the source is never identified, the lasting perception is of a studio that could not secure its flagship title in the final months, which matters more to partners and platform holders than to players. Against that, the former Rockstar North technical director calls the leaks a tiny blip next to Hot Coffee, and investors' partial return suggests the market agrees for now. The outcome depends on whether story content keeps coming.",
        kind: "potential",
        sourceIds: ["LEEK-SRC-066", "LEEK-SRC-062", "LEEK-SRC-014", "LEEK-SRC-053", "LEEK-SRC-109"],
      },
      {
        title: "The actor's brand: protest framing against observed monetisation",
        body:
          "Stop Killing Games rejected the tactics and urged people not to buy the token; a community researcher concluded the motive was money from day one; researchers quoted by CyberScoop described hacktivist framing with clear financial monetisation; Reddit users called paying to vote for a leak absurd. The actor's own contact fee and advertising offer sit beside a manifesto that says it is not a cash grab. The two motive claims in the registry are actor claim and probable respectively. The August 27 transfer of roughly $250,000 to $270,000 out of the creator wallets, followed by an 86 percent fall in the token, is the strongest single fact on the monetisation side and was reported that morning as a cash-out.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-011", "LEEK-SRC-016", "LEEK-SRC-033", "LEEK-SRC-014", "LEEK-SRC-051", "LEEK-SRC-015", "LEEK-SRC-110", "LEEK-SRC-111", "LEEK-SRC-112", "LEEK-SRC-113"],
      },
      {
        title: "The actor's brand: misinformation that both amplified and eroded it",
        body:
          "A fabricated dead man's switch story was published and retracted by Insider Gaming, impersonator accounts were common enough that the actor disowned all channels but one, a padded 113 GB fake ISO circulated as a build, and the BBC walked back an unsourced runtime claim. Each episode enlarged the persona's reach and each was later tied back to it as unreliable. The turn to story spoilers on August 26 drew backlash from the same communities that had cheered the gameplay clips.",
        kind: "observed",
        sourceIds: ["LEEK-SRC-044", "LEEK-SRC-089", "LEEK-SRC-042", "LEEK-SRC-054", "LEEK-SRC-016", "LEEK-SRC-031"],
      },
      {
        title: "The actor's brand: exposure by community investigation",
        body:
          "Assessment. Community researchers have published on-chain tracing to a KYC exchange and a Discord-timestamp timeline naming an account they believe is connected to the persona; Kotaku reported the hunt getting closer, and the same community produced the on-chain breakdown of the August 27 transfers within hours. LEEK treats those as community claims, not attribution. For the actor, the reputational risk is that the persona's discipline is now judged against a public paper trail rather than against Rockstar's silence.",
        kind: "potential",
        sourceIds: ["LEEK-SRC-028", "LEEK-SRC-094", "LEEK-SRC-062", "LEEK-SRC-083", "LEEK-SRC-110"],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

export const impactSectionByKey: Record<string, ImpactSection> = Object.fromEntries(
  impactSections.map((s) => [s.key, s]),
);

export const exposureByKey: Record<string, ExposureDimension> = Object.fromEntries(
  exposureSurface.map((d) => [d.key, d]),
);

export const legalActionById: Record<string, LegalAction> = Object.fromEntries(
  legalActions.map((a) => [a.id, a]),
);
