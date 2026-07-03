<script setup lang="ts">

</script>

<template>
  <span class="black-square">
    <svg
      fill="white"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="character"
    >
      <text
        x="47%"
        y="50%"
        font-size="24"
        text-anchor="middle"
        dominant-baseline="central"
      >
        ?
      </text>
    </svg>
  </span>
</template>

<style>
  .black-square {
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
    background-color: black;
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
</style>