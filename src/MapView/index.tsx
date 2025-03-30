import { useEffect, useMemo, useState } from "react";
import type { Node, Edge } from "@xyflow/react";
import DeckGL from "@deck.gl/react";
import type { Feature, Geometry } from "geojson";
import type { MapViewState, PickingInfo } from "@deck.gl/core";
import * as turf from "@turf/turf";

import type { ViewMode } from "../App";
import { combineBBoxes, getViewStateFromBBox } from "./bboxUtils";
import { buildLayers, calcLayers, type PropertiesType } from "./layers";

type MapViewProps = {
  setViewMode: (s: ViewMode) => void;
  nodes: Node[];
  edges: Edge[];
};

export const MapView = ({ setViewMode, nodes, edges }: MapViewProps) => {
  const layerSources = useMemo(() => calcLayers(nodes, edges), [nodes, edges]);
  const layers = layerSources.map(buildLayers);

  useEffect(() => {
    const loadLayers = async () => {
      const geoJsonArray = await Promise.all(
        // TODO handle array of inputs / intersection
        layerSources.map((sourceNode) =>
          fetch(sourceNode[0].data.url as string).then((response) =>
            response.json()
          )
        )
      );
      const bboxes = geoJsonArray.map((geoJson) => {
        return turf.bbox(geoJson);
      });
      const bbox = combineBBoxes(bboxes);
      setInitialViewState(getViewStateFromBBox(bbox));
    };
    loadLayers();
  }, [layerSources]);

  const [initialViewState, setInitialViewState] = useState<MapViewState>({
    latitude: 51.47,
    longitude: 0.45,
    zoom: 4,
  });

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
      <DeckGL
        initialViewState={initialViewState}
        controller
        getTooltip={({
          object,
        }: PickingInfo<Feature<Geometry, PropertiesType>>) =>
          object?.properties.name || ""
        }
        layers={layers}
      />
    </div>
  );
};
