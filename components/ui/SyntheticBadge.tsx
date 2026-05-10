export function SyntheticBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 border border-accent-amber/40 bg-accent-amber/5 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-label text-accent-amber">
      <span className="h-1 w-1 bg-accent-amber" />
      Synthetic
    </span>
  );
}

export function ObservedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 border border-accent-terminal/40 bg-accent-terminal/5 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-label text-accent-terminal">
      <span className="h-1 w-1 bg-accent-terminal" />
      Observed
    </span>
  );
}
