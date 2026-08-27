import type { ActorDossier } from "./types";

/**
 * CyberLeek actor dossier.
 *
 * Everything here is either an actor claim, a court-filing fact, or reporting
 * cited by registry source id. Nothing in this file states or implies how the
 * actor obtained GTA VI material. Online handles appear only where a court
 * filing or major journalism names them, and only as subpoena targets or
 * community claims, never as attribution.
 */
export const actor: ActorDossier = {
  alias: "CyberLeek",
  aliasVariants: [
    "Cyberleek",
    "CYBERLEEK",
    "CL (self-reference in video watermarks)",
    "$CYBERLEEK (Solana token ticker used as branding)",
    "CyberLeeker (Dread forum handle, community reporting only)",
    "CYBERLEEK (Discord account named as a subpoena target in Take-Two's 512(h) petition; not attribution)",
    "CINEMATICROCKSTAR (Discord account named as a subpoena target in the same petition; not attribution)",
    "Surfer24k, with replacement handles cyberleek_west and surwest (Discord account named as a subpoena target in the same petition; not attribution)",
  ],
  firstObserved: "2026-08-18",
  firstObservedNote:
    "2026-08-18 is the date of the first widely reported public material (the basketball clip, the Edict and the first map images). Community and blockchain research pushes the setup earlier, and none of those earlier dates has been confirmed by Rockstar, Take-Two or a court filing. Reddit users cited by GameSpot say the main domain and spelling variants were registered around 2026-08-14 and that the token, liquidity pool, website and voting program were created around 2026-08-15 [LEEK-SRC-026, LEEK-SRC-096]. A Bitquery review relayed by Yahoo Finance says an Arweave name matching the branding was registered on 2026-08-14 and that the token first traded on a Raydium pool on 2026-08-15 [LEEK-SRC-067]. The GTAForums forensic timeline gives Arweave upload times of 2026-08-16 13:04:11 UTC for a map sneak peek and 2026-08-17 21:07:16 UTC for the basketball clip, followed by a Dread post at 2026-08-18 07:36 UTC [LEEK-SRC-094, LEEK-SRC-028]. Malwarebytes dates the start of publication to 2026-08-17 [LEEK-SRC-013]. Status of the pre-08-18 dates: community claims, plausible, unverified.",
  summary:
    "CyberLeek is the name used by an unidentified person or group that began publishing what appears to be unreleased GTA VI development footage and map images on 2026-08-18, one week before Rockstar's Netflix Extended Look. The actor frames the campaign as a consumer-rights protest through a manifesto it calls the CYBERLEEK Edict, and at the same time it minted a Solana token, $CYBERLEEK, used both as branding on the footage and as the mechanism for paid polls that decide what is released next. The footage has not been authenticated by Rockstar, but Take-Two has issued DMCA takedowns and obtained court-issued subpoenas to Microsoft, Discord, X Corp and Google, and Rockstar's 2026-08-26 statement treated the videos as real. Security commentators separate the stated motive from the observed behaviour and regard the monetisation as the more reliable guide. Who is behind the name, where they are, whether they are one person or several, and how the material was obtained all remain unknown. The dossier below records what the actor has said, where it operates, and which attribution theories exist, with their weaknesses.",
  channels: [
    {
      platform: "Website",
      identifier: "cyber-leek.com, with gateway mirrors reported at cyberleek.vilenarios.com and cyberleek.turbo-gateway.com",
      status: "unknown",
      firstSeen: "2026-08-18",
      note:
        "The actor's site carried the homepage (pixel leek mascot, 'community voting', 'decentralized leeks', 'no wallet connect'), the Edict at /about, the token poll and, from 2026-08-21, a Contact tab [LEEK-SRC-016, LEEK-SRC-013, LEEK-SRC-049, LEEK-SRC-051, LEEK-SRC-026]. PCMag describes the sites as decentralised [LEEK-SRC-015]. On the morning of 2026-08-22 Eurogamer, Polygon and EGW reported the website offline [LEEK-SRC-038, LEEK-SRC-082], and CyberScoop reported the sites still offline as of 2026-08-24 [LEEK-SRC-014]. A page captured at cyber-leek.online on 2026-08-26 was live but does not match press descriptions of the actor's site: it is a WordPress build with AI-generated mascot images dated 2026-08-24, BSC and ERC-20 donation addresses instead of the Solana token, a name-and-email capture form, and offers of a 'playable PC build' via Instagram direct messages, alongside a FAQ claiming 'no monetization' [LEEK-SRC-008]. That capture should be treated as unverified and possibly an impersonator or a repurposed domain rather than as a return of the original site.",
      sourceIds: ["LEEK-SRC-016", "LEEK-SRC-013", "LEEK-SRC-049", "LEEK-SRC-051", "LEEK-SRC-026", "LEEK-SRC-015", "LEEK-SRC-038", "LEEK-SRC-082", "LEEK-SRC-014", "LEEK-SRC-008"],
    },
    {
      platform: "Telegram",
      identifier: "Telegram channel described by the actor as one of its only two official channels (handle not captured in the corpus)",
      status: "unknown",
      firstSeen: "2026-08-20",
      note:
        "On 2026-08-20 a statement shared through the channel said CyberLeek operates only that channel and its website, so accounts on X, Discord, Instagram and elsewhere should not be treated as legitimate [LEEK-SRC-009, LEEK-SRC-016]. On 2026-08-22 the channel displayed 'This channel is unavailable due to copyright infringement' [LEEK-SRC-038, LEEK-SRC-082]. On 2026-08-26 Mashable reported the Lucia prologue clip was posted in a Telegram channel, which implies a replacement or restored channel; the corpus does not establish which [LEEK-SRC-021].",
      sourceIds: ["LEEK-SRC-009", "LEEK-SRC-016", "LEEK-SRC-038", "LEEK-SRC-082", "LEEK-SRC-021"],
    },
    {
      platform: "Arweave",
      identifier: "Arweave permaweb uploads (map sneak peek, basketball clip, full map, numbered video files)",
      status: "active",
      firstSeen: "2026-08-16",
      note:
        "Community forensic reporting, relayed by Kotaku, uses Arweave transaction timestamps as the upload record for the actor's files, starting with a map sneak peek at 2026-08-16 13:04:11 UTC [LEEK-SRC-094, LEEK-SRC-028]. The same researcher reports that the Solana public key used to sign the Arweave uploads matches the wallet that created the token [LEEK-SRC-033]. A Bitquery review says an Arweave name matching the branding was registered on 2026-08-14 [LEEK-SRC-067]. Arweave storage is permanent, so takedowns do not remove these files; LEEK does not link to them.",
      sourceIds: ["LEEK-SRC-094", "LEEK-SRC-028", "LEEK-SRC-033", "LEEK-SRC-067"],
    },
    {
      platform: "Dread (darknet forum)",
      identifier: "Account 'CyberLeeker' posting in /leak under the title 'Stolen GTA6 Footage'",
      status: "unknown",
      firstSeen: "2026-08-18",
      note:
        "Community reporting: the basketball clip was posted to Dread at 2026-08-18 07:36 UTC via Gofile and other file hosts, hours before it spread on Discord and social platforms [LEEK-SRC-094, LEEK-SRC-028]. The GTAForums researcher told IGN the original leaks appeared on Dread hours before anywhere else [LEEK-SRC-033]. Whether the Dread account is the same operator as the website is not established.",
      sourceIds: ["LEEK-SRC-094", "LEEK-SRC-028", "LEEK-SRC-033"],
    },
    {
      platform: "X",
      identifier: "Accounts using the CyberLeek name (the actor says it operates none)",
      status: "unknown",
      note:
        "The actor's 2026-08-20 statement denies operating on X [LEEK-SRC-016]. Take-Two nonetheless obtained a DMCA subpoena directed at X Corp on 2026-08-21 [LEEK-SRC-006, LEEK-SRC-014]. A fan account noted that the subpoena targets accounts the actor has called fakes [LEEK-SRC-089]. A crypto blog described a 'second X account tied to CyberLeek' posting clips hours after the first leak; that claim is unverified and conflicts with the actor's denial.",
      sourceIds: ["LEEK-SRC-016", "LEEK-SRC-006", "LEEK-SRC-014", "LEEK-SRC-089"],
    },
    {
      platform: "Discord",
      identifier: "Accounts named in Take-Two's 512(h) petition: CYBERLEEK; CINEMATICROCKSTAR; Surfer24k (and replacement handles cyberleek_west and surwest)",
      status: "unknown",
      firstSeen: "2026-08-20",
      note:
        "Take-Two's 2026-08-20 petition to the S.D.N.Y. names these three accounts, with numeric user IDs, as believed to be associated with a Discord server where infringing content was posted, together with two server invites (discord.gg/darkviperau and discord.gg/odyssey) [LEEK-SRC-004]. They are subpoena targets, not attribution: the petition seeks to identify alleged infringers, and the actor's own statement says it does not operate on Discord [LEEK-SRC-016]. The streamer whose editors' server was named publicly denied any knowledge of the leaks [LEEK-SRC-029]. Discord said it had not been served as of the afternoon of 2026-08-24 [LEEK-SRC-026, LEEK-SRC-086]. Separately, a community thread ties a Discord account called 'stayonthegrindd' to the early spread of the clips; see attribution theory LEEK-ATT-001.",
      sourceIds: ["LEEK-SRC-004", "LEEK-SRC-016", "LEEK-SRC-029", "LEEK-SRC-026", "LEEK-SRC-086"],
    },
    {
      platform: "Instagram",
      identifier: "Accounts using the CyberLeek name, including 'cyberleek.shop' promoted on the 2026-08-26 cyber-leek.online capture",
      status: "unknown",
      note:
        "The actor's 2026-08-20 statement disowns Instagram accounts [LEEK-SRC-016]. The fan account that relayed the 'our colleague' remark is an Instagram account, not the actor [LEEK-SRC-016]. The cyber-leek.online capture directs visitors to Instagram direct messages to request 'playable PC builds', a pattern that matches the scam sites Malwarebytes and Cryptopolitan describe rather than the actor's stated channels [LEEK-SRC-008, LEEK-SRC-013, LEEK-SRC-088].",
      sourceIds: ["LEEK-SRC-016", "LEEK-SRC-008", "LEEK-SRC-013", "LEEK-SRC-088"],
    },
    {
      platform: "GitHub",
      identifier: "github.com/zyrexdz/cyberleek-leak-research",
      status: "unknown",
      firstSeen: "2026-08-20",
      note:
        "Named in Take-Two's petition to Microsoft as the URL to which infringing content was posted [LEEK-SRC-002]. It presents as a third-party 'research' repository. Mashable reported it was still online on 2026-08-24 and that it is unclear whether it is directly associated with the leaker, who communicates through a website and Telegram [LEEK-SRC-018]. Kotaku noted the Microsoft subpoena also asks for records of Microsoft's internal investigation of the 'cyberleek' persona [LEEK-SRC-029].",
      sourceIds: ["LEEK-SRC-002", "LEEK-SRC-018", "LEEK-SRC-029"],
    },
    {
      platform: "Session (encrypted messenger)",
      identifier: "Session account issued after a Monero contact fee",
      status: "unknown",
      firstSeen: "2026-08-21",
      note:
        "The Contact tab added on 2026-08-21 says pricing for ad placements and custom footage is discussed privately over Session, after a 400 XMR transfer that 'guarantees CYBERLEEK will respond' [LEEK-SRC-015, LEEK-SRC-026, LEEK-SRC-091].",
      sourceIds: ["LEEK-SRC-015", "LEEK-SRC-026", "LEEK-SRC-091"],
    },
  ],
  statements: [
    {
      date: "2026-08-18",
      medium: "Website (CYBERLEEK Edict manifesto, published alongside the first clip)",
      summary:
        "The Edict sets out three 'commandments' for publishers: no digital preorders, no 'fake' single-player DLC that unlocks content already in the game files, and preservation of single-player content after servers close. It says publishers that break them can become targets. GameSpot dates the commandments to the first leak; Mashable, Den of Geek and IGN describe the same document.",
      quote: "Thou Shalt Not Sell Digital Preorders. Thou Shalt Not Sell Fake Single-Player DLC. Thou Shalt Preserve Single-Player Content.",
      sourceIds: ["LEEK-SRC-026", "LEEK-SRC-016", "LEEK-SRC-049", "LEEK-SRC-033"],
    },
    {
      date: "2026-08-18",
      medium: "Website (CYBERLEEK Edict, preorder argument)",
      summary:
        "The manifesto's clearest complaint is digital preorders, which it says exist only because physical discs once had manufacturing limits, so publishers should press discs if they want revenue before launch. Mashable quotes the passage directly.",
      quote: "Preorders were not created for gamers. They were created because physical discs had manufacturing limits. If publishers want revenue before launch, they can press discs.",
      sourceIds: ["LEEK-SRC-016", "LEEK-SRC-074"],
    },
    {
      date: "2026-08-18",
      medium: "Website (CYBERLEEK Edict, closing warning)",
      summary:
        "The Edict's final section extends the threat to the industry at large. Den of Geek, IGN, GameFragger and Malwarebytes quote the same closing line.",
      quote: "Publishers should beware. If CYBERLEEK can reach Rockstar, no one is safe. This is a message to all big corpo: behave, or be the next target.",
      sourceIds: ["LEEK-SRC-049", "LEEK-SRC-033", "LEEK-SRC-076", "LEEK-SRC-013"],
    },
    {
      date: "2026-08-19",
      medium: "Website (token poll)",
      summary:
        "The actor opened paid polls: users send $CYBERLEEK to the option they want, each token counts toward that choice, and the result reflects how much token each option received rather than how many people voted. The first poll (car by day, car at night, motorcycle at night, plane by day) was won by the plane with more than 147,000 tokens, 64.4 percent of the total, and the plane clip followed on 2026-08-20. Notebookcheck reported at least one participant spent about $80 to vote.",
      sourceIds: ["LEEK-SRC-016", "LEEK-SRC-026", "LEEK-SRC-051"],
    },
    {
      date: "2026-08-19",
      medium: "Website (token page)",
      summary:
        "The actor says the token will fund a secret project, technical infrastructure and protection from corporate retaliation, and insists it is 'not a cash grab'. It has not said what the project is or where the money goes. The DailyDarkWeb relay adds that the funds are said to support operational security.",
      quote: "not a cash grab",
      sourceIds: ["LEEK-SRC-016", "LEEK-SRC-026", "LEEK-SRC-010"],
    },
    {
      date: "2026-08-20",
      medium: "Telegram (statement relayed by an X user and by a fan Instagram account)",
      summary:
        "CyberLeek said it operates only its Telegram channel and its website, that accounts using its name on X, Discord and Instagram are impersonators, that a leak timeline circulating on Discord was not its own, and that other accounts had edited older posts to appear to have known about the leaks in advance. In the same statement it reportedly referred to Arion Kurtaj, the 2022 GTA VI leaker, as 'our colleague', according to the fan account GTA Leaks as cited by Mashable. The relay is not independently verified.",
      quote: "our colleague",
      sourceIds: ["LEEK-SRC-009", "LEEK-SRC-016"],
    },
    {
      date: "2026-08-20",
      medium: "Video watermark",
      summary:
        "Some clips carry the on-screen message tying the leaks to Rockstar's decision not to ship GTA VI on disc. GameSpot places the watermarked threats on 2026-08-20 alongside the plane clip.",
      quote: "NO PHYSICAL DISCS? THEN MORE LEEKS!",
      sourceIds: ["LEEK-SRC-016", "LEEK-SRC-026"],
    },
    {
      date: "2026-08-20",
      medium: "Website and watermarks",
      summary:
        "CyberLeek threatened to release further material, including potential story and ending spoilers, unless Rockstar and other publishers change their approach to digital games. Outlook India records the ending threat as unverified as to possession.",
      sourceIds: ["LEEK-SRC-026", "LEEK-SRC-085"],
    },
    {
      date: "2026-08-21",
      medium: "Website (statement reported as an ultimatum)",
      summary:
        "A statement demanding a public statement and apology from Rockstar with a concrete commitment, rejecting private negotiation, and warning other publishers. DailyDarkWeb relayed it on 2026-08-21 as a new manifesto; Sportskeeda quoted it on 2026-08-24. The wording overlaps with the Edict, so it may be the Edict's closing text reported later rather than a separate document; the corpus does not settle this.",
      quote: "CYBERLEEK has been patient. That patience is over. What follows are three commandments. If CYBERLEEK targets a publisher, it is because that publisher broke one. CYBERLEEK will not stop until they issue a public statement and apology with a concrete commitment to be better. Words are not enough; restitution is mandatory.",
      sourceIds: ["LEEK-SRC-070", "LEEK-SRC-010", "LEEK-SRC-076"],
    },
    {
      date: "2026-08-21",
      medium: "Website (same statement, industry warning)",
      summary:
        "The second half of the statement sets the commandments as a minimum and rules out quiet settlements.",
      quote: "These three commandments are the floor, not the ceiling, of what is acceptable. If publishers violate them, they will be targeted. CYBERLEEK will continue to disrupt their operations until they issue a public statement and apology with a concrete commitment to fix the harm they caused. No private negotiations. No quiet settlements. The public sees it, or the leaks do not stop.",
      sourceIds: ["LEEK-SRC-070", "LEEK-SRC-010"],
    },
    {
      date: "2026-08-21",
      medium: "Website (Contact tab)",
      summary:
        "A Contact tab offered ad placements such as video watermarks and custom gameplay footage tailored to brands, with terms discussed over Session after a 400 XMR contact fee. GameSpot reports the page stresses this is not a ransom. PCMag converted the fee to about $169,000, GameSpot to just under $165,450, and Bleap to about $165,000; the spread reflects exchange-rate timing, not different demands.",
      quote: "The Monero transfer serves as a contact fee that guarantees CYBERLEEK will respond to initiate the conversation.",
      sourceIds: ["LEEK-SRC-015", "LEEK-SRC-026", "LEEK-SRC-091"],
    },
    {
      date: "2026-08-22",
      medium: "Video watermark",
      summary:
        "The strip club teaser carried a watermark conditioning release of the full clip on the token's market capitalisation, read by fans as a $3 million threshold.",
      quote: "3mil marketcap = stripclub",
      sourceIds: ["LEEK-SRC-026"],
    },
    {
      date: "2026-08-22",
      medium: "Website or Telegram (claim reported before the takedown)",
      summary:
        "EGW reports that before the site and channel went offline CyberLeek claimed a 13-minute video was coming, said to be the same footage Rockstar planned to show on Netflix. Single low-tier source; no such video is recorded in the corpus.",
      sourceIds: ["LEEK-SRC-082"],
    },
    {
      date: "2026-08-24",
      medium: "Video watermark (nudist town clip) and poll",
      summary:
        "The watermark posed a poll on a Lucia-led prologue and attached a condition that ten people appear dressed as leeks outside Take-Two or Rockstar offices holding game discs. AOL and GameSpot quote the text.",
      quote: "Do you want a Lucia-led prologue? CL has been evading spoilers. CL cannot just make that decision so a poll is required. Plus, to show support, 10 gamers need to show up dressed as leeks in front of Take2/Rockstar offices holding game discs during working hours.",
      sourceIds: ["LEEK-SRC-084", "LEEK-SRC-026"],
    },
    {
      date: "2026-08-25",
      medium: "Video watermark (game store clip)",
      summary:
        "A clip showing a brick-and-mortar game store carried a message that the campaign is about ownership in a digital-only era, and Kotaku reported an earlier clip watermarked 'Cyberleek can't drive' in apparent response to a streamer's remarks. Three clips were released that day.",
      sourceIds: ["LEEK-SRC-028", "LEEK-SRC-088", "LEEK-SRC-029"],
    },
    {
      date: "2026-08-26",
      medium: "Telegram (Lucia prologue clip with on-screen text)",
      summary:
        "Hours after Rockstar's first statement on the leaks, CyberLeek posted about four and a half minutes of the Lucia prologue and promised more Lucia footage. On-screen text claimed the build is recent and the game is not ready, and accused Sony and Rockstar of ending the right to own and resell games. This is the first material treated as a story spoiler by Kotaku, GamesRadar and Dot Esports.",
      quote: "This build is actually recent, and the game is not ready at all. Sony and Rockstar are killing your right to own and resell your games. And Rockstar is killing their own employees, too. The work required to reach gold is way too much for so little time left.",
      sourceIds: ["LEEK-SRC-031", "LEEK-SRC-021", "LEEK-SRC-047", "LEEK-SRC-048", "LEEK-SRC-026"],
    },
  ],
  ideology: {
    summary:
      "Stated ideology is consumer-rights protest: the Edict opposes digital preorders, paid add-ons that unlock single-player content already shipped in the game files, and the loss of single-player content when servers shut down, citing Ubisoft's The Crew. It presents these as 'commandments' and frames Rockstar as the first target because GTA VI ships without a disc. The preservation argument overlaps with the Stop Killing Games campaign, which publicly disowned CyberLeek on 2026-08-19, called illegal means unacceptable, and urged people not to buy the token. Observers separate the stated motive from the observed behaviour: every clip advertises the token, polls require spending it, and a paid contact fee sells ad space, so CyberScoop's sources, IGN's community researcher, GTABoom and Forbes all treat monetisation as the more reliable indicator. Both motives may operate at once; the record does not resolve their weighting.",
    sourceIds: ["LEEK-SRC-016", "LEEK-SRC-026", "LEEK-SRC-011", "LEEK-SRC-014", "LEEK-SRC-033", "LEEK-SRC-053", "LEEK-SRC-025", "LEEK-SRC-070"],
  },
  demands: [
    {
      text: "A public statement and apology from Rockstar with a concrete commitment to change, with 'restitution' described as mandatory; no private negotiations or quiet settlements.",
      sourceIds: ["LEEK-SRC-070", "LEEK-SRC-010", "LEEK-SRC-076"],
    },
    {
      text: "Commandment I: publishers must not sell digital preorders; if they want revenue before launch they should press physical discs.",
      sourceIds: ["LEEK-SRC-026", "LEEK-SRC-016"],
    },
    {
      text: "Commandment II: publishers must not sell 'fake' single-player DLC that only unlocks content already contained in the game.",
      sourceIds: ["LEEK-SRC-026", "LEEK-SRC-016"],
    },
    {
      text: "Commandment III: any game with single-player content must include an offline fallback, and when server support ends the publisher must release a final patch unlocking all single-player content for local, indefinite play.",
      sourceIds: ["LEEK-SRC-070", "LEEK-SRC-010"],
    },
    {
      text: "Physical copies should remain available, as a corollary of the preorder demand.",
      sourceIds: ["LEEK-SRC-085", "LEEK-SRC-016"],
    },
    {
      text: "A conditional, performative demand attached to the Lucia poll: ten people dressed as leeks outside Take-Two or Rockstar offices holding game discs during working hours.",
      sourceIds: ["LEEK-SRC-084", "LEEK-SRC-026"],
    },
    {
      text: "Not a demand of Rockstar but a price: a 400 XMR contact fee for advertisers or anyone wishing to open a conversation, which the actor says is not a ransom.",
      sourceIds: ["LEEK-SRC-015", "LEEK-SRC-026", "LEEK-SRC-091"],
    },
  ],
  cryptocurrency: {
    summary:
      "$CYBERLEEK is a Solana memecoin minted by the actor and used as branding on every clip and as the voting instrument for its polls. Launch: a Bitquery review says the token first traded on a Raydium pool on 2026-08-15 at a fully diluted valuation near $55,000, surged 13x on $1.47M of volume, and in its largest hour reached $0.00348 on $5.47M traded; five wallets that bought within a six-minute window on 2026-08-18 realised about $158,000 in combined profit, none traced to the deployer [LEEK-SRC-067]. BeInCrypto also dates launch to around 2026-08-15 [LEEK-SRC-089]; Reddit users cited by GameSpot say the token, pool and voting site were created around the same date [LEEK-SRC-026]. Cryptopolitan says the token moved $3.6M within hours of launch and that its contract address is embedded in the leaked images [LEEK-SRC-088]. Prices: at 13:23 ET on 2026-08-20 Mashable recorded $0.001227 per token, a nominal market capitalisation of about $1.23M on one billion tokens, about $198,000 in liquidity, $3.89M in trading volume, and the ten largest wallets holding 51.6 percent of supply [LEEK-SRC-016]. CoinGecko's capture records an all-time low of $0.000603 on 2026-08-20 and an all-time high of $0.03436 on 2026-08-23 [LEEK-SRC-087]. On 2026-08-23 BeInCrypto reported 24-hour gains above 1,400 percent, earlier pumps above 5,000 percent, a market cap of $22M and daily volume above $112M per CoinGecko [LEEK-SRC-089]. On 2026-08-25 Cryptopolitan reported a market cap above $14M at about $0.01913, down more than 9 percent on the day, and noted trackers had flagged the contract as a scam [LEEK-SRC-088]. A Binance Square user post, low reliability, described a 40 percent rebound to a $14.5M market cap and a 27 percent burn of total supply by the developers [LEEK-SRC-090]. The CoinGecko page captured on 2026-08-26 shows $0.01505, a market cap of about $12.10M, circulating supply of about 729.96M against a 1B maximum (consistent with a burn), and two different 24-hour volume figures on the same page, $13.376M and $14,477,967; Rugcheck notes the contract creator can still change fees, disable sells and mint [LEEK-SRC-087]. Malwarebytes reports that the actor burned its large holding on Sunday 2026-08-23 rather than selling it, while still able to collect trading fees, reportedly up to $60,000 that week [LEEK-SRC-013]. The GTAForums researcher told IGN the actor invested about $29,000 in the token and site, had earned $40,000 to $60,000 in trading fees by 2026-08-21, and at $2.1M daily volume was making about $4,400 a day, which the researcher reads as the reason for drip-feeding clips [LEEK-SRC-033]. Voting: tokens sent to an option count toward it, so results measure money rather than people; one voter reportedly spent about $80 [LEEK-SRC-016, LEEK-SRC-051]. Contact fee: 400 XMR, reported as about $169,000 by PCMag, just under $165,450 by GameSpot and about $165,000 by Bleap; the difference is exchange-rate timing [LEEK-SRC-015, LEEK-SRC-026, LEEK-SRC-091]. Exposure: UNILAD, relaying IGN, reported that the wallet funding the setup traces to an exchange that requires identity verification, which could expose the operator to a subpoena; this is a community finding carried by press, low confidence [LEEK-SRC-083, LEEK-SRC-033]. Stop Killing Games urged people not to send the actor money [LEEK-SRC-011, LEEK-SRC-026]. The cyber-leek.online capture of 2026-08-26 solicits BSC and ERC-20 'donations' instead, which does not match the Solana scheme and is a further reason to treat that page as unverified [LEEK-SRC-008].",
    sourceIds: ["LEEK-SRC-067", "LEEK-SRC-089", "LEEK-SRC-026", "LEEK-SRC-088", "LEEK-SRC-016", "LEEK-SRC-087", "LEEK-SRC-090", "LEEK-SRC-013", "LEEK-SRC-033", "LEEK-SRC-051", "LEEK-SRC-015", "LEEK-SRC-091", "LEEK-SRC-083", "LEEK-SRC-011", "LEEK-SRC-008"],
  },
  languageIndicators: [
    {
      observation: "All observed actor text (the Edict, poll pages, Contact tab, Telegram statement and video watermarks) is in English, with informal register ('big corpo', 'leeks', 'CL'). No source in the corpus has published a linguistic analysis, and English use does not indicate a location.",
      confidence: "low",
      sourceIds: ["LEEK-SRC-016", "LEEK-SRC-049", "LEEK-SRC-070", "LEEK-SRC-084"],
    },
    {
      observation: "The only basis in the corpus for a German connection is a crypto blog's relay of PC Gamer reporting that the website and two mirror sites were hosted by a German provider. Hosting location is not evidence of the operator's language or nationality. Claim LEEK-CLM-010.",
      confidence: "low",
      sourceIds: ["LEEK-SRC-092", "LEEK-SRC-035"],
    },
    {
      observation: "No source in the corpus supports a Swiss origin. Claim LEEK-CLM-011 is recorded as unsupported speculation.",
      confidence: "unknown",
      sourceIds: ["LEEK-SRC-016"],
    },
    {
      observation: "Community readers of the Arweave timestamps note uploads between roughly 13:00 and 21:00 UTC and draw opposite conclusions (European working hours versus a US morning audience). The pattern is compatible with many time zones and with scheduling for audience reach. Claim LEEK-CLM-009.",
      confidence: "low",
      sourceIds: ["LEEK-SRC-094"],
    },
  ],
  infrastructure: [
    {
      observation: "Files are published to Arweave, which is permanent and cannot be taken down; press describes the sites as decentralised and mirrored through Arweave gateways (vilenarios.com, turbo-gateway.com).",
      confidence: "moderate",
      sourceIds: ["LEEK-SRC-094", "LEEK-SRC-028", "LEEK-SRC-015", "LEEK-SRC-049", "LEEK-SRC-051"],
    },
    {
      observation: "An Arweave name matching the branding was registered on 2026-08-14, and the token first traded on 2026-08-15, per a Bitquery review; Reddit users cited by GameSpot date domain registrations to around 2026-08-14. Claim LEEK-CLM-034.",
      confidence: "low",
      sourceIds: ["LEEK-SRC-067", "LEEK-SRC-026", "LEEK-SRC-096"],
    },
    {
      observation: "The Solana public key used to sign the Arweave uploads reportedly matches the wallet that supplied the SOL to create the token, and that wallet's funding reportedly traces to a centralised exchange with identity verification (the researcher names KuCoin). Community forensic finding relayed by IGN; not independently verified.",
      confidence: "low",
      sourceIds: ["LEEK-SRC-033", "LEEK-SRC-083"],
    },
    {
      observation: "The voting site advertises 'no wallet connect': users send tokens to an address rather than connecting a wallet, and the site collected no wallet signatures.",
      confidence: "moderate",
      sourceIds: ["LEEK-SRC-016", "LEEK-SRC-074"],
    },
    {
      observation: "Primary domain reported as cyber-leek.com; the Telegram channel and the website were the actor's only self-declared official channels. Both went offline on 2026-08-22, with Telegram showing a copyright notice, and the sites remained offline as of 2026-08-24.",
      confidence: "moderate",
      sourceIds: ["LEEK-SRC-013", "LEEK-SRC-009", "LEEK-SRC-038", "LEEK-SRC-082", "LEEK-SRC-014"],
    },
    {
      observation: "The website and two mirrors were reportedly hosted by a German provider (PC Gamer via a crypto blog).",
      confidence: "low",
      sourceIds: ["LEEK-SRC-092", "LEEK-SRC-035"],
    },
    {
      observation: "Contact is offered over Session, an end-to-end encrypted messenger, gated by a Monero payment; Monero and Session are chosen for privacy.",
      confidence: "moderate",
      sourceIds: ["LEEK-SRC-015", "LEEK-SRC-091"],
    },
    {
      observation: "Initial distribution to the darknet forum Dread used Gofile and other file hosts, per community reporting.",
      confidence: "low",
      sourceIds: ["LEEK-SRC-094"],
    },
    {
      observation: "Copycat and scam sites using the CyberLeek name exist: Malwarebytes found fake GTA VI Extended Look and demo sites delivering an infostealer, Cryptopolitan reported scam sites posing as GTA VI stealing crypto, and the cyber-leek.online capture shows a donation-and-email-capture page inconsistent with the actor's described site.",
      confidence: "moderate",
      sourceIds: ["LEEK-SRC-013", "LEEK-SRC-088", "LEEK-SRC-008"],
    },
  ],
  historicalAliasReferences: [
    {
      note: "Arion Kurtaj and the 2022 Lapsus$ GTA VI leak: the actor reportedly called Kurtaj 'our colleague' in a Telegram statement relayed by a fan account. Kurtaj, a member of Lapsus$, received an indefinite hospital order in 2023 after the 2022 leak of roughly 90 development videos, and is reported to be awaiting retrial. No evidence connects him or Lapsus$ to the 2026 campaign; the reference is an actor claim, possibly rhetorical.",
      confidence: "low",
      sourceIds: ["LEEK-SRC-016", "LEEK-SRC-009", "LEEK-SRC-099", "LEEK-SRC-049"],
    },
    {
      note: "ShinyHunters and the April 2026 Rockstar third-party incident: ShinyHunters claimed access to Rockstar data through a cloud analytics vendor in April 2026, which Rockstar described as limited and unimportant. Mashable reports no established connection to CyberLeek, and Malwarebytes treats the incidents as separate.",
      confidence: "unknown",
      sourceIds: ["LEEK-SRC-016", "LEEK-SRC-013"],
    },
    {
      note: "'CyberLeeker' on Dread: a handle that posted the first clip to the darknet forum hours before wider spread, per community reporting; whether it is the same operator as the website is not established.",
      confidence: "low",
      sourceIds: ["LEEK-SRC-094", "LEEK-SRC-033"],
    },
  ],
  attributionTheories: [
    {
      id: "LEEK-ATT-001",
      theory: "The Discord account 'stayonthegrindd' is CyberLeek or a member of the group (LEEK-CLM-020).",
      origin: "community",
      evidence:
        "A Reddit post, deleted by moderators and archived on GTAForums, described a Discord account that joined a GTA VI server at 15:22 UTC on 2026-08-18, posted and deleted the basketball clip, asked what gameplay people wanted, promised driving footage at 15:55 UTC and said at 16:03 UTC it could share the full map quickly. GTAForums researcher Vice Cit matched those messages to Arweave uploads: the full map at 17:28:34 UTC and a driving video at 19:05 UTC the same day, and a gas-station clip on 2026-08-23 that another user says was previewed to them by direct message on 2026-08-18. Kotaku relayed the timeline on 2026-08-25. Weaknesses: the basketball clip was already public on Dread from 07:36 UTC, so possessing it proves nothing; the 'I own Gofile' remark that the timeline lists as a claim is read by another forum member as sarcasm; the account could be an associate, a reseller of early copies, or a bought account; the timestamps come from a deleted post and community screenshots, not from Discord or a court filing; and the thread moderator notes Take-Two likely already had the information. No real name is attached to the account in credible reporting, and none should be. The account is not named in any court filing in the corpus.",
      confidence: "low",
      status: "speculation",
      sourceIds: ["LEEK-SRC-094", "LEEK-SRC-028"],
    },
    {
      id: "LEEK-ATT-002",
      theory: "CyberLeek is German (LEEK-CLM-010).",
      origin: "community",
      evidence:
        "The only basis in the corpus is PC Gamer's reported observation, relayed by a crypto blog, that the website and two mirrors were hosted by a German provider. Hosting choice is weak evidence of nationality: anonymous operators routinely rent servers abroad, and the sites were also mirrored through Arweave gateways. No language analysis, court filing or investigative report supports the theory.",
      confidence: "low",
      status: "speculation",
      sourceIds: ["LEEK-SRC-092", "LEEK-SRC-035"],
    },
    {
      id: "LEEK-ATT-003",
      theory: "CyberLeek is Swiss (LEEK-CLM-011).",
      origin: "community",
      evidence:
        "No source in the research corpus supports or even discusses a Swiss origin; a targeted search returned nothing. The claim is recorded so that the registry entry has a documented status. Until a source appears it is unsupported speculation.",
      confidence: "unknown",
      status: "speculation",
      sourceIds: ["LEEK-SRC-016"],
    },
    {
      id: "LEEK-ATT-004",
      theory: "CyberLeek is located in Europe (LEEK-CLM-009).",
      origin: "community",
      evidence:
        "Rests on the German hosting report and on community readings of the Arweave upload times (roughly 13:00 to 21:00 UTC), which other community members read instead as timed for a US morning audience. Mashable states plainly that where the operator is located is unknown. The evidence is compatible with many regions.",
      confidence: "low",
      status: "speculation",
      sourceIds: ["LEEK-SRC-092", "LEEK-SRC-094", "LEEK-SRC-016"],
    },
    {
      id: "LEEK-ATT-005",
      theory: "CyberLeek is a single individual versus a group (LEEK-CLM-016 and LEEK-CLM-017).",
      origin: "media",
      evidence:
        "Mashable and PC Gamer describe an 'individual or group' and say it is unclear whether one person or several are involved; the actor uses collective phrasing ('our colleague', 'CYBERLEEK will'). Community analysts argue the operation (site, token, Arweave uploads, footage capture, editing and polls) looks like more than one person, and the stayonthegrindd theory itself allows for an associate. The Discord petition names three accounts, which shows Take-Two's investigators are not assuming a single account. None of this resolves the question.",
      confidence: "unknown",
      status: "unresolved",
      sourceIds: ["LEEK-SRC-016", "LEEK-SRC-035", "LEEK-SRC-093", "LEEK-SRC-004"],
    },
    {
      id: "LEEK-ATT-006",
      theory: "The leaks are a Rockstar or Take-Two marketing stunt (LEEK-CLM-021).",
      origin: "community",
      evidence:
        "The theory circulated on social media on the strength of the timing before the Netflix Extended Look, the absence of ending spoilers in the early clips, and the theatrical framing. Mashable's 2026-08-24 piece examined it and concluded it is almost certainly false: Take-Two has filed sworn petitions in federal court, Microsoft has confirmed it is working with Take-Two, real money has changed hands in the token, the share price fell, and Rockstar staff are reported to be angry. CyberScoop's Infoblox source initially suspected guerrilla marketing but said the company's response confirms a real investigation. GameGPU notes some users still speculate. No source disproves the theory outright, so it stays speculation, but the weight of evidence is against it.",
      confidence: "low",
      status: "speculation",
      sourceIds: ["LEEK-SRC-024", "LEEK-SRC-014", "LEEK-SRC-071", "LEEK-SRC-026"],
    },
    {
      id: "LEEK-ATT-007",
      theory: "CyberLeek is connected to Arion Kurtaj or the 2022 Lapsus$ leak (LEEK-CLM-018).",
      origin: "actor",
      evidence:
        "Solely the reported 'our colleague' remark in the 2026-08-20 Telegram statement, relayed second-hand by a fan Instagram account. Kurtaj has been under a hospital order since 2023 and is awaiting retrial; the 2022 material was an early build of about 90 videos while the current footage appears more recent. Analysts read the remark as rhetorical alignment rather than a claim of membership. No court filing or investigative report links the incidents.",
      confidence: "low",
      status: "actor-claim",
      sourceIds: ["LEEK-SRC-016", "LEEK-SRC-009", "LEEK-SRC-099", "LEEK-SRC-049", "LEEK-SRC-085"],
    },
    {
      id: "LEEK-ATT-008",
      theory: "CyberLeek is, or is supplied by, an insider with legitimate access at Rockstar or a partner.",
      origin: "media",
      evidence:
        "CyberScoop's sources say Take-Two is treating the case like an insider threat investigation and that the apparent build access could point to an insider; GTABoom floated an 'insider access theory' while disclaiming any conclusion; PCMag said it is unclear whether Rockstar was hacked or whether a test user or former employee was involved. No person is named. Rockstar had not identified the source as of 2026-08-21. Community alternatives such as a compromised remote session do not require an insider and are equally unevidenced.",
      confidence: "low",
      status: "speculation",
      sourceIds: ["LEEK-SRC-014", "LEEK-SRC-053", "LEEK-SRC-015", "LEEK-SRC-093"],
    },
    {
      id: "LEEK-ATT-009",
      theory: "The material originates from Rockstar India or another outsourcing partner, possibly via intermediaries (LEEK-CLM-008).",
      origin: "community",
      evidence:
        "A TweakTown rumour, relayed by Outlook India, grew on social media into a story of a phished Rockstar India employee, Russian hackers and a sale to CyberLeek for around $50M. Every outlet carrying it labels it unverified; ProPakistani, GTA Intel and EGW attach the India phishing claim to a second, separate group rather than to CyberLeek; the phishing story traces to a deleted Reddit post. Neither Rockstar nor Take-Two has confirmed any part of it.",
      confidence: "low",
      status: "speculation",
      sourceIds: ["LEEK-SRC-085", "LEEK-SRC-078", "LEEK-SRC-072", "LEEK-SRC-082"],
    },
    {
      id: "LEEK-ATT-010",
      theory: "CyberLeek is connected to ShinyHunters or the April 2026 Rockstar third-party incident (LEEK-CLM-019).",
      origin: "media",
      evidence:
        "Raised only to be dismissed: Mashable reports no established connection, Rockstar described the April incident as limited company information with no effect on operations or players, and Malwarebytes describes the incidents separately. There is no positive evidence for the link.",
      confidence: "unknown",
      status: "unresolved",
      sourceIds: ["LEEK-SRC-016", "LEEK-SRC-013"],
    },
  ],
  lastUpdated: "2026-08-27",
};
