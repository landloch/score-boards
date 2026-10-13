<script setup lang="ts">
  defineProps({
    action: Function,
    height: { type: Number, default: 32 },
    width: { type: Number, default: 32 },
    color: { type: String, default: "white" }
  });
</script>

<template>
  <button
    @click="(event) => action!(event)"
    class="button"
    :style="{
      '--width': width + 'px',
      '--height': height + 'px',
      'background-color': color
    }"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
  .button {
    width: var(--width, 32px);
    height: var(--height, 32px);
    border-radius: 5px;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    position: relative;
  }
</style>