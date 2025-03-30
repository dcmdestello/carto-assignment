import { Position, type NodeProps, type Node } from "@xyflow/react";

import { BaseNode } from "./BaseNode";
import { SingleConnectionHandle } from "./SingleConnectionHandle";

export const IntersectionNode = (props: NodeProps<Node>) => {
  return (
    <BaseNode {...props}>
      <div>Intersection</div>
      <SingleConnectionHandle type="target" position={Position.Top} id="a" />
      <SingleConnectionHandle type="target" position={Position.Bottom} id="b" />
      <SingleConnectionHandle type="source" position={Position.Right} id="c" />
    </BaseNode>
  );
};
