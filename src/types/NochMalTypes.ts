export enum Colors {
  Blue   = "blue",
  Green  = "green",
  Orange = "orange",
  Red    = "red",
  Yellow = "yellow"
}

export type RowId =
  | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H"
  | "I" | "J" | "K" | "L" | "M" | "N" | "O";

export class BoxData {
  readonly index : number;
  readonly rowId : RowId;
  readonly row   : number;
  readonly column: number;
  readonly color : Colors;
  readonly stared: boolean;

  constructor(
    rowId : RowId,
    column: number,
    color : Colors,
    stared: boolean
  ) {
    const row   = rowId.charCodeAt(0) - 'A'.charCodeAt(0);
    this.color  = color;
    this.rowId  = rowId;
    this.row    = row;
    this.column = column;
    this.stared = stared;
    this.index  = row * 7 + column;
  }
};

export type RowData = {
  row             : RowId;
  boxesData       : BoxData[];
  pointsBase      : number;
  pointsFirstBonus: number;
};

export type CheckedState = {
  index    : string;
  isChecked: boolean;
};

export type MainGridCheckedState = {
  index    : number;
  enabled  : boolean;
  isChecked: boolean;
};

export enum Mark {
  Blank     = 0,
  Circled   = 1,
  Scratched = 2
};

export type MarkedState = {
  index: string;
  score: number;
  mark : Mark;
};