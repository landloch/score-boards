<script setup lang="ts">
  import { computed, onBeforeMount, ref, watch } from 'vue';
  import { InputRow, type InputCell } from '@/types/PandaRoyalTypes';
  import SquareButton from '@/components/common/SquareButton.vue';
  import ScalingContainer from '@/components/common/ScalingContainer.vue';
  import IntegerInput from '@/components/common/IntegerInput.vue';
  import CheatSheet from '@/components/panda-royale/CheatSheet.vue';
  import Header from '@/components/panda-royale/Header.vue';
  import EraserIcon from '@/components/icons/EraserIcon.vue';
  import { useFontStore } from '@/stores/fontStore';
  import Modal from '@/components/common/Modal.vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const columnNames = ['A','B','C','D','E','F','G'];

  const fontStore = useFontStore();

  const rows = ref<InputRow[]>([]);
  onBeforeMount(() => {
    const storeStateString = sessionStorage.getItem('panda-royale-sheet-state');
    if (storeStateString) {
      const storeState = JSON.parse(storeStateString) as InputRow[];
      storeState.forEach(row => {
        const valueCells: InputCell[] = [];
        row.valueCells.forEach(cell => {
          valueCells.push({ column: cell.column, value: cell.value });
        });
        rows.value.push(new InputRow(row.index, valueCells));
      });
      return;
    }
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

  const showClearModal = ref(false);
  const rowsToClear = ref<number[]>([]);
  const clearModalText = computed(() => {
    if (rowsToClear.value.length == 1) {
      return `${t('panda-royale.modal.confirm-clear-row')} ${rowsToClear.value[0]! + 1}?`;
    }
    else {
      return t('panda-royale.modal.confirm-clear-all');
    }
  });

  function handleClickClear(rowToClear: number | 'all') {
    if (typeof rowToClear === 'number') {
      rowsToClear.value = [rowToClear - 1];
    }
    else {
      rowsToClear.value = [0,1,2,3,4,5,6,7,8,9];
    }
    showClearModal.value = true;
  }

  function clearRows() {
    rowsToClear.value.forEach((rowIndex) => {
      rows.value[rowIndex]!.valueCells.forEach((cell) => {
        cell.value = null;
      });
    });
    closeClearModeal();
  }

  function closeClearModeal() {
    showClearModal.value = false;
    rowsToClear.value = [];
  }

  watch(rows.value, (newValue: any, oldValue: any) => {
    sessionStorage.setItem(
      'panda-royale-sheet-state',
       JSON.stringify(newValue)
    );
  })
</script>

<template>
  <div class="backdrop">
    <ScalingContainer :height="542" :width="382">
      <Header />
      <table>
        <thead>
          <tr>
            <th>{{ $t('panda-royale.table-header.round') }}</th>
            <th v-for="cn in columnNames" :class="cn">
              {{ $t(`panda-royale.table-header.${cn}`)  }}
            </th>
            <th>{{ $t('panda-royale.table-header.total') }}</th>
            <th class="void"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows">
            <td>{{ row.index }}</td>
            <td v-for="(cell, index) in row.valueCells" :class="cell.column">
              <IntegerInput
                v-model="cell.value"
                :class="`font-${fontStore.font}`"
                :allow-negastive="cell.column === 'D'"
              />
            </td>
            <td v-if="row.index == 1" colspan="6"></td>
            <td :class="`font-${fontStore.font}`">{{ row.total }}</td>
            <td class="void">
              <SquareButton :action="() => handleClickClear(row.index)">
                <EraserIcon color="#333" />
              </SquareButton>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="footer">
        <CheatSheet :width="274" />
        <div class="table-footer">
          <div :class="`total font-${fontStore.font}`">{{ getScoreTotal() }}</div>
          <div class="clear-all">
            <SquareButton :action="() => handleClickClear('all')">
              <EraserIcon color="#333" />
            </SquareButton>
          </div>
        </div>
      </div>
    </ScalingContainer>
  </div>
  <Modal
    :show="showClearModal"
    @close="closeClearModeal"
    :action="clearRows"
    :action-label="t('modal.yes')"
    :close-label="t('modal.no')"
    :width="200"
    :height="70"
  >
    <div>{{ clearModalText }}</div>
  </Modal>
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
    mask-size: 35vh 35vh;

    -webkit-mask-image: url('@/assets/bamboo-pattern.svg');
    -webkit-mask-repeat: repeat;
    -webkit-mask-size: 35vh 35vh;
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
    font-size: 7px;
    white-space: pre-line;
  }

  td, th {
    height: 34px;
    width: 34px;
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
    background: #ffffffaa;
  } 

  td:first-child {
    font-weight: bold;
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
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
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
    background-color: rgb(255, 183, 223);
  }

</style>