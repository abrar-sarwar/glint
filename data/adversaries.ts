/**
 * Adversary dossiers. ShinyHunters / Scattered LAPSUS$ Hunters is the
 * primary entity profiled in GLINT v0.1; secondary dossiers exist for
 * relationship-graph context (Scattered Spider, Lapsus$).
 */

export type AttributionConfidence = "low" | "moderate" | "high";
export type Sophistication =
  | "opportunistic"
  | "moderate"
  | "moderate-to-high"
  | "high"
  | "advanced";
export type EntityType = "actor" | "alias" | "affiliate" | "victim";

export interface SignatureTTP {
  mitre_id: string;
  notes: string;
}

export interface RelatedActor {
  id: string;
  name: string;
  relationship:
    | "operational-overlap"
    | "shared-membership"
    | "successor"
    | "predecessor"
    | "affiliated-channel";
  notes: string;
}

export interface AliasCluster {
  designation: string;
  tracked_by: string;
  scope: string;
  first_seen: string;
}

export interface NotableBreach {
  campaign_id: string;
  short_label: string;
  date: string;
  victims_summary: string;
}

export interface VictimMention {
  name: string;
  sector: string;
  campaign_id: string;
  source_id: string;
}

export interface Adversary {
  id: string;
  name: string;
  primary_designation: string;
  aliases: AliasCluster[];
  first_observed: string;
  motivation: string;
  sophistication: Sophistication;
  attribution_confidence: AttributionConfidence;
  origin_assessment: string;
  victimology: {
    sectors: string[];
    geographic_focus: string[];
    targeting_pattern: string;
  };
  signature_ttps: SignatureTTP[];
  notable_breaches: NotableBreach[];
  related_actors: RelatedActor[];
  notable_victims: VictimMention[];
  source_ids: string[];
  summary: string;
}

