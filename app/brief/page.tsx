import { Printer } from "lucide-react";
import Link from "next/link";
import { shinyhunters } from "@/data/adversaries";
import { campaigns } from "@/data/campaigns";
import { sourceById } from "@/data/sources";
import { detectionStats } from "@/data/detections";
import { buildInfo, formatToday, todayIso } from "@/lib/utils";

export default function BriefPage() {
  const stats = detectionStats();
  const headline = campaigns.find((c) => c.id === "canvas-extortion")!;
  const drift = campaigns.find((c) => c.id === "salesloft-drift")!;
  const snowflake = campaigns.find((c) => c.id === "snowflake-c5537")!;
  const today = new Date();

  return (
    <div className="bg-bg-base px-10 py-9">
      <div className="mx-auto max-w-[980px]">
        <div className="no-print mb-6 flex items-center justify-between border-b border-line pb-3">
          <div className="stamp text-[10px] uppercase text-ink-faint">
            Brief · printable
          </div>
          <div className="inline-flex items-center gap-2 border border-line bg-bg-elevated px-3 py-1.5 stamp text-[10px] uppercase text-ink-muted">
            <Printer size={12} strokeWidth={1.5} />
            Print with Cmd-P or Ctrl-P
          </div>
        </div>

        <article className="paper-grain relative border border-line bg-bg-surface px-14 py-12">
          <header className="border-b-2 border-accent-terminal pb-6">
            <div className="flex items-center justify-between stamp text-[10px] uppercase text-ink-faint">
              <span>GLINT · Counter-adversary operations</span>
              <span>
                {formatToday(today)} · {buildInfo.classification}
              </span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink-primary">
              ShinyHunters
            </h1>
            <p className="mt-2 font-display text-lg italic text-ink-secondary">
              Executive intelligence brief
            </p>
            <p className="mt-3 stamp text-[10px] uppercase text-ink-faint">
              Single page summary · public reporting only · for SOC and risk leaders
            </p>
          </header>

          <section className="mt-8 border-l-2 border-accent-amber bg-bg-elevated/30 px-6 py-5">
            <div className="stamp text-[10px] uppercase text-accent-amber">
              Bottom line
            </div>
            <p className="mt-3 text-base leading-relaxed text-ink-primary">
              ShinyHunters is the most consequential identity-driven eCrime
              cluster in the current threat landscape. Active since 2020.
              Three flagship intrusions in 24 months. Snowflake in 2024.
              Salesloft Drift OAuth in 2025. The ongoing Canvas extortion with
              deadline May 12 2026. Their tradecraft is built on stolen
              credentials, OAuth token theft, and helpdesk vishing. Defence
              requires identity controls, not endpoint or network controls.
            </p>
          </section>

          <section className="mt-8 grid grid-cols-4 gap-px bg-line">
            <BriefStat
              label="Cluster age"
              value="6 yrs"
              sub="active since 2020"
            />
            <BriefStat
              label="UNC aliases"
              value={String(shinyhunters.aliases.length)}
              sub="Mandiant clusters"
            />
            <BriefStat
              label="Flagship campaigns"
              value={String(campaigns.length)}
              sub="2024 to 2026"
            />
            <BriefStat
              label="GLINT rules"
              value={String(stats.total)}
              sub={`${stats.production} production`}
            />
          </section>

          <section className="mt-9">
            <div className="stamp text-[10px] uppercase text-ink-faint">
              Three flagship campaigns
            </div>
            <CampaignBlock
              status="historical"
              campaign={snowflake}
              line="Bulk replay of years-old infostealer credentials against Snowflake tenants without enforced MFA. Approximately 165 victim tenants. AT&T, Ticketmaster, and Santander among public confirmations."
            />
            <CampaignBlock
              status="historical"
              campaign={drift}
              line="A public GitHub repo at Salesloft leaked OAuth refresh tokens for the Drift Connected App. The actor replayed those tokens against approximately 760 customer Salesforce orgs. Around 1.5 billion records claimed. Cloudflare, Palo Alto Networks, Zscaler, Tenable named."
            />
            <CampaignBlock
              status="active"
              campaign={headline}
              line="Active extortion against Instructure and the Canvas LMS. Claim of 9,000 institutions and 275M users. Sample data published. Ransom deadline May 12 2026. Vector under investigation."
            />
          </section>

          <section className="mt-9 grid grid-cols-2 gap-px bg-line">
            <ImplBlock
              title="What is true across all three"
              points={[
                "Initial access via valid credentials or stolen OAuth tokens. No exploits, no malware.",
                "Bulk extraction from cloud SaaS data planes. Snowflake, Salesforce, Canvas.",
                "Public extortion on Telegram with parallel BreachForums sales.",
              ]}
            />
            <ImplBlock
              title="What this means for your control plane"
              points={[
                "Enforce MFA and continuous access evaluation on every SaaS surface.",
                "Treat OAuth refresh tokens as long-lived secrets. Rotate, scope, and inventory them.",
                "Run continuous secret scanning against your own public repositories.",
                "Bind every helpdesk identity action to an open ticket, not a phone call.",
              ]}
            />
          </section>

          <section className="mt-9">
            <div className="stamp text-[10px] uppercase text-ink-faint">
              Primary sources
            </div>
            <ul className="mt-3 grid grid-cols-1 gap-x-7 gap-y-1.5 md:grid-cols-2">
              {[
                "cs-2026-gtr",
                "mand-unc5537",
                "mand-unc6395",
                "snowflake-advisory-2024",
                "salesloft-incident",
                "instructure-canvas-statement",
                "krebs-snowflake",
                "krebs-shinyhunters-rebrand",
              ].map((sid) => {
                const s = sourceById(sid);
                if (!s) return null;
                return (
                  <li
                    key={sid}
                    className="text-sm leading-snug text-ink-secondary"
                  >
                    <span className="text-ink-primary">{s.publisher}</span>
                    <span className="text-ink-dim"> · </span>
                    {s.title}
                  </li>
                );
              })}
            </ul>
          </section>

          <footer className="mt-12 border-t border-line/60 pt-4 stamp text-[10px] uppercase text-ink-faint">
            GLINT v{buildInfo.version} · build {buildInfo.build} ·{" "}
            {buildInfo.classification} · {todayIso(today)} · published by{" "}
            <Link href="/about" className="text-accent-terminal">
              Counter-adversary operations
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
}

function BriefStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-bg-surface p-5">
      <div className="stamp text-[10px] uppercase text-ink-faint">{label}</div>
      <div className="mt-2 font-display text-3xl font-semibold tabular text-ink-primary">
        {value}
      </div>
      <div className="mt-1 stamp text-[9px] uppercase text-ink-muted">
        {sub}
      </div>
    </div>
  );
}

