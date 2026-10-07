<script setup lang="tsx">
  import CrossIcon from '@/components/icons/CrossIcon.vue';
  import { useScoreStore } from '@/stores/scoreStore';
  import type { RowId, CheckedState } from '@/types/NochMalTypes';
  import { computed } from 'vue';

  const { rowId, redText } = defineProps<{
    rowId: RowId;
    redText?: boolean;
  }>();

  const {
    deepState,
    setLetterHeaderChecked
  } = useScoreStore();

  const isChecked = computed(
    () => deepState.letterHeaderBoxesState.find(
      (el: CheckedState) => el.index === rowId)!.isChecked
  );

  const handleClick = () => {
    setLetterHeaderChecked(rowId, !isChecked.value);
  };
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
    <CrossIcon v-if="isChecked" />
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