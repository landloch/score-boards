<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    modelValue: number | null;
    placeholder?: string;
  }>();

  const emit = defineEmits<{
    (event: 'update:modelValue', value: number | null): void;
  }>();

  const displayValue = computed(() => {
    return props.modelValue == null ? '' : String(props.modelValue);
  });

  function onChangeInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const sanitized = target.value.replace(/\D/g, '').slice(0, 3);
    const parsed = sanitized === '' ? null : Number(sanitized);
    target.value = sanitized;
    emit('update:modelValue', parsed);
  }
</script>

<template>
  <input
    inputmode="numeric"
    type="text"
    pattern="[0-9]*"
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