function CampaignBlock({
  status,
  campaign,
  line,
}: {
  status: "historical" | "active";
  campaign: { name: string; time_period: string; attribution_aliases: string[] };
  line: string;
}) {
  return (
    <div className="mt-5 border-l-2 border-line pl-6">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={
            "border px-2 py-0.5 stamp text-[10px] uppercase " +
            (status === "active"
              ? "border-accent-crit/50 text-accent-crit"
              : "border-line text-ink-muted")
          }
        >
          {status}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-label text-ink-faint">
          {campaign.time_period}
        </span>
        <span className="text-ink-dim">·</span>
        <span className="font-mono text-[11px] uppercase tracking-label text-ink-secondary">
          {campaign.attribution_aliases.join(", ")}
        </span>
      </div>
      <div className="mt-2 font-display text-lg font-semibold leading-tight text-ink-primary">
        {campaign.name}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{line}</p>
    </div>
  );
}

function ImplBlock({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <div className="bg-bg-surface p-6">
      <div className="stamp text-[10px] uppercase text-ink-faint">{title}</div>
      <ul className="mt-3 space-y-2">
        {points.map((p, i) => (
          <li
            key={i}
            className="flex gap-3 text-sm leading-relaxed text-ink-secondary"
          >
            <span className="font-mono text-[12px] text-accent-terminal">›</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
