import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import * as turf from "@turf/turf";
import type { AllGeoJSON } from "@turf/turf";
import type { CustomFlowNode } from "../DiagramView/Nodes";
import { DeletableFlowEdge } from "../DiagramView/Edges";

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
