import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import type { ViewMode } from "../../App";
import { Button } from "@mui/material";

interface DiagramToolbarProps {
  setViewMode: (mode: ViewMode) => void;
}

const FLOW_STORAGE_KEY = "reactFlowState";

export const DiagramToolbar = ({ setViewMode }: DiagramToolbarProps) => {
  const rfInstance = useReactFlow();
  const { setNodes, setEdges, setViewport } = rfInstance;

  const handleSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const handleLoad = useCallback(() => {
    const loadFlowFromStorage = async () => {
      const data = localStorage.getItem(FLOW_STORAGE_KEY);
      if (!data) return;

      const flow = JSON.parse(data);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    loadFlowFromStorage();
  }, [setNodes, setEdges, setViewport]);

  const handleClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button
        onClick={() => {
          handleLoad();
        }}
      >
        Load
      </Button>
      <Button
        onClick={() => {
          handleSave();
        }}
      >
        Save
      </Button>
      <Button
        onClick={() => {
          handleClear();
        }}
      >
        Clear
      </Button>
      <Button
        onClick={() => {
          setViewMode("map");
        }}
        variant="contained"
      >
        Map
      </Button>
    </div>
  );
};
