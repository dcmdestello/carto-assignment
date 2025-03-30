import { useRef, useCallback, type DragEvent } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  Panel,
  type Edge,
  type OnConnect,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import "./DiagramView.css";

import { Sidebar } from "./Sidebar";
import { useDnD } from "../DnDContext";
import type { ViewMode } from "../App";
import { SourceNode, LayerNode } from "./Nodes";
import { DeletableEdge } from "./Edges/DeletableEdge";
import { DiagramToolbar } from "./DiagramToolbar/DiagramToolbar";
import { IntersectionNode } from "./Nodes/IntersectionNode";

const nodeTypes = {
  source: SourceNode,
  layer: LayerNode,
  intersection: IntersectionNode,
};

const edgeTypes = {
  deletable: DeletableEdge,
};

let id = 0;
const getId = () => `node_${id++}`;

type DiagramViewProps = {
  setViewMode: (mode: ViewMode) => void;
  nodesState: ReturnType<typeof useNodesState>;
  edgesState: ReturnType<typeof useEdgesState>;
};

export const DiagramView = ({
  setViewMode,
  nodesState,
  edgesState,
}: DiagramViewProps) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = nodesState;
  const [edges, setEdges, onEdgesChange] = edgesState;
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onConnect: OnConnect = useCallback(
    (connection) => {
      const newEdge: Edge = {
        id: "e" + connection.source + "-" + connection.target,
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
        type: "deletable",
      };

      setEdges((edges: Edge[]) => addEdge(newEdge, edges));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }, []);

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, setNodes]
  );

  return (
    <div className="dndflow">
      <Panel position="top-right">
        <DiagramToolbar setViewMode={setViewMode} />
      </Panel>
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          style={{ backgroundColor: "#F7F9FB" }}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};
