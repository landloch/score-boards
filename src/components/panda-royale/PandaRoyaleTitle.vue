<script setup lang="ts">
  import HorizontalArrow from '@/components/panda-royale/HorizontalArrow.vue';
  import Settings from '../common/Settings.vue';
  import ReturnButton from '../common/ReturnButton.vue';
</script>

<template>
  <div class="title-card">
    <h1>PANDA</h1>
    <HorizontalArrow
      :shaft-length="120"
      style="color: white; margin-top: -6px; margin-bottom: -6px;"
    />
    <h2>ROYALE</h2>
  </div>
</template>

<style scoped>
  .title-card {
    grid-column: 2;
    text-align: center;
    vertical-align: middle;
    justify-self: center;
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