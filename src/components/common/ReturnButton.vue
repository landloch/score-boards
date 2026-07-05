<script setup lang="ts">
  import ReturnIcon from '@/components/icons/ReturnIcon.vue';
  import { RouterLink } from 'vue-router';
</script>

<template>
  <RouterLink to="/" class="button">
    <ReturnIcon fill="#fff" :height="36" :width="36" />
  </RouterLink>
</template>

<style scoped>
  .button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: transparent;
    border: none;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    position: relative;
    cursor: pointer;
  }
</style>