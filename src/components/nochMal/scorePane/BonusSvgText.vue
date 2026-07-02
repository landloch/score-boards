<script setup lang="ts">
  defineProps({
    fill: { type: String, default: 'none' },
    stroke: { type: String, default: '#000' },
    strokeWidth: { type: Number, default: 4 },
    x: { type: Number, required: true }
  });
</script>

<template>
  <text
    :fill="fill"
    :stroke="stroke"
    :strokeWidth="strokeWidth"
    :x="x + 'px'"
    y="50%"
    textAnchor="middle"
    dominantBaseline="central"
    class="text"
  >
    <slot></slot>
  </text>
</template>

<style scoped>
  .text {
    font-size: 24px;
    transform:scaleX(1.2);
    -webkit-transform: scaleX(1.2);
  }
</style>