import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import {
  type MainGridCheckedState,
  type RowId,
  Colors,
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

function loadMap<Key, Value>(
  storageKey: string,
  initialState: Map<Key, Value>,
  isValue: (value: unknown) => value is Value,
): Map<Key, Value> {
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
            && isValue(entry[1])
            && initialState.has(entry[0] as Key),
        )
      ) {
        const loadedState = new Map(entries as [Key, Value][]);

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
  const colorsState = ref<Map<Colors, boolean>>(
    loadBooleanMap('colorScoring', colorsInitialState));
  const rowsState = ref<Map<RowId, boolean>>(
    loadBooleanMap('rowScoring', rowsInitialState));
  const jokersState = ref<boolean[]>(
    sessionStorage.getItem('jokers')
      ? JSON.parse(sessionStorage.getItem('jokers')!) as boolean[]
      : structuredClone(jokersInitialState)
  );
  const mainGridState = ref<MainGridCheckedState[]>(
    sessionStorage.getItem('main')
      ? JSON.parse(sessionStorage.getItem('main')!) as MainGridCheckedState[]
      : structuredClone(mainGridInitialState)
  );
  const markedColorsMap = ref<Map<Colors, number>>(loadCountMap(
    'marked-color-counts', markedColorsMapInitialState, mainGridState.value,
    (index) => allThemBoxes[index]!.color,
  ));
  const markedRowMap = ref<Map<RowId, number>>(loadCountMap(
    'marked-letter-counts', markedRowMapInitialState, mainGridState.value,
    (index) => allThemBoxes[index]!.rowId,
  ));

  const rowScore = computed(() => {
    let rowScore = 0;
    markedRowMap.value.forEach((value, key) => {
      if (value == 7) {
        if (rowsState.value.get(key)!) {
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
    markedColorsMap.value.forEach((value, key) => {
      if (value == 21) {
        if (colorsState.value.get(key)) {
          colorScore += colorScores.low;
        } else {
          colorScore += colorScores.high;
        }
      }
    });
    return colorScore;
  });

  const jokerScore = computed(() => {
    return jokersState.value.filter((el: boolean) => !el).length;
  });

  const starScore = computed(() => {
    return (
      mainGridState.value.filter(
        (el: any) => allThemBoxes[el.index]?.stared && !el.checked).length * -2
    );
  });

  function flipColorBoxMark(index: Colors) {
    colorsState.value.set(index, !colorsState.value.get(index)!);
    sessionStorage.setItem(
      'colorScoring',
      JSON.stringify([...colorsState.value])
    );
  }

  function resetColorBoxes() {
    colorsState.value = structuredClone(colorsInitialState);
    sessionStorage.setItem(
      'colorScoring',
      JSON.stringify([...colorsState.value])
    );
  }

  function flipRowScoreBoxMark(index: RowId) {
    rowsState.value.set(index, !rowsState.value.get(index)!);
    sessionStorage.setItem(
      'rowScoring',
      JSON.stringify([...rowsState.value])
    );
  }

  function resetRowsScoreBoxes() {
    rowsState.value = structuredClone(rowsInitialState);
    sessionStorage.setItem(
      'rowScoring',
      JSON.stringify([...rowsState.value])
    );
  }

  function flipJokerChecked(index: number) {
    jokersState.value[index] = !jokersState.value[index];
    sessionStorage.setItem(
      'jokers',
      JSON.stringify(jokersState.value)
    );
  }

  function resetJokers() {
    jokersState.value = jokersInitialState;
    sessionStorage.setItem(
      'jokers',
      JSON.stringify(jokersInitialState)
    );
  }

  function checkForCheckedNeighbors(i: number) {
    mainGridState.value[i]!.enabled =
      (i     >= 49  && i <= 55                                ) ||
      (                mainGridState.value[i]!.checked    ) ||
      (i % 7 != 0   && mainGridState.value[i - 1]!.checked) ||
      (i % 7 != 6   && mainGridState.value[i + 1]!.checked) ||
      (i     >= 7   && mainGridState.value[i - 7]!.checked) ||
      (i + 7 <  105 && mainGridState.value[i + 7]!.checked)
    ;
  }

  function setMainGridChecked(i: number, checked: boolean) {
    mainGridState.value[i]!.checked = checked;
    if (checked) {
      if (i % 7 != 0) { // left
        mainGridState.value[i - 1]!.enabled = true;
      }
      if (i % 7 != 6) { // right
        mainGridState.value[i + 1]!.enabled = true;
      }
      if (i >= 7) { // up
        mainGridState.value[i - 7]!.enabled = true;
      }
      if (i + 7 < 105) { // down
        mainGridState.value[i + 7]!.enabled = true;
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
    markedColorsMap.value.set(
      color, (markedColorsMap.value.get(color) ?? 0) + (2*Number(checked) - 1)
    );
    markedRowMap.value.set(
      rowId, (markedRowMap.value.get(rowId) ?? 0) + (2*Number(checked) - 1)
    );

    // if checked all of a color,
    // check the state of corresponding color score box, and update them
    sessionStorage.setItem(
      'marked-color-counts',
      JSON.stringify([...markedColorsMap.value])
    );
    sessionStorage.setItem(
      'marked-letter-counts',
      JSON.stringify([...markedRowMap.value])
    );
    sessionStorage.setItem(
      'main',
      JSON.stringify(mainGridState.value)
    );
  }

  function resetMainGrid() {
    mainGridState.value = mainGridInitialState;
    markedColorsMap.value.forEach((_: number, key: Colors) => {
      markedColorsMap.value.set(key, 0);
    });
    markedRowMap.value.forEach((_: number, key: RowId) => {
      markedRowMap.value.set(key, 0);
    });

    sessionStorage.setItem(
      'marked-color-counts',
      JSON.stringify([...markedColorsMap.value])
    );
    sessionStorage.setItem(
      'marked-letter-counts',
      JSON.stringify([...markedRowMap.value])
    );
    sessionStorage.setItem(
      'main',
      JSON.stringify(mainGridState.value)
    );
  }

  return {
    colorsState,
    markedColorsMap,
    colorScore,
    flipColorBoxMark,
    resetColorBoxes,

    rowsState,
    rowScore,
    flipRowScoreBoxMark,
    resetRowsScoreBoxes,

    mainGridState,
    starScore,
    setMainGridChecked,
    resetMainGrid,

    jokersState,
    markedRowMap,
    jokerScore,
    flipJokerChecked,
    resetJokers,
  };
});
