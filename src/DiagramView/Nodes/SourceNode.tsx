import { useCallback, type ChangeEvent } from "react";
import {
  Handle,
  NodeToolbar,
  Position,
  useReactFlow,
  type Node,
} from "@xyflow/react";

import "./SourceNode.css";

// interface SourceNodeProps extends NodeProps<Node> {}

export const SourceNode = ({ id }: Node) => {
  const { deleteElements } = useReactFlow();
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div className="source-node">
      <NodeToolbar>
        <button onClick={handleDelete}>delete</button>
      </NodeToolbar>
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
    </div>
  );
};
