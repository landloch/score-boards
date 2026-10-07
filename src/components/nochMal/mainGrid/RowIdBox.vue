<script setup lang="tsx">
  import CrossIcon from '@/components/icons/CrossIcon.vue';
  import { useScoreStore } from '@/stores/scoreStore';
  import type { RowId, CheckedState } from '@/types/NochMalTypes';
  import { computed } from 'vue';

  const { rowId, redText } = defineProps<{
    rowId: RowId;
    redText?: boolean;
  }>();
</script>

<template>
  <span
    :id="rowId"
    :key="rowId"
    class="main-grid-scoring-boxes"
  >
    <svg
      :fill="redText ? 'red' : 'black'"
      :stroke="redText ? 'red' : 'black'"
      :strokeWidth="0.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="character"
    >
      <text
        x="47%"
        y="50%"
        :font-size="24"
        text-anchor="middle"
        dominant-baseline="central"
      >
        {{ rowId }}
      </text>
    </svg>
  </span>
</template>

<style scoped>
  .main-grid-scoring-boxes {
    width: 32px;
    height: 32px;
    display: flex;
    border-radius: 5px;
    position: relative;
    background-color: white;
  }
</style>