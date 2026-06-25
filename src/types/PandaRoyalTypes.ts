export type InputCell = {
  column: string;
  value: number | null;
}

export class InputRow {
  index: number;
  valueCells: InputCell[];

  constructor(index: number, valueCells: InputCell[]) {
    this.index = index;
    this.valueCells = valueCells;
  }

  get total() {
    let total = 0;
    this.valueCells.forEach(vc => {
      total += vc.value ?? 0;
    });
    return total;
  }
}