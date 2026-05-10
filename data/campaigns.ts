/**
 * Flagship campaign dossiers. Each campaign drives a /campaigns/[slug]
 * deep-dive page with kill chain, timeline, IOCs, and source list.
 *
 * IOC marker discipline:
 *   - synthetic: true → fabricated for illustration; obviously fake
 *     (RFC1918, .example, well-known test hashes, etc.).
 *   - synthetic: false → reported in the cited primary source.
 */

import type { Source } from "./sources";

export type AttributionConfidence = "low" | "moderate" | "high";

export interface KillChainStage {
  step: number;
  mitre_id: string;
  technique_name: string;
  stage_label: string;
  description: string;
  what_to_detect: string;
  detection_id?: string;
  iocs?: IOC[];
}

export interface IOC {
  type: "ip" | "domain" | "hash" | "url" | "asn" | "user-agent" | "oauth-app-id" | "email";
  value: string;
  context: string;
  synthetic: boolean;
  source_id?: string;
  first_seen?: string;
}

export interface TimelineEvent {
  date: string;
  event: string;
  source_id?: string;
}

export interface CampaignVictim {
  name: string;
  sector: string;
  scope?: string;
  source_id: string;
}

export interface Campaign {
  id: string;
  slug: string;
  name: string;
  short_label: string;
  status: "historical" | "active" | "ongoing-extortion";
  time_period: string;
  date_range: { start: string; end?: string };
  attribution_actor: string;
  attribution_aliases: string[];
  attribution_confidence: AttributionConfidence;
  initial_access_vector: string;
  victims: CampaignVictim[];
  victims_summary: string;
  data_stolen: string;
  monetization_method: string;
  timeline_events: TimelineEvent[];
  kill_chain_stages: KillChainStage[];
  source_ids: string[];
  summary: string;
}

