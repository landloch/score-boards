<script setup lang="ts">

</script>

<template>
  <span class="score-label">
    <svg
      stroke="white"
      fill="white"
      stroke-width=""
      stroke-linecap="round"
      stroke-linejoin="round"
      view-box="0 0 24 24"
      height="28px"
      width="28px"
      class="star"
    >
      <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
    </svg>
    <span class="small-text">(-2)</span>
  </span>
</template>

<style scoped>
  .star {
    height: 26px;
    width: 26px;
    background-color: transparent;
  }

  .score-label {
    align-items: center;
    display: flex;
    height: 28px;
    color: #fff;
    box-sizing: border-box;
    padding: 4px;
    letter-spacing: 1px;
  }

  .small-text {
    height: 100%;
    font-size: 14px;
    display: flex;
    align-items: flex-end;
    margin-left: 4px;
  }
</style>