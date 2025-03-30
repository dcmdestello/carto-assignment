import { Position, type NodeProps, type Node } from "@xyflow/react";

import { BaseNode } from "./BaseNode";
import { SingleConnectionHandle } from "./SingleConnectionHandle";

export type LayerFlowNode = Node<Record<string, never>, "layer">;

export const LayerNode = (props: NodeProps<LayerFlowNode>) => {
  return (
    <BaseNode {...props}>
      <div>Layer</div>
      <SingleConnectionHandle type="target" position={Position.Left} id="a" />
    </BaseNode>
  );
};
