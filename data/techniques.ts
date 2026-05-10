/**
 * MITRE ATT&CK Enterprise technique catalogue used throughout GLINT.
 * Limited to the subset of techniques exercised by the three flagship
 * campaigns plus their direct predecessors. Descriptions paraphrased
 * from MITRE ATT&CK; primary source: attack.mitre.org.
 */

export type Tactic =
  | "Reconnaissance"
  | "Resource Development"
  | "Initial Access"
  | "Execution"
  | "Persistence"
  | "Privilege Escalation"
  | "Defense Evasion"
  | "Credential Access"
  | "Discovery"
  | "Lateral Movement"
  | "Collection"
  | "Command and Control"
  | "Exfiltration"
  | "Impact";

export interface Technique {
  id: string; // e.g. "T1078" or "T1550.001"
  parent_id?: string; // for sub-techniques
  name: string;
  tactics: Tactic[];
  description: string;
  campaigns_used_in: string[]; // campaign ids
  source_id: string;
}

export const tactics: Tactic[] = [
  "Reconnaissance",
  "Resource Development",
  "Initial Access",
  "Execution",
  "Persistence",
  "Privilege Escalation",
  "Defense Evasion",
  "Credential Access",
  "Discovery",
  "Lateral Movement",
  "Collection",
  "Command and Control",
  "Exfiltration",
  "Impact",
];

export const techniques: Technique[] = [
  {
    id: "T1593",
    name: "Search Open Websites/Domains",
    tactics: ["Reconnaissance"],
    description:
      "Adversaries enumerate publicly accessible code repositories, paste sites, and developer forums for information that aids intrusion. UNC6395 used TruffleHog against a public Salesloft Drift GitHub repository to discover OAuth refresh tokens.",
    campaigns_used_in: ["salesloft-drift"],
    source_id: "mitre-t1593",
  },
  {
    id: "T1589",
    name: "Gather Victim Identity Information",
    tactics: ["Reconnaissance"],
    description:
      "Adversaries collect credentials and personal information from the victim. Infostealer log marketplaces are a primary input to ShinyHunters' Snowflake credential-stuffing operation.",
    campaigns_used_in: ["snowflake-c5537"],
    source_id: "mitre-t1589",
  },
  {
    id: "T1589.001",
    parent_id: "T1589",
    name: "Credentials",
    tactics: ["Reconnaissance"],
    description:
      "Adversaries acquire credentials. UNC5537 sourced cleartext Snowflake credentials harvested by Vidar, Lumma, RedLine, RisePro, and Raccoon stealers from underground marketplaces (Genesis, Russian Market, Telegram channels).",
    campaigns_used_in: ["snowflake-c5537"],
    source_id: "mitre-t1589",
  },
  {
    id: "T1078",
    name: "Valid Accounts",
    tactics: ["Initial Access", "Persistence", "Privilege Escalation", "Defense Evasion"],
    description:
      "Use of legitimate credentials to authenticate. The defining characteristic of every ShinyHunters intrusion: the actor logs in rather than exploits.",
    campaigns_used_in: ["snowflake-c5537", "salesloft-drift", "canvas-extortion"],
    source_id: "mitre-t1078",
  },
  {
    id: "T1199",
    name: "Trusted Relationship",
    tactics: ["Initial Access"],
    description:
      "Adversaries breach a trusted third party to access the intended target. Salesloft Drift's OAuth integration with customer Salesforce orgs was the trusted relationship abused in August 2025.",
    campaigns_used_in: ["salesloft-drift"],
    source_id: "mitre-t1199",
  },
  {
    id: "T1110.004",
    parent_id: "T1110",
    name: "Credential Stuffing",
    tactics: ["Credential Access"],
    description:
      "Replay of harvested username/password pairs against a target authentication surface. Snowflake C5537 victims were enumerated via automated stuffing with pre-existing infostealer credentials.",
    campaigns_used_in: ["snowflake-c5537"],
    source_id: "mitre-t1110-004",
  },
  {
    id: "T1552",
    name: "Unsecured Credentials",
    tactics: ["Credential Access"],
    description:
      "Searching compromised systems and public artefacts for credentials. UNC6395 ran TruffleHog against a Drift GitHub repository to extract OAuth refresh tokens that were committed in plaintext.",
    campaigns_used_in: ["salesloft-drift"],
    source_id: "mitre-t1552",
  },
  {
    id: "T1566.004",
    parent_id: "T1566",
    name: "Spearphishing Voice",
    tactics: ["Initial Access"],
    description:
      "Voice-based social engineering targeting employees, often impersonating IT support. UNC6040 used vishing against Salesforce administrators to coerce them into authorising a malicious Data Loader connected app.",
    campaigns_used_in: ["salesloft-drift"],
    source_id: "mitre-t1566-004",
  },
  {
    id: "T1528",
    name: "Steal Application Access Token",
    tactics: ["Credential Access"],
    description:
      "Theft of OAuth access or refresh tokens from connected applications. The Drift incident exposed valid refresh tokens for hundreds of Salesforce customer orgs.",
    campaigns_used_in: ["salesloft-drift"],
    source_id: "mitre-t1528",
  },
  {
    id: "T1550.001",
    parent_id: "T1550",
    name: "Application Access Token",
    tactics: ["Defense Evasion", "Lateral Movement"],
    description:
      "Use of stolen application access tokens to access cloud APIs without triggering interactive auth controls (MFA, conditional access). Drift OAuth tokens were replayed against Salesforce REST and Bulk APIs.",
    campaigns_used_in: ["salesloft-drift"],
    source_id: "mitre-t1550-001",
  },
  {
    id: "T1530",
    name: "Data from Cloud Storage",
    tactics: ["Collection"],
    description:
      "Adversaries access data residing in cloud storage and SaaS data planes. ShinyHunters consistently targets Salesforce Account/Contact objects, Snowflake warehouses, and other cloud data tiers.",
    campaigns_used_in: ["snowflake-c5537", "salesloft-drift", "canvas-extortion"],
    source_id: "mitre-t1530",
  },
  {
    id: "T1567",
    name: "Exfiltration Over Web Service",
    tactics: ["Exfiltration"],
    description:
      "Use of web services (cloud storage buckets, paste services, file-share sites) to exfiltrate data. Snowflake C5537 used `COPY INTO` against attacker-controlled S3 stages.",
    campaigns_used_in: ["snowflake-c5537", "salesloft-drift", "canvas-extortion"],
    source_id: "mitre-t1567",
  },
  {
    id: "T1657",
    name: "Financial Theft",
    tactics: ["Impact"],
    description:
      "Extortion or direct theft. ShinyHunters' monetisation: data leak threats on dedicated leak sites, BreachForums sales, and direct ransom demands.",
    campaigns_used_in: ["snowflake-c5537", "salesloft-drift", "canvas-extortion"],
    source_id: "mitre-t1657",
  },
];

export const techniqueById = (id: string): Technique | undefined =>
  techniques.find((t) => t.id === id);
