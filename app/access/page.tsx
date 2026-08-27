import type { Metadata } from "next";
import Link from "next/link";
import { hypotheses } from "@/data/hypotheses";
import { claims } from "@/data/claims";
import { PageHeader, Section } from "@/components/ui/Page";
import { ClaimStatusPill, ConfidencePill, Chip, IdTag } from "@/components/ui/Pills";
import { Cites } from "@/components/intel/SourceDrawer";

export const metadata: Metadata = { title: "Initial access" };

const originLabel: Record<string, string> = {
  "credible-reporting": "Credible reporting",
  community: "Community",
  actor: "Actor",
  analyst: "Analyst hypothesis",
};

export default function AccessPage() {
  const accessClaims = claims.filter((c) => c.category === "access");
  return (
    <div className="px-8 py-8">
      <PageHeader kicker="Initial access" title="How did CyberLeek get GTA VI?" />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="border border-dashed border-line-strong bg-hatch-muted px-8 py-8">
          <div className="label">Status</div>
          <div className="mt-3 text-6xl font-semibold tracking-tight text-ink-primary md:text-[88px] md:leading-[84px]">UNKNOWN</div>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-secondary">
            No court filing, company statement, or credible report explains how the build was obtained. That gap is itself a finding. LEEK will not draw an attack chain the evidence does not support.
          </p>
        </div>
        <dl className="divide-y divide-line border border-line bg-bg-surface">
          <div className="px-6 py-4">
            <dt className="label text-evidence">What we know</dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-ink-primary">
              CyberLeek demonstrated interactive control of a GTA VI development build on 2026-08-20, when a clip ended with the player shooting the word LEEK into a wall. In-game music dates the build to 2025 or later. Rockstar acknowledged the leaked gameplay videos on 2026-08-26. <Cites ids={["LEEK-SRC-022", "LEEK-SRC-025", "LEEK-SRC-026", "LEEK-SRC-007"]} />
            </dd>
          </div>
          <div className="px-6 py-4">
            <dt className="label text-crit">What we do not know</dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-ink-primary">
              Where the build came from, on what hardware it runs, whether anyone inside Rockstar or a partner was involved, and whether any access persists. Take-Two&rsquo;s petitions seek identities from platforms; they do not describe a mechanism. <Cites ids={["LEEK-SRC-002", "LEEK-SRC-004"]} />
            </dd>
          </div>
          <div className="px-6 py-4">
            <dt className="label text-assess">Working hypotheses</dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-ink-primary">
              {hypotheses.length} hypotheses are tracked below. Only those raised in credible reporting are listed under their origin; the rest are labelled analyst hypotheses. None rises above moderate confidence.
            </dd>
          </div>
          <div className="px-6 py-4">
            <dt className="label">What would change this assessment</dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-ink-primary">
              A court filing or company statement describing provenance, a credible outlet reporting forensic build metadata, a platform response that identifies the account holder, or an arrest with charging documents.
            </dd>
          </div>
        </dl>
      </div>

      <Section kicker="Analysis matrix" title="Hypotheses against the evidence" description="Supporting and contradicting evidence are listed side by side. A hypothesis with no contradicting evidence is not therefore likely; most have very little evidence either way.">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] border-collapse text-left">
            <thead>
              <tr className="label border-b border-line">
                <th className="py-3 pr-4 font-normal">Hypothesis</th>
                <th className="py-3 pr-4 font-normal">Supporting evidence</th>
                <th className="py-3 pr-4 font-normal">Contradicting evidence</th>
                <th className="py-3 pr-4 font-normal">Confidence</th>
                <th className="py-3 pr-4 font-normal">What would confirm it</th>
                <th className="py-3 font-normal">Sources</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line align-top">
              {hypotheses.map((h) => (
                <tr key={h.id} id={h.id} className="scroll-mt-6">
                  <td className="w-[240px] py-5 pr-4">
                    <div className="flex flex-wrap items-center gap-2"><Chip tone={h.origin === "analyst" ? "assess" : h.origin === "actor" ? "claim" : "neutral"}>{originLabel[h.origin]}</Chip><IdTag id={h.id} /></div>
                    <div className="mt-2 text-[15px] font-semibold leading-snug text-ink-primary">{h.title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{h.summary}</p>
                    {h.attack && h.attack.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{h.attack.map((t) => <Chip key={t} tone="info">{t}</Chip>)}</div>}
                  </td>
                  <td className="w-[260px] py-5 pr-4">
                    <ul className="flex flex-col gap-2 text-sm leading-relaxed text-ink-secondary">
                      {h.supportingEvidence.length === 0 && <li className="text-ink-faint">None in the public record.</li>}
                      {h.supportingEvidence.map((s, i) => <li key={i}><span className="mr-1.5 text-evidence">+</span>{s}</li>)}
                    </ul>
                  </td>
                  <td className="w-[260px] py-5 pr-4">
                    <ul className="flex flex-col gap-2 text-sm leading-relaxed text-ink-secondary">
                      {h.contradictingEvidence.length === 0 && <li className="text-ink-faint">None in the public record.</li>}
                      {h.contradictingEvidence.map((s, i) => <li key={i}><span className="mr-1.5 text-crit">-</span>{s}</li>)}
                    </ul>
                  </td>
                  <td className="py-5 pr-4"><ConfidencePill confidence={h.confidence} /></td>
                  <td className="w-[240px] py-5 pr-4 text-sm leading-relaxed text-ink-secondary">{h.whatWouldConfirm}</td>
                  <td className="py-5"><Cites ids={h.sourceIds} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section kicker="Claim registry" title="Access claims and their status">
        <ul className="divide-y divide-line border-y border-line">
          {accessClaims.map((c) => (
            <li key={c.id} className="flex flex-wrap items-start gap-3 py-3">
              <ClaimStatusPill status={c.status} className="mt-0.5" />
              <Link href={`/claims#${c.id}`} className="flex-1 text-[15px] text-ink-secondary hover:text-ink-primary">{c.statement}</Link>
              <IdTag id={c.id} />
            </li>
          ))}
        </ul>
      </Section>

      <div className="mt-10 border border-line px-5 py-4 text-sm leading-relaxed text-ink-muted">
        This page is defensive analysis. It does not describe how to obtain development builds, bypass controls, or reproduce any intrusion, and nothing here should be read as instruction.
      </div>
    </div>
  );
}
