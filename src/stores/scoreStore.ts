import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { Mark, type CheckedState,
  type MarkedState, type MainGridCheckedState
} from '@/types/NochMalTypes';
import {
  colorScoreingBoxesInitialState, letterHeaderBoxesInitalState,
  letterScoreingBoxesInitialState, jokerBoxesInitialState,
  mainGridInitialState,
} from '@/hooks/reducerDefs';

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
  function colorScore() {
    return deepState.colorBoxesMarkedState.reduce((sum: number, el: MarkedState) => {
      return el.mark === Mark.Circled ? sum + el.score : sum;
    }, 0);
  }

  function letterScore() {
    return deepState.letterScoreingBoxesState.reduce((sum: number, el: MarkedState) => {
      return el.mark === Mark.Circled ? sum + el.score : sum;
    }, 0);
  }

  function jokerScore() {
    return deepState.jokerBoxesState.filter((el: any) => !el.isChecked).length;
  }

  function starScore() {
    return (
      deepState.mainGridState.filter(
        (el: any) => el.stared && !el.isChecked).length * -2
    );
  }

  function setColorBoxMark(index: string, mark: Mark) {
    deepState.colorBoxesMarkedState =
      deepState.colorBoxesMarkedState.map((box: MarkedState) =>
        box.index === index ? { ...box, mark } : box
      );
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

  function setMainGridChecked(index: string, isChecked: boolean) {
    const temp = deepState.mainGridState.map((box: MarkedState) =>
      box.index === index ? { ...box, isChecked } : box
    );
    deepState.mainGridState = temp
    sessionStorage.setItem(
      'main',
      JSON.stringify(temp)
    );
  }

  function resetMainGrid() {
    deepState.mainGridState = deepState.mainGridState.map((box: MarkedState) =>
      ({ ...box, isChecked: false })
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
