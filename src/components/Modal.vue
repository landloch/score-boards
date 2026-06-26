<script setup>
  import { onMounted, onUnmounted, ref } from 'vue';

  const props = defineProps({
    show: Boolean,
    width: { type: Number, default: 400 },
    height: { type: Number, default: 600 }
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
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-mask">
        <div
          class="modal-container"
          :style="{ '--modal-scale': scale }"
        >
          <div class="modal-header">
            <slot name="header">Sample modal</slot>
          </div>
          <div class="modal-body">
            <slot name="body">Body of modal dialog</slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button
                class="modal-default-button"
                @click="$emit('close')"
              >{{ $t('qrcode-modal.close') }}</button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
  }
  .modal-container {
    font-family: Calibri, sans-serif;
    width: fit-content;
    margin: auto;
    padding: 10px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    top: 50%;
    left: 50%;
    position: absolute;
    transform-origin: center center;
    transform: translate(-50%, -50%) scale(var(--modal-scale, 1));
  }
  .modal-header h2 {
    margin-top: 0;
    color: #333;
  }
  .modal-body {
    margin: 10px 0;
  }
  .modal-default-button {
    float: right;
  }
  .modal-enter-from {
    opacity: 0;
  }
  .modal-leave-to {
    opacity: 0;
  }
  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    -webkit-transform: translate(-50%, -50%) scale(calc(var(--modal-scale, 1) * 1.1));
    transform: translate(-50%, -50%) scale(calc(var(--modal-scale, 1) * 1.1));
  }
</style>