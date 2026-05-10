/**
 * Hunt hypotheses for /hunting. Each hypothesis is paired with a query
 * pseudocode block (intentionally implementation-agnostic), expected
 * output shape, triage steps, and MITRE coverage.
 *
 * Provenance:
 *   authored_by: "original" - written by GLINT detection engineering
 *                             against documented ShinyHunters TTPs
 *   rationale_sources: array of source ids that motivate the hypothesis
 */

export type HuntAuthored = "original";

export interface Hunt {
  id: string;
  hypothesis: string;
  rationale: string;
  query_pseudocode: string;
  expected_output: string;
  triage_steps: string[];
  mitre_techniques: string[];
  related_campaign_ids: string[];
  data_sources: string[];
  recommended_cadence: string;
  authored_by: HuntAuthored;
  rationale_sources: string[]; // source ids
}

export const hunts: Hunt[] = [
  {
    id: "hunt-drift-token-replay",
    hypothesis:
      "Drift Connected App OAuth tokens are still being replayed against our Salesforce org from non-Drift ASNs after the August 2025 mass revocation.",
    rationale:
      "The Aug 2025 Drift incident exposed valid refresh tokens for ~760 Salesforce orgs. Salesforce ran a mass revocation, but post-incident reporting indicates a small number of tokens remained valid in pockets of the customer base. Any Drift Connected App API call from an ASN that does not match Drift production ranges is high-suspicion.",
    query_pseudocode: `// Salesforce Event Monitoring (last 30 days)
events = read("salesforce/event_monitoring")
  .where(EVENT_TYPE in {"API", "RestApi", "BulkApi2"})
  .where(CLIENT_ID == "<drift_connected_app_client_id>")

drift_asns = {"AS14618" /* Drift AWS prod */, "AS16509" /* Drift AWS prod */}

events
  .enrich(asn = ip_to_asn(SOURCE_IP))
  .where(asn not in drift_asns)
  .stats(count(), values(USER_ID), max(_time)) by SOURCE_IP, asn`,
    expected_output:
      "Sparse rows, ideally zero. Any non-zero result is a candidate incident. Drift's legitimate traffic comes from a small, stable set of AWS ASNs.",
    triage_steps: [
      "Confirm the Drift Connected App is still installed (Setup → Connected Apps OAuth Usage). If the answer is 'no', go straight to incident.",
      "Pull the OAuth refresh token issuance event for the access token in question. The issuance ASN is decisive.",
      "Cross-reference SOURCE_IP with infrastructure used by UNC6395 / Scattered LAPSUS$ Hunters in published Mandiant indicators.",
      "If suspicious: revoke all Drift Connected App tokens organization-wide; rotate any credentials present in Salesforce Case bodies for the relevant time window.",
    ],
    mitre_techniques: ["T1528", "T1550.001"],
    related_campaign_ids: ["salesloft-drift"],
    data_sources: ["Salesforce Event Monitoring", "OAuth audit"],
    recommended_cadence: "Weekly",
    authored_by: "original",
    rationale_sources: ["mand-unc6395", "salesforce-advisory-drift", "trufflehog-drift"],
  },
  {
    id: "hunt-snowflake-stealer-creds",
    hypothesis:
      "Credentials for our Snowflake account locator are present in commercial infostealer marketplaces sold within the last 90 days.",
    rationale:
      "UNC5537's entire operating model was bulk replay of stealer-log credentials against Snowflake tenants without MFA. Even with MFA enforced, presence in a stealer log is a strong signal of an off-host endpoint compromise that warrants investigation.",
    query_pseudocode: `// External enrichment ingest
stealer_batches = read("intel/stealer_logs")
  .where(_time >= now - 90d)

snowflake_locator = "<your_account_locator>"

stealer_batches
  .filter(host_matches([
    snowflake_locator + ".snowflakecomputing.com",
    snowflake_locator + ".aws.snowflakecomputing.com",
    snowflake_locator + ".gcp.snowflakecomputing.com"
  ]))
  .stats(values(username), values(stealer_family), max(_time)) by source_marketplace`,
    expected_output:
      "Per-marketplace tally of usernames and stealer families. Any hits trigger employee-endpoint investigation regardless of MFA posture.",
    triage_steps: [
      "Map each leaked username to a current Snowflake user record; confirm whether MFA is enforced.",
      "Trace the username to the human owner via HRIS; trigger endpoint forensics on their corporate device.",
      "If endpoint shows infostealer execution: rebuild device, rotate all credentials present in the user's password manager, force Snowflake password reset and recreate API keys.",
      "Add stealer family hash to EDR custom indicators if not already present.",
    ],
    mitre_techniques: ["T1589.001", "T1110.004"],
    related_campaign_ids: ["snowflake-c5537"],
    data_sources: ["External stealer-log feed", "EDR", "HRIS"],
    recommended_cadence: "Daily",
    authored_by: "original",
    rationale_sources: ["mand-unc5537", "snowflake-advisory-2024", "intel471-ecrime-marketplaces"],
  },
  {
    id: "hunt-vishing-helpdesk",
    hypothesis:
      "A helpdesk operator has performed a sensitive identity action (password reset, MFA reset, FIDO unenrol, role assignment) within 60 minutes of a brief inbound call from an unknown number.",
    rationale:
      "UNC6040 vishing tradecraft drives helpdesk staff to perform out-of-process resets under the social pretext of an urgent caller. Pairing telephony metadata with identity-platform admin actions reveals the pattern.",
    query_pseudocode: `// Identity actions
ident = read("okta/system_log")
  .where(eventType in {
    "user.account.reset_password",
    "user.mfa.factor.deactivate",
    "user.mfa.factor.activate",
    "user.account.unlock"
  })
  .where(actor.role == "helpdesk")

// Phone metadata
calls = read("telephony/cdr")
  .where(direction == "inbound")
  .where(callee.role == "helpdesk")
  .where(caller.number_familiarity == "first_seen_<= 7d")

ident.join(calls, on=helpdesk_user, within=60m)
  .where(call.duration < 5m)`,
    expected_output:
      "Joined rows where short calls from unfamiliar numbers precede sensitive identity actions. Each row is a candidate vishing event.",
    triage_steps: [
      "Listen to the call recording if retained; check for IT-impersonation language.",
      "Confirm with the affected user (out of band, not by replying to anything in their email) whether they actually requested the reset.",
      "If reset was unauthorised: invalidate all sessions for the affected account, rotate FIDO factors, audit any access performed since the reset.",
      "Consider mandatory ticket-precondition for all helpdesk identity actions if this hunt is producing recurring hits.",
    ],
    mitre_techniques: ["T1566.004", "T1078"],
    related_campaign_ids: ["salesloft-drift"],
    data_sources: ["Okta / Entra system log", "Helpdesk telephony CDR", "ServiceNow"],
    recommended_cadence: "Daily",
    authored_by: "original",
    rationale_sources: ["mand-unc6040", "mitre-t1566-004"],
  },
  {
    id: "hunt-bulk-export-spike",
    hypothesis:
      "A Salesforce Connected App is exporting more records than it has at any point in the last 90 days.",
    rationale:
      "The Drift attackers used the Connected App's existing legitimate API privileges; the only anomaly was volume. A per-Connected-App baseline of records-extracted-per-day catches this without needing rule logic specific to the Drift app.",
    query_pseudocode: `// 90-day baseline
baseline = read("salesforce/event_monitoring")
  .where(_time between now-90d and now-1d)
  .where(EVENT_TYPE in {"API","RestApi","BulkApi2"})
  .stats(percentile_95(daily_rows)) by CLIENT_ID

today = read("salesforce/event_monitoring")
  .where(_time >= now-1d)
  .where(EVENT_TYPE in {"API","RestApi","BulkApi2"})
  .stats(sum(rows) as today_rows) by CLIENT_ID

baseline.join(today, on=CLIENT_ID)
  .where(today_rows > 5 * percentile_95)
  .where(today_rows > 50000)`,
    expected_output:
      "Connected Apps whose daily export volume exceeds 5× their 95th-percentile baseline and is over 50,000 rows.",
    triage_steps: [
      "Identify the Connected App and its business owner.",
      "Check whether a known event (campaign launch, M&A close, year-end reporting) explains the spike.",
      "If unexplained: pull a sample of the exported objects and rows, look for sensitive content (Case bodies often contain credentials).",
      "Decide on token revocation vs. rate-limit vs. monitoring uplift in coordination with the business owner.",
    ],
    mitre_techniques: ["T1530"],
    related_campaign_ids: ["salesloft-drift"],
    data_sources: ["Salesforce Event Monitoring"],
    recommended_cadence: "Daily",
    authored_by: "original",
    rationale_sources: ["mand-unc6395", "record-salesforce-1500"],
  },
  {
    id: "hunt-public-repo-secrets",
    hypothesis:
      "An organisation-owned public repository has leaked an OAuth client secret, refresh token, or other long-lived credential in commit history within the last 30 days.",
    rationale:
      "The Drift incident was made possible by a refresh token leak in a public Salesloft GitHub repo. Scan your own public surface continuously, including all branches, tags, and commit history. That turns a future Drift-equivalent into a non-incident.",
    query_pseudocode: `// Run TruffleHog (or equivalent) with a verifier
secrets = scan("github://<org>/*")
  .with_verifiers([Salesforce, GitHub, AWS, Snowflake, Slack])
  .where(verified == true)
  .where(commit.timestamp >= now - 30d)

secrets.stats(count(), max(commit.timestamp)) by repo, secret_type`,
    expected_output:
      "Per-repo, per-secret-type counts of verified live credentials present in commit history within the last 30 days. Should be zero in a healthy posture.",
    triage_steps: [
      "Rotate the credential at the issuing system before anything else. Git history rewrites do not retroactively secure a leaked token.",
      "Identify any external scanners that may already have the secret; treat the secret as compromised.",
      "Rewrite history (git filter-repo) only after rotation, to limit propagation to forks.",
      "Add a pre-receive hook or branch-protection secret-scanner gate to prevent recurrence.",
    ],
    mitre_techniques: ["T1552", "T1593"],
    related_campaign_ids: ["salesloft-drift"],
    data_sources: ["GitHub", "TruffleHog / Gitleaks / vendor scanner"],
    recommended_cadence: "Continuous (push-time + nightly full scan)",
    authored_by: "original",
    rationale_sources: ["trufflehog-drift", "mand-unc6395"],
  },
  {
    id: "hunt-canvas-impersonation",
    hypothesis:
      "A Canvas administrator has used the `act_as_user_id` impersonation feature across more than five subaccounts within a 24-hour window.",
    rationale:
      "Canvas's impersonation feature is necessary for legitimate helpdesk workflows but it is also the most efficient lateral-movement primitive inside Canvas. Active-extortion campaigns against Canvas tenants require this capability to sweep across institutional subaccounts.",
    query_pseudocode: `// Canvas Live Events
events = read("canvas/live_events")
  .where(event == "logged_in_as" or query.act_as_user_id != null)
  .where(_time >= now - 24h)

events
  .stats(count() as impersonations, dcount(subaccount_id) as accounts) by actor_id
  .where(accounts > 5)`,
    expected_output:
      "Admin user IDs that have impersonated users in more than five subaccounts in 24 hours. Most healthy environments will return zero rows on most days.",
    triage_steps: [
      "Confirm the actor's role and active ticket queue.",
      "Examine the targets: are they spread across institutions in a way that lacks a coherent helpdesk reason?",
      "Pull the API operations performed during each impersonated session.",
      "If the pattern is unjustified: revoke the admin's session, rotate credentials, audit the data accessed.",
    ],
    mitre_techniques: ["T1078", "T1530"],
    related_campaign_ids: ["canvas-extortion"],
    data_sources: ["Canvas Live Events"],
    recommended_cadence: "Daily during active campaign window",
    authored_by: "original",
    rationale_sources: [
      "instructure-canvas-statement-2026",
      "bitdefender-canvas-2026",
      "cnn-canvas-2026",
    ],
  },
];

export const huntById = (id: string): Hunt | undefined =>
  hunts.find((h) => h.id === id);
