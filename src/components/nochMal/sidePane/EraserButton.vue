<script setup lang="ts">
  import EraserIcon from '@/components/icons/EraserIcon.vue';
  import { useScoreStore } from '@/stores/scoreStore';
  import { ref } from 'vue';

  const isModalVisible = ref(false);
  const {
    resetMainGrid,
    resetJokers,
    resetColorBoxes,
    resetLetterHeaderBoxes,
    resetLetterScoreBoxes,
  } = useScoreStore();

  const resset = () => {
    resetMainGrid();
    resetJokers();
    resetColorBoxes();
    resetLetterHeaderBoxes();
    resetLetterScoreBoxes();
  };
</script>

<template>
  <button
    class="resset-button"
    @click="() => isModalVisible = true"
  >
    <EraserIcon />
  </button>
  <div v-if="isModalVisible" class="overlay">
    <div class="modal" :style="{ width: '225px', height: 'auto' }">
      <div
        class="modal-title"
        :style="{ marginBottom: '20px' }"
      >
      <span class="modal-title-text">Clear sheet?</span>
      </div>
      <div class="modal-actions">
        <button
          class="modal-button"
          @click="() => isModalVisible = false"
        >
          No
        </button>
        <button
          class="modal-button"
          @click="() => {
            resset();
            isModalVisible = false;
          }"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .resset-button {
    width: 32px;
    height: 32px;
    border-radius: 5px;
    background: white;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    position: relative;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    transition: all;
    transition-duration: 0.25s;
    touch-action: none;
    background: rgba(0,0,0,.3);
  }

  .modal {
    height: 400px;
    width: 350px;
    background-color: #404040;
    display: flex;
    flex-direction: column;
    position: absolute;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    padding: 10px;
  }

  .modal-title {
    display: flex;
    margin-bottom: 10px;
  }

  .modal-title-text {
    margin-left: auto;
    margin-right: auto;
    font-size: 40px;
    height: fit-content;
    text-align: center;
    color: #fff;
  }

  .modal-close {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    position: relative;
  }

  .modal-actions {
    display: flex;
    justify-content: space-around;
  }

  .modal-button {
    font-size: 30px;
    width: 70px;
    height: 35px;
  }
</style>