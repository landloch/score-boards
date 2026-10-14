import { allThemBoxes } from "@/constants/noch-mal/MainGridBoxes";
import { Colors, Mark, type BoxData, type CheckedState, type MainGridCheckedState, type MarkedState, type RowId } from "@/types/NochMalTypes";

export const mainGridInitialState: MainGridCheckedState[] = getAllThemCheckedStates();

function getAllThemCheckedStates(): MainGridCheckedState[] {
  const checkedStates: MainGridCheckedState[] = [];
  allThemBoxes.forEach((box: BoxData) => {
    checkedStates.push({ index: box.index, enabled: box.rowId == 'H',  checked: false });
  });
  return checkedStates;
}

export const markedColorsMapInitialState = new Map<Colors, number>([
  [Colors.Green, 0], [Colors.Yellow, 0], [Colors.Blue, 0], [Colors.Red, 0], [Colors.Orange, 0],
]);

export const markedRowMapInitialState = new Map<RowId, number>([
  ['A', 0], ['B', 0], ['C', 0], ['D', 0], ['E', 0],
  ['F', 0], ['G', 0], ['H', 0], ['I', 0], ['J', 0],
  ['K', 0], ['L', 0], ['M', 0], ['N', 0], ['O', 0],
]);

export const colorsInitialState = new Map<Colors, boolean>([
  [Colors.Blue, false],
  [Colors.Green, false],
  [Colors.Orange, false],
  [Colors.Red, false],
  [Colors.Yellow, false],
]);

export const rowsInitialState= new Map<RowId, boolean>([
  ["A", false], ["B", false], ["C", false],
  ["D", false], ["E", false], ["F", false],
  ["F", false], ["H", false], ["I", false],
  ["J", false], ["K", false], ["L", false],
  ["M", false], ["N", false], ["O", false],
]);

export const jokersInitialState = [
  false, false, false, false, false, false, false, false,
];