<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';

  const props = defineProps({
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    }
  });

  const scale = ref(1);
  const containerElement = ref<HTMLDivElement | null>(null);
  let resizeObserver: ResizeObserver | null = null;
  const containerPadding = 10;

  function updateScale() {
    const parent = containerElement.value?.parentElement;
    if (parent?.classList.contains('keypad-open')) {
      return;
    }

    const sx = window.innerWidth / (props.width + containerPadding * 2);
    const sy = window.innerHeight / (props.height + containerPadding * 2);
    scale.value = Math.min(sx, sy);
  }

  onMounted(() => {
    updateScale();
    window.addEventListener('resize', updateScale);

    const parent = containerElement.value?.parentElement;
    if (parent && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateScale);
      resizeObserver.observe(parent);
    }
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateScale);
    resizeObserver?.disconnect();
  });
</script>

<template>
  <div
    ref="containerElement"
    class="container"
    :style="{
      zoom: scale,
      width: width + 'px',
      height: height + 'px',
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
  .container {
    padding:10px;
    z-index: 1;
    text-align: center;
    vertical-align: middle;
  }
</style>
