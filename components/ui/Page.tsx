import { cn } from "@/lib/utils";

/** Standard page frame with a kicker, a large title, and an optional right rail. */
export function PageHeader({
  kicker,
  title,
  lede,
  right,
  className,
}: {
  kicker: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-6 border-b border-line pb-7 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="min-w-0">
        <div className="label">{kicker}</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-primary md:text-4xl">
          {title}
        </h1>
        {lede && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-secondary">
            {lede}
          </p>
        )}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </header>
  );
}

export function Section({
  kicker,
  title,
  description,
  right,
  children,
  className,
  id,
}: {
  kicker?: string;
  title: string;
  description?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("mt-12 scroll-mt-6", className)}>
      <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
        <div>
          {kicker && <div className="label">{kicker}</div>}
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-ink-primary">
            {title}
          </h2>
          {description && (
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-ink-muted">
              {description}
            </p>
          )}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function Panel({
  title,
  kicker,
  tone = "neutral",
  children,
  className,
  right,
}: {
  title?: string;
  kicker?: string;
  tone?: "neutral" | "evidence" | "assess" | "crit" | "claim" | "info";
  children: React.ReactNode;
  className?: string;
  right?: React.ReactNode;
}) {
  const border = {
    neutral: "border-line",
    evidence: "border-evidence-dim",
    assess: "border-assess-dim",
    crit: "border-crit-dim",
    claim: "border-claim-dim",
    info: "border-info-dim",
  }[tone];
  const bar = {
    neutral: "bg-ink-dim",
    evidence: "bg-evidence",
    assess: "bg-assess",
    crit: "bg-crit",
    claim: "bg-claim",
    info: "bg-info",
  }[tone];
  return (
    <div className={cn("relative border bg-bg-surface", border, className)}>
      <span className={cn("absolute left-0 top-0 h-full w-[2px]", bar)} />
      {(title || kicker || right) && (
        <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-3">
          <div>
            {kicker && <div className="label">{kicker}</div>}
            {title && (
              <div className="mt-0.5 text-sm font-semibold text-ink-primary">
                {title}
              </div>
            )}
          </div>
          {right}
        </div>
      )}
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

/** Two-column definition row used throughout drawers and dossiers. */
export function Field({
  label,
  children,
  className,
  mono,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  mono?: boolean;
}) {
  return (
    <div className={cn("grid grid-cols-[120px_1fr] gap-3 py-2", className)}>
      <div className="label pt-0.5">{label}</div>
      <div className={cn("min-w-0 text-sm text-ink-secondary", mono && "font-mono text-xs")}>
        {children}
      </div>
    </div>
  );
}

export function Stat({
  label,
  value,
  sub,
  tone = "neutral",
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  tone?: "neutral" | "evidence" | "claim" | "assess" | "crit";
}) {
  const color = {
    neutral: "text-ink-primary",
    evidence: "text-evidence",
    claim: "text-claim",
    assess: "text-assess",
    crit: "text-crit",
  }[tone];
  return (
    <div className="bg-bg-surface px-4 py-3">
      <div className="label">{label}</div>
      <div className={cn("mt-1.5 text-2xl font-semibold tabular tracking-tight", color)}>
        {value}
      </div>
      {sub && <div className="mt-0.5 font-mono text-[11px] text-ink-faint">{sub}</div>}
    </div>
  );
}
