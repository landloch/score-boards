export interface BoardGenerationParams {
  colors: string[];
  gridHeight: number;
  gridWidth: number;
  maxSize: number;
  seed?: number;
}

export interface BoardGenerationResult extends BoardGenerationParams {
  cells: Array<Array<{
    x: number;
    y: number;
    color: string;
    star: boolean;
  }>>;
}

type CellCoord = { x: number; y: number };

type PlacementSpec = {
  color: string;
  size: number;
};

type GridCell = {
  x: number;
  y: number;
  color: string;
  star: boolean;
};

function getCellKey(x: number, y: number): string {
  return `${x},${y}`;
}

function normalizeSeed(seed?: number): number {
  if (typeof seed === 'number' && Number.isFinite(seed)) {
    return seed >>> 0;
  }

  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    const buffer = new Uint32Array(1);
    globalThis.crypto.getRandomValues(buffer);
    return (buffer[0] ?? 0) >>> 0;
  }

  return Math.floor(Math.random() * 0x100000000) >>> 0;
}

function createPrng(seed: number): { next(): number; nextInt(max: number): number } {
  let state = (seed >>> 0) || 0x6d2b79f5;

  const next = (): number => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value ^= value << 13;
    value ^= value >>> 7;
    value ^= value << 17;
    return value >>> 0;
  };

  return {
    next,
    nextInt(max: number): number {
      if (max <= 0) {
        throw new Error('max must be positive');
      }
      return next() % max;
    },
  };
}

function shuffleArray<T>(values: T[], rng: { nextInt(max: number): number }): T[] {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = rng.nextInt(index + 1);
    const currentValue = copy[index];
    const swapValue = copy[swapIndex];
    if (currentValue === undefined || swapValue === undefined) {
      continue;
    }
    copy[index] = swapValue;
    copy[swapIndex] = currentValue;
  }
  return copy;
}

function validateParams(params: BoardGenerationParams): void {
  if (!Array.isArray(params.colors) || params.colors.length === 0) {
    throw new Error('colors must be a non-empty array');
  }

  if (new Set(params.colors).size !== params.colors.length) {
    throw new Error('colors must be unique');
  }

  if (!Number.isInteger(params.gridHeight) || params.gridHeight <= 0) {
    throw new Error('gridHeight must be a positive integer');
  }

  if (!Number.isInteger(params.gridWidth) || params.gridWidth <= 0) {
    throw new Error('gridWidth must be a positive integer');
  }

  if (!Number.isInteger(params.maxSize) || params.maxSize <= 0) {
    throw new Error('maxSize must be a positive integer');
  }

  const area = params.gridHeight * params.gridWidth;
  const expectedArea = params.colors.length * (params.maxSize * (params.maxSize + 1) / 2);
  if (area !== expectedArea) {
    throw new Error(`Board area ${area} does not match required tile count ${expectedArea}`);
  }
}

function getNeighbours(x: number, y: number, gridWidth: number, gridHeight: number): CellCoord[] {
  const neighbours: CellCoord[] = [];
  if (x > 0) neighbours.push({ x: x - 1, y });
  if (x + 1 < gridWidth) neighbours.push({ x: x + 1, y });
  if (y > 0) neighbours.push({ x, y: y - 1 });
  if (y + 1 < gridHeight) neighbours.push({ x, y: y + 1 });
  return neighbours;
}

function createEmptyGrid(gridHeight: number, gridWidth: number): GridCell[][] {
  return Array.from({ length: gridHeight }, (_, y) =>
    Array.from({ length: gridWidth }, (_, x) => ({ x, y, color: '', star: false })),
  );
}

