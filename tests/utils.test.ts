import { describe, expect, it } from "vitest";
import { daysBetween, formatDate, formatDateTime, shortSourceRef, shortId } from "../lib/utils";

describe("formatters", () => {
  it("formats ISO dates in UTC", () => {
    expect(formatDate("2026-08-18")).toBe("18 Aug 2026");
    expect(formatDate("2026-08-26T23:30:00Z")).toBe("26 Aug 2026");
    expect(formatDateTime("2026-08-27T19:00:00Z")).toBe("27 Aug 2026 19:00 UTC");
  });
  it("shortens ids", () => {
    expect(shortSourceRef("LEEK-SRC-014")).toBe("S014");
    expect(shortSourceRef("nope")).toBe("nope");
    expect(shortId("LEEK-EVT-003")).toBe("EVT-003");
  });
  it("counts days", () => {
    expect(daysBetween("2026-08-18", "2026-09-04")).toBe(17);
  });
});
