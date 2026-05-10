/**
 * Detection-rule library. Three rules are fully built across all three
 * query formats (Sigma YAML, Falcon LogScale CQL, Splunk SPL); the
 * remainder are stubbed with metadata sufficient to populate the rule
 * library, ATT&CK heatmap, and coverage strip on the dashboard.
 *
 * Provenance:
 *   authored_by: "original"        - written by GLINT detection engineering
 *                                    against documented ShinyHunters TTPs
 *   authored_by: "adapted_from"    - adapted from a public detection repo,
 *                                    cite via source_reference
 */

export type Severity = "low" | "medium" | "high" | "critical";
export type RuleStatus = "production" | "draft" | "stub";
export type AuthoredBy = "original" | "adapted_from";

export interface DetectionRule {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: RuleStatus;
  mitre_techniques: string[];
  log_source: string;
  data_source: string;
  false_positive_notes: string;
  references: string[]; // source ids
  campaign_ids: string[]; // campaigns this detection covers
  authored: string; // YYYY-MM-DD
  authored_by: AuthoredBy;
  source_reference?: string; // URL when authored_by === "adapted_from"
  sigma_yaml?: string;
  falcon_logscale_cql?: string;
  splunk_spl?: string;
}

const salesforceBulkExportSigma = `title: Salesforce Bulk API 2.0 Mass Data Export by Connected App
id: 5b3f4ec0-7c1e-4b2c-bf6f-91d80d2b4bfa
status: experimental
description: |
  Detects unusual volume of records exported from Salesforce via Bulk API 2.0
  by a Connected App or interactive user. Designed to catch the post-OAuth
  exfiltration phase observed in the August 2025 Salesloft Drift incident.
references:
  - https://attack.mitre.org/techniques/T1530/
  - https://help.salesforce.com/s/articleView?id=000005678
author: GLINT Detection Engineering
date: 2025-09-05
modified: 2026-01-12
logsource:
  product: salesforce
  service: event-monitoring
detection:
  bulk_query:
    EVENT_TYPE: 'BulkApi2'
    OPERATION_TYPE: 'query'
  high_volume:
    ROWS_PROCESSED|gte: 50000
  exfil_target_objects:
    OBJECT|contains:
      - 'Account'
      - 'Contact'
      - 'Lead'
      - 'Opportunity'
      - 'Case'
  condition: bulk_query and high_volume and exfil_target_objects
fields:
  - USER_ID
  - CLIENT_ID
  - CONNECTED_APP_NAME
  - SOURCE_IP
  - ROWS_PROCESSED
  - OBJECT
falsepositives:
  - Sanctioned ETL or backup connected apps (allowlist by CLIENT_ID)
  - Quarterly board-reporting exports run from a known scheduler IP
  - Salesforce-internal data export tools (Data Loader CLI by service accounts)
level: high
tags:
  - attack.exfiltration
  - attack.t1530
  - attack.t1567
`;

const salesforceBulkExportCql = `// GLINT · det-salesforce-bulk-export
// Salesforce Bulk API 2.0 mass-export from a connected app
// Maps: T1530, T1567 · Severity: high
// Aligns with: Salesloft Drift (Aug 2025)

#repo = salesforce eventType = "BulkApi2" operationType = "query"
| objectMatch := match(field=Object, regex="^(Account|Contact|Lead|Opportunity|Case)$")
| timeBucket := bucket(field=@timestamp, span=15m)
| groupBy([userId, clientId, connectedAppName, sourceIp, timeBucket],
    function=[sum(rowsProcessed, as=rows), count(as=jobs)])
| rows >= 50000
| !match(file="known_bulk_etl_apps.csv", column=clientId)
| sort(field=rows, order=desc)
| select([timeBucket, userId, clientId, connectedAppName, sourceIp, rows, jobs])
`;

