import { useCallback } from "react";
import { ReactFlowJsonObject, useReactFlow } from "@xyflow/react";
import type { ViewMode } from "../../App";
import { Button } from "@mui/material";
import { DiagramToolbarContainer } from "./DiagramToolbar.styles";

interface DiagramToolbarProps {
  setViewMode: (mode: ViewMode) => void;
}

const FLOW_STORAGE_KEY = "reactFlowState";

export const DiagramToolbar = ({ setViewMode }: DiagramToolbarProps) => {
  const rfInstance = useReactFlow();
  const { setNodes, setEdges, setViewport } = rfInstance;

  const handleSave = useCallback(() => {
    const flow = rfInstance.toObject();
    localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(flow));
  }, [rfInstance]);

  const handleLoad = useCallback(() => {
    const loadFlowFromStorage = () => {
      const data = localStorage.getItem(FLOW_STORAGE_KEY);
      if (!data) return;

      const flow = JSON.parse(data) as ReactFlowJsonObject;

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
    <DiagramToolbarContainer>
      <Button
        size="small"
        onClick={() => {
          handleLoad();
        }}
      >
        Load
      </Button>
      <Button
        size="small"
        onClick={() => {
          handleSave();
        }}
      >
        Save
      </Button>
      <Button
        size="small"
        onClick={() => {
          handleClear();
        }}
      >
        Clear
      </Button>
      <Button
        size="small"
        onClick={() => {
          setViewMode("map");
        }}
        variant="contained"
      >
        Map
      </Button>
    </DiagramToolbarContainer>
  );
};
