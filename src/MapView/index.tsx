import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import type { Feature, Geometry } from "geojson";
import type { PickingInfo } from "@deck.gl/core";

type PropertiesType = {
  name: string;
  color: string;
};

import type { ViewMode } from "../App";
import type { Node, Edge } from "@xyflow/react";

type MapViewProps = {
  setViewMode: (s: ViewMode) => void;
  nodes: Node[];
  edges: Edge[];
};

export const MapView = ({ setViewMode, nodes, edges }: MapViewProps) => {
  console.log("nodes", nodes);
  console.log("edges", edges);

  const layer = new GeoJsonLayer<PropertiesType>({
    id: "GeoJsonLayer",
    data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart.geo.json",

    stroked: false,
    filled: true,
    pointType: "circle+text",
    pickable: true,

    getFillColor: [160, 160, 180, 200],
    getLineColor: (f: Feature<Geometry, PropertiesType>) => {
      const hex = f.properties.color;
      // convert to RGB
      return hex
        ? hex.match(/[0-9a-f]{2}/g).map((x) => parseInt(x, 16))
        : [0, 0, 0];
    },
    getText: (f: Feature<Geometry, PropertiesType>) => f.properties.name,
    getLineWidth: 20,
    getPointRadius: 4,
    getTextSize: 12,
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
        initialViewState={{
          longitude: -122.4,
          latitude: 37.74,
          zoom: 11,
        }}
        controller
        getTooltip={({
          object,
        }: PickingInfo<Feature<Geometry, PropertiesType>>) =>
          object?.properties.name || ""
        }
        layers={[layer]}
      />
    </div>
  );
};