function generateConnectedShapes(params: {
  size: number;
  gridHeight: number;
  gridWidth: number;
  usedCells: Set<string>;
  cellColors: Map<string, string>;
  color: string;
  colorRowsCovered: Map<string, Set<number>>;
  gridHeightValue: number;
  rng: { nextInt(max: number): number };
}): CellCoord[][] {
  const shapes: CellCoord[][] = [];
  const seen = new Set<string>();
  const freeCells = Array.from({ length: params.gridHeight * params.gridWidth }, (_, index) => ({
    x: index % params.gridWidth,
    y: Math.floor(index / params.gridWidth),
  })).filter((cell) => !params.usedCells.has(getCellKey(cell.x, cell.y)));

  const walk = (shape: CellCoord[], frontier: CellCoord[]): void => {
    if (shape.length === params.size) {
      const signature = shape.map((cell) => getCellKey(cell.x, cell.y)).sort().join('|');
      if (!seen.has(signature)) {
        seen.add(signature);
        shapes.push(shape.map((cell) => ({ x: cell.x, y: cell.y })));
      }
      return;
    }

    for (const nextCell of shuffleArray(frontier, params.rng)) {
      const nextShape = [...shape, nextCell];
      const nextFrontier: CellCoord[] = [];
      const occupied = new Set(nextShape.map((cell) => getCellKey(cell.x, cell.y)));
      for (const cell of nextShape) {
        for (const neighbour of getNeighbours(cell.x, cell.y, params.gridWidth, params.gridHeight)) {
          const key = getCellKey(neighbour.x, neighbour.y);
          if (occupied.has(key) || params.usedCells.has(key)) {
            continue;
          }
          nextFrontier.push(neighbour);
        }
      }
      walk(nextShape, nextFrontier);
    }
  };

  for (const start of shuffleArray(freeCells, params.rng)) {
    const rowsCoveredForColor = params.colorRowsCovered.get(params.color);
    if (!rowsCoveredForColor) {
      continue;
    }

    const rowsUsed = new Set<number>([start.y]);
    for (const row of rowsUsed) {
      if (rowsCoveredForColor.has(row)) {
        continue;
      }
    }

    const initialFrontier: CellCoord[] = [];
    for (const neighbour of getNeighbours(start.x, start.y, params.gridWidth, params.gridHeight)) {
      const key = getCellKey(neighbour.x, neighbour.y);
      if (!params.usedCells.has(key)) {
        initialFrontier.push(neighbour);
      }
    }

    walk([start], initialFrontier);
  }

  return shapes;
}

function canPlaceShape(params: {
  cells: CellCoord[];
  color: string;
  gridHeight: number;
  gridWidth: number;
  usedCells: Set<string>;
  cellColors: Map<string, string>;
  colorRowsCovered: Map<string, Set<number>>;
}): boolean {
  const rowsTouched = new Set<number>();
  for (const cell of params.cells) {
    const key = getCellKey(cell.x, cell.y);
    if (params.usedCells.has(key)) {
      return false;
    }
    rowsTouched.add(cell.y);
  }

  const rowsCoveredForColor = params.colorRowsCovered.get(params.color);
  if (!rowsCoveredForColor) {
    return false;
  }

  for (const row of rowsTouched) {
    if (rowsCoveredForColor.has(row)) {
      return false;
    }
  }

  for (const cell of params.cells) {
    for (const neighbour of getNeighbours(cell.x, cell.y, params.gridWidth, params.gridHeight)) {
      const neighbourKey = getCellKey(neighbour.x, neighbour.y);
      if (params.cellColors.get(neighbourKey) === params.color) {
        return false;
      }
    }
  }

  return true;
}

function assignStars(params: {
  colors: string[];
  gridHeight: number;
  cells: GridCell[][];
  rng: { nextInt(max: number): number };
}): Array<{ x: number; y: number }> {
  const target = Math.round(params.gridHeight / params.colors.length);
  const low = target - 1;
  const high = target + 1;
  const counts = new Map<string, number>(params.colors.map((color) => [color, 0]));
  const picked: Array<{ x: number; y: number }> = [];

  const search = (rowIndex: number): boolean => {
    if (rowIndex === params.gridHeight) {
      for (const count of counts.values()) {
        if (count < low || count > high) {
          return false;
        }
      }
      return true;
    }

    const rowCells = params.cells[rowIndex] ?? [];
    const choices = shuffleArray(rowCells.filter((cell) => cell.color !== ''), params.rng);

    for (const cell of choices) {
      const color = cell.color;
      const currentCount = counts.get(color) ?? 0;
      const remainingRows = params.gridHeight - rowIndex - 1;
      if (currentCount + remainingRows < low) {
        continue;
      }
      if (currentCount + 1 > high) {
        continue;
      }

      counts.set(color, currentCount + 1);
      picked.push({ x: cell.x, y: cell.y });
      if (search(rowIndex + 1)) {
        return true;
      }
      picked.pop();
      counts.set(color, currentCount);
    }

    return false;
  };

  if (!search(0)) {
    throw new Error('No valid star assignment exists for the provided parameters');
  }

  return picked;
}

