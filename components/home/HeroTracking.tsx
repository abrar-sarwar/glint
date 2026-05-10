import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { shinyhunters } from "@/data/adversaries";
import { ConfidencePill } from "@/components/ui/ConfidencePill";
import { MitreBadge } from "@/components/ui/MitreBadge";
import { LiveCountdown } from "@/components/home/LiveCountdown";
import { computeCountdown } from "@/lib/utils";

export function HeroTracking() {
  const top = shinyhunters.signature_ttps.slice(0, 4);
  const initial = computeCountdown(new Date());
  return (
    <div className="paper-grain relative overflow-hidden border border-line bg-bg-surface">
      <div className="h-1 w-full bg-diag-stripes" />

      <div className="grid grid-cols-12">
        {/* Primary panel */}
        <div className="col-span-12 border-line p-7 md:col-span-7 md:border-r">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 animate-pulse-dot bg-accent-crit" />
            <span className="stamp text-[10px] uppercase text-accent-crit">
              Currently tracking
            </span>
            <span className="text-ink-dim">·</span>
            <span className="stamp text-[10px] uppercase text-ink-faint">
              Priority 01
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-none tracking-tight text-ink-primary">
            ShinyHunters
          </h1>
          <div className="mt-2 font-display text-sm italic text-ink-muted">
            Also known as Scattered LAPSUS$ Hunters
          </div>

          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-secondary">
            An identity-driven eCrime cluster, active since 2020. They steal
            credentials, abuse OAuth tokens, and call helpdesks. Almost never
            malware. Mandiant tracks the same operators under at least five
            UNC numbers.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <ConfidencePill confidence={shinyhunters.attribution_confidence} />
            <Pip>{shinyhunters.aliases.length} UNC aliases</Pip>
            <Pip>{shinyhunters.notable_breaches.length} flagship campaigns</Pip>
          </div>

          <div className="mt-6">
            <div className="stamp text-[9px] uppercase text-ink-faint">
              Signature techniques
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {top.map((ttp) => (
                <MitreBadge key={ttp.mitre_id} id={ttp.mitre_id} showName />
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <Link
              href="/adversary"
              className="group inline-flex items-center gap-2 border border-accent-terminal bg-accent-terminal/15 px-4 py-2 text-sm font-semibold tracking-wide text-accent-terminal transition-colors hover:bg-accent-terminal/25"
            >
              View dossier
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/campaigns/canvas-extortion"
              className="inline-flex items-center gap-2 border border-line bg-bg-elevated px-4 py-2 text-sm text-ink-secondary transition-colors hover:border-line-strong hover:text-ink-primary"
            >
              Read Canvas brief
            </Link>
          </div>
        </div>

        {/* Counter panel - now obvious */}
        <div className="relative col-span-12 flex flex-col border-t border-accent-amber/30 bg-bg-elevated/70 md:col-span-5 md:border-l md:border-t-0">
          {/* warning stripe header */}
          <div className="flex items-center justify-between border-b border-accent-amber/40 bg-accent-amber/10 px-5 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse-dot bg-accent-amber" />
              <span className="stamp text-[11px] uppercase text-accent-amber">
                Active campaign
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-label text-accent-amber/70">
              Live
            </span>
          </div>

          <div className="relative flex flex-1 flex-col p-7">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-diag-stripes opacity-40"
            />

            <div className="relative">
              <div className="font-display text-2xl font-semibold leading-tight tracking-tight text-ink-primary">
                Canvas extortion
              </div>
              <div className="mt-1 font-mono text-xs text-ink-muted">
                Instructure / Canvas LMS · 2026
              </div>
            </div>

            <div className="relative mt-5">
              <div className="stamp text-[9px] uppercase text-ink-faint">
                Ransom deadline
              </div>
              <div className="mt-2">
                <LiveCountdown initial={initial} />
              </div>
              <div className="mt-2 flex items-center gap-1.5 font-mono text-xs text-ink-muted">
                <Clock size={11} strokeWidth={1.6} />
                May 12 2026, 23:59 UTC
              </div>
            </div>

            <div className="relative mt-6 grid grid-cols-2 gap-px bg-line">
              <Stat label="Institutions" value="9,000" sub="claimed" />
              <Stat label="Users" value="275M" sub="claimed" />
            </div>

            <p className="relative mt-5 text-sm leading-relaxed text-ink-secondary">
              Sample data published. Per-institution shaming continues on the
              actor's Telegram channel pending payment.
            </p>

            <div className="relative mt-auto flex items-center justify-between border-t border-line/60 pt-4">
              <span className="stamp text-[9px] uppercase text-ink-faint">
                Source · BleepingComputer
              </span>
              <Link
                href="/campaigns/canvas-extortion"
                className="group inline-flex items-center gap-1.5 stamp text-[10px] uppercase text-accent-terminal hover:text-accent-terminal-bright"
              >
                Open campaign
                <ArrowRight
                  size={11}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center border border-line bg-bg-elevated px-2 py-0.5 font-mono text-[11px] text-ink-secondary">
      {children}
    </span>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-bg-surface px-3 py-2.5">
      <div className="stamp text-[9px] uppercase text-ink-faint">{label}</div>
      <div className="mt-1 font-display text-xl font-semibold tabular text-ink-primary">
        {value}
      </div>
      <div className="mt-0.5 font-mono text-[11px] text-ink-muted">{sub}</div>
    </div>
  );
}