const salesforceBulkExportSpl = `index=salesforce sourcetype="sfdc:event_monitoring" EVENT_TYPE="BulkApi2" OPERATION_TYPE="query"
| eval _bucket=relative_time(_time, "@-15m")
| where match(OBJECT, "^(Account|Contact|Lead|Opportunity|Case)$")
| stats sum(ROWS_PROCESSED) AS rows count AS jobs values(SOURCE_IP) AS source_ips by USER_ID CLIENT_ID CONNECTED_APP_NAME _bucket
| where rows >= 50000
| lookup known_bulk_etl_apps.csv CLIENT_ID OUTPUT app_label
| where isnull(app_label)
| sort - rows
| table _bucket USER_ID CLIENT_ID CONNECTED_APP_NAME source_ips rows jobs
`;

const snowflakeNewAsnCopySigma = `title: Snowflake Login from New ASN Followed by COPY INTO External Stage
id: c7c89e42-22f1-4e12-9e9e-1e8d1a82a9e3
status: experimental
description: |
  Detects a successful Snowflake authentication from an ASN/country never
  previously seen for the user, followed within 30 minutes by a COPY INTO
  command targeting a non-corporate external stage. Reproduces the canonical
  UNC5537 access-to-exfil pivot observed in Snowflake C5537 (2024).
references:
  - https://attack.mitre.org/techniques/T1078/
  - https://attack.mitre.org/techniques/T1530/
  - https://www.snowflake.com/blog/detecting-and-preventing-unauthorized-user-access/
author: GLINT Detection Engineering
date: 2025-04-18
modified: 2026-01-29
logsource:
  product: snowflake
  service: account-usage
detection:
  successful_login:
    EVENT_TYPE: 'LOGIN'
    IS_SUCCESS: 'YES'
  new_asn:
    user_asn_first_seen|lt: 24h
  external_unload:
    QUERY_TYPE: 'UNLOAD'
    EXTERNAL_STAGE_TYPE|in:
      - 'S3'
      - 'GCS'
      - 'AZURE'
  condition: successful_login and new_asn and external_unload within 30m by USER_NAME
fields:
  - USER_NAME
  - CLIENT_IP
  - REPORTED_CLIENT_TYPE
  - QUERY_TEXT
  - STAGE_LOCATION
falsepositives:
  - Travelling employees authenticating from a new mobile carrier ASN
  - Cross-region warehouse migrations during planned maintenance windows
  - Sanctioned third-party stages (allowlist via stage URL prefix)
level: high
tags:
  - attack.initial-access
  - attack.collection
  - attack.exfiltration
  - attack.t1078
  - attack.t1530
  - attack.t1567
`;

const snowflakeNewAsnCopyCql = `// GLINT · det-snowflake-new-asn-copy
// Snowflake new-ASN login → COPY INTO external stage within 30m
// Maps: T1078, T1530, T1567 · Severity: critical
// Aligns with: Snowflake C5537 (2024)

#repo = snowflake (eventType = "LOGIN" OR queryType = "UNLOAD")
| eventType = "LOGIN" | isSuccess = true
    | userAsn := asn(clientIp)
    | join(
        query={#repo=snowflake_asn_baseline userName=*},
        field=[userName, userAsn],
        mode="leftAnti"
    )
| OR
| queryType = "UNLOAD"
    | externalStageType in ["S3", "GCS", "AZURE"]
    | stageLocation != /^@corp_egress\\//
| transaction(field=userName, maxspan=30m, startwith="eventType=LOGIN", endwith="queryType=UNLOAD")
| where(count_LOGIN >= 1 and count_UNLOAD >= 1)
| select([userName, clientIp, userAsn, queryText, stageLocation])
`;

const snowflakeNewAsnCopySpl = `(index=snowflake sourcetype="snowflake:login" IS_SUCCESS="YES")
OR (index=snowflake sourcetype="snowflake:query" QUERY_TYPE="UNLOAD" EXTERNAL_STAGE_TYPE IN ("S3","GCS","AZURE"))
| iplocation CLIENT_IP
| eval asn=coalesce(CLIENT_ASN, "unknown")
| transaction USER_NAME maxspan=30m startswith=eval(EVENT_TYPE="LOGIN") endswith=eval(QUERY_TYPE="UNLOAD")
| lookup snowflake_user_asn_baseline.csv USER_NAME asn OUTPUT seen_before
| where isnull(seen_before)
| where NOT match(STAGE_LOCATION, "^@corp_egress/")
| eval rule="det-snowflake-new-asn-copy"
| table _time USER_NAME CLIENT_IP asn QUERY_TEXT STAGE_LOCATION
`;

