import { cn, severityToken } from "@/lib/utils";

export function SeverityPill({
  severity,
  className,
}: {
  severity: "low" | "medium" | "high" | "critical";
  className?: string;
}) {
  const t = severityToken(severity);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-label",
        t.border,
        t.bg,
        t.color,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5", t.bar)} />
      {t.label}
    </span>
  );
}
