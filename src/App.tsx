import {
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  type Node,
  type Edge,
} from "@xyflow/react";

import { DnDProvider } from "./DnDContext";
import { useState } from "react";
import { DiagramView } from "./DiagramView/DiagramView";
import { MapView } from "./MapView";

export type ViewMode = "diagram" | "map";

import "./App.css";

// Mock Router
const AppRouter = () => {
  const nodesState = useNodesState<Node>([]);
  const edgesState = useEdgesState<Edge>([]);

  const [viewMode, setViewMode] = useState<ViewMode>("diagram");
  if (viewMode === "diagram") {
    return (
      <DiagramView
        setViewMode={setViewMode}
        nodesState={nodesState}
        edgesState={edgesState}
      />
    );
  }
  if (viewMode === "map") {
    return (
      <MapView
        setViewMode={setViewMode}
        nodes={nodesState[0]}
        edges={edgesState[0]}
      />
    );
  }
  return <p>404 View: {viewMode} not found.</p>;
};

const App = () => (
  <ReactFlowProvider>
    <DnDProvider>
      <AppRouter />
    </DnDProvider>
  </ReactFlowProvider>
);

export default App;