const oauthConsentSigma = `title: OAuth App Consent Grant from Non-Corporate Identity Provider
id: 9d5b8b1a-3a4f-4c0e-9d4f-7b2b1a91e6f0
status: experimental
description: |
  Detects an OAuth application consent grant where the granting user
  authenticated through an identity provider that is not the
  organization's sanctioned IdP, or where the consent originated from a
  source IP not present on the corporate egress allowlist. Designed to
  catch malicious Connected App installs of the kind UNC6040 induced via
  voice phishing.
references:
  - https://attack.mitre.org/techniques/T1528/
  - https://attack.mitre.org/techniques/T1550/001/
  - https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-audit-logs
author: GLINT Detection Engineering
date: 2025-07-22
modified: 2026-02-04
logsource:
  product: m365
  service: audit
detection:
  consent_event:
    Operation:
      - 'Consent to application.'
      - 'Add OAuth2PermissionGrant.'
      - 'Add app role assignment grant to user.'
  non_corp_idp:
    AuthenticationProvider|not_in:
      - 'corp.example.com'
      - 'okta-corp.example.com'
  condition: consent_event and non_corp_idp
fields:
  - UserId
  - ApplicationId
  - ApplicationDisplayName
  - ConsentContext
  - SourceIPAddress
  - AuthenticationProvider
falsepositives:
  - Personal-account testing by IT staff in a sandbox tenant (allowlist
    sandbox tenant id)
  - Vendor demos run from BYOD on guest network (gate by approved
    application id list)
level: critical
tags:
  - attack.credential-access
  - attack.defense-evasion
  - attack.t1528
  - attack.t1550.001
`;

const oauthConsentCql = `// GLINT · det-oauth-consent-non-corporate
// OAuth consent grant from non-corporate IDP / source
// Maps: T1528, T1550.001 · Severity: critical
// Aligns with: Salesloft Drift (Aug 2025)

#repo = m365_audit
operation in ["Consent to application.", "Add OAuth2PermissionGrant.", "Add app role assignment grant to user."]
| !match(field=authenticationProvider, regex="^(corp|okta-corp)\\\\.example\\\\.com$")
| !match(file="approved_oauth_apps.csv", column=applicationId)
| sourceIpCountry := geoip(field=sourceIp, return="country")
| select([
    @timestamp, userId, applicationId, applicationDisplayName,
    consentContext, sourceIp, sourceIpCountry, authenticationProvider
  ])
| sort(field=@timestamp, order=desc)
`;

const oauthConsentSpl = `index=m365 sourcetype="o365:management:activity"
    Operation IN ("Consent to application.", "Add OAuth2PermissionGrant.", "Add app role assignment grant to user.")
| where NOT match(AuthenticationProvider, "^(corp|okta-corp)\\.example\\.com$")
| lookup approved_oauth_apps.csv ApplicationId OUTPUT app_label
| where isnull(app_label)
| iplocation SourceIPAddress
| eval rule="det-oauth-consent-non-corporate"
| table _time UserId ApplicationId ApplicationDisplayName ConsentContext SourceIPAddress Country AuthenticationProvider
`;

