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

  function updateScale() {
    const sx = window.innerWidth / props.width
    const sy = window.innerHeight / props.height
    scale.value = Math.min(sx, sy)
  }

  onMounted(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateScale);
  });
</script>

<template>
  <div
    class="container" 
    :style="{ transform: `scale(${scale})`, width: width + 'px', height: height + 'px'  }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
  .container {
    padding:10px;
    transform-origin: center center;
    z-index: 1;
    text-align: center;
    vertical-align: middle;
  }
</style>