export class BoardGenerator {
  public static generate(params: BoardGenerationParams): BoardGenerationResult {
    validateParams(params);

    const seed = normalizeSeed(params.seed);
    const rng = createPrng(seed);

    const colors = [...params.colors];
    const gridHeight = params.gridHeight;
    const gridWidth = params.gridWidth;
    const maxSize = params.maxSize;
    const totalCells = gridHeight * gridWidth;

    const placementOrder: PlacementSpec[] = colors.flatMap((color) =>
      Array.from({ length: maxSize }, (_, index) => ({ color, size: index + 1 })),
    );
    const randomizedOrder = shuffleArray(placementOrder, rng);

    const usedCells = new Set<string>();
    const cellColors = new Map<string, string>();
    const colorRowsCovered = new Map<string, Set<number>>();
    for (const color of colors) {
      colorRowsCovered.set(color, new Set<number>());
    }

    const placements: Array<{ color: string; size: number; cells: CellCoord[] }> = [];

    const search = (index: number): boolean => {
      if (index === randomizedOrder.length) {
        if (usedCells.size !== totalCells) {
          return false;
        }
        for (const color of colors) {
          if ((colorRowsCovered.get(color)?.size ?? 0) !== gridHeight) {
            return false;
          }
        }
        return true;
      }

      const spec = randomizedOrder[index];
      if (!spec) {
        return false;
      }

      const candidates = generateConnectedShapes({
        size: spec.size,
        gridHeight,
        gridWidth,
        usedCells,
        cellColors,
        color: spec.color,
        colorRowsCovered,
        gridHeightValue: gridHeight,
        rng,
      }).filter((cells) => canPlaceShape({
        cells,
        color: spec.color,
        gridHeight,
        gridWidth,
        usedCells,
        cellColors,
        colorRowsCovered,
      }));

      for (const cells of shuffleArray(candidates, rng)) {
        const placement = { color: spec.color, size: spec.size, cells };
        for (const cell of placement.cells) {
          const key = getCellKey(cell.x, cell.y);
          if (usedCells.has(key)) {
            return false;
          }
        }

        for (const cell of placement.cells) {
          const key = getCellKey(cell.x, cell.y);
          usedCells.add(key);
          cellColors.set(key, spec.color);
        }
        for (const row of placement.cells.map((cell) => cell.y)) {
          colorRowsCovered.get(spec.color)?.add(row);
        }
        placements.push(placement);

        if (search(index + 1)) {
          return true;
        }

        placements.pop();
        for (const cell of placement.cells) {
          const key = getCellKey(cell.x, cell.y);
          usedCells.delete(key);
          cellColors.delete(key);
          colorRowsCovered.get(spec.color)?.delete(cell.y);
        }
      }

      return false;
    };

    if (!search(0)) {
      throw new Error('No valid tiling exists for the provided parameters');
    }

    const cells = createEmptyGrid(gridHeight, gridWidth);
    for (const placement of placements) {
      for (const cell of placement.cells) {
        const row = cells[cell.y];
        if (!row) {
          continue;
        }
        const targetCell = row[cell.x];
        if (!targetCell) {
          continue;
        }
        row[cell.x] = {
          x: cell.x,
          y: cell.y,
          color: placement.color,
          star: false,
        };
      }
    }

    const stars = assignStars({ colors, gridHeight, cells, rng });
    for (const star of stars) {
      const row = cells[star.y];
      if (!row) {
        continue;
      }
      const targetCell = row[star.x];
      if (!targetCell) {
        continue;
      }
      row[star.x] = {
        ...targetCell,
        star: true,
      };
    }

    return {
      colors,
      gridHeight,
      gridWidth,
      maxSize,
      seed,
      cells,
    };
  }
}

export function generateBoard(params: BoardGenerationParams): BoardGenerationResult {
  return BoardGenerator.generate(params);
}
