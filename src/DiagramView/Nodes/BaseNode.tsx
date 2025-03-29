import { NodeToolbar, useReactFlow, type Node } from "@xyflow/react";

import "./BaseNode.css";

interface BaseNodeProps extends Node {
  children: React.ReactNode;
}

export const BaseNode = ({ id, children }: BaseNodeProps) => {
  const { deleteElements } = useReactFlow();

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div className="base-node">
      <NodeToolbar>
        <button onClick={handleDelete}>delete</button>
      </NodeToolbar>
      {children}
    </div>
  );
};
