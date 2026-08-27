# LEEK

A living, evidence-driven case file on the CyberLeek campaign against Grand Theft Auto VI: what happened, what the public evidence proves, and what remains unknown.

![Next.js 14](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8) ![TLP:CLEAR](https://img.shields.io/badge/TLP-CLEAR-6fb083) ![intel:validate](https://img.shields.io/badge/intel%3Avalidate-passing-6fb083) ![License: MIT](https://img.shields.io/badge/License-MIT-blue)

LEEK is an open-source intelligence research project. It is not a leak mirror, not a fan site, and not a detection product. It records the campaign the way an intelligence team would: every claim has a status, every fact has a source, and the things nobody knows are written down as findings rather than filled in with guesses. The case file is at `/data`; the web app at `npm run dev` is the reading surface.

Case status as of 2026-08-27: **active**. Initial access: **unknown**. Attribution: **unresolved**. Latest verified event: Rockstar's statement of 2026-08-26. Latest reported event: the token cash-out of 2026-08-27.

Citations in this README use the case file's source ids (`[S001]`); the registry is in `data/sources.ts` and summarised under [Sources](#sources).

## Current Assessment

Since 2026-08-18, an unidentified person or group using the name CyberLeek has published short gameplay clips, a stitched full map, and, from 2026-08-26, prologue story footage from an unreleased Grand Theft Auto VI development build [S026] [S045] [S021]. Take-Two has treated the material as its copyrighted work: it issued takedowns from the first day and, on 2026-08-20 and 2026-08-21, filed four DMCA subpoena petitions in the Southern District of New York against Microsoft, Discord, Google, and X Corp [S001] [S003] [S005] [S006]. Rockstar acknowledged the leaked gameplay videos in a statement on 2026-08-26 [S007].

The public record supports, at high confidence, that CyberLeek had interactive control of a development build at least as recent as 2025. The decisive evidence is a clip of 2026-08-20 in which the player fires bullets into a wall until they spell LEEK, which cannot be done with a library of recorded video [S022] [S025]. In-game music released in January 2025 sets a floor on the build's age [S026].

How that build was obtained is not established anywhere in the record. No filing, company statement, or credible report explains it, and Bloomberg reported on 2026-08-21 that Rockstar itself had not identified the leaker or the cause [S109] [S053]. LEEK records initial access as UNKNOWN and treats that as the case's central finding. Attribution is likewise unresolved: the only named handles are discovery targets in Take-Two's petitions and a community forensic theory, none of which is authoritative.

The campaign has a pronounced information component: a consumer-rights manifesto, a Solana token whose holders vote on the next clip, ultimatums to Rockstar, and a media cycle that briefly carried a dead man's switch story its own outlets withdrew. Separating what CyberLeek did from what was said about CyberLeek is most of the analytic work here.

## What Happened

- **2026-08-14 to 08-17 (community claims).** Forum researchers date CyberLeek's domain registrations to August 14, the token, liquidity pool, site, and voting program to August 15, a partial map image to August 16, and a dark-web post of the basketball clip to August 17 [S094] [S096] [S026]. These reconstructions agree with each other but rest on community analysis and are graded accordingly.
- **2026-08-18.** First public drops: the Basketball clip, Random Video 1, and a full map of Leonida, accompanied by the "CYBERLEEK Edict" manifesto [S026] [S016]. Take-Two's takedowns began the same day [S026].
- **2026-08-19 to 08-25.** New clips most days (Taser, Junkies, Plane Day, Hypercar 1 and 2, Strip Club, Gas, Plane Night, Nudist Town, nightclub, beach, game store), several chosen by token vote [S045] [S017]. Stop Killing Games rejected the tactics on 2026-08-19 [S011].
- **2026-08-20 and 08-21.** Take-Two filed DMCA 512(h) petitions against Microsoft and Discord (08-20) and Google and X Corp (08-21). Judges ordered the Microsoft and Discord subpoenas issued on 08-21 [S001] [S003] [S005] [S006].
- **2026-08-22 and 08-23.** A fabricated "dead man's switch" threat spread and was retracted by Insider Gaming on 08-23; the BBC walked back an unsourced runtime claim the same day [S044] [S054]. CyberLeek's site and Telegram went offline on 08-22 and drops resumed on 08-23 [S038] [S082] [S046].
- **2026-08-24.** Judge Cronan sent the Google petition back for more information on how Take-Two identified the YouTube personas [S005].
- **2026-08-25.** Discord said it had not yet been served [S086]. Security researchers warned about the breadth of the subpoenas and about scam sites riding the campaign [S013] [S014].
- **2026-08-26.** Rockstar posted its first statement, calling the leaks heartbreaking for its team [S007] [S102]. Hours later CyberLeek posted about four and a half minutes of Lucia prologue footage, the first story spoilers [S021] [S031].
- **2026-08-27.** In the early hours, wallets tied to the token creator moved out roughly $250,000 to $270,000 and $CYBERLEEK fell about 86 percent from its peak; Kotaku and Dexerto read it as the end of the campaign, which LEEK records as unresolved [S110] [S111] [S112]. A viral arrest claim earlier in the week was false: the actor kept publishing [S114].
- **Next known checkpoints.** Rockstar's official Extended Look premieres on Netflix on 2026-08-27 at 15:00 ET [S106]; the Microsoft and Discord subpoenas reportedly set 2026-09-04 for compliance [S029] [S103]; GTA VI launches 2026-11-19 [S007].

## What CyberLeek Appears to Have

| Claim | Status | Basis |
| --- | --- | --- |
| A playable GTA VI development build | probable (high confidence) | The LEEK wall clip requires live control; Bloomberg's sources describe a working build; Rockstar's statement acknowledges the leaked gameplay without authenticating each clip [S022] [S025] [S007] |
| Authentic development content | probable (high confidence) | Sworn DMCA petitions treat the material as Take-Two's copyrighted work; the community map matches years of reconstruction; takedowns from day one [S002] [S004] [S023] |
| A build dating from 2025 or later | probable (moderate confidence) | A track released in January 2025 plays in the Taser clip; insiders describe the build as a year or more old; the actor says it is recent [S026] [S043] |
| Story content beyond gameplay | probable (high confidence) | The Lucia prologue clip of 2026-08-26, described by five outlets [S021] [S031] [S047] [S048] |
| The complete retail game | unresolved (low confidence) | Only the actor and a fake ISO suggest it; the actor has also said the game is not ready [S042] [S016] |
| Continuing live access | unresolved (unknown) | New material shows continued possession, not continued access [S053] |
| The campaign has ended | unresolved (low confidence) | Declared over on 2026-08-22 (drops resumed next day) and again after the 2026-08-27 cash-out; not established [S110] [S038] [S046] |

## What Is Still Unknown

1. **Actor identity.** No authoritative attribution exists. Handles named in subpoena petitions are targets of discovery, not findings [S002] [S004].
2. **Initial access mechanism.** Nothing in the record explains how the build was obtained. Competing readings (console development kit, PC build, an outsourcing partner, reuse of earlier stolen material) are all speculation or unresolved [S085] [S078] [S016].
3. **Whether build access remains active.** Unknown.
4. **Volume of material.** Only what has been published is known.
5. **Whether more unreleased material exists.** The actor's promises are not evidence.
6. **Provenance of every circulated clip.** Reuploads, edits, AI fakes, and a separate map leaker complicate attribution of individual clips [S072] [S042].

## Campaign Timeline

Dates are when the event occurred. Where the earliest reporting came later, the reported date is shown. Community-reconstructed dates are marked as such. The full 55-event ledger with sources is at `/timeline`.

| Occurred | Event | Confidence |
| --- | --- | --- |
| 2026-08-14 | Domains registered (community reconstruction; reported 08-24) | moderate, community claim |
| 2026-08-15 | $CYBERLEEK token, pool, site and voting created (community; reported 08-24) | moderate, community claim |
| 2026-08-17 | Basketball clip posted to a dark-web forum (community; reported 08-25) | low, community claim |
| 2026-08-18 | First public drops: Basketball, Random Video 1, full map. Edict published. Takedowns begin | high |
| 2026-08-19 | Taser and Junkies clips; Stop Killing Games distances itself; token polls begin; GitHub takedown notice (reported 08-22) | high |
| 2026-08-20 | Plane (Day) clip with the LEEK wall; ultimatum to Rockstar; Telegram statement on official channels; token at about $1.23M cap; Microsoft and Discord petitions filed (reported 08-21) | verified (petitions), high (clip) |
| 2026-08-21 | Orders issue the Microsoft and Discord subpoenas; Google and X Corp petitions filed (reported 08-23); Microsoft and Discord statements; Hypercar Part 1; 400 XMR "contact fee" posted; Bloomberg: Rockstar has no attribution and no known cause (reported 08-22) | verified (orders) |
| 2026-08-22 | Site and Telegram offline; Hypercar Part 2 and Strip Club; fabricated dead man's switch threat spreads | high |
| 2026-08-23 | Insider Gaming retracts; BBC walks back; fake 113 GB ISO identified as malware; Gas clip (Wasted screen); token all-time high; Plane (Night) | high |
| 2026-08-24 | Nudist Town clip and Lucia poll; Judge Cronan memo endorsement on the Google petition; order entered on the X Corp docket; marketing-stunt theories | verified (court) |
| 2026-08-25 | Three clips in a day; community forensic report on a Discord account; Discord says not served; security researchers publish analysis | high |
| 2026-08-26 | Rockstar statement on X; police-chase clip with a Lucia cutscene; Lucia prologue footage on Telegram | verified (statement), high |
| 2026-08-27 | Token creator wallets withdraw about $250,000 to $270,000; $CYBERLEEK down about 86 percent from peak | moderate |
| 2026-08-27 | Netflix Extended Look, 15:00 ET (scheduled checkpoint) | scheduled |
| 2026-09-04 | Reported compliance date for the Microsoft and Discord subpoenas (checkpoint) | reported |
| 2026-11-19 | GTA VI launch (checkpoint) | confirmed |

## The GTA VI Material

Eighteen releases are indexed at `/drops` with what each shows, what it reveals, its authenticity grade, and takedown status. LEEK stores descriptions and analysis only; it does not link to or host the footage.

| Date | Reported title | What it established |
| --- | --- | --- |
| 08-18 | Basketball; Random Video 1; full map | Focus meter, improvised weapons, a stitched state map that matched community reconstruction |
| 08-19 | Taser; Junkies | Six-star wanted level, drug effects, key cloning, vehicle health and fuel; January 2025 music dates the build |
| 08-20 | Plane (Day) | Radio stations in flight, then the LEEK wall: interactive control of a running build |
| 08-21 to 08-22 | Hypercar Part 1 and 2; Strip Club | Vehicle repair and refuelling, store robberies, dense interior crowds |
| 08-23 | Gas; Plane (Night) | The Wasted screen, a "Return to Lucia" objective, night-time Vice City |
| 08-24 to 08-25 | Nudist Town; nightclub; beach cycling; game store | Crowd technology, day-night cycle, a store selling physical discs (the actor's chosen irony) |
| 08-26 | Hotrod chase with Lucia cutscene; Lucia prologue | Story content; the first spoilers |

## The Manifesto

The "CYBERLEEK Edict" accompanied the first drop. Its three commandments, as reported: no digital pre-orders, no paid unlocks of single-player content already on disc, and preserve single-player content when servers close [S026] [S016]. Its clearest argument is that pre-orders existed because discs had manufacturing limits and serve no customer purpose for a download that cannot sell out; GTA VI ships without a physical disc. Later watermarks read "No physical discs? Then more leeks!" [S016]. The consumer campaign Stop Killing Games, whose preservation argument overlaps with the Edict, rejected the tactics on 2026-08-19: "Using illegal means to make a point is unacceptable to us" [S011]. LEEK records the manifesto as an actor claim about motive; the token, the contact fee, and the vote-to-leak mechanism are the evidence weighed against it.

## $CYBERLEEK

A Solana memecoin launched around the campaign's start (community timelines say 2026-08-15) [S096]. On 2026-08-20 Mashable recorded a price of about $0.001227, a nominal market capitalisation of about $1.23 million, about $198,000 in liquidity, $3.89 million in volume, and the ten largest wallets holding 51.6 percent of supply [S016]. Outlets reported a 1,400 percent rally to an all-time high around 2026-08-23 and a retreat by 08-26 [S089] [S088] [S087]. Token holders vote on the next clip by sending tokens to an option; the plane clip won its poll with 64.4 percent of tokens sent, and later polls picked Nudist Town and the Lucia prologue [S016] [S045]. A "contact" offer priced at 400 XMR (reported as about $165,000 to $169,000 depending on the day's rate) sold placements in future leaks [S015] [S091]. The actor says the token is "not a cash grab"; the registry marks the profit-motive claim as disputed rather than decided [S016]. In the early hours of 2026-08-27, wallets tied to the creator moved out close to $250,000 by a community on-chain breakdown, or about $270,000 by CoinDesk's reading, and the token fell about 86 percent from its $0.034 peak, with market cap dropping from about $23.39 million to $3.23 million [S110] [S111] [S112]. Kotaku had argued on 2026-08-21 that creator fees on every trade made the campaign look like a crypto scheme [S113]. A withdrawal of proceeds is not evidence about the build; the "campaign is over" reading stays unresolved.

## The Dead Man's Switch Claim

On 2026-08-22 a claim spread that CyberLeek had a dead man's switch and would release the full build "to millions" if arrested or if the actor disappeared. It reached gaming outlets, aggregators, and creator channels within a day. On 2026-08-23 Insider Gaming redacted its report, stating that the image it rested on was fabricated, and GTABoom documented the BBC walking back unverified claims the same day; Happy Mag and Express reported it as fake on 08-24 [S044] [S054] [S080] [S058]. Nothing on CyberLeek's own channels authenticated the claim, and the actor's contemporaneous statement disowned impersonator accounts [S009]. The registry marks the switch claim and the "release to millions" claim as retracted and keeps their history. The case study at `/dead-mans-switch` renders the propagation chain step by step: origin, amplification, media, creators, community, challenge, correction, current assessment. The point of the exercise is that actor activity and narrative activity are different things, and a company can be affected by the second without any further compromise.

## Media Amplification

Coverage moved along a repeatable path: actor publication (site, Telegram, blockchain uploads), community repost within hours (Discord, Reddit, X), creator coverage, gaming press, mainstream and financial press, then correction or confirmation. `/media` tracks the coverage and groups it into narrative clusters, each tied to the claim underneath it and graded by whether that claim is verified, unverified, disputed, or retracted. Narratives that did not survive contact with the evidence include the dead man's switch, "the leaks are over" (drops resumed the day after the site outage), a genuine "GTA VI ISO" (padded malware), and an exact leak schedule (denied by the actor and traced to impersonators) [S044] [S038] [S042] [S009]. Narratives that hold include the playable build and the legal action. The marketing-stunt theory remains speculation; sworn filings and Rockstar's statement weigh against it, but it is unfalsifiable [S024].

## Rockstar / Take-Two Response

Take-Two issued DMCA takedowns from 2026-08-18 and sent GitHub a notice on 2026-08-19 that later became an exhibit [S002]. Bloomberg reported on 2026-08-21 that Rockstar had not identified the leaker or the cause and that staff were frustrated [S109] [S053]. Rockstar's only public statement came on 2026-08-26, posted to its X account: "It would be an understatement to say that having videos of Grand Theft Auto VI gameplay leak in this way has been heartbreaking for our team, and this is obviously not how we intended for you to see the game after all this time." It asked players to wait for the game on November 19 and did not address the actor's demands [S007] [S102] [S101]. The Extended Look on Netflix went ahead as scheduled for 2026-08-27 [S106].

## Legal Proceedings

All four actions are miscellaneous DMCA 512(h) proceedings in the U.S. District Court for the Southern District of New York, filed by Kirkland & Ellis for Take-Two Interactive Software, Inc. No lawsuit against a named defendant and no criminal investigation is in the public record.

| Case | Respondent | Filed | Status |
| --- | --- | --- | --- |
| 1:26-mc-00421 | Microsoft Corporation (GitHub) | 2026-08-20 | Order directing the clerk to issue the subpoena signed by Judge Jennifer L. Rochon, 2026-08-21 [S001] [S002] |
| 1:26-mc-00422 | Discord, Inc. | 2026-08-20 | Order signed by Judge Andrew L. Carter, Jr., 2026-08-21; Discord said on 08-24/25 it had not yet been served [S003] [S004] [S086] |
| 1:26-mc-00425 | Google LLC (YouTube) | 2026-08-21 | Memo endorsement by Judge John P. Cronan, 2026-08-24: Take-Two must explain how it identified the personas before a subpoena issues [S005] |
| 1:26-mc-00426 | X Corp. | 2026-08-21 | Assigned to Judge Analisa Torres; an order was entered 2026-08-24 [S006] [S014] |

The Microsoft petition names a GitHub repository; the Discord petition names specific accounts and two servers [S002] [S004]. Reporting on the exhibits says the subpoenas seek account data, IP addresses, and device identifiers with a 2026-09-04 return date, and privacy researchers noted they could reach data on thousands of ordinary Discord users [S029] [S041] [S013] [S036].

## Exposure Assessment

The exposure surface at `/impact` grades twelve dimensions with one of five statuses (no public evidence, possible, partially exposed, publicly demonstrated, unknown). It is not a rate, and no dollar value is attached to intellectual property.

| Dimension | Status |
| --- | --- |
| Unreleased gameplay | publicly demonstrated |
| Game map | publicly demonstrated |
| Mechanics | publicly demonstrated |
| Playable build | partially exposed (live control shown; who holds the build, on what platform, and whether it persists are not established) |
| Narrative | partially exposed (prologue, from 2026-08-26) |
| Development timeline | partially exposed (build age) |
| Marketing plan | possible (reveal control lost before the Extended Look) |
| Credentials | unknown |
| Partner systems | unknown |
| Source code | no public evidence |
| Internal infrastructure | no public evidence |
| Employee data | no public evidence |

## Business Impact

Observed: Take-Two's share price fell after the leaks began; outlets reported the decline as anywhere from about $1 billion to $2.83 billion in market value (Yahoo Finance, BigGo "nearly $3 billion"), with Finbold measuring 4.8 percent over the week [S063] [S062] [S064] [S027]. Whether the leaks caused the move is an inference the outlets themselves make with varying care, and a former Rockstar developer called the leaks a "nothing burger" for the business [S066]. Rockstar's reveal was pre-empted, its first public statement was forced, and its team's morale was, in its own words, hurt [S007]. Potential: spoiler fatigue before launch, review and pre-order effects, incident-response and partner-review cost, and build-security changes. None of the potential items carries a number, because none has one in the record.

## What Rockstar Should Do Next

`/response` lists 24 defensive recommendations in three horizons, each with a "why this matters in this case" tied to a fact in the record. In brief: preserve evidence and determine the build's provenance (the LEEK wall clip shows a running build that someone possessed, and the music places it in 2025 or later); audit development-kit, partner, and contractor access and invalidate anything exposed; watch published material for build markers; coordinate the platform and legal track so that discovery targets the right accounts (the Google petition was sent back for exactly this reason); and protect staff from the social engineering that follows public campaigns. Near-term: build provenance and watermarking that survives re-encoding, short-lived and device-bound development credentials, anomalous artifact-access monitoring, segmented developer environments, and a third-party access review. Strategic: assume unreleased assets can escape and rehearse the response, including the communications playbook that took eight days to produce here.

## Intelligence Gaps

- How the build was obtained, and on what platform it runs.
- Who CyberLeek is, and whether it is one person or several.
- Whether any live access persists, and how much material remains unpublished.
- Whether the X Corp subpoena issued and what Take-Two filed in response to Judge Cronan.
- Anything from Discord dated after 2026-08-24, and whether Microsoft has produced records.
- Whether the captured cyber-leek.online page is the actor's site or an impersonation (two reviews concluded the latter; it is not cited for the real site's content).
- The origin of the fabricated dead man's switch image.

