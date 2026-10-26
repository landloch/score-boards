import { computed, ref, toRaw, toValue } from 'vue';
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
    console.log("password.value:", toRaw(password.value));
    console.log("attempt:", toRaw(attempt));

    // index: color, value: count in password
    const passwordColorCount = Array.from({ length: password.value.length }, () => 0);
    // index: attemp index, value: 2-black, 1-white, 0-gray; all start at 0
    const reply = Array.from({ length: attempt.length }, () => 0);

    password.value.forEach((value, index) => {
      passwordColorCount[value]!++;
    });
    console.log("passwordColorCount:", passwordColorCount);
  
    console.log("Full matches:");
    attempt.forEach((value, index) => {
      if (value == password.value[index]) {
        console.log(index);
        reply[index] = 2;
        passwordColorCount[value]!--;
      }
    });
    console.log("passwordColorCount:", passwordColorCount);

    console.log("Partial matches:");
    attempt.forEach((value, index) => {
      if (passwordColorCount[value]! > 0) {
        console.log(index);
        reply[index] = 1;
        passwordColorCount[value]!--;
      }
    });
    console.log("passwordColorCount:", passwordColorCount);
    console.log("reply:", reply);
    reply.sort((a, b) => b - a);
    return reply;
  }

  return {
    colorOptionsCount, passwordLength, allowRepeats, attemptLimit,
    colorOptions, password,
    activeColor, setActiveColor,
    attempts, makeAttempt, replies,
    reset,
  };
});
