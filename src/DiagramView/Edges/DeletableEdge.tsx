import { Fab } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSimpleBezierPath,
  useReactFlow,
  type Edge,
  type EdgeProps,
} from "@xyflow/react";

export const DeletableEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
}: EdgeProps<Edge>) => {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      {selected && (
        <EdgeLabelRenderer>
          <Fab
            size="small"
            aria-label="add"
            sx={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px) scale(0.75)`,
              pointerEvents: "all",
            }}
            onClick={() => {
              setEdges((es) => es.filter((e) => e.id !== id));
            }}
          >
            <DeleteIcon fontSize="small" />
          </Fab>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