## Methodology

1. Every record is one of the typed objects in `data/types.ts` and carries at least one source id. `npm run intel:validate` fails the build on an uncited fact, an unresolved id, a retracted claim without history, an out-of-order timeline, a duplicate source, a graph edge without provenance, a direct link to circulated material, or an em-dash.
2. Event date is the date the thing happened. Article date is stored separately as `reportedAt`.
3. Claims carry one of eight statuses and a rationale that says why. Status changes append to history; nothing is edited away.
4. The campaign graph draws only chronology unless a source is explicit about causation; the first edge is an "unknown link".
5. Initial access is never assigned a mechanism or a MITRE technique without primary evidence. Sparse coverage is the honest answer.
6. No personal details of any suspected individual are recorded. Handles appear only as they appear in filings or major reporting.
7. When sources conflict on a date, count, or figure, the record keeps the best-supported value and writes the disagreement into the text.

## Source Reliability

Sources are tiered by distance from the fact (tier 1 strongest): court filings; Rockstar statements; Take-Two statements; platform statements; CyberLeek's own statements (as actor claims); investigative journalism; established gaming journalism; security researchers; public blockchain data; community research; social posts. Evidence records are additionally graded A to E. Community research was decisive for the pre-launch timeline and the map corroboration, and it is labelled as community research throughout.

