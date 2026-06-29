<script setup lang="ts">

</script>

<template>
  <span className="white-square">
    <svg
      fill="black"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      className="character"
    >
      <path d="M 16.5,21 12,15.634613 7.5,21 3,16.5 8.3653858,12 3,7.5 7.5,3 12,8.3653852 16.5,3 21,7.5 15.634614,12 21,16.5 Z" />
    </svg>
  </span>
</template>

<style>
  .white-square {
    width: 32px;
    height: 32px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    border: black solid 1px;
    border-radius: 5px;
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
</style>