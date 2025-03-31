import { DnDProvider } from "./stores/DnDContext";
import { useState } from "react";
import { DiagramView } from "./DiagramView/DiagramView";
import { MapView } from "./MapView";
import {
  DiagramProvider,
  useDiagramEdges,
  useDiagramNodes,
} from "./stores/DiagramProvider";

export type ViewMode = "diagram" | "map";

// Mock Router
const AppRouter = () => {
  const [nodes] = useDiagramNodes();
  const [edges] = useDiagramEdges();

  const [viewMode, setViewMode] = useState<ViewMode>("diagram");
  if (viewMode === "diagram") {
    return <DiagramView setViewMode={setViewMode} />;
  }
  if (viewMode === "map") {
    return <MapView setViewMode={setViewMode} nodes={nodes} edges={edges} />;
  }
  return <p>404 View: {viewMode} not found.</p>;
};

const App = () => (
  <DiagramProvider>
    <DnDProvider>
      <AppRouter />
    </DnDProvider>
  </DiagramProvider>
);

export default App;
