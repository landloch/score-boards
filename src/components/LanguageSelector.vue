<script setup lang="ts">
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

  function handleClickAway() {
    open.value = false;
  }

  function handleClickOpen(event: MouseEvent) {
    event.stopPropagation();
    open.value = !open.value;
  }
</script>

<template>
  <div class="container">
    <SquareButton
      :action="handleClickOpen"
      :height="40"
      :width="40"
    >
      <selectedFlag :height="34" :width="34" />
    </SquareButton>
    <Transition name="dropdown">
      <div
        v-if="open"
        v-click-away="handleClickAway"
        class="dropdown-menu"
      >
        <SquareButton
          v-for="[lang, flag] in flags"
          :action="() => selectIcon(lang, flag)"
          :height="40"
          :width="40"
        >
          <component :is="flag" :height="34" :width="34" />
        </SquareButton>
      </div>
    </Transition>
  </div>
</template>   

<style scoped>
  .container {
    position: relative;
  }
  .dropdown-menu {
    position: absolute;
    background: white;
    top: 40px;
    left: -4px;
    z-index: 1;
    display: grid;
    gap: 2px;
    transition: all 0.3s ease;
    padding: 2px;
    border: 2px solid #666;
    border-radius: 4px;
  }
  .dropdown-enter-from {
    opacity: 0;
  }
  .dropdown-leave-to {
    opacity: 0;
  }
  .dropdown-enter-from .dropdown-menu,
  .dropdown-leave-to .dropdown-menu {
    -webkit-transform: scale(2);
    transform: scale(2);
  }
</style>