export const shinyhunters: Adversary = {
  id: "shinyhunters",
  name: "ShinyHunters",
  primary_designation: "ShinyHunters / Scattered LAPSUS$ Hunters",
  aliases: [
    {
      designation: "Scattered LAPSUS$ Hunters",
      tracked_by: "Self-designated (Telegram channel, August 2025)",
      scope: "Public-facing rebrand combining ShinyHunters with members of the Scattered Spider and Lapsus$ ecosystems",
      first_seen: "2025-08",
    },
    {
      designation: "UNC5537",
      tracked_by: "Mandiant",
      scope: "Snowflake customer-tenant credential-stuffing and extortion campaign (2024)",
      first_seen: "2024-04",
    },
    {
      designation: "UNC6040",
      tracked_by: "Mandiant",
      scope: "Voice phishing of Salesforce administrators leading to malicious Data Loader connected app installs. 2024 onward.",
      first_seen: "2024-10",
    },
    {
      designation: "UNC6395",
      tracked_by: "Mandiant",
      scope: "Salesloft Drift OAuth-token theft and downstream Salesforce data exfiltration (August 2025)",
      first_seen: "2025-08",
    },
  ],
  first_observed: "2020-04",
  motivation: "Financially motivated eCrime",
  sophistication: "moderate-to-high",
  attribution_confidence: "high",
  origin_assessment:
    "Distributed membership across English-speaking online communities; Telegram and BreachForums-adjacent channels are the primary coordination surface. No nation-state nexus assessed.",
  victimology: {
    sectors: [
      "Telecommunications",
      "Retail / e-commerce",
      "Financial services",
      "Software-as-a-Service",
      "Education",
      "Travel / hospitality",
      "Healthcare",
    ],
    geographic_focus: [
      "United States",
      "United Kingdom",
      "European Union",
      "Latin America",
      "Australia",
    ],
    targeting_pattern:
      "Opportunistic about access. They take whatever credentials or OAuth tokens are exposed. Deliberate about monetisation. They prefer publicly traded companies and large consumer brands where reputational pressure makes payment more likely.",
  },
  signature_ttps: [
    {
      mitre_id: "T1078",
      notes:
        "Always logs in rather than exploits. Valid-account abuse is the through-line of every campaign in the cluster.",
    },
    {
      mitre_id: "T1110.004",
      notes:
        "Credential stuffing with infostealer logs against SaaS auth surfaces lacking enforced MFA (Snowflake, Okta, Salesforce, Workday).",
    },
    {
      mitre_id: "T1566.004",
      notes:
        "Voice-phishing of helpdesk and Salesforce admins (UNC6040), often impersonating IT support to coerce OAuth grants or password resets.",
    },
    {
      mitre_id: "T1552",
      notes:
        "Public repository secret hunting with tools like TruffleHog and git-leaks. The Salesloft Drift GitHub OAuth token theft is the canonical example.",
    },
    {
      mitre_id: "T1528",
      notes:
        "OAuth refresh-token theft for cloud SaaS applications. Tokens used to bypass conditional-access and MFA.",
    },
    {
      mitre_id: "T1550.001",
      notes:
        "Replays stolen OAuth tokens against Salesforce, Snowflake, and Workday APIs to enumerate and exfiltrate data without interactive authentication.",
    },
    {
      mitre_id: "T1530",
      notes:
        "Bulk extraction from cloud data planes. Salesforce Bulk API 2.0, Snowflake COPY INTO against attacker-controlled stages, and S3 listing or sync.",
    },
    {
      mitre_id: "T1567",
      notes:
        "Exfil over web services: attacker-controlled S3 buckets, MEGA, file.io, anonymous paste hosts.",
    },
    {
      mitre_id: "T1657",
      notes:
        "Public extortion via dedicated leak site, BreachForums sales, and direct corporate ransom demands.",
    },
  ],
  notable_breaches: [
    {
      campaign_id: "snowflake-c5537",
      short_label: "Snowflake credential stuffing",
      date: "2024-04 → 2024-07",
      victims_summary: "≈165 Snowflake tenants; AT&T, Ticketmaster, Santander, Advance Auto Parts, LendingTree confirmed",
    },
    {
      campaign_id: "salesloft-drift",
      short_label: "Salesloft Drift OAuth supply chain",
      date: "2025-08-08 → 2025-08-18",
      victims_summary: "≈760 organisations, ~1.5B Salesforce records claimed",
    },
    {
      campaign_id: "canvas-extortion",
      short_label: "Instructure / Canvas extortion",
      date: "2026-04 → ongoing",
      victims_summary: "Claim of 9,000 institutions and 275M users; deadline 2026-05-12",
    },
  ],
  related_actors: [
    {
      id: "scattered-spider",
      name: "Scattered Spider (Octo Tempest)",
      relationship: "operational-overlap",
      notes:
        "Membership and tradecraft overlap with Scattered Spider. Vishing of helpdesks and OAuth-driven SaaS targeting are shared techniques. The 'Scattered LAPSUS$ Hunters' rebrand is an explicit acknowledgement of cross-pollination.",
    },
    {
      id: "lapsus",
      name: "Lapsus$",
      relationship: "shared-membership",
      notes:
        "Multiple individuals indicted as Lapsus$ in 2022 and 2023 have reportedly re-emerged in ShinyHunters channels. Both groups coordinate primarily on Telegram.",
    },
    {
      id: "scattered-lapsus-hunters",
      name: "Scattered LAPSUS$ Hunters (Telegram)",
      relationship: "affiliated-channel",
      notes:
        "Public Telegram channel established mid-2025 used to leak victim data, recruit affiliates, and coordinate extortion timelines.",
    },
  ],
  notable_victims: [
    {
      name: "AT&T",
      sector: "Telecommunications",
      campaign_id: "snowflake-c5537",
      source_id: "att-disclosure",
    },
    {
      name: "Ticketmaster (Live Nation)",
      sector: "Entertainment / e-commerce",
      campaign_id: "snowflake-c5537",
      source_id: "ticketmaster-disclosure",
    },
    {
      name: "Santander",
      sector: "Financial services",
      campaign_id: "snowflake-c5537",
      source_id: "krebs-snowflake",
    },
    {
      name: "Advance Auto Parts",
      sector: "Retail",
      campaign_id: "snowflake-c5537",
      source_id: "krebs-snowflake",
    },
    {
      name: "LendingTree",
      sector: "Financial services",
      campaign_id: "snowflake-c5537",
      source_id: "krebs-snowflake",
    },
    {
      name: "Cloudflare",
      sector: "SaaS infrastructure",
      campaign_id: "salesloft-drift",
      source_id: "mand-unc6395",
    },
    {
      name: "Palo Alto Networks",
      sector: "Cybersecurity",
      campaign_id: "salesloft-drift",
      source_id: "mand-unc6395",
    },
    {
      name: "Zscaler",
      sector: "Cybersecurity",
      campaign_id: "salesloft-drift",
      source_id: "mand-unc6395",
    },
    {
      name: "Tenable",
      sector: "Cybersecurity",
      campaign_id: "salesloft-drift",
      source_id: "mand-unc6395",
    },
    {
      name: "Instructure (Canvas)",
      sector: "Education technology",
      campaign_id: "canvas-extortion",
      source_id: "instructure-canvas-statement",
    },
  ],
  source_ids: [
    "cs-2026-gtr",
    "cs-counter-adversary-shinyhunters",
    "mand-unc5537",
    "mand-unc6040",
    "mand-unc6395",
    "krebs-snowflake",
    "krebs-shinyhunters-rebrand",
    "intel471-ecrime-marketplaces",
    "trufflehog-drift",
  ],
  summary:
    "ShinyHunters is a financially motivated eCrime cluster active since 2020 on BreachForums and Telegram. Their tradecraft is built almost entirely on identity. Stolen credentials, OAuth tokens, and helpdesk-targeted voice phishing get them in. They almost never use malware or exploits. Mandiant tracks the same operators under at least five UNC numbers, reported here as aliases. The 2024 Snowflake C5537 campaign, the 2025 Salesloft Drift OAuth supply chain operation, and the 2026 Canvas extortion are the three most consequential intrusions attributed to them.",
};

