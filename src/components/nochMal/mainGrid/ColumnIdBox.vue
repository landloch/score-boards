<script setup lang="tsx">
  import { useScoreStore } from '@/stores/scoreStore';
  import type { ColumnId } from '@/types/NochMalTypes';
  import { computed } from 'vue';

  const { columnId, redText, marginAdjust } = defineProps<{
    columnId: ColumnId;
    redText?: boolean;
    marginAdjust?: "top" | "bottom";
  }>();

  const {
    letterHeaderBoxesState,
    setLetterHeaderChecked
  } = useScoreStore();

  const isChecked = computed(
    () => letterHeaderBoxesState.find(
      (el) => el.index === columnId)!.isChecked
  );

  const handleClick = () => {
    setLetterHeaderChecked(columnId, !isChecked);
  };
</script>

<template>
  <span
    id={columnId}
    key={columnId}
    :class="`main-grid-scoring-boxes ${(marginAdjust ? marginAdjust + '-margin' : '')}`"
    @click="handleClick"
  >
    <svg
      :fill="redText ? 'red' : 'black'"
      :stroke="redText ? 'red' : 'black'"
      strokeWidth={0.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      class="character"
    >
      <text
        x="47%"
        y="50%"
        fontSize="24"
        textAnchor="middle"
        dominantBaseline="central"
        class="small"
      >
        {{ columnId }}
      </text>
    </svg>
    <Cross v-if="isChecked" />
  </span>
</template>

<style>

</style>