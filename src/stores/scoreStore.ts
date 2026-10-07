import { computed, reactive, toRaw } from 'vue';
import { defineStore } from 'pinia';
import { Mark, type CheckedState,
  type MarkedState, type MainGridCheckedState
} from '@/types/NochMalTypes';
import {
  colorScoreingBoxesInitialState, letterHeaderBoxesInitalState,
  letterScoreingBoxesInitialState, jokerBoxesInitialState,
  mainGridInitialState,
} from '@/constants/noch-mal/InitialStates';
import { allThemBoxes } from '@/constants/noch-mal/MainGridBoxes';
import { getRealIndex } from '@/utils/nochMal/RealIndex';

export const useScoreStore = defineStore('score', () => {
  const deepState = reactive({
    colorBoxesMarkedState: sessionStorage.getItem('colorScoring')
      ? JSON.parse(sessionStorage.getItem('colorScoring') ?? '[]')
      : structuredClone(colorScoreingBoxesInitialState) as MarkedState[],
    
    letterHeaderBoxesState: sessionStorage.getItem('headers')
      ? JSON.parse(sessionStorage.getItem('headers') ?? '[]')
      : structuredClone(letterHeaderBoxesInitalState) as CheckedState[],
    
    letterScoreingBoxesState: sessionStorage.getItem('columnScoring')
      ? JSON.parse(sessionStorage.getItem('columnScoring') ?? '[]')
      : structuredClone(letterScoreingBoxesInitialState) as MarkedState[],
  
    jokerBoxesState: sessionStorage.getItem('jokers')
      ? JSON.parse(sessionStorage.getItem('jokers') ?? '[]')
      : structuredClone(jokerBoxesInitialState) as CheckedState[],
    
    mainGridState: sessionStorage.getItem('main')
      ? JSON.parse(sessionStorage.getItem('main') ?? '[]')
      : structuredClone(mainGridInitialState) as MainGridCheckedState[],
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

  function checkIfStared(el: MainGridCheckedState) {
    const i = getRealIndex(el.index);
    return allThemBoxes[i]?.stared;
  }

  const starScore = computed(() => {
    return (
      deepState.mainGridState.filter(
        (el: any) => checkIfStared(el) && !el.isChecked).length * -2
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

  function setLetterHeaderChecked(index: string, isChecked: boolean) {
    deepState.letterHeaderBoxesState =
      deepState.letterHeaderBoxesState.map((box: MarkedState) =>
        box.index === index ? { ...box, isChecked } : box
      );
    sessionStorage.setItem(
      'headers',
      JSON.stringify(deepState.letterHeaderBoxesState)
    );
  }

  function resetLetterHeaderBoxes() {
    deepState.letterHeaderBoxesState =
      deepState.letterHeaderBoxesState.map((box: MarkedState) =>
        ({ ...box, isChecked: false })
      );
    sessionStorage.setItem(
      'headers',
      JSON.stringify(deepState.letterHeaderBoxesState)
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
    deepState.jokerBoxesState = deepState.jokerBoxesState.map((box: MarkedState) =>
      box.index === index ? { ...box, isChecked } : box
    );
    sessionStorage.setItem(
      'jokers',
      JSON.stringify(deepState.jokerBoxesState)
    );
  }

  function resetJokers() {
    deepState.jokerBoxesState = deepState.jokerBoxesState.map((box: MarkedState) =>
      ({ ...box, isChecked: false })
    );
    sessionStorage.setItem(
      'jokers',
      JSON.stringify(deepState.jokerBoxesState)
    );
  }

  function checkForCheckedNeighbors(i: number) {
    deepState.mainGridState[i].enabled =
      (i     >= 49  && i <= 55                                 ) ||
      (i % 7 != 0   && deepState.mainGridState[i - 1].isChecked) ||
      (i % 7 != 6   && deepState.mainGridState[i + 1].isChecked) ||
      (i     >= 7   && deepState.mainGridState[i - 7].isChecked) ||
      (i + 7 <  105 && deepState.mainGridState[i + 7].isChecked)
    ;
  }

  function setMainGridChecked(index: string, isChecked: boolean) {
    const realRowIndex = index.charCodeAt(0) - 'A'.charCodeAt(0);
    const i = realRowIndex * 7 + Number(index[1]);
    deepState.mainGridState[i].isChecked = isChecked;
    
    // left
    if (i % 7 != 0) {
      if (isChecked)  {
        deepState.mainGridState[i - 1].enabled = true;
      } else {
        checkForCheckedNeighbors(i - 1);
      }
    }

    // right
    if (i % 7 != 6) {
      if (isChecked)  {
        deepState.mainGridState[i + 1].enabled = true;
      } else {
        checkForCheckedNeighbors(i + 1);
      }
    }

    // up
    if (i >= 7) {
      if (isChecked)  {
        deepState.mainGridState[i - 7].enabled = true;
      } else {
        checkForCheckedNeighbors(i - 7);
      }
    }

    // down
    if (i + 7 < 105) {
      if (isChecked)  {
        deepState.mainGridState[i + 7].enabled = true;
      } else {
        checkForCheckedNeighbors(i + 7);
      }
    }

    deepState.mainGridState = deepState.mainGridState.map((box: MarkedState) =>
      box.index === index ? { ...box, isChecked } : box
    );
    // if checked all of a color,
    // check the state of corresponding color score box, and update them
    sessionStorage.setItem(
      'main',
      JSON.stringify(deepState.mainGridState)
    );
  }

  function resetMainGrid() {
    deepState.mainGridState = deepState.mainGridState.map((box: MainGridCheckedState) => {
      const i = getRealIndex(box.index);
      return  { index: box.index, enabled: (i >= 49  && i <= 55),  isChecked: false } ;
    });
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

    setLetterHeaderChecked,
    resetLetterHeaderBoxes,

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
