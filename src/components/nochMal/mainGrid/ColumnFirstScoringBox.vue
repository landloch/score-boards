<script setup lang="ts">
  import CircledIcon from '@/components/icons/CircledIcon.vue';
  import CrossIcon from '@/components/icons/CrossIcon.vue';
  import { useScoreStore } from '@/stores/scoreStore';
  import type { ColumnId } from '@/types/NochMalTypes';
  import { Mark } from '@/types/NochMalTypes';

  const {
    columnId, score, redText, marginAdjust, index
  } = defineProps<{
    columnId: ColumnId;
    score: number;
    redText?: boolean;
    marginAdjust?: "top" | "bottom";
    index: string;
  }>();

  const stateArray: Mark[] = [Mark.Blank, Mark.Circled, Mark.Scratched];
  const {
    deepState,
    setLetterScoreBoxMark
  } = useScoreStore();

  function getState() {
    return deepState.letterScoreingBoxesState.find((el) => el.index === index)!.mark;
  } 

  function handleClick() {
    const nextMark = stateArray[(getState() + 1) % 3];
    setLetterScoreBoxMark(index, nextMark!);
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
    <CrossIcon v-if="getState() === Mark.Scratched" />
    <CircledIcon v-else-if="getState() === Mark.Circled" />
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