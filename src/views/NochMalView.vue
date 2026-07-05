<script setup lang="ts">
  import JokerPane from '@/components/nochMal/JokerPane/JokerPane.vue';
  import ScorePane from '@/components/nochMal/scorePane/ScorePane.vue';
  import MainGrid from '@/components/nochMal/newMainGrid/MainGrid.vue';
  import ScalingContainer from '@/components/common/ScalingContainer.vue';
  import Header from '@/components/nochMal/Header.vue';
  /*
  Auto borad rules:
  every column and row has every color
  every column has exactly one star, nor very row has stars
  for each color, there are 6 regimes, each with a different number of boxes.
  there is never more than one regime of the same color in the same column
  */
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
    --green: #99cc33;
    --orange: #ff6600;
    --red: #cc0f4f;
    --yellow: #ffcc00;
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
