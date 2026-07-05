<script setup lang="ts">
  defineProps({
    stroke: { type: String, default: 'currentColor' },
    fill: { type: String, default: 'currentColor' },
    strokeWidth: { type: Number, default: 0 },
    height: { type: Number, default: 26 },
    width: { type: Number, default: 26 },
  });
</script>

<template>
  <svg
    :stroke="stroke"
    :fill="fill"
    stroke-width="0"
    viewBox="0 0 512 512"
    :height="height"
    :width="width"
  >
    <path d="m464 440-28.12-32.11c-22.48-25.65-43.33-45.45-72.08-58.7-26.61-12.26-60-18.65-104.27-19.84V432L48 252 259.53 72v103.21c72.88 3 127.18 27.08 161.56 71.75C449.56 284 464 335.19 464 399.26z"></path>
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