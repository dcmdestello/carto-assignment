import { useCallback, type ChangeEvent } from "react";
import { Handle, Position, type NodeProps, type Node } from "@xyflow/react";

import { BaseNode } from "./BaseNode";

// interface SourceNodeProps extends Node {}

export const SourceNode = (props: NodeProps<Node>) => {
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  return (
    <BaseNode {...props}>
      <div>Source</div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        // style={handleStyle}
        isConnectable
      />
      <div>
        <label htmlFor="text">Url:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
    </BaseNode>
  );
};
