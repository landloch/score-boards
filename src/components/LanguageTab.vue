<script setup lang="ts">
  import LanguageSelector from "@/components/LanguageSelector.vue";
  import { useFontStore } from "@/stores/fontStore.ts";
  import { ref, type Component } from 'vue';
  import Pt from './icons/flags/Pt.vue';
  import En from './icons/flags/En.vue';
  import Es from './icons/flags/Es.vue';
  import SquareButton from './SquareButton.vue';
  import { type Language } from '@/types/CommonTypes';
  import { i18n, loadLocale } from '@/i18n.ts';

  // https://nucleoapp.com/svg-flag-icons

  const flags = new Map<Language, Component>([
    ['en', En], ['es', Es], ['pt', Pt],
  ]);

  const selectedFlag = ref(
    flags.get(i18n.global.locale.value as Language) ?? En);
  const open = ref(false);

  function selectIcon(lang: Language, flag: Component) {
    selectedFlag.value = flag;
    loadLocale(lang);
    open.value = false;
  }
  const fontStore = useFontStore();
</script>

<template>
    <div class="caligraphy-grid">
      <SquareButton
        v-for="[lang, flag] in flags"
        :action="() => selectIcon(lang, flag)"
        :height="40"
        :width="40"
      >
        <component :is="flag" :height="34" :width="34" />
      </SquareButton>
    </div>
</template>

<style scoped>

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
    grid-template-columns: 1fr 1fr 1fr;
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
