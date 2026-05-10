import { cn, confidenceToken } from "@/lib/utils";

export function ConfidencePill({
  confidence,
  className,
}: {
  confidence: "low" | "moderate" | "high";
  className?: string;
}) {
  const t = confidenceToken(confidence);
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
      <span
        className={cn(
          "h-1.5 w-1.5",
          confidence === "high"
            ? "bg-accent-terminal"
            : confidence === "moderate"
              ? "bg-accent-amber"
              : "bg-ink-faint"
        )}
      />
      {t.label}
    </span>
  );
}
