"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { search, type SearchItem, type SearchKind } from "@/lib/search";
import { cn, formatDate } from "@/lib/utils";

const kindLabel: Record<SearchKind, string> = {
  event: "Event",
  legal: "Legal",
  claim: "Claim",
  source: "Source",
  evidence: "Evidence",
  drop: "Drop",
  hypothesis: "Hypothesis",
  narrative: "Narrative",
  media: "Media",
  checkpoint: "Checkpoint",
  entity: "Entity",
};

const kindTone: Record<SearchKind, string> = {
  event: "text-ink-secondary",
  legal: "text-info",
  claim: "text-claim",
  source: "text-info",
  evidence: "text-evidence",
  drop: "text-claim",
  hypothesis: "text-assess",
  narrative: "text-assess",
  media: "text-ink-muted",
  checkpoint: "text-crit",
  entity: "text-ink-primary",
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => search(q), [q]);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setCursor(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        close();
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("leek:open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("leek:open-search", onOpen);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 10);
  }, [open]);

  useEffect(() => setCursor(0), [q]);

  const go = useCallback(
    (item: SearchItem) => {
      close();
      router.push(item.href);
    },
    [close, router]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh]">
      <button aria-label="Close search" className="absolute inset-0 bg-bg-inset/75" onClick={close} />
      <div className="relative w-full max-w-[680px] border border-line-strong bg-bg-surface animate-fade-up">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={15} className="text-ink-faint" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setCursor((c) => Math.min(results.length - 1, c + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setCursor((c) => Math.max(0, c - 1));
              } else if (e.key === "Enter" && results[cursor]) {
                go(results[cursor]);
              }
            }}
            placeholder="Search events, claims, sources, evidence, narratives, legal actions…"
            className="h-12 flex-1 bg-transparent text-sm text-ink-primary outline-none placeholder:text-ink-faint"
          />
          <span className="font-mono text-[11px] text-ink-faint">esc</span>
        </div>
        <div className="max-h-[56vh] overflow-y-auto">
          {q && results.length === 0 && (
            <div className="px-4 py-6 text-sm text-ink-muted">
              Nothing in the case file matches &ldquo;{q}&rdquo;.
            </div>
          )}
          {!q && (
            <div className="px-4 py-4 text-xs text-ink-muted">
              Try <span className="font-mono text-ink-secondary">subpoena</span>,{" "}
              <span className="font-mono text-ink-secondary">dead man</span>,{" "}
              <span className="font-mono text-ink-secondary">LEEK-CLM-001</span>,{" "}
              <span className="font-mono text-ink-secondary">Arweave</span>, or{" "}
              <span className="font-mono text-ink-secondary">$CYBERLEEK</span>.
            </div>
          )}
          <ul>
            {results.map((r, i) => (
              <li key={`${r.kind}-${r.id}`}>
                <button
                  type="button"
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => go(r)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-line-faint px-4 py-2.5 text-left",
                    i === cursor ? "bg-bg-elevated" : "hover:bg-bg-elevated/60"
                  )}
                >
                  <span className={cn("label w-[76px] shrink-0 pt-0.5", kindTone[r.kind])}>
                    {kindLabel[r.kind]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-ink-primary">{r.title}</span>
                    <span className="block truncate text-xs text-ink-muted">{r.snippet}</span>
                  </span>
                  <span className="shrink-0 pt-0.5 text-right font-mono text-[11px] text-ink-faint">
                    {r.date ? formatDate(r.date) : ""}
                    <br />
                    {r.id.startsWith("LEEK-") ? r.id : ""}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
