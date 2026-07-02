<script setup lang="tsx">
  import CrossIcon from '@/components/icons/CrossIcon.vue';
  import { useScoreStore } from '@/stores/scoreStore';
  import type { ColumnId, MarkedState } from '@/types/NochMalTypes';
  import { computed } from 'vue';

  const { columnId, redText, marginAdjust } = defineProps<{
    columnId: ColumnId;
    redText?: boolean;
    marginAdjust?: "top" | "bottom";
  }>();

  const {
    deepState,
    setLetterHeaderChecked
  } = useScoreStore();

  const isChecked = computed(
    () => deepState.letterHeaderBoxesState.find(
      (el: MarkedState) => el.index === columnId)!.isChecked
  );

  const handleClick = () => {
    setLetterHeaderChecked(columnId, !isChecked.value);
  };
</script>

<template>
  <span
    :id="columnId"
    :key="columnId"
    class="main-grid-scoring-boxes"
    @click="handleClick"
  >
    <svg
      :fill="redText ? 'red' : 'black'"
      :stroke="redText ? 'red' : 'black'"
      :strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="character"
    >
      <text
        x="47%"
        y="50%"
        :fontSize="24"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {{ columnId }}
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