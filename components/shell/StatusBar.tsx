import Link from "next/link";
import { formatDate, formatDateTime } from "@/lib/utils";

/**
 * Case status strip. No running clock: the two dates that matter are the
 * latest verified event and the latest source sync.
 */
export function StatusBar({
  caseName,
  latestSync,
  latestVerified,
}: {
  caseName: string;
  latestSync: string;
  latestVerified: string;
}) {
  return (
    <div className="flex h-11 shrink-0 items-center gap-5 border-b border-line bg-bg-surface px-6 text-sm">
      <div className="flex items-center gap-2.5">
        <span className="h-2 w-2 animate-pulse-dot bg-crit" aria-hidden />
        <span className="label text-ink-secondary">Active intelligence case</span>
      </div>
      <span className="hidden text-ink-dim md:inline">|</span>
      <span className="hidden truncate text-ink-muted md:inline">{caseName}</span>
      <div className="ml-auto flex items-center gap-5 font-mono text-xs">
        <Link href="/timeline" className="text-ink-muted hover:text-ink-primary">
          <span className="text-ink-faint">latest verified</span>{" "}
          <span className="text-ink-secondary">{formatDate(latestVerified)}</span>
        </Link>
        <Link href="/sources#sync" className="text-ink-muted hover:text-ink-primary">
          <span className="text-ink-faint">source sync</span>{" "}
          <span className="text-ink-secondary">{formatDateTime(latestSync)}</span>
        </Link>
      </div>
    </div>
  );
}
