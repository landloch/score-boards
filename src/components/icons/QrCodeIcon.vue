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
    viewBox="0 0 24 24"
    :fill="color"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M16 17v-1h-3v-3h3v2h2v2h-1v2h-2v2h-2v-3h2v-1h1zm5 4h-4v-2h2v-2h2v4zM3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zM6 6h2v2H6V6zm0 10h2v2H6v-2zM16 6h2v2h-2V6z" />
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