import { describe, expect, it } from "vitest";
import { runChecks, type Failure } from "../scripts/intel-validate";

const failures: Failure[] = runChecks();
const only = (...checks: string[]) => failures.filter((f) => checks.includes(f.check)).map((f) => `[${f.check}] ${f.detail}`);

describe("intelligence integrity", () => {
  it("every factual record cites a source", () => expect(only("source-required")).toEqual([]));
  it("every source id resolves", () => expect(only("source-resolves", "media-source")).toEqual([]));
  it("claim statuses and confidence values are valid", () => expect(only("vocab", "status-confidence")).toEqual([]));
  it("verified and supported items carry sufficient provenance", () => expect(only("verified-provenance", "supported-provenance", "exposure-provenance")).toEqual([]));
  it("retracted claims keep their original history", () => expect(only("retraction-history", "retraction-evidence", "claim-history")).toEqual([]));
  it("the timeline is ordered and sequential", () => expect(only("timeline-order", "event-sequence")).toEqual([]));
  it("no source is registered twice", () => expect(only("source-duplicate")).toEqual([]));
  it("graph nodes resolve to intelligence objects", () => expect(only("graph-node-resolves", "graph-unknown-first", "graph-frontier-last", "graph-unknown-status")).toEqual([]));
  it("graph edges carry provenance and do not overstate causation", () => expect(only("graph-edge-resolves", "graph-causation")).toEqual([]));
  it("no GLINT-era data or branding remains", () => expect(only("legacy-content")).toEqual([]));
  it("no synthetic indicators remain", () => expect(only("synthetic-ioc")).toEqual([]));
  it("no attack-chain stage is asserted without primary evidence", () => expect(only("uncited-attack-chain", "attribution-overreach")).toEqual([]));
  it("no direct links to circulated material", () => expect(only("leak-links")).toEqual([]));
  it("prose contains no em-dashes or en-dashes", () => expect(only("style-dashes")).toEqual([]));
  it("has no other findings", () => expect(failures.map((f) => `[${f.check}] ${f.detail}`)).toEqual([]));
});
