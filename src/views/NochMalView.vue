<script setup lang="ts">
  import JokerPane from '@/components/nochMal/JokerPane/JokerPane.vue';
  import ScorePane from '@/components/nochMal/scorePane/ScorePane.vue';
  import MainGrid from '@/components/nochMal/newMainGrid/MainGrid.vue';
  import ScalingContainer from '@/components/common/ScalingContainer.vue';
  import Header from '@/components/nochMal/Header.vue';
</script>

<template>
  <div class="backdrop">
    <ScalingContainer :height="644" :width="455" >
      <div class="base">
        <Header />
        <div class="row">
          <MainGrid />
          <ScorePane />
        </div>
        <JokerPane />
      </div>
    </ScalingContainer>
  </div>
</template>

<style scoped>
  * {
    font-family: "Bangers", sans-serif;
    paint-order: stroke fill;
    --blue: #69f;
    --trans-blue: #69fb;
    --green: #9c3;
    --trans-green: #9c3b;
    --orange: #f60;
    --trans-orange: #f60b;
    --red: #cc0044;
    --trans-red: #cc0044bb;
    --yellow: #fc0;
    --trans-yellow: #fc0b;
    --semi-clear: #ffffff80;
    user-select: none;
  }

  .backdrop {
    background-color: #404040;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .base {
    background-color: #404040;
    padding: 5px;
    box-sizing: border-box;
  }

  .row {
    display: flex;
    flex-direction: row;
  }
</style>
