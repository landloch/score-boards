<script setup lang="ts">
  import type { RowData } from '@/types/NochMalTypes';
import RowIdBox from '../mainGrid/RowIdBox.vue';
import MainGridBox from '../mainGrid/MainGridBox.vue';
import RowFirstScoringBox from '../mainGrid/RowFirstScoringBox.vue';
import RowLaterScoringBox from '../mainGrid/RowLaterScoringBox.vue';

  defineProps<{
    row: RowData;
    centerLine?: boolean;
  }>();
</script>

<template>
  <tr>
    <td>
      <RowIdBox
        :rowId="row.row"
        :redText="centerLine"
        marginAdjust="bottom"
      />
    </td>
    <td><span class="spacer"></span></td>
    <td v-for="box in row.boxesData">
      <MainGridBox
        :key="box.index"
        :box="box"
        :centerLine="centerLine"
      />
    </td>
    <td><span class="spacer"></span></td>
    <td>
      <RowFirstScoringBox
        :rowId="row.row"
        :redText="centerLine" 
        :score="row.pointsFirstBonus + row.pointsBase"
        marginAdjust="top"
        :index="`${row.row}1st`"
      />
    </td>
    <td>
      <RowLaterScoringBox
        :rowId="row.row"
        :redText="centerLine" 
        :score="row.pointsBase"
        :index="`${row.row}2nd`"
      />
    </td>
  </tr>
</template>

<style scoped>
  .spacer {
    width: 10px;
    display: block;
  }

  td {
    padding: 0;
    width: fit-content;
  }
</style>