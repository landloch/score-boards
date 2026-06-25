<script setup lang="ts">
  defineProps({ action: Function });
</script>

<template>
  <button @click="() => action!()" className="button">
    <slot></slot>
  </button>
</template>

<style scoped>
  .button {
    width: 32px;
    height: 32px;
    border-radius: 5px;
    background: white;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    position: relative;
  }
</style>