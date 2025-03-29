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
  type Node,
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

const nodeTypes = {
  source: SourceNode,
  layer: LayerNode,
};

const edgeTypes = {
  deletable: DeletableEdge,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

let id = 0;
const getId = () => `node_${id++}`;

type DiagramViewProps = {
  setViewMode: (mode: ViewMode) => void;
};

export const DiagramView = ({ setViewMode }: DiagramViewProps) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onConnect: OnConnect = useCallback(
    (connection) => {
      const newEdge: Edge = {
        id: "e" + connection.source + "-" + connection.target,
        source: connection.source,
        target: connection.target,
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
