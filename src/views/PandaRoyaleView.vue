<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';
  import { InputRow, type InputCell } from '@/types/PandaRoyalTypes';
  import SquareButton from '@/components/SquareButton.vue';
  import ScalingContainer from '@/components/ScalingContainer.vue';
  import NaturalInput from '@/components/NaturalInput.vue';
  import CheatSheet from '@/components/panda-royale/CheatSheet.vue';
  import Header from '@/components/panda-royale/Header.vue';
  import EraserIcon from '@/components/icons/EraserIcon.vue';

  const columnNames = ['A','B','C','D','E','F','G'];

  const rows = ref<InputRow[]>([]);
  onBeforeMount(() => {
    const valueCells: InputCell[] = [];
    valueCells.push({ column: 'A', value: null });
    rows.value.push(new InputRow(1, valueCells));
    for (let i = 2; i <= 10; i++) {
      const valueCells: InputCell[] = [];
      columnNames.forEach(cn => {
        valueCells.push({ column: cn, value: null });
      });
      rows.value.push(new InputRow(i, valueCells));
    }
  });

  function getScoreTotal() {
    let total = 0;
    rows.value.forEach(row => {
      total += row.total ?? 0;
    });
    return total;
  }

  function clearRow(rowIndex: number) {
    rows.value[rowIndex]!.valueCells.forEach((cell) => {
      cell.value = null;
    });
  }

  function clearSheet() {
    for (let i = 0; i < 10; i++) {
      clearRow(i);
    }
  }
</script>

<template>
  <div class="backdrop">
    <ScalingContainer :height="542" :width="382">
      <Header />
      <table>
        <thead>
          <tr>
            <th>{{ $t('panda-royale.round') }}</th>
            <th v-for="cn in columnNames" :class="cn">{{ cn }}</th>
            <th>=</th>
            <th class="void"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows">
            <td>{{ row.index }}</td>
            <td v-for="(cell, index) in row.valueCells">
              <NaturalInput
                v-model="cell.value"
                :placeholder="cell.column"
              />
            </td>
            <td v-if="row.index == 1" colspan="6"></td>
            <td>{{ row.total }}</td>
            <td class="void">
              <SquareButton :action="() => clearRow(row.index - 1)">
                <EraserIcon color="#333" />
              </SquareButton>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="footer">
        <CheatSheet :width="274" />
        <div class="table-footer">
          <div class="total">{{ getScoreTotal() }}</div>
          <div class="clear-all">
            <SquareButton :action="() => clearSheet()">
              <EraserIcon color="#333" />
            </SquareButton>
          </div>
        </div>
      </div>
    </ScalingContainer>
  </div>
</template>

<style scoped>
  .backdrop {
    background-color: #333;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .backdrop::before,
  .backdrop::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;

    mask-image: url('@/assets/bamboo-pattern.svg');
    mask-repeat: repeat;
    mask-size: 250px 250px;

    -webkit-mask-image: url('@/assets/bamboo-pattern.svg');
    -webkit-mask-repeat: repeat;
    -webkit-mask-size: 250px 250px;
  }

  .backdrop::before {
    background: #666;
  }

  .backdrop::after {
    background: #000;
    mask-position: 90px 90px;
    -webkit-mask-position: 90px 90px;
  }

  * {
    font-size: 20px;
    color: #333;
    font-family: Calibri, sans-serif;
    box-sizing: border-box;
    text-align: center;
    vertical-align: middle;
  }
  
  table {
    table-layout: fixed;
    width: 362px;
    border-collapse: separate;
    border-spacing: 2px;
    background: transparent;
    outline: 2px solid transparent;
  }

  th {
    font-weight: bold;
    background-color: #fff;
  }

  td, th {
    height: 34px;
    width: 34px;
    white-space: nowrap;
    overflow: hidden;
    padding: 0;
  }

  td {
    background-color: #fff;
  }

  input {
    height: 34px;
    width: 34px;
    white-space: nowrap;
    overflow: hidden;
    border: none;
    padding: 0;
  }

  th:first-child {
    font-size: 8px;
  }

  td:first-child {
    font-weight: bold;
    background-color: rgb(225, 225, 225);
  }
  
  td:nth-last-child(2) {
    background-color: rgb(225, 225, 225);
  }

  td:last-child {
    background-color: transparent;
  }

  .footer {
    display: flex;
    width: 362px;
  }

  .void {
    background-color: transparent;
  }

  .table-footer {
    height: 36px;
    width: 120px;
    display: flex;
  }

  .total {
    border-top-width: 0px;
    height: 34px;
    width: 70px;
    background-color: rgb(225, 225, 225);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .clear-all {
    margin-left: 2px;
    border-top-width: 0px;
    border-left-width: 0px;
    height: 34px;
    width: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .A {
    background-color: rgb(255, 255, 168);
  }

  .B {
    background-color: rgb(206, 141, 255);
  }

  .C {
    background-color: rgb(148, 175, 255);
  }

  .D {
    background-color: rgb(255, 138, 138);
  }

  .E {
    background-color: rgb(159, 255, 159);
  }

  .F {
    background-color: rgb(232, 232, 232);
  }

  .G {
    background-color: rgb(255, 207, 229);
  }

</style>