const snowflakeC5537: Campaign = {
  id: "snowflake-c5537",
  slug: "snowflake-c5537",
  name: "Snowflake Customer-Tenant Credential Stuffing",
  short_label: "Snowflake C5537",
  status: "historical",
  time_period: "April to July 2024",
  date_range: { start: "2024-04-14", end: "2024-07-31" },
  attribution_actor: "ShinyHunters",
  attribution_aliases: ["UNC5537"],
  attribution_confidence: "high",
  initial_access_vector:
    "Credential stuffing of Snowflake customer accounts using cleartext credentials harvested years prior by Vidar, Lumma, RedLine, RisePro, and Raccoon infostealers.",
  victims: [
    {
      name: "AT&T",
      sector: "Telecommunications",
      scope: "Approximately 110M customer call and text metadata records covering May to October 2022",
      source_id: "att-disclosure",
    },
    {
      name: "Ticketmaster (Live Nation)",
      sector: "Entertainment / e-commerce",
      scope: "560M customer records claimed; ~1.3 TB",
      source_id: "ticketmaster-disclosure",
    },
    {
      name: "Santander",
      sector: "Financial services",
      scope: "Customer and employee data from Spain, Chile, Uruguay",
      source_id: "krebs-snowflake",
    },
    {
      name: "Advance Auto Parts",
      sector: "Retail",
      scope: "≈380M customer/employee records claimed",
      source_id: "krebs-snowflake",
    },
    {
      name: "LendingTree",
      sector: "Financial services",
      scope: "Limited disclosure; subsidiary QuoteWizard data exposure",
      source_id: "krebs-snowflake",
    },
  ],
  victims_summary:
    "Approximately 165 Snowflake customer tenants notified by Snowflake and Mandiant; five publicly confirmed.",
  data_stolen:
    "Customer PII, call detail records (AT&T), event ticket purchase records (Ticketmaster), banking customer data (Santander), retail transaction history.",
  monetization_method:
    "Direct extortion of victim companies (six-to-eight-figure demands) plus parallel listings on BreachForums and ShinyHunters' BreachForums-adjacent leak channel.",
  timeline_events: [
    {
      date: "2020-08",
      event: "Earliest infostealer log entries containing Snowflake credentials later abused in C5537 (per Mandiant retrospective).",
      source_id: "mand-unc5537",
    },
    {
      date: "2024-04-14",
      event: "First UNC5537 authentications observed against Snowflake customer tenants.",
      source_id: "mand-unc5537",
    },
    {
      date: "2024-05-23",
      event: "Snowflake notifies a 'limited number' of customers of a targeted threat campaign.",
      source_id: "snowflake-advisory-2024",
    },
    {
      date: "2024-05-31",
      event: "Live Nation files Form 8-K disclosing the Ticketmaster data incident.",
      source_id: "ticketmaster-disclosure",
    },
    {
      date: "2024-06-10",
      event: "Mandiant publishes UNC5537 attribution and tradecraft brief.",
      source_id: "mand-unc5537",
    },
    {
      date: "2024-07-12",
      event: "AT&T files 8-K disclosing Snowflake-related data theft of 110M customer records.",
      source_id: "att-disclosure",
    },
    {
      date: "2024-07-31",
      event: "Snowflake completes mandatory MFA enforcement for new accounts; campaign tail ends.",
      source_id: "snowflake-advisory-2024",
    },
  ],
  kill_chain_stages: [
    {
      step: 1,
      mitre_id: "T1589.001",
      technique_name: "Gather Victim Identity Information: Credentials",
      stage_label: "Source infostealer logs",
      description:
        "Cleartext Snowflake credentials harvested between 2020 and 2024 by Vidar, Lumma, RedLine, RisePro, and Raccoon. The actor sourced batches from Russian Market, Genesis, and Telegram log channels.",
      what_to_detect:
        "Periodic monitoring of stealer-log marketplaces for credentials matching corporate SaaS hostnames; corporate device infections (off-host) appearing in sold log batches.",
    },
    {
      step: 2,
      mitre_id: "T1110.004",
      technique_name: "Brute Force: Credential Stuffing",
      stage_label: "Authenticate to Snowflake tenants",
      description:
        "Automated authentication attempts against Snowflake customer tenants using harvested credentials. No MFA was enforced on the targeted accounts.",
      what_to_detect:
        "Successful authentication from a previously unseen ASN, country, or user-agent for a given user; first-ever client-driver downloads.",
      detection_id: "det-snowflake-new-asn-copy",
    },
    {
      step: 3,
      mitre_id: "T1078",
      technique_name: "Valid Accounts",
      stage_label: "Establish persistent session",
      description:
        "Long-lived sessions established via the Snowflake JDBC/ODBC drivers. The actor created network policies to whitelist their own IPs in some tenants.",
      what_to_detect:
        "Creation of new NETWORK_POLICY objects from non-administrative sources; first-time use of programmatic client drivers by interactive users.",
    },
    {
      step: 4,
      mitre_id: "T1530",
      technique_name: "Data from Cloud Storage",
      stage_label: "Enumerate and stage data",
      description:
        "Discovery of databases, schemas, and object metadata via SHOW commands and INFORMATION_SCHEMA queries; staging via internal stages or transient tables.",
      what_to_detect:
        "Surge in metadata discovery queries (SHOW DATABASES, SHOW TABLES) by an account that historically only reads specific tables; creation of new internal stages.",
    },
    {
      step: 5,
      mitre_id: "T1567",
      technique_name: "Exfiltration Over Web Service",
      stage_label: "COPY INTO attacker S3 stage",
      description:
        "Bulk export via `COPY INTO @ext_stage` against attacker-controlled S3, GCS, or Azure Blob external stages.",
      what_to_detect:
        "External stage targets matching non-corporate cloud accounts; large unload volumes; creation of new EXTERNAL_STAGE objects pointing at unfamiliar buckets.",
      detection_id: "det-snowflake-new-asn-copy",
      iocs: [
        {
          type: "ip",
          value: "194.X.X.X (multiple Mullvad VPN exits, M-247 ASN)",
          context: "Documented exit infrastructure abused during the campaign",
          synthetic: false,
          source_id: "mand-unc5537",
        },
        {
          type: "user-agent",
          value: "rapeflake/0.0 (FROSTBITE)",
          context: "Custom reconnaissance utility named in Mandiant reporting",
          synthetic: false,
          source_id: "mand-unc5537",
        },
      ],
    },
    {
      step: 6,
      mitre_id: "T1657",
      technique_name: "Financial Theft",
      stage_label: "Extort the victim",
      description:
        "Direct ransom demand to victim followed by parallel BreachForums listing if the victim refuses to pay.",
      what_to_detect:
        "Out-of-band ransom communications referencing specific Snowflake table or schema names indicate confirmed access. Treat as triage signal even if not technical telemetry.",
    },
  ],
  source_ids: [
    "mand-unc5537",
    "snowflake-advisory-2024",
    "att-disclosure",
    "ticketmaster-disclosure",
    "ars-ticketmaster",
    "krebs-snowflake",
    "cs-counter-adversary-shinyhunters",
  ],
  summary:
    "UNC5537 (ShinyHunters) leveraged years of accumulated infostealer logs to credential-stuff Snowflake customer tenants that lacked enforced multi-factor authentication. Approximately 165 organisations were compromised, with five publicly confirmed. The campaign forced Snowflake to enforce mandatory MFA on new accounts and is the canonical example of identity-only intrusion against a major data-warehouse SaaS provider.",
};

