<script setup lang="ts">
  import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch } from 'vue';
  import { InputRow, type InputCell } from '@/types/PandaRoyalTypes';
  import SquareButton from '@/components/common/SquareButton.vue';
  import ScalingContainer from '@/components/common/ScalingContainer.vue';
  import IntegerInput from '@/components/common/IntegerInput.vue';
  import CheatSheet from '@/components/panda-royale/CheatSheet.vue';
  import Header from '@/components/panda-royale/Header.vue';
  import EraserIcon from '@/components/icons/EraserIcon.vue';
  import { useFontStore } from '@/stores/fontStore';
  import Modal from '@/components/common/Modal.vue';
  import { useI18n } from 'vue-i18n';
  import { usePasswordStore } from '@/stores/passwordStore';
  import TackIcon from '@/components/icons/password/TackIcon.vue';
  import PegHole from '@/components/password/PegHole.vue';

  const { t } = useI18n();

  const passwordStore = usePasswordStore();
  const replyTackColors = ["gray", "white", "black"];

  const attempt = ref<(number | null)[]>(
    new Array(passwordStore.password.length).fill(null).map(() => null)
  );

  function handleSelect(option: string) {
    passwordStore.setActiveColor(option);
  }

  const cursorX = ref(0);
  const cursorY = ref(0);

  function handleMouseMove(event: MouseEvent) {
    cursorX.value = event.clientX;
    cursorY.value = event.clientY;
  }

  function handleRightClick(event: MouseEvent) {
    if (passwordStore.activeColor != null) {
      event.preventDefault();
      passwordStore.activeColor = null;
    }
  }

  function placeTack(index: number) {
    if (passwordStore.activeColor != null) {
      attempt.value[index] =
        passwordStore.colorOptions.indexOf(passwordStore.activeColor);
    } else {
      attempt.value[index] = null;
    }
  }

  function submitAttempt() {
    console.log("Validating...");
    if (attempt.value.includes(null)) return;
    console.log("Submiting...");
    passwordStore.makeAttempt(attempt.value as number[]);
    attempt.value = new Array(passwordStore.password.length).fill(null).map(() => null);
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('contextmenu', handleRightClick);
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('contextmenu', handleRightClick);
  })

</script>

<template>
  <div class="backdrop">
    <ScalingContainer :height="644" :width="455">
      <Header />
      <div
        v-for="(prevAttempt, i) in passwordStore.attempts"
        class="attempt-container"
      >
        <SquareButton v-for="colorIndex in prevAttempt">
          <TackIcon
            :color="passwordStore.colorOptions[colorIndex]"
          />
        </SquareButton>
        <div class="reply-grid">
          <span
            v-for="replyColorIndex in passwordStore.replies[i]"
            :style="{ color: replyTackColors[replyColorIndex] }"
          >
            ●
          </span>
        </div>
      </div>
      <div> <!-- current attempt -->
        <PegHole
          v-for="(colorIndex, index) in attempt"
          :index="index"
          :action="() => placeTack(index)"
          :color="colorIndex != null ? passwordStore.colorOptions[colorIndex] : undefined"
        />
        <SquareButton :action="submitAttempt">
          Submit Attempt
        </SquareButton>
      </div>
      <div> <!-- color options -->
        <SquareButton
          v-for="(option, index) in passwordStore.colorOptions"
          :action="() => handleSelect(option)"
          :color="passwordStore.activeColor == option ? 'black' : 'white'"
        >
          <TackIcon :color="option" />
        </SquareButton>
        <SquareButton :action="passwordStore.resset">
          Resset
        </SquareButton>
      </div>
      <div>
        <SquareButton
          v-for="(colorIndex) in passwordStore.password"
          color="black"
        >
          <TackIcon :color="passwordStore.colorOptions[colorIndex]" />
        </SquareButton>
      </div>
    </ScalingContainer>
  </div>
  <TackIcon
    v-if="passwordStore.activeColor != null"
    class="cursor-svg"
    :style="{
      left: `${cursorX}px`,
      top: `${cursorY}px`
    }"
    :color="passwordStore.activeColor"
  />
</template>

<style scoped>
  .backdrop {
    background-color: #333;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  * {
    font-size: 20px;
    color: #333;
    box-sizing: border-box;
    text-align: center;
    vertical-align: middle;
  }

  .cursor-svg {
    position: fixed;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }

  .attempt-container {
    display: inline-block;
  }

  .reply-grid {
    display: grid;
    grid-template-columns: auto auto auto;
    background-color: #2196F3;
    padding: 3px;
  }
</style>