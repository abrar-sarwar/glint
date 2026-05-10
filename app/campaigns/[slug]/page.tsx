import { notFound } from "next/navigation";
import { campaigns, campaignBySlug } from "@/data/campaigns";
import { CampaignDeepDive } from "@/components/campaign/CampaignDeepDive";

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = campaignBySlug(params.slug);
  if (!c) return { title: "Campaign · GLINT" };
  return {
    title: `${c.name} · GLINT`,
    description: c.summary,
  };
}

export default function CampaignPage({ params }: { params: { slug: string } }) {
  const campaign = campaignBySlug(params.slug);
  if (!campaign) notFound();
  return <CampaignDeepDive campaign={campaign} />;
}
