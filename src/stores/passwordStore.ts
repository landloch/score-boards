import { computed, ref, toValue } from 'vue';
import { defineStore } from 'pinia';
import { GenerateColors } from '@/utils/ColorGenerator';
import { shuffle } from '@/utils/Shuffler';

export const usePasswordStore = defineStore('password', () => {
  const colorOptions = ref<string[]>(GenerateColors(6));
  function generateColorOptions(number: number) {
    colorOptions.value = GenerateColors(number);
  }

  const activeColor = ref<string | null>(null);
  function setActiveColor(color: string | null) {
    activeColor.value = color;
  }
  
  const password = ref<number[]>(generatePassword(6));
  function generatePassword(length: number) {
    const range = new Array(length).fill(null).map((_, i) => i);
    shuffle(range);
    return range;
  }

  const attempts = ref<number[][]>([]);
  
  function makeAttempt(attempt: number[]) {
    attempts.value.push(attempt);
  }

  const attemptLimit = ref<number>(0);
  function setAttemptLimit(limit: number) {
    attemptLimit.value = limit;
  }

  function resset(){
      password.value = generatePassword(6);
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
    colorOptions, generateColorOptions,
    activeColor, setActiveColor,
    password,
    attempts, replies, makeAttempt,
    attemptLimit, setAttemptLimit,
    resset,
  };
})
