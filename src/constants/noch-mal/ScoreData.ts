import { Colors, type MultiScore, type RowId } from "@/types/NochMalTypes";

export const rowScores = new Map<RowId, MultiScore>([
  ["A", { high: 5, low: 3 }],
  ["B", { high: 3, low: 2 }],
  ["C", { high: 3, low: 2 }],
  ["D", { high: 3, low: 2 }],
  ["E", { high: 2, low: 1 }],
  ["F", { high: 2, low: 1 }],
  ["G", { high: 2, low: 1 }],
  ["H", { high: 1, low: 0 }],
  ["I", { high: 2, low: 1 }],
  ["J", { high: 2, low: 1 }],
  ["K", { high: 2, low: 1 }],
  ["L", { high: 3, low: 2 }],
  ["M", { high: 3, low: 2 }],
  ["N", { high: 3, low: 2 }],
  ["O", { high: 5, low: 3 }],
]);

export const colorScores: MultiScore = { high: 5, low: 3 };
