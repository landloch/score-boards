<script setup lang="ts">

</script>

<template>
  <div class="overlay">
    <div class="modal"><slot></slot></div>
  </div>
</template>

<style scoped>
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
</style>