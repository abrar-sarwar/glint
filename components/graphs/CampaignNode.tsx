"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import type { GraphNode } from "@/data/types";
import { cn, confidenceToken, statusToken } from "@/lib/utils";

const kindLabel: Record<GraphNode["kind"], string> = {
  unknown: "Initial access",
  access: "Access",
  material: "Material",
  identity: "Identity",
  campaign: "Campaign",
  drop: "Releases",
  intel: "Map and features",
  manifesto: "Manifesto",
  token: "Token",
  distribution: "Distribution",
  media: "Media",
  legal: "Legal",
  platform: "Platform",
  response: "Rockstar",
  frontier: "Current frontier",
};

export type CampaignNodeData = { node: GraphNode; selected: boolean; date?: string };

function CampaignNodeInner({ data }: NodeProps<CampaignNodeData>) {
  const { node, selected, date } = data;
  const conf = confidenceToken(node.confidence);
  const status = statusToken(node.status);
  const isUnknown = node.kind === "unknown";
  const isFrontier = node.kind === "frontier";

  return (
    <div
      className={cn(
        "w-[204px] border bg-bg-surface px-3.5 py-3 text-left transition-colors",
        isUnknown && "border-dashed border-line-strong bg-hatch-muted",
        isFrontier && "border-crit bg-crit-faint animate-frontier-ring",
        !isUnknown && !isFrontier && "border-line hover:border-line-strong",
        selected && "border-ink-primary"
      )}
    >
      <Handle id="l" type="target" position={Position.Left} className="!opacity-0" />
      <Handle id="t" type="target" position={Position.Top} className="!opacity-0" />
      <Handle id="rt" type="target" position={Position.Right} className="!opacity-0" />
      <div className={cn("label", isFrontier ? "text-crit" : isUnknown ? "text-ink-muted" : "text-ink-faint")}>
        {kindLabel[node.kind]}
      </div>
      <div
        className={cn(
          "mt-1.5 text-[15px] font-semibold leading-snug",
          isFrontier ? "text-crit" : isUnknown ? "text-ink-secondary" : "text-ink-primary"
        )}
      >
        {node.label}
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className={cn("inline-flex items-center gap-1 font-mono text-[11px] tracking-label-tight", conf.color)}>
          <span className={cn("h-1.5 w-1.5", conf.dot)} />
          {isUnknown ? "No evidence" : conf.label}
        </span>
        {node.status !== "supported" && !isFrontier && !isUnknown && (
          <span className={cn("font-mono text-[11px] tracking-label-tight", status.color, status.strike && "strike")}>
            {status.label}
          </span>
        )}
      </div>
      {date && !isUnknown && <div className="mt-1.5 font-mono text-[11px] text-ink-faint">{date}</div>}
      <Handle id="r" type="source" position={Position.Right} className="!opacity-0" />
      <Handle id="b" type="source" position={Position.Bottom} className="!opacity-0" />
      <Handle id="ls" type="source" position={Position.Left} className="!opacity-0" />
    </div>
  );
}

export const CampaignNode = memo(CampaignNodeInner);
