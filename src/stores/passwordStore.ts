import { computed, ref, toValue } from 'vue';
import { defineStore } from 'pinia';
import { GenerateColors } from '@/utils/ColorGenerator2';
import { shuffle } from '@/utils/Shuffler';
import { generateDistinctColors } from '@/utils/ColorGenerator3';

export const usePasswordStore = defineStore('password', () => {
  const colorOptionsCount = ref<number>(6);
  const passwordLength = ref<number>(6);
  const allowRepeats = ref(false);

  const colorOptions = ref<string[]>(GenerateColors(colorOptionsCount.value));

  const activeColor = ref<string | null>(null);
  function setActiveColor(color: string | null) {
    activeColor.value = color;
  }
  
  const password = ref<number[]>(generatePassword());

  function generatePassword(): number[] {
    const count = allowRepeats.value
      ? passwordLength.value
      : Math.min(passwordLength.value, colorOptionsCount.value);

    if (colorOptionsCount.value == 0 || count == 0) {
      return [];
    }

    if (allowRepeats.value) {
      return Array.from(
        { length: count },
        () => Math.floor(Math.random() * colorOptionsCount.value)
      );
    }

    const options = Array.from({ length: colorOptionsCount.value }, (_, i) => i);
    shuffle(options);
    return options.slice(0, count);
  }


  const attempts = ref<number[][]>([]);
  
  function makeAttempt(attempt: number[]) {
    attempts.value.push(attempt);
  }

  const attemptLimit = ref<number>(0);
  function setAttemptLimit(limit: number) {
    attemptLimit.value = limit;
  }

  function reset(){
    password.value = generatePassword();
    colorOptions.value = GenerateColors(colorOptionsCount.value);
    setActiveColor(null);
    attempts.value = [];
  }

  const replies = computed<number[][]>(() => {
    const replies: number[][] = [];
    attempts.value.forEach(atmpt => {
      replies.push(evaluateAttempt(atmpt));
    });
    return replies;
  });

  function evaluateAttempt(attempt: number[]) {
    let reply = new Array(attempt.length).fill(null).map(() => 0);
    const correctPlacements = new Map<number, boolean>();
    const prensentColors = new Map<number, boolean>();
    colorOptions.value.forEach((_, index) => {
      correctPlacements.set(index, false);
      prensentColors.set(index, false);
    });

    attempt.forEach((value, index) => {
      const temp = password.value.indexOf(value);
      if (temp != -1) {
        (temp == index ?
          correctPlacements : prensentColors
        ).set(value, true);
      } 
    });
    for (let i = 0; i < reply.length; i++) {
      if (correctPlacements.get(i)?.valueOf()) {
        reply[i] = 2;
      } else if (prensentColors.get(i)?.valueOf()) {
        reply[i] = 1;
      }
    }
    reply = reply.sort((a: number, b: number): number => {
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    });
    return reply;
  }

  return {
    colorOptionsCount, passwordLength, allowRepeats, attemptLimit,
    colorOptions, password,
    activeColor, setActiveColor,
    attempts, makeAttempt, replies,
    reset,
  };
})