## Sources

113 sources: 6 court records, 1 Rockstar statement, 1 actor site capture (flagged as a possible impersonation), 14 investigative, mainstream, or specialist financial pieces, 77 gaming, tech, and financial press pieces, 2 security-research pieces, 1 blockchain data page, 4 community-research threads, and 8 social posts. The full registry with reliability notes and verbatim excerpts is at `/sources`. Primary records:

- In re DMCA Subpoena to Microsoft Corporation, No. 1:26-mc-00421 (S.D.N.Y.), docket and petition via CourtListener/RECAP [S001] [S002]
- In re DMCA Subpoena to Discord, Inc., No. 1:26-mc-00422 (S.D.N.Y.) [S003] [S004]
- In re DMCA Subpoena to Google LLC, No. 1:26-mc-00425 (S.D.N.Y.) [S005]
- In re DMCA Subpoena to X Corp., No. 1:26-mc-00426 (S.D.N.Y.) [S006]
- Rockstar Games statement, posted to @RockstarGames on X, 2026-08-26 [S007]
- Stop Killing Games statement, 2026-08-19 [S011]
- Mashable, "What is CyberLeek? Everything we know about the alleged GTA 6 leakers", 2026-08-20 [S016]
- GameSpot, "GTA 6 Leaks: A Timeline Of The Events So Far" [S026]
- Kotaku, "Take-Two Subpoenas Microsoft And Discord Over GTA 6 Leaks" [S029]
- Insider Gaming redaction notice, 2026-08-23 [S044]
- Malwarebytes Labs and CyberScoop analyses, 2026-08-25 [S013] [S014]

