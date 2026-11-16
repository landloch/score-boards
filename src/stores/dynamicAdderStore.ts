import { computed, ref} from 'vue';
import { defineStore } from 'pinia';

export const useDynamicAdderStore = defineStore('dynamicAdder', () => {
  const players = ref<(string | null)[]>([null,null,null,null]);
  const rows = ref<(string | null)[]>([null]);
  const data = ref<(number | null)[][]>([[null],[null],[null],[null]]);
  const totals = computed<number[]>(() => {
    const totals: number[] = [];
    data.value.forEach((playerData) => {
      totals.push(playerData.reduce((acc, value) => (acc ?? 0) + (value ?? 0), 0) ?? 0);
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
