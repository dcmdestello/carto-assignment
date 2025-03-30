import { useEffect, useMemo, useState } from "react";
import type { Node, Edge } from "@xyflow/react";
import DeckGL from "@deck.gl/react";
import type { Feature, Geometry } from "geojson";
import type { MapViewState, PickingInfo } from "@deck.gl/core";
import * as turf from "@turf/turf";

import type { ViewMode } from "../App";
import { combineBBoxes, getViewStateFromBBox } from "./bboxUtils";
import {
  initGeoJsonLayer,
  getLayerSourceNodes,
  loadGeoJsonUrl,
  type PropertiesType,
} from "./layers";
import { Button } from "@mui/material";
import {
  FloatingMapToolbarContainer,
  MapViewContainer,
} from "./MapView.styles";

type MapViewProps = {
  setViewMode: (s: ViewMode) => void;
  nodes: Node[];
  edges: Edge[];
};

export const MapView = ({ setViewMode, nodes, edges }: MapViewProps) => {
  const layerSources = useMemo(
    () => getLayerSourceNodes(nodes, edges),
    [nodes, edges]
  );
  // const layers = layerSources.map(buildLayers);
  const [layers, setLayers] = useState<any[]>([]);

  useEffect(() => {
    const loadLayers = async (): Promise<void> => {
      const geoJsonArray = await Promise.all(
        // TODO handle array of inputs / intersection
        layerSources.map((sourceNode) => {
          if (!sourceNode) return null;
          return loadGeoJsonUrl(sourceNode.data.url as string);
        })
      );

      const geoJsonLayers = geoJsonArray.map((geoJson, index) => {
        if (!geoJson) return null;
        const layerSource = layerSources[index];
        if (!layerSource) return null;
        return initGeoJsonLayer(layerSource.id, geoJson);
      });
      setLayers(geoJsonLayers.filter(Boolean));

      const bboxes = geoJsonArray
        .filter(Boolean)
        .map((geoJson) => turf.bbox(geoJson as turf.AllGeoJSON));
      const bbox = combineBBoxes(bboxes);
      setInitialViewState(getViewStateFromBBox(bbox));
    };
    loadLayers().catch(console.error);
  }, [layerSources]);

  const [initialViewState, setInitialViewState] = useState<MapViewState>({
    latitude: 51.47,
    longitude: 0.45,
    zoom: 4,
  });

  return (
    <MapViewContainer>
      <FloatingMapToolbarContainer>
        <Button
          size="small"
          onClick={() => {
            setViewMode("diagram");
          }}
          variant="contained"
        >
          Diagram
        </Button>
      </FloatingMapToolbarContainer>
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
    </MapViewContainer>
  );
};
