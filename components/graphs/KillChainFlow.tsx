"use client";

import { useCallback, useMemo } from "react";
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
} from "reactflow";
import type { KillChainStage } from "@/data/campaigns";
import { cn } from "@/lib/utils";

interface KillChainNodeData extends KillChainStage {
  selected: boolean;
}

function KillChainNodeView({ data }: NodeProps<KillChainNodeData>) {
  return (
    <div
      className={cn(
        "relative w-[212px] border bg-bg-surface px-3 py-2.5 transition-colors",
        data.selected
          ? "border-accent-terminal"
          : "border-line hover:border-line-strong"
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!h-1 !w-1 !border-0 !bg-line-strong"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!h-1 !w-1 !border-0 !bg-line-strong"
      />
      <div className="flex items-center gap-2">
        <span className="font-mono text-2xs text-ink-faint">
          {String(data.step).padStart(2, "0")}
        </span>
        <span className="border border-line bg-bg-elevated px-1 py-px font-mono text-2xs text-accent-terminal">
          {data.mitre_id}
        </span>
        {data.detection_id && (
          <span className="ml-auto h-1.5 w-1.5 bg-accent-terminal" title="Detection mapped" />
        )}
      </div>
      <div className="mt-1.5 line-clamp-2 text-[13px] font-medium text-ink-primary">
        {data.stage_label}
      </div>
      <div className="mt-0.5 font-mono text-2xs text-ink-faint">
        {data.technique_name}
      </div>
    </div>
  );
}

const nodeTypes = { stage: KillChainNodeView };

export function KillChainFlow({
  stages,
  selectedStep,
  onSelect,
}: {
  stages: KillChainStage[];
  selectedStep: number;
  onSelect: (step: number) => void;
}) {
  const COL_WIDTH = 240;
  const ROW = 0;

  const nodes: Node<KillChainNodeData>[] = useMemo(
    () =>
      stages.map((s, i) => ({
        id: String(s.step),
        type: "stage",
        position: { x: i * COL_WIDTH, y: ROW },
        data: { ...s, selected: s.step === selectedStep },
        draggable: false,
      })),
    [stages, selectedStep]
  );

  const edges: Edge[] = useMemo(
    () =>
      stages.slice(0, -1).map((s, i) => {
        const next = stages[i + 1];
        return {
          id: `${s.step}-${next.step}`,
          source: String(s.step),
          target: String(next.step),
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#00ff88",
            width: 12,
            height: 12,
          },
          className: "weight-3",
          animated: false,
        };
      }),
    [stages]
  );

  const handleNodeClick = useCallback(
    (_e: any, node: Node) => {
      onSelect(parseInt(node.id, 10));
    },
    [onSelect]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodeClick={handleNodeClick}
      fitView
      fitViewOptions={{ padding: 0.15 }}
      nodesDraggable={false}
      nodesConnectable={false}
      proOptions={{ hideAttribution: true }}
      minZoom={0.5}
      maxZoom={1.4}
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={20}
        size={1}
        color="#162033"
      />
      <Controls
        position="bottom-right"
        showInteractive={false}
        className="!border !border-line"
      />
    </ReactFlow>
  );
}
