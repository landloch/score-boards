<script setup lang="ts">
  defineProps({
    color: { type: String, default: 'currentColor' },
    height: { type: Number, default: 26 },
    width: { type: Number, default: 26 },
  });
</script>

<template>
  <svg
    :stroke="color"
    :fill="color"
    stroke-width="0"
    viewBox="0 0 24 24"
    :height="height"
    :width="width"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M14 10H3v2h11zm0-4H3v2h11zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2zM3 16h7v-2H3z" />
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





