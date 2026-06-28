<script setup lang="ts">
  defineProps({
    color: { type: String, default: 'currentColor' },
    height: { type: Number, default: 26 },
    width: { type: Number, default: 26 },
  });
</script>

<template>
  <svg
    style="font-size: 2.88em;"
    :height="height"
    :width="width"
    viewBox="0.48 0.48 23.04 23.04"
    :fill="color"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z" />
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