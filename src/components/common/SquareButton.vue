<script setup lang="ts">
  defineProps({
    action: Function,
    height: { type: Number, default: 32 },
    width: { type: Number, default: 32 },
  });
</script>

<template>
  <button
    @click="(event) => action!(event)"
    className="button"
    :style="{ '--width': width + 'px', '--height': height + 'px' }"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
  .button {
    width: var(--width, 32px);
    height: var(--height, 32px);
    border-radius: 5px;
    background: white;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    position: relative;
  }
</style>