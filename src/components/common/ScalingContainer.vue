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
    const zoomScale = parent?.classList.contains('keypad-open')
      ? window.visualViewport?.scale ?? 1
      : 1;
    const availableWidth = (parent?.clientWidth ?? window.innerWidth) * zoomScale;
    const availableHeight = (parent?.clientHeight ?? window.innerHeight) * zoomScale;
    const sx = availableWidth / (props.width + containerPadding * 2);
    const sy = availableHeight / (props.height + containerPadding * 2);
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
      transform: `scale(${scale})`,
      width: width + containerPadding * 2 + 'px',
      height: height + containerPadding * 2 + 'px',
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
  .container {
    box-sizing: border-box;
    padding:10px;
    transform-origin: center center;
    z-index: 1;
    text-align: center;
    vertical-align: middle;
  }
</style>
