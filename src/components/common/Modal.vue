<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const props = defineProps({
    show: Boolean,
    width: { type: Number, default: 315 },
    height: { type: Number, default: 400 },
    action: Function,
    actionLabel: String,
    closeLabel: String

  });

  const emit = defineEmits(['close']);
  const scale = ref(1);

  function updateModalScale() {
    const sx = window.innerWidth / (props.width * 1.2)
    const sy = window.innerHeight / (props.height * 1.2)
    scale.value = Math.min(sx, sy)
  }

  onMounted(() => {
    updateModalScale();
    window.addEventListener('resize', updateModalScale);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateModalScale);
  });
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-mask">
        <div
          class="modal-container"
          :style="{ width: width + 'px', height: height + 'px', '--modal-scale': scale }"
          @click="(event) => event.stopPropagation()"
        >
          <slot></slot>
          <div class="modal-footer">
            <button
              class="modal-button"
              @click="$emit('close')"
            >
              {{ closeLabel ?? $t('modal.close') }}
            </button>
            <button
              v-if="action"
              class="modal-button"
              @click="() => action!()"
            >
              {{ actionLabel ?? $t('modal.yes') }}
            </button>
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
    margin: auto;
    padding: 10px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0action, 0, 0, 0.33);
    transition: all 0.3s ease;
    top: 50%;
    left: 50%;
    position: absolute;
    transform-origin: center center;
    -webkit-transform: translate(-50%, -50%) scale(var(--modal-scale, 1));
    transform: translate(-50%, -50%) scale(var(--modal-scale, 1));
    display: flex;
    flex-direction: column;
  }
  .modal-header h2 {
    margin-top: 0;
    color: #333;
  }
  .modal-body {
    margin: 10px 0;
  }
  .modal-footer {
    margin-top: auto;
    height: fit-content;
    display: flex;
    justify-content: space-around;
  }

  .modal-button {
    background-color: #fff;
    border-radius: 5px;
    width: 70px;
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