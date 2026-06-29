import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import {
  Mark,
  type CheckedState,
  type MarkedState,
  type MainGridCheckedState
} from '@/types/NochMalTypes';
import {
  colorScoreingBoxesInitialState,
  letterHeaderBoxesInitalState,
  letterScoreingBoxesInitialState,
  jokerBoxesInitialState,
  mainGridInitialState,
} from '@/hooks/reducerDefs';

export const useScoreStore = defineStore('score', () => {
  const colorBoxesMarkedState = ref<MarkedState[]>(
    sessionStorage.getItem('colorScoring')
      ? JSON.parse(sessionStorage.getItem('colorScoring') ?? '[]')
      : structuredClone(colorScoreingBoxesInitialState)
  );

  const letterHeaderBoxesState = ref<CheckedState[]>(
    sessionStorage.getItem('headers')
      ? JSON.parse(sessionStorage.getItem('headers') ?? '[]')
      : structuredClone(letterHeaderBoxesInitalState)
  );

  const letterScoreingBoxesState = ref<MarkedState[]>(
    sessionStorage.getItem('columnScoring')
      ? JSON.parse(sessionStorage.getItem('columnScoring') ?? '[]')
      : structuredClone(letterScoreingBoxesInitialState)
  );

  const jokerBoxesState = ref<CheckedState[]>(
    sessionStorage.getItem('jokers')
      ? JSON.parse(sessionStorage.getItem('jokers') ?? '[]')
      : structuredClone(jokerBoxesInitialState)
  );

  const mainGridState = ref<MainGridCheckedState[]>(
    sessionStorage.getItem('main')
      ? JSON.parse(sessionStorage.getItem('main') ?? '[]')
      : structuredClone(mainGridInitialState)
  );

  const colorScore = computed<number>(() => {
    let value = 0;
    colorBoxesMarkedState.value.forEach((el: any) => {
      if (el.mark === Mark.Circled) value += el.score;
    });
    return value;
  });

  const letterScore = computed<number>(() => {
    let value = 0;
    letterScoreingBoxesState.value.forEach((el: any) => {
      if (el.mark === Mark.Circled) value += el.score;
    });
    return value;
  });

  const jokerScore = computed<number>(() => {
    return jokerBoxesState.value.filter((el: any) => !el.isChecked).length;
  });

  const starScore = computed<number>(() => {
    return (
      mainGridState.value.filter((el: any) => el.stared && !el.isChecked).length * -2
    );
  });

  function setColorBoxMark(index: string, mark: Mark) {
    colorBoxesMarkedState.value =
      colorBoxesMarkedState.value.map((box) =>
        box.index === index ? { ...box, mark } : box
      );
    sessionStorage.setItem(
      'colorScoring',
      JSON.stringify(colorBoxesMarkedState.value
    ));
  }

  function resetColorBoxes() {
    colorBoxesMarkedState.value =
      colorBoxesMarkedState.value.map((box) =>
        ({ ...box, mark: Mark.Blank })
      );
    sessionStorage.setItem(
      'colorScoring',
      JSON.stringify(colorBoxesMarkedState.value)
    );
  }

  function setLetterHeaderChecked(index: string, isChecked: boolean) {
    letterHeaderBoxesState.value =
      letterHeaderBoxesState.value.map((box) =>
        box.index === index ? { ...box, isChecked } : box
      );
    sessionStorage.setItem(
      'headers',
      JSON.stringify(letterHeaderBoxesState.value)
    );
  }

  function resetLetterHeaderBoxes() {
    letterHeaderBoxesState.value =
      letterHeaderBoxesState.value.map((box) =>
        ({ ...box, isChecked: false })
      );
    sessionStorage.setItem(
      'headers',
      JSON.stringify(letterHeaderBoxesState.value)
    );
  }

  function setLetterScoreBoxMark(index: string, mark: Mark) {
    letterScoreingBoxesState.value =
      letterScoreingBoxesState.value.map((box) =>
        box.index === index ? { ...box, mark } : box
      );
    sessionStorage.setItem(
      'columnScoring',
      JSON.stringify(letterScoreingBoxesState.value)
    );
  }

  function resetLetterScoreBoxes() {
    letterScoreingBoxesState.value =
      letterScoreingBoxesState.value.map((box) =>
        ({ ...box, mark: Mark.Blank })
      );
    sessionStorage.setItem(
      'columnScoring',
      JSON.stringify(letterScoreingBoxesState.value)
    );
  }

  function setJokerChecked(index: string, isChecked: boolean) {
    jokerBoxesState.value = jokerBoxesState.value.map((box) =>
      box.index === index ? { ...box, isChecked } : box
    );
    sessionStorage.setItem(
      'jokers',
      JSON.stringify(jokerBoxesState.value)
    );
  }

  function resetJokers() {
    jokerBoxesState.value = jokerBoxesState.value.map((box) =>
      ({ ...box, isChecked: false })
    );
    sessionStorage.setItem(
      'jokers',
      JSON.stringify(jokerBoxesState.value)
    );
  }

  function setMainGridChecked(index: string, isChecked: boolean) {
    mainGridState.value = mainGridState.value.map((box) =>
      box.index === index ? { ...box, isChecked } : box
    );
    sessionStorage.setItem(
      'main',
      JSON.stringify(mainGridState.value)
    );
  }

  function resetMainGrid() {
    mainGridState.value = mainGridState.value.map((box) =>
      ({ ...box, isChecked: false })
    );
    sessionStorage.setItem(
      'main',
      JSON.stringify(mainGridState.value)
    );
  }

  return {
    colorScore,
    colorBoxesMarkedState,
    setColorBoxMark,
    resetColorBoxes,

    letterScore,
    letterHeaderBoxesState,
    setLetterHeaderChecked,
    resetLetterHeaderBoxes,
    letterScoreingBoxesState,
    setLetterScoreBoxMark,
    resetLetterScoreBoxes,

    starScore,

    mainGridState,
    setMainGridChecked,
    resetMainGrid,

    jokerScore,
    jokerBoxesState,
    setJokerChecked,
    resetJokers,
  };
});
