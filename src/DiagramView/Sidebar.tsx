import { type DragEvent } from "react";
import { useDnD } from "../DnDContext";

type NodeType =
  | "input"
  | "default"
  | "output"
  | "source"
  | "layer"
  | "intersection";

export const Sidebar = () => {
  const [_, setType] = useDnD();

  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: NodeType
  ) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "source")}
        draggable
      >
        Source Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "layer")}
        draggable
      >
        Layer Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "intersection")}
        draggable
      >
        Intersection Node
      </div>
    </aside>
  );
};
