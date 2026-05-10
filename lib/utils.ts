import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00Z" : ""));
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateShort(iso: string): string {
  if (!iso || iso.length < 7) return iso;
  return iso.slice(0, 10);
}

/**
 * The Canvas extortion deadline used as the operational anchor across
 * GLINT. May 12 2026, 23:59 UTC.
 */
export const CANVAS_DEADLINE_ISO = "2026-05-12T23:59:00Z";

/**
 * Whole UTC calendar days remaining until the Canvas deadline (May 12 2026).
 * Returns 0 if the deadline has passed.
 */
export function daysUntilCanvasDeadline(now: Date = new Date()): number {
  const todayUtc = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );
  const deadlineUtc = Date.UTC(2026, 4, 12); // May = month index 4
  const diffMs = deadlineUtc - todayUtc;
  if (diffMs <= 0) return 0;
  return Math.round(diffMs / (24 * 3600 * 1000));
}

/** Return ms remaining until the Canvas deadline. */
export function msUntilCanvasDeadline(now: Date = new Date()): number {
  return Math.max(0, new Date(CANVAS_DEADLINE_ISO).getTime() - now.getTime());
}

/** Today's UTC date as YYYY-MM-DD. */
export function todayIso(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
}

export function computeCountdown(now: Date): CountdownParts {
  const remainingMs = Math.max(
    0,
    new Date(CANVAS_DEADLINE_ISO).getTime() - now.getTime()
  );
  const totalMinutes = Math.floor(remainingMs / 60_000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes - days * 60 * 24) / 60);
  const minutes = totalMinutes - days * 60 * 24 - hours * 60;
  return { days, hours, minutes };
}

export function formatToday(now: Date = new Date()): string {
  return now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function severityToken(
  severity: "low" | "medium" | "high" | "critical"
): { color: string; label: string; bar: string; bg: string; border: string } {
  switch (severity) {
    case "critical":
      return {
        color: "text-accent-crit",
        label: "Critical",
        bar: "bg-accent-crit",
        bg: "bg-accent-crit/10",
        border: "border-accent-crit/40",
      };
    case "high":
      return {
        color: "text-accent-amber",
        label: "High",
        bar: "bg-accent-amber",
        bg: "bg-accent-amber/10",
        border: "border-accent-amber/40",
      };
    case "medium":
      return {
        color: "text-accent-info",
        label: "Medium",
        bar: "bg-accent-info",
        bg: "bg-accent-info/10",
        border: "border-accent-info/30",
      };
    case "low":
      return {
        color: "text-ink-muted",
        label: "Low",
        bar: "bg-ink-faint",
        bg: "bg-line/40",
        border: "border-line",
      };
  }
}

export function confidenceToken(c: "low" | "moderate" | "high"): {
  label: string;
  color: string;
  bg: string;
  border: string;
} {
  switch (c) {
    case "high":
      return {
        label: "High confidence",
        color: "text-accent-terminal",
        bg: "bg-accent-terminal/10",
        border: "border-accent-terminal/30",
      };
    case "moderate":
      return {
        label: "Moderate confidence",
        color: "text-accent-amber",
        bg: "bg-accent-amber/10",
        border: "border-accent-amber/30",
      };
    case "low":
      return {
        label: "Low confidence",
        color: "text-ink-muted",
        bg: "bg-line/40",
        border: "border-line",
      };
  }
}

export function entityTypeToken(t: "actor" | "alias" | "victim" | "affiliate"): {
  color: string;
  bg: string;
  border: string;
  dot: string;
  label: string;
} {
  switch (t) {
    case "actor":
      return {
        color: "text-accent-crit",
        bg: "bg-accent-crit/10",
        border: "border-accent-crit/50",
        dot: "bg-accent-crit",
        label: "Actor",
      };
    case "alias":
      return {
        color: "text-accent-amber",
        bg: "bg-accent-amber/10",
        border: "border-accent-amber/40",
        dot: "bg-accent-amber",
        label: "Alias",
      };
    case "affiliate":
      return {
        color: "text-accent-info",
        bg: "bg-accent-info/10",
        border: "border-accent-info/40",
        dot: "bg-accent-info",
        label: "Affiliate",
      };
    case "victim":
      return {
        color: "text-ink-secondary",
        bg: "bg-bg-elevated",
        border: "border-line-strong",
        dot: "bg-ink-faint",
        label: "Victim",
      };
  }
}

export const buildInfo = {
  version: "0.1.0",
  build: "0a1f3c8",
  classification: "TLP:CLEAR",
  programLine: "Counter-adversary operations",
};
