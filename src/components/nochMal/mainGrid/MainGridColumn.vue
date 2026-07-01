<script setup lang="ts">
  import type { ColumnData } from '@/types/NochMalTypes';
  import ColumnIdBox from './ColumnIdBox.vue';
  import MainGridBox from './MainGridBox.vue';
  import ColumnFirstScoringBox from './ColumnFirstScoringBox.vue';
  import ColumnLaterScoringBox from './ColumnLaterScoringBox.vue';

  defineProps<{
    column: ColumnData;
    centerLine?: boolean;
  }>();
</script>

<template>
  <div class="column">
    <ColumnIdBox
      :columnId="column.column"
      :redText="centerLine"
      marginAdjust="bottom"
    />
    <MainGridBox
      v-for="box in column.boxesData"
      :key="box.index"
      :box="box"
      :centerLine="centerLine"
    />
    <ColumnFirstScoringBox
      :columnId="column.column"
      :redText="centerLine" 
      :score="column.pointsFirstBonus + column.pointsBase"
      marginAdjust="top"
      :index="`${column.column}1st`"
    />
    <ColumnLaterScoringBox
      :columnId="column.column"
      :redText="centerLine" 
      :score="column.pointsBase"
      :index="`${column.column}2nd`"
    />
  </div>
</template>

<style>
  .column {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
</style>