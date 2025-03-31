import { DnDProvider } from "./stores/DnDProvider";
import { useState } from "react";
import { DiagramView } from "./DiagramView/DiagramView";
import { MapView } from "./MapView";
import { DiagramProvider } from "./stores/DiagramProvider";

export type ViewMode = "diagram" | "map";

// Mock Router
const AppRouter = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("diagram");
  if (viewMode === "diagram") {
    return <DiagramView setViewMode={setViewMode} />;
  }
  if (viewMode === "map") {
    return <MapView setViewMode={setViewMode} />;
  }
  return <p>404 View: {viewMode} not found.</p>;
};

export const App = () => (
  <DiagramProvider>
    <DnDProvider>
      <AppRouter />
    </DnDProvider>
  </DiagramProvider>
);