## Running LEEK

```bash
git clone https://github.com/abrar-sarwar/leek.git
cd leek
npm install
npm run dev
```

Open http://localhost:3000. No backend, no database, no environment variables. Global search is Cmd/Ctrl+K.

```bash
npm run lint && npm run typecheck && npm run build
npm test                 # vitest: integrity, search, utils, pipeline
npm run intel:validate   # integrity checks; non-zero exit on any violation
npm run intel:report     # status block
```

## Updating Intelligence

`npm run intel:update` searches public feeds (Google News RSS, Bing News RSS, the GDELT DOC API, and the CourtListener REST API) for the campaign's terms, normalises and de-duplicates what it finds against the registry, applies rule-based entity, claim, category, and reliability tagging, and writes the result to `data/generated/` as pending intelligence. With an `ANTHROPIC_API_KEY` it also asks Claude to classify items, with the hard constraint that no item can be marked supported. Everything lands as "needs analyst review"; promoting an item into the typed case file is a human edit with a source id and a claim status. The GitHub Actions workflow in `.github/workflows/intel-update.yml` runs the pipeline every six hours and on demand, then runs `intel:validate` before committing.

## License

MIT.

## Author

Abrar Tahir Sarwar. [GitHub](https://github.com/abrar-sarwar) · [LinkedIn](https://www.linkedin.com/in/abrar-sarwar).
