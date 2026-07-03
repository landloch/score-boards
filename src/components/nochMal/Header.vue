<script setup lang="ts">
  import HorizontalArrow from '@/components/panda-royale/HorizontalArrow.vue';
  import SquareButton from '@/components/common/SquareButton.vue';
  import ReturnIcon from '@/components/icons/ReturnIcon.vue';
  import { useRoute } from 'vue-router';
  import router from '@/router/index.ts';
  import Settings from '../common/Settings.vue';
  import EraserButton from './sidePane/EraserButton.vue';
  import Title from './Title.vue';
</script>

<template>
  <div class="header">
    <SquareButton
      :action="() => router.push(`/`)"
      :height="34"
      :width="34"
    >
      <ReturnIcon color="#333" :height="40" :width="40" />
    </SquareButton>
    <div class="title-card">
      <Title :text="$t('noch-mal.title')" />
    </div>
    <span class="right-element">
      <EraserButton />
      <Settings />
    </span>
  </div>
</template>CHAMPION

<style scoped>
  .header {
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto 1fr;
  }

  .title-card {
    grid-column: 2;
    text-align: center;
    vertical-align: middle;
    justify-self: center;
  }

  .right-element {
    justify-self: end;
  }

  h1 {
    font-size: 25px;
    font-weight: bold;
    color: white;
    margin: 0;
  }

  h2 {
    font-size: 23px;
    font-weight: bold;
    color: white;
    margin: 0;
  }

  

</style>
