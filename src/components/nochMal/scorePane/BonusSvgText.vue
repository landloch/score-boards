<script setup lang="ts">
  defineProps({
    fill: { type: String, default: 'none' },
    stroke: { type: String, default: 'none' },
    x: { type: Number, required: true }
  });
</script>

<template>
  <text
    :fill="fill"
    :stroke="stroke"
    strokeWidth="7"
    :x="x + 'px'"
    y="50%"
    textAnchor="middle"
    dominantBaseline="central"
    className="text"
  >
    <slot></slot>
  </text>
</template>

<style>

</style>