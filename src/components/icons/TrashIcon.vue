<script setup lang="ts">
  defineProps({
    color: { type: String, default: 'currentColor' },
    height: { type: Number, default: 26 },
    width: { type: Number, default: 26 },
  });
</script>

<template>
  <svg
    :fill="color"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 512 512"
    :height="height"
    :width="width"
  >
    <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
  </svg>
</template>

<style scoped>
  .cross {
    height: 30px;
    width: 30px;
    background-color: transparent;
    margin: auto;
    display: inline-block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
</style>