<script setup lang="ts">
  import { type CSSProperties, type PropType } from 'vue'

  defineProps({
    color: { type: String, default: 'currentColor' },
    height: { type: Number, default: 26 },
    width: { type: Number, default: 26 },
    class: { type: String, default: "" },
    style: { type: Object, default: null },
  });
</script>

<template>
  <svg
    :stroke="color"
    :fill="color"
    stroke-width="0"
    viewBox="0 0 512 512"
    :height="height"
    :width="width"
    :style="style"
  >
    <path d="M48 448l416-192L48 64v149.333L346 256 48 298.667z" />
  </svg>
</template>

<style scoped>
  svg {
    background-color: transparent;
    margin: auto;
    display: inline-block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
</style>