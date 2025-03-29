import { Handle, Position, type Node } from "@xyflow/react";

import { BaseNode } from "./BaseNode";

// interface LayerNodeProps extends Node {}

export const LayerNode = (props: Node) => {
  return (
    <BaseNode {...props}>
      <div>Layer</div>
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        // style={handleStyle}
        isConnectable
      />
    </BaseNode>
  );
};
