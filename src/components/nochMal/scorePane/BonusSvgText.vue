<script setup lang="ts">
  defineProps({
    fill: { type: String, default: 'none' },
    stroke: { type: String, default: '#000' },
    strokeWidth: { type: Number, default: 3 },
    x: { type: Number, required: true }
  });
</script>

<template>
  <text
    :fill="fill"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    :x="x + 'px'"
    y="50%"
    text-anchor="middle"
    dominant-baseline="central"
    class="text"
  >
    <slot></slot>
  </text>
</template>

<style scoped>
  .text {
    font-size: 20px;
  }
</style>