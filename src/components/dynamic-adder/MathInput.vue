<script setup lang="ts">
  import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
  import { evaluateExpression } from '@/utils/MathMagic';

  const props = defineProps<{
    class?: string;
    name?: string;
    placeholder?: string;
  }>();

  const modelValue = defineModel<string | null>({ required: true });

  const isFocused = ref(false);
  const isMobile = ref(false);
  const inputValue = ref(modelValue.value ?? '');
  const inputElement = ref<HTMLInputElement | null>(null);
  const acceptedKeys = [
    '7', '8', '9', '(', ')',
    '4', '5', '6', '+', '-',
    '1', '2', '3', '*', '/',
    '0', '^', '%',
  ];

  const mobilePointer = window.matchMedia('(pointer: coarse)');

  function updateMobileState() {
    isMobile.value = mobilePointer.matches;
  }

  onMounted(() => {
    updateMobileState();
    mobilePointer.addEventListener('change', updateMobileState);
  });

  onUnmounted(() => {
    mobilePointer.removeEventListener('change', updateMobileState);
  });

  watch(
    modelValue,
    (value) => {
      inputValue.value = value ?? '';
    },
    { immediate: true },
  );

  function onFocus() {
    isFocused.value = true;
  }

  function onBlur() {
    isFocused.value = false;
  }

  function insertCharacter(character: string) {
    const input = inputElement.value;
    const start = input?.selectionStart ?? inputValue.value.length;
    const end = input?.selectionEnd ?? start;
    const value = inputValue.value;
    inputValue.value = `${value.slice(0, start)}${character}${value.slice(end)}`;
    modelValue.value = inputValue.value;
    nextTick(() => {
      input?.focus();
      input?.setSelectionRange(start + character.length, start + character.length);
    });
  }

  function backspace() {
    const input = inputElement.value;
    const start = input?.selectionStart ?? inputValue.value.length;
    const end = input?.selectionEnd ?? start;
    const deleteStart = start === end ? Math.max(0, start - 1) : start;
    inputValue.value = `${inputValue.value.slice(0, deleteStart)}${inputValue.value.slice(end)}`;
    modelValue.value = inputValue.value;
    nextTick(() => {
      input?.focus();
      input?.setSelectionRange(deleteStart, deleteStart);
    });
  }

  function clearInput() {
    inputValue.value = '';
    modelValue.value = '';
    nextTick(() => {
      inputElement.value?.focus();
      inputElement.value?.setSelectionRange(0, 0);
    });
  }

  function finishInput() {
    inputElement.value?.blur();
  }

  const displayValue = computed(() => {
    const expression = inputValue.value ?? '';

    if (!expression) {
      return '';
    }

    try {
      return evaluateExpression(expression);
    } catch {
      return expression;
    }
  });

  function onChangeInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const rawValue = target.value;
    const sanitized = rawValue.replace(/[^0-9(),+\-/*^%]/g, '');

    inputValue.value = sanitized;
    target.value = sanitized;
    modelValue.value = sanitized;
  }
</script>

<template>
  <input
    ref="inputElement"
    type="text"
    :readonly="isMobile"
    :class="props.class"
    :name="props.name"
    :placeholder="placeholder"
    :value="isFocused ? inputValue : displayValue"
    @input="onChangeInput"
    @focus="onFocus"
    @blur="onBlur"
  />
  <Teleport to="body">
    <div v-if="isMobile && isFocused" class="keypad" role="group" aria-label="Calculator keypad">
      <div class="keys">
        <button
          v-for="key in acceptedKeys"
          :key="key"
          type="button"
          @pointerdown.prevent
          @click="insertCharacter(key)"
        >
          {{ key }}
        </button>
        <button type="button" class="utility" aria-label="Backspace" @pointerdown.prevent @click="backspace">⌫</button>
        <button type="button" class="utility" @pointerdown.prevent @click="clearInput">Clear</button>
        <button type="button" class="done" @pointerdown.prevent @click="finishInput">Done</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    text-align: center;
    font-size: inherit;
    font-family: inherit;
    background: transparent;
  }

  .keypad {
    position: fixed;
    z-index: 10000;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 8px 8px calc(8px + env(safe-area-inset-bottom));
    background: #e6e6e6;
    box-shadow: 0 -2px 12px rgb(0 0 0 / 25%);
  }

  .keys {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 6px;
    width: min(100%, 420px);
    margin: 0 auto;
  }

  .keys button {
    min-height: 44px;
    border: 0;
    border-radius: 6px;
    background: white;
    color: #222;
    font-size: 20px;
    font-family: inherit;
    touch-action: manipulation;
  }

  .keys .utility {
    background: #d2d2d2;
  }

  .keys .done {
    background: #444;
    color: white;
  }
</style>