export const detections: DetectionRule[] = [
  {
    id: "det-salesforce-bulk-export",
    title: "Salesforce Bulk API 2.0 Mass Export by Connected App",
    description:
      "Detects unusual record-volume exports from Salesforce via Bulk API 2.0 by a Connected App or interactive user, scoped to high-value object types (Account, Contact, Lead, Opportunity, Case). Designed for the post-OAuth exfiltration phase observed in the Salesloft Drift incident.",
    severity: "high",
    status: "production",
    mitre_techniques: ["T1530", "T1567"],
    log_source: "Salesforce Event Monitoring",
    data_source: "EventLogFile · BulkApi2",
    false_positive_notes:
      "Sanctioned ETL connected apps such as Mulesoft, Workato, and Informatica routinely run high volume exports. Maintain an allowlist of CLIENT_IDs. Quarterly board reporting exports may also exceed the threshold.",
    references: ["mand-unc6395", "salesforce-advisory-drift", "mitre-t1530", "mitre-t1567"],
    campaign_ids: ["salesloft-drift"],
    authored: "2025-09-05",
    authored_by: "original",
    sigma_yaml: salesforceBulkExportSigma,
    falcon_logscale_cql: salesforceBulkExportCql,
    splunk_spl: salesforceBulkExportSpl,
  },
  {
    id: "det-snowflake-new-asn-copy",
    title: "Snowflake New-ASN Login Followed by External-Stage Unload",
    description:
      "Detects a successful Snowflake authentication from a previously unseen ASN for the user, followed within 30 minutes by a COPY INTO command targeting a non-corporate external stage (S3, GCS, Azure Blob). Reproduces the UNC5537 access-to-exfil pivot.",
    severity: "critical",
    status: "production",
    mitre_techniques: ["T1078", "T1530", "T1567"],
    log_source: "Snowflake ACCOUNT_USAGE",
    data_source: "LOGIN_HISTORY + QUERY_HISTORY",
    false_positive_notes:
      "Travelling employees on new mobile carrier ASNs trigger the first half. Cross-region warehouse migrations may produce internal UNLOAD operations. Gate on stage URL prefix to suppress sanctioned @corp_egress stages.",
    references: ["mand-unc5537", "snowflake-advisory-2024", "mitre-t1078", "mitre-t1530"],
    campaign_ids: ["snowflake-c5537"],
    authored: "2025-04-18",
    authored_by: "original",
    sigma_yaml: snowflakeNewAsnCopySigma,
    falcon_logscale_cql: snowflakeNewAsnCopyCql,
    splunk_spl: snowflakeNewAsnCopySpl,
  },
  {
    id: "det-oauth-consent-non-corporate",
    title: "OAuth App Consent Grant from Non-Corporate Identity Provider",
    description:
      "Detects an OAuth application consent grant where the granting user authenticated through an identity provider that is not the organization's sanctioned IdP, or where the consent originated from a source IP not on the corporate egress allowlist.",
    severity: "critical",
    status: "production",
    mitre_techniques: ["T1528", "T1550.001"],
    log_source: "Microsoft 365 Unified Audit / Entra ID",
    data_source: "AuditLogs · Application/OAuth grants",
    false_positive_notes:
      "Sandbox-tenant testing by IT staff. Vendor product demos from BYOD over guest networks. Both can be suppressed via tenant-id and approved-app allowlists.",
    references: ["mand-unc6040", "mand-unc6395", "mitre-t1528", "mitre-t1550-001"],
    campaign_ids: ["salesloft-drift"],
    authored: "2025-07-22",
    authored_by: "original",
    sigma_yaml: oauthConsentSigma,
    falcon_logscale_cql: oauthConsentCql,
    splunk_spl: oauthConsentSpl,
  },
  {
    id: "det-public-repo-secret",
    title: "OAuth Token / API Key Detected in Public-Repo Commit",
    description:
      "Continuous secret-scanning of organization-owned public repositories for OAuth client secrets, refresh tokens, AWS keys, and Salesforce Connected App consumer keys. Triggers on any high-confidence detection in commit history.",
    severity: "high",
    status: "production",
    mitre_techniques: ["T1552"],
    log_source: "GitHub Audit + secret-scanning provider",
    data_source: "git-commit metadata",
    false_positive_notes:
      "Test fixtures with deliberately fake credentials may trip pattern only detections. Prefer providers with verifier callbacks.",
    references: ["trufflehog-drift", "mand-unc6395", "mitre-t1552"],
    campaign_ids: ["salesloft-drift"],
    authored: "2025-09-08",
    authored_by: "original",
  },
  {
    id: "det-vishing-helpdesk-reset",
    title: "Helpdesk Password / MFA Reset Without Ticket",
    description:
      "Detects identity-platform admin actions (password reset, MFA reset, FIDO key enrol) issued by helpdesk operators with no corresponding ticket reference in ServiceNow within the prior 60 minutes. Targets the UNC6040 vishing pattern.",
    severity: "high",
    status: "draft",
    mitre_techniques: ["T1566.004", "T1078"],
    log_source: "Okta System Log / Entra ID",
    data_source: "user.account.reset_password / authenticator.reset",
    false_positive_notes:
      "Walk up requests in physical helpdesk queues may legitimately precede the ticket. Keep the window short and require ticket creation post-event.",
    references: ["mand-unc6040", "mitre-t1566-004", "mitre-t1078"],
    campaign_ids: ["salesloft-drift"],
    authored: "2025-10-04",
    authored_by: "original",
  },
  {
    id: "det-snowflake-network-policy-change",
    title: "Snowflake NETWORK_POLICY Modified by Non-Admin Source",
    description:
      "Detects creation or modification of Snowflake NETWORK_POLICY objects from sessions outside the corporate administrative IP range. Adversaries during C5537 added their own IPs to whitelist policies to maintain access.",
    severity: "high",
    status: "draft",
    mitre_techniques: ["T1078", "T1556"],
    log_source: "Snowflake ACCOUNT_USAGE",
    data_source: "QUERY_HISTORY filtered to NETWORK_POLICY DDL",
    false_positive_notes: "Planned policy refreshes during change windows.",
    references: ["mand-unc5537", "snowflake-advisory-2024"],
    campaign_ids: ["snowflake-c5537"],
    authored: "2025-04-22",
    authored_by: "original",
  },
  {
    id: "det-salesforce-connected-app-install",
    title: "Connected App Installation Outside Change Window",
    description:
      "Detects Salesforce Connected App installations and OAuth scope grants performed outside the change-management window or by a user without the Connected-App-Admin role.",
    severity: "high",
    status: "draft",
    mitre_techniques: ["T1528"],
    log_source: "Salesforce Setup Audit Trail",
    data_source: "SetupAuditTrail · ConnectedAppInstall",
    false_positive_notes:
      "Marketing tool trials outside the change window. Suppress via an approved app allowlist.",
    references: ["mand-unc6040", "mand-unc6395"],
    campaign_ids: ["salesloft-drift"],
    authored: "2025-09-15",
    authored_by: "original",
  },
  {
    id: "det-stealer-creds-corporate-domain",
    title: "Corporate Email Observed in Infostealer Log Marketplace",
    description:
      "External enrichment job that watches commercial stealer-log feeds for credentials matching the organization's email domain or SaaS hostnames, including Snowflake account locators.",
    severity: "high",
    status: "draft",
    mitre_techniques: ["T1589.001", "T1110.004"],
    log_source: "External enrichment (stealer-log feed)",
    data_source: "Vendor JSON · stealer batch ingest",
    false_positive_notes:
      "Personal accounts of employees showing up under non-corporate domains are out of scope; filter on domain.",
    references: ["mand-unc5537", "intel471-ecrime-marketplaces"],
    campaign_ids: ["snowflake-c5537"],
    authored: "2025-05-12",
    authored_by: "original",
  },
  {
    id: "det-bulk-api-job-non-mfa-session",
    title: "Bulk API Job Initiated by Non-MFA Session",
    description:
      "Detects Salesforce Bulk API 2.0 job submissions from a user session that did not satisfy MFA in the prior 12 hours. Catches Connected App access-token replay where session attributes lack MFA assertion.",
    severity: "medium",
    status: "draft",
    mitre_techniques: ["T1550.001", "T1530"],
    log_source: "Salesforce Event Monitoring + Login History",
    data_source: "BulkApi2 + Login",
    false_positive_notes:
      "Server to server integrations using the OAuth 2.0 client_credentials flow legitimately bypass MFA. Allowlist these.",
    references: ["mand-unc6395"],
    campaign_ids: ["salesloft-drift"],
    authored: "2025-10-01",
    authored_by: "original",
  },
  {
    id: "det-canvas-impersonation-burst",
    title: "Canvas Admin Impersonation Burst Across Subaccounts",
    description:
      "Detects rapid use of Canvas's act_as_user_id impersonation parameter across multiple subaccounts within a short window. The pattern diverges from typical helpdesk ticket cadence.",
    severity: "high",
    status: "draft",
    mitre_techniques: ["T1078", "T1530"],
    log_source: "Canvas Live Events / Audit",
    data_source: "Canvas API audit · impersonation",
    false_positive_notes:
      "Legitimate consortium-wide help operations may produce bursts; gate by user role and subaccount-count threshold.",
    references: ["instructure-canvas-statement"],
    campaign_ids: ["canvas-extortion"],
    authored: "2026-04-25",
    authored_by: "original",
  },
  {
    id: "det-oauth-refresh-burst-new-asn",
    title: "OAuth Refresh-Token Exchange Burst from New ASN",
    description:
      "Detects an unusually high rate of refresh-token-to-access-token exchanges for a single Connected App originating from an ASN previously unseen for that app. Targets stolen-token replay at scale.",
    severity: "critical",
    status: "draft",
    mitre_techniques: ["T1528", "T1550.001"],
    log_source: "Salesforce Login History + Connected App OAuth Usage",
    data_source: "OAuthRefreshTokenEvent",
    false_positive_notes:
      "Cloud provider IP rotation can present as a new ASN. Anchor the baseline on the Connected App, not the user.",
    references: ["mand-unc6395", "salesforce-advisory-drift"],
    campaign_ids: ["salesloft-drift"],
    authored: "2025-09-19",
    authored_by: "original",
  },
  {
    id: "det-egress-mega-fileio",
    title: "Outbound Transfer to Public Anonymous File-Sharing",
    description:
      "Detects egress from corporate network and SaaS perimeter (Salesforce, Snowflake, Canvas) to public anonymous file-sharing services (mega.nz, file.io, anonfiles, transfer.sh, dropmefiles).",
    severity: "medium",
    status: "draft",
    mitre_techniques: ["T1567"],
    log_source: "Network egress / proxy logs",
    data_source: "HTTP/S egress + DNS",
    false_positive_notes:
      "Some legitimate vendor data exchanges still use mega.nz. Categorise destination domains and suppress vendor approved IDs.",
    references: ["mitre-t1567"],
    campaign_ids: ["snowflake-c5537", "salesloft-drift", "canvas-extortion"],
    authored: "2025-06-08",
    authored_by: "original",
  },
  {
    id: "det-stale-token-after-revocation",
    title: "Connected-App Activity Following Mass Token Revocation",
    description:
      "After a vendor-driven mass OAuth-token revocation event (e.g. the August 2025 Drift action), detects any continued Connected-App API activity using tokens believed to be revoked. Indicates either incomplete revocation or replay of a non-revoked token.",
    severity: "high",
    status: "draft",
    mitre_techniques: ["T1550.001"],
    log_source: "Salesforce Event Monitoring",
    data_source: "API event · CLIENT_ID after revocation timestamp",
    false_positive_notes:
      "Re-installation by a sanctioned admin after revocation will produce activity. Gate on revocation event correlation.",
    references: ["salesforce-advisory-drift"],
    campaign_ids: ["salesloft-drift"],
    authored: "2025-08-21",
    authored_by: "original",
  },
];

export const detectionById = (id: string): DetectionRule | undefined =>
  detections.find((d) => d.id === id);

export const detectionsByTechnique = (techniqueId: string): DetectionRule[] =>
  detections.filter((d) => d.mitre_techniques.includes(techniqueId));

export const coverageByTechnique = (): Record<string, "full" | "partial" | "none"> => {
  const map: Record<string, "full" | "partial" | "none"> = {};
  for (const d of detections) {
    for (const t of d.mitre_techniques) {
      const current = map[t];
      const next: "full" | "partial" | "none" =
        d.status === "production" ? "full" : d.status === "draft" ? "partial" : "none";
      if (!current || (current === "partial" && next === "full") || (current === "none" && next !== "none")) {
        map[t] = next;
      }
    }
  }
  return map;
};

export const detectionStats = () => {
  const total = detections.length;
  const production = detections.filter((d) => d.status === "production").length;
  const draft = detections.filter((d) => d.status === "draft").length;
  const stub = detections.filter((d) => d.status === "stub").length;
  return { total, production, draft, stub };
};
