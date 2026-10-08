<script setup lang="ts">
  import {
    rowAdata, rowBdata, rowCdata, rowDdata, rowEdata,
    rowFdata, rowGdata, rowHdata, rowIdata, rowJdata,
    rowKdata, rowLdata, rowMdata, rowNdata, rowOdata
  } from '@/constants/noch-mal/MainGridBoxes';
  import MainGridRow from './MainGridRow.vue';
</script>

<template>
  <table>
    <tbody>
      <MainGridRow :row="rowAdata" />
      <MainGridRow :row="rowBdata" />
      <MainGridRow :row="rowCdata" />
      <MainGridRow :row="rowDdata" />
      <MainGridRow :row="rowEdata" />
      <MainGridRow :row="rowFdata" />
      <MainGridRow :row="rowGdata" />
      <MainGridRow :row="rowHdata" centerLine />
      <MainGridRow :row="rowIdata" />
      <MainGridRow :row="rowJdata" />
      <MainGridRow :row="rowKdata" />
      <MainGridRow :row="rowLdata" />
      <MainGridRow :row="rowMdata" />
      <MainGridRow :row="rowNdata" />
      <MainGridRow :row="rowOdata" />
    </tbody>
  </table>
</template>

<style scoped>

</style>