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

export const markedLetterMapInitialState = new Map<RowId, number>([
  ['A', 0], ['B', 0], ['C', 0], ['D', 0], ['E', 0],
  ['F', 0], ['G', 0], ['H', 0], ['I', 0], ['J', 0],
  ['K', 0], ['L', 0], ['M', 0], ['N', 0], ['O', 0],
]);

export const letterScoreingBoxesInitialState: MarkedState[] = [
  { index: "A1st", score: 5, mark: Mark.Blank },
  { index: "B1st", score: 3, mark: Mark.Blank },
  { index: "C1st", score: 3, mark: Mark.Blank },
  { index: "D1st", score: 3, mark: Mark.Blank },
  { index: "E1st", score: 2, mark: Mark.Blank },
  { index: "F1st", score: 2, mark: Mark.Blank },
  { index: "G1st", score: 2, mark: Mark.Blank },
  { index: "H1st", score: 1, mark: Mark.Blank },
  { index: "I1st", score: 2, mark: Mark.Blank },
  { index: "J1st", score: 2, mark: Mark.Blank },
  { index: "K1st", score: 2, mark: Mark.Blank },
  { index: "L1st", score: 3, mark: Mark.Blank },
  { index: "M1st", score: 3, mark: Mark.Blank },
  { index: "N1st", score: 3, mark: Mark.Blank },
  { index: "O1st", score: 5, mark: Mark.Blank },
  { index: "A2nd", score: 3, mark: Mark.Blank },
  { index: "B2nd", score: 2, mark: Mark.Blank },
  { index: "C2nd", score: 2, mark: Mark.Blank },
  { index: "D2nd", score: 2, mark: Mark.Blank },
  { index: "E2nd", score: 1, mark: Mark.Blank },
  { index: "F2nd", score: 1, mark: Mark.Blank },
  { index: "G2nd", score: 1, mark: Mark.Blank },
  { index: "H2nd", score: 0, mark: Mark.Blank },
  { index: "I2nd", score: 1, mark: Mark.Blank },
  { index: "J2nd", score: 1, mark: Mark.Blank },
  { index: "K2nd", score: 1, mark: Mark.Blank },
  { index: "L2nd", score: 2, mark: Mark.Blank },
  { index: "M2nd", score: 2, mark: Mark.Blank },
  { index: "N2nd", score: 2, mark: Mark.Blank },
  { index: "O2nd", score: 3, mark: Mark.Blank }
];

export const colorScoreingBoxesInitialState: MarkedState[] = [
  { index: "R1st", score: 5, mark: Mark.Blank },
  { index: "G1st", score: 5, mark: Mark.Blank },
  { index: "B1st", score: 5, mark: Mark.Blank },
  { index: "Y1st", score: 5, mark: Mark.Blank },
  { index: "O1st", score: 5, mark: Mark.Blank },
  { index: "R2nd", score: 3, mark: Mark.Blank },
  { index: "G2nd", score: 3, mark: Mark.Blank },
  { index: "B2nd", score: 3, mark: Mark.Blank },
  { index: "Y2nd", score: 3, mark: Mark.Blank },
  { index: "O2nd", score: 3, mark: Mark.Blank }
];

export const jokerBoxesInitialState: CheckedState[] = [
  { index: "Joker0", isChecked: false },
  { index: "Joker1", isChecked: false },
  { index: "Joker2", isChecked: false },
  { index: "Joker3", isChecked: false },
  { index: "Joker4", isChecked: false },
  { index: "Joker5", isChecked: false },
  { index: "Joker6", isChecked: false },
  { index: "Joker7", isChecked: false }
];