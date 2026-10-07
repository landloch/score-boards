import type { BoxData, RowData } from "@/types/NochMalTypes";
import {
  boxA0, boxA1, boxA2, boxA3, boxA4, boxA5, boxA6,
  boxB0, boxB1, boxB2, boxB3, boxB4, boxB5, boxB6,
  boxC0, boxC1, boxC2, boxC3, boxC4, boxC5, boxC6,
  boxD0, boxD1, boxD2, boxD3, boxD4, boxD5, boxD6,
  boxE0, boxE1, boxE2, boxE3, boxE4, boxE5, boxE6,
  boxF0, boxF1, boxF2, boxF3, boxF4, boxF5, boxF6,
  boxG0, boxG1, boxG2, boxG3, boxG4, boxG5, boxG6,
  boxH0, boxH1, boxH2, boxH3, boxH4, boxH5, boxH6,
  boxI0, boxI1, boxI2, boxI3, boxI4, boxI5, boxI6,
  boxJ0, boxJ1, boxJ2, boxJ3, boxJ4, boxJ5, boxJ6,
  boxK0, boxK1, boxK2, boxK3, boxK4, boxK5, boxK6,
  boxL0, boxL1, boxL2, boxL3, boxL4, boxL5, boxL6,
  boxM0, boxM1, boxM2, boxM3, boxM4, boxM5, boxM6,
  boxN0, boxN1, boxN2, boxN3, boxN4, boxN5, boxN6,
  boxO0, boxO1, boxO2, boxO3, boxO4, boxO5, boxO6
} from "./BoxesData";

const rowA: BoxData[] =
  [boxA0, boxA1, boxA2, boxA3, boxA4, boxA5, boxA6];
export const rowAdata: RowData = {
  row: "A",
  boxesData: rowA,
  pointsBase: 3,
  pointsFirstBonus: 2
};

const rowB: BoxData[] =
  [boxB0, boxB1, boxB2, boxB3, boxB4, boxB5, boxB6];
export const rowBdata: RowData = {
  row: "B",
  boxesData: rowB,
  pointsBase: 2,
  pointsFirstBonus: 1
};

const rowC: BoxData[] =
  [boxC0, boxC1, boxC2, boxC3, boxC4, boxC5, boxC6];
export const rowCdata: RowData = {
  row: "C",
  boxesData: rowC,
  pointsBase: 2,
  pointsFirstBonus: 1
};

const rowD: BoxData[] =
  [boxD0, boxD1, boxD2, boxD3, boxD4, boxD5, boxD6];
export const rowDdata: RowData = {
  row: "D",
  boxesData: rowD,
  pointsBase: 2,
  pointsFirstBonus: 1
};

const rowE: BoxData[] =
  [boxE0, boxE1, boxE2, boxE3, boxE4, boxE5, boxE6];
export const rowEdata: RowData = {
  row: "E",
  boxesData: rowE,
  pointsBase: 1,
  pointsFirstBonus: 1
};

const rowF: BoxData[] =
  [boxF0, boxF1, boxF2, boxF3, boxF4, boxF5, boxF6];
export const rowFdata: RowData = {
  row: "F",
  boxesData: rowF,
  pointsBase: 1,
  pointsFirstBonus: 1
};

const rowG: BoxData[] =
  [boxG0, boxG1, boxG2, boxG3, boxG4, boxG5, boxG6];
export const rowGdata: RowData = {
  row: "G",
  boxesData: rowG,
  pointsBase: 1,
  pointsFirstBonus: 1
};

const rowH: BoxData[] =
  [boxH0, boxH1, boxH2, boxH3, boxH4, boxH5, boxH6];
export const rowHdata: RowData = {
  row: "H",
  boxesData: rowH,
  pointsBase: 0,
  pointsFirstBonus: 1
};

const rowI: BoxData[] =
  [boxI0, boxI1, boxI2, boxI3, boxI4, boxI5, boxI6];
export const rowIdata: RowData = {
  row: "I",
  boxesData: rowI,
  pointsBase: 1,
  pointsFirstBonus: 1
};

const rowJ: BoxData[] =
  [boxJ0, boxJ1, boxJ2, boxJ3, boxJ4, boxJ5, boxJ6];
export const rowJdata: RowData = {
  row: "J",
  boxesData: rowJ,
  pointsBase: 1,
  pointsFirstBonus: 1
};

const rowK: BoxData[] =
  [boxK0, boxK1, boxK2, boxK3, boxK4, boxK5, boxK6];
export const rowKdata: RowData = {
  row: "K",
  boxesData: rowK,
  pointsBase: 1,
  pointsFirstBonus: 1
};

const rowL: BoxData[] =
  [boxL0, boxL1, boxL2, boxL3, boxL4, boxL5, boxL6];
export const rowLdata: RowData = {
  row: "L",
  boxesData: rowL,
  pointsBase: 2,
  pointsFirstBonus: 1
};

const rowM: BoxData[] =
  [boxM0, boxM1, boxM2, boxM3, boxM4, boxM5, boxM6];
export const rowMdata: RowData = {
  row: "M",
  boxesData: rowM,
  pointsBase: 2,
  pointsFirstBonus: 1
};

const rowN: BoxData[] =
  [boxN0, boxN1, boxN2, boxN3, boxN4, boxN5, boxN6];
export const rowNdata: RowData = {
  row: "N",
  boxesData: rowN,
  pointsBase: 2,
  pointsFirstBonus: 1
};

const rowO: BoxData[] =
  [boxO0, boxO1, boxO2, boxO3, boxO4, boxO5, boxO6];
export const rowOdata: RowData = {
  row: "O",
  boxesData: rowO,
  pointsBase: 3,
  pointsFirstBonus: 2
};

export const allThemBoxes: BoxData[] = [
  ...rowA, ...rowB, ...rowC, ...rowD,
  ...rowE, ...rowF, ...rowG, ...rowH,
  ...rowI, ...rowJ, ...rowK, ...rowL,
  ...rowM, ...rowN, ...rowO
];