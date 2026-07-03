<script setup lang="ts">
  import CircledIcon from '@/components/icons/CircledIcon.vue';
  import { useScoreStore } from '@/stores/scoreStore';
  import type { ColumnId, MarkedState } from '@/types/NochMalTypes';
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
    deepState,
    setLetterScoreBoxMark
  } = useScoreStore();

  const isCircled = computed(
    () => deepState.letterScoreingBoxesState.find((el: MarkedState) =>
      el.index === index)!.mark === Mark.Circled
  );

  function handleClick() {
    setLetterScoreBoxMark(index, !isCircled.value ? Mark.Circled : Mark.Blank,);
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
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width={0.5}
      class="character"
    >
      <text
        x="47%"
        y="50%"
        font-size="24"
        text-anchor="middle"
        dominant-baseline="central"
        class="small"
      >
        {{ score }}
      </text>
    </svg>
    <CircledIcon v-if="isCircled" />
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