import australiaData from "@/content/australia.json";
import type { StateId } from "@/lib/types";

type Feature = { id: StateId; name: string; polygons: [number, number][][] };

const features = australiaData as Feature[];

/** Equirectangular projection into the 630 × 570 atlas viewBox. */
export function projectPoint(lon: number, lat: number): [number, number] {
  return [(lon - 111) * 13.4 + 25, (-lat - 9) * 15.2 + 12];
}

function pathFor(feature: Feature) {
  return feature.polygons
    .map(
      (polygon) =>
        "M" +
        polygon
          .map(([lon, lat]) =>
            projectPoint(lon, lat)
              .map((n) => n.toFixed(1))
              .join(","),
          )
          .join("L") +
        "Z",
    )
    .join("");
}

export type StateShape = { id: StateId; name: string; d: string };

export const australiaShapes: StateShape[] = features.map((feature) => ({
  id: feature.id,
  name: feature.name,
  d: pathFor(feature),
}));

export const statePoints: Record<StateId, { city: [number, number]; label: [number, number] }> = {
  WA: { city: [115.86, -31.95], label: [121.3, -25.5] },
  NT: { city: [130.84, -12.46], label: [133.3, -20.1] },
  SA: { city: [138.6, -34.93], label: [134.2, -29.7] },
  QLD: { city: [153.03, -27.47], label: [144.0, -23.5] },
  NSW: { city: [151.21, -33.87], label: [146.2, -31.3] },
  VIC: { city: [144.96, -37.81], label: [143.8, -36.4] },
  TAS: { city: [147.33, -42.88], label: [145.6, -41.5] },
  ACT: { city: [149.13, -35.28], label: [150.6, -36.2] },
};

/** Portrait positions per state, in atlas viewBox units. */
export const faceSlots: Record<StateId, [number, number][]> = {
  WA: [[105, 190], [175, 190], [245, 190], [105, 265], [175, 265]],
  NT: [[270, 150], [340, 150], [410, 150], [270, 225], [340, 225]],
  QLD: [[405, 205], [475, 205], [545, 205], [405, 280], [475, 280]],
  NSW: [[390, 320], [460, 320], [530, 320], [390, 395], [460, 395]],
  VIC: [[355, 385], [425, 385], [495, 385], [355, 460], [425, 460]],
  SA: [[255, 315], [325, 315], [395, 315], [255, 390], [325, 390]],
  TAS: [[340, 425], [410, 425], [480, 425], [340, 500], [410, 500]],
  ACT: [[390, 330], [460, 330], [530, 330], [390, 405], [460, 405]],
};
