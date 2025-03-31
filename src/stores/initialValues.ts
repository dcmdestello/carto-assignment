import type { DeletableFlowEdge } from "../DiagramView/Edges";
import type { SourceFlowNode, LayerFlowNode } from "../DiagramView/Nodes";

export const initialNodes = [
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
  } as SourceFlowNode,
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
  } as SourceFlowNode,
  {
    id: "initial-node_2",
    type: "layer",
    position: {
      x: 800,
      y: 175,
    },
    data: {},
  } as LayerFlowNode,
  {
    id: "initial-node_3",
    type: "layer",
    position: {
      x: 800,
      y: 275,
    },
    data: {},
  } as LayerFlowNode,
];

export const initialEdges = [
  {
    id: "edge-initial-node_1-initial-node_3",
    source: "initial-node_1",
    target: "initial-node_3",
    sourceHandle: "a",
    targetHandle: "a",
    type: "deletable",
  } as DeletableFlowEdge,
  {
    id: "edge-initial-node_0-initial-node_2",
    source: "initial-node_0",
    target: "initial-node_2",
    sourceHandle: "a",
    targetHandle: "a",
    type: "deletable",
  } as DeletableFlowEdge,
];
