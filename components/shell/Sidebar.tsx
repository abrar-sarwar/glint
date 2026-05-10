"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Crosshair,
  FileText,
  Grid3x3,
  Info,
  Layers,
  Radar,
  Target,
} from "lucide-react";
import { cn, buildInfo } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  Icon: typeof Activity;
}

const nav: NavItem[] = [
  { href: "/", label: "Operations", Icon: Activity },
  { href: "/adversary", label: "Adversary", Icon: Target },
  { href: "/campaigns/salesloft-drift", label: "Campaigns", Icon: Crosshair },
  { href: "/detections", label: "Detections", Icon: Layers },
  { href: "/hunting", label: "Hunting", Icon: Radar },
  { href: "/coverage", label: "Coverage", Icon: Grid3x3 },
  { href: "/brief", label: "Brief", Icon: FileText },
  { href: "/about", label: "About", Icon: Info },
];

export function Sidebar({ daysToDeadline }: { daysToDeadline: number }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/campaigns")) return pathname.startsWith("/campaigns");
    return pathname === href || pathname.startsWith(href + "/");
  };

  const deadlineText =
    daysToDeadline <= 0
      ? "Deadline passed"
      : daysToDeadline === 1
        ? "1 day to deadline"
        : `${daysToDeadline} days to deadline`;

  return (
    <aside className="relative flex w-[228px] shrink-0 flex-col overflow-hidden border-r border-line bg-bg-surface">
      {/* warm grain overlay */}
      <div
        aria-hidden
        className="paper-grain absolute inset-0 pointer-events-none"
      />

      {/* Brand */}
      <div className="relative flex h-16 items-center gap-3 border-b border-line px-5">
        <div className="relative grid h-9 w-9 place-items-center border border-accent-terminal/50 bg-accent-terminal/10 text-accent-terminal">
          <span className="font-display text-xl font-semibold leading-none italic">
            G
          </span>
          <span className="absolute -right-px -top-px h-1.5 w-1.5 bg-accent-terminal" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-display text-xl font-semibold tracking-tight text-ink-primary">
            GLINT
          </span>
          <span className="mt-1 stamp text-[9px] uppercase text-ink-faint">
            Threat intel
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="relative flex-1 overflow-y-auto py-3">
        <div className="px-5 pb-2 stamp text-[9px] uppercase text-ink-dim">
          Workspace
        </div>
        <ul className="px-2">
          {nav.map((item) => {
            const active = isActive(item.href);
            const Icon = item.Icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex h-10 items-center gap-3 px-3 text-sm transition-colors",
                    active
                      ? "bg-bg-elevated text-ink-primary"
                      : "text-ink-muted hover:bg-bg-elevated/60 hover:text-ink-primary"
                  )}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 bg-accent-terminal" />
                  )}
                  <Icon
                    size={15}
                    strokeWidth={1.6}
                    className={cn(
                      "shrink-0",
                      active ? "text-accent-terminal" : "text-ink-faint"
                    )}
                  />
                  <span className="flex-1">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Tracking card */}
        <div className="mt-7 px-4">
          <div className="stamp text-[9px] uppercase text-ink-dim">Active</div>
          <Link
            href="/campaigns/canvas-extortion"
            className="mt-2 block border border-line bg-bg-elevated/60 p-3.5 transition-colors hover:border-accent-crit/50"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse-dot bg-accent-crit" />
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-crit">
                Tracking
              </span>
            </div>
            <div className="mt-2 font-display text-base font-semibold tracking-tight text-ink-primary">
              ShinyHunters
            </div>
            <div className="mt-1 text-xs leading-snug text-ink-muted">
              Canvas extortion. {deadlineText}.
            </div>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="relative border-t border-line px-5 py-4">
        <div className="stamp text-[9px] uppercase text-ink-dim">Build</div>
        <div className="mt-1 font-mono text-xs text-ink-secondary">
          v{buildInfo.version} · {buildInfo.build}
        </div>
        <div className="mt-3 inline-flex items-center gap-2 border border-accent-terminal/50 bg-accent-terminal/5 px-2 py-0.5">
          <span className="h-1.5 w-1.5 bg-accent-terminal" />
          <span className="stamp text-[9px] uppercase text-accent-terminal">
            {buildInfo.classification}
          </span>
        </div>
      </div>
    </aside>
  );
}
