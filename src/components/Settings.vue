<script setup lang="ts">
  import QrCodeIcon from '@/components/icons/QrCodeIcon.vue';
  import TranslateIcon from '@/components/icons/TranslateIcon.vue';
  import CaligraphyIcon from '@/components/icons/CaligraphyIcon.vue';
  import SettingsIcon from '@/components/icons/SettingsIcon.vue';
  import LanguageSelector from '@/components/LanguageSelector.vue'
  import Modal from '@/components/Modal.vue';
  import { computed, ref } from 'vue';
  import { FONTS } from './../Constants/FontsMap.ts';
  import { useFontStore } from '@/stores/fontStore.ts';
  import type { Tab } from '@/types/CommonTypes.ts';
  import Tabs from './Tabs.vue';
  import { useI18n } from 'vue-i18n';
  import LanguageTab from './LanguageTab.vue';

  const { t } = useI18n();
  const shoModal = ref(false);
  const fontStore = useFontStore();
  const tabs = computed<Tab[]>(() => [
    { id: 'caligraphy', label: t('modal.caligraphy.title'), icon: CaligraphyIcon },
    { id: 'language', label: t('modal.language.title'), icon: TranslateIcon },
    { id: 'qrCode', label: t('modal.qrcode.title'), icon: QrCodeIcon }
  ]);
  const currentTab = ref('caligraphy');
</script>

<template>
  <button @click="() => shoModal = true" className="button">
    <SettingsIcon fill="#fff" stroke="#333" strokeWidt="2" :height="36" :width="36" />
  </button>
  <Modal :show="shoModal" @close="shoModal = false">
    <Tabs v-model="currentTab" :tabs="tabs">
      <template #caligraphy>
        <div class="caligraphy-grid">
          <div
            :class="`${fontStore.font == key ? 'selected' : ''} font-card font-${key} }`"
            v-for="[key, value] in FONTS"
            :key="key"
            @click="fontStore.setFont(key)"
          >
            <span class="font-title">{{ value }}</span>
            <br>
            <span class="font-sample">0123456789</span>
          </div>
        </div>
      </template>

      <template #language>
        <!-- <LanguageSelector /> -->
        <LanguageTab />
      </template>

      <template #qrCode>
        <span class="qrcode-container"><img class="qrcode" src="../assets/qr-code.svg"></span>
      </template>
    </Tabs>
  </Modal>
</template>

<style scoped>
  .button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: transparent;
    border: none;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    position: relative;
    cursor: pointer;
  }

  .title-line {
    display: flex;
    justify-content: space-between;
  }

  .icon-holder {
    position: relative;
    margin-right: 20px;
  }
  

  .qrcode {
    width: 315px;
  }

  .caligraphy-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
  }

  .font-card {
    border: 2px solid #333;
    border-radius: 5px;
    padding: 4px;
    box-sizing: border-box;
    /* width: 160px; */
    height: 55px;
    cursor: pointer;
  }

  .font-title {
    font-size: 13px;
  }

  .font-sample {
    font-size: 20px;
  }

  .selected {
    border: 4px solid rgb(101, 186, 255);
    cursor: default;
  }

</style>