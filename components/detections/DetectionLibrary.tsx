"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Search, X } from "lucide-react";
import { detections, type DetectionRule } from "@/data/detections";
import { sourceById } from "@/data/sources";
import { SeverityPill } from "@/components/ui/SeverityPill";
import { MitreBadge } from "@/components/ui/MitreBadge";
import { cn } from "@/lib/utils";

type Tab = "sigma" | "logscale" | "spl";

function StatusPill({ status }: { status: DetectionRule["status"] }) {
  const map = {
    production: {
      label: "Production",
      color: "text-accent-terminal",
      bar: "bg-accent-terminal",
    },
    draft: {
      label: "Draft",
      color: "text-accent-amber",
      bar: "bg-accent-amber",
    },
    stub: {
      label: "Stub",
      color: "text-ink-faint",
      bar: "bg-ink-faint",
    },
  } as const;
  const t = map[status];
  return (
    <span className="inline-flex items-center gap-1.5 border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-label">
      <span className={cn("h-1.5 w-1.5", t.bar)} />
      <span className={t.color}>{t.label}</span>
    </span>
  );
}

export function DetectionLibrary() {
  const [query, setQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(
    detections[0]?.id ?? null
  );
  const [tab, setTab] = useState<Tab>("sigma");

  const filtered = useMemo(() => {
    return detections.filter((d) => {
      if (severityFilter && d.severity !== severityFilter) return false;
      if (statusFilter && d.status !== statusFilter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const blob = [
          d.title,
          d.description,
          d.id,
          d.log_source,
          ...d.mitre_techniques,
        ]
          .join(" ")
          .toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [query, severityFilter, statusFilter]);

  const selected = useMemo(
    () => detections.find((d) => d.id === selectedId),
    [selectedId]
  );

  return (
    <div className="flex h-full flex-col">
      {/* Provenance banner */}
      <div className="border-b border-line bg-bg-elevated/40 px-8 py-3">
        <div className="flex items-start gap-3">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent-amber" />
          <p className="text-[13px] leading-relaxed text-ink-secondary">
            <span className="stamp text-[10px] uppercase tracking-label text-accent-amber">
              Provenance
            </span>
            <span className="mx-2 text-ink-dim">·</span>
            Detection rules in GLINT are a mix of adaptations from public
            detection libraries (cited where applicable) and original research
            authored against documented ShinyHunters TTPs. Each rule's
            provenance is shown in its detail panel.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-line bg-bg-surface px-8 py-4">
        <div className="flex items-center gap-2 border border-line bg-bg-elevated px-3 py-1.5">
          <Search size={14} strokeWidth={1.5} className="text-ink-faint" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rules"
            className="w-72 bg-transparent text-sm text-ink-primary placeholder:text-ink-faint focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-ink-faint hover:text-ink-primary"
            >
              <X size={12} />
            </button>
          )}
        </div>

        <span className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
          Severity
        </span>
        {(["critical", "high", "medium"] as const).map((s) => (
          <FilterChip
            key={s}
            active={severityFilter === s}
            onClick={() => setSeverityFilter((p) => (p === s ? null : s))}
          >
            {s}
          </FilterChip>
        ))}

        <span className="text-ink-dim">·</span>

        {(["production", "draft"] as const).map((s) => (
          <FilterChip
            key={s}
            active={statusFilter === s}
            onClick={() => setStatusFilter((p) => (p === s ? null : s))}
          >
            {s}
          </FilterChip>
        ))}

        <div className="ml-auto font-mono text-[11px] uppercase tracking-label text-ink-faint">
          {filtered.length} of {detections.length}
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        {/* List */}
        <div className="overflow-y-auto border-line lg:border-r">
          <ul>
            {filtered.map((d) => {
              const isSel = d.id === selectedId;
              return (
                <li key={d.id}>
                  <button
                    onClick={() => setSelectedId(d.id)}
                    className={cn(
                      "block w-full border-b border-line/60 px-6 py-4 text-left transition-colors",
                      isSel ? "bg-bg-elevated" : "hover:bg-bg-elevated/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "h-2 w-2",
                          d.severity === "critical" && "bg-accent-crit",
                          d.severity === "high" && "bg-accent-amber",
                          d.severity === "medium" && "bg-accent-info",
                          d.severity === "low" && "bg-ink-faint"
                        )}
                      />
                      <span className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
                        {d.id}
                      </span>
                      <span className="ml-auto">
                        <StatusPill status={d.status} />
                      </span>
                    </div>
                    <div className="mt-2 text-base font-semibold leading-snug text-ink-primary">
                      {d.title}
                    </div>
                    <div className="mt-1 text-xs text-ink-muted">
                      {d.log_source}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {d.mitre_techniques.slice(0, 4).map((t) => (
                        <MitreBadge key={t} id={t} />
                      ))}
                    </div>
                  </button>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className="px-6 py-12 text-center font-mono text-xs uppercase tracking-label text-ink-faint">
                No rules match the current filters
              </li>
            )}
          </ul>
        </div>

        {/* Detail */}
        <aside className="overflow-y-auto bg-bg-surface">
          {!selected ? (
            <div className="flex h-full items-center justify-center px-6 text-center">
              <p className="text-sm text-ink-muted">
                Select a rule to view its detection content.
              </p>
            </div>
          ) : (
            <div className="px-8 py-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
                  {selected.id}
                </span>
                <SeverityPill severity={selected.severity} />
                <StatusPill status={selected.status} />
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-primary">
                {selected.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-secondary">
                {selected.description}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-px bg-line">
                <Field label="Log source" value={selected.log_source} />
                <Field label="Data source" value={selected.data_source} />
              </div>

              {/* Provenance */}
              <div className="mt-5 border border-line bg-bg-elevated/30 p-3">
                <div className="flex items-center gap-2">
                  <span
                    className={
                      "h-1.5 w-1.5 " +
                      (selected.authored_by === "original"
                        ? "bg-accent-terminal"
                        : "bg-accent-info")
                    }
                  />
                  <span className="stamp text-[10px] uppercase text-ink-secondary">
                    {selected.authored_by === "original"
                      ? "Authored by GLINT detection engineering"
                      : "Adapted from public detection library"}
                  </span>
                </div>
                {selected.source_reference ? (
                  <a
                    href={selected.source_reference}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1.5 block break-all font-mono text-[11px] text-ink-muted hover:text-accent-terminal"
                  >
                    {selected.source_reference}
                  </a>
                ) : (
                  <p className="mt-1.5 text-xs leading-snug text-ink-muted">
                    Original research against documented ShinyHunters TTPs.
                    Mapped to the ATT&amp;CK techniques below and the cited
                    campaign reporting.
                  </p>
                )}
              </div>

              <div className="mt-5">
                <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
                  ATT&amp;CK coverage
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selected.mitre_techniques.map((t) => (
                    <MitreBadge key={t} id={t} showName />
                  ))}
                </div>
              </div>

              <div className="mt-5 border-l-2 border-accent-amber bg-bg-elevated/30 p-3">
                <div className="font-mono text-[10px] uppercase tracking-label text-accent-amber">
                  False positives
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-secondary">
                  {selected.false_positive_notes}
                </p>
              </div>

              {selected.status !== "stub" &&
              (selected.sigma_yaml ||
                selected.falcon_logscale_cql ||
                selected.splunk_spl) ? (
                <div className="mt-6">
                  <div className="flex items-center justify-between border-b border-line pb-2">
                    <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
                      Detection content
                    </div>
                    <div className="flex items-center gap-px bg-line">
                      <TabBtn
                        active={tab === "sigma"}
                        onClick={() => setTab("sigma")}
                        disabled={!selected.sigma_yaml}
                      >
                        Sigma
                      </TabBtn>
                      <TabBtn
                        active={tab === "logscale"}
                        onClick={() => setTab("logscale")}
                        disabled={!selected.falcon_logscale_cql}
                      >
                        LogScale
                      </TabBtn>
                      <TabBtn
                        active={tab === "spl"}
                        onClick={() => setTab("spl")}
                        disabled={!selected.splunk_spl}
                      >
                        Splunk
                      </TabBtn>
                    </div>
                  </div>
                  <pre className="mt-3 max-h-[420px] overflow-auto border border-line bg-bg-inset p-4 font-mono text-[12px] leading-relaxed text-ink-primary">
                    {tab === "sigma" &&
                      (selected.sigma_yaml ?? "(not implemented)")}
                    {tab === "logscale" &&
                      (selected.falcon_logscale_cql ?? "(not implemented)")}
                    {tab === "spl" && (selected.splunk_spl ?? "(not implemented)")}
                  </pre>
                </div>
              ) : (
                <div className="mt-6 border border-dashed border-line bg-bg-elevated/30 p-4 text-sm text-ink-muted">
                  This rule is currently a {selected.status}. Title, MITRE
                  coverage, and severity are populated. Query content is not
                  yet authored.
                </div>
              )}

              <div className="mt-6 border-t border-line/60 pt-4">
                <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
                  References
                </div>
                <ul className="mt-2 space-y-1.5">
                  {selected.references.map((sid) => {
                    const s = sourceById(sid);
                    if (!s) return null;
                    return (
                      <li key={sid}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-start gap-2"
                        >
                          <ChevronRight
                            size={12}
                            className="mt-1 shrink-0 text-ink-faint group-hover:text-accent-terminal"
                          />
                          <span className="text-sm leading-snug text-ink-secondary group-hover:text-accent-terminal">
                            {s.title}
                            <span className="ml-2 font-mono text-[10px] uppercase tracking-label text-ink-faint">
                              {s.publisher}
                            </span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg-elevated/40 p-3">
      <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
        {label}
      </div>
      <div className="mt-1 font-mono text-xs text-ink-primary">{value}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border px-2.5 py-1 font-mono text-[10px] uppercase tracking-label transition-colors",
        active
          ? "border-accent-terminal bg-accent-terminal/10 text-accent-terminal"
          : "border-line bg-bg-elevated text-ink-muted hover:text-ink-primary"
      )}
    >
      {children}
    </button>
  );
}

function TabBtn({
  active,
  onClick,
  disabled,
  children,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-3 py-1 font-mono text-[10px] uppercase tracking-label transition-colors",
        active
          ? "bg-accent-terminal/10 text-accent-terminal"
          : "bg-bg-elevated text-ink-muted hover:text-ink-primary",
        disabled && "cursor-not-allowed opacity-40"
      )}
    >
      {children}
    </button>
  );
}
