<script setup lang="ts">
  import { ref } from 'vue';
  
  const isShareModalVisible = ref(false);

  function share() {
    navigator.clipboard.writeText(location.pathname);
  };
</script>

<template>
  <button
    className="resset-button"
    @click="() => isShareModalVisible = true"
  >
    <Share />
  </button>
  <div className="overlay">
    <div className="modal">
      <div className="modal-title">
        <span className="link" @click="share">Copy Link</span>
        <svg
          fill="white"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          strokeWidth="1"
          className="modal-close"
          @click="() => isShareModalVisible = true"
        >
          <path d="M 16.5,21 12,15.634613 7.5,21 3,16.5 8.3653858,12 3,7.5 7.5,3 12,8.3653852 16.5,3 21,7.5 15.634614,12 21,16.5 Z" />
        </svg>
      </div>
      <div class="img-container">
        <img src="/src/assets/qr-code.svg" alt="QR Code?" />
      </div>
    </div>
  </div>
</template>

<style>
  .img-container {
    display: flex;
    height: calc(100% - 55px);
    width: 100%;
    justify-content: center;
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
</style>