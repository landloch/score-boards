<script setup lang="ts">
  import { ref } from 'vue';
  import PtBr from './icons/flags/PtBr.vue';
  import EnUs from './icons/flags/EnUs.vue';
  import SpEs from './icons/flags/SpEs.vue';
  import SquareButton from './SquareButton.vue';

  const icons = [
    { name: 'PtBr', component: PtBr },
    { name: 'EnUs', component: EnUs },
    { name: 'SpEs', component: SpEs }
  ];

  const selected = ref(icons[0]);
  const open = ref(false);

  function selectIcon(icon: any) {
    selected.value = icon;
    open.value = false;
  }
</script>

<template>
  <div>
    <SquareButton :action="() => open = !open">
      <component :is="selected!.component" />
    </SquareButton>
    <Transition name="dropdown">
      <div v-if="open" class="dropdown-menu">
        <SquareButton
          v-for="icon in icons"
          :action="() => selectIcon(icon)"
        >
          <component :is="icon.component" />
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