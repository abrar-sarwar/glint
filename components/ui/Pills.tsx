import type {
  AssessmentStatus,
  ClaimStatus,
  Confidence,
  ExposureStatus,
  NarrativeConfidence,
} from "@/data/types";
import {
  cn,
  claimStatusToken,
  confidenceToken,
  exposureToken,
  narrativeToken,
  statusToken,
  type Token,
} from "@/lib/utils";

function BasePill({
  token,
  className,
  size = "sm",
  children,
}: {
  token: Token;
  className?: string;
  size?: "sm" | "md";
  children?: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border font-mono uppercase tracking-label whitespace-nowrap",
        size === "sm" ? "px-1.5 py-px text-[11px]" : "px-2 py-0.5 text-xs",
        token.border,
        token.bg,
        token.color,
        token.strike && "strike",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0", token.dot)} />
      {children ?? token.label}
    </span>
  );
}

export function ConfidencePill({
  confidence,
  className,
  size,
}: {
  confidence: Confidence;
  className?: string;
  size?: "sm" | "md";
}) {
  return <BasePill token={confidenceToken(confidence)} className={className} size={size} />;
}

export function StatusPill({
  status,
  className,
  size,
}: {
  status: AssessmentStatus;
  className?: string;
  size?: "sm" | "md";
}) {
  return <BasePill token={statusToken(status)} className={className} size={size} />;
}

export function ClaimStatusPill({
  status,
  className,
  size,
}: {
  status: ClaimStatus;
  className?: string;
  size?: "sm" | "md";
}) {
  return <BasePill token={claimStatusToken(status)} className={className} size={size} />;
}

export function NarrativePill({
  confidence,
  className,
  size,
}: {
  confidence: NarrativeConfidence;
  className?: string;
  size?: "sm" | "md";
}) {
  return <BasePill token={narrativeToken(confidence)} className={className} size={size} />;
}

export function ExposurePill({
  status,
  className,
  size,
}: {
  status: ExposureStatus;
  className?: string;
  size?: "sm" | "md";
}) {
  return <BasePill token={exposureToken(status)} className={className} size={size} />;
}

/** Neutral metadata chip: mono, hairline. */
export function Chip({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "evidence" | "claim" | "assess" | "crit" | "info";
}) {
  const tones = {
    neutral: "border-line bg-bg-elevated text-ink-secondary",
    evidence: "border-evidence-dim bg-evidence-faint text-evidence",
    claim: "border-claim-dim bg-claim-faint text-claim",
    assess: "border-assess-dim bg-assess-faint text-assess",
    crit: "border-crit-dim bg-crit-faint text-crit",
    info: "border-info-dim bg-info-faint text-info",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center border px-1.5 py-px font-mono text-[11px] tracking-label-tight whitespace-nowrap",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Case-file identifier, e.g. LEEK-EVT-004. */
export function IdTag({ id, className }: { id: string; className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] tracking-label-tight text-ink-faint",
        className
      )}
    >
      {id}
    </span>
  );
}
