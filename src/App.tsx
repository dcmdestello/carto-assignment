import { ReactFlowProvider } from "@xyflow/react";

import { DnDProvider } from "./DnDContext";
import { DiagramView } from "./DiagramView/DiagramView";

export type ViewMode = "diagram" | "map";

const App = () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DiagramView />
    </DnDProvider>
  </ReactFlowProvider>
);

export default App;
