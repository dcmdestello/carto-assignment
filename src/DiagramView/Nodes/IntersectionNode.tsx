import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";

import { BaseNode } from "./BaseNode";

export const IntersectionNode = (props: NodeProps<Node>) => {
  return (
    <BaseNode {...props}>
      <div>Intersection</div>
      <Handle type="target" position={Position.Top} id="a" isConnectable />
      <Handle type="target" position={Position.Bottom} id="b" isConnectable />
      <Handle type="source" position={Position.Right} id="c" isConnectable />
    </BaseNode>
  );
};
