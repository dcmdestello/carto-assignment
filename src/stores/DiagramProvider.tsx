import React, { createContext, useContext, ReactNode } from "react";
import {
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react";
import { initialEdges, initialNodes } from "./initialValues";
import type { DeletableFlowEdge } from "../DiagramView/Edges";
import { CustomFlowNode } from "../DiagramView/Nodes";

interface DiagramContextType {
  nodes: CustomFlowNode[];
  setNodes: React.Dispatch<React.SetStateAction<CustomFlowNode[]>>;
  onNodesChange: OnNodesChange<CustomFlowNode>;
  edges: DeletableFlowEdge[];
  setEdges: React.Dispatch<React.SetStateAction<DeletableFlowEdge[]>>;
  onEdgesChange: OnEdgesChange<DeletableFlowEdge>;
}

const DiagramContext = createContext<DiagramContextType | undefined>(undefined);

export const useDiagramNodes = () => {
  const context = useContext(DiagramContext);
  if (!context) {
    throw new Error("useDiagramNodes must be used within a FlowProvider");
  }
  return [context.nodes, context.setNodes, context.onNodesChange] as const;
};

export const useDiagramEdges = () => {
  const context = useContext(DiagramContext);
  if (!context) {
    throw new Error("useDiagramEdges must be used within a FlowProvider");
  }
  return [context.edges, context.setEdges, context.onEdgesChange] as const;
};

interface DiagramProviderProps {
  children: ReactNode;
}

export const DiagramProvider: React.FC<DiagramProviderProps> = ({
  children,
}) => {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<CustomFlowNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] =
    useEdgesState<DeletableFlowEdge>(initialEdges);

  const value = {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
  };

  return (
    <ReactFlowProvider>
      <DiagramContext.Provider value={value}>
        {children}
      </DiagramContext.Provider>
    </ReactFlowProvider>
  );
};
