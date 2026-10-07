<script setup lang="ts">
  import type { RowData } from '@/types/NochMalTypes';
  import ColumnIdBox from './ColumnIdBox.vue';
  import MainGridBox from './MainGridBox.vue';
  import ColumnFirstScoringBox from './ColumnFirstScoringBox.vue';
  import ColumnLaterScoringBox from './ColumnLaterScoringBox.vue';

  defineProps<{
    column: RowData;
    centerLine?: boolean;
  }>();
</script>

<template>
  <div class="column">
    <ColumnIdBox
      :columnId="column.row"
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
      :rowId="column.row"
      :redText="centerLine" 
      :score="column.pointsFirstBonus + column.pointsBase"
      marginAdjust="top"
      :index="`${column.row}1st`"
    />
    <ColumnLaterScoringBox
      :rowId="column.row"
      :redText="centerLine" 
      :score="column.pointsBase"
      :index="`${column.row}2nd`"
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