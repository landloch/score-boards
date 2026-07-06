<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps({
    text: {
      type: String,
      default: 'Title'
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 70
    },
    outerStroke: {
      type: String,
      default: '#fff'
    },
    middleStroke: {
      type: String,
      default: '#000'
    },
    innerStroke: {
      type: String,
      default: '#ffa'
    },
    outerStrokeWidth: {
      type: Number,
      default: 12
    },
    middleStrokeWidth: {
      type: Number,
      default: 6
    },    
    innerStrokeWidth: {
      type: Number,
      default: 2
    },
    gradientTop: {
      type: String,
      default: '#FFE56B'
    },
    gradientMiddle: {
      type: String,
      default: '#FF9800'
    },
    gradientBottom: {
      type: String,
      default: '#D32F2F'
    }
  })

  const uid = Math.random().toString(36).slice(2)

  const gradientId = computed(() => `gradient-${uid}`)
  const textId = computed(() => `text-${uid}`)
</script>

<template>
  <svg
    :viewBox="`0 0 ${width} ${height}`"
    :width="width"
    :height="height"
  >
    <defs>
      <linearGradient
        :id="gradientId"
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
      >
        <stop offset="0%" :stop-color="gradientTop" />
        <stop offset="50%" :stop-color="gradientMiddle" />
        <stop offset="100%" :stop-color="gradientBottom" />
      </linearGradient>

      <text
        :id="textId"
        class="svg-title"
        x="50%"
        y="50%"
      >
        {{ text }}
      </text>
    </defs>

    <!-- Outer black outline -->
    <use
      :href="`#${textId}`"
      fill="none"
      :stroke="outerStroke"
      :stroke-width="outerStrokeWidth"
    />

    <!-- Middle white outline -->
    <use
      :href="`#${textId}`"
      fill="none"
      :stroke="middleStroke"
      :stroke-width="middleStrokeWidth"
    />

    <!-- Inner yellow outline -->
    <use
      :href="`#${textId}`"
      fill="none"
      :stroke="innerStroke"
      :stroke-width="innerStrokeWidth"
    />

    <!-- Gradient fill -->
    <use
      :href="`#${textId}`"
      :fill="`url(#${gradientId})`"
    />
  </svg>
</template>

<style scoped>
  .svg-title {
    font-size: 48px;
    font-weight: 900;
    transform: scaleX(1.1);
    transform-origin: center center;
    font-family: "Bangers", sans-serif;

    text-anchor: middle;
    dominant-baseline: middle;

    stroke-linejoin: round;
    paint-order: stroke fill;
    letter-spacing: 3px;
  }
</style>