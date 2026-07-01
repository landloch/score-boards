<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    modelValue: number | null;
    placeholder?: string;
    allowNegastive?: boolean;
  }>();

  const emit = defineEmits<{
    (event: 'update:modelValue', value: number | null): void;
  }>();


  const displayValue = computed(() => {
    return props.modelValue == null ? '' : String(props.modelValue);
  });

  function onChangeInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const rawValue = target.value;
    const hasNegativeSign = rawValue.startsWith('-');
    const digitsOnly = rawValue.replace(/-/g, '').replace(/\D/g, '').slice(0, hasNegativeSign ? 2 : 3);
    const sanitized = props.allowNegastive && hasNegativeSign ? `-${digitsOnly}` : digitsOnly;
    if (sanitized === '-') {
      target.value = sanitized;
      return;
    }
    const parsed = sanitized === '' ? null : Number(sanitized);
    target.value = sanitized;
    emit('update:modelValue', parsed);
  }
</script>

<template>
  <input
    inputmode="numeric"
    type="text"
    pattern="^-?[0-9]*"
    :placeholder="placeholder"
    :value="displayValue"
    @input="onChangeInput"
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