<script setup lang="ts">
  import Modal from '@/components/common/Modal.vue';
import EraserIcon from '@/components/icons/EraserIcon.vue';
  import { useScoreStore } from '@/stores/scoreStore';
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const isModalVisible = ref(false);
  const {
    resetMainGrid,
    resetJokers,
    resetColorBoxes,
    resetLetterHeaderBoxes,
    resetLetterScoreBoxes,
  } = useScoreStore();

  function resset() {
    resetMainGrid();
    resetJokers();
    resetColorBoxes();
    resetLetterHeaderBoxes();
    resetLetterScoreBoxes();
    isModalVisible.value = false;
  };
</script>

<template>
  <button
    class="resset-button"
    @click="() => isModalVisible = true"
  >
    <EraserIcon />
  </button>
  <Modal
    :show="isModalVisible"
    @close="() => isModalVisible = false"
    :action="resset"
    :action-label="t('modal.yes')"
    :close-label="t('modal.no')"
    :width="200"
    :height="70"
  >
    
    <div>{{ $t("noch-mal.clear-sheet") }}?</div>
  </Modal>
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

  * {
    font-size: 20px;
    color: #333;
    box-sizing: border-box;
    text-align: center;
    vertical-align: middle;
  }
</style>