export const adversaries: Adversary[] = [shinyhunters];

export interface RelatedEntityNode {
  id: string;
  label: string;
  type: EntityType;
  detail: string;
}

/**
 * Flat list of entity nodes used by the React Flow relationship graph
 * on /adversary. Order is rendered around the central ShinyHunters node.
 */
export const adversaryGraphEntities: RelatedEntityNode[] = [
  {
    id: "shinyhunters",
    label: "ShinyHunters",
    type: "actor",
    detail:
      "Primary tracked entity. Financially motivated eCrime cluster active since 2020. Self-designates as 'Scattered LAPSUS$ Hunters' on Telegram (2025).",
  },
  {
    id: "unc5537",
    label: "UNC5537",
    type: "alias",
    detail:
      "Mandiant cluster covering the 2024 Snowflake credential-stuffing operation. Approximately 165 Snowflake customer tenants impacted.",
  },
  {
    id: "unc6040",
    label: "UNC6040",
    type: "alias",
    detail:
      "Mandiant cluster covering vishing-driven Salesforce Data Loader installations. Active 2024-10 onward.",
  },
  {
    id: "unc6395",
    label: "UNC6395",
    type: "alias",
    detail:
      "Mandiant cluster covering Salesloft Drift OAuth-token theft and downstream Salesforce data theft (August 2025).",
  },
  {
    id: "scattered-spider",
    label: "Scattered Spider",
    type: "affiliate",
    detail:
      "Operational overlap. Shared vishing tradecraft, helpdesk impersonation, and cloud-SaaS targeting. CrowdStrike-tracked adversary 'Scattered Spider'; Microsoft-tracked 'Octo Tempest'.",
  },
  {
    id: "lapsus",
    label: "Lapsus$",
    type: "affiliate",
    detail:
      "Membership overlap and shared Telegram-native coordination style. Several individuals indicted as Lapsus$ in 2022 and 2023 have appeared in current ShinyHunters channels.",
  },
  {
    id: "att",
    label: "AT&T",
    type: "victim",
    detail:
      "Snowflake C5537 victim. ~110M customer call/text records exposed. Disclosed July 2024.",
  },
  {
    id: "ticketmaster",
    label: "Ticketmaster",
    type: "victim",
    detail:
      "Snowflake C5537 victim. 560M+ customer records claimed by the actor on BreachForums. Disclosed via Live Nation 8-K, May 2024.",
  },
  {
    id: "santander",
    label: "Santander",
    type: "victim",
    detail:
      "Snowflake C5537 victim. Customer and staff data from Spain, Chile, Uruguay reported.",
  },
  {
    id: "cloudflare",
    label: "Cloudflare",
    type: "victim",
    detail:
      "Salesloft Drift OAuth supply-chain victim. Limited Salesforce contact metadata reported.",
  },
  {
    id: "paloalto",
    label: "Palo Alto Networks",
    type: "victim",
    detail:
      "Salesloft Drift OAuth supply-chain victim. Customer support case data reported.",
  },
  {
    id: "zscaler",
    label: "Zscaler",
    type: "victim",
    detail:
      "Salesloft Drift OAuth supply-chain victim. Limited Salesforce data exposure confirmed.",
  },
  {
    id: "instructure",
    label: "Instructure (Canvas)",
    type: "victim",
    detail:
      "Active 2026 extortion target. Threat actor claims 9,000 educational institutions and 275M users. Ransom deadline 2026-05-12.",
  },
];

export interface RelationshipEdge {
  source: string;
  target: string;
  label: string;
  weight: 1 | 2 | 3; // visual weight; 3 = strongest tie
}

export const adversaryGraphEdges: RelationshipEdge[] = [
  // alias edges
  { source: "shinyhunters", target: "unc5537", label: "alias", weight: 3 },
  { source: "shinyhunters", target: "unc6040", label: "alias", weight: 3 },
  { source: "shinyhunters", target: "unc6395", label: "alias", weight: 3 },
  // affiliate edges
  { source: "shinyhunters", target: "scattered-spider", label: "operational overlap", weight: 2 },
  { source: "shinyhunters", target: "lapsus", label: "shared membership", weight: 2 },
  // victim edges
  { source: "unc5537", target: "att", label: "victim", weight: 2 },
  { source: "unc5537", target: "ticketmaster", label: "victim", weight: 2 },
  { source: "unc5537", target: "santander", label: "victim", weight: 2 },
  { source: "unc6395", target: "cloudflare", label: "victim", weight: 1 },
  { source: "unc6395", target: "paloalto", label: "victim", weight: 1 },
  { source: "unc6395", target: "zscaler", label: "victim", weight: 1 },
  { source: "shinyhunters", target: "instructure", label: "victim", weight: 2 },
];
