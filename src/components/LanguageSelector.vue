<script setup lang="ts">
  import { ref, type Component } from 'vue';
  import PtBr from './icons/flags/PtBr.vue';
  import EnUs from './icons/flags/EnUs.vue';
  import SpEs from './icons/flags/SpEs.vue';
  import SquareButton from './SquareButton.vue';
  import { type Language } from '@/types/CommonTypes';
  import { useLanguageStore } from '@/stores/languageStore.ts';

  const languageStore = useLanguageStore();
  const flags = new Map<Language, Component>([
    ['En-Us', EnUs], ['Sp-Es', SpEs], ['Pt-Br', PtBr],
  ]);

  const selectedFlag = ref(flags.get(languageStore.language) ?? EnUs);
  const open = ref(false);

  function selectIcon(lang: Language, flag: Component) {
    selectedFlag.value = flag;
    languageStore.setLanguage(lang);
    open.value = false;
  }
</script>

<template>
  <div>
    <SquareButton :action="() => open = !open">
      <selectedFlag />
    </SquareButton>
    <Transition name="dropdown">
      <div v-if="open" class="dropdown-menu">
        <SquareButton
          v-for="[lang, flag] in flags"
          :action="() => selectIcon(lang, flag)"
        >
          <component :is="flag" />
        </SquareButton>
      </div>
    </Transition>
  </div>
</template>   

<style scoped>
  .dropdown-menu {
    position: absolute;
    background: white;
    z-index: 1;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
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