const salesloftDrift: Campaign = {
  id: "salesloft-drift",
  slug: "salesloft-drift",
  name: "Salesloft Drift OAuth Supply-Chain Compromise",
  short_label: "Salesloft Drift",
  status: "historical",
  time_period: "August 2025",
  date_range: { start: "2025-08-08", end: "2025-08-18" },
  attribution_actor: "ShinyHunters",
  attribution_aliases: ["UNC6395"],
  attribution_confidence: "high",
  initial_access_vector:
    "TruffleHog scan of a publicly accessible Salesloft Drift GitHub repository surfaced OAuth refresh tokens for hundreds of customer Salesforce tenants. The actor pivoted directly into customer Salesforce orgs without ever touching Salesloft's production environment.",
  victims: [
    {
      name: "Cloudflare",
      sector: "SaaS infrastructure",
      scope: "Limited Salesforce contact metadata; no customer data exposure confirmed.",
      source_id: "mand-unc6395",
    },
    {
      name: "Palo Alto Networks",
      sector: "Cybersecurity",
      scope: "Customer support case data accessed via Salesforce.",
      source_id: "mand-unc6395",
    },
    {
      name: "Zscaler",
      sector: "Cybersecurity",
      scope: "Limited Salesforce data exposure confirmed.",
      source_id: "mand-unc6395",
    },
    {
      name: "Tenable",
      sector: "Cybersecurity",
      scope: "Salesforce contact-level metadata exposure.",
      source_id: "mand-unc6395",
    },
    {
      name: "≈760 additional organisations",
      sector: "Cross-sector",
      scope: "Mandiant and Salesforce notified ≈760 organisations of confirmed unauthorized API access.",
      source_id: "record-salesforce-1500",
    },
  ],
  victims_summary:
    "Approximately 760 organisations confirmed as victims by Mandiant and Salesforce notification. Actor claims ≈1.5 billion records exfiltrated across all targets.",
  data_stolen:
    "Salesforce Account, Contact, Lead, Opportunity, and Case records; customer support case bodies; AWS access keys, Snowflake credentials, and other secrets present in Case body text or Opportunity descriptions.",
  monetization_method:
    "Public extortion via the Scattered LAPSUS$ Hunters Telegram channel. Customer-by-customer ransom demands followed by data leak threats; selected datasets posted on BreachForums.",
  timeline_events: [
    {
      date: "2025-08-08",
      event: "UNC6395 begins TruffleHog scanning of Salesloft public GitHub repositories.",
      source_id: "trufflehog-drift",
    },
    {
      date: "2025-08-09",
      event: "OAuth refresh tokens recovered from a Drift repo commit history; valid tokens identified for hundreds of customer orgs.",
      source_id: "trufflehog-drift",
    },
    {
      date: "2025-08-10",
      event: "First malicious Salesforce REST API queries observed using Drift Connected App context.",
      source_id: "mand-unc6395",
    },
    {
      date: "2025-08-15",
      event: "Bulk API 2.0 exports begin against customer Salesforce orgs at scale.",
      source_id: "mand-unc6395",
    },
    {
      date: "2025-08-18",
      event: "Salesforce begins mass revocation of Drift OAuth tokens after Salesloft notification.",
      source_id: "salesforce-advisory-drift",
    },
    {
      date: "2025-08-26",
      event: "Salesloft publishes incident statement attributing root cause to the GitHub-resident token leak.",
      source_id: "salesloft-incident",
    },
    {
      date: "2025-09-02",
      event: "Mandiant publishes UNC6395 attribution and tradecraft analysis.",
      source_id: "mand-unc6395",
    },
    {
      date: "2025-09-09",
      event: "The Record reports victim count has reached ≈760 organisations.",
      source_id: "record-salesforce-1500",
    },
  ],
  kill_chain_stages: [
    {
      step: 1,
      mitre_id: "T1593",
      technique_name: "Search Open Websites/Domains",
      stage_label: "Reconnaissance · Drift GitHub repo",
      description:
        "A public Salesloft Drift GitHub repository contained Connected App configuration material in commit history. That history included unredacted OAuth client secrets and customer refresh tokens.",
      what_to_detect:
        "External secret-scanning of your own public repos; alerting on accidental commits of OAuth client secrets, refresh tokens, and Connected App consumer keys.",
      detection_id: "det-public-repo-secret",
    },
    {
      step: 2,
      mitre_id: "T1552",
      technique_name: "Unsecured Credentials",
      stage_label: "TruffleHog secret extraction",
      description:
        "TruffleHog (open-source secret scanner) executed against the repository's full history. Yielded valid Salesforce OAuth refresh tokens scoped to hundreds of customer tenants via the Drift Connected App.",
      what_to_detect:
        "Off-host monitoring of public repositories you publish; detection of TruffleHog/git-leaks user-agent strings against your own forge if self-hosted.",
    },
    {
      step: 3,
      mitre_id: "T1528",
      technique_name: "Steal Application Access Token",
      stage_label: "OAuth refresh-token theft",
      description:
        "Refresh tokens for the Drift Connected App are exchanged at the Salesforce OAuth endpoint for access tokens against each customer tenant. No interactive authentication or MFA prompt is triggered.",
      what_to_detect:
        "OAuth refresh-token exchanges for installed Connected Apps from previously unseen IPs, ASNs, or geographies. Anomalous refresh velocity against a specific Connected App.",
      detection_id: "det-oauth-consent-non-corporate",
    },
    {
      step: 4,
      mitre_id: "T1550.001",
      technique_name: "Use Alternate Authentication Material: App Access Token",
      stage_label: "Salesforce REST API access",
      description:
        "The actor authenticates to Salesforce REST and Bulk APIs using stolen access tokens, bypassing MFA, conditional access, and login-IP allowlists.",
      what_to_detect:
        "Connected-App API access from non-corporate ASNs; Drift Connected App calls that diverge from its historical user-agent, source-IP, or operation pattern.",
      detection_id: "det-oauth-consent-non-corporate",
      iocs: [
        {
          type: "oauth-app-id",
          value: "Salesloft Drift Connected App (Consumer Key ending 3MV...G7T)",
          context: "Drift Connected App used for token replay; identifier truncated per Salesforce advisory",
          synthetic: false,
          source_id: "salesforce-advisory-drift",
        },
      ],
    },
    {
      step: 5,
      mitre_id: "T1530",
      technique_name: "Data from Cloud Storage",
      stage_label: "Salesforce Bulk API export",
      description:
        "Bulk API 2.0 query jobs against Account, Contact, Lead, Opportunity, and Case objects. Case bodies are particularly valuable: they routinely contain pasted credentials and access keys submitted in customer support workflows.",
      what_to_detect:
        "Bulk API 2.0 query operations exceeding tenant baseline; Connected Apps with unusual ApiTotalUsage; row counts > 50k per job by a Connected App with no historical Bulk API usage.",
      detection_id: "det-salesforce-bulk-export",
    },
    {
      step: 6,
      mitre_id: "T1567",
      technique_name: "Exfiltration Over Web Service",
      stage_label: "Stage exfiltrated data",
      description:
        "Bulk job results (CSV) downloaded by the actor and aggregated into per-victim datasets. Datasets used both for direct extortion and for secondary credential mining (recovering AWS keys, Snowflake passwords, etc. from Case bodies).",
      what_to_detect:
        "Egress monitoring on downloads from `*.salesforce.com` Bulk API result endpoints to non-corporate destinations; DLP on outbound responses containing characteristic Bulk API CSV headers.",
      iocs: [
        {
          type: "ip",
          value: "203.0.113.42",
          context: "Synthetic example exfiltration source",
          synthetic: true,
        },
        {
          type: "ip",
          value: "198.51.100.17",
          context: "Synthetic example exfiltration source",
          synthetic: true,
        },
        {
          type: "domain",
          value: "drift-staging.example",
          context: "Synthetic stand-in for actor-controlled staging domain",
          synthetic: true,
        },
        {
          type: "asn",
          value: "AS9009 (M247)",
          context: "Provider repeatedly observed in Drift OAuth replays",
          synthetic: false,
          source_id: "mand-unc6395",
        },
      ],
    },
    {
      step: 7,
      mitre_id: "T1657",
      technique_name: "Financial Theft",
      stage_label: "Extortion via Telegram",
      description:
        "Per-victim ransom demands published on the 'Scattered LAPSUS$ Hunters' Telegram channel, with sample data attached. Non-paying victims see additional data leaks at attacker-set deadlines.",
      what_to_detect:
        "Out of band signal. Monitor public extortion channels for your organisation's name and integrate channel scraping into your IR triage feed.",
    },
  ],
  source_ids: [
    "mand-unc6395",
    "mand-unc6040",
    "salesloft-incident",
    "salesforce-advisory-drift",
    "trufflehog-drift",
    "record-salesforce-1500",
    "krebs-shinyhunters-rebrand",
    "cs-counter-adversary-shinyhunters",
  ],
  summary:
    "The canonical OAuth supply chain compromise of the SaaS era. UNC6395, assessed by Mandiant as ShinyHunters aligned, discovered OAuth refresh tokens for the Drift Salesforce Connected App in a public GitHub repository. They replayed those tokens directly against approximately 760 customer Salesforce orgs via the Bulk API. The actor never touched Salesloft's production environment. The customer trust boundary was broken at the OAuth layer. The campaign exfiltrated an estimated 1.5 billion records, with secondary value extracted from credentials pasted into Salesforce Case bodies.",
};

