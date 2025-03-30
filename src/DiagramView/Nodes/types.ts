import type { SourceFlowNode } from "./SourceNode";
import type { IntersectionFlowNode } from "./IntersectionNode";
import type { LayerFlowNode } from "./LayerNode";

export type CustomNodeType = "source" | "layer" | "intersection";

export type CustomFlowNode =
  | SourceFlowNode
  | IntersectionFlowNode
  | LayerFlowNode;
