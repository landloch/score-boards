<script setup lang="ts">
  import type { ColumnData } from '@/types/NochMalTypes';

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
      :index="`${column.column}-1st`"
    />
    <ColumnLaterScoringBox
      :columnId="column.column"
      :redText="centerLine" 
      :score="column.pointsBase"
      :index="`${column.column}-2nd`"
    />
  </div>
</template>

<style>

</style>