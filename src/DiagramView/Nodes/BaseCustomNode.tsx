import {
  NodeToolbar,
  useReactFlow,
  type NodeProps,
  type Node,
  Position,
} from "@xyflow/react";
import DeleteIcon from "@mui/icons-material/Delete";

import { BaseNodeContainer } from "./BaseCustomNode.styles";
import { Fab } from "@mui/material";

interface BaseNodeProps extends NodeProps<Node> {
  children: React.ReactNode;
}

export const BaseCustomNode = ({ id, children, selected }: BaseNodeProps) => {
  const { deleteElements } = useReactFlow();

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <BaseNodeContainer selected={selected}>
      <NodeToolbar position={Position.Bottom}>
        <Fab
          size="small"
          aria-label="add"
          onClick={handleDelete}
          sx={{ transform: "scale(0.75)" }}
        >
          <DeleteIcon fontSize="small" />
        </Fab>
      </NodeToolbar>
      {children}
    </BaseNodeContainer>
  );
};
