"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from "reactflow";
import type { GraphEdge, GraphNode } from "@/data/types";
import { CampaignNode, type CampaignNodeData } from "./CampaignNode";
import { IntelDrawer, type DrawerRecord } from "@/components/intel/IntelDrawer";

const nodeTypes = { intel: CampaignNode };

/**
 * Serpentine layout: five nodes per row, alternating direction, so the
 * fifteen-node chain stays legible and the frontier lands bottom-right.
 */
const PER_ROW = 5;
const COL_W = 244;
const ROW_H = 150;

function cellOf(index: number) {
  const row = Math.floor(index / PER_ROW);
  const within = index % PER_ROW;
  const col = row % 2 === 0 ? within : PER_ROW - 1 - within;
  return { row, col };
}

export function CampaignGraph({
  nodes: intelNodes,
  edges: intelEdges,
  records,
}: {
  nodes: GraphNode[];
  edges: GraphEdge[];
  /** intelId -> serialisable record for the drawer */
  records: Record<string, DrawerRecord>;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const cells = useMemo(() => new Map(intelNodes.map((n, i) => [n.id, cellOf(i)])), [intelNodes]);

  const rfNodes = useMemo<Node<CampaignNodeData>[]>(
    () =>
      intelNodes.map((n) => {
        const c = cells.get(n.id) ?? { row: 0, col: 0 };
        return {
          id: n.id,
          type: "intel",
          position: { x: c.col * COL_W, y: c.row * ROW_H },
          data: { node: n, selected: selectedId === n.id, date: records[n.intelId]?.date?.slice(0, 10) },
          draggable: false,
          selectable: true,
        };
      }),
    [intelNodes, cells, records, selectedId]
  );

  const rfEdges = useMemo<Edge[]>(
    () =>
      intelEdges.map((e) => {
        const a = cells.get(e.source) ?? { row: 0, col: 0 };
        const b = cells.get(e.target) ?? { row: 0, col: 0 };
        let sourceHandle = "r";
        let targetHandle = "l";
        if (a.row !== b.row) {
          sourceHandle = "b";
          targetHandle = "t";
        } else if (b.col < a.col) {
          sourceHandle = "ls";
          targetHandle = "rt";
        }
        const toFrontier = intelNodes.find((n) => n.id === e.target)?.kind === "frontier";
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          sourceHandle,
          targetHandle,
          className: `conf-${e.confidence}${toFrontier ? " to-frontier" : ""}`,
          type: "smoothstep",
          markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12 },
        };
      }),
    [intelEdges, intelNodes, cells]
  );

  const onNodeClick = useCallback<NodeMouseHandler>((_, node) => setSelectedId(node.id), []);
  const selected = selectedId ? intelNodes.find((n) => n.id === selectedId) ?? null : null;

  useEffect(() => {
    if (!selectedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId]);

  return (
    <div className="relative">
      <div className="h-[520px] w-full border border-line bg-bg-inset">
        <ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onPaneClick={() => setSelectedId(null)}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          minZoom={0.4}
          maxZoom={1.4}
          panOnScroll
          zoomOnScroll={false}
          nodesConnectable={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#22262e" />
          <Controls showInteractive={false} position="bottom-right" />
        </ReactFlow>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted">
        <span className="inline-flex items-center gap-2"><span className="h-3 w-5 border border-dashed border-line-strong bg-hatch-muted" /> Unknown</span>
        <span className="inline-flex items-center gap-2"><span className="h-px w-5 bg-evidence" /> Verified or high-confidence link</span>
        <span className="inline-flex items-center gap-2"><span className="h-px w-5 bg-assess" /> Moderate</span>
        <span className="inline-flex items-center gap-2"><span className="h-px w-5 border-t border-dashed border-ink-muted" /> Low or unknown link</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-5 border border-crit bg-crit-faint" /> Current frontier</span>
        <span className="ml-auto">Click a node for its record and its links. Read left to right, then down; the chain ends at the frontier.</span>
      </div>
      {selected && (
        <IntelDrawer
          node={selected}
          record={records[selected.intelId]}
          related={(selected.relatedNodeIds ?? []).map((id) => intelNodes.find((n) => n.id === id)).filter((n): n is GraphNode => Boolean(n))}
          links={intelEdges
            .filter((e) => e.source === selected.id || e.target === selected.id)
            .map((e) => ({
              edge: e,
              other: intelNodes.find((n) => n.id === (e.source === selected.id ? e.target : e.source)),
              outgoing: e.source === selected.id,
            }))}
          onSelect={(id) => setSelectedId(id)}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
