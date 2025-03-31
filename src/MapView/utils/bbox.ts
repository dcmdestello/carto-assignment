import type { BBox } from "geojson";

export const combineBBoxes = (bboxes: BBox[]): BBox => {
  const combinedBBox: BBox = [...bboxes[0]];
  for (let i = 1; i < bboxes.length; i++) {
    const bbox = bboxes[i];
    if (bbox[0] < combinedBBox[0]) combinedBBox[0] = bbox[0];
    if (bbox[1] < combinedBBox[1]) combinedBBox[1] = bbox[1];
    if (bbox[2] > combinedBBox[2]) combinedBBox[2] = bbox[2];
    if (bbox[3] > combinedBBox[3]) combinedBBox[3] = bbox[3];
  }
  return combinedBBox;
};

export const getViewStateFromBBox = (bbox: BBox) => {
  const centerLng = (bbox[0] + bbox[2]) / 2;
  const centerLat = (bbox[1] + bbox[3]) / 2;
  return {
    longitude: centerLng,
    latitude: centerLat,
    zoom: Math.min(
      16,
      Math.max(1, 8 - Math.log2(Math.max(bbox[2] - bbox[0], bbox[3] - bbox[1])))
    ),
  };
};
