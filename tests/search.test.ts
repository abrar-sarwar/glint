import { describe, expect, it } from "vitest";
import { search, searchIndex } from "../lib/search";

describe("global search", () => {
  it("indexes every intelligence kind", () => {
    const kinds = new Set(searchIndex.map((i) => i.kind));
    for (const k of ["event", "legal", "claim", "source", "evidence", "drop", "hypothesis", "narrative", "media", "checkpoint", "entity"]) {
      expect(kinds.has(k as never), k).toBe(true);
    }
  });
  it("finds legal events for 'subpoena'", () => {
    const r = search("subpoena");
    expect(r.length).toBeGreaterThan(0);
    expect(r.some((i) => i.kind === "legal" || i.kind === "source")).toBe(true);
  });
  it("ranks an exact id first", () => {
    expect(search("LEEK-CLM-001")[0]?.id).toBe("LEEK-CLM-001");
  });
  it("returns nothing for an empty query", () => {
    expect(search("   ")).toEqual([]);
  });
});
