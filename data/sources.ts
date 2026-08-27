/**
 * LEEK source registry.
 *
 * One Source per registry row, in id order. Ids are fixed
 * (LEEK-SRC-001 .. LEEK-SRC-108, with no LEEK-SRC-107).
 *
 * Conventions used in this file:
 * - retrievedDate 2026-08-26 for anything captured in the local research
 *   corpus, 2026-08-27 for anything fetched on 2026-08-27.
 * - primary is true for tiers 1 to 5, and for a tier 6 to 8 outlet only
 *   where that outlet is the original reporter of the fact.
 * - excerpt is a short verbatim quote copied from the captured body.
 * - reliabilityNotes flags approximate publication dates, syndication,
 *   relayed actor claims, and later corrections.
 * - claimsSupported and claimsContradicted are derived elsewhere.
 */

import type { Source, SourceTier } from "./types";

export const sources: Source[] = [
  /* ---------------------------------------------------------------- */
  /* Tier 1: court filings                                             */
  /* ---------------------------------------------------------------- */
  {
    id: "LEEK-SRC-001",
    publisher: "U.S. District Court, S.D.N.Y. (via CourtListener/RECAP)",
    title:
      "In re DMCA Subpoena to Microsoft Corporation, No. 1:26-mc-00421 (S.D.N.Y.) docket",
    url: "https://www.courtlistener.com/docket/74679284/in-re-take-two-interactive-software-inc/",
    publishedDate: "2026-08-20",
    eventDate: "2026-08-21",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 1,
    type: "court-filing",
    reliabilityNotes:
      "Federal docket sheet as mirrored by CourtListener from PACER through the RECAP project. Entries are clerk and judge text, not journalism. The request was filed 2026-08-20 by Kirkland & Ellis (Dale Cendali) and Judge Jennifer L. Rochon signed the order directing the clerk to issue the subpoena on 2026-08-21; the case was terminated the same day.",
    status: "active",
    excerpt:
      "ORDERED that the clerk of this Court shall issue the Subpoena for Microsoft Corporation as sought by the petitioner. (And as further set forth herein.) (Signed by Judge Jennifer L. Rochon on 8/21/2026)",
  },
  {
    id: "LEEK-SRC-002",
    publisher:
      "Take-Two Interactive Software, Inc. (Kirkland & Ellis LLP), S.D.N.Y. filing",
    author: "Dale M. Cendali and Joshua L. Simmons, Kirkland & Ellis LLP",
    title:
      "Request to the Clerk for Issuance of a DMCA Subpoena to Microsoft Corporation (Doc. 1), No. 1:26-mc-00421",
    url: "https://storage.courtlistener.com/recap/gov.uscourts.nysd.671027/gov.uscourts.nysd.671027.1.0.pdf",
    publishedDate: "2026-08-20",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 1,
    type: "court-filing",
    reliabilityNotes:
      "Petitioner's own filing, a RECAP copy of the PACER document. It states Take-Two's position under 17 U.S.C. 512(h) and identifies GitHub (a Microsoft subsidiary) as the service provider for the repository at issue. It is a party submission, not a court finding.",
    status: "active",
    excerpt:
      "Github is the service provider of a website with the URL https://github.com/zyrexdz/cyberleek-leak-research to which the infringing content was posted.",
  },
  {
    id: "LEEK-SRC-003",
    publisher: "U.S. District Court, S.D.N.Y. (via CourtListener/RECAP)",
    title:
      "In re DMCA Subpoena to Discord, Inc., No. 1:26-mc-00422 (S.D.N.Y.) docket",
    url: "https://www.courtlistener.com/docket/74681114/in-re-take-two-interactive-software-inc/",
    publishedDate: "2026-08-20",
    eventDate: "2026-08-21",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 1,
    type: "court-filing",
    reliabilityNotes:
      "Federal docket sheet as mirrored by CourtListener from PACER through the RECAP project. Filed 2026-08-20; Judge Andrew L. Carter, Jr. signed the order directing the clerk to issue the subpoena on 2026-08-21. Exhibit 1 to the Cendali declaration is the set of DMCA takedown notices sent to Discord.",
    status: "active",
    excerpt:
      "ORDERED that the clerk of this Court shall issue the Subpoena for Discord, Inc. as sought by the petitioner. (Signed by Judge Andrew L. Carter, Jr on 8/21/2026)",
  },
  {
    id: "LEEK-SRC-004",
    publisher:
      "Take-Two Interactive Software, Inc. (Kirkland & Ellis LLP), S.D.N.Y. filing",
    author: "Dale M. Cendali and Joshua L. Simmons, Kirkland & Ellis LLP",
    title:
      "Request to the Clerk for Issuance of a DMCA Subpoena to Discord, Inc. (Doc. 1), No. 1:26-mc-00422",
    url: "https://storage.courtlistener.com/recap/gov.uscourts.nysd.671042/gov.uscourts.nysd.671042.1.0.pdf",
    publishedDate: "2026-08-20",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 1,
    type: "court-filing",
    reliabilityNotes:
      "Petitioner's own filing, a RECAP copy of the PACER document. It names Discord accounts CYBERLEEK, CINEMATICROCKSTAR and Surfer24k (with replacement handles cyberleek_west and surwest) and two community servers. The accounts are named as alleged infringers by the petitioner; the filing does not establish who operates them.",
    status: "active",
    excerpt:
      "Infringing content was posted on the Discord Server, which is believed to be associated with the following Discord accounts and community servers: CYBERLEEK, Discord User ID 532773089466122241; CINEMATICROCKSTAR, Discord User ID 1183522740725108736",
  },
  {
    id: "LEEK-SRC-005",
    publisher: "U.S. District Court, S.D.N.Y. (via CourtListener/RECAP)",
    title:
      "In re DMCA Subpoena to Google LLC, No. 1:26-mc-00425 (S.D.N.Y.) docket",
    url: "https://www.courtlistener.com/docket/74687090/in-re-take-two-interactive-software-inc/",
    publishedDate: "2026-08-21",
    eventDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 1,
    type: "court-filing",
    reliabilityNotes:
      "Federal docket sheet as mirrored by CourtListener from PACER through the RECAP project. Filed 2026-08-21 by Rachel Bandli. On 2026-08-24 Judge John P. Cronan entered a memo endorsement asking how Take-Two identified the YouTube personas and ordering it to supplement; as of the capture no subpoena had issued in this matter.",
    status: "active",
    excerpt:
      "Petitioner has not provided any information as to how it identified the online personas that it seeks to subpoena from Google, including its basis for believing that those users are associated with the posting of https://www.youtube.com/watch?v=wNf2bqfJtNo.",
  },
  {
    id: "LEEK-SRC-006",
    publisher: "U.S. District Court, S.D.N.Y. (via CourtListener/RECAP)",
    title: "In re DMCA Subpoena to X Corp., No. 1:26-mc-00426 (S.D.N.Y.) docket",
    url: "https://www.courtlistener.com/docket/74687135/in-re-take-two-interactive-software-inc/",
    publishedDate: "2026-08-21",
    eventDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 1,
    type: "court-filing",
    reliabilityNotes:
      "Federal docket sheet as mirrored by CourtListener from PACER through the RECAP project. Filed 2026-08-21 by Rachel Bandli and assigned to Judge Analisa Torres; an order (Doc. 5) is dated 2026-08-24 but its text is not reproduced on the docket capture. Exhibit 1 to the declaration is the DMCA takedown notice to X Corp.",
    status: "active",
    excerpt:
      "MISCELLANEOUS CASE INITIATING DOCUMENT - REQUEST FOR ISSUANCE OF DIGITAL MILLENNIUM COPYRIGHT ACT SUBPOENA as to X Corp.. (Filing Fee $ 52.00, Receipt Number ANYSDC-33326685)Document filed by Take-Two Interactive Software, Inc.",
  },

  /* ---------------------------------------------------------------- */
  /* Tier 2: Rockstar statements                                       */
  /* ---------------------------------------------------------------- */
  {
    id: "LEEK-SRC-007",
    publisher: "Rockstar Games",
    title:
      "Rockstar Games statement on Grand Theft Auto VI gameplay leaks (posted to @RockstarGames on X)",
    url: "https://x.com/RockstarGames/status/2092574304571433078",
    publishedDate: "2026-08-26",
    eventDate: "2026-08-26",
    retrievedDate: "2026-08-27",
    primary: true,
    tier: 2,
    type: "rockstar-statement",
    reliabilityNotes:
      "Rockstar's first public statement on the leaks, posted to its official X account on 2026-08-26. The X post itself was not captured; the wording below is the fragment reproduced identically by Forbes (LEEK-SRC-102), GameSpot (LEEK-SRC-026) and Kotaku (LEEK-SRC-031), with Engadget and Game Informer carrying the same text in search results. The full text was not captured from the primary post.",
    status: "active",
    excerpt:
      "It would be an understatement to say that having videos of Grand Theft Auto VI gameplay leak in this way has been heartbreaking for our team, and this is obviously not how we intended for you to see the game after all this time.",
  },

  /* ---------------------------------------------------------------- */
  /* Tier 5: actor statements                                          */
  /* ---------------------------------------------------------------- */
  {
    id: "LEEK-SRC-008",
    publisher: "CyberLeek (actor website)",
    title: "cyber-leek.online as captured on 2026-08-26 (possible impersonation site)",
    url: "https://cyber-leek.online",
    publishedDate: "2026-08-26",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 5,
    type: "actor-statement",
    reliabilityNotes:
      "Presented as the actor's site; every statement is at best an actor claim. Two independent reviews of the capture concluded it is probably an impersonation or phishing page (it disclaims affiliation, collects names and emails, and offers a build by direct message), so LEEK does not cite it for the content of the real site and takes the Edict text from journalism screenshots instead. The capture is of the cyber-leek.online mirror as it stood on 2026-08-26 (publication date approximate; the page lists sister domains cyberleek.shop, cyber-leek.space and cyber-leek.shop). The captured page solicits crypto donations to vote on the next leak and asks visitors for names and emails, so it may be an impersonator or scam mirror rather than the original CyberLeek site; treat its contents as unverified.",
    status: "active",
    excerpt:
      "Vote with your crypto on Cyber Leek. The most funded choice becomes our next exclusive GTA 6 leak video.",
  },

  /* ---------------------------------------------------------------- */
  /* Tier 11 social posts that relay actor or organisation statements  */
  /* ---------------------------------------------------------------- */
  {
    id: "LEEK-SRC-009",
    publisher: "X user InfraPeep (relaying CyberLeek Telegram statement)",
    title:
      "Screenshot of CyberLeek Telegram statement on official channels and impersonators",
    url: "https://x.com/InfraPeep/status/2090157572942618867",
    publishedDate: "2026-08-20",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 11,
    type: "social-post",
    reliabilityNotes:
      "Third-party X post relaying a screenshot of a Telegram statement attributed to CyberLeek, in which the actor says it operates only its Telegram channel and website. Relays an actor claim; the post was not captured directly and is known through Mashable's citation (LEEK-SRC-016). Not independently verified.",
    status: "active",
  },
  {
    id: "LEEK-SRC-010",
    publisher: "X user DailyDarkWeb",
    author: "Dark Web Intelligence (@DailyDarkWeb)",
    title: "GTA VI leaker CyberLeek issues ultimatum to Rockstar",
    url: "https://x.com/DailyDarkWeb/status/2090902909659803834",
    publishedDate: "2026-08-21",
    eventDate: "2026-08-21",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 11,
    type: "social-post",
    reliabilityNotes:
      "Threat-intelligence aggregator account on X summarising a CyberLeek manifesto post. Posted 2026-08-21T20:44:35Z. It relays actor claims (demands, threats, fundraising) and itself notes that the operator's identity and the origin of the material are not established.",
    status: "active",
    excerpt:
      "CyberLeek demands that Rockstar issue a public statement and apology alongside a \"concrete commitment\" to address what the actor describes as anti-consumer practices.",
  },
  {
    id: "LEEK-SRC-011",
    publisher: "Stop Killing Games (official X account)",
    title: "Stop Killing Games statement distancing the campaign from CyberLeek",
    url: "https://x.com/StopKilingGames/status/2089892615923622375",
    publishedDate: "2026-08-19",
    eventDate: "2026-08-19",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 11,
    type: "social-post",
    reliabilityNotes:
      "Organisation statement posted on the campaign's own X account on 2026-08-19. The post was not captured directly; the wording is as quoted by GameSpot (LEEK-SRC-026) and Mashable (LEEK-SRC-016), which agree. It is a first-party statement of the organisation's position, not reporting about CyberLeek.",
    status: "active",
    excerpt: "Using illegal means to make a point is unacceptable to us",
  },
  {
    id: "LEEK-SRC-012",
    publisher: "X user videotech (GTA mapping community)",
    title: "Community analysis comparing leaked map images with reconstructed map",
    url: "https://x.com/videotech/status/2090055297641390293",
    publishedDate: "2026-08-19",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 11,
    type: "social-post",
    reliabilityNotes:
      "Community mapping analysis posted on X by a long-standing GTA mapping contributor; cited by GameSpot (LEEK-SRC-026) as finding that details in the leaked map images line up with years of reconstruction from official material. Not captured directly. Publication date approximate, inferred from the X status id sequence relative to dated posts.",
    status: "active",
  },

  /* ---------------------------------------------------------------- */
  /* Tier 8: security research                                         */
  /* ---------------------------------------------------------------- */
  {
    id: "LEEK-SRC-013",
    publisher: "Malwarebytes Labs",
    author: "Danny Bradbury",
    title: "GTA 6 leak hunt could expose data belonging to thousands of Discord users",
    url: "https://www.malwarebytes.com/blog/privacy/2026/08/gta-6-leak-hunt-could-expose-data-belonging-to-thousands-of-discord-users",
    publishedDate: "2026-08-25",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 8,
    type: "security-research",
    reliabilityNotes:
      "Security vendor blog. Original analysis of the subpoena scope and of the privacy exposure for Discord server members, drawing on the filings; it also summarises actor claims (manifesto, token burn) as claims. It states the first footage appeared on August 17, which differs from the August 18 date given by most outlets.",
    status: "active",
    excerpt:
      "Microsoft and Discord have until September 4 to hand over the data. If they comply, potentially hundreds or thousands of people with no known connection to the leaks could have identifying information handed over to Take-Two as part of its investigation.",
  },
  {
    id: "LEEK-SRC-014",
    publisher: "CyberScoop",
    title:
      "The GTA VI leaks are breaking the internet. Security researchers have seen this before.",
    url: "https://cyberscoop.com/grand-theft-auto-6-data-theft-extortion-leaks",
    publishedDate: "2026-08-25",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 8,
    type: "security-research",
    reliabilityNotes:
      "Cybersecurity trade outlet. Original reporting with named expert interviews (Halcyon, Infoblox, Huntress, Luta Security) and a Discord spokesperson comment. Publication date approximate: the body refers to events 'as of Monday' and leaks on 'Tuesday morning', which places it on 2026-08-25. Expert views on insider access are opinion, not findings.",
    status: "active",
    excerpt:
      "Discord would not say whether it had been formally served or what it has done in response. A company spokesperson said it reviews and complies with valid subpoenas when they are received.",
  },

  /* ---------------------------------------------------------------- */
  /* Tier 6: high-quality tech and investigative journalism            */
  /* ---------------------------------------------------------------- */
  {
    id: "LEEK-SRC-015",
    publisher: "PCMag",
    author: "Michael Kan",
    title: "Want to Contact the GTA 6 Leakers? You'll Need to Pony Up $169,000 First",
    url: "https://www.pcmag.com/news/want-to-contact-the-gta-6-leakers-youll-need-to-pony-up-169000-first",
    publishedDate: "2026-08-25",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 6,
    type: "tech-journalism",
    reliabilityNotes:
      "Established technology outlet. Original reporting on the 'contact' page and 400 XMR fee added to the actor's site, quoting the site directly; it relays the actor's own wording as claims. Publication date approximate (captured as one day old on 2026-08-26). The $169,000 figure is PCMag's conversion; GameSpot converted the same 400 XMR to about $165,450.",
    status: "active",
    excerpt:
      "The group is requiring a \"contact fee\" that requires a donation of 400 in the cryptocurrency Monero, or about $169,000.",
  },
  {
    id: "LEEK-SRC-016",
    publisher: "Mashable",
    author: "Olivia Tauber",
    title: "What is CyberLeek? Everything we know about the alleged GTA 6 leakers.",
    url: "https://mashable.com/tech/cyberleek-gta-6-leaks-explained",
    publishedDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 6,
    type: "tech-journalism",
    reliabilityNotes:
      "Explainer by a mainstream tech outlet, published 2026-08-20T20:59Z. Mixes original observation (token dashboard figures, manifesto quotes) with aggregation of other outlets. It relays actor claims, including the Telegram statement on impersonators and the 'our colleague' reference to Arion Kurtaj, and is careful to label them unverified.",
    status: "active",
    excerpt:
      "CyberLeek is the name used by an unidentified person or group releasing alleged GTA 6 development material. We do not know who is behind it, where the operator is located, or how the footage was obtained.",
  },
  {
    id: "LEEK-SRC-017",
    publisher: "Mashable",
    author: "Alex Perry",
    title: "GTA 6 CyberLeek update: Everything leaked so far, what might be next",
    url: "https://mashable.com/entertainment/grand-theft-auto-6-cyberleek-leaks-everything-posted-so-far",
    publishedDate: "2026-08-21",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 6,
    type: "tech-journalism",
    reliabilityNotes:
      "Rolling catalogue of the released clips. Published 2026-08-21 and updated on 08-24, 08-25 and 08-26 (the last update added Rockstar's statement). Largely aggregation with the outlet's own viewing notes; it does not authenticate the clips. The 16-clip count is as of the 08-26 update.",
    status: "active",
    excerpt:
      "At the time of publication, 16 gameplay clips and three map screenshots have been posted by Cyberleek that show different aspects of GTA 6, including glimpses of cutscenes.",
  },
  {
    id: "LEEK-SRC-018",
    publisher: "Mashable",
    author: "Timothy Beck Werth",
    title: "GTA 6 makers subpoena Microsoft, Discord in hunt for leakers",
    url: "https://mashable.com/tech/take-two-interactive-subpoena-microsoft-discord-cyberleek-grand-theft-auto",
    publishedDate: "2026-08-21",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 6,
    type: "tech-journalism",
    reliabilityNotes:
      "Mainstream tech outlet reporting on the Microsoft and Discord 512(h) requests, published 2026-08-21T17:40Z and crediting Kotaku with the first report. It quotes the filings and the attached takedown notice directly, so the quoted passages are reliable; its inference that the filings 'confirm' the clips are legitimate is the outlet's reading, not a court finding.",
    status: "active",
    excerpt:
      "Take-Two Interactive Software Inc., the parent company of Rockstar Games, filed two subpoenas on Aug. 20 in the Southern District Court of New York, as first reported by Kotaku.",
  },
  {
    id: "LEEK-SRC-019",
    publisher: "Mashable",
    title: "GTA 6 makers subpoena X, Google in hunt for Cyberleek",
    url: "https://mashable.com/tech/take-two-interactive-gta-6-leakers-subpoena-google-x-corp",
    publishedDate: "2026-08-24",
    eventDate: "2026-08-21",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 6,
    type: "tech-journalism",
    reliabilityNotes:
      "Mainstream tech outlet report on the Google and X Corp. 512(h) requests filed 2026-08-21. Not retrieved; the fetch on 2026-08-27 was blocked, so the source is cited via search result metadata and the cross-link in LEEK-SRC-017. The underlying filings are LEEK-SRC-005 and LEEK-SRC-006.",
    status: "active",
  },
  {
    id: "LEEK-SRC-020",
    publisher: "Mashable",
    author: "Alex Perry",
    title: "Rockstar breaks silence on 'heartbreaking' GTA VI leaks",
    url: "https://mashable.com/entertainment/grand-theft-auto-vi-leaks-rockstar-statement",
    publishedDate: "2026-08-26",
    eventDate: "2026-08-26",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 6,
    type: "tech-journalism",
    reliabilityNotes:
      "Mainstream tech outlet carrying Rockstar's 2026-08-26 statement (published 2026-08-26T13:26Z per page metadata). Not retrieved; the fetch on 2026-08-27 was blocked, so it is cited via search result metadata. The statement itself is LEEK-SRC-007; use LEEK-SRC-102 for a captured full text.",
    status: "active",
  },
  {
    id: "LEEK-SRC-021",
    publisher: "Mashable",
    author: "Alex Perry",
    title: "Cyberleek posts first major 'GTA 6' spoilers in Lucia prologue leak",
    url: "https://mashable.com/tech/cyberleek-leaks-gta-6-spoilers-lucia-caminos-prologue",
    publishedDate: "2026-08-26",
    eventDate: "2026-08-26",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 6,
    type: "tech-journalism",
    reliabilityNotes:
      "Mainstream tech outlet's own account of the Lucia prologue clip posted hours after Rockstar's statement. Only a partial body was captured (appended to the LEEK-SRC-016 capture); the full page could not be fetched on 2026-08-27. The outlet says it viewed the clip but does not authenticate it.",
    status: "active",
    excerpt:
      "Cyberleek posted four and a half minutes of the Lucia prologue in a Telegram channel and promised to release more footage featuring Lucia soon.",
  },
  {
    id: "LEEK-SRC-022",
    publisher: "Mashable",
    author: "Matt Binder",
    title:
      "New 'GTA 6' plane video leak suggests CyberLeek has playable version of the game",
    url: "https://mashable.com/tech/gta-6-leakers-may-have-a-playable-version-of-the-game",
    publishedDate: "2026-08-20",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 6,
    type: "tech-journalism",
    reliabilityNotes:
      "Mainstream tech outlet report on the plane clip that ends with the word LEEK shot into a wall, the first clip widely read as showing live control of a build. Not retrieved; the fetch on 2026-08-27 was blocked, so it is cited via search result metadata and the Mashable sidebar listing (author and date). The inference about a playable build is interpretation, not confirmation.",
    status: "active",
  },
  {
    id: "LEEK-SRC-023",
    publisher: "Mashable",
    author: "Matt Binder",
    title: "GTA 6 map: Community mapping project resembles what CyberLeek revealed",
    url: "https://mashable.com/tech/gta-6-map-leaked-resembles-community-mapping-project",
    publishedDate: "2026-08-24",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 6,
    type: "tech-journalism",
    reliabilityNotes:
      "Mainstream tech outlet piece comparing the leaked map images with the fan mapping project (published 2026-08-24T14:53Z per page metadata). Not retrieved; the fetch on 2026-08-27 was blocked, so it is cited via search result metadata. Aggregates community analysis rather than reporting new facts.",
    status: "active",
  },
  {
    id: "LEEK-SRC-024",
    publisher: "Mashable",
    author: "Matt Binder",
    title:
      "GTA 6 Cyberleek: Fans float leak conspiracy theories about marketing, possible in-game character",
    url: "https://mashable.com/tech/gta-6-cyberleek-conspiracy-theories-game-leaks",
    publishedDate: "2026-08-24",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 6,
    type: "tech-journalism",
    reliabilityNotes:
      "Mainstream tech outlet round-up of fan theories (marketing stunt, in-game character). Not retrieved; the fetch on 2026-08-27 was blocked, so it is cited via search result metadata. The theories it describes are community speculation and should be treated as such.",
    status: "active",
  },

  /* ---------------------------------------------------------------- */
  /* Tier 7: established gaming and tech journalism                     */
  /* ---------------------------------------------------------------- */
  {
    id: "LEEK-SRC-025",
    publisher: "Forbes (Paul Tassi)",
    author: "Paul Tassi",
    title: "'GTA VI' Leaker Shows They May Have An Actual Game Build",
    url: "https://www.forbes.com/sites/paultassi/2026/08/20/gta-vi-leaker-shows-they-may-have-an-actual-game-build",
    publishedDate: "2026-08-20",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Forbes senior contributor column, published 2026-08-20 09:17 EDT and updated 12:17 EDT. Original observation of the LEEK-on-the-wall clip; the conclusion that the leaker is playing a build is the columnist's inference and is hedged ('or perhaps a source is sending them live footage'). Forbes contributor pieces are opinion-led rather than edited news.",
    status: "active",
    excerpt:
      "This is the first clear indication that Cyberleek has not just lifted test footage from somewhere, but is instead currently playing a build of the game itself, or perhaps a source is sending them live footage.",
  },
  {
    id: "LEEK-SRC-026",
    publisher: "GameSpot",
    author: "Cheri Faulkner",
    title: "GTA 6 Leaks: A Timeline Of The Events So Far",
    url: "https://www.gamespot.com/articles/gta-6-leaks-a-timeline-of-the-events-so-far",
    publishedDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Established gaming outlet's rolling day-by-day timeline, first published 2026-08-24T19:01Z and modified through 2026-08-26 to include Rockstar's statement. Mostly aggregation of the outlet's own earlier coverage and community sources; it attributes the August 14 and 15 infrastructure claims to Reddit users rather than verifying them. Useful as a dated index of drops.",
    status: "active",
    excerpt:
      "Ahead of the footage being posted more widely, several Reddit users believe that infrastructure including the main CyberLeek domain and backup spelling variants were registered as early as August 14. They also claim that a $CYBERLEEK token, liquidity pool, website, and voting program were created around August 15.",
  },
  {
    id: "LEEK-SRC-027",
    publisher: "GameSpot",
    author: "Eddie Makuch",
    title: "Take-Two Loses Billions In Market Value Since GTA 6 Leaks Began",
    url: "https://www.gamespot.com/articles/take-two-loses-billions-in-market-value-since-gta-6-leaks-began",
    publishedDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Established gaming outlet noting the share-price move during the leak week. Publication date approximate: the body says the leaks 'began earlier this week' and shares 'began the week around $245' and trade 'around $236' today, which matches 2026-08-20. It lists other possible drivers (an executive share sale, earnings) and does not attribute the whole move to the leaks.",
    status: "active",
    excerpt:
      "Take-Two has seen its total market cap lose billions, as the company's share price began the week around $245. Today, shares are trading around $236.",
  },
  {
    id: "LEEK-SRC-028",
    publisher: "Kotaku",
    author: "Zack Zwiezen",
    title: "The Hunt For The GTA 6 Leaker Seems To Be Getting Closer To Its Target",
    url: "https://kotaku.com/the-hunt-for-the-gta-6-leaker-seems-to-be-getting-closer-to-its-target-2000728088",
    publishedDate: "2026-08-25",
    eventDate: "2026-08-25",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Established gaming outlet summarising the GTAForums 'Vice Cit' timeline (LEEK-SRC-094) and the deleted Reddit post about the 'stayonthegrindd' Discord account. Published 2026-08-25T22:25Z. It reports a community investigation and quotes the investigator's own caveats; it does not identify anyone and its 'top suspect' framing is community claim, not attribution.",
    status: "active",
    excerpt:
      "While it is possible that stayonthegrindd simply found the basketball leak footage on the dark web and shared it on Discord, the rest of the timeline seems to imply that stayonthegrindd has some connection to Cyberleek.",
  },
  {
    id: "LEEK-SRC-029",
    publisher: "Kotaku",
    author: "Ethan Gach",
    title: "Take-Two Subpoenas Microsoft And Discord Over GTA 6 Leaks",
    url: "https://kotaku.com/take-two-subpoenas-microsoft-and-discord-records-related-to-spread-of-gta-6-leaks-2000726633",
    publishedDate: "2026-08-21",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "The original report on the Microsoft and Discord 512(h) requests, credited as first by Mashable, Den of Geek and others. The captured page byline reads 'By Ethan Gach, Published August 21, 2026', which differs from the registry's 2026-08-20 and Zack Zwiezen; the page is followed here. Updated 08-21 12:21 ET with DarkViperAU's comment and a headline change. Quotes the filings directly.",
    status: "active",
    excerpt:
      "The one petition, which references a Github repository where infringing content was posted, gives Microsoft until September 4 to produce \"all internal Microsoft business records and investigative records associated with Microsoft's internal investigation of the 'cyberleek' persona",
  },
  {
    id: "LEEK-SRC-030",
    publisher: "Kotaku",
    author: "Zack Zwiezen",
    title:
      "Jason Flying A Plane In The New GTA 6 Leak Has Me More Excited Than Any Previous Trailer",
    url: "https://kotaku.com/jason-flying-a-plane-in-the-new-gta-6-leak-has-me-more-excited-than-any-previous-trailer-2000726316",
    publishedDate: "2026-08-20",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Established gaming outlet, published 2026-08-20. A reaction piece on the plane clip rather than investigative reporting; useful for dating the clip and community reaction, not for facts about the actor.",
    status: "active",
  },
  {
    id: "LEEK-SRC-031",
    publisher: "Kotaku",
    author: "Zack Zwiezen",
    title: "Watch Out, The GTA 6 Leaker Is Now Sharing Story Spoilers",
    url: "https://kotaku.com/watch-out-the-gta-6-leaker-is-now-sharing-story-spoilers-2000728456",
    publishedDate: "2026-08-26",
    eventDate: "2026-08-26",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Established gaming outlet's own report on the Lucia prologue clip, published 2026-08-26. It quotes the on-screen text CyberLeek placed in the clip (actor claims about the build's age and the state of the game) and one sentence of Rockstar's same-day statement. The outlet says it cannot verify the actor's claims.",
    status: "active",
    excerpt:
      "\"This build is actually recent, and the game is not ready at all,\" claimed Cyberleek in the leaked prologue.",
  },
  {
    id: "LEEK-SRC-032",
    publisher: "IGN",
    author: "Wesley Yin-Poole",
    title:
      "GTA 6 Suffers Sixth Straight Day of Gameplay Leaks: Here's Everything We Know",
    url: "https://www.ign.com/articles/gta-6-leaker-releases-more-gameplay-videos-despite-rockstar-owner-take-twos-microsoft-and-discord-subpoenas",
    publishedDate: "2026-08-22",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Rolling IGN story: original 2026-08-22, updated 2026-08-23 (sixth day) and 2026-08-24 (poll for the next leak). The registry title is the 08-23 update's headline. It continues the earlier rolling piece LEEK-SRC-034 but IGN did not mark either as replaced, so both stay active. Aggregation of IGN's own daily coverage.",
    status: "active",
  },
  {
    id: "LEEK-SRC-033",
    publisher: "IGN",
    author: "Wesley Yin-Poole",
    title:
      "Grand Theft Auto Fan Uses Digital Forensics Expertise to Expose GTA 6 Leaker's Crypto Scheme",
    url: "https://www.ign.com/articles/grand-theft-auto-fan-uses-digital-forensics-expertise-to-expose-gta-6-leakers-crypto-scheme",
    publishedDate: "2026-08-21",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "IGN report (updated 2026-08-21 07:33 EDT) on GTAForums user Vice Cit's token analysis. The registry's quoted headline is the social title; the page headline is used here. The figures ($29,000 setup cost, $40,000 to $60,000 in trading fees, about $4,400 a day) are the community investigator's estimates relayed by IGN, not audited numbers.",
    status: "active",
    excerpt:
      "\"At the time I'm writing up this post they've made somewhere between $40,000 to $60,000 in just trading fees from people buying and selling the coin and it's still going,\" Vice Cit continued.",
  },
  {
    id: "LEEK-SRC-034",
    publisher: "IGN",
    author: "Wesley Yin-Poole",
    title:
      "[UPDATE] GTA 6 Leaks Continue Into Fourth Day With Yet Another Gameplay Video Amid Radio Silence From Rockstar",
    url: "https://www.ign.com/articles/gta-6-gameplay-and-map-appear-to-leak-online-group-reportedly-responsible-threatens-rockstar-over-all-digital-future",
    publishedDate: "2026-08-18",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Rolling IGN story: original 2026-08-18 on the first clips and map, with updates on 08-19 (two), 08-20 and 08-21. Coverage continued in LEEK-SRC-032 from 08-22, but IGN did not mark this piece as replaced. Early reporting that hedges on authenticity ('appear to leak').",
    status: "active",
  },
  {
    id: "LEEK-SRC-035",
    publisher: "PC Gamer",
    author: "Tyler Wilde",
    title: "Who is Cyberleek? What we know about the GTA 6 leaker",
    url: "https://www.pcgamer.com/games/grand-theft-auto/who-is-cyberleek-what-we-know-about-the-gta-6-leaker",
    publishedDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Established gaming outlet explainer published 2026-08-20T21:09Z. The captured body is site chrome only, so the text was not reviewed; cited for its existence and date via page metadata. Explainer format, largely aggregation.",
    status: "active",
  },
  {
    id: "LEEK-SRC-036",
    publisher: "PC Gamer",
    title:
      "As Take-Two seeks IP addresses and phone numbers of thousands in GTA 6 subpoena, Discord says it's not been served the order just yet",
    url: "https://www.pcgamer.com/games/grand-theft-auto/as-take-two-seeks-ip-addresses-and-phone-numbers-of-thousands-in-gta-6-subpoena-discord-says-its-not-been-served-the-order-just-yet",
    publishedDate: "2026-08-25",
    eventDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Established gaming outlet carrying Discord's statement that it had not yet been served (published 2026-08-25T11:25Z per page metadata). The captured body is site chrome only, so the text was not reviewed; the headline carries the platform statement. Use LEEK-SRC-086 and LEEK-SRC-014 for captured wording of Discord's position.",
    status: "active",
  },
  {
    id: "LEEK-SRC-037",
    publisher: "PC Gamer",
    title:
      "Take-Two kicks off GTA 6 leaker hunt with subpoenas demanding records from Microsoft and Discord",
    url: "https://www.pcgamer.com/games/grand-theft-auto/take-two-kicks-off-gta-6-leaker-hunt-with-subpoenas-demanding-records-from-microsoft-and-discord",
    publishedDate: "2026-08-21",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Established gaming outlet report on the Microsoft and Discord requests, published 2026-08-21T16:10Z. The captured body is site chrome only, so the text was not reviewed; the title was completed from the URL slug. Follows Kotaku's original report (LEEK-SRC-029).",
    status: "active",
  },
  {
    id: "LEEK-SRC-038",
    publisher: "Polygon",
    author: "Tomas Franzese",
    title: "'GTA 6' Leaks May Finally Be Coming To An End",
    url: "https://www.polygon.com/gta-6-leaks-cyberleek-website-down",
    publishedDate: "2026-08-22",
    eventDate: "2026-08-22",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Established gaming outlet noting that the actor's website and Telegram channel went offline on 2026-08-22 (page modified 2026-08-22T14:45Z). The captured body is site chrome only; the page description is quoted. Its headline prediction that the leaks would end did not hold, as clips continued through 08-26.",
    status: "active",
    excerpt:
      "Cyberleek's website and Telegram channel have been taken down, suggesting that the Grand Theft Auto 6 leaks will end soon",
  },
  {
    id: "LEEK-SRC-039",
    publisher: "TechRadar",
    title:
      "Even more Grand Theft Auto 6 footage has leaked, this time of Vice City beach showcasing impressive crowd tech, here's the full timeline of everything that has leaked so far",
    url: "https://www.techradar.com/gaming/even-more-grand-theft-auto-6-footage-has-leaked-this-time-of-vice-city-beach-showcasing-impressive-crowd-tech-heres-the-full-timeline-of-everything-that-has-leaked-so-far",
    publishedDate: "2026-08-25",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Established tech outlet's rolling timeline, published 2026-08-25T18:33Z. The captured body is site chrome only, so the text was not reviewed; the title was completed from the URL slug. Aggregation of the drop sequence.",
    status: "active",
  },
  {
    id: "LEEK-SRC-040",
    publisher: "Tom's Hardware",
    title:
      "Catastrophic GTA VI leak is a full working build: notorious hacker CyberLeek taunts Rockstar Games by spraying the word 'leek' onto a wall in-game with bullets",
    url: "https://www.tomshardware.com/video-games/catastrophic-gta-vi-leak-is-a-full-working-build-notorious-hacker-cyberleek-taunts-rockstar-games-by-spraying-the-word-leek-onto-a-wall-in-game-with-bullets",
    publishedDate: "2026-08-20",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "Established tech outlet, published 2026-08-20T13:55Z. The headline's 'full working build' is the outlet's characterisation of the LEEK-on-the-wall clip; the page description itself says it is unclear how the build was obtained. The captured body is site chrome only; the page description is quoted.",
    status: "active",
    excerpt:
      "It's unclear how Cyberleek got their hands on such a complete GTA VI build, especially as it isn't pegged to launch until November.",
  },
  {
    id: "LEEK-SRC-041",
    publisher: "Tom's Hardware",
    title:
      "GTA 6 leaks prompt Take-Two to subpoena Microsoft for Windows device IDs of everyone in three Discord servers",
    url: "https://www.tomshardware.com/video-games/console-gaming/take-two-subpoenas-microsoft-for-windows-device-ids-of-everyone-in-three-discord-servers-in-gta-6-leak-hunt",
    publishedDate: "2026-08-22",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "Established tech outlet's analysis of the scope of the Microsoft request, published 2026-08-22T11:00Z. The captured body is site chrome only; the title was completed from the URL slug and the page description is quoted. Widely cited by later pieces (GadgetReview, Malwarebytes) for the device-identifier angle.",
    status: "active",
    excerpt:
      "The publisher wants MachineGuid identifiers, login IPs, and OneDrive contents by September 4.",
  },
  {
    id: "LEEK-SRC-042",
    publisher: "Tom's Hardware",
    title:
      "Fake GTA VI ISO circulates on the internet a few days after leak, internet sleuths claim 113GB download is padded malware, testers claim file is 99.99% empty zeroes with 50KB virus embedded",
    url: "https://www.tomshardware.com/video-games/fake-gta-vi-iso-circulates-on-the-internet-a-few-days-after-leak-internet-sleuths-claim-113gb-download-is-padded-malware-testers-claim-file-is-99-99-percent-empty-zeroes-with-50kb-virus-embedded",
    publishedDate: "2026-08-23",
    eventDate: "2026-08-23",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "Established tech outlet's own report on the fake 113GB 'build' file, published 2026-08-23T12:45Z; the padded-zeroes finding is attributed to community testers, not the outlet's own analysis. The captured body is site chrome only, so the text was not reviewed. Cited by GameSpot for the same finding.",
    status: "active",
  },
  {
    id: "LEEK-SRC-043",
    publisher: "Insider Gaming",
    author: "Charlie Champion",
    title: "All GTA 6 CYBERLEEK Leaks So Far: Map, Honor System and Gameplay Videos",
    url: "https://insider-gaming.com/all-gta-6-cyberleek-leaks-so-far-map-honor-system-gameplay-videos",
    publishedDate: "2026-08-22",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Gaming news site's feature-by-feature roundup of the clips, published 2026-08-22T12:08Z. Aggregation with the outlet's own viewing notes; it dates the footage to an older build ('potentially dating back to 2024 or even earlier') as an estimate. Same outlet issued the redaction in LEEK-SRC-044, but this roundup is unaffected by that correction.",
    status: "active",
  },
  {
    id: "LEEK-SRC-044",
    publisher: "Insider Gaming",
    author: "Grant Taylor-Hill",
    title:
      "REDACTED: GTA 6 Leaker Report Concerning 'Releasing The Build' Has Been Removed",
    url: "https://insider-gaming.com/redacted-gta-6-leaker-report-build-release",
    publishedDate: "2026-08-23",
    eventDate: "2026-08-22",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "The outlet's own redaction notice, published 2026-08-23T07:01Z, withdrawing its 2026-08-22 report that CyberLeek had threatened to release a full build via a 'dead man's switch'. First-person from the author of the withdrawn piece. It is the primary record of the correction and of the fact that the source image was fabricated by an imitator.",
    status: "corrected",
    excerpt:
      "Unfortunately, this article was based on an image and discourse that have since been proven false, manufactured and circulated online by one of the many people copying or aping what CYBERLEEK is doing, for whatever reason.",
  },
  {
    id: "LEEK-SRC-045",
    publisher: "Beebom",
    author: "Sagnik Adhikary",
    title: "GTA 6 Leaks: A Full Timeline of 14 Major Gameplay Leaks",
    url: "https://beebom.com/gta-6-leaks-timeline",
    publishedDate: "2026-08-25",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Consumer tech site's rolling timeline of the clips, published 2026-08-25 and updated the same day. The capture's on-page headline counted 11 leaks while the registry title (later search metadata) counts 14, showing the piece is revised as clips appear. Aggregation; useful for drop titles and dates.",
    status: "active",
  },
  {
    id: "LEEK-SRC-046",
    publisher: "Beebom",
    author: "Rishabh Sabarwal",
    title: "GTA 6 Wasted Screen Revealed in New Gas Station Gameplay Leak",
    url: "https://beebom.com/gta-6-wasted-screen-revealed",
    publishedDate: "2026-08-23",
    eventDate: "2026-08-23",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Consumer tech site description of the 'Gas' clip, published 2026-08-23 (IST) and updated 2026-08-24. Viewing notes on clip content only.",
    status: "active",
  },
  {
    id: "LEEK-SRC-047",
    publisher: "GamesRadar+",
    title:
      "GTA 6 leaker turns to story spoilers: Cyberleek uploads 4-minute Lucia prologue clip hours after Rockstar says the leaks are 'heartbreaking'",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-leaker-turns-to-story-spoilers-cyberleek-uploads-4-minute-lucia-prologue-clip-hours-after-rockstar-says-the-leaks-are-heartbreaking",
    publishedDate: "2026-08-26",
    eventDate: "2026-08-26",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Established gaming outlet report on the Lucia prologue clip, published 2026-08-26T16:56Z. The captured body is site chrome only, so the text was not reviewed; the title was completed from the URL slug. Corroborates Kotaku (LEEK-SRC-031) and Dot Esports (LEEK-SRC-048) on timing relative to Rockstar's statement.",
    status: "active",
  },
  {
    id: "LEEK-SRC-048",
    publisher: "Dot Esports",
    author: "Alexandra Wells",
    title: "Beware: Cyberleek leaks first GTA 6 story spoilers",
    url: "https://dotesports.com/gta/news/gta-6-story-spoilers-leak-rockstar-cyberleek-lucia-prologue",
    publishedDate: "2026-08-26",
    eventDate: "2026-08-26",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Esports and gaming news site, published 2026-08-26 12:10 EDT. Describes the prologue clip's length ('almost five minute') and content; it does not authenticate the clip.",
    status: "active",
  },
  {
    id: "LEEK-SRC-049",
    publisher: "Den of Geek",
    author: "Isabella Ardetto",
    title: "The GTA 6 Leak Situation Explained",
    url: "https://www.denofgeek.com/games/gta-6-leak-situation-explained",
    publishedDate: "2026-08-21",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Entertainment outlet explainer, published 2026-08-21. Aggregation crediting Kotaku and IGN; it quotes the manifesto's closing warning directly. Notes that Rockstar had not commented as of publication.",
    status: "active",
  },
  {
    id: "LEEK-SRC-050",
    publisher: "Notebookcheck",
    author: "Adam Corsetti",
    title:
      "9th GTA 6 leak teases Lucia gameplay after prior Cyberleek videos focus on Jason",
    url: "https://www.notebookcheck.net/9th-GTA-6-leak-teases-Lucia-gameplay-after-prior-Cyberleek-videos-focus-on-Jason.1376275.0.html",
    publishedDate: "2026-08-23",
    eventDate: "2026-08-23",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "Hardware news site, published 2026-08-23. Short clip description; the title was completed from the URL. Its 'full build' framing links to its own earlier reports rather than new evidence.",
    status: "active",
  },
  {
    id: "LEEK-SRC-051",
    publisher: "Notebookcheck",
    author: "Marius Müller",
    title: "GTA 6 leaker cashes in: Fans pay up to $80 for new gameplay",
    url: "https://www.notebookcheck.net/GTA-6-leaker-cashes-in-Fans-pay-up-to-80-for-new-gameplay.1373811.0.html",
    publishedDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "Hardware news site, published 2026-08-20, relaying Insider Gaming's report on the paid token poll. Aggregation; the title was completed from the URL. It names a cyberleek.turbo-gateway.com poll page, a domain not otherwise recorded.",
    status: "active",
  },
  {
    id: "LEEK-SRC-052",
    publisher: "DSOGaming",
    author: "John Papadopoulos",
    title:
      "GTA 6 Gameplay Videos #6, #7 and #8 Leaked, Showcasing Driving and the Strip Club",
    url: "https://www.dsogaming.com/videotrailer-news/gta-6-gameplay-videos-6-7-and-8-leaked-showcasing-driving-and-the-strip-club",
    publishedDate: "2026-08-22",
    eventDate: "2026-08-22",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "PC gaming site, published 2026-08-22T23:59Z. Asserts the clips come from a PC build without stating evidence; treat that as the outlet's assumption. It also says CyberLeek has not released a build and that circulating torrents are malware.",
    status: "active",
  },
  {
    id: "LEEK-SRC-053",
    publisher: "GTABoom",
    title: "What Does Rockstar Know About GTA 6 Leaker CyberLeek?",
    url: "https://www.gtaboom.com/what-rockstar-knows-about-the-gta-6-leaker-cyberleek-9ace",
    publishedDate: "2026-08-22",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "GTA fan news site, published 2026-08-22T02:54Z. Commentary on the token trail and the subpoenas; aggregation of IGN and Kotaku reporting with editorial framing.",
    status: "active",
  },
  {
    id: "LEEK-SRC-054",
    publisher: "GTABoom",
    title: "BBC Walks Back Unverified GTA 6 Leak Claims",
    url: "https://www.gtaboom.com/two-outlets-just-walked-back-on-their-gta-6-claims-c2b8",
    publishedDate: "2026-08-23",
    eventDate: "2026-08-23",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "GTA fan news site, published 2026-08-23T18:19Z and modified 2026-08-26, documenting two same-week corrections: Insider Gaming's redaction of the dead man's switch report and a BBC runtime claim about the Netflix special. Secondary account of corrections made elsewhere; the Insider Gaming redaction itself is LEEK-SRC-044.",
    status: "active",
    excerpt:
      "There is no verified evidence that CyberLeek issued that specific full-build ultimatum or that any automatic release mechanism exists.",
  },
  {
    id: "LEEK-SRC-055",
    publisher: "GamingBible",
    title:
      "GTA 6 gamer claims lawyer turned up at his house as major manhunt for leaker begins",
    url: "https://www.gamingbible.com/news/gta-6-gamer-lawyer-door-manhunt-leaker-744722-20260824",
    publishedDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "UK gaming site, published 2026-08-24 10:00 BST. Relays an unverified Reddit claim by a user (PilotX1970) about a lawyer visit and an earlier 'August 18th' post. Community claim only; nothing in it is corroborated by filings.",
    status: "active",
  },
  {
    id: "LEEK-SRC-056",
    publisher: "GamingBible",
    title:
      "GTA 6 in-game days leaked as 3 times the size of GTA 5's, plenty of time to cause chaos",
    url: "https://www.gamingbible.com/news/gta-6-leak-gameplay-day-night-cycle-106873-20260826",
    publishedDate: "2026-08-26",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "UK gaming site, published 2026-08-26 11:00 BST. Community calculation of the in-game day length from leaked clips; the piece itself says the figure is unconfirmed.",
    status: "active",
  },
  {
    id: "LEEK-SRC-057",
    publisher: "GamingBible",
    title: "GTA 6's nudist beach leak is a full frontal assault on my eyes",
    url: "https://www.gamingbible.com/news/gta-6-nudist-beach-leak-231060-20260824",
    publishedDate: "2026-08-24",
    eventDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "UK gaming site, published 2026-08-24 16:06 BST. Reaction piece on the 'Nudist Town' clip; useful only for dating that drop.",
    status: "active",
  },
  {
    id: "LEEK-SRC-058",
    publisher: "Daily Express",
    title: "Latest GTA 6 leak officially debunked as fake ahead of Netflix reveal",
    url: "https://www.express.co.uk/entertainment/gaming/2241874/latest-gta-6-leak-officially-debunked",
    publishedDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "UK tabloid gaming desk, published 2026-08-24T11:02+01:00. Reports a debunked fake leak in the same period; tabloid framing ('officially debunked') should be checked against the underlying source before reuse.",
    status: "active",
  },
  {
    id: "LEEK-SRC-059",
    publisher: "HotHardware",
    author: "Chris Harper",
    title: "GTA 6 Leaker Defies Take-Two With Even More Secret Gameplay Footage",
    url: "https://hothardware.com/news/gta-6-leaker-defies-take-two-with-even-more-secret-gameplay-footage",
    publishedDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "Hardware news site, published 2026-08-24 14:34 EDT. Numbered list of the clips to date with links to its own earlier coverage; aggregation.",
    status: "active",
  },
  {
    id: "LEEK-SRC-060",
    publisher: "Hypebeast",
    title:
      "Take-Two and Rockstar Games Issue Subpoenas to Microsoft and Discord Over GTA 6 Leaks",
    url: "https://hypebeast.com/2026/8/take-two-interactive-rockstar-games-issue-subpoenas-microsoft-discord-gta-6-leaks",
    publishedDate: "2026-08-22",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "Lifestyle and culture outlet, published 2026-08-22. Aggregation of the subpoena reporting; the title was completed from the URL slug.",
    status: "active",
  },
  {
    id: "LEEK-SRC-061",
    publisher: "TweakTown",
    title:
      "Take-Two begins the hunt for GTA 6 leaker CyberLeek, subpoenas Microsoft and Discord",
    url: "https://www.tweaktown.com/news/113195/take-two-begins-the-hunt-for-gta-6-leaker-cyberleek-subpoenas-microsoft-and-discord/index.html",
    publishedDate: "2026-08-21",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "Hardware news site, published 2026-08-21T15:30-05:00. Aggregation of the subpoena reporting with a quoted line from the filing. Its statement that clips had been posted 'for weeks' overstates the timeline (first clips 08-18).",
    status: "active",
  },

  /* ---------------------------------------------------------------- */
  /* Financial press and syndication                                   */
  /* ---------------------------------------------------------------- */
  {
    id: "LEEK-SRC-062",
    publisher: "BigGo News (via Yahoo Finance syndication)",
    title:
      "Take-Two Loses Nearly $3 Billion in Value as GTA 6 Leaker Turns Out to Be Crypto Operator",
    url: "https://finance.biggo.com/news/d8a9ff24-6e2c-4100-9cb8-c4d4a9b0ad56",
    publishedDate: "2026-08-21",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "financial-press",
    reliabilityNotes:
      "Automated financial news aggregator, published 2026-08-21T11:55Z. Compiles share-price figures, the Vice Cit token analysis and the 'second breach' claims from other outlets. Its intraday low ($231.60) differs from BeInCrypto's ($232.84) for the same move; both are recorded. Repeats unverified claims about a Rockstar India phishing incident as reported by others.",
    status: "active",
    excerpt:
      "The stock tumbled from $248.13 before the leaks surfaced on August 18 to an intraday low of $231.60, a decline of more than $15 per share.",
  },
  {
    id: "LEEK-SRC-063",
    publisher: "Yahoo Finance",
    author: "Phil Haunhorst (BeInCrypto)",
    title: "Take-Two Shed $2.83 Billion Over GTA 6 Leaks Ahead of Netflix Reveal",
    url: "https://finance.yahoo.com/markets/stocks/articles/two-shed-2-83-billion-104851645.html",
    publishedDate: "2026-08-21",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "financial-press",
    reliabilityNotes:
      "Yahoo Finance syndication of a BeInCrypto article by Phil Haunhorst, dated 2026-08-21 06:48 EDT. The $2.83 billion figure is 'by one tally' and is derived from a $15.29 per-share drop; the piece notes the stock partially recovered to $240.15. Crypto-press origin; treat the market-cap arithmetic as the outlet's own.",
    status: "active",
    excerpt:
      "TTWO traded at $248.13 before the leaks spread on Aug. 18. The stock then slid to $232.84, a drop of $15.29 a share. That move cut about $2.83 billion from Take-Two's market value, by one tally.",
  },
  {
    id: "LEEK-SRC-064",
    publisher: "Finbold",
    author: "Marko",
    title: "Here's how much Take-Two stock is down since GTA 6 leaks",
    url: "https://finbold.com/heres-how-much-take-two-stock-is-down-since-gta-6-leaks",
    publishedDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "financial-press",
    reliabilityNotes:
      "Finance and crypto news site, published 2026-08-20T13:00Z. Reports a 4.8% fall from $249 on 08-17 to $237 on 08-20 and explicitly says the leaks were not affecting the stock 'to a dramatic degree', which contrasts with the 'billions' framing elsewhere. Single-byline site with affiliate content.",
    status: "active",
    excerpt:
      "TTWO shares are sitting at $237 on August 20, having dropped 4.8% from $249 on August 17, a day before the leaks started circulating.",
  },
  {
    id: "LEEK-SRC-065",
    publisher: "Yahoo Tech (syndicated)",
    title: "Microsoft has been served a subpoena over 'Grand Theft Auto 6'",
    url: "https://tech.yahoo.com/gaming/articles/microsoft-served-subpoena-over-grand-144430833.html",
    publishedDate: "2026-08-21",
    eventDate: "2026-08-21",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "Yahoo syndication of a Windows Central piece (Future plc). Publication date approximate, taken from the Microsoft executive's X post dated 2026-08-21 that the article embeds. Carries a Microsoft statement (tier 4 content via a tier 7 outlet); the headline's 'served' is the outlet's wording. Speculation about Xbox dev kits is flagged as rumour in the text.",
    status: "active",
    excerpt:
      "We are working closely with Take-Two and Rockstar Games to support efforts to protect creative works and intellectual property.",
  },
  {
    id: "LEEK-SRC-066",
    publisher: "Yahoo Tech (syndicated)",
    author: "Wesley Yin-Poole (IGN)",
    title: "Former Rockstar Dev Calls GTA 6 Leaks 'A Nothing Burger'",
    url: "https://tech.yahoo.com/gaming/articles/former-rockstar-dev-calls-gta-111050308.html",
    publishedDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Yahoo syndication of an IGN article quoting former Rockstar North technical director Obbe Vermeij's social posts, plus Bloomberg's report that Rockstar did not know how the leaks happened. Publication date approximate: the body counts ten videos in six days, which places it around 2026-08-24. The registry title is truncated by search metadata. Vermeij's dev-kit remark is opinion.",
    status: "active",
  },
  {
    id: "LEEK-SRC-067",
    publisher: "Yahoo Finance (syndicated)",
    author: "Daniel Francis (Coinspeaker)",
    title: "GTA 6 Gas Leak: The Latest Leaks Result in CYBERLEEK Surging +80%",
    url: "https://finance.yahoo.com/markets/crypto/articles/gta-6-gas-leak-latest-072734163.html",
    publishedDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "financial-press",
    reliabilityNotes:
      "Yahoo Finance syndication of a Coinspeaker article dated 2026-08-24 03:27 EDT. Crypto-press token price coverage; its timestamps for the first circulation (about 17:00 UTC on 08-18) and valuation figures are the outlet's own observations of on-chain trackers.",
    status: "active",
    excerpt:
      "On August 18 at around 17:00 UTC, GTA 6 gameplay footage and a map featuring QR codes linking to the group's site and the token began circulating, as reported by outlets such as Kotaku and Forbes.",
  },
  {
    id: "LEEK-SRC-068",
    publisher: "Yahoo News (syndicated)",
    title:
      "Take-Two Subpoenas Microsoft and Discord to Unmask GTA 6 Leaker Cyberleek",
    url: "https://www.yahoo.com/news/us/articles/two-subpoenas-microsoft-discord-unmask-174107345.html",
    publishedDate: "2026-08-21",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Yahoo News syndication of a third-party explainer whose original outlet is not identified in the capture. Publication date approximate (captured as five days old on 2026-08-26). Aggregation of IGN and Kotaku reporting with editorial framing; its '2022 to 2023 development build' dating is unattributed.",
    status: "active",
  },
  {
    id: "LEEK-SRC-069",
    publisher: "AS / Meristation",
    author: "Alejandro Castillo",
    title:
      "Take-Two on the hunt for the GTA 6 leaker: The company goes to court to demand all data from Discord and Microsoft",
    url: "https://en.as.com/meristation/news/take-two-on-the-hunt-for-the-gta-6-leaker-the-company-goes-to-court-to-demand-all-data-from-discord-and-microsoft-f202608-n",
    publishedDate: "2026-08-21",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "English edition of a Spanish gaming outlet, updated 2026-08-21 19:51 CEST. Aggregation crediting Kotaku, with the subpoena text quoted. Its line that named Discord channels are 'under investigation by law enforcement' is unsupported by the civil filings.",
    status: "active",
  },
  {
    id: "LEEK-SRC-070",
    publisher: "Sportskeeda",
    author: "Rishi Pallav",
    title: "\"Words are not enough\": GTA 6 leaker issues ultimatum to Rockstar",
    url: "https://www.sportskeeda.com/gta/words-enough-gta-6-leaker-issues-ultimatum-rockstar",
    publishedDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Contributor-driven sports and gaming site, modified 2026-08-24 05:37 GMT; publication date approximate. Relays the actor's ultimatum wording as an actor claim.",
    status: "active",
  },
  {
    id: "LEEK-SRC-071",
    publisher: "GameGPU (English edition)",
    author: "Evgen Kovalov",
    title:
      "Hackers have issued an ultimatum to Rockstar Games and threatened to release GTA 6 on PC worldwide.",
    url: "https://en.gamegpu.com/news/igry/khakery-postavili-ultimatum-rockstar-games-i-prigrozili-vylozhit-gta-6-na-pk-po-vsemu-miru",
    publishedDate: "2026-08-22",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Machine-translated edition of a Ukrainian hardware site, published 2026-08-22. It reports the 'dead man's switch' automatic-release threat as an actor statement; that claim was based on a fabricated image and was retracted by Insider Gaming (LEEK-SRC-044). As captured, this piece carries the claim uncorrected. Use only for corroboration of how the narrative spread.",
    status: "active",
  },
  {
    id: "LEEK-SRC-072",
    publisher: "GTA Intel",
    author: "Adi (GTA Intel Newswire)",
    title: "A Second GTA 6 Leaker Has Reportedly Surfaced, Separate From CyberLeek",
    url: "https://gtaintel.com/news/gta-6-second-map-leak-separate-cyberleek",
    publishedDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "GTA fan news site, published 2026-08-20T22:00Z. Reports the claimed second, unrelated leak (Xbox graphics capture file) as 'reportedly'; the underlying claims are community posts and are unverified. The title was completed from the URL slug.",
    status: "active",
  },
  {
    id: "LEEK-SRC-073",
    publisher: "Games.gg",
    author: "Larc",
    title: "New GTA 6 Map Leak Surfaces Separate From Cyberleek",
    url: "https://games.gg/news/gta-6-map-leak-separate-cyberleek",
    publishedDate: "2026-08-21",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Web3 gaming site, updated 2026-08-21. Repeats the second-leak and 'phishing attack on a Rockstar employee' claims with 'reportedly' and no named source; community claim only.",
    status: "active",
  },
  {
    id: "LEEK-SRC-074",
    publisher: "eGamers.io",
    title:
      "CyberLeek, Explained: Inside the GTA 6 Leaks, the Manifesto and the Memecoin Votes",
    url: "https://egamers.io/cyberleek-explained-inside-the-gta-6-leaks-the-manifesto-and-the-memecoin-votes",
    publishedDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Crypto-gaming outlet. Publication date approximate: the body describes the token price 'by the afternoon of Aug. 20' and the Netflix look as 'just a week ahead', so 2026-08-20 is used although search metadata showed it as one day old on 08-26. Aggregation that closely tracks Mashable's explainer.",
    status: "active",
  },
  {
    id: "LEEK-SRC-075",
    publisher: "SVG",
    author: "Chris Hodges",
    title: "Cyberleek Explained: Everything We Know About The GTA 6 Leaks",
    url: "https://www.svg.com/2244567/cyberleek-gta-6-leaks-explained",
    publishedDate: "2026-08-26",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Static Media gaming site explainer, published 2026-08-26T14:13Z. Aggregation of the week's reporting.",
    status: "active",
  },
  {
    id: "LEEK-SRC-076",
    publisher: "GameFragger",
    title:
      "GTA 6 Leaker Threatens Rockstar And Other Publishers With More Leaks and Action",
    url: "https://gamefragger.com/multiplatform/action-adventure/grand-theft-auto/gta-6-leaker-threatens-rockstar-and-other-publishers-with-more-leaks-and-action-a29579",
    publishedDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Small gaming news site, published 2026-08-20 04:08 EST. Relays the manifesto's threats as actor claims.",
    status: "active",
  },
  {
    id: "LEEK-SRC-077",
    publisher: "Tech Insider",
    author: "Elias Virtanen",
    title: "GTA 6 Leak: CyberLeek Drops 6 Videos From Playable 2025 Build",
    url: "https://tech-insider.org/gta-6-leak-cyberleek",
    publishedDate: "2026-08-26",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "Low-reliability aggregator, dated 2026-08-26. Mixes reported facts with unsourced details (a Bloomberg-reported internal email, a lone protester video) and asserts a '2025 build' as fact. Do not use as sole support for any claim.",
    status: "active",
  },
  {
    id: "LEEK-SRC-078",
    publisher: "ProPakistani",
    author: "Afaq Wajdan",
    title: "GTA 6 Gameplay Leaker Seems to Have a Pirated PC Version",
    url: "https://propakistani.pk/2026/08/21/gta-6-gameplay-leaker-seems-to-have-a-pirated-pc-version",
    publishedDate: "2026-08-21",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "Pakistani tech news site, published 2026-08-21. Carries the unverified 'pirated PC version' claim sourced to a leaker account on X (eXtas1s); low reliability. Community claim only.",
    status: "active",
  },
  {
    id: "LEEK-SRC-079",
    publisher: "GadgetReview",
    author: "C. da Costa",
    title: "GTA 6 Leaker Threatens to Release Full Build to Millions of Players",
    url: "https://www.gadgetreview.com/gta-6-leaker-threatens-to-release-full-build-to-millions-of-players",
    publishedDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "Gadget review site, dated 2026-08-24. The headline still carries the 'release full build' threat, but the body states the dead man's switch post was fabricated by imitators and that Insider Gaming retracted its report; the headline was not corrected as captured. Aggregation with AI-assisted editing per the site's own disclosure.",
    status: "active",
    excerpt:
      "The \"dead man's switch\" post was manufactured by copycats imitating the group, not authenticated CYBERLEEK communication.",
  },
  {
    id: "LEEK-SRC-080",
    publisher: "Happy Mag",
    author: "Zachariah Tritisniotis",
    title: "GTA VI leaker's 'Dead Man's Switch' claim proves to be fake",
    url: "https://happymag.tv/gta-vi-leakers-dead-mans-switch-claim-proves-to-be-fake",
    publishedDate: "2026-08-24",
    eventDate: "2026-08-23",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Australian music and culture site, published 2026-08-24T03:26Z. Secondary account of the debunk, crediting Insider Gaming and embedding a post by Grummz noting impersonator accounts. Informal tone; useful as a carrier of the correction, not as a primary source.",
    status: "active",
    excerpt:
      "The image supposedly showing the hacker's mechanism has now been flagged as a fabrication, thanks to the courtesy of Insider Gaming.",
  },
  {
    id: "LEEK-SRC-081",
    publisher: "Shane the Gamer",
    author: "Tane Wharekura",
    title: "GTA 6 Leak Report on CYBERLEEK 'Dead Man's Switch' Retracted as Fake",
    url: "https://www.shanethegamer.com/news/gta-6-leak-report-on-cyberleek-dead-mans-switch-retracted-as-fake",
    publishedDate: "2026-08-23",
    eventDate: "2026-08-23",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "New Zealand gaming site, published 2026-08-23. Secondary account of Insider Gaming's retraction that quotes the redaction notice and notes a parallel Wolf's Gaming Blog report of the same fabricated claim. Reliable for the correction sequence.",
    status: "active",
    excerpt:
      "Insider Gaming has retracted a report claiming that the hacker known as CYBERLEEK threatened to release a complete build of Grand Theft Auto 6 unless Rockstar Games and Take-Two Interactive stopped pursuing them legally.",
  },
  {
    id: "LEEK-SRC-082",
    publisher: "EGW News",
    title: "GTA 6 Leaks May Be Over as Cyberleek Goes Offline",
    url: "https://egw.news/gaming/news/36831/gta-6-leaker-cyberleek-loses-its-website-and-teleg-I6pahYak1",
    publishedDate: "2026-08-23",
    eventDate: "2026-08-22",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Esports news site; publication date approximate (captured as three days old on 2026-08-26; the page headline reads 'GTA 6 Leaker Cyberleek Loses Its Website and Telegram Channel'). Records the 08-22 takedown of the site and Telegram channel, but also repeats unverified claims (a Rockstar India breach, FBI involvement, Bloomberg newsletter details) without sourcing. Use with care.",
    status: "active",
    excerpt:
      "Cyberleek's website and Telegram channel went offline on the morning of August 22, four days after the GTA 6 gameplay clips started appearing.",
  },
  {
    id: "LEEK-SRC-083",
    publisher: "UNILAD Tech",
    author: "Harry Boulton",
    title: "GTA 6 leaker faces having their real identity exposed after crypto mistake",
    url: "https://www.uniladtech.com/gaming/gta-leaker-risks-identity-exposed-crypto-blunder-spotted-484457-20260821",
    publishedDate: "2026-08-21",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "UK viral news brand, published 2026-08-21 17:23 BST. Relays IGN's account of the GTAForums Vice Cit token analysis, including the KYC-exchange point; the fee estimates are the community investigator's.",
    status: "active",
    excerpt:
      "the cryptocurrency platform CyberLeek has used to host his dedicated coin is subject to 'know your customer' (KYC) verification rules, which could allow law enforcement to extract the leaker's identity using a subpoena.",
  },
  {
    id: "LEEK-SRC-084",
    publisher: "AOL (syndicated)",
    author: "Aashna (SoapCentral)",
    title:
      "Following GTA 6 'Nudist town' leak, Cyberleek warns Lucia spoilers may be coming next",
    url: "https://www.aol.com/articles/following-gta-6-nudist-town-152131000.html",
    publishedDate: "2026-08-24",
    eventDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "AOL syndication of a SoapCentral entertainment piece, updated 2026-08-24 15:56 UTC. Quotes the watermark text on the 'Nudist Town' clip (an actor statement) and describes the poll; the title was completed from the article's section heading.",
    status: "active",
  },
  {
    id: "LEEK-SRC-085",
    publisher: "Outlook India Respawn",
    author: "Probaho Santra",
    title: "GTA VI Leak Raises PC Build and Rockstar India Questions",
    url: "https://respawn.outlookindia.com/gaming/gaming-news/gta-vi-leak-raises-pc-build-and-rockstar-india-questions",
    publishedDate: "2026-08-23",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Indian magazine's gaming vertical, published 2026-08-23 (IST). Carries the 'PC build' and 'Rockstar India' speculation sourced to social posts; community claims, not findings.",
    status: "active",
  },
  {
    id: "LEEK-SRC-086",
    publisher: "DualShockers",
    author: "Daniel Trock",
    title: "Discord Says No GTA 6 Subpoena So Far as User Data Fears Mount",
    url: "https://www.dualshockers.com/discord-says-no-gta-6-subpoena-so-far-as-user-data-fears-mount",
    publishedDate: "2026-08-25",
    eventDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Valnet gaming site, published 2026-08-25T14:50Z, carrying Discord's statement that it had not yet received the subpoena (tier 4 content via a tier 7 outlet). The captured body is site chrome only; the page description is quoted. The title was completed from the URL slug.",
    status: "active",
    excerpt:
      "A Discord rep confirmed the company had not yet received Take-Two's subpoena, and will consider user privacy if and when they do.",
  },

  /* ---------------------------------------------------------------- */
  /* Tier 9: blockchain data; crypto press                             */
  /* ---------------------------------------------------------------- */
  {
    id: "LEEK-SRC-087",
    publisher: "CoinGecko",
    title: "CYBERLEEK/USD Live Price Chart, Market Cap & News",
    url: "https://www.coingecko.com/en/coins/cyberleek",
    publishedDate: "2026-08-26",
    retrievedDate: "2026-08-26",
    primary: true,
    tier: 9,
    type: "blockchain-data",
    reliabilityNotes:
      "Market data aggregator page for the token, captured 2026-08-26. Values are point-in-time and change continuously; the page is not a dated publication (publication date approximate, set to the capture date). Cryptopolitan reports the page flags the contract as a scam.",
    status: "active",
  },
  {
    id: "LEEK-SRC-088",
    publisher: "Cryptopolitan",
    author: "Hannah Collymore",
    title: "CyberLeek meme token draws traders as GTA 6 leaks spark backlash",
    url: "https://www.cryptopolitan.com/cyberleek-meme-token-gta-6-leaks",
    publishedDate: "2026-08-25",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "financial-press",
    reliabilityNotes:
      "Crypto news site, published 2026-08-25. Token figures are read from CoinGecko; its market cap 'above $14 million' contrasts with BeInCrypto's $22 million two days earlier, reflecting volatility rather than error. Also quotes Stop Killing Games' rejection of the actor.",
    status: "active",
    excerpt:
      "Coingecko data shows that the token now has a market cap of over $14 million, while the token trades around $0.01913, having declined by over 9% in the past 24 hours.",
  },
  {
    id: "LEEK-SRC-089",
    publisher: "BeInCrypto",
    author: "Luis Blanco",
    title: "CYBERLEEK Meme Coin Explodes 1,400% Amid GTA VI Leak Controversy",
    url: "https://beincrypto.com/gta-vi-cyberleek-meme-coin-rally",
    publishedDate: "2026-08-23",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "financial-press",
    reliabilityNotes:
      "Crypto news site, published 2026-08-23 14:26 UTC and updated 18:39 UTC. Its lead and bullets relay the automatic-release threat as an actor claim while the body notes a fact-check found the 'Notice to Rockstar' screenshot fabricated. Price figures (1,400% gain, $22 million cap) are CoinGecko readings at the time.",
    status: "active",
    excerpt:
      "A recent fact-check found that the specific \"Notice to Rockstar\" screenshot, cited as proof of the automatic release threat, does not appear on CyberLeek's actual website and is considered fabricated.",
  },
  {
    id: "LEEK-SRC-090",
    publisher: "Binance Square (user post)",
    title: "$CYBERLEEK rebounds 40% as Solana meme volatility spikes to $14.5M market cap",
    url: "https://www.binance.com/en/square/post/359537976653580",
    publishedDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 11,
    type: "social-post",
    reliabilityNotes:
      "User post on an exchange's social feed; low reliability and promotional in tone. Publication date approximate, inferred from the $14.5 million cap and the 27% supply burn it mentions, which other sources place around 2026-08-23 to 08-24. The original title carried emoji, removed here.",
    status: "active",
  },

  /* ---------------------------------------------------------------- */
  /* Tier 10 and 11: community research, forums, social                */
  /* ---------------------------------------------------------------- */
  {
    id: "LEEK-SRC-091",
    publisher: "Bleap Finance blog",
    title: "CyberLeek GTA 6 Ransom: The $165K Demand Explained",
    url: "https://www.bleap.finance/blog/cyberleek-gta-6-ransom",
    publishedDate: "2026-08-25",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 10,
    type: "community-research",
    reliabilityNotes:
      "Crypto company blog, dated 2026-08-25. Explainer framed around the 400 XMR contact fee; check every figure against journalism (LEEK-SRC-015, LEEK-SRC-026). Content marketing rather than reporting.",
    status: "active",
  },
  {
    id: "LEEK-SRC-092",
    publisher: "Bleap Finance blog",
    title: "Who Is CyberLeek? Inside the GTA 6 Leaks, Crypto Coin and Demands",
    url: "https://www.bleap.finance/en-us/blog/who-is-cyberleek-gta-6-leaks",
    publishedDate: "2026-08-23",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 10,
    type: "community-research",
    reliabilityNotes:
      "Crypto company blog, dated 2026-08-23. Aggregated explainer; the registry title was truncated and has been completed from context. Content marketing rather than reporting.",
    status: "active",
  },
  {
    id: "LEEK-SRC-093",
    publisher: "GTAForums",
    title: "[Speculation & Theories] How did CyberLeek happen?",
    url: "https://gtaforums.com/topic/1007063-speculation-theories-how-did-cyberleek-happen",
    publishedDate: "2026-08-24",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 10,
    type: "community-research",
    reliabilityNotes:
      "Community speculation thread with a member poll on how access was obtained (185 votes at capture). Publication date approximate: the thread shows 'Monday at 04:49 PM' relative to the 2026-08-26 capture, so 2026-08-24. Pages 1 and 2 captured. Everything in it is speculation; nothing here supports an access hypothesis on its own.",
    status: "active",
  },
  {
    id: "LEEK-SRC-094",
    publisher: "GTAForums (Vice Cit investigation, archived Reddit post)",
    author: "Vice Cit (GTAForums user)",
    title:
      "Archived (Reddit): Before Cyberleek, the mystery behind stayonthegrindd (incl. Vice Cit 'CYBERLEEK Investigation Part 3 - Timeline')",
    url: "https://gtaforums.com/topic/1007081-archived-reddit-before-cyberleek-the-mystery-behind-stayonthegrindd/",
    publishedDate: "2026-08-25",
    eventDate: "2026-08-18",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 10,
    type: "community-research",
    reliabilityNotes:
      "Community forensic thread: a GTAForums archive of a deleted Reddit post about a Discord account, plus Vice Cit's 'Part 3' timeline (page 7) comparing Discord message times with Arweave upload timestamps. The blockchain timestamps are checkable; the Discord screenshots and the link to any person are community claims. Do not treat as attribution. Summarised by Kotaku (LEEK-SRC-028).",
    status: "active",
    excerpt:
      "At 16:03 UTC on August 18th the user claims they can \"share the full map quickly\". The full map is then uploaded on Arweave at 17:28:34 UTC.",
  },
  {
    id: "LEEK-SRC-095",
    publisher: "Reddit r/GTA6",
    title:
      "Everything we know about Cyberleek and his GTA VI build (r/GTA6 community thread)",
    url: "https://www.reddit.com/r/GTA6/comments/1vu4tdk/everything_we_know_about_cyberleek_and_his_gta_vi/",
    publishedDate: "2026-08-22",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 11,
    type: "social-post",
    reliabilityNotes:
      "Community explainer thread. Not retrieved (Reddit blocked the 2026-08-27 fetch); known through search result metadata, which shows it repeats the Vice Cit cost and fee estimates and dates the build after January 2025 from a licensed song. Publication date approximate: the snippet references the 'hypercar 1' clip of 08-21, so 2026-08-22 is used.",
    status: "active",
  },
  {
    id: "LEEK-SRC-096",
    publisher: "Reddit r/GTA6unmoderated",
    title:
      "The most likely timeline of how the CyberLeek GTA 6 leak was set up (community post)",
    url: "https://www.reddit.com/r/GTA6unmoderated/comments/1vuru6u/the_most_likely_timeline_of_how_the_cyberleek_gta/",
    publishedDate: "2026-08-23",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 11,
    type: "social-post",
    reliabilityNotes:
      "Community post cited by GameSpot (LEEK-SRC-026) for the claims that CyberLeek domains were registered around August 14 and the token, site and voting program created around August 15. Not retrieved (Reddit blocked the 2026-08-27 fetch); the excerpt is from search result metadata. Publication date approximate: it was cited by GameSpot's 08-24 timeline, so 2026-08-23 is used. Community claim only.",
    status: "active",
    excerpt: "August 14 Infrastructure associated with Cyberleek is funded",
  },
  {
    id: "LEEK-SRC-097",
    publisher: "Icon Era forum",
    title: "CyberLeek claims he will release a playable GTA VI build within a week",
    url: "https://icon-era.com/threads/cyberleek-claims-he-will-release-a-playable-gta-vi-build-within-a-week.20890",
    publishedDate: "2026-08-22",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 11,
    type: "social-post",
    reliabilityNotes:
      "Gaming forum thread relaying a purported CyberLeek claim about releasing a playable build. Publication date approximate: the thread shows 'Saturday at 07:01' relative to the 2026-08-26 capture, so 2026-08-22. The claim it relays coincides with the fabricated dead man's switch material retracted the next day (LEEK-SRC-044); treat as unverified.",
    status: "active",
  },
  {
    id: "LEEK-SRC-098",
    publisher: "IGN Daily Fix (YouTube)",
    title: "GTA 6 Gameplay & Full Map Leak Online - IGN Daily Fix",
    url: "https://www.youtube.com/watch?v=GIBuBcsvj9s",
    publishedDate: "2026-08-19",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "IGN's daily video news segment, uploaded 2026-08-19; the capture is an auto-transcript. Summarises IGN's written coverage of the first two days. LEEK must not link leaked footage; this is a news segment, not a reupload.",
    status: "active",
  },

  /* ---------------------------------------------------------------- */
  /* Reference and late additions                                      */
  /* ---------------------------------------------------------------- */
  {
    id: "LEEK-SRC-099",
    publisher: "BBC News",
    title: "GTA 6 hacker Arion Kurtaj handed indefinite hospital order (2023)",
    url: "https://www.bbc.com/news/technology-67663128",
    publishedDate: "2023-12-21",
    eventDate: "2023-12-21",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 6,
    type: "reference",
    reliabilityNotes:
      "Background reference for the 2022 Lapsus$ GTA VI leak and the December 2023 sentencing, relevant to the actor's reported 'our colleague' remark. Not retrieved (the 2026-08-27 fetch was blocked); cited via search result metadata and via CyberScoop and Den of Geek, which cite the same BBC reporting. Not a source on the 2026 campaign.",
    status: "active",
  },
  {
    id: "LEEK-SRC-100",
    publisher: "Variety",
    author: "Jennifer Maas",
    title:
      "'GTA 6' Developer Rockstar Games Subpoenas Microsoft, Discord Amid Leaks",
    url: "https://variety.com/2026/gaming/news/gta-6-leaks-rockstar-subpoenas-microsoft-discord-1236840176/",
    publishedDate: "2026-08-21",
    eventDate: "2026-08-20",
    retrievedDate: "2026-08-26",
    primary: false,
    tier: 6,
    type: "tech-journalism",
    reliabilityNotes:
      "Entertainment trade paper, published 2026-08-21T17:01Z. The registry title has been replaced with the page headline recorded in the corpus search metadata. A direct fetch on 2026-08-27 returned 402, but the corpus holds the page text. Reports the filings and quotes them; secondary to LEEK-SRC-002 and LEEK-SRC-004.",
    status: "active",
    excerpt:
      "Take-Two is seeking data from both Microsoft and Discord under the Digital Millennium Copyright Act to \"identify alleged infringers at issue.\"",
  },
  {
    id: "LEEK-SRC-101",
    publisher: "Tom's Hardware",
    title:
      "Rockstar releases statement after a week of GTA VI leaks, avoids mentioning leaker's demands, says that gameplay leaks have been 'heartbreaking for our team'",
    url: "https://www.tomshardware.com/video-games/rockstar-releases-statement-after-a-week-of-gta-vi-leaks-avoids-mentioning-leakers-demands-says-that-gameplay-leaks-have-been-heartbreaking-for-our-team",
    publishedDate: "2026-08-26",
    eventDate: "2026-08-26",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "Established tech outlet carrying Rockstar's statement. The 2026-08-27 fetch returned only site chrome and the headline, so the statement text was not captured from this page; cited for the headline and date. Use LEEK-SRC-102 for the captured full text.",
    status: "active",
  },
  {
    id: "LEEK-SRC-102",
    publisher: "Forbes (Paul Tassi)",
    author: "Paul Tassi",
    title: "Rockstar Posts Statement On 'GTA 6' Leaks As Lucia Story Spoilers Hit",
    url: "https://www.forbes.com/sites/paultassi/2026/08/26/rockstar-posts-statement-on-gta-6-leaks-as-lucia-story-spoilers-hit/",
    publishedDate: "2026-08-26",
    eventDate: "2026-08-26",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Forbes senior contributor column, published 2026-08-26 09:18 EDT and updated 11:43 EDT, fetched 2026-08-27. Reproduces the full text of Rockstar's statement from 'Dear all' to 'Sincerely, Rockstar Games'; the fragments checked against Kotaku (LEEK-SRC-031) and GameSpot (LEEK-SRC-026) match. The rest of the column is opinion.",
    status: "active",
    excerpt:
      "While it is unfortunate that the intended game experience may now be impacted by some spoilers, we hope that everyone will wait a bit longer to experience the game for themselves on November 19.",
  },
  {
    id: "LEEK-SRC-103",
    publisher: "Notebookcheck",
    author: "Abdul Haddi",
    title:
      "12th GTA 6 leak goes online just two days before the Netflix Extended Look",
    url: "https://www.notebookcheck.net/12th-GTA-6-leak-goes-online-just-two-days-before-the-Netflix-Extended-Look.1378007.0.html",
    publishedDate: "2026-08-25",
    eventDate: "2026-08-25",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "Hardware news site, published 2026-08-25, fetched 2026-08-27. Short description of a strip club clip counted as the twelfth leak; clip counts differ between outlets, so use the date rather than the ordinal.",
    status: "active",
  },
  {
    id: "LEEK-SRC-104",
    publisher: "VideoCardz",
    title:
      "Rockstar finally responds to GTA 6 leaker, Cyberleek immediately posts another gameplay",
    url: "https://videocardz.com/newz/rockstar-finally-responds-to-gta-6-leaker-cyberleek-immediately-posts-another-gameplay",
    publishedDate: "2026-08-26",
    eventDate: "2026-08-26",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 7,
    type: "tech-journalism",
    reliabilityNotes:
      "GPU news site. Not retrieved (the 2026-08-27 fetch returned 402); cited via search result metadata for the sequence of Rockstar's statement followed by another clip, which Kotaku and Mashable also report.",
    status: "active",
  },
  {
    id: "LEEK-SRC-105",
    publisher: "GamesHub",
    title:
      "Rockstar Games finally acknowledges the GTA 6 CyberLeek leaks in heartfelt statement",
    url: "https://www.gameshub.com/news/news/rockstar-games-gta-6-leaks-statement/",
    publishedDate: "2026-08-26",
    eventDate: "2026-08-26",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Australian games outlet carrying Rockstar's statement. Not retrieved (the 2026-08-27 fetch timed out); cited via search result metadata. Use LEEK-SRC-102 for the statement text.",
    status: "active",
  },
  {
    id: "LEEK-SRC-106",
    publisher: "OpenCritic",
    title:
      "Netflix gives new official update on GTA 6: An Extended Look amid ongoing leaks",
    url: "https://opencritic.com/news/35706/netflix-gives-new-official-update-on-gta-6-an-extended-look-amid-ongoing-leaks",
    publishedDate: "2026-08-26",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Review aggregator's news desk. Not retrieved (the 2026-08-27 fetch timed out); cited via search result metadata for the Extended Look timing (2026-08-27 15:00 ET on Netflix, YouTube six hours later), which BigGo, IGN and GTABoom also state.",
    status: "active",
  },
  {
    id: "LEEK-SRC-108",
    publisher: "ComicBook.com",
    author: "Amanda Kay Oaks",
    title: "Rockstar Finally Responds to GTA 6 Leaks Ahead of Netflix Extended Look",
    url: "https://comicbook.com/gaming/news/rockstar-gta-6-leaks-official-statement-ahead-of-netflix-extended-look/",
    publishedDate: "2026-08-26",
    eventDate: "2026-08-26",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Entertainment news site, published 2026-08-26 08:47, fetched 2026-08-27. Links the @RockstarGames X post and paraphrases the statement rather than reproducing it; useful for the post's existence and timing, not for wording.",
    status: "active",
    excerpt:
      "In a lengthy social media post on August 26th, the official Rockstar Games shared an update",
  },
  {
    id: "LEEK-SRC-109",
    publisher: "Bloomberg (Jason Schreier newsletter)",
    author: "Jason Schreier",
    title: "Rockstar Rattled as Grand Theft Auto VI Leaks Again",
    url: "https://www.bloomberg.com/news/newsletters/2026-08-21/rockstar-rattled-as-grand-theft-auto-vi-leaks-again",
    publishedDate: "2026-08-21",
    eventDate: "2026-08-21",
    retrievedDate: "2026-08-27",
    primary: true,
    tier: 6,
    type: "investigative-journalism",
    reliabilityNotes:
      "Original reporting by a well-sourced games journalist, paywalled. Not retrieved directly; its findings (Rockstar had not identified the leaker or the cause, an internal email, staff frustration, the reveal date unchanged) are cited as relayed and quoted by GTABoom [S053] and IGN. The URL was taken from GTABoom's link to the newsletter.",
    status: "active",
  },
  {
    id: "LEEK-SRC-110",
    publisher: "Kotaku",
    title: "GTA 6 Leaks Could Be Over As Leaker Cashes Out Memecoin",
    url: "https://kotaku.com/gta6-grand-theft-auto-6-leaks-cyberleek-memecoin-rockstar-cash-out-2000728825",
    publishedDate: "2026-08-27",
    eventDate: "2026-08-27",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Established gaming outlet reporting a community on-chain analysis (GTAForums) of transfers out of the token creator's wallets in the early hours of 2026-08-27. The cash-out figures originate with community research and are labelled as such; the headline's 'could be over' is a hedge, not a finding. Discovered by the intel:update pipeline and reviewed the same day.",
    status: "active",
  },
  {
    id: "LEEK-SRC-111",
    publisher: "CoinDesk",
    title: "Hacker leaks GTA VI footage to push a crypto token before pulling off a $270,000 cash-out",
    url: "https://www.coindesk.com/business/2026/08/27/gta-6-leaker-cashes-out-of-his-own-memecoin-hours-before-rockstar-s-gameplay-reveal",
    publishedDate: "2026-08-27",
    eventDate: "2026-08-27",
    retrievedDate: "2026-08-27",
    primary: true,
    tier: 6,
    type: "financial-press",
    reliabilityNotes:
      "Specialist crypto outlet with its own on-chain reading of the $CYBERLEEK creator wallets. Treated as original reporting for the cash-out figure; dollar values depend on the token price at the moment of each transfer and differ from other outlets ($250,000 to $270,000). Discovered by the intel:update pipeline and reviewed the same day.",
    status: "active",
  },
  {
    id: "LEEK-SRC-112",
    publisher: "Dexerto",
    title: "GTA 6 leaker Cyberleek cashing out over $250k from meme coin ahead of Netflix reveal",
    url: "https://www.dexerto.com/gta/gta-6-leaker-cyberleek-cashing-out-over-250k-from-meme-coin-ahead-of-netflix-extended-look-3402924/",
    publishedDate: "2026-08-27",
    eventDate: "2026-08-27",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Gaming and esports outlet relaying the GTAForums (Vice Cit) breakdown of the transfers and the token's fall from a $0.034 peak to below $0.005 (about 86 percent), market cap from $23.39 million to $3.23 million. Figures are the community's; the price figures are point-in-time. Not retrieved directly; cited via search result metadata.",
    status: "active",
  },
  {
    id: "LEEK-SRC-113",
    publisher: "Kotaku",
    title: "GTA 6 Leaks Increasingly Seem To Be Just A Big Crypto Scam",
    url: "https://kotaku.com/gta-6-leaks-crypto-scam-2000726671",
    publishedDate: "2026-08-21",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "Kotaku analysis of the token mechanics (creator fees on every trade, about $11.8 million traded on 2026-08-18) drawing on community wallet research. An argued position on motive, recorded as one side of the disputed profit-motive claim rather than as a finding.",
    status: "active",
  },
  {
    id: "LEEK-SRC-114",
    publisher: "LatestLY",
    title: "GTA 6 Leaks: Cyberleek Arrested by FBI? Unverified Reports and Crypto Wallet Trail Emerge Amid Game Map Leaks",
    url: "https://www.latestly.com/gaming/gta-6-leaks-cyberleek-arrested-by-fbi-unverified-reports-and-crypto-wallet-trail-emerge-amid-game-map-leaks-7569921.html",
    publishedDate: "2026-08-21",
    eventDate: "2026-08-21",
    retrievedDate: "2026-08-27",
    primary: false,
    tier: 7,
    type: "gaming-journalism",
    reliabilityNotes:
      "News aggregator that explicitly labels the arrest reports unverified and attributes them to Reddit posts after about twelve hours of account silence. Low reliability; used only as the carrier of the rumour, not for any fact about the actor. Discovered by the intel:update pipeline.",
    status: "active",
  },
];

export const sourceById: Record<string, Source> = Object.fromEntries(
  sources.map((s) => [s.id, s]),
);

export function tierOf(id: string): SourceTier | undefined {
  return sourceById[id]?.tier;
}
