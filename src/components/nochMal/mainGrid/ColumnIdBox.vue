<script setup lang="tsx">
  import CrossIcon from '@/components/icons/CrossIcon.vue';
  import { useScoreStore } from '@/stores/scoreStore';
  import type { ColumnId } from '@/types/NochMalTypes';
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
      (el) => el.index === columnId)!.isChecked
  );

  const handleClick = () => {
    setLetterHeaderChecked(columnId, !isChecked.value);
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
    <CrossIcon v-if="isChecked" />
  </span>
</template>

<style>
  .main-grid-scoring-boxes {
    width: 32px;
    height: 32px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    border-radius: 5px;
    position: relative;
    background-color: white;
  }

  .top-margin{
    margin-top: 10px;
  }

  .bottom-margin{
    margin-bottom: 10px;
  }
</style>