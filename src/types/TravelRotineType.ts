export type CommutationMethod = "car" | "bike" | "walking" | "public transport";

export type CommutationDetails = {
  method: CommutationMethod;
  distance: number;
};

export type TravelRoutineType = {
  totalDistance: number;
  distanceCoveredByEachCategory: CommutationDetails[];
};
