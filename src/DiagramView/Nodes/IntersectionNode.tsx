import { Position, type NodeProps, type Node } from "@xyflow/react";

import { BaseNode } from "./BaseNode";
import { SingleConnectionHandle } from "./SingleConnectionHandle";
import { BigNodeLabel } from "./BaseNode.styles";

export type IntersectionFlowNode = Node<Record<string, never>, "intersection">;

export const IntersectionNode = (props: NodeProps<IntersectionFlowNode>) => {
  return (
    <BaseNode {...props}>
      <BigNodeLabel>Intersection</BigNodeLabel>
      <SingleConnectionHandle
        type="target"
        position={Position.Left}
        id="a"
        style={{ top: "30%" }}
      />
      <SingleConnectionHandle
        type="target"
        position={Position.Left}
        id="b"
        style={{ top: "70%" }}
      />
      <SingleConnectionHandle type="source" position={Position.Right} id="c" />
    </BaseNode>
  );
};
