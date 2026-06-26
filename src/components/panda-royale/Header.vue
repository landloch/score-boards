<script setup lang="ts">
  import HorizontalArrow from '@/components/panda-royale/HorizontalArrow.vue';
  import SquareButton from '@/components/SquareButton.vue';
  import QrCodeIcon from '@/components/icons/QrCodeIcon.vue';
  import ReturnIcon from '@/components/icons/ReturnIcon.vue';
  import Modal from '@/components/Modal.vue';
  import { ref } from 'vue';
  import LanguageSelector from '../LanguageSelector.vue';
  import { useRoute } from 'vue-router';
  import router from '@/router/index.ts';

  const showModal = ref(false);

  const isActiveLink = (routePath: string) => {
    const route = useRoute();
    return route.path === routePath;
  };
  
</script>

<template>
  <div class="header">
    <SquareButton
      v-if="!isActiveLink('/')"
      :action="() => router.push(`/`)"
      :height="34"
      :width="34"
    >
      <ReturnIcon color="#333" :height="40" :width="40" />
    </SquareButton>
    <div class="title-card">
      <h1>Panda</h1>
      <HorizontalArrow
        :shaft-length="80"
        style="color: white; margin-top: -6px; margin-bottom: -6px;"
      />
      <h1>Royale</h1>
    </div>
    <span class="right-element">
      <SquareButton
        :action="() => showModal = true"
        :height="40"
        :width="40"
      >
        <QrCodeIcon color="#333" :height="38" :width="38" />
      </SquareButton>
      <LanguageSelector />
    </span>
  </div>
  <Modal :show="showModal" @close="showModal = false">
    <template #header>
      <h2>{{ $t('qrcode-modal.title') }}</h2>
    </template>
    <template #body>
      <img class="qrcode" src="../../assets/qr-code.svg">
    </template>
  </Modal>
</template>

<style scoped>
  .header {
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto 1fr;
  }

  .title-card {
    grid-column: 2;
    text-align: center;
    vertical-align: middle;
    justify-self: center;
  }

  .right-element {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-self: end;
    gap: 4px;
  }

  h1 {
    font-family: Calibri, sans-serif;
    font-size: 25px;
    color: white;
    margin: 0;
  }

  .qrcode {
    width: 300px;
  }

</style>