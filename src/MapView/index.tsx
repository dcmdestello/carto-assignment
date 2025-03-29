import type { ViewMode } from "../App";

type MapViewProps = {
  setViewMode: (s: ViewMode) => void;
};

export const MapView = ({ setViewMode }: MapViewProps) => {
  return (
    <div className="dndflow">
      <div className="floatingAbsoluteActionsWrapper">
        <button
          onClick={() => {
            setViewMode("diagram");
          }}
        >
          Diagram
        </button>
      </div>
      Map View
    </div>
  );
};
