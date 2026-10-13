<script setup lang="ts">
  import { usePasswordStore } from '@/stores/passwordStore.ts';
  import SquareButton from '../common/SquareButton.vue';
  import TackIcon from '../icons/password/TackIcon.vue';

  defineProps({
    action: Function,
    index: { type: Number, required: true },
    color: { type: String, default: null }
  });
</script>

<template>
  <button
    @click="(event) => action!(event)"
    class="button"
  >
    <TackIcon
      v-if="color"
      :color="color"
    />
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
