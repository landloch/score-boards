<script setup lang="ts">
  import ScalingContainer from '@/components/common/ScalingContainer.vue';
  import PandaRoyaleTitle from '@/components/panda-royale/PandaRoyaleTitle.vue';
  import NochMalTitle from '@/components/nochMal/NochMalTitle.vue';
  import Settings from '@/components/common/Settings.vue';
</script>

<template>
  <div class="backdrop">
    <ScalingContainer :height="542" :width="382">
      <div class="header">
        <span></span>
        <span>{{ $t("app.title") }}</span>
        <span class="right-element">
          <Settings />
        </span>
      </div>
      <div class="game-grid">
        <RouterLink to="/panda-royale" >
          <PandaRoyaleTitle />
        </RouterLink>
        <RouterLink to="/noch-mal" >
          <NochMalTitle :text="$t('noch-mal.title')" fo />
        </RouterLink>
      </div>
    </ScalingContainer>
  </div>
</template>

<style scoped>
  .backdrop {
    background-color: #333;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  * {
    font-size: 20px;
    color: #fff;
    font-weight: 600;
    box-sizing: border-box;
    text-align: center;
    vertical-align: middle;
  }

  .header {
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto 1fr;
  }

  .right-element {
    justify-self: end;
  }

  a {
    text-decoration: none;
  }

  .game-grid {
    width: 100%;
    height: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    place-content: space-evenly;
  }
</style>