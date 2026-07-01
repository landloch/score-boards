<script setup lang="ts">

</script>

<template>
  <span class="score-label">
    <span class="joker-score">
      <svg
        fill="#404040"
        stroke="#404040"
        strokeLinecap="round"
        strokeLinejoin="round"
        class="character"
      >
        <text x="45%" y="52%" fontSize="24" textAnchor="middle" dominantBaseline="central">
          !
        </text>
      </svg>
    </span>
    <span class="small-text">(+1)</span>
  </span>
</template>

<style scoped>
  .score-label {
    align-items: center;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    height: 32px;
    color: #fff;
    box-sizing: border-box;
    padding: 4px;
    letter-spacing: 1px;
  }

  .joker-score {
    width: 26px;
    height: 26px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    border-radius: 50%;
    position: relative;
    background-color: white;
    box-sizing: border-box;
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

  .small-text {
    height: 100%;
    font-size: 14px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    align-items: flex-end;
    padding: 4px;
  }
</style>