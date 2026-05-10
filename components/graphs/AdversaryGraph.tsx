"use client";

import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MarkerType,
  Position,
  type Node,
  type Edge,
  type NodeProps,
  type OnSelectionChangeParams,
} from "reactflow";
import {
  adversaryGraphEdges,
  adversaryGraphEntities,
  type RelatedEntityNode,
} from "@/data/adversaries";
import { cn, entityTypeToken } from "@/lib/utils";

type Layout = { x: number; y: number };

const layout: Record<string, Layout> = {
  // center
  shinyhunters: { x: 0, y: 0 },
  // alias ring (inner left)
  unc5537: { x: -280, y: -160 },
  unc6040: { x: -320, y: -10 },
  unc6395: { x: -280, y: 140 },
  // affiliates (top right)
  "scattered-spider": { x: 260, y: -200 },
  lapsus: { x: 320, y: -60 },
  // victims (right cluster)
  att: { x: -540, y: -180 },
  ticketmaster: { x: -560, y: -40 },
  santander: { x: -540, y: 80 },
  cloudflare: { x: 540, y: 60 },
  paloalto: { x: 580, y: 180 },
  zscaler: { x: 480, y: 280 },
  instructure: { x: 200, y: 320 },
};

function EntityNodeView({ data }: NodeProps<RelatedEntityNode>) {
  const tok = entityTypeToken(data.type);
  const isCenter = data.id === "shinyhunters";
  return (
    <div
      className={cn(
        "relative min-w-[140px] border bg-bg-surface px-3 py-2 transition-all",
        tok.border,
        isCenter && "min-w-[180px]"
      )}
    >
      {isCenter && (
        <span className="pointer-events-none absolute -inset-px border border-accent-crit/40" />
      )}
      <Handle
        type="target"
        position={Position.Top}
        className="!h-1 !w-1 !border-0 !bg-line-strong"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-1 !w-1 !border-0 !bg-line-strong"
      />
      <div className="flex items-center gap-2">
        <span className={cn("h-1.5 w-1.5", tok.dot)} />
        <span
          className={cn(
            "font-mono text-[9px] uppercase tracking-widest",
            tok.color
          )}
        >
          {tok.label}
        </span>
        {isCenter && (
          <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-accent-crit">
            Tracked
          </span>
        )}
      </div>
      <div
        className={cn(
          "mt-1 font-medium text-ink-primary",
          isCenter ? "text-[15px]" : "text-[13px]"
        )}
      >
        {data.label}
      </div>
      {isCenter && (
        <div className="mt-1 font-mono text-2xs text-ink-faint">
          ShinyHunters · 1 cluster
        </div>
      )}
    </div>
  );
}

const nodeTypes = { entity: EntityNodeView };

export function AdversaryGraph({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  const nodes: Node<RelatedEntityNode>[] = useMemo(
    () =>
      adversaryGraphEntities.map((e) => ({
        id: e.id,
        type: "entity",
        position: layout[e.id] ?? { x: 0, y: 0 },
        data: e,
        draggable: false,
      })),
    []
  );

  const edges: Edge[] = useMemo(
    () =>
      adversaryGraphEdges.map((e) => ({
        id: `${e.source}-${e.target}`,
        source: e.source,
        target: e.target,
        label: e.label,
        labelStyle: {},
        labelBgStyle: { fill: "#0a0e1a" },
        labelBgPadding: [4, 2],
        className: `weight-${e.weight}`,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: e.weight === 3 ? "#00ff88" : e.weight === 2 ? "#4d9fff" : "#2b3a55",
          width: 12,
          height: 12,
        },
      })),
    []
  );

  const handleSelectionChange = useCallback(
    (p: OnSelectionChangeParams) => {
      if (p.nodes && p.nodes.length > 0) {
        onSelect(p.nodes[0].id);
      }
    },
    [onSelect]
  );

  const handleNodeClick = useCallback(
    (_e: any, node: Node) => {
      onSelect(node.id);
    },
    [onSelect]
  );

  return (
    <ReactFlow
      nodes={nodes.map((n) => ({
        ...n,
        selected: n.id === selected,
      }))}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodeClick={handleNodeClick}
      onSelectionChange={handleSelectionChange}
      fitView
      fitViewOptions={{ padding: 0.18, includeHiddenNodes: false }}
      nodesDraggable={false}
      nodesConnectable={false}
      proOptions={{ hideAttribution: true }}
      minZoom={0.4}
      maxZoom={1.6}
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={24}
        size={1}
        color="#1f2a3f"
      />
      <Controls
        position="bottom-right"
        showInteractive={false}
        className="!border !border-line"
      />
    </ReactFlow>
  );
}
