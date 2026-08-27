import { describe, expect, it } from "vitest";
import { dedupe, normalizeTitle, normalizeUrl, rulesClassify, suggestTier } from "../scripts/intel-update";

describe("source discovery pipeline", () => {
  it("normalises tracking parameters and hosts", () => {
    expect(normalizeUrl("https://www.kotaku.com/story-1?utm_source=x&s=20#frag")).toBe("kotaku.com/story-1");
    expect(normalizeUrl("https://amp.example.org/a/")).toBe("example.org/a");
  });
  it("de-duplicates by url and by syndicated title", () => {
    const known = new Set<string>();
    const titles = new Set<string>();
    const items = [
      { url: "https://a.com/x", title: "Take-Two subpoenas Discord - Kotaku", publisher: "a", feed: "f", query: "q" },
      { url: "https://a.com/x?utm_medium=rss", title: "Take-Two subpoenas Discord - Kotaku", publisher: "a", feed: "f", query: "q" },
      { url: "https://b.com/y", title: "Take-Two subpoenas Discord | Yahoo", publisher: "b", feed: "f", query: "q" },
    ];
    expect(dedupe(items, known, titles)).toHaveLength(1);
  });
  it("never suggests a supported status", () => {
    const c = rulesClassify("CyberLeek confirms it has the full GTA 6 game");
    expect(c?.suggestedStatus).not.toBe("supported");
    expect(c?.claims).toContain("LEEK-CLM-002");
  });
  it("routes corrections and legal items", () => {
    expect(rulesClassify("Insider Gaming retracts dead man's switch report")?.category).toBe("correction");
    expect(rulesClassify("Judge questions Take-Two subpoena to Google")?.category).toBe("legal");
  });
  it("drops items published before the campaign and keeps undated ones", () => {
    const known = new Set<string>();
    const titles = new Set<string>();
    const items = [
      { url: "https://a.com/old", title: "GTA Online gets an update", publisher: "a", publishedAt: "2022-12-09T08:00:00.000Z", feed: "f", query: "q" },
      { url: "https://a.com/undated", title: "Cyberleek explained", publisher: "a", feed: "f", query: "q" },
      { url: "https://a.com/new", title: "Take-Two files subpoena", publisher: "a", publishedAt: "2026-08-21T00:00:00.000Z", feed: "f", query: "q" },
    ];
    expect(dedupe(items, known, titles).map((i) => i.url)).toEqual(["https://a.com/undated", "https://a.com/new"]);
  });
  it("ranks court records above social posts", () => {
    expect(suggestTier("https://www.courtlistener.com/docket/1/x/")).toBe(1);
    expect(suggestTier("https://x.com/someone/status/1")).toBe(11);
    expect(normalizeTitle("Hello, World! - IGN")).toBe("hello world");
  });
});
