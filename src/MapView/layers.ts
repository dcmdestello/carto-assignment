import type { Color } from "deck.gl";
import type { Node, Edge } from "@xyflow/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import type { Feature, Geometry } from "geojson";

export type PropertiesType = {
  name: string;
  color: string;
};

export const calcLayers = (nodes: Node[], edges: Edge[]) => {
  const nodesById: Record<string, Node> = {};
  nodes.forEach((node) => {
    nodesById[node.id] = node;
  });
  // const edgesById = {};
  // const edgesById = {};
  // edges.forEach((edge) => {
  //   nodesById[edge.id] = edge;
  // });
  const layerNodes = nodes
    .filter((node) => node.type === "layer")
    .sort((a: Node, b: Node) => b.position.y - a.position.y);
  const layersSourceNodes = layerNodes.map((layerNode) => {
    const connectedEdges = edges.filter((edge) => edge.target === layerNode.id);
    const sourceNodes = connectedEdges.map((edge) => nodesById[edge.source]);
    return sourceNodes;
  });
  return layersSourceNodes;
};

const hexToRGB = (hex: string): Color | null => {
  const match = hex.match(/[0-9a-f]{2}/g);
  if (!match) return null;
  return match.map((x) => parseInt(x, 16)) as Color;
};

export const buildLayers = (layerSources: Node[]) => {
  return layerSources.map(
    (sourceNode) =>
      new GeoJsonLayer<PropertiesType>({
        id: "GeoJsonLayer" + sourceNode.id,
        //TODO better typing
        data: sourceNode.data.url as string,

        stroked: true,
        filled: true,
        lineWidthMinPixels: 2,

        pointRadiusMinPixels: 4,
        pointRadiusScale: 2000,
        pickable: true,
        autoHighlight: true,
        // getPointRadius={f => 11 - f.properties.scalerank}

        /* NOTE: To enable text labels on points, uncomment
        pointType: "circle+text",
        getText: (f: Feature<Geometry, PropertiesType>) => f.properties.name,
        getTextSize: 12,
        */

        getLineColor: (f: Feature<Geometry, PropertiesType>) => {
          const hexColor = f.properties.color;
          if (hexColor) {
            return hexToRGB(hexColor) || [0, 0, 0];
          }
          if (f.geometry.type === "Polygon") {
            return [60, 60, 60];
          }
          return [160, 60, 60];
        },
        getFillColor: (f: Feature<Geometry, PropertiesType>) => {
          const hexColor = f.properties.color;
          if (hexColor) {
            return hexToRGB(hexColor) || [0, 0, 0];
          }
          if (f.geometry.type === "Polygon") {
            return [200, 200, 200];
          }
          return [160, 100, 100];
        },
      })
  );
};
