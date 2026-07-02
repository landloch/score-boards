<script setup lang="ts">
  import type { ColumnData } from '@/types/NochMalTypes';
import ColumnIdBox from '../mainGrid/ColumnIdBox.vue';
import MainGridBox from '../mainGrid/MainGridBox.vue';
import ColumnFirstScoringBox from '../mainGrid/ColumnFirstScoringBox.vue';
import ColumnLaterScoringBox from '../mainGrid/ColumnLaterScoringBox.vue';

  defineProps<{
    column: ColumnData;
    centerLine?: boolean;
  }>();
</script>

<template>
  <tr>
    <td>
      <ColumnIdBox
        :columnId="column.column"
        :redText="centerLine"
        marginAdjust="bottom"
      />
    </td>
    <td class="spacer"></td>
    <td v-for="box in column.boxesData">
      <MainGridBox
        :key="box.index"
        :box="box"
        :centerLine="centerLine"
      />
    </td>
    <td class="spacer"></td>
    <td>
      <ColumnFirstScoringBox
        :columnId="column.column"
        :redText="centerLine" 
        :score="column.pointsFirstBonus + column.pointsBase"
        marginAdjust="top"
        :index="`${column.column}1st`"
      />
    </td>
    <td>
      <ColumnLaterScoringBox
        :columnId="column.column"
        :redText="centerLine" 
        :score="column.pointsBase"
        :index="`${column.column}2nd`"
      />
    </td>
  </tr>
</template>

<style scoped>
  .spacer {
    width: 10px;
  }

  td {
    padding: 0;
  }
</style>