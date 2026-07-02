<script setup lang="ts">
  import JokerPane from '@/components/nochMal/JokerPane/JokerPane.vue';
  import ScorePane from '@/components/nochMal/scorePane/ScorePane.vue';
  import MainGrid from '@/components/nochMal/newMainGrid/MainGrid.vue';
  /*
  Auto borad rules:
  every column and row has every color
  every column has exactly one star, nor very row has stars
  for each color, there are 6 regimes, each with a different number of boxes.
  there is never more than one regime of the same color in the same column
  */
</script>

<template>
  <!-- <ScalingContainer :height="418" :width="695" > -->
    <div id="base" class="base">
      <div class="row">
        <MainGrid />
        <ScorePane />
      </div>
      <JokerPane />
    </div>
  <!-- </ScalingContainer> -->
</template>

<style scoped>
  * {
    font-family: "Bangers", cursive;
    paint-order: stroke fill;
    --blue: #6699ff;
    --green: #99cc33;
    --orange: #ff6600;
    --red: #cc0f4f;
    --yellow: #ffcc00;
    user-select: none;
  }

  body {
    background-color: #000;
    margin: 0;
    height: fit-content;
    overflow: hidden;
  }

  .base {
    background-color: #404040;
    padding: 5px;
    box-sizing: border-box;
    width: 544.25px;
    height: 574px;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .column {
    display: flex;
    flex-direction: column;
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

  .white {
    background-color: white;
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

  .center-column {
    border: 2px solid white;
    margin: -2px;
  }

  .circle {
    height: 28px;
    width: 28px;
    background-color: #fff5;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  .star {
    height: 30px;
    width: 30px;
    background-color: transparent;
    margin: auto;
    display: inline-block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  .cross {
    height: 30px;
    width: 30px;
    background-color: transparent;
    margin: auto;
    display: inline-block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  .main-grid-scoring-boxes {
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
    background-color: white;
  }

  .top-margin{
    margin-top: 10px;
  }

  .bottom-margin{
    margin-bottom: 10px;
  }

  .character {
    height: 30px;
    width: 30px;
    background-color: transparent;
    margin: auto;
    display: inline-block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  .button {
    height: 26px;
    width: 26px;
    background-color: transparent;
    margin: auto;
    display: inline-block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  .circled {
    height: 32px;
    width: 32px;
    background-color: transparent;
    margin: auto;
    display: inline-block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    transition: all;
    transition-duration: 0.25s;
    touch-action: none;
    background: rgba(0,0,0,.3);
  }

  .modal {
    height: 400px;
    width: 350px;
    background-color: #404040;
    display: flex;
    flex-direction: column;
    position: absolute;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    padding: 10px;
  }

  .modal-title {
    display: flex;
    margin-bottom: 10px;
  }

  .modal-title-text {
    margin-left: auto;
    margin-right: auto;
    font-size: 40px;
    height: fit-content;
    text-align: center;
    color: #fff;
  }

  .modal-close {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    position: relative;
  }

  .modal-actions {
    display: flex;
    justify-content: space-around;
  }

  .modal-button {
    font-size: 30px;
    width: 70px;
    height: 35px;
  }

  h1 {
    margin: 0px 0px 10px 0px;
    font-size: 40px;
    width: 100%;
    height: fit-content;
    text-align: center;
    color: #fff;
  }

  .img-container {
    display: flex;
    height: calc(100% - 55px);
    width: 100%;
    justify-content: center;
  }

  .link {
    margin-left: auto;
    margin-right: auto;
    font-size: 40px;
    height: fit-content;
    text-align: center;
    color: #fff;
    transition: all 0.5s;
    cursor: pointer;
  }

  .link:hover {
    color: var(--blue);
  }

  .link:active {
    color: var(--red);
  }
</style>
