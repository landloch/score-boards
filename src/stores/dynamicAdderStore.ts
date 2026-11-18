import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { evaluateExpression } from '@/utils/MathMagic';

export const useDynamicAdderStore = defineStore('dynamicAdder', () => {
  const players = ref<(string | null)[]>(
    sessionStorage.getItem('dynamic-adder.players')
      ? JSON.parse(sessionStorage.getItem('dynamic-adder.players')!) as (string | null)[]
      : [null,null,null,null]
  );
  const rows = ref<(string | null)[]>(
    sessionStorage.getItem('dynamic-adder.rows')
      ? JSON.parse(sessionStorage.getItem('dynamic-adder.rows')!) as (string | null)[]
      : [null,null,null,null]
  );
  const data = ref<(string | null)[][]>(
    sessionStorage.getItem('dynamic-adder.data')
      ? JSON.parse(sessionStorage.getItem('dynamic-adder.data')!) as (string | null)[][]
      : [
        [null,null,null,null],
        [null,null,null,null],
        [null,null,null,null],
        [null,null,null,null]
      ]
  );
  watch(players, (value) => {
    sessionStorage.setItem('dynamic-adder.players', JSON.stringify(value));
  }, { deep: true, flush: 'sync' });
  watch(rows, (value) => {
    sessionStorage.setItem('dynamic-adder.rows', JSON.stringify(value));
  }, { deep: true, flush: 'sync' });
  watch(data, (value) => {
    sessionStorage.setItem('dynamic-adder.data', JSON.stringify(value));
  }, { deep: true, flush: 'sync' });
  const totals = computed<number[]>(() => {
    const totals: number[] = [];
    data.value.forEach((playerData) => {
      const newTotal = playerData.reduce(
        (acc, value) => (acc ?? 0) + (evaluateExpression(value ?? '0')), 0
      ) ?? 0;
      totals.push(newTotal);
    });
    return totals;
  });

  function addPlayer() {
    players.value.push(null);
    data.value.push(Array(rows.value.length).fill(null));
  }

  function removePlayer(index: number) {
    players.value.splice(index, 1);
    data.value.splice(index, 1);
  }

  function clearPlayer(pIndex: number) {
    data.value[pIndex]!.forEach((_, rIndex) => {
      data.value[pIndex]![rIndex] = null;
    });
  }

  function addRow() {
    rows.value.push(null);
    data.value.forEach((playerData) => {
      playerData.push(null);
    });
  }

  function removeRow(index: number) {
    rows.value.splice(index, 1);
    data.value.forEach((playerData) => {
      playerData.splice(index, 1);
    });
  }

  function clearRow(rIndex: number) {
    data.value.forEach((_, pIndex) => {
      data.value[pIndex]![rIndex] = null;
    });
  }

  return {
    players, addPlayer, removePlayer, clearPlayer,
    rows, addRow, removeRow, clearRow,
    data, totals,
  };
});
