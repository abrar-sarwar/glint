/**
 * LEEK defensive recommendations.
 *
 * What Rockstar and Take-Two should do next, written as defensive guidance
 * only. Nothing here describes how CyberLeek obtained access, because the
 * public record does not establish that. Each recommendation is tied to
 * specific facts in this case through relatedIds (claim ids and source ids).
 *
 * Horizons: immediate (this week), near-term (before the 2026-11-19 launch),
 * strategic (programme changes that outlast this incident).
 */

import type { Recommendation } from "./types";

export const recommendations: Recommendation[] = [
  /* ---------------------------------------------------------------- */
  /* Immediate                                                        */
  /* ---------------------------------------------------------------- */
  {
    id: "LEEK-REC-001",
    horizon: "immediate",
    title: "Preserve evidence before it changes shape",
    action:
      "Capture and hash every public artifact as it appears: each clip, the map images, the watermark text, the poll pages, the Telegram posts, the on-chain transactions and the Arweave uploads, with timestamps. Preserve internal logs from build systems, dev-kit management, source control and file-sharing services from at least June 2026 onward under legal hold, before routine retention deletes them.",
    whyThisCase:
      "The subpoenas Take-Two filed already reach back to June 1, 2026 for Discord membership data, so internal records for the same window will be compared against whatever the platforms return. The actor's site and Telegram channel went offline on August 22 and material has been re-uploaded with cropped watermarks, so the original artifacts are already degrading. Community researchers reconstructed the release sequence from blockchain timestamps and, on August 27, traced roughly $250,000 to $270,000 leaving the token's creator wallets; Rockstar needs its own copy of that record rather than a forum's.",
    relatedIds: ["LEEK-CLM-023", "LEEK-CLM-034", "LEEK-SRC-004", "LEEK-SRC-028", "LEEK-SRC-029", "LEEK-SRC-082", "LEEK-SRC-094", "LEEK-SRC-110", "LEEK-SRC-111"],
  },
  {
    id: "LEEK-REC-002",
    horizon: "immediate",
    title: "Determine which build this is and who could reach it",
    action:
      "Match the leaked footage against the build archive to identify the exact build, branch and target platform, using in-game version strings, asset states, the radio tracks present and the UI elements visible. Then enumerate every person, machine and service that was entitled to that build at the time it was cut.",
    whyThisCase:
      "Press dating of the build ranges from 2024 or earlier (Insider Gaming, from metadata) to 2025 (Forbes; Beebom, from a January 2025 radio track), while the actor's on-screen text on August 26 called the build actually recent. A precise build identification resolves that conflict and turns an open-ended investigation into a finite list of entitled parties. Bloomberg reported on August 21 that Rockstar had not identified the leaker or the cause.",
    relatedIds: ["LEEK-CLM-001", "LEEK-CLM-005", "LEEK-SRC-025", "LEEK-SRC-043", "LEEK-SRC-045", "LEEK-SRC-031", "LEEK-SRC-053", "LEEK-SRC-109"],
  },
  {
    id: "LEEK-REC-003",
    horizon: "immediate",
    title: "Audit development-kit and console development environment access",
    action:
      "Inventory every development kit and console development account that can run pre-release builds, confirm each is where records say it is, and reconcile kit telemetry and sign-in history against the build identified in LEEK-REC-002. Treat any unaccounted kit or dormant developer account as a lead.",
    whyThisCase:
      "The LEEK wall clip on August 20 showed someone controlling the game interactively, which requires a running build on some platform. Whether that platform was a console dev kit or a PC build is unresolved and is argued both ways in the press, and the Microsoft subpoena specifically seeks records of Microsoft's own internal investigation of the persona, so the platform question is live. This audit answers it from Rockstar's side without waiting for the September 4 subpoena deadline.",
    relatedIds: ["LEEK-CLM-006", "LEEK-CLM-007", "LEEK-SRC-022", "LEEK-SRC-002", "LEEK-SRC-029", "LEEK-SRC-066", "LEEK-SRC-085"],
  },
  {
    id: "LEEK-REC-004",
    horizon: "immediate",
    title: "Audit credentials and tokens, then invalidate anything exposed",
    action:
      "Review every credential, API token, build-pipeline secret and file-sharing link that could reach pre-release builds or captured footage, with particular attention to long-lived tokens held by third-party services. Rotate anything that cannot be positively accounted for and revoke sessions on any account that shows unusual access in the June to August window.",
    whyThisCase:
      "The public record does not say how CyberLeek obtained the material, and that uncertainty is exactly why a broad rotation is warranted rather than a narrow one. Rockstar's April 2026 third-party incident involved persistent authentication tokens held by a vendor, as Malwarebytes recounted, so the organisation already has recent experience of token exposure through a partner. Any credential still valid today is a candidate for continued access, which the record has not ruled out.",
    relatedIds: ["LEEK-CLM-003", "LEEK-CLM-019", "LEEK-SRC-013", "LEEK-SRC-016", "LEEK-SRC-053", "LEEK-SRC-109"],
  },
  {
    id: "LEEK-REC-005",
    horizon: "immediate",
    title: "Investigate the distribution chain, not only the source",
    action:
      "Map how each drop moved: the dark-web forum post, the Discord relay, the Arweave uploads, the Telegram channel, the actor website and the re-upload mirrors. Record timestamps at each hop and compare them with the community timeline so counsel can show the court which accounts were first movers and which were bystanders.",
    whyThisCase:
      "A community forensic report traced the August 18 basketball clip from a dark-web forum to a Discord server and then to a blockchain upload, hours before the public drop. Take-Two's subpoenas target specific accounts and three whole servers; a documented distribution chain narrows those requests to the accounts that actually moved material first, and Judge Cronan has already asked Take-Two to explain how it identified the YouTube personas it wants to unmask.",
    relatedIds: ["LEEK-CLM-020", "LEEK-CLM-023", "LEEK-SRC-028", "LEEK-SRC-094", "LEEK-SRC-005", "LEEK-SRC-004"],
  },
  {
    id: "LEEK-REC-006",
    horizon: "immediate",
    title: "Review partner and outsourcing access to pre-release builds",
    action:
      "List every external studio, QA vendor, localisation partner, platform holder and tooling provider that received or could reach the identified build, and confirm with each what they hold, who at their end could access it, and whether their access logs show anything unusual. Do this cooperatively and quickly, without assigning blame.",
    whyThisCase:
      "Speculation that the material came through a partner studio circulated within days, and a separate group claimed on August 20 to hold internal material through a partner employee, a claim nothing in the record corroborates. The point of the review is not to chase those claims but to establish, from evidence, whether the entitled-party list in LEEK-REC-002 extends outside Rockstar. Until that is known, partner systems stay an unknown on the exposure surface.",
    relatedIds: ["LEEK-CLM-008", "LEEK-CLM-026", "LEEK-SRC-085", "LEEK-SRC-062", "LEEK-SRC-072"],
  },
  {
    id: "LEEK-REC-007",
    horizon: "immediate",
    title: "Monitor newly published material as intelligence, not only as infringement",
    action:
      "Assign a small team to examine each new drop within hours for build identifiers, UI states, mission names, and any change in platform or build age, and to record what the actor announces before each release. Feed those observations back into the build identification and the entitled-party list rather than only into takedown queues.",
    whyThisCase:
      "The cadence has been one or more clips a day since August 18, with releases steered by token-holder votes and announced in advance. The Lucia prologue on August 26 was preceded by a poll on August 24, so the actor telegraphs what is coming. Each clip is also evidence: the 'Return to Lucia' objective and the radio tracks have already narrowed the build's age in public analysis.",
    relatedIds: ["LEEK-CLM-029", "LEEK-CLM-033", "LEEK-SRC-045", "LEEK-SRC-050", "LEEK-SRC-031", "LEEK-SRC-032"],
  },
  {
    id: "LEEK-REC-008",
    horizon: "immediate",
    title: "Coordinate the platform and legal track with the technical track",
    action:
      "Keep one shared timeline between counsel, security and the platform contacts at Microsoft, Discord, Google and X, so that subpoena returns, takedown results and internal findings are compared as they arrive. Prepare for the Google supplementation ordered on August 24 with evidence from the distribution-chain work, and plan for returns arriving after the September 4 date given that Discord reported it had not yet been served.",
    whyThisCase:
      "Four 512(h) proceedings are open in S.D.N.Y. with three different judges and different states of progress: Microsoft and Discord subpoenas issued August 21, Google awaiting supplementation, and an order entered on the X Corp docket whose text is not captured. Microsoft said it is working closely with Take-Two and Rockstar. The technical and legal tracks each hold pieces the other needs.",
    relatedIds: ["LEEK-CLM-023", "LEEK-CLM-024", "LEEK-SRC-001", "LEEK-SRC-003", "LEEK-SRC-005", "LEEK-SRC-006", "LEEK-SRC-065", "LEEK-SRC-086"],
  },
  {
    id: "LEEK-REC-009",
    horizon: "immediate",
    title: "Protect employees from social engineering and harassment",
    action:
      "Warn staff that impersonation, phishing themed on the leaks, fake press requests and offers to buy footage are likely, and give them a single reporting channel. Remind them not to engage with the actor or with community investigators, and offer support to anyone whose name surfaces in speculation.",
    whyThisCase:
      "Malwarebytes found fake Extended Look and demo sites delivering an infostealer within the week, and impersonator accounts were common enough that the actor itself disowned them. The actor's August 26 on-screen text addressed Rockstar staff directly, and community identity hunts are naming Discord accounts. Rockstar's own statement said the leaks were heartbreaking for its team; that team is now a target surface as well as a victim.",
    relatedIds: ["LEEK-CLM-020", "LEEK-SRC-013", "LEEK-SRC-016", "LEEK-SRC-031", "LEEK-SRC-007", "LEEK-SRC-028"],
  },
  {
    id: "LEEK-REC-010",
    horizon: "immediate",
    title: "Communicate internally before the next external step",
    action:
      "Tell staff what is known, what is not, what the company is doing, and what they should and should not do, and repeat that update as the case moves. Say plainly that the cause is not yet established so that rumour does not fill the gap.",
    whyThisCase:
      "Bloomberg reported on August 21 that Rockstar had not identified the leaker or the cause, that staff were frustrated, and that management had sent morale emails. The public statement did not come until August 26 and did not address the demands. Developers who accepted tighter working restrictions after 2022 are reported to be angry that another build escaped; silence toward them is its own cost.",
    relatedIds: ["LEEK-SRC-053", "LEEK-SRC-109", "LEEK-SRC-066", "LEEK-SRC-077", "LEEK-SRC-007", "LEEK-SRC-101"],
  },

  /* ---------------------------------------------------------------- */
  /* Near-term                                                        */
  /* ---------------------------------------------------------------- */
  {
    id: "LEEK-REC-011",
    horizon: "near-term",
    title: "Enforce build provenance and keep a live artifact inventory",
    action:
      "Sign every build and record, per build, who requested it, which pipeline produced it, which machines and kits received it, and when it was retired. Maintain an inventory of every pre-release artifact that exists outside the build farm, including captured footage and screenshots, so that a leaked file can be traced to a copy rather than to a guess.",
    whyThisCase:
      "Identifying the leaked build has depended on press analysis of radio tracks and UI states because no public party can read a build identifier from the footage. The map that circulated on August 18 was stitched from in-game screenshots, which are artifacts too. Provenance that survives into the rendered frame is what would have shortened LEEK-REC-002 from days to hours.",
    relatedIds: ["LEEK-CLM-005", "LEEK-SRC-026", "LEEK-SRC-045", "LEEK-SRC-043"],
  },
  {
    id: "LEEK-REC-012",
    horizon: "near-term",
    title: "Tighten entitlement management for pre-release builds",
    action:
      "Move build access to explicit, time-boxed grants tied to a named need, reviewed at each milestone, with automatic expiry. Remove standing access for roles that only occasionally need a running build, and require re-approval for any access to story content and late-game areas.",
    whyThisCase:
      "The actor has been able to choose what to show, from a basketball minigame on day one to the Lucia prologue on August 26, which means access to the whole of a build rather than to a fixed set of clips. Narrower entitlements would not have stopped a copy escaping, but they would have limited what any one copy could reveal and shortened the list of who could have taken it.",
    relatedIds: ["LEEK-CLM-001", "LEEK-CLM-029", "LEEK-SRC-025", "LEEK-SRC-021", "LEEK-SRC-016"],
  },
  {
    id: "LEEK-REC-013",
    horizon: "near-term",
    title: "Replace long-lived credentials with short-lived ones",
    action:
      "Issue short-lived, automatically rotated credentials and tokens for build systems, asset stores and partner integrations, and make long-lived secrets an exception that requires approval and an owner. Extend the same rule to vendor-held tokens.",
    whyThisCase:
      "The April 2026 Rockstar incident reached Rockstar data through a vendor's persistent tokens, and the current case has no established access path, which means the organisation cannot yet say that no long-lived secret was involved. Short-lived credentials shrink the window in which any stolen secret is useful and make the question in LEEK-REC-004 answerable from logs.",
    relatedIds: ["LEEK-CLM-003", "LEEK-CLM-019", "LEEK-SRC-013"],
  },
  {
    id: "LEEK-REC-014",
    horizon: "near-term",
    title: "Bind development access to managed devices",
    action:
      "Require that pre-release builds run only on managed, attested devices and registered development kits, with access refused from unregistered hardware. Pair this with device-level logging so that a build launch can be tied to a specific machine.",
    whyThisCase:
      "Take-Two is asking Microsoft for Windows machine identifiers of everyone in three Discord servers precisely because device identity is the most useful thing it can get from outside. Rockstar can have that for its own environment by design. The unresolved PC-versus-devkit question in this case is a question about which device ran the build; device binding makes that a lookup.",
    relatedIds: ["LEEK-CLM-006", "LEEK-CLM-007", "LEEK-SRC-041", "LEEK-SRC-029", "LEEK-SRC-014"],
  },
  {
    id: "LEEK-REC-015",
    horizon: "near-term",
    title: "Improve watermarking and fingerprinting of builds and captures",
    action:
      "Embed per-recipient marks in builds and in any captured footage or screenshots, including marks that survive re-encoding, cropping and screen recording, and keep the key that maps marks to recipients under separate control. Test the marks against the re-upload techniques seen in this case.",
    whyThisCase:
      "Re-uploads of the clips have been cropped, mirrored and re-encoded to evade Content ID, and the actor overlays its own watermark advertising the token. The only marks visible to the public today are the actor's. A robust forensic mark would have identified the source copy from the first clip on August 18.",
    relatedIds: ["LEEK-CLM-004", "LEEK-SRC-077", "LEEK-SRC-014", "LEEK-SRC-016"],
  },
  {
    id: "LEEK-REC-016",
    horizon: "near-term",
    title: "Monitor for anomalous build access and bulk capture",
    action:
      "Alert on builds launched outside normal hours or locations, on unusually long sessions in story areas, on bulk screenshot or capture activity, and on transfers of build-sized files to removable media or personal cloud storage. Review those alerts daily until launch.",
    whyThisCase:
      "The map was assembled from a large number of in-game screenshots and the clips cover many distinct areas and systems, which implies sustained, deliberate capture inside a build rather than a single grab. That is a detectable pattern. Bloomberg's report that Rockstar did not know how the leak happened suggests no such signal was available after the fact.",
    relatedIds: ["LEEK-CLM-001", "LEEK-SRC-026", "LEEK-SRC-043", "LEEK-SRC-053", "LEEK-SRC-109"],
  },
  {
    id: "LEEK-REC-017",
    horizon: "near-term",
    title: "Segment developer environments by content sensitivity",
    action:
      "Separate environments that hold story content, late-game areas and unreleased technology from general development and QA environments, with distinct access, logging and network paths. Keep the most sensitive content out of broadly distributed builds until it is needed.",
    whyThisCase:
      "One copy of one build has yielded gameplay, the full map, mechanics, and now the opening prologue. The actor's poll on August 24 offered the Lucia prologue as an option, and the crowd technology shown in the beach clip drew attention as unreleased work. Segmentation would have meant that a general build did not carry the prologue at all.",
    relatedIds: ["LEEK-CLM-029", "LEEK-CLM-033", "LEEK-SRC-031", "LEEK-SRC-039", "LEEK-SRC-059"],
  },
  {
    id: "LEEK-REC-018",
    horizon: "near-term",
    title: "Review third-party access and strengthen offboarding",
    action:
      "Re-certify every external party's access to pre-release material against a current need, remove what is not justified, and make partner offboarding as rigorous as employee offboarding: return of kits, revocation of accounts and tokens, and confirmation of deletion. Apply the same rigour to contractors and departing staff.",
    whyThisCase:
      "Security researchers quoted by CyberScoop describe Take-Two's response as an insider-threat style investigation, and speculation about a partner origin has circulated without corroboration. Neither is established, but both would be closed off faster if the organisation could produce a current, complete list of who outside Rockstar holds what. Offboarding gaps are the classic way an entitled-party list quietly grows.",
    relatedIds: ["LEEK-CLM-008", "LEEK-SRC-014", "LEEK-SRC-085", "LEEK-SRC-062"],
  },

  /* ---------------------------------------------------------------- */
  /* Strategic                                                        */
  /* ---------------------------------------------------------------- */
  {
    id: "LEEK-REC-019",
    horizon: "strategic",
    title: "Plan on the assumption that unreleased assets may escape",
    action:
      "Treat every pre-release build as something that could become public, and let that assumption shape what goes into builds, how they are marked, and how marketing sequences its reveals. Keep the material that matters most for launch out of wide circulation until as late as the schedule allows.",
    whyThisCase:
      "This is the third pre-release GTA VI exposure since 2022: the 2022 Lapsus$ leak, the 2023 early trailer, and now a campaign that reached the prologue the day before the Netflix Extended Look. The former Rockstar North technical director's view that most players will not seek out clips may well be right for sales, but the marketing plan was still overtaken by someone else's schedule.",
    relatedIds: ["LEEK-CLM-018", "LEEK-SRC-066", "LEEK-SRC-031", "LEEK-SRC-099", "LEEK-SRC-106"],
  },
  {
    id: "LEEK-REC-020",
    horizon: "strategic",
    title: "Design incident response around a leaked playable build",
    action:
      "Write the response plan for the scenario in which an actor holds a running build and releases on its own timetable: who decides what to say, how build identification happens within hours, how takedowns and subpoenas are sequenced, and how the plan changes when story content appears. Exercise it before launch.",
    whyThisCase:
      "The 2022 incident was a single dump that could be fought in one wave of takedowns. This one has run for more than a week with releases chosen by token votes, a change in kind that the 2022 playbook did not anticipate. Takedowns have not kept pace with re-uploads, and the public statement came on day nine.",
    relatedIds: ["LEEK-CLM-001", "LEEK-CLM-033", "LEEK-SRC-077", "LEEK-SRC-025", "LEEK-SRC-007"],
  },
  {
    id: "LEEK-REC-021",
    horizon: "strategic",
    title: "Prepare communications playbooks for leak scenarios",
    action:
      "Pre-approve statements for the main leak scenarios (gameplay clips, map, story content, claimed build possession, claimed ongoing access) so that acknowledgement can come within a day rather than a week, and decide in advance what will not be addressed. Include guidance for staff, partners and platform holders.",
    whyThisCase:
      "Rockstar's first statement came on August 26, eight days after the first drop and a day before the Extended Look; it called the leaks heartbreaking, apologised for the wait, and did not address the actor's demands. Within hours the actor posted the Lucia prologue. Silence was read by some as confirmation and by others as a marketing stunt, and both readings had time to spread.",
    relatedIds: ["LEEK-CLM-021", "LEEK-CLM-031", "LEEK-SRC-007", "LEEK-SRC-101", "LEEK-SRC-024", "LEEK-SRC-048"],
  },
  {
    id: "LEEK-REC-022",
    horizon: "strategic",
    title: "Reduce blast radius and formalise partner trust boundaries",
    action:
      "Limit how much of the game any single build, account, kit or partner can expose, and define explicit trust boundaries with each external party: what they receive, in what form, for how long, and what they must attest to. Make the boundary contractual and technical, not only contractual.",
    whyThisCase:
      "A single leaked build has exposed the whole map, a wide set of mechanics and the prologue, and the record still cannot say whether the copy came from inside Rockstar or from a partner. Malwarebytes' account of the April 2026 vendor-token incident shows that Rockstar's data already sits behind partner controls it does not operate. Blast-radius limits are what make the difference between one build escaping and the game escaping.",
    relatedIds: ["LEEK-CLM-008", "LEEK-CLM-019", "LEEK-SRC-013", "LEEK-SRC-043", "LEEK-SRC-085"],
  },
  {
    id: "LEEK-REC-023",
    horizon: "strategic",
    title: "Build lasting detection for abnormal artifact access",
    action:
      "Instrument asset stores, build distribution and capture tooling so that access to pre-release artifacts is logged centrally and reviewed against baselines, and keep that capability funded after this incident closes. Measure it by whether the next unusual access is noticed before it is published.",
    whyThisCase:
      "Community researchers dated the campaign's infrastructure to August 14 and 15 and the first uploads to August 16 and 17, days before Rockstar or the public saw anything. The gap between capture and publication is where detection has value, and in this case it appears to have passed unobserved. Bloomberg's report that the cause was unknown on August 21 is the clearest measure of the current gap.",
    relatedIds: ["LEEK-CLM-034", "LEEK-SRC-026", "LEEK-SRC-094", "LEEK-SRC-053", "LEEK-SRC-109"],
  },
  {
    id: "LEEK-REC-024",
    horizon: "strategic",
    title: "Run leak-response tabletop exercises",
    action:
      "Exercise the leaked-build scenario at least once per major title cycle with security, legal, communications, studio leadership and platform-holder contacts, using this case as the script: a drip-fed release, token-steered content votes, a story leak timed to a reveal, and subpoenas that reach thousands of uninvolved users. Record what the exercise changes.",
    whyThisCase:
      "This campaign combined a running build, a monetisation loop, a manifesto, a fabricated dead man's switch story that a major outlet had to retract, and legal discovery broad enough that a security vendor warned about the privacy of thousands of Discord users. No team responds well to that combination without having rehearsed it. The exercise script is already written in the public record.",
    relatedIds: ["LEEK-CLM-012", "LEEK-CLM-013", "LEEK-CLM-033", "LEEK-SRC-044", "LEEK-SRC-013", "LEEK-SRC-014"],
  },
];

export const recommendationById: Record<string, Recommendation> = Object.fromEntries(
  recommendations.map((r) => [r.id, r]),
);

export const recommendationsByHorizon = {
  immediate: recommendations.filter((r) => r.horizon === "immediate"),
  "near-term": recommendations.filter((r) => r.horizon === "near-term"),
  strategic: recommendations.filter((r) => r.horizon === "strategic"),
};
