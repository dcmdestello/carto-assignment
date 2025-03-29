import { type DragEvent } from "react";
import { useDnD } from "../DnDContext";

type NodeType = "input" | "default" | "output" | "source";

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
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "source")}
        draggable
      >
        Source Node
      </div>
    </aside>
  );
};
