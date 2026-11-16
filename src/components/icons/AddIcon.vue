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
    viewBox="0 0 512 512"
    :height="height"
    :width="width"
  >
    <path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z" />
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

