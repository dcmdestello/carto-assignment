import { useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import type { Feature, Geometry } from "geojson";
import type { MapViewState, PickingInfo } from "@deck.gl/core";
import * as turf from "@turf/turf";

import type { ViewMode } from "../App";
import { combineBBoxes, getViewStateFromBBox } from "./utils/bbox";
import { type PropertiesType, initGeoJsonLayer } from "./utils/geoJsonLayer";
import { resolveNodeGeoJsonData } from "./utils/geoJson";
import { Button } from "@mui/material";
import {
  FloatingMapToolbarContainer,
  MapViewContainer,
} from "./MapView.styles";
import { GeoJsonLayer } from "deck.gl";
import { useDiagramNodes, useDiagramEdges } from "../stores/DiagramProvider";

type MapViewProps = {
  setViewMode: (s: ViewMode) => void;
};

export const MapView = ({ setViewMode }: MapViewProps) => {
  const [nodes] = useDiagramNodes();
  const [edges] = useDiagramEdges();
  // Reasonable values for the default diagram, but will calculate the viewState "camera"
  // values based on the actual bounding box of the dynamic GeoJSON that gets loaded
  const [initialViewState, setInitialViewState] = useState<MapViewState>({
    latitude: 51.47,
    longitude: 0.45,
    zoom: 4,
  });
  const [layers, setLayers] = useState<GeoJsonLayer[]>([]);

  // Fetches GeoJson data and uses it to set state:
  //   - layers: with GeoJsonLayers
  //   - initialViewState: a camera from a calculated boundingbox
  useEffect(() => {
    const loadLayers = async (): Promise<void> => {
      const layerNodes = nodes
        .filter((node) => node.type === "layer")
        .sort((a, b) => b.position.y - a.position.y);

      const geoJsons = await Promise.all(
        layerNodes.map((layerNode) =>
          resolveNodeGeoJsonData(layerNode, nodes, edges)
        )
      );

      const geoJsonLayers = geoJsons.map((geoJson, index) => {
        if (!geoJson) return null;
        const layerNode = layerNodes[index];
        return initGeoJsonLayer(layerNode.id, geoJson);
      });

      const validGeoJsonLayers = geoJsonLayers.filter(
        Boolean
      ) as GeoJsonLayer[];

      setLayers(validGeoJsonLayers);

      const bboxes = geoJsons
        .filter(Boolean)
        .map((geoJson) => turf.bbox(geoJson as turf.AllGeoJSON));
      if (bboxes.length === 0) return;
      const bbox = combineBBoxes(bboxes);
      setInitialViewState(getViewStateFromBBox(bbox));
    };

    loadLayers().catch(console.error);
  }, [nodes, edges]);

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
