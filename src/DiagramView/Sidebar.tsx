import { type DragEvent } from "react";
import { useDnD } from "../DnDContext";

import {
  DnDItem,
  SidebarContainer,
  SidebarDescription,
} from "./Sidebar.styles";

type NodeType =
  | "input"
  | "default"
  | "output"
  | "source"
  | "layer"
  | "intersection";

export const Sidebar = () => {
  const [, setType] = useDnD();

  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: NodeType
  ) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <SidebarContainer>
      <SidebarDescription>Drag these nodes onto the diagram</SidebarDescription>
      <DnDItem
        onDragStart={(event) => {
          onDragStart(event, "source");
        }}
        draggable
      >
        Source Node
      </DnDItem>
      <DnDItem
        onDragStart={(event) => {
          onDragStart(event, "layer");
        }}
        draggable
      >
        Layer Node
      </DnDItem>
      <DnDItem
        onDragStart={(event) => {
          onDragStart(event, "intersection");
        }}
        draggable
      >
        Intersection Node
      </DnDItem>
    </SidebarContainer>
  );
};
