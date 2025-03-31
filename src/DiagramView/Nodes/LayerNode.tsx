import { Position, type NodeProps, type Node } from "@xyflow/react";

import { BaseCustomNode } from "./BaseCustomNode";
import { SingleConnectionHandle } from "./SingleConnectionHandle";
import { BigNodeLabel } from "./BaseCustomNode.styles";

export type LayerFlowNode = Node<Record<string, never>, "layer">;

export const LayerNode = (props: NodeProps<LayerFlowNode>) => {
  return (
    <BaseCustomNode {...props}>
      <BigNodeLabel>Layer</BigNodeLabel>
      <SingleConnectionHandle type="target" position={Position.Left} id="a" />
    </BaseCustomNode>
  );
};
