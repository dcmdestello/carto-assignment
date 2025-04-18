import { useCallback, type ChangeEvent } from "react";
import {
  Position,
  type NodeProps,
  type Node,
  useReactFlow,
} from "@xyflow/react";

import { BaseCustomNode } from "./BaseCustomNode";
import { SingleConnectionHandle } from "./SingleConnectionHandle";
import { UrlInputWrapper, UrlLabel } from "./SourceNode.styles";

export type SourceFlowNode = Node<{ url?: string }, "source">;

export const SourceNode = (props: NodeProps<SourceFlowNode>) => {
  const { setNodes } = useReactFlow();
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === props.id
            ? { ...node, data: { ...node.data, url: event.target.value } }
            : node
        )
      );
    },
    [props.id, setNodes]
  );

  return (
    <BaseCustomNode {...props}>
      <div>Source</div>
      <SingleConnectionHandle type="source" position={Position.Right} id="a" />
      <UrlInputWrapper>
        <UrlLabel htmlFor="url">Url:</UrlLabel>
        <input
          id="url"
          name="url"
          onChange={onChange}
          className="nodrag"
          value={props.data.url || ""}
        />
      </UrlInputWrapper>
    </BaseCustomNode>
  );
};
