import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import {
  Mark,
  type CheckedState,
  type MarkedState,
  type MainGridCheckedState,
  type RowId,
  Colors,
  type DeepState
} from '@/types/NochMalTypes';
import {
  colorScoreingBoxesInitialState,
  letterScoreingBoxesInitialState,
  jokerBoxesInitialState,
  mainGridInitialState,
  markedColorsMapInitialState,
  markedLetterMapInitialState,
} from '@/constants/noch-mal/InitialStates';
import { allThemBoxes } from '@/constants/noch-mal/MainGridBoxes';

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

export const useScoreStore = defineStore('score', () => {
  const mainGridState = sessionStorage.getItem('main')
    ? JSON.parse(sessionStorage.getItem('main')!) as MainGridCheckedState[]
    : structuredClone(mainGridInitialState) as MainGridCheckedState[];

  const deepState = reactive<DeepState>({
    colorBoxesMarkedState: sessionStorage.getItem('colorScoring')
      ? JSON.parse(sessionStorage.getItem('colorScoring')!) as MarkedState[]
      : structuredClone(colorScoreingBoxesInitialState) as MarkedState[],
    
    letterScoreingBoxesState: sessionStorage.getItem('columnScoring')
      ? JSON.parse(sessionStorage.getItem('columnScoring')!) as MarkedState[]
      : structuredClone(letterScoreingBoxesInitialState) as MarkedState[],
  
    jokerBoxesState: sessionStorage.getItem('jokers')
      ? JSON.parse(sessionStorage.getItem('jokers')!) as CheckedState[]
      : structuredClone(jokerBoxesInitialState) as CheckedState[],
    
    mainGridState,

    markedColorsMap: loadCountMap(
      'marked-color-counts', markedColorsMapInitialState, mainGridState,
      (index) => allThemBoxes[index]!.color,
    ),
    markedLetterMap: loadCountMap(
      'marked-letter-counts', markedLetterMapInitialState, mainGridState,
      (index) => allThemBoxes[index]!.rowId,
    ),
  });

  const colorScore = computed(() => {
    return deepState.colorBoxesMarkedState.reduce((sum: number, el: MarkedState) => {
      return el.mark === Mark.Circled ? sum + el.score : sum;
    }, 0);
  });

  const letterScore = computed(() => {
    return deepState.letterScoreingBoxesState.reduce((sum: number, el: MarkedState) => {
      return el.mark === Mark.Circled ? sum + el.score : sum;
    }, 0);
  });

  const jokerScore = computed(() => {
    return deepState.jokerBoxesState.filter((el: any) => !el.isChecked).length;
  });

  const starScore = computed(() => {
    return (
      deepState.mainGridState.filter(
        (el: any) => allThemBoxes[el.index]?.stared && !el.isChecked).length * -2
    );
  });

  function setColorBoxMark(index: string, mark: Mark) {
    deepState.colorBoxesMarkedState =
      deepState.colorBoxesMarkedState.map((box: MarkedState) =>
        box.index === index ? { ...box, mark } : box
      );
    deepState.colorBoxesMarkedState
    sessionStorage.setItem(
      'colorScoring',
      JSON.stringify(deepState.colorBoxesMarkedState
    ));
  }

  function resetColorBoxes() {
    deepState.colorBoxesMarkedState =
      deepState.colorBoxesMarkedState.map((box: MarkedState) =>
        ({ ...box, mark: Mark.Blank })
      );
    sessionStorage.setItem(
      'colorScoring',
      JSON.stringify(deepState.colorBoxesMarkedState)
    );
  }

  function setLetterScoreBoxMark(index: string, mark: Mark) {
    deepState.letterScoreingBoxesState =
      deepState.letterScoreingBoxesState.map((box: MarkedState) =>
        box.index === index ? { ...box, mark } : box
      );
    sessionStorage.setItem(
      'columnScoring',
      JSON.stringify(deepState.letterScoreingBoxesState)
    );
  }

  function resetLetterScoreBoxes() {
    deepState.letterScoreingBoxesState =
      deepState.letterScoreingBoxesState.map((box: MarkedState) =>
        ({ ...box, mark: Mark.Blank })
      );
    sessionStorage.setItem(
      'columnScoring',
      JSON.stringify(deepState.letterScoreingBoxesState)
    );
  }

  function setJokerChecked(index: string, isChecked: boolean) {
    deepState.jokerBoxesState = deepState.jokerBoxesState.map((box: CheckedState) =>
      box.index === index ? { ...box, isChecked } : box
    );
    sessionStorage.setItem(
      'jokers',
      JSON.stringify(deepState.jokerBoxesState)
    );
  }

  function resetJokers() {
    deepState.jokerBoxesState = deepState.jokerBoxesState.map((box: CheckedState) =>
      ({ ...box, isChecked: false })
    );
    sessionStorage.setItem(
      'jokers',
      JSON.stringify(deepState.jokerBoxesState)
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

    deepState.markedColorsMap.set(
      allThemBoxes[i]!.color,
      (deepState.markedColorsMap.get(allThemBoxes[i]!.color) ?? 0) + (2*Number(checked) - 1)
    );
    deepState.markedLetterMap.set(
      allThemBoxes[i]!.rowId,
      (deepState.markedLetterMap.get(allThemBoxes[i]!.rowId) ?? 0) + (2*Number(checked) - 1)
    );

    // if checked all of a color,
    // check the state of corresponding color score box, and update them
    sessionStorage.setItem(
      'marked-color-counts',
      JSON.stringify([...deepState.markedColorsMap])
    );
    sessionStorage.setItem(
      'marked-letter-counts',
      JSON.stringify([...deepState.markedLetterMap])
    );
    sessionStorage.setItem(
      'main',
      JSON.stringify(deepState.mainGridState)
    );
  }

  function resetMainGrid() {
    deepState.mainGridState = mainGridInitialState;
    deepState.markedColorsMap.forEach((value: number, key: Colors) => {
      deepState.markedColorsMap.set(key, 0);
    });
    deepState.markedLetterMap.forEach((value: number, key: RowId) => {
      deepState.markedLetterMap.set(key, 0);
    });

    sessionStorage.setItem(
      'marked-color-counts',
      JSON.stringify([...deepState.markedColorsMap])
    );
    sessionStorage.setItem(
      'marked-letter-counts',
      JSON.stringify([...deepState.markedLetterMap])
    );
    sessionStorage.setItem(
      'main',
      JSON.stringify(deepState.mainGridState)
    );
  }

  return {
    deepState,

    colorScore,
    setColorBoxMark,
    resetColorBoxes,

    letterScore,
    setLetterScoreBoxMark,
    resetLetterScoreBoxes,

    starScore,

    setMainGridChecked,
    resetMainGrid,

    jokerScore,
    setJokerChecked,
    resetJokers,
  };
});
