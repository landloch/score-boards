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
    --blue: #6699ff;
    --trans-blue: #6699ff9a;
    --green: #99cc33;
    --trans-green: #99cc339a;
    --orange: #ff6600;
    --trans-orange: #ff66009a;
    --red: #cc0f4f;
    --trans-red: #cc0f4f9a;
    --yellow: #ffcc00;
    --trans-yellow: #ffcc009a;
    --semi-clear: #fff8;
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
