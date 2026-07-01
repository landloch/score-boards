<script setup lang="ts">
  import { useScoreStore } from '@/stores/scoreStore';
  import type { ColumnId } from '@/types/NochMalTypes';
  import { Mark } from '@/types/NochMalTypes';
import { computed } from 'vue';

  const {
    columnId, score, redText, marginAdjust, index
  } = defineProps<{
    columnId: ColumnId;
    score: number;
    redText?: boolean;
    marginAdjust?: "top" | "bottom";
    index: string;
  }>();

  const {
    letterScoreingBoxesState,
    setLetterScoreBoxMark
  } = useScoreStore();

  const isCircled = computed(
    () => letterScoreingBoxesState.find((el) => el.index === index)!.mark === Mark.Circled
  );

  function handleClick() {
    setLetterScoreBoxMark(index, !isCircled ? Mark.Circled : Mark.Blank,);
  }
</script>

<template>
  <span
    :id="columnId"
    :key="columnId"
    :class="`main-grid-scoring-boxes ${marginAdjust ? marginAdjust + '-margin' : ''}`"
    @click="handleClick"
  >
    <svg
      :fill="redText ? 'red' : 'black'"
      :stroke="redText ? 'red' : 'black'"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
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
        {{ score }}
      </text>
    </svg>
    <Circled v-if="isCircled" />
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