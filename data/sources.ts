/**
 * Central citation registry. Every claim made elsewhere in the product
 * should reference one of these by id. New citations should be added
 * here rather than inlined in component files.
 *
 * Verification flags:
 *   needs_url_verification: I am not certain the specific URL resolves.
 *     The publisher and headline are best-effort. Audit and replace
 *     with the canonical resolved URL during manual review.
 *   needs_date_verification: The date is a best-effort approximation.
 *     Confirm against the publisher's record.
 *
 * MITRE ATT&CK URLs follow a stable system-of-record pattern at
 * attack.mitre.org and are not flagged.
 */

export type SourceType =
  | "vendor-disclosure"
  | "intel-report"
  | "news"
  | "framework"
  | "research-blog"
  | "regulatory";

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  date: string; // ISO 8601 (YYYY-MM-DD)
  type: SourceType;
  /**
   * True when the specific article URL cannot be guaranteed to resolve
   * and needs manual audit. The publisher and headline remain useful.
   */
  needs_url_verification?: boolean;
  /**
   * True when the date is a best-effort approximation rather than a
   * verified publication date.
   */
  needs_date_verification?: boolean;
}

export const sources: Source[] = [
  // CrowdStrike Counter Adversary Operations
  {
    id: "cs-overwatch-may-2026",
    title:
      "CrowdStrike Falcon Adversary OverWatch for Defender Press Release (May 2026)",
    publisher: "CrowdStrike",
    url: "https://www.crowdstrike.com/press-releases/",
    date: "2026-05-06",
    type: "vendor-disclosure",
    needs_url_verification: true,
    needs_date_verification: true,
  },
  {
    id: "cs-2026-gtr",
    title: "2026 Global Threat Report",
    publisher: "CrowdStrike Counter Adversary Operations",
    url: "https://www.crowdstrike.com/global-threat-report/",
    date: "2026-02-18",
    type: "intel-report",
    needs_url_verification: true,
    needs_date_verification: true,
  },
  {
    id: "cs-counter-adversary-shinyhunters",
    title: "ShinyHunters Profile",
    publisher: "CrowdStrike",
    url: "https://www.crowdstrike.com/blog/",
    date: "2025-09-22",
    type: "research-blog",
    needs_url_verification: true,
    needs_date_verification: true,
  },

  // Mandiant
  {
    id: "mand-unc5537",
    title:
      "UNC5537 Targets Snowflake Customer Instances for Data Theft and Extortion",
    publisher: "Mandiant (Google Cloud)",
    url: "https://cloud.google.com/blog/topics/threat-intelligence/unc5537-snowflake-data-theft-extortion",
    date: "2024-06-10",
    type: "intel-report",
    needs_url_verification: true,
  },
  {
    id: "mand-unc6040",
    title:
      "Voice Phishing-Based Initial Access by UNC6040 Targets Salesforce",
    publisher: "Mandiant (Google Cloud)",
    url: "https://cloud.google.com/blog/topics/threat-intelligence/voice-phishing-data-extortion",
    date: "2025-06-04",
    type: "intel-report",
    needs_url_verification: true,
    needs_date_verification: true,
  },
  {
    id: "mand-unc6395",
    title:
      "UNC6395: Widespread Data Theft Targets Salesforce Instances via Compromised Salesloft Drift OAuth Tokens",
    publisher: "Mandiant (Google Cloud)",
    url: "https://cloud.google.com/blog/topics/threat-intelligence/data-theft-salesforce-instances-via-drift",
    date: "2025-09-02",
    type: "intel-report",
    needs_url_verification: true,
    needs_date_verification: true,
  },
  {
    id: "mand-mtrends-2025",
    title: "M-Trends 2025",
    publisher: "Mandiant (Google Cloud)",
    url: "https://cloud.google.com/security/resources/m-trends",
    date: "2025-04-23",
    type: "intel-report",
    needs_url_verification: true,
    needs_date_verification: true,
  },

  // Vendor disclosures
  {
    id: "snowflake-advisory-2024",
    title: "Detecting and Preventing Unauthorized User Access",
    publisher: "Snowflake",
    url: "https://www.snowflake.com/blog/detecting-and-preventing-unauthorized-user-access/",
    date: "2024-05-31",
    type: "vendor-disclosure",
    needs_url_verification: true,
  },
  {
    id: "salesloft-incident",
    title: "Drift Security Incident Statement",
    publisher: "Salesloft",
    url: "https://www.salesloft.com/resources/blog/",
    date: "2025-08-26",
    type: "vendor-disclosure",
    needs_url_verification: true,
    needs_date_verification: true,
  },
  {
    id: "salesforce-advisory-drift",
    title: "Salesforce Customer Advisory on Compromised Connected Apps",
    publisher: "Salesforce",
    url: "https://help.salesforce.com/",
    date: "2025-08-28",
    type: "vendor-disclosure",
    needs_url_verification: true,
    needs_date_verification: true,
  },
  {
    id: "att-disclosure",
    title: "AT&T Notice of Cybersecurity Incident (Form 8-K)",
    publisher: "AT&T",
    url: "https://about.att.com/story/2024/addressing-illegal-download.html",
    date: "2024-07-12",
    type: "vendor-disclosure",
    needs_url_verification: true,
  },
  {
    id: "ticketmaster-disclosure",
    title:
      "Live Nation Entertainment Form 8-K filing on Ticketmaster data incident",
    publisher: "U.S. Securities and Exchange Commission",
    url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001335258",
    date: "2024-05-31",
    type: "regulatory",
    needs_url_verification: true,
  },

  // Canvas / Instructure 2026 incident (verified)
  {
    id: "instructure-canvas-statement-2026",
    title: "Statement on the May 2026 Canvas Security Incident",
    publisher: "Instructure",
    url: "https://www.instructure.com/about/security",
    date: "2026-05-01",
    type: "vendor-disclosure",
    needs_url_verification: true,
  },
  {
    id: "wiki-canvas-2026",
    title: "2026 Canvas security incident",
    publisher: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/2026_Canvas_security_incident",
    date: "2026-05-08",
    type: "research-blog",
    needs_url_verification: true,
    needs_date_verification: true,
  },
  {
    id: "cnn-canvas-2026",
    title:
      "Canvas hack: What we know about apparent cyberattack on the school software platform",
    publisher: "CNN",
    url: "https://www.cnn.com/",
    date: "2026-05-07",
    type: "news",
    needs_url_verification: true,
  },
  {
    id: "techcrunch-canvas-2026",
    title:
      "Hackers deface school login pages after claiming another Instructure hack",
    publisher: "TechCrunch",
    url: "https://techcrunch.com/",
    date: "2026-05-07",
    type: "news",
    needs_url_verification: true,
  },
  {
    id: "ihe-canvas-2026",
    title: "PAY OR LEAK: Hackers Target Big Higher Ed Vendor",
    publisher: "Inside Higher Ed",
    url: "https://www.insidehighered.com/",
    date: "2026-05-05",
    type: "news",
    needs_url_verification: true,
  },
  {
    id: "bitdefender-canvas-2026",
    title: "ShinyHunters Breach of Instructure Canvas LMS",
    publisher: "Bitdefender",
    url: "https://www.bitdefender.com/blog/businessinsights/",
    date: "2026-05-09",
    type: "intel-report",
    needs_url_verification: true,
  },
  {
    id: "databreaches-canvas-2026",
    title:
      "Developing: ShinyHunters Hacks Instructure Again; Canvas Down",
    publisher: "DataBreaches.net",
    url: "https://www.databreaches.net/",
    date: "2026-05-07",
    type: "news",
    needs_url_verification: true,
  },
  {
    id: "harvard-crimson-canvas",
    title: "Canvas Security Incident Coverage",
    publisher: "The Harvard Crimson",
    url: "https://www.thecrimson.com/",
    date: "2026-05-08",
    type: "news",
    needs_url_verification: true,
    needs_date_verification: true,
  },

  // News reporting
  {
    id: "krebs-snowflake",
    title: "Snowflake breach coverage",
    publisher: "Krebs on Security",
    url: "https://krebsonsecurity.com/",
    date: "2024-06-12",
    type: "news",
    needs_url_verification: true,
    needs_date_verification: true,
  },
  {
    id: "krebs-shinyhunters-rebrand",
    title:
      "ShinyHunters Rebrand as Scattered LAPSUS$ Hunters on Telegram",
    publisher: "Krebs on Security",
    url: "https://krebsonsecurity.com/",
    date: "2025-08-15",
    type: "news",
    needs_url_verification: true,
    needs_date_verification: true,
  },
  {
    id: "record-salesforce-1500",
    title:
      "Salesforce customers affected by Drift OAuth incident reach hundreds of organisations",
    publisher: "The Record (Recorded Future News)",
    url: "https://therecord.media/",
    date: "2025-09-09",
    type: "news",
    needs_url_verification: true,
    needs_date_verification: true,
  },
  {
    id: "bleeping-canvas",
    title: "Coverage of the 2026 Instructure / Canvas incident",
    publisher: "BleepingComputer",
    url: "https://www.bleepingcomputer.com/",
    date: "2026-05-07",
    type: "news",
    needs_url_verification: true,
    needs_date_verification: true,
  },
  {
    id: "ars-ticketmaster",
    title: "Ticketmaster Confirms 560 Million Customer Data Breach",
    publisher: "Ars Technica",
    url: "https://arstechnica.com/",
    date: "2024-06-03",
    type: "news",
    needs_url_verification: true,
    needs_date_verification: true,
  },

  // Research
  {
    id: "intel471-ecrime-marketplaces",
    title: "ShinyHunters and the eCrime Data-Brokering Ecosystem",
    publisher: "Intel 471",
    url: "https://intel471.com/blog/",
    date: "2025-03-12",
    type: "research-blog",
    needs_url_verification: true,
    needs_date_verification: true,
  },
  {
    id: "trufflehog-drift",
    title:
      "How a GitHub Secret Led to a Mass SaaS OAuth Heist (Drift)",
    publisher: "Truffle Security",
    url: "https://trufflesecurity.com/blog/",
    date: "2025-09-04",
    type: "research-blog",
    needs_url_verification: true,
    needs_date_verification: true,
  },

  // MITRE ATT&CK (stable URL pattern)
  {
    id: "mitre-attack",
    title: "MITRE ATT&CK Enterprise Matrix",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/matrices/enterprise/",
    date: "2025-10-31",
    type: "framework",
    needs_date_verification: true,
  },
  {
    id: "mitre-t1078",
    title: "T1078 Valid Accounts",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/techniques/T1078/",
    date: "2024-10-15",
    type: "framework",
    needs_date_verification: true,
  },
  {
    id: "mitre-t1190",
    title: "T1190 Exploit Public-Facing Application",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/techniques/T1190/",
    date: "2024-10-15",
    type: "framework",
    needs_date_verification: true,
  },
  {
    id: "mitre-t1528",
    title: "T1528 Steal Application Access Token",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/techniques/T1528/",
    date: "2024-10-15",
    type: "framework",
    needs_date_verification: true,
  },
  {
    id: "mitre-t1550-001",
    title:
      "T1550.001 Use Alternate Authentication Material: Application Access Token",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/techniques/T1550/001/",
    date: "2024-10-15",
    type: "framework",
    needs_date_verification: true,
  },
  {
    id: "mitre-t1530",
    title: "T1530 Data from Cloud Storage",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/techniques/T1530/",
    date: "2024-10-15",
    type: "framework",
    needs_date_verification: true,
  },
  {
    id: "mitre-t1567",
    title: "T1567 Exfiltration Over Web Service",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/techniques/T1567/",
    date: "2024-10-15",
    type: "framework",
    needs_date_verification: true,
  },
  {
    id: "mitre-t1552",
    title: "T1552 Unsecured Credentials",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/techniques/T1552/",
    date: "2024-10-15",
    type: "framework",
    needs_date_verification: true,
  },
  {
    id: "mitre-t1110-004",
    title: "T1110.004 Brute Force: Credential Stuffing",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/techniques/T1110/004/",
    date: "2024-10-15",
    type: "framework",
    needs_date_verification: true,
  },
  {
    id: "mitre-t1566-004",
    title: "T1566.004 Phishing: Spearphishing Voice",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/techniques/T1566/004/",
    date: "2024-10-15",
    type: "framework",
    needs_date_verification: true,
  },
  {
    id: "mitre-t1199",
    title: "T1199 Trusted Relationship",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/techniques/T1199/",
    date: "2024-10-15",
    type: "framework",
    needs_date_verification: true,
  },
  {
    id: "mitre-t1593",
    title: "T1593 Search Open Websites/Domains",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/techniques/T1593/",
    date: "2024-10-15",
    type: "framework",
    needs_date_verification: true,
  },
  {
    id: "mitre-t1657",
    title: "T1657 Financial Theft",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/techniques/T1657/",
    date: "2024-10-15",
    type: "framework",
    needs_date_verification: true,
  },
  {
    id: "mitre-t1589",
    title: "T1589 Gather Victim Identity Information",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/techniques/T1589/",
    date: "2024-10-15",
    type: "framework",
    needs_date_verification: true,
  },
  {
    id: "mitre-t1491-001",
    title: "T1491.001 Defacement: Internal Defacement",
    publisher: "MITRE Corporation",
    url: "https://attack.mitre.org/techniques/T1491/001/",
    date: "2024-10-15",
    type: "framework",
    needs_date_verification: true,
  },
];

export const sourceById = (id: string): Source | undefined =>
  sources.find((s) => s.id === id);
