<script setup lang="ts">
  import Title from './NochMalTitle.vue';
  import Settings from '../common/Settings.vue';
  import ReturnButton from '../common/ReturnButton.vue';
</script>

<template>
  <div class="header">
    <ReturnButton />
    <div class="title-card">
      <Title :text="$t('noch-mal.title')" />
    </div>
    <span class="right-element">
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
