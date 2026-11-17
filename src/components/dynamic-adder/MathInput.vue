<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { evaluateExpression } from '@/utils/MathMagic';

  const props = defineProps<{
    class?: string;
    name?: string;
    placeholder?: string;
  }>();

  const modelValue = defineModel<string | null>({ required: true });

  const isFocused = ref(false);
  const inputValue = ref(modelValue.value ?? '');

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
    type="text"
    :class="props.class"
    :name="props.name"
    :placeholder="placeholder"
    :value="isFocused ? inputValue : displayValue"
    @input="onChangeInput"
    @focus="onFocus"
    @blur="onBlur"
  />
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
</style>