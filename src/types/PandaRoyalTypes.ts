import { evaluateExpression } from "@/utils/MathMagic";

export type InputCell = {
  column: string;
  value: string | null;
}

export class InputRow {
  index: number;
  valueCells: InputCell[];

  constructor(index: number, valueCells: InputCell[]) {
    this.index = index;
    this.valueCells = valueCells;
  }

  get total() {
    const totals = this.valueCells.reduce(
      (acc, cell) => (acc ?? 0) + (evaluateExpression(cell.value ?? '0')), 0
    ) ?? 0;
    return totals;
  }
}