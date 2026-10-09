<script setup lang="ts">
  import CircledIcon from '@/components/icons/CircledIcon.vue';
  import CrossIcon from '@/components/icons/CrossIcon.vue';
  import { useScoreStore } from '@/stores/scoreStore';
  import type { RowId, MarkedState } from '@/types/NochMalTypes';
  import { Mark } from '@/types/NochMalTypes';

  const {
    rowId, score, redText, index
  } = defineProps<{
    rowId: RowId;
    score: number;
    redText?: boolean;
    index: string;
  }>();

  const stateArray: Mark[] = [Mark.Blank, Mark.Circled, Mark.Scratched];
  const { deepState, setLetterScoreBoxMark } = useScoreStore();

  function getState() {
    return deepState.letterScoreingBoxesState.find((el: MarkedState) => el.index === index)!.mark;
  } 

  function handleClick() {
    if ((deepState.markedLetterMap.get(rowId) ?? 0) == 21) {
      const nextMark = stateArray[(getState() + 1) % 3];
      setLetterScoreBoxMark(index, nextMark!);
    } else {
      setLetterScoreBoxMark(index, getState() == Mark.Blank ? Mark.Scratched : Mark.Blank);
    }
  }
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
    <CrossIcon v-if="getState() === Mark.Scratched" />
    <CircledIcon v-else-if="getState() === Mark.Circled" />
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