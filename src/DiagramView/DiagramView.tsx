import { useCallback, type DragEvent } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  Panel,
  type OnConnect,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { Sidebar } from "./Sidebar";
import { useDnD } from "../DnDContext";
import type { ViewMode } from "../App";
import { SourceNode, LayerNode, IntersectionNode } from "./Nodes";
import { DeletableEdge, DeletableFlowEdge } from "./Edges/DeletableEdge";
import { DiagramToolbar } from "./DiagramToolbar/DiagramToolbar";
import { DiagramViewContainer } from "./DiagramView.styles";
import { CustomFlowNode } from "./Nodes/types";

const nodeTypes = {
  source: SourceNode,
  layer: LayerNode,
  intersection: IntersectionNode,
};

const edgeTypes = {
  deletable: DeletableEdge,
};

// t0 to prevent name collisions with nodes loaded from storage
const t0 = Date.now();
let id = 0;
const getId = () => `node_${id++}_${t0}`;

type DiagramViewProps = {
  setViewMode: (mode: ViewMode) => void;
  nodesState: ReturnType<typeof useNodesState<CustomFlowNode>>;
  edgesState: ReturnType<typeof useEdgesState<DeletableFlowEdge>>;
};

export const DiagramView = ({
  setViewMode,
  nodesState,
  edgesState,
}: DiagramViewProps) => {
  const [nodes, setNodes, onNodesChange] = nodesState;
  const [edges, setEdges, onEdgesChange] = edgesState;
  const { screenToFlowPosition } = useReactFlow();
  const [dragType] = useDnD();

  const onConnect: OnConnect = useCallback(
    (connection) => {
      const newEdge: DeletableFlowEdge = {
        id: "e" + connection.source + "-" + connection.target,
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
        type: "deletable",
      };

      setEdges((edges) => addEdge(newEdge, edges));
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

      if (!dragType) {
        return;
      }

      const type = dragType as CustomFlowNode["type"];

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode: CustomFlowNode = {
        id: getId(),
        type,
        position,
        data: {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, dragType, setNodes]
  );

  return (
    <DiagramViewContainer>
      <Panel position="top-right">
        <DiagramToolbar setViewMode={setViewMode} />
      </Panel>
      <Sidebar />
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
    </DiagramViewContainer>
  );
};
