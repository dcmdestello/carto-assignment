import type { Color, GeoJsonLayerProps } from "deck.gl";
import type { Node, Edge } from "@xyflow/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import type {
  Feature,
  FeatureCollection,
  Geometry,
  MultiPolygon,
  Polygon,
} from "geojson";
import * as turf from "@turf/turf";
import type { AllGeoJSON } from "@turf/turf";
import type { CustomFlowNode } from "../DiagramView/Nodes";
import { DeletableFlowEdge } from "../DiagramView/Edges";

export type PropertiesType = {
  name: string;
  color: string;
};

const hexToRGB = (hex: string): Color | null => {
  const match = hex.match(/[0-9a-f]{2}/g);
  if (!match) return null;
  return match.map((x) => parseInt(x, 16)) as Color;
};

export const initGeoJsonLayer = (
  id: string,
  data: GeoJsonLayerProps["data"]
) => {
  return new GeoJsonLayer<PropertiesType>({
    id,
    data,

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
  });
};

export const loadGeoJsonUrl = async (url: string): Promise<AllGeoJSON> =>
  fetch(url).then((response) => response.json()) as Promise<AllGeoJSON>;

const getConnectedFromNodes = (
  node: CustomFlowNode,
  nodes: CustomFlowNode[],
  edges: DeletableFlowEdge[]
) => {
  const nodesById: Record<string, CustomFlowNode> = {};
  nodes.forEach((node) => {
    nodesById[node.id] = node;
  });
  const connectedEdges = edges.filter((edge) => edge.target === node.id);
  const fromNodes = connectedEdges.map((edge) => nodesById[edge.source]);
  return fromNodes;
};

const toFeatureCollection = (geojson: AllGeoJSON) => {
  if (geojson.type === "FeatureCollection") {
    return geojson;
  }

  if (geojson.type === "Feature") {
    return turf.featureCollection([geojson]);
  }

  if (geojson.type === "GeometryCollection") {
    const features = geojson.geometries.map((geometry) =>
      turf.feature(geometry)
    );
    return turf.featureCollection(features);
  }

  // If it's a geometry, convert it to a feature, then wrap it
  return turf.featureCollection([turf.feature(geojson)]);
};

export const resolveNodeGeoJsonData = async (
  node: CustomFlowNode,
  nodes: CustomFlowNode[],
  edges: DeletableFlowEdge[]
): Promise<AllGeoJSON | null> => {
  if (node.type === "source") {
    try {
      const url = node.data.url;
      if (!url) return null;
      const geoJson = await loadGeoJsonUrl(url);
      return geoJson;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  if (node.type === "layer") {
    const fromNodes = getConnectedFromNodes(node, nodes, edges);
    if (fromNodes.length === 0) return null;
    const fromNode = fromNodes[0]; // there can be only 1
    return resolveNodeGeoJsonData(fromNode, nodes, edges);
  }

  if (node.type === "intersection") {
    const fromNodes = getConnectedFromNodes(node, nodes, edges).sort(
      (a, b) => b.position.y - a.position.y
    );
    const geoJsons = await Promise.all(
      fromNodes.map((fromNode) =>
        resolveNodeGeoJsonData(fromNode, nodes, edges)
      )
    );
    const validGeoJsons = geoJsons.filter(Boolean) as AllGeoJSON[];
    if (validGeoJsons.length === 0) return null;
    if (validGeoJsons.length === 1) return validGeoJsons[0];
    try {
      const featuresCollections = validGeoJsons.map(toFeatureCollection);
      const combinedFeatures = [
        ...featuresCollections[0].features,
        ...featuresCollections[1].features,
      ];
      const combinedFeatureCollection = turf.featureCollection(
        combinedFeatures
      ) as FeatureCollection<Polygon | MultiPolygon>;
      return turf.intersect(combinedFeatureCollection);
    } catch (error) {
      // for example one of the sources is not a Polygons GeoJSON so can't be intersected.
      console.error(error);
      return null;
    }
  }
  return null;
};
