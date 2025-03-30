import { Position, type NodeProps, type Node } from "@xyflow/react";

import { BaseNode } from "./BaseNode";
import { SingleConnectionHandle } from "./SingleConnectionHandle";

export const LayerNode = (props: NodeProps<Node<Record<string, never>>>) => {
  return (
    <BaseNode {...props}>
      <div>Layer</div>
      <SingleConnectionHandle type="target" position={Position.Left} id="a" />
    </BaseNode>
  );
};
