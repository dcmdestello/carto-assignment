import {
  NodeToolbar,
  useReactFlow,
  type NodeProps,
  type Node,
} from "@xyflow/react";

import { BaseNodeContainer } from "./BaseNode.styles";

interface BaseNodeProps extends NodeProps<Node> {
  children: React.ReactNode;
}

export const BaseNode = ({ id, children, selected }: BaseNodeProps) => {
  const { deleteElements } = useReactFlow();

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <BaseNodeContainer selected={selected}>
      <NodeToolbar>
        <button onClick={handleDelete}>delete</button>
      </NodeToolbar>
      {children}
    </BaseNodeContainer>
  );
};
