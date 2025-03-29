import { useCallback, type ChangeEvent } from "react";
import { Handle, Position } from "@xyflow/react";

import "./SourceNode.css";

export const SourceNode = () => {
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  return (
    <div className="source-node">
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
