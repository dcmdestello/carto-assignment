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

const initialNodes = [
  {
    id: "initial-node_0",
    type: "source",
    position: {
      x: 200,
      y: 60,
    },
    data: {
      url: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson",
    },
  },
  {
    id: "initial-node_1",
    type: "source",
    position: {
      x: 200,
      y: 320,
    },
    data: {
      url: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson",
    },
  },
  {
    id: "initial-node_2",
    type: "layer",
    position: {
      x: 800,
      y: 175,
    },
    data: {},
  },
  {
    id: "initial-node_3",
    type: "layer",
    position: {
      x: 800,
      y: 275,
    },
    data: {},
  },
];
const initialEdges = [
  {
    id: "edge-initial-node_1-initial-node_3",
    source: "initial-node_1",
    target: "initial-node_3",
    sourceHandle: "a",
    targetHandle: "a",
    type: "deletable",
  },
  {
    id: "edge-initial-node_0-initial-node_2",
    source: "initial-node_0",
    target: "initial-node_2",
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
