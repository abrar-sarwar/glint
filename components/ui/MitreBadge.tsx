import { cn } from "@/lib/utils";
import { techniqueById } from "@/data/techniques";

export function MitreBadge({
  id,
  showName,
  className,
}: {
  id: string;
  showName?: boolean;
  className?: string;
}) {
  const t = techniqueById(id);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-line bg-bg-elevated/60 px-2 py-1 font-mono text-[11px] text-ink-secondary",
        className
      )}
      title={t ? `${t.id}: ${t.name}` : id}
    >
      <span className="text-accent-terminal">{id}</span>
      {showName && t && (
        <span className="max-w-[180px] truncate text-ink-muted">{t.name}</span>
      )}
    </span>
  );
}
