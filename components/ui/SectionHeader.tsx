import { cn } from "@/lib/utils";

export function SectionHeader({
  kicker,
  title,
  description,
  right,
  className,
}: {
  kicker?: string;
  title: string;
  description?: string;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div>
        {kicker && (
          <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
            {kicker}
          </div>
        )}
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-ink-primary">
          {title}
        </h2>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-ink-muted">{description}</p>
        )}
      </div>
      {right && <div className="flex shrink-0 items-center gap-2">{right}</div>}
    </div>
  );
}