const canvasExtortion: Campaign = {
  id: "canvas-extortion",
  slug: "canvas-extortion",
  name: "Instructure Canvas LMS Compromise and Extortion",
  short_label: "Canvas Extortion",
  status: "ongoing-extortion",
  time_period: "April to May 2026, active",
  date_range: { start: "2026-04-29", end: "2026-05-12" },
  attribution_actor: "ShinyHunters",
  attribution_aliases: ["Scattered LAPSUS$ Hunters"],
  attribution_confidence: "high",
  initial_access_vector:
    "Compromise of the Canvas Free-For-Teacher account program. Instructure publicly attributed initial access to an exploited issue in this self-service program and permanently shut it down as part of remediation.",
  victims: [
    {
      name: "Instructure (Canvas LMS)",
      sector: "Education technology",
      scope:
        "8,809 institutions affected. Approximately 275 million individual records and 3.65 TB total exposed. Confirmed exposed data includes names, email addresses, student IDs, and some private messages between students and teachers.",
      source_id: "instructure-canvas-statement-2026",
    },
    {
      name: "Harvard, Princeton, Columbia, UPenn, Georgetown",
      sector: "Higher education (United States)",
      scope:
        "Among institutions named in reporting and institutional statements as affected by the Canvas incident.",
      source_id: "harvard-crimson-canvas",
    },
    {
      name:
        "Arizona State University, University of Washington, UC system",
      sector: "Higher education (United States)",
      scope: "Public US universities reported as affected.",
      source_id: "cnn-canvas-2026",
    },
    {
      name:
        "University of Melbourne, UTS, RMIT, Griffith, Adelaide, University of Canberra",
      sector: "Higher education (Australia)",
      scope:
        "Australian universities reported as affected by the Canvas incident.",
      source_id: "techcrunch-canvas-2026",
    },
  ],
  victims_summary:
    "8,809 institutions affected. Approximately 275 million individual records, 3.65 TB total exposed.",
  data_stolen:
    "Names, email addresses, student IDs, and some private messages between students and teachers. Approximately 275 million records and 3.65 TB total.",
  monetization_method:
    "Time-boxed extortion via the Scattered LAPSUS$ Hunters Telegram channel. Initial deadline of May 6 2026 was extended to May 12 2026. Per-institution shaming and sample leaks continued through the deadline window.",
  timeline_events: [
    {
      date: "2025-09",
      event:
        "First ShinyHunters incident at Instructure: social engineering against the company's Salesforce business systems. Distinct from the Canvas product, but part of the eight-month context.",
      source_id: "cnn-canvas-2026",
    },
    {
      date: "2026-04-29",
      event: "Initial Canvas compromise detected by Instructure.",
      source_id: "instructure-canvas-statement-2026",
    },
    {
      date: "2026-05-01",
      event:
        "Instructure publicly confirms a security incident affecting Canvas.",
      source_id: "instructure-canvas-statement-2026",
    },
    {
      date: "2026-05-03",
      event:
        "ShinyHunters claim responsibility on the Scattered LAPSUS$ Hunters Telegram channel.",
      source_id: "databreaches-canvas-2026",
    },
    {
      date: "2026-05-05",
      event:
        "Inside Higher Ed publishes 'PAY OR LEAK: Hackers Target Big Higher Ed Vendor'.",
      source_id: "ihe-canvas-2026",
    },
    {
      date: "2026-05-06",
      event:
        "First ransom deadline. The actor extends the deadline to May 12 after public pressure.",
      source_id: "databreaches-canvas-2026",
    },
    {
      date: "2026-05-07",
      event:
        "Second incident: school login pages defaced. CNN, TechCrunch, Harvard Crimson, WRAL, NBC San Diego, ABC15, and CBS Sacramento all report.",
      source_id: "cnn-canvas-2026",
    },
    {
      date: "2026-05-08",
      event:
        "Instructure restores service after revoking privileged credentials, rotating API keys, and permanently shutting down Free-For-Teacher accounts.",
      source_id: "instructure-canvas-statement-2026",
    },
    {
      date: "2026-05-09",
      event:
        "Bitdefender publishes a technical advisory on the breach.",
      source_id: "bitdefender-canvas-2026",
    },
    {
      date: "2026-05-12",
      event:
        "Extended ransom deadline. Threat actor continues to leak per-institution sample data.",
      source_id: "databreaches-canvas-2026",
    },
  ],
  kill_chain_stages: [
    {
      step: 1,
      mitre_id: "T1190",
      technique_name: "Exploit Public-Facing Application",
      stage_label: "Free-For-Teacher program exploit",
      description:
        "An issue in Canvas's Free-For-Teacher account program was exploited to obtain initial access. Instructure has publicly identified this program as the entry vector and has permanently shut it down.",
      what_to_detect:
        "For SaaS providers running self-service account programs, monitor for unusual sign-up velocity, programmatic abuse of free-tier creation, and lateral access from free-tier accounts to elevated privileges.",
    },
    {
      step: 2,
      mitre_id: "T1078",
      technique_name: "Valid Accounts",
      stage_label: "Privileged credential abuse",
      description:
        "Following initial access, the actor obtained or abused privileged credentials. Instructure's remediation included revoking privileged credentials and rotating API keys.",
      what_to_detect:
        "Admin-tier authentications from non-corporate ASNs. Sudden privilege use by accounts that historically did not exercise admin rights.",
      detection_id: "det-canvas-impersonation-burst",
    },
    {
      step: 3,
      mitre_id: "T1530",
      technique_name: "Data from Cloud Storage",
      stage_label: "Bulk record extraction",
      description:
        "Aggregation of names, email addresses, student IDs, and some private messages between students and teachers. Approximately 3.65 TB exfiltrated across 8,809 institutional tenants.",
      what_to_detect:
        "API enumeration across multiple subaccounts in a short window. Bulk record retrieval that diverges from operational baseline.",
    },
    {
      step: 4,
      mitre_id: "T1567",
      technique_name: "Exfiltration Over Web Service",
      stage_label: "Stage exfiltrated data",
      description:
        "Aggregated dataset transferred to attacker-controlled storage. Sample data subsequently posted to the Scattered LAPSUS$ Hunters Telegram channel.",
      what_to_detect:
        "Outbound transfers from SaaS API endpoints to consumer cloud-storage destinations. Egress to Telegram CDN ranges.",
    },
    {
      step: 5,
      mitre_id: "T1491.001",
      technique_name: "Defacement: Internal Defacement",
      stage_label: "School login page defacement",
      description:
        "On May 7 2026, the actor defaced login pages at affected institutions to escalate pressure. The second incident drew renewed national and international media coverage.",
      what_to_detect:
        "Unauthorized changes to publicly served login pages or branding assets. Out of band, monitor your own login surfaces for visual integrity.",
    },
    {
      step: 6,
      mitre_id: "T1657",
      technique_name: "Financial Theft",
      stage_label: "Time-boxed extortion",
      description:
        "Public ransom demand on the Scattered LAPSUS$ Hunters Telegram channel. Initial deadline May 6 2026, extended to May 12 2026. Per-institution shaming continued through the deadline window.",
      what_to_detect:
        "Out of band. Monitor public extortion channels for institutional brand names.",
    },
  ],
  source_ids: [
    "instructure-canvas-statement-2026",
    "wiki-canvas-2026",
    "cnn-canvas-2026",
    "techcrunch-canvas-2026",
    "ihe-canvas-2026",
    "bitdefender-canvas-2026",
    "databreaches-canvas-2026",
    "harvard-crimson-canvas",
  ],
  summary:
    "On April 29 2026, Instructure detected a compromise of its Canvas LMS. The company publicly confirmed the incident on May 1, and ShinyHunters claimed responsibility on May 3 via the Scattered LAPSUS$ Hunters Telegram channel. The breach exposed names, email addresses, student IDs, and some private messages across approximately 275 million records and 3.65 TB total, affecting 8,809 institutions including Harvard, Princeton, Columbia, UPenn, Georgetown, ASU, the University of Washington, the UC system, and multiple Australian universities. Instructure attributed initial access to an exploited issue in the Canvas Free-For-Teacher account program. The first ransom deadline of May 6 was extended to May 12 after public pressure. On May 7 the actor defaced login pages at affected institutions in a second incident. Instructure restored service on May 8 after revoking privileged credentials, rotating API keys, and permanently shutting down the Free-For-Teacher account program. This was the second ShinyHunters incident at Instructure in eight months. The first, in September 2025, targeted Instructure's Salesforce business systems through social engineering and did not involve the Canvas product itself.",
};

export const campaigns: Campaign[] = [
  salesloftDrift, // most polished, front of list
  snowflakeC5537,
  canvasExtortion,
];

export const campaignBySlug = (slug: string): Campaign | undefined =>
  campaigns.find((c) => c.slug === slug);

export const campaignById = (id: string): Campaign | undefined =>
  campaigns.find((c) => c.id === id);

export type { Source };
