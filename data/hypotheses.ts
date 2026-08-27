import type { Hypothesis } from "./types";

/**
 * Initial-access hypotheses for the /access page.
 *
 * Initial access is UNKNOWN. Nothing below states or implies how CyberLeek
 * obtained GTA VI material. Each entry is a hypothesis that appears in public
 * reporting, in community discussion, in the actor's own claims, or is an
 * analyst framing labelled as such. Evidence strings end with the registry
 * source id that carries them.
 */
export const hypotheses: Hypothesis[] = [
  {
    id: "LEEK-HYP-001",
    title: "Xbox development kit or console development environment",
    origin: "community",
    summary:
      "Early rumours held that the material came from an Xbox development kit or a console development environment. The rumour was repeated in press round-ups but no outlet has evidenced it, and the strongest devkit claims in the corpus belong to a separate, second group rather than to CyberLeek. Claim LEEK-CLM-006.",
    supportingEvidence: [
      "Yahoo Tech noted that rumours had circulated that the GTA VI builds emerged from an Xbox dev kit, while adding it was unclear whether that was true [LEEK-SRC-065]",
      "Take-Two's Microsoft petition asks for linked Xbox account data alongside OneDrive and device identifiers, which press read as an interest in console-linked accounts [LEEK-SRC-029]",
      "A separate group, described as unrelated to CyberLeek, claimed access to an Xbox development kit containing a build; the claim is unverified and does not concern CyberLeek [LEEK-SRC-078]",
      "BigGo's round-up repeated the second group's Xbox devkit claim and noted separate reporting that the material was running on PC rather than a devkit [LEEK-SRC-062]",
    ],
    contradictingEvidence: [
      "Outlook India relayed a creator's report that multiple developers believe the footage came from a PC build rather than a PS5 or Xbox Series X devkit, citing the restricted nature of console development hardware; the claim is not independently established [LEEK-SRC-085]",
      "EGW, paraphrasing Bloomberg's Jason Schreier, reported the view that a working build in the leaker's hands would have to be the PC build because the leaker has no dev kit from Rockstar [LEEK-SRC-082]",
      "GTAForums participants argued that development kits do not leave studio premises and that a console kit spun up outside the studio would trigger alerts; this is community reasoning, not evidence [LEEK-SRC-093]",
      "GTA Intel noted the devkit story traces to unconfirmed posts and is contested even in its basic details [LEEK-SRC-072]",
    ],
    confidence: "low",
    whatWouldConfirm:
      "A court filing, a Rockstar or Take-Two statement, or a Microsoft statement identifying console development hardware as the source; or a credible outlet reporting build metadata or console-specific debug overlays in the footage.",
    sourceIds: ["LEEK-SRC-065", "LEEK-SRC-029", "LEEK-SRC-078", "LEEK-SRC-062", "LEEK-SRC-085", "LEEK-SRC-082", "LEEK-SRC-093", "LEEK-SRC-072"],
  },
  {
    id: "LEEK-HYP-002",
    title: "PC development build, including the 'pirated PC version' reading",
    origin: "credible-reporting",
    summary:
      "Several outlets relayed the view that the footage was captured from an internal PC build rather than console hardware. The basis is developer commentary relayed through a creator's post and a Bloomberg newsletter paraphrase. The 'pirated PC version' headline is weaker still: the article behind it is mostly about a second group. Claim LEEK-CLM-007.",
    supportingEvidence: [
      "Outlook India reported that developers cited by creator TheRavenHelm believe the footage came from a PC build, reasoning that internal PC builds can run debug executables on conventional hardware; the outlet stresses the claim is not independently established [LEEK-SRC-085]",
      "EGW's paraphrase of Bloomberg's Jason Schreier states that CyberLeek has access to a working build rather than prerecorded footage and that this must be the PC build [LEEK-SRC-082]",
      "ProPakistani's 'pirated PC version' piece relays a report citing developers and industry sources that the latest content is running on a PC rather than an Xbox devkit [LEEK-SRC-078]",
      "Community analysis notes the absence of console-style QA overlays and watermarks in the clips, which some read as consistent with an internal PC build [LEEK-SRC-093]",
    ],
    contradictingEvidence: [
      "No outlet has published build metadata, and neither Rockstar nor Take-Two has described the platform of the leaked build [LEEK-SRC-053]",
      "The ProPakistani article's own body concerns a separate second group and Xbox devkit claims; it does not evidence a PC version in CyberLeek's hands [LEEK-SRC-078]",
      "The only 'playable PC version' offers in the corpus appear on a site captured at cyber-leek.online on 2026-08-26 whose content diverges from press descriptions of the actor's site, so they cannot be treated as an actor statement, let alone as evidence [LEEK-SRC-008]",
      "GTA VI is not scheduled for a PC release at launch, so a PC build would be an internal development artefact rather than a distributable product; this makes the 'pirated' framing imprecise [LEEK-SRC-013]",
    ],
    confidence: "low",
    whatWouldConfirm:
      "A court filing or a Rockstar or Take-Two statement describing the platform of the leaked build; or a credible outlet reporting Windows-specific build artefacts or debug overlays from the footage.",
    sourceIds: ["LEEK-SRC-085", "LEEK-SRC-082", "LEEK-SRC-078", "LEEK-SRC-093", "LEEK-SRC-053", "LEEK-SRC-008", "LEEK-SRC-013"],
  },
  {
    id: "LEEK-HYP-003",
    title: "Outsourcing partner or Rockstar India as the origin of the material",
    origin: "community",
    summary:
      "A viral theory places the origin at Rockstar India or another outsourcing partner. It began as a TweakTown rumour and spread through social posts that added phishing, Russian intermediaries and a multi-million-dollar sale. Every outlet that carried it labelled it unverified, and several attach it to a second, separate group rather than to CyberLeek. Claim LEEK-CLM-008.",
    supportingEvidence: [
      "Outlook India relayed the theory that a Rockstar India employee was compromised through phishing and that the build was later sold to CyberLeek for around $50M, describing it as entirely unverified and based on viral social posts [LEEK-SRC-085]",
      "Outlook India noted workforce estimates of roughly 1,615 India-based developers on GTA VI and prior leaks associated with Indian outsourcing studios, while stating those incidents do not establish this leak's origin [LEEK-SRC-085]",
      "ProPakistani reported a since-deleted Reddit post claiming a second group phished a Rockstar employee in India; the claim is unconfirmed and concerns the second group [LEEK-SRC-078]",
      "EGW stated that a second group breached Rockstar's India division and pulled technical data, citing an insider account; this is unverified and again concerns the second group [LEEK-SRC-082]",
    ],
    contradictingEvidence: [
      "Neither Rockstar nor Take-Two has confirmed a phishing attack, Russian involvement, or any sale [LEEK-SRC-085]",
      "GTA Intel noted there is no independent confirmation of the phishing story, that it traces to a Reddit post, and that the second group's material had not drawn Take-Two DMCA action [LEEK-SRC-072]",
      "As of 2026-08-21 Rockstar had not identified who was behind CyberLeek or how the breach happened, per Bloomberg as relayed by GTABoom [LEEK-SRC-053]",
    ],
    confidence: "low",
    whatWouldConfirm:
      "A Rockstar or Take-Two statement, a court filing naming a partner studio or contractor, or credible reporting from named sources inside the investigation.",
    sourceIds: ["LEEK-SRC-085", "LEEK-SRC-078", "LEEK-SRC-082", "LEEK-SRC-072", "LEEK-SRC-053"],
  },
  {
    id: "LEEK-HYP-004",
    title: "Insider or contractor with legitimate build access",
    origin: "credible-reporting",
    summary:
      "Security commentators and gaming outlets have framed the case as one that may involve a person with legitimate access, whether a Rockstar employee, a contractor, or a tester. The framing rests on the apparent interactive control shown in the footage and on the shape of Take-Two's subpoenas. No source has named or evidenced any insider, and the outlets present this as a hypothesis, not a finding.",
    supportingEvidence: [
      "CyberScoop quoted an Infoblox researcher who said Take-Two's actions indicate it is approaching the breach like an insider threat investigation, and that whoever leaked the footage may have had access to an actual build [LEEK-SRC-014]",
      "GTABoom discussed an 'insider access theory' in light of the LEEK wall clip, while stating it was neither confirming nor concluding anything [LEEK-SRC-053]",
      "PCMag wrote that it is unclear whether Rockstar was hacked or whether the leak happened through a test user or a former employee [LEEK-SRC-015]",
      "The Microsoft petition seeks device identifiers, OneDrive contents and linked accounts for members of named Discord servers, a scope security researchers described as unusually broad [LEEK-SRC-029]",
      "EGW, paraphrasing Bloomberg, reported that Rockstar ended remote work after the 2022 breach and that staff were angry the game leaked anyway, which observers read as pointing inward [LEEK-SRC-082]",
    ],
    contradictingEvidence: [
      "No court filing, corporate statement or credible report names an insider; Rockstar had not identified the source as of 2026-08-21 [LEEK-SRC-053]",
      "Community discussion offers alternatives that do not require an insider, including a compromised remote-access session; these are speculation with no evidence [LEEK-SRC-093]",
      "A former Rockstar technical director described the leaks as a minor matter for the studio, which does not bear on origin but tempers the 'inside job' framing [LEEK-SRC-075]",
    ],
    confidence: "low",
    whatWouldConfirm:
      "A court filing or criminal charge naming a person with authorised access; a Rockstar or Take-Two statement describing an internal source; or credible reporting that the subpoenaed records led to an employee or contractor.",
    sourceIds: ["LEEK-SRC-014", "LEEK-SRC-053", "LEEK-SRC-015", "LEEK-SRC-029", "LEEK-SRC-082", "LEEK-SRC-093", "LEEK-SRC-075"],
  },
  {
    id: "LEEK-HYP-005",
    title: "Reuse of material from a prior compromise (2022 Lapsus$ leak or the April 2026 third-party incident)",
    origin: "actor",
    summary:
      "The actor's reported reference to the 2022 GTA VI leaker as 'our colleague' invited the idea that the material or the access derives from an earlier incident, either the 2022 Lapsus$ breach or the April 2026 ShinyHunters incident that touched Rockstar data through a third-party vendor. No source establishes either link, and several point the other way. Claims LEEK-CLM-018 and LEEK-CLM-019.",
    supportingEvidence: [
      "In a Telegram statement relayed by a fan account, CyberLeek reportedly referred to Arion Kurtaj, the hacker behind the 2022 leak, as 'our colleague' [LEEK-SRC-016]",
      "The relayed Telegram statement is the only actor text in the corpus that references a prior incident [LEEK-SRC-009]",
      "Malwarebytes recounted that in April 2026 ShinyHunters obtained Rockstar records by compromising a cloud analytics vendor rather than Rockstar's own systems [LEEK-SRC-013]",
    ],
    contradictingEvidence: [
      "Mashable reported there is no established connection between CyberLeek and ShinyHunters, and that Rockstar described the April breach as involving a limited amount of unimportant company information [LEEK-SRC-016]",
      "The 2022 leak consisted of roughly 90 videos of an early build; Outlook India noted the current material appears to involve a different and potentially more recent build [LEEK-SRC-085]",
      "CyberLeek's own on-screen text in the 2026-08-26 prologue clip claims the build is 'actually recent', which, if true, is inconsistent with reuse of 2022 material [LEEK-SRC-031]",
      "Kurtaj was under an indefinite hospital order from 2023 and, per Den of Geek, is awaiting retrial; nothing in the record links him to the 2026 activity [LEEK-SRC-099]",
    ],
    confidence: "low",
    whatWouldConfirm:
      "A court filing or credible forensic reporting matching build identifiers or assets to the 2022 material or to data taken in the April 2026 incident; or a statement from Rockstar, Take-Two, or law enforcement linking the incidents.",
    sourceIds: ["LEEK-SRC-016", "LEEK-SRC-009", "LEEK-SRC-013", "LEEK-SRC-085", "LEEK-SRC-031", "LEEK-SRC-099", "LEEK-SRC-049"],
  },
  {
    id: "LEEK-HYP-006",
    title: "Capture library only: pre-recorded footage without ongoing interactive access",
    origin: "community",
    summary:
      "One reading of what CyberLeek holds is a finite library of recordings, made or obtained in one or a few sessions, that is being cut into clips and released on a schedule. This would limit future exposure to whatever was recorded. The 2026-08-20 LEEK wall clip is the main evidence against it, since spelling a word with bullet holes requires someone controlling the game at the time of capture.",
    supportingEvidence: [
      "GTAForums participants, including the thread's author, argued the clips look spliced from a small number of longer recordings and noted locations change little between clips [LEEK-SRC-093]",
      "Mashable relayed leaker NateTheHate's assessment that the footage is more than a year old and Insider Gaming's view that it may date to 2024 or earlier, which fits an archived capture set [LEEK-SRC-016]",
      "Forbes allowed for a source sending the leaker live footage as an alternative to the leaker playing a build [LEEK-SRC-025]",
      "Community commentators observed that a leaker with a build would likely have shown Lucia in free roam or other high-demand content sooner, and that the prologue may be the last substantial item held [LEEK-SRC-093]",
    ],
    contradictingEvidence: [
      "The 2026-08-20 clip ends with the player shooting the word 'LEEK' into a wall, which Forbes, Tom's Hardware, Mashable and GTABoom all read as requiring real-time control of the game rather than a pre-recorded file [LEEK-SRC-025]",
      "Tom's Hardware characterised the clip as showing a full working build in the leaker's hands [LEEK-SRC-040]",
      "Mashable noted that CyberLeek released the plane footage after a token-weighted poll chose that option, and that the clip carried the LEEK message, consistent with content produced on demand [LEEK-SRC-016]",
      "The community timeline for the Discord account 'stayonthegrindd' has requested content appearing on Arweave hours after it was promised; the attribution is unresolved but the timing is inconsistent with a fixed library [LEEK-SRC-094]",
      "Kotaku reported the 2026-08-25 game-store clip carried on-screen messaging tied to the current news cycle, suggesting recent capture [LEEK-SRC-028]",
    ],
    confidence: "low",
    whatWouldConfirm:
      "Credible reporting that the clips share a single recording session's build identifiers or timestamps; a Rockstar or Take-Two statement bounding what was taken; or the leaks stopping at a fixed set without any content responsive to new events.",
    sourceIds: ["LEEK-SRC-093", "LEEK-SRC-016", "LEEK-SRC-025", "LEEK-SRC-040", "LEEK-SRC-094", "LEEK-SRC-028"],
  },
  {
    id: "LEEK-HYP-007",
    title: "Interactive playable build: control of a build at least at the time of recording",
    origin: "actor",
    summary:
      "The alternative reading is that CyberLeek, or someone supplying CyberLeek, controlled a playable development build when the footage was made and may still be able to record new material. Multiple outlets reached this reading independently from the LEEK wall clip. Whether such access persists today is unknown; Rockstar has not confirmed the footage or described the build. Claims LEEK-CLM-001 and LEEK-CLM-003.",
    supportingEvidence: [
      "Forbes described the LEEK wall clip as the first clear indication that CyberLeek is playing a build of the game rather than lifting test footage, while allowing that a source could be sending live footage [LEEK-SRC-025]",
      "Tom's Hardware reported the clip as evidence of a full working build [LEEK-SRC-040]",
      "Mashable explained that earlier clips could have been pre-recorded but the LEEK ending would require real-time control, so the recorder may have a playable build [LEEK-SRC-016]",
      "GTABoom's status table recorded 'Yes' to whether the leaker had the actual game, based on the same clip [LEEK-SRC-053]",
      "CyberLeek's on-screen text in the 2026-08-26 prologue clip claims 'This build is actually recent, and the game is not ready at all'; this is an actor claim [LEEK-SRC-031]",
      "Sportskeeda reported that CyberLeek claims full access to the game's build; this is an actor claim [LEEK-SRC-070]",
    ],
    contradictingEvidence: [
      "None of the footage has been publicly authenticated by Rockstar, and Mashable cautioned the clip could be misinterpreted or AI-generated [LEEK-SRC-016]",
      "Community analysts maintain that a pre-recorded library explains most of the clips and that the leaker has not demonstrated new content on request beyond the LEEK clip [LEEK-SRC-093]",
      "Assessments that the build is from 2025 or earlier (Forbes) or more than a year old (NateTheHate via Mashable) mean an interactive build, if held, may be stale rather than current [LEEK-SRC-025]",
      "The former Rockstar technical director's 'nothing burger' remarks do not address access but show that at least one industry veteran doubts the material's significance [LEEK-SRC-075]",
    ],
    confidence: "moderate",
    whatWouldConfirm:
      "Rockstar or Take-Two confirming that a build left their control; a court filing describing the build; or a credible outlet reporting build metadata from the footage. Continued release of content responsive to new requests would raise confidence in ongoing access without confirming it.",
    sourceIds: ["LEEK-SRC-025", "LEEK-SRC-040", "LEEK-SRC-016", "LEEK-SRC-053", "LEEK-SRC-031", "LEEK-SRC-070", "LEEK-SRC-093", "LEEK-SRC-075"],
  },
];

export const hypothesisById: Record<string, Hypothesis> = Object.fromEntries(
  hypotheses.map((h) => [h.id, h]),
);
