<script setup lang="ts">
  import { evaluateExpression } from '@/utils/MathMagic';
  import { computed, nextTick, ref, watch } from 'vue';

  const props = defineProps<{
    class?: string;
    name?: string;
    placeholder?: string;
  }>();

  const modelValue = defineModel<string | null>({ required: true });

  const isFocused = ref(false);
  const inputValue = ref(modelValue.value ?? '');
  const inputElement = ref<HTMLInputElement | null>(null);
  const acceptedKeys = [
    '7', '8', '9', '(', ')',
    '4', '5', '6', '+', '-',
    '1', '2', '3', '*', '/',
    '0', '.', '%', '^',
  ];

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
    inputValue.value = `${inputValue.value}${character}`;
    modelValue.value = inputValue.value;
    nextTick(() => {
      input?.focus();
    });
  }

  function backspace() {
    const input = inputElement.value;
    inputValue.value = inputValue.value.slice(0, -1);
    modelValue.value = inputValue.value;
    nextTick(() => {
      input?.focus();
    });
  }

  function clearInput() {
    inputValue.value = '';
    modelValue.value = '';
    nextTick(() => {
      inputElement.value?.focus();
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

  function onKeydown(event: KeyboardEvent) {
    if (acceptedKeys.includes(event.key)) {
      event.preventDefault();
      insertCharacter(event.key);
    } else if (event.key === 'Backspace') {
      event.preventDefault();
      backspace();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      finishInput();
    }
  }
</script>

// keypad needs to push up the rest of the screen

<template>
  <input
    ref="inputElement"
    type="text"
    readonly
    :class="props.class"
    :name="props.name"
    :placeholder="placeholder"
    :value="displayValue"
    @focus="onFocus"
    @blur="onBlur"
    @keydown="onKeydown"
  />
  <Teleport to="body">
    <div v-if="isFocused" class="keypad" role="group" aria-label="Calculator keypad">
      <div class="keypad-display" aria-live="polite">
        <div class="preview">
          <span class="display-value">{{ displayValue }}</span>
        </div>
        <hr class="keypad-divider" />
        <div class="expression">
          <span class="display-value">{{ inputValue }}</span>
        </div>
      </div>
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
        <button type="button" class="utility clear" @pointerdown.prevent @click="clearInput">Clear</button>
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
    border-top: 1px solid #383a40;
    background: #1b1c20;
    box-shadow: 0 -4px 18px rgb(0 0 0 / 40%);
  }

  .keypad-display {
    display: grid;
    gap: 8px;
    width: min(100%, 420px);
    margin: 0 auto 8px;
    color: #f0f0f2;
  }

  .display-value {
    display: block;
    width: 100%;
    min-width: 0;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    text-align: right;
  }

  .preview .display-value {
    height: 18px;
    line-height: 20px;
    font-size: 14px;
    font-weight: 600;
  }

  .expression .display-value {
    height: 30px;
    line-height: 30px;
    font-size: 24px;
  }

  .keypad-divider {
    width: 100%;
    margin: 0;
    border: 0;
    border-top: 1px solid #383a40;
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
    border: 1px solid #3a3d44;
    border-radius: 6px;
    background: #292b31;
    color: #f0f0f2;
    font-size: 20px;
    font-family: inherit;
    touch-action: manipulation;
    transition: background-color 120ms ease, border-color 120ms ease, transform 120ms ease;
  }

  .keys button:active {
    transform: translateY(1px);
    background: #3a3d45;
  }

  .keys button:focus-visible {
    outline: 2px solid #a87ad1;
    outline-offset: 2px;
  }

  .keys .utility {
    border-color: #494c55;
    background: #373940;
    color: #e0e1e5;
  }

  .keys .clear,
  .keys .done {
    grid-column: span 2;
  }

  .keys .done {
    border-color: #7942b8;
    background: #7942b8;
    color: #fff;
  }

  .keys .done:active {
    background: #6938a2;
  }
</style>