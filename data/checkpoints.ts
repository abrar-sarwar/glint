import type { Checkpoint } from "./types";

/**
 * Known future checkpoints for the CyberLeek / GTA VI case.
 * Dates are ISO. Where a source gives a wall-clock time it is written as UTC.
 */
export const checkpoints: Checkpoint[] = [
  {
    id: "LEEK-CHK-001",
    date: "2026-08-27T19:00:00Z",
    datePrecision: "exact",
    label: "Grand Theft Auto VI: An Extended Look premieres on Netflix",
    kind: "marketing",
    description:
      "Rockstar's official gameplay presentation premieres on Netflix at 3:00 p.m. ET (19:00 UTC) on 2026-08-27 and stays exclusive to Netflix for six hours before it is posted to YouTube and Rockstar's own channels. Reporting from Bloomberg (relayed by GTABoom and IGN) said Rockstar did not move the date in response to the leaks. This is the first official gameplay reference point against which the leaked build can be compared.",
    confidence: "high",
    sourceIds: ["LEEK-SRC-106", "LEEK-SRC-045", "LEEK-SRC-062", "LEEK-SRC-058", "LEEK-SRC-032"],
  },
  {
    id: "LEEK-CHK-002",
    date: "2026-09-04",
    datePrecision: "day",
    label: "Reported compliance date for the Microsoft and Discord DMCA subpoenas",
    kind: "legal",
    description:
      "Kotaku, which read the subpoena exhibits, reported that the subpoenas give Microsoft (for GitHub, OneDrive and account records) and Discord until September 4, 2026 to produce records. Multiple outlets repeated the date for both platforms. The reporting does not give a return date for the later Google and X Corp subpoenas, and the court dockets themselves were not checked for the return date. Discord said on 2026-08-25 that it had not yet been served, so the practical deadline may move.",
    confidence: "moderate",
    sourceIds: ["LEEK-SRC-029", "LEEK-SRC-068", "LEEK-SRC-013", "LEEK-SRC-026", "LEEK-SRC-061", "LEEK-SRC-086"],
  },
  {
    id: "LEEK-CHK-003",
    date: "2026-08-24",
    datePrecision: "approximate",
    label: "Take-Two must supplement its Google subpoena application",
    kind: "legal",
    description:
      "On 2026-08-24 Judge John P. Cronan endorsed the Google petition (1:26-mc-00425) with an order that Take-Two had not explained how it identified the YouTube personas it wants to subpoena, or its basis for tying them to the cited YouTube upload, and that it 'shall promptly supplement its application'. No date was set. The supplement, when filed, will show how Take-Two links online personas to the leaks and may name accounts.",
    confidence: "verified",
    sourceIds: ["LEEK-SRC-005", "LEEK-SRC-014"],
  },
  {
    id: "LEEK-CHK-004",
    date: "2026-11-19",
    datePrecision: "day",
    label: "GTA VI launches on PlayStation 5 and Xbox Series X|S",
    kind: "release",
    description:
      "The release date stands at November 19, 2026, confirmed in Rockstar's 2026-08-26 statement and in Take-Two's July regulatory filing per BigGo. Launch fixes the point at which the leaked development build can be compared with shipped content, and the point after which pre-release spoiler leverage collapses.",
    confidence: "verified",
    sourceIds: ["LEEK-SRC-007", "LEEK-SRC-026", "LEEK-SRC-062", "LEEK-SRC-016"],
  },
  {
    id: "LEEK-CHK-005",
    date: "2026-11-01",
    datePrecision: "approximate",
    label: "Retrial of Arion Kurtaj (2022 GTA VI leak) reported for November 2026",
    kind: "legal",
    description:
      "Den of Geek and IGN reported that the person convicted over the 2022 GTA VI leak is awaiting a retrial scheduled for the same month GTA VI launches. This is background only: no established link exists between that case and CyberLeek, whose Telegram statement calling Kurtaj 'our colleague' is an unverified actor claim. The exact hearing date was not in the corpus.",
    confidence: "low",
    sourceIds: ["LEEK-SRC-049", "LEEK-SRC-034", "LEEK-SRC-099"],
  },
];

export const checkpointById = Object.fromEntries(checkpoints.map((c) => [c.id, c]));
