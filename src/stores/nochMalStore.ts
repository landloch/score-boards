import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import {
  type MainGridCheckedState,
  type RowId,
  Colors,
  type DeepState
} from '@/types/NochMalTypes';
import {
  colorsInitialState,
  jokersInitialState,
  rowsInitialState,
  mainGridInitialState,
  markedColorsMapInitialState,
  markedRowMapInitialState,
} from '@/constants/noch-mal/InitialStates';
import { allThemBoxes } from '@/constants/noch-mal/MainGridBoxes';
import { colorScores, rowScores } from '@/constants/noch-mal/ScoreData';

function loadCountMap<Key>(
  storageKey: string,
  initialState: Map<Key, number>,
  mainGridState: MainGridCheckedState[],
  getKey: (index: number) => Key,
): Map<Key, number> {
  const serialized = sessionStorage.getItem(storageKey);
  if (serialized) {
    try {
      const entries: unknown = JSON.parse(serialized);
      if (Array.isArray(entries)) return new Map(entries as [Key, number][]);
    } catch {
    }
  }

  const counts = structuredClone(initialState);
  mainGridState.forEach((cell, index) => {
    if (!cell.checked) return;
    const key = getKey(index);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return counts;
}

function loadBooleanMap<Key>(
  storageKey: string,
  initialState: Map<Key, boolean>,
): Map<Key, boolean> {
  const serialized = sessionStorage.getItem(storageKey);
  if (serialized) {
    try {
      const entries: unknown = JSON.parse(serialized);
      if (
        Array.isArray(entries)
        && entries.every(
          (entry) =>
            Array.isArray(entry)
            && entry.length === 2
            && typeof entry[1] === 'boolean'
            && initialState.has(entry[0] as Key),
        )
      ) {
        const loadedState = new Map(entries as [Key, boolean][]);
        if (
          loadedState.size === initialState.size
          && [...initialState.keys()].every((key) => loadedState.has(key))
        ) {
          return loadedState;
        }
      }
    } catch {
      // Invalid stored data falls back to the initial state.
    }
  }

  return structuredClone(initialState);
}

export const useNochMalStore = defineStore('score', () => {
  const mainGridState = sessionStorage.getItem('main')
    ? JSON.parse(sessionStorage.getItem('main')!) as MainGridCheckedState[]
    : structuredClone(mainGridInitialState);

  const deepState = reactive<DeepState>({
    colorsState: loadBooleanMap('colorScoring', colorsInitialState),
    
    rowsState: loadBooleanMap('rowScoring', rowsInitialState),
  
    jokersState: sessionStorage.getItem('jokers')
      ? JSON.parse(sessionStorage.getItem('jokers')!) as boolean[]
      : structuredClone(jokersInitialState),
    
    mainGridState,

    markedColorsMap: loadCountMap(
      'marked-color-counts', markedColorsMapInitialState, mainGridState,
      (index) => allThemBoxes[index]!.color,
    ),
    markedRowMap: loadCountMap(
      'marked-letter-counts', markedRowMapInitialState, mainGridState,
      (index) => allThemBoxes[index]!.rowId,
    ),
  });

  const rowScore = computed(() => {
    let rowScore = 0;
    deepState.markedRowMap.forEach((value, key) => {
      if (value == 7) {
        if (deepState.rowsState.get(key)!) {
          rowScore += rowScores.get(key)!.low;
        } else {
          rowScore += rowScores.get(key)!.high;
        }
      }
    });
    return rowScore;
  });

  const colorScore = computed(() => {
    let colorScore = 0;
    deepState.markedColorsMap.forEach((value, key) => {
      if (value == 21) {
        if (deepState.colorsState.get(key)) {
          colorScore += colorScores.low;
        } else {
          colorScore += colorScores.high;
        }
      }
    });
    return colorScore;
  });

  const jokerScore = computed(() => {
    return deepState.jokersState.filter((el: boolean) => !el).length;
  });

  const starScore = computed(() => {
    return (
      deepState.mainGridState.filter(
        (el: any) => allThemBoxes[el.index]?.stared && !el.checked).length * -2
    );
  });

  function flipColorBoxMark(index: Colors) {
    deepState.colorsState.set(index, !deepState.colorsState.get(index)!);
    sessionStorage.setItem(
      'colorScoring',
      JSON.stringify([...deepState.colorsState])
    );
  }

  function resetColorBoxes() {
    deepState.colorsState = structuredClone(colorsInitialState);
    sessionStorage.setItem(
      'colorScoring',
      JSON.stringify([...deepState.colorsState])
    );
  }

  function flipRowScoreBoxMark(index: RowId) {
    deepState.rowsState.set(index, !deepState.rowsState.get(index)!);
    sessionStorage.setItem(
      'rowScoring',
      JSON.stringify([...deepState.rowsState])
    );
  }

  function resetRowsScoreBoxes() {
    deepState.rowsState = structuredClone(rowsInitialState);
    sessionStorage.setItem(
      'rowScoring',
      JSON.stringify([...deepState.rowsState])
    );
  }

  function flipJokerChecked(index: number) {
    deepState.jokersState[index] = !deepState.jokersState[index];
    sessionStorage.setItem(
      'jokers',
      JSON.stringify(deepState.jokersState)
    );
  }

  function resetJokers() {
    deepState.jokersState = jokersInitialState;
    sessionStorage.setItem(
      'jokers',
      JSON.stringify(jokersInitialState)
    );
  }

  function checkForCheckedNeighbors(i: number) {
    deepState.mainGridState[i]!.enabled =
      (i     >= 49  && i <= 55                                ) ||
      (                deepState.mainGridState[i]!.checked    ) ||
      (i % 7 != 0   && deepState.mainGridState[i - 1]!.checked) ||
      (i % 7 != 6   && deepState.mainGridState[i + 1]!.checked) ||
      (i     >= 7   && deepState.mainGridState[i - 7]!.checked) ||
      (i + 7 <  105 && deepState.mainGridState[i + 7]!.checked)
    ;
  }

  function setMainGridChecked(i: number, checked: boolean) {
    deepState.mainGridState[i]!.checked = checked;
    if (checked) {
      if (i % 7 != 0) { // left
        deepState.mainGridState[i - 1]!.enabled = true;
      }
      if (i % 7 != 6) { // right
        deepState.mainGridState[i + 1]!.enabled = true;
      }
      if (i >= 7) { // up
        deepState.mainGridState[i - 7]!.enabled = true;
      }
      if (i + 7 < 105) { // down
        deepState.mainGridState[i + 7]!.enabled = true;
      }
    } else {
      if (i % 7 != 0) { // left
        checkForCheckedNeighbors(i - 1);
      }
      if (i % 7 != 6) { // right
        checkForCheckedNeighbors(i + 1);
      }
      if (i >= 7) { // up
        checkForCheckedNeighbors(i - 7);
      }
      if (i + 7 < 105) { // down
        checkForCheckedNeighbors(i + 7);
      }
      checkForCheckedNeighbors(i);
    }

    const color = allThemBoxes[i]!.color;
    const rowId = allThemBoxes[i]!.rowId;
    deepState.markedColorsMap.set(
      color, (deepState.markedColorsMap.get(color) ?? 0) + (2*Number(checked) - 1)
    );
    deepState.markedRowMap.set(
      rowId, (deepState.markedRowMap.get(rowId) ?? 0) + (2*Number(checked) - 1)
    );

    // if checked all of a color,
    // check the state of corresponding color score box, and update them
    sessionStorage.setItem(
      'marked-color-counts',
      JSON.stringify([...deepState.markedColorsMap])
    );
    sessionStorage.setItem(
      'marked-letter-counts',
      JSON.stringify([...deepState.markedRowMap])
    );
    sessionStorage.setItem(
      'main',
      JSON.stringify(deepState.mainGridState)
    );
  }

  function resetMainGrid() {
    deepState.mainGridState = mainGridInitialState;
    deepState.markedColorsMap.forEach((_: number, key: Colors) => {
      deepState.markedColorsMap.set(key, 0);
    });
    deepState.markedRowMap.forEach((_: number, key: RowId) => {
      deepState.markedRowMap.set(key, 0);
    });

    sessionStorage.setItem(
      'marked-color-counts',
      JSON.stringify([...deepState.markedColorsMap])
    );
    sessionStorage.setItem(
      'marked-letter-counts',
      JSON.stringify([...deepState.markedRowMap])
    );
    sessionStorage.setItem(
      'main',
      JSON.stringify(deepState.mainGridState)
    );
  }

  return {
    deepState,

    colorScore,
    flipColorBoxMark,
    resetColorBoxes,

    rowScore,
    flipRowScoreBoxMark,
    resetRowsScoreBoxes,

    starScore,

    setMainGridChecked,
    resetMainGrid,

    jokerScore,
    flipJokerChecked,
    resetJokers,
  };
});
