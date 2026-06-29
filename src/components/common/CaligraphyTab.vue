<script setup lang="ts">
  import { FONTS } from "../../constants/FontsMap.ts";
  import { useFontStore } from "@/stores/fontStore.ts";

  const fontStore = useFontStore();
</script>

<template>
  <div class="caligraphy-grid">
    <div
      :class="`${fontStore.font == key ? 'selected' : ''} font-card font-${key} }`"
      v-for="[key, value] in FONTS"
      :key="key"
      @click="fontStore.setFont(key)"
    >
      <span class="font-title">{{ value }}</span>
      <br />
      <span class="font-sample">0123456789</span>
    </div>
  </div>
</template>

<style scoped>
  .caligraphy-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
  }

  .font-card {
    border: 2px solid #333;
    border-radius: 5px;
    padding: 4px;
    box-sizing: border-box;
    height: 55px;
    cursor: pointer;
  }

  .font-title {
    font-size: 13px;
  }

  .font-sample {
    font-size: 20px;
  }

  .selected {
    border: 4px solid rgb(101, 186, 255);
    cursor: default;
  }
</style>
