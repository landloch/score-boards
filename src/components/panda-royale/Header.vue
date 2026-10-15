<script setup lang="ts">
  import Settings from '../common/Settings.vue';
  import ReturnButton from '../common/ReturnButton.vue';
  import PandaRoyaleTitle from './PandaRoyaleTitle.vue';
</script>

<template>
  <div class="header">
    <ReturnButton />
    <PandaRoyaleTitle />
    <span class="right-element">
      <Settings />
    </span>
  </div>
</template>

<style scoped>
  .header {
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto 1fr;
  }

  .right-element {
    justify-self: end;
  }
</style>
