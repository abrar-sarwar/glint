import type { Drop } from "./types";

/**
 * One record per publicly reported CyberLeek release ("drop").
 * Dates are when the material appeared publicly, not article dates.
 * LEEK never links to or describes how to obtain the footage.
 */
export const drops: Drop[] = [
  {
    id: "LEEK-DRP-001",
    date: "2026-08-18",
    datePrecision: "approximate",
    reportedTitle: "Map sneak peeks (Dalton Island; Tequesta Retreat, Gloriana Key, Catalan Key)",
    mediaType: "map-image",
    description:
      "Two or three cropped sections of the in-game map that circulated before or alongside the full map. Mashable lists two sneak peeks (one showing Dalton Island, one showing Tequesta Retreat, Gloriana Key and Catalan Key); HotHardware counts three. A community forensic timeline says a partial map image was uploaded to an image host on 2026-08-16 carrying the actor's Arweave-style domain, two days before the public drops, but that dating is a community claim.",
    reveals: [
      "Place names in the Leonida Keys region",
      "Island and coastal layout consistent with earlier community reconstructions",
    ],
    securityRelevance:
      "Cropped images released ahead of the full map suggest staged, deliberate distribution rather than a single dump. They say nothing about how the map was obtained.",
    developmentRelevance:
      "Map naming and island layout match Rockstar's official marketing, so the crops appear to come from a real build rather than a fan reconstruction.",
    marketingRelevance:
      "Pre-empted Rockstar's own regional reveals by naming areas that had not been shown officially.",
    authenticity: "moderate",
    authenticityNote:
      "Consistent with the full map and with community mapping work; Take-Two takedowns targeted the map material generally. Not individually authenticated by Rockstar.",
    sourceIds: ["LEEK-SRC-017", "LEEK-SRC-059", "LEEK-SRC-085", "LEEK-SRC-028"],
    takedown: { status: "circulating", note: "Map images have been reposted and annotated widely; Tech Insider describes the map as past containment." },
    relatedClaimIds: ["LEEK-CLM-004", "LEEK-CLM-034"],
  },
  {
    id: "LEEK-DRP-002",
    date: "2026-08-18",
    datePrecision: "day",
    reportedTitle: "Basketball",
    mediaType: "video",
    description:
      "A clip of about a minute showing protagonist Jason Duval outside the oceanside house seen in official marketing, walking around and shooting hoops with a timing-based mechanic. A community forensic timeline says the same clip was uploaded to a dark-web forum on 2026-08-17 and shared on Discord early on 2026-08-18 before spreading publicly; that sequence is a community claim.",
    reveals: [
      "Playable basketball minigame",
      "A Focus stat that rises on a successful basket",
      "Minimal HUD with two currency reserves (wallet and home fund)",
    ],
    securityRelevance:
      "First public evidence that unreleased build footage was in third-party hands. On its own it could have been a pre-recorded capture.",
    developmentRelevance:
      "Shows a polished but unfinished build; the Focus mechanic may be minigame-specific.",
    marketingRelevance:
      "Broke Rockstar's controlled reveal cadence nine days before the Netflix Extended Look.",
    authenticity: "high",
    authenticityNote:
      "Take-Two DMCA takedowns began the same day (IGN, GameSpot, Insider Gaming). Rockstar's 2026-08-26 statement acknowledged that gameplay videos had leaked without disputing them.",
    sourceIds: ["LEEK-SRC-026", "LEEK-SRC-034", "LEEK-SRC-045", "LEEK-SRC-016", "LEEK-SRC-043"],
    takedown: { status: "partially-removed", note: "Original uploads and many reposts removed under copyright claims; copies continue to circulate." },
    relatedClaimIds: ["LEEK-CLM-001", "LEEK-CLM-004"],
    watermark: "$CYBERLEEK token promotion with QR code",
  },
  {
    id: "LEEK-DRP-003",
    date: "2026-08-18",
    datePrecision: "day",
    reportedTitle: "Random Video 1",
    mediaType: "video",
    description:
      "Jason drives through traffic, collides with a delivery van and fights the driver, who drops a wrench that Jason picks up and uses. The clip shows a wanted level rising and prompts at the rear of the car.",
    reveals: [
      "Six-star wanted level system",
      "Stamina bar during melee",
      "Loadout and Storage prompts at the vehicle",
      "Contextual NPC options (Defuse, Warn)",
      "An honor or mood style icon that changes after violence",
      "Fuel and vehicle-damage indicators",
    ],
    securityRelevance:
      "Second clip on day one, released within hours of the first per a community blockchain timeline; indicates the actor held more than one capture.",
    developmentRelevance:
      "Multiple HUD systems visible at once, some of which may be placeholders in an older build.",
    marketingRelevance:
      "Confirmed features (six stars, fuel) that Rockstar had not announced.",
    authenticity: "high",
    authenticityNote:
      "Subject to the same takedowns as the basketball clip; mechanics are consistent across later clips and with Rockstar's later official previews.",
    sourceIds: ["LEEK-SRC-026", "LEEK-SRC-034", "LEEK-SRC-045", "LEEK-SRC-043", "LEEK-SRC-017"],
    takedown: { status: "partially-removed" },
    relatedClaimIds: ["LEEK-CLM-004"],
    watermark: "$CYBERLEEK token promotion",
  },
  {
    id: "LEEK-DRP-004",
    date: "2026-08-18",
    datePrecision: "day",
    reportedTitle: "Full map of Leonida",
    mediaType: "map-image",
    description:
      "An image presented as the complete GTA VI map, apparently stitched from in-game screenshots. It shows the state of Leonida divided into five counties (Vice Dale, Mariana, Kelly, Leonard, Lummox per Insider Gaming), with an airport on a southern island, marshland, mountains and smaller keys.",
    reveals: [
      "Five named counties",
      "Overall landmass and island layout",
      "Railway network and a southern island airport",
    ],
    securityRelevance:
      "A stitched whole-map image implies access to a build with a fully rendered world map, not a single screenshot.",
    developmentRelevance:
      "Geography matches years of community reconstruction from trailers; some keys and markers were new.",
    marketingRelevance:
      "Removed the map as a reveal moment for Rockstar; Games.gg described the map as no longer a secret.",
    authenticity: "high",
    authenticityNote:
      "Mashable (2026-08-24) reported that a community mapping project closely resembles the leaked map; GameSpot cited mapping researchers finding numerous details line up. G2A cautioned that county borders and names remain unconfirmed by Rockstar.",
    sourceIds: ["LEEK-SRC-026", "LEEK-SRC-023", "LEEK-SRC-012", "LEEK-SRC-043", "LEEK-SRC-034"],
    takedown: { status: "circulating", note: "Widely reposted and annotated; takedowns have not contained it." },
    relatedClaimIds: ["LEEK-CLM-004", "LEEK-CLM-026"],
    watermark: "QR codes linking to the actor's site and token (per Coinspeaker citing Bitquery)",
  },
  {
    id: "LEEK-DRP-005",
    date: "2026-08-19",
    datePrecision: "day",
    reportedTitle: "Taser (Combat and Taser)",
    mediaType: "video",
    description:
      "Night-time footage of Jason entering a guarded sugar refinery in Ambrosia, fighting security guards, taking a taser and using it, picking up a dropped hat, and escaping in a truck. It ends with a short cutscene of Jason and a friend on a boat joking about using a VPN.",
    reveals: [
      "Taser as a weapon",
      "Disarm and pistol-whip finisher animations",
      "Clone Key or Smash Window options when stealing vehicles",
      "Vehicle health and fuel bars",
      "Restricted areas that trigger security response",
      "First cutscene fragment with dialogue",
    ],
    securityRelevance:
      "First cutscene fragment, which raised the possibility of story spoilers. The VPN joke was read by outlets as the actor taunting Rockstar.",
    developmentRelevance:
      "The in-game radio played a Tate McRae track released in January 2025, dating the build to 2025 or later.",
    marketingRelevance:
      "Showed combat systems ahead of the official reveal.",
    authenticity: "high",
    authenticityNote:
      "Subject to takedowns; the January 2025 track is a strong internal date marker cited by GameSpot, Beebom and Bleap.",
    sourceIds: ["LEEK-SRC-026", "LEEK-SRC-034", "LEEK-SRC-045", "LEEK-SRC-043", "LEEK-SRC-017"],
    takedown: { status: "partially-removed" },
    relatedClaimIds: ["LEEK-CLM-004", "LEEK-CLM-005", "LEEK-CLM-029"],
    watermark: "NO PHYSICAL DISCS? THEN MORE LEEKS!",
  },
  {
    id: "LEEK-DRP-006",
    date: "2026-08-19",
    datePrecision: "day",
    reportedTitle: "Junkies",
    mediaType: "video",
    description:
      "Jason kicks a police officer off a motorcycle, attacks him with a knife and rides off, then approaches a group living under a bridge and fights them. The clip ends with the same cutscene fragment as the Taser video. IGN reported the actor also used the video to disown fake X accounts claiming to be CyberLeek.",
    reveals: [
      "Knife melee combat and a Taunt option",
      "Weapon wheel with separate Items and Weapons sections",
      "Zombix healing pills that weaken with repeated use, and an EpiPen item",
      "Loot option on bodies",
      "Bystanders reporting crimes; a warning that police have the player's description",
      "First look at swimming when Jason falls into a canal (per EGW)",
    ],
    securityRelevance:
      "Fourth clip in about 24 hours; the pace indicated a prepared archive or live capture ability.",
    developmentRelevance:
      "Systems resembling Red Dead Redemption 2 (loot, greet and antagonize) appear in an unfinished state.",
    marketingRelevance:
      "Another set of unannounced mechanics exposed before the official showcase.",
    authenticity: "high",
    authenticityNote: "Consistent with surrounding clips and subject to the same copyright takedowns.",
    sourceIds: ["LEEK-SRC-026", "LEEK-SRC-034", "LEEK-SRC-045", "LEEK-SRC-082", "LEEK-SRC-017"],
    takedown: { status: "partially-removed" },
    relatedClaimIds: ["LEEK-CLM-004"],
    watermark: "$CYBERLEEK token promotion; text disowning impersonator X accounts",
  },
  {
    id: "LEEK-DRP-007",
    date: "2026-08-20",
    datePrecision: "day",
    reportedTitle: "Plane (Day)",
    mediaType: "video",
    description:
      "A clip of roughly two and a half minutes in which Jason flies a crop duster from the Leonida Keys over Vice City while switching radio stations, then lands, walks to a wall and fires a scoped rifle so that the bullet holes spell LEEK. The video was the winner of the first token-vote poll.",
    reveals: [
      "Scale and draw distance of the map from the air",
      "Volumetric clouds",
      "Radio station list including Stockyard FM, with an On Demand option",
      "Small environmental damage as wall fragments break",
    ],
    securityRelevance:
      "The LEEK wall shot is player-directed action inside a running build. It shifted the assessment from a stolen archive of recordings to hands-on control of a playable build, whatever the build's age. It does not show which platform the build runs on.",
    developmentRelevance:
      "The flight path has been matched by fans against the leaked map, supporting the map's authenticity.",
    marketingRelevance:
      "Kotaku and others wrote that the clip generated more excitement than official trailers, undercutting the Netflix reveal.",
    authenticity: "high",
    authenticityNote:
      "Forbes, Tom's Hardware, Mashable, IGN and PC Gamer treated the LEEK shot as strong evidence of a live build. Mashable noted misinterpretation or AI generation remained possible; Rockstar's later statement did not dispute the footage.",
    sourceIds: ["LEEK-SRC-022", "LEEK-SRC-025", "LEEK-SRC-040", "LEEK-SRC-030", "LEEK-SRC-016", "LEEK-SRC-045"],
    takedown: { status: "partially-removed" },
    relatedClaimIds: ["LEEK-CLM-001", "LEEK-CLM-004", "LEEK-CLM-033"],
    watermark: "$CYBERLEEK token promotion; per GameSpot, some videos carry 'No physical discs? Then more leeks!'",
  },
  {
    id: "LEEK-DRP-008",
    date: "2026-08-21",
    datePrecision: "day",
    reportedTitle: "Hypercar Part 1",
    mediaType: "video",
    description:
      "Jason steals a hypercar (identified by fans as the Truffade Thrax) and drives through Vice City at sunset and night, performing burnouts. GameSpot called it one of the less eventful clips.",
    reveals: [
      "Window-smash and drag-out car theft animation",
      "Night-time lighting in Vice City",
      "Volumetric clouds and day-night cycle",
    ],
    securityRelevance:
      "Released the day after the subpoena filings became public, showing the legal action did not interrupt output. Forbes noted the upload ended a day of rumours that the leaker had been caught.",
    developmentRelevance: "Driving feel and lighting from the same build.",
    marketingRelevance: "Showed the city at night before Rockstar did.",
    authenticity: "high",
    authenticityNote: "Consistent with surrounding clips; subject to takedowns.",
    sourceIds: ["LEEK-SRC-034", "LEEK-SRC-045", "LEEK-SRC-026", "LEEK-SRC-082", "LEEK-SRC-077"],
    takedown: { status: "partially-removed" },
    relatedClaimIds: ["LEEK-CLM-004", "LEEK-CLM-015"],
    watermark: "HIGHER MARKET CAP = MORE LEEKS",
  },
  {
    id: "LEEK-DRP-009",
    date: "2026-08-22",
    datePrecision: "day",
    reportedTitle: "Hypercar Part 2 (strip club teaser)",
    mediaType: "video",
    description:
      "Jason refuels and repairs the hypercar at a Xero gas station, robs the store by taking cash stacks from the register one by one, robs a second station, crashes into a truck on a bridge shown in a slow-motion cinematic, and walks into a strip club at night. IGN and GameSpot date it 2026-08-22; Beebom lists it under 2026-08-21 alongside Part 1.",
    reveals: [
      "Refuel and Repair services at gas pumps",
      "Store robbery with per-stack cash pickup",
      "Staff refusing service after a robbery",
      "One-handed pistol shooting",
      "Slow-motion crash camera",
    ],
    securityRelevance:
      "The watermark tied the next release to a token market-cap target, linking distribution directly to trading activity.",
    developmentRelevance: "Economy and vehicle-maintenance loops visible.",
    marketingRelevance: "Teased the strip club, a location Rockstar had shown only in stills.",
    authenticity: "high",
    authenticityNote: "Consistent with surrounding clips; DSOGaming noted the reposts were disabled on copyright claims.",
    sourceIds: ["LEEK-SRC-032", "LEEK-SRC-026", "LEEK-SRC-045", "LEEK-SRC-052", "LEEK-SRC-046"],
    takedown: { status: "partially-removed", note: "Streamable reposts disabled on copyright claims per DSOGaming." },
    relatedClaimIds: ["LEEK-CLM-004", "LEEK-CLM-015", "LEEK-CLM-033"],
    watermark: "3mil marketcap = stripclub",
  },
  {
    id: "LEEK-DRP-010",
    date: "2026-08-22",
    datePrecision: "day",
    reportedTitle: "Strip Club",
    mediaType: "video",
    description:
      "Jason walks through a strip club with Easy Rider branding, dense NPC crowds, dancers, warning signs, and uses binoculars indoors. It ends with a cutscene fragment in a men's bathroom in which a character says he needs to take a leak, read by IGN as a taunt.",
    reveals: [
      "Strip club interior and NPC behaviour",
      "Additional soundtrack titles",
      "Second cutscene fragment",
    ],
    securityRelevance: "Second cutscene fragment in the campaign; raised concern about access to story content.",
    developmentRelevance: "Adult content and crowd density in an unfinished state.",
    marketingRelevance: "DSOGaming suggested it may have spoiled a Netflix showcase segment.",
    authenticity: "high",
    authenticityNote: "Consistent with surrounding clips and takedowns.",
    sourceIds: ["LEEK-SRC-032", "LEEK-SRC-026", "LEEK-SRC-045", "LEEK-SRC-052", "LEEK-SRC-046"],
    takedown: { status: "partially-removed" },
    relatedClaimIds: ["LEEK-CLM-004", "LEEK-CLM-029"],
    watermark: "$CYBERLEEK token promotion",
  },
  {
    id: "LEEK-DRP-011",
    date: "2026-08-23",
    datePrecision: "day",
    reportedTitle: "Gas (gas station and Wasted screen)",
    mediaType: "video",
    description:
      "Jason drives to a gas station where an NPC is filling a pickup bed with fuel, steals the truck, runs the owner over, then collides with another vehicle and dies, showing the Wasted screen for the first time. A short cut returns to the bathroom cutscene with an objective prompt reading Return to Lucia. A Discord user's earlier claim to have privately seen the start of this clip on 2026-08-18 is a community claim.",
    reveals: [
      "Wasted death screen and sound",
      "Dynamic vehicle damage and gore",
      "Objective prompt referencing Lucia, implying she is already unlocked at that story point",
    ],
    securityRelevance:
      "Beebom noted the clips arrived a day after subpoenas were reported; the new watermark escalated the manifesto rhetoric.",
    developmentRelevance: "A glitched fuel animation suggested unfinished assets (Notebookcheck).",
    marketingRelevance: "Coinspeaker tied the clip to an 80 percent overnight token rise.",
    authenticity: "high",
    authenticityNote: "Consistent with surrounding clips; subject to takedowns (the Reddit post was removed).",
    sourceIds: ["LEEK-SRC-032", "LEEK-SRC-046", "LEEK-SRC-045", "LEEK-SRC-050", "LEEK-SRC-067"],
    takedown: { status: "partially-removed" },
    relatedClaimIds: ["LEEK-CLM-004", "LEEK-CLM-029"],
    watermark: "They want to take your right to resell. The peaceful route got us nowhere. This was plotted by them for years. It is time to fight now or never.",
  },
  {
    id: "LEEK-DRP-012",
    date: "2026-08-23",
    datePrecision: "day",
    reportedTitle: "Plane (Night)",
    mediaType: "video",
    description:
      "Jason flies a crop duster over Vice City and Leonida at night with the cinematic camera, showing the lit skyline and radio stations. IGN said it was released on the night of 2026-08-23 and contained no cutscene.",
    reveals: ["Night skyline and neon lighting", "Fishing spots (per Beebom)", "Radio station list"],
    securityRelevance: "Tenth clip; the same manifesto watermark as the Gas clip.",
    developmentRelevance: "Night-time rendering from the same build.",
    marketingRelevance: "IGN called it the sixth consecutive day of releases.",
    authenticity: "high",
    authenticityNote: "Consistent with the daytime plane clip and subject to takedowns.",
    sourceIds: ["LEEK-SRC-032", "LEEK-SRC-045", "LEEK-SRC-059"],
    takedown: { status: "partially-removed" },
    relatedClaimIds: ["LEEK-CLM-004"],
    watermark: "They want to take your right to resell. The peaceful route got us nowhere. This was plotted by them for years. It is time to fight now or never.",
  },
  {
    id: "LEEK-DRP-013",
    date: "2026-08-24",
    datePrecision: "day",
    reportedTitle: "Nudist Town",
    mediaType: "video",
    description:
      "A clip of about two and a half minutes in which Jason walks through a nudist resort in Port Gellhorn, uses binoculars on NPCs, is confronted by a woman he looked at, and then attacks the crowd. AOL reported it won a poll against Beach and Strip Club 2. The on-screen text asked whether viewers wanted a Lucia-led prologue and demanded ten people appear dressed as leeks outside Take-Two or Rockstar offices holding game discs.",
    reveals: [
      "Full nudity for NPCs of both sexes",
      "NPCs reacting contextually to being watched",
      "Wide body-type variety in crowds",
    ],
    securityRelevance:
      "The watermark set up the Lucia prologue vote, signalling access to story content beyond Jason's early progression.",
    developmentRelevance: "Adult content and crowd variety in the build.",
    marketingRelevance: "Drew mainstream coverage for explicitness rather than mechanics.",
    authenticity: "high",
    authenticityNote: "Consistent with surrounding clips and subject to takedowns.",
    sourceIds: ["LEEK-SRC-045", "LEEK-SRC-057", "LEEK-SRC-084", "LEEK-SRC-026", "LEEK-SRC-059"],
    takedown: { status: "partially-removed" },
    relatedClaimIds: ["LEEK-CLM-004", "LEEK-CLM-029", "LEEK-CLM-033"],
    watermark: "Do you want a Lucia-led prologue? CL has been evading spoilers. CL cannot just make that decision so a poll is required. Plus, to show support, 10 gamers need to show up dressed as leeks in front of Take2/Rockstar offices holding game discs during working hours.",
  },
  {
    id: "LEEK-DRP-014",
    date: "2026-08-25",
    datePrecision: "day",
    reportedTitle: "Nightclub (Nine1Nine)",
    mediaType: "video",
    description:
      "Jason walks around the interior of a nightclub. Mashable called it uneventful; Kotaku noted the crowd density. One of three clips posted on 2026-08-25.",
    reveals: ["Nightclub interior and crowd density"],
    securityRelevance: "Part of a three-clip day one week into the campaign, showing sustained access.",
    developmentRelevance: "Interior crowd rendering.",
    marketingRelevance: "Minor.",
    authenticity: "high",
    authenticityNote: "Consistent with surrounding clips; Rockstar's statement the next day did not dispute the leaks.",
    sourceIds: ["LEEK-SRC-017", "LEEK-SRC-028", "LEEK-SRC-103"],
    takedown: { status: "partially-removed" },
    relatedClaimIds: ["LEEK-CLM-004"],
  },
  {
    id: "LEEK-DRP-015",
    date: "2026-08-25",
    datePrecision: "day",
    reportedTitle: "Beach cycling (Vice City beach)",
    mediaType: "video",
    description:
      "Jason rides a bicycle along a crowded Vice City beach at low sun, weaving between sunbathers, jet skis, a kayak and seagulls, then dismounts at the water's edge. TechRadar and Kotaku highlighted the crowd technology.",
    reveals: [
      "Bicycles as vehicles",
      "Very high NPC density with varied body types and animations",
      "Sand trails, seaweed debris, phone-using NPCs",
      "Backpack pop-in suggesting an unfinished item system",
    ],
    securityRelevance: "Recorded at a chosen time of day, consistent with live control of the build.",
    developmentRelevance: "Visible pop-in shows an unfinished build.",
    marketingRelevance: "Pre-empted a crowd-tech showcase moment; Sportskeeda said it backed up Trailer 1's beach crowds.",
    authenticity: "high",
    authenticityNote: "Consistent with surrounding clips; subject to takedowns.",
    sourceIds: ["LEEK-SRC-039", "LEEK-SRC-017", "LEEK-SRC-028", "LEEK-SRC-103", "LEEK-SRC-026"],
    takedown: { status: "partially-removed" },
    relatedClaimIds: ["LEEK-CLM-004"],
  },
  {
    id: "LEEK-DRP-016",
    date: "2026-08-25",
    datePrecision: "day",
    reportedTitle: "Video game store",
    mediaType: "video",
    description:
      "Jason walks around a fictional video game retailer with shelves of physical game boxes. GameSpot read the choice as ironic given GTA VI's digital-only release; the on-screen text framed the campaign as being about ownership in a digital-only era.",
    reveals: ["In-game game store interior with physical boxes"],
    securityRelevance: "The clip was chosen to make a rhetorical point, again implying the actor selects what to record.",
    developmentRelevance: "Minor.",
    marketingRelevance: "Used the game itself to argue against Rockstar's distribution model.",
    authenticity: "high",
    authenticityNote: "Consistent with surrounding clips; subject to takedowns.",
    sourceIds: ["LEEK-SRC-028", "LEEK-SRC-026", "LEEK-SRC-017", "LEEK-SRC-088"],
    takedown: { status: "partially-removed" },
    relatedClaimIds: ["LEEK-CLM-004", "LEEK-CLM-014"],
    watermark: "Text about ownership in a digital-only era (paraphrased by Kotaku and Cryptopolitan)",
  },
  {
    id: "LEEK-DRP-017",
    date: "2026-08-26",
    datePrecision: "day",
    reportedTitle: "How does Cyberleek drive? (hotrod chase with Lucia cutscene)",
    mediaType: "video",
    description:
      "Posted around the time of Rockstar's 2026-08-26 statement. Jason steals a hotrod and evades police; the clip cuts to a brief cutscene at a bar in which Lucia Caminos appears for the first time in the leaks and mocks someone's driving. Kotaku described it as a police chase cut short to show the briefest glimpse of a cutscene.",
    reveals: ["First appearance of Lucia in leaked footage", "Police chase driving"],
    securityRelevance: "Showed that the actor's build includes content with the second protagonist, not only Jason's early progression.",
    developmentRelevance: "Cutscene assets present in the build.",
    marketingRelevance: "Landed within hours of Rockstar's first public statement, which VideoCardz framed as an immediate reply.",
    authenticity: "high",
    authenticityNote: "GameSpot's embedded X post shows the media disabled at the copyright owner's request, consistent with a Take-Two claim.",
    sourceIds: ["LEEK-SRC-104", "LEEK-SRC-017", "LEEK-SRC-026", "LEEK-SRC-031"],
    takedown: { status: "partially-removed", note: "Reposts disabled on copyright-owner reports per GameSpot's embed." },
    relatedClaimIds: ["LEEK-CLM-004", "LEEK-CLM-029"],
  },
  {
    id: "LEEK-DRP-018",
    date: "2026-08-26",
    datePrecision: "day",
    reportedTitle: "Lucia prologue",
    mediaType: "video",
    description:
      "About four and a half minutes of prologue footage posted to the actor's Telegram channel hours after Rockstar's statement. It is story content featuring Lucia Caminos in prison with flashbacks, and contains plot details that LEEK does not repeat. On-screen text claimed the build is recent and that the game is not ready. Reupload channels split it into several shorter clips.",
    reveals: [
      "Prologue structure centred on Lucia",
      "Cutscene and dialogue quality of the build",
    ],
    securityRelevance:
      "First release of narrative content, confirming the actor can reach story sequences on demand. The actor's claim that the build is recent conflicts with insider reports that the footage is a year or more old and is unverified.",
    developmentRelevance:
      "Reveals the opening of the game before launch; Kotaku noted the prologue setting matches the first official trailer from 2023.",
    marketingRelevance:
      "Released the day before the Netflix Extended Look and the same day as an official Dazed magazine preview, shifting coverage to spoiler warnings.",
    authenticity: "high",
    authenticityNote:
      "Reported by Mashable, Kotaku, Dot Esports, GamesRadar and Forbes; consistent with official imagery of Lucia in a prison jumpsuit. Not individually authenticated by Rockstar.",
    sourceIds: ["LEEK-SRC-021", "LEEK-SRC-031", "LEEK-SRC-047", "LEEK-SRC-048", "LEEK-SRC-017", "LEEK-SRC-102"],
    takedown: { status: "circulating", note: "Posted to Telegram and reuploaded in fragments; takedown status of reuploads not established in the corpus." },
    relatedClaimIds: ["LEEK-CLM-029", "LEEK-CLM-001", "LEEK-CLM-005"],
    watermark: "This build is actually recent, and the game is not ready at all. Sony and Rockstar are killing your right to own and resell your games.",
  },
];

export const dropById = Object.fromEntries(drops.map((d) => [d.id, d]));
