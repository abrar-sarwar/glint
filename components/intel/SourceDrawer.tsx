"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { ExternalLink, X } from "lucide-react";
import { sourceById } from "@/data/sources";
import type { Source } from "@/data/types";
import { cn, formatDate, shortSourceRef, tierLabel } from "@/lib/utils";
import { Chip, IdTag } from "@/components/ui/Pills";
import { Field } from "@/components/ui/Page";

interface Ctx {
  open: (id: string) => void;
  close: () => void;
  activeId: string | null;
}

const SourceDrawerContext = createContext<Ctx>({
  open: () => {},
  close: () => {},
  activeId: null,
});

export function useSourceDrawer() {
  return useContext(SourceDrawerContext);
}

export function SourceDrawerProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const open = useCallback((id: string) => setActiveId(id), []);
  const close = useCallback(() => setActiveId(null), []);
  const value = useMemo(() => ({ open, close, activeId }), [open, close, activeId]);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, close]);

  const source = activeId ? sourceById[activeId] : undefined;

  return (
    <SourceDrawerContext.Provider value={value}>
      {children}
      {source && <Drawer source={source} onClose={close} />}
    </SourceDrawerContext.Provider>
  );
}

function Drawer({ source, onClose }: { source: Source; onClose: () => void }) {
  const statusTone =
    source.status === "active"
      ? "evidence"
      : source.status === "corrected"
        ? "assess"
        : "crit";
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        aria-label="Close source"
        className="absolute inset-0 bg-bg-inset/70"
        onClick={onClose}
      />
      <aside className="relative flex h-full w-full max-w-[520px] flex-col border-l border-line bg-bg-surface animate-fade-up">
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-info">
                [{shortSourceRef(source.id)}]
              </span>
              <IdTag id={source.id} />
            </div>
            <div className="mt-2 text-base font-semibold leading-snug text-ink-primary">
              {source.title}
            </div>
            <div className="mt-1 text-sm text-ink-muted">
              {source.publisher}
              {source.author ? ` · ${source.author}` : ""}
            </div>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 border border-line p-1.5 text-ink-muted hover:border-line-strong hover:text-ink-primary"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="flex flex-wrap gap-1.5">
            <Chip tone={source.primary ? "evidence" : "neutral"}>
              {source.primary ? "primary" : "secondary"}
            </Chip>
            <Chip tone="info">tier {source.tier} · {tierLabel(source.tier)}</Chip>
            <Chip tone={statusTone}>{source.status}</Chip>
          </div>

          <div className="mt-4 divide-y divide-line border-y border-line">
            <Field label="Published" mono>
              {formatDate(source.publishedDate)}
            </Field>
            {source.eventDate && (
              <Field label="Event date" mono>
                {formatDate(source.eventDate)}
              </Field>
            )}
            <Field label="Retrieved" mono>
              {formatDate(source.retrievedDate)}
            </Field>
            <Field label="Type" mono>
              {source.type}
            </Field>
            <Field label="Reliability">{source.reliabilityNotes}</Field>
            {source.excerpt && (
              <Field label="Excerpt">
                <blockquote className="border-l-2 border-line-strong pl-3 text-sm italic leading-relaxed text-ink-secondary">
                  {source.excerpt}
                </blockquote>
              </Field>
            )}
            {source.claimsSupported && source.claimsSupported.length > 0 && (
              <Field label="Supports">
                <div className="flex flex-wrap gap-1.5">
                  {source.claimsSupported.map((c) => (
                    <Link
                      key={c}
                      href={`/claims#${c}`}
                      onClick={onClose}
                      className="font-mono text-[11px] text-evidence hover:underline"
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </Field>
            )}
            {source.claimsContradicted && source.claimsContradicted.length > 0 && (
              <Field label="Contradicts">
                <div className="flex flex-wrap gap-1.5">
                  {source.claimsContradicted.map((c) => (
                    <Link
                      key={c}
                      href={`/claims#${c}`}
                      onClick={onClose}
                      className="font-mono text-[11px] text-crit hover:underline"
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </Field>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 border border-line bg-bg-elevated px-3 py-2 text-sm text-ink-primary hover:border-line-strong"
            >
              <ExternalLink size={13} />
              <span className="truncate font-mono text-xs">{source.url}</span>
            </a>
            {source.archiveUrl && (
              <a
                href={source.archiveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 border border-line px-3 py-2 text-sm text-ink-secondary hover:border-line-strong"
              >
                <ExternalLink size={13} />
                <span className="truncate font-mono text-xs">archive</span>
              </a>
            )}
            <Link
              href={`/sources#${source.id}`}
              onClick={onClose}
              className="text-xs text-ink-muted hover:text-ink-primary"
            >
              Open in source registry
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}

/** Inline citation: renders [S014]; click opens the source drawer. */
export function Cite({ id, className }: { id: string; className?: string }) {
  const { open } = useSourceDrawer();
  const s = sourceById[id];
  return (
    <button
      type="button"
      onClick={() => open(id)}
      title={s ? `${s.publisher}: ${s.title}` : id}
      className={cn(
        "inline font-mono text-[11px] leading-none text-info hover:underline",
        !s && "text-crit",
        className
      )}
    >
      [{shortSourceRef(id)}]
    </button>
  );
}

/** A run of citations separated by thin spaces. */
export function Cites({
  ids,
  className,
  label,
}: {
  ids: string[] | undefined;
  className?: string;
  label?: string;
}) {
  if (!ids || ids.length === 0) return null;
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-1", className)}>
      {label && <span className="label mr-1">{label}</span>}
      {ids.map((id) => (
        <Cite key={id} id={id} />
      ))}
    </span>
  );
}
