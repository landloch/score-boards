<template>
  <div class="arrow" :style="{ '--shaft': `${shaftLength}px` }">
    <div class="shaft"></div>
    <div class="head"></div>
  </div>
</template>

<script setup>
  defineProps({
    shaftLength: {
      type: Number,
      default: 150
    }
  })
</script>

<style scoped>
.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}

.shaft {
  width: var(--shaft);
  height: 2px;
  background: currentColor;
}

.head {
  width: 16px;
  height: 12px;
  background: currentColor;
  margin-left: -2px;

  /* Slanted back corners */
  clip-path: polygon(
    5% 0%,
    100% 50%,
    5% 100%,
    0% 75%,
    40% 60%,
    0% 58.66%,
    0% 41.33%,
    40% 40%,
    0% 25%
  );
}
</style>