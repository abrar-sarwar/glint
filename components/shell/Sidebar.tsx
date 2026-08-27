"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BookOpen,
  Clock,
  Crosshair,
  FileSearch,
  Film,
  Gavel,
  ListChecks,
  Newspaper,
  Radio,
  ShieldCheck,
  User,
} from "lucide-react";
import { cn, buildInfo } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  Icon: typeof Activity;
  group: "case" | "analysis" | "record";
}

const nav: NavItem[] = [
  { href: "/", label: "Command view", Icon: Activity, group: "case" },
  { href: "/timeline", label: "Timeline", Icon: Clock, group: "case" },
  { href: "/drops", label: "Drops", Icon: Film, group: "case" },
  { href: "/actor", label: "Actor", Icon: User, group: "case" },
  { href: "/claims", label: "Claims", Icon: ListChecks, group: "analysis" },
  { href: "/access", label: "Initial access", Icon: Crosshair, group: "analysis" },
  { href: "/dead-mans-switch", label: "Dead man's switch", Icon: Radio, group: "analysis" },
  { href: "/media", label: "Media", Icon: Newspaper, group: "analysis" },
  { href: "/impact", label: "Impact", Icon: Gavel, group: "analysis" },
  { href: "/response", label: "Response", Icon: ShieldCheck, group: "analysis" },
  { href: "/evidence", label: "Evidence", Icon: FileSearch, group: "record" },
  { href: "/sources", label: "Sources", Icon: BookOpen, group: "record" },
];

const groups: { key: NavItem["group"]; label: string }[] = [
  { key: "case", label: "Case" },
  { key: "analysis", label: "Analysis" },
  { key: "record", label: "Record" },
];

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="relative flex w-[220px] shrink-0 flex-col border-r border-line bg-bg-surface">
      {/* Brand */}
      <Link
        href="/"
        className="flex h-16 items-center gap-3 border-b border-line px-5"
      >
        <span className="grid h-8 w-8 place-items-center border border-evidence-dim bg-evidence-faint font-mono text-sm font-semibold text-evidence">
          L
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-xl font-semibold tracking-tight text-ink-primary">
            LEEK
          </span>
          <span className="label mt-1">Case file</span>
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {groups.map((g) => (
          <div key={g.key} className="mb-3">
            <div className="label px-5 pb-1.5 pt-2 text-ink-dim">
              {g.label}
            </div>
            <ul className="px-2">
              {nav
                .filter((n) => n.group === g.key)
                .map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.Icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "relative flex h-9 items-center gap-3 px-3 text-sm transition-colors",
                          active
                            ? "bg-bg-elevated text-ink-primary"
                            : "text-ink-muted hover:bg-bg-elevated/60 hover:text-ink-primary"
                        )}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 bg-ink-primary" />
                        )}
                        <Icon
                          size={14}
                          strokeWidth={1.6}
                          className={cn(
                            "shrink-0",
                            active ? "text-ink-primary" : "text-ink-faint"
                          )}
                        />
                        <span className="flex-1">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Search hint */}
      <div className="border-t border-line px-5 py-3">
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("leek:open-search"))
          }
          className="flex w-full items-center justify-between border border-line bg-bg-base px-2.5 py-1.5 text-left text-xs text-ink-muted transition-colors hover:border-line-strong hover:text-ink-secondary"
        >
          <span>Search the case</span>
          <span className="font-mono text-[11px] text-ink-faint">⌘K</span>
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-line px-5 py-4">
        <div className="font-mono text-[11px] text-ink-secondary">
          {buildInfo.name} v{buildInfo.version} · build {buildInfo.build}
        </div>
        <div className="mt-1 font-mono text-[11px] text-ink-faint">
          {buildInfo.classification} · {buildInfo.programLine}
        </div>
      </div>
    </aside>
  );
}
