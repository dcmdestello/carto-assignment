import { type DragEvent } from "react";
import { useDnD } from "../stores/DnDContext";

import {
  DnDItem,
  DnDItemImage,
  SidebarContainer,
  SidebarDescription,
  SidebarTitleWrapper,
} from "./Sidebar.styles";
import type { CustomNodeType } from "./Nodes";
import { Typography } from "@mui/material";

import sourceNodeImg from "../assets/sourceNode.png";
import intersectionNodeImg from "../assets/intersectionNode.png";
import layerNodeImg from "../assets/layerNode.png";

export const Sidebar = () => {
  const [, setType] = useDnD();

  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: CustomNodeType
  ) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <SidebarContainer>
      <SidebarTitleWrapper>
        <Typography color="primary" fontWeight="bold">
          Nodes
        </Typography>
        <SidebarDescription>Drag these onto the diagram</SidebarDescription>
      </SidebarTitleWrapper>
      <DnDItem
        onDragStart={(event) => {
          onDragStart(event, "source");
        }}
        draggable
      >
        <b>Source Node</b>
        <DnDItemImage src={sourceNodeImg}></DnDItemImage>
      </DnDItem>
      <DnDItem
        onDragStart={(event) => {
          onDragStart(event, "intersection");
        }}
        draggable
      >
        <b>Intersection Node</b>
        <DnDItemImage src={intersectionNodeImg}></DnDItemImage>
      </DnDItem>
      <DnDItem
        onDragStart={(event) => {
          onDragStart(event, "layer");
        }}
        draggable
      >
        <b>Layer Node</b>
        <DnDItemImage src={layerNodeImg}></DnDItemImage>
      </DnDItem>
    </SidebarContainer>
  );
};
