import { Position, type NodeProps, type Node } from "@xyflow/react";

import { BaseCustomNode } from "./BaseCustomNode";
import { SingleConnectionHandle } from "./SingleConnectionHandle";
import { BigNodeLabel } from "./BaseCustomNode.styles";

export type IntersectionFlowNode = Node<Record<string, never>, "intersection">;

export const IntersectionNode = (props: NodeProps<IntersectionFlowNode>) => {
  return (
    <BaseCustomNode {...props}>
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
    </BaseCustomNode>
  );
};
