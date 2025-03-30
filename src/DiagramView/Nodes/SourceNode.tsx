import { useCallback, type ChangeEvent } from "react";
import { Position, type NodeProps, type Node } from "@xyflow/react";

import { BaseNode } from "./BaseNode";
import { SingleConnectionHandle } from "./SingleConnectionHandle";

export const SourceNode = (props: NodeProps<Node>) => {
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  return (
    <BaseNode {...props}>
      <div>Source</div>
      <SingleConnectionHandle type="source" position={Position.Right} id="a" />
      <div>
        <label htmlFor="text">Url:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
    </BaseNode>
  );
};
