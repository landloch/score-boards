<script setup lang="ts">
  import { type Component } from 'vue';
  import Pt from './icons/flags/Pt.vue';
  import En from './icons/flags/En.vue';
  import Es from './icons/flags/Es.vue';
  import { type Language } from '@/types/CommonTypes';
  import { i18n, loadLocale } from '@/i18n.ts';

  // https://nucleoapp.com/svg-flag-icons

  const flags = new Map<Language, { icon: Component, label: string }>([
    ['en', { icon: En, label: 'English' }],
    ['es', { icon: Es, label: 'Español' }],
    ['pt', { icon: Pt, label: 'Português' }],
  ]);
</script>

<template>
    <div class="language-grid">
          <div
            v-for="[key, value] in flags"
            :class="`${i18n.global.locale.value == key ? 'selected' : ''} card }`"
            :key="key"
            @click="() => loadLocale(key)"
          >
            <span class="icon-holder">
              <component :is="value.icon" :height="34" :width="34" />
            </span>
            <span>{{ value.label }}</span>
          </div>
        </div>
</template>

<style scoped>
  .title-line {
    display: flex;
    justify-content: space-between;
  }

  .icon-holder {
    position: relative;
    display: inline-block;
    height: 34px;
    width: 34px;
    margin-right: 4px;
  }

  .language-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
  }

  .card {
    border: 2px solid #333;
    border-radius: 5px;
    padding: 2px;
    box-sizing: border-box;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .selected {
    border: 4px solid rgb(101, 186, 255);
    cursor: default;
  }
</style>
