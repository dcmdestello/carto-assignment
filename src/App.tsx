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

const initialNodes = [
  {
    id: "node_0",
    type: "source",
    position: {
      x: 210.16668701171875,
      y: 63,
    },
    data: {
      url: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson",
    },
  },
  {
    id: "node_1",
    type: "source",
    position: {
      x: 202.16668701171875,
      y: 320,
    },
    data: {
      url: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson",
    },
  },
  {
    id: "node_2",
    type: "layer",
    position: {
      x: 785.1666870117188,
      y: 173,
    },
    data: {},
  },
  {
    id: "node_3",
    type: "layer",
    position: {
      x: 806.1666870117188,
      y: 275,
    },
    data: {},
  },
];
const initialEdges = [
  {
    id: "enode_1-node_3",
    source: "node_1",
    target: "node_3",
    sourceHandle: "a",
    targetHandle: "a",
    type: "deletable",
  },
  {
    id: "enode_0-node_2",
    source: "node_0",
    target: "node_2",
    sourceHandle: "a",
    targetHandle: "a",
    type: "deletable",
  },
];

// Mock Router
const AppRouter = () => {
  const nodesState = useNodesState<Node>(initialNodes);
  const edgesState = useEdgesState<Edge>(initialEdges);

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
