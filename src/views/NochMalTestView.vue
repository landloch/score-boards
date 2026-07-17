<script setup lang="ts">
  import JokerPane from '@/components/nochMal/JokerPane/JokerPane.vue';
  import ScorePane from '@/components/nochMal/scorePane/ScorePane.vue';
  import MainGrid from '@/components/nochMal/newMainGrid/MainGrid.vue';
  import ScalingContainer from '@/components/common/ScalingContainer.vue';
  import Header from '@/components/nochMal/Header.vue';
  import { generateBoard } from '@/classes/BoardGenerator';
  import { ref } from 'vue';

  const board = ref(generateBoard({
    colors: ['red', 'green', 'blue', 'yellow'],
    gridHeight: 8,
    gridWidth: 5,
    maxSize: 4
  }));
  console.log('board:', board);
</script>

<template>
  <div class="backdrop">
    <ScalingContainer :height="644" :width="455" >
      <div class="base">
        <Header />
        <div class="row">
          <table>
            <tbody>
              <tr v-for="row in board.cells">
                <td v-for="cell in row">
                  <span
                    :id="`${cell.x}-${cell.y}`"
                    :key="`${cell.x}-${cell.y}`"
                    :class="`box ${cell.color}`"
                  >
                    <StarIcon v-if="cell.star" />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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

  .box {
    width: 32px;
    height: 32px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    border-radius: 5px;
    position: relative;
  }

  .blue {
    background-color: var(--blue);
  }

  .green {
    background-color: var(--green);
  }

  .orange {
    background-color: var(--orange);
  }

  .red {
    background-color: var(--red);
  }

  .yellow {
    background-color: var(--yellow);
  }
</style>
