<script setup lang="ts">
  import CircledIcon from '@/components/icons/CircledIcon.vue';
  import CrossIcon from '@/components/icons/CrossIcon.vue';
  import { useNochMalStore } from '@/stores/nochMalStore';
  import type { RowId } from '@/types/NochMalTypes';
  import { Mark } from '@/types/NochMalTypes';
import { computed } from 'vue';

  const { rowId, score, redText } =
    defineProps<{
      rowId: RowId; score: number; redText?: boolean;
    }>();

  const { deepState, flipRowScoreBoxMark } = useNochMalStore();

  function handleClick() {
    flipRowScoreBoxMark(rowId);
  }

  const mark = computed<Mark>(() => {
    if (deepState.markedRowMap.get(rowId)! != 7) {
      return Mark.Blank;
    }
    if (deepState.rowsState.get(rowId)) {
      return Mark.Scratched;
    }
    return Mark.Circled;
  });
</script>

<template>
  <span
    :id="rowId"
    :key="rowId"
    class="main-grid-scoring-boxes"
    @click="handleClick"
  >
    <svg
      :fill="redText ? 'red' : 'black'"
      :stroke="redText ? 'red' : 'black'"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="0.5"
      class="character"
    >
      <text
        x="47%"
        y="50%"
        font-size="24"
        text-anchor="middle"
        dominant-baseline="central"
      >
        {{ score }}
      </text>
    </svg>
    <CrossIcon v-if="mark === Mark.Scratched" />
    <CircledIcon v-else-if="mark === Mark.Circled" />
  </span>
</template>

<style>
  .main-grid-scoring-boxes {
    width: 32px;
    height: 32px;
    display: flex;
    border-radius: 5px;
    position: relative;
    background-color: white;
  }
</style>