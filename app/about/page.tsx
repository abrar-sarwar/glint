import { ExternalLink } from "lucide-react";
import { sources } from "@/data/sources";
import { buildInfo } from "@/lib/utils";

export default function AboutPage() {
  const grouped = sources.reduce<Record<string, typeof sources>>((acc, s) => {
    if (!acc[s.type]) acc[s.type] = [];
    acc[s.type].push(s);
    return acc;
  }, {});

  return (
    <div className="px-8 py-8">
      <div className="mx-auto max-w-[920px]">
        <div className="border-b border-line pb-5">
          <div className="stamp text-[10px] uppercase text-ink-faint">
            About
          </div>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-primary">
            How GLINT is built
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
            A focused intel product on a single threat actor, drawn entirely
            from public reporting.
          </p>
        </div>

        {/* Data Provenance */}
        <section
          id="data-provenance"
          className="mt-8 border border-line bg-bg-elevated/40 p-6"
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-accent-terminal" />
            <span className="stamp text-[10px] uppercase text-accent-terminal">
              Data provenance
            </span>
          </div>
          <h2 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink-primary">
            How to read what is in this product
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink-secondary">
            <p>
              GLINT's threat actor profiles, campaign data, and victim lists
              are sourced from public breach disclosures, vendor security
              advisories, investigative journalism, and threat intelligence
              vendor reports. Every campaign and named victim cites a primary
              source.
            </p>
            <p>
              Detection rules and hunt hypotheses are a mix of adaptations
              from public detection libraries (SigmaHQ, Splunk Security
              Content, Elastic detection-rules) and original research
              authored against documented ShinyHunters TTPs. Original rules
              are labelled as such in their detail panel.
            </p>
            <p>
              The synthetic activity feed and synthetic IOCs are clearly
              labelled. No fabricated indicators are presented as real.
            </p>
            <p className="border-t border-line/60 pt-3 text-sm text-ink-muted">
              Some source URLs are best-effort references to the publisher and
              headline rather than verified deep links. Those entries are
              flagged{" "}
              <span className="font-mono text-accent-amber">
                needs_url_verification
              </span>{" "}
              in the underlying data and are pending manual audit. Same for
              dates that were approximations, flagged{" "}
              <span className="font-mono text-accent-amber">
                needs_date_verification
              </span>
              .
            </p>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-7 lg:grid-cols-2">
          <Article
            title="Scope"
            body="GLINT is a focused dossier on the ShinyHunters cluster and three of its flagship campaigns. It is not a TIP and it is not a SIEM. The product surfaces the analytic workflow a small detection-engineering team would use when monitoring a named adversary across multiple intrusions."
          />
          <Article
            title="Sources"
            body="Every claim is anchored to a primary source. Vendor disclosures from Snowflake, Salesloft, Salesforce, and Instructure. Mandiant UNC cluster attributions. CrowdStrike Counter Adversary Operations. Krebs on Security. Intel 471. MITRE ATT&CK. Citations live in /data/sources.ts and are referenced by id throughout."
          />
          <Article
            title="Indicators of compromise"
            body={
              <>
                Real IOCs are surfaced only when they appear in primary
                reporting. They are tagged{" "}
                <span className="font-mono text-accent-terminal">OBSERVED</span>
                . Synthetic IOCs used to illustrate the shape of an indicator
                are tagged{" "}
                <span className="font-mono text-accent-amber">SYNTHETIC</span>{" "}
                and use obviously fake values like RFC 1918 ranges and .example
                domains. Synthetic IOCs are never published as actionable.
              </>
            }
          />
          <Article
            title="Detection rules"
            body="Three rules are fully built across Sigma, CrowdStrike Falcon LogScale CQL, and Splunk SPL. Salesforce Bulk API mass export. Snowflake new-ASN login followed by external-stage unload. Non-corporate OAuth consent. The remainder are stubbed with metadata sufficient to populate the rule library and the ATT&CK heatmap."
          />
        </section>

        <section className="mt-10">
          <h2 className="border-b border-line pb-2 text-xl font-semibold tracking-tight text-ink-primary">
            Citation registry
          </h2>

          <div className="mt-5 space-y-7">
            {Object.entries(grouped).map(([type, items]) => (
              <div key={type}>
                <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
                  {type.replace(/-/g, " ")}
                </div>
                <ul className="mt-3 grid grid-cols-1 gap-px bg-line md:grid-cols-2">
                  {items.map((s) => (
                    <li key={s.id} className="bg-bg-surface p-3.5">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-start gap-2.5"
                      >
                        <ExternalLink
                          size={12}
                          strokeWidth={1.5}
                          className="mt-1 shrink-0 text-ink-faint group-hover:text-accent-terminal"
                        />
                        <div className="min-w-0">
                          <div className="text-sm leading-snug text-ink-primary group-hover:text-accent-terminal">
                            {s.title}
                          </div>
                          <div className="mt-1 font-mono text-[10px] uppercase tracking-label text-ink-faint">
                            {s.publisher} · {s.date}
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-12 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-label text-ink-faint">
          GLINT v{buildInfo.version} · build {buildInfo.build} ·{" "}
          {buildInfo.classification} · {buildInfo.programLine}
        </footer>
      </div>
    </div>
  );
}

function Article({
  title,
  body,
}: {
  title: string;
  body: React.ReactNode;
}) {
  return (
    <article>
      <div className="font-mono text-[10px] uppercase tracking-label text-ink-faint">
        {title}
      </div>
      <p className="mt-2 text-base leading-relaxed text-ink-secondary">
        {body}
      </p>
    </article>
  );
}
