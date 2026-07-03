<script setup lang="ts">
  import {
    columnAdata, columnBdata, columnCdata, columnDdata, columnEdata,
    columnFdata, columnGdata, columnHdata, columnIdata, columnJdata,
    columnKdata, columnLdata, columnMdata, columnNdata, columnOdata
  } from '@/constants/noch-mal/MainGridBoxes';
  import MainGridRow from './MainGridRow.vue';
</script>

<template>
  <table>
    <tbody>
      <MainGridRow :column="columnAdata" />
      <MainGridRow :column="columnBdata" />
      <MainGridRow :column="columnCdata" />
      <MainGridRow :column="columnDdata" />
      <MainGridRow :column="columnEdata" />
      <MainGridRow :column="columnFdata" />
      <MainGridRow :column="columnGdata" />
      <MainGridRow :column="columnHdata" centerLine />
      <MainGridRow :column="columnIdata" />
      <MainGridRow :column="columnJdata" />
      <MainGridRow :column="columnKdata" />
      <MainGridRow :column="columnLdata" />
      <MainGridRow :column="columnMdata" />
      <MainGridRow :column="columnNdata" />
      <MainGridRow :column="columnOdata" />
    </tbody>
  </table>
</template>

<style scoped>

</style>