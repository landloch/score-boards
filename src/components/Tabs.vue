<script setup lang="ts">
  import type { Tab } from '@/types/CommonTypes';
  import { computed } from 'vue';

  const props = defineProps({
    modelValue: {
      type: [String, Number],
      required: true,
    },
    tabs: {
      type: Array<Tab>,
      required: true
    },
  });

  const emit = defineEmits(['update:modelValue']);

  const activeTab = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
  });
</script>

<template>
  <div class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="tab"
      :class="{ active: activeTab === tab.id }"
      @click="activeTab = tab.id"
    >
      <span class="icon-holder">
        <component :is="tab.icon" :height="18" :width="18" />
      </span>
      {{ tab.label }}
    </button>
  </div>

  <div class="tab-content">
    <slot :name="activeTab"></slot>
  </div>
</template>

<style scoped>
  .tabs {
    display: flex;
    gap: 0.5rem;
    border-bottom: 1px solid #ddd;
  }

  .icon-holder {
    position: relative;
    margin: 8px;
  }

  .tab {
    background: none;
    border: none;
    padding: 5px;
    cursor: pointer;
    color: #666;
    border-bottom: 2px solid transparent;
    transition: 0.2s;
    width: 105px;
    overflow: hidden;
    font-size: 12px;
    display: flex;
    justify-content: space-around;
  }

  .tab:hover {
    color: #222;
  }

  .tab.active {
    color: #42b883;
    border-bottom-color: #42b883;
    font-weight: 600;
  }

  .tab-content {
    padding: 1rem 0;
  }
</style>