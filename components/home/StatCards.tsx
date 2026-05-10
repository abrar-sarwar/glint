import { ExternalLink } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  unit: string;
  context: string;
  source_label: string;
  source_url: string;
}

const stats: Stat[] = [
  {
    label: "Malware-free detections",
    value: "82",
    unit: "%",
    context:
      "Share of CrowdStrike detections in 2025 that were malware-free, indicating identity-based or hands-on-keyboard intrusions.",
    source_label: "CrowdStrike Falcon Adversary OverWatch (May 2026)",
    source_url: "https://www.crowdstrike.com/press-releases/",
  },
  {
    label: "Tracked adversaries",
    value: "280",
    unit: "+",
    context:
      "Distinct named adversaries tracked by CrowdStrike Counter Adversary Operations across all motivations.",
    source_label: "CrowdStrike Falcon Adversary OverWatch (May 2026)",
    source_url: "https://www.crowdstrike.com/press-releases/",
  },
  {
    label: "Events analysed daily",
    value: "6.2",
    unit: "trillion",
    context:
      "Telemetry volume CrowdStrike processes per day to surface adversary activity and produce intel.",
    source_label: "CrowdStrike Falcon Adversary OverWatch (May 2026)",
    source_url: "https://www.crowdstrike.com/press-releases/",
  },
];

export function StatCards() {
  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-line pb-2.5">
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink-primary">
          Threat indicators
        </h2>
        <div className="stamp text-[10px] uppercase text-ink-faint">
          Every figure cited
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-px bg-line md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-bg-surface p-5">
            <div className="stamp text-[9px] uppercase text-ink-faint">
              {s.label}
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="font-display text-3xl font-semibold tabular leading-none text-ink-primary">
                {s.value}
              </span>
              <span className="font-mono text-sm uppercase tracking-label text-ink-muted">
                {s.unit}
              </span>
            </div>
            <p className="mt-2.5 text-[13px] leading-snug text-ink-muted">
              {s.context}
            </p>
            <a
              href={s.source_url}
              target="_blank"
              rel="noreferrer"
              className="group mt-3 inline-flex items-center gap-1.5 stamp text-[9px] uppercase text-ink-faint hover:text-accent-terminal"
            >
              <ExternalLink size={9} strokeWidth={1.6} />
              {s.source_label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
