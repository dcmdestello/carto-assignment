import {
  NodeToolbar,
  useReactFlow,
  type NodeProps,
  type Node,
} from "@xyflow/react";
import DeleteIcon from "@mui/icons-material/Delete";

import { BaseNodeContainer } from "./BaseNode.styles";
import { Fab } from "@mui/material";

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
        <Fab size="small" aria-label="add" onClick={handleDelete}>
          <DeleteIcon fontSize="small" />
        </Fab>
      </NodeToolbar>
      {children}
    </BaseNodeContainer>
  );
};
