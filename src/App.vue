<script setup lang="ts">
  import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
  import { InputRow, type InputCell } from './types/PandaRoyalTypes';
  import Eraser from './components/icons/Eraser.vue';
  import SquareButton from './components/SquareButton.vue';
  import HorizontalArrow from './components/panda-royale/HorizontalArrow.vue';

  const columnNames = ['A','B','C','D','E','F','G'];

  const rows = ref<InputRow[]>([]);
  onBeforeMount(() => {
    const valueCells: InputCell[] = [];
    valueCells.push({
      column: 'A',
      value: null,
    });
    rows.value.push(new InputRow(1, valueCells));
    for (let i = 2; i <= 10; i++) {
      const valueCells: InputCell[] = [];
      columnNames.forEach(cn => {
        valueCells.push({
          column: cn,
          value: null,
        });
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

  function onChangeInput(event: Event, rowIndex: number,cellIndex: number) {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value.replace(/\D/g, '').slice(0, 3));
    rows.value[rowIndex]!.valueCells[cellIndex]!.value = isNaN(value) ? null : value;
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

  const DESIGN_WIDTH = 382;
  const DESIGN_HEIGHT = 522;

  const scale = ref(1);

  function updateScale() {
    const sx = window.innerWidth / DESIGN_WIDTH
    const sy = window.innerHeight / DESIGN_HEIGHT
    scale.value = Math.min(sx, sy)
  }

  onMounted(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateScale);
  });
</script>

<template>
  <div id="backdrop" class="backdrop">
    <div
      id="container"
      class="container" 
      :style="{ transform: `scale(${scale})`, width: DESIGN_WIDTH, height: DESIGN_HEIGHT  }"
    >
      <h1>Panda</h1>
      <HorizontalArrow
        :shaft-length="80"
        style="color: white; margin-top: -6px; margin-bottom: -6px;"
      />
      <h1>Royale</h1>
      <table>
        <thead>
          <tr>
            <th>Rodada</th>
            <th v-for="cn in columnNames" :class="cn">{{ cn }}</th>
            <th>=</th>
            <th class="void"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows">
            <td>{{ row.index }}</td>
            <td v-for="(cell, index) in row.valueCells">
              <input
                :placeholder="cell.column"
                v-model.number="cell.value"
                @input="(event) =>  onChangeInput(event, row.index - 1, index)"
              />
            </td>
            <td v-if="row.index == 1" colspan="6"></td>
            <td>{{ row.total }}</td>
            <td class="void">
              <SquareButton :action="() => clearRow(row.index - 1)">
                <Eraser/>
              </SquareButton>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="footer">
        <div class="cheat-sheet">
          <ul>
            <li>
            Lançar os dados e calcular as pontuações
            </li>
            <li>
              Determinar quais os jogadores que ganham um dado de consolação
            </li>
            <li>
              Trocar dados
            </li>
            <li>
              Escolher um novo dado
            </li>
          </ul>
        </div>
        <div class="table-footer">
          <div class="total">{{ getScoreTotal() }}</div>
          <div class="clear-all">
            <SquareButton :action="() => clearSheet()">
              <Eraser/>
            </SquareButton>
          </div>
        </div>
      </div>
    </div>
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

  .container {
    padding:10px;
    transform-origin: center center;
    z-index: 1;
  }

  * {
    font-size: 20px;
    color: #333;
    font-family: Calibri, sans-serif;
    box-sizing: border-box;
    text-align: center;
    vertical-align: middle;
  }

  li::marker {
    content: counter(list-item, number) ". ";
    color: #333;
  }

  h1, hr {
    color: white;
    margin: 0;
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
  }

  td, th {
    height: 34px;
    width: 34px;
    white-space: nowrap;
    overflow: hidden;
    padding: 0;
    background-color: white;
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
  }

  .footer {
    display: flex;
    width: 362px;
  }

  .cheat-sheet {
    margin: 4px;
    border-radius: 5px;
    background-color: white;
    border: 3px solid #666;
    width: 274px;
    text-align: start;
    vertical-align: top;
  }

  .void {
    background-color: transparent;
  }

  ul {
    margin: 2px;
    padding-left: 12px;
  }

  li {
    text-align: start;
    font-size: 8px;
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
    background-color: white;
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
    background-color: rgb(255, 255, 150);
  }

  .B {
    background-color: rgb(219, 141, 255);
  }

  .C {
    background-color: rgb(148, 148, 255);
  }

  .D {
    background-color: rgb(255, 138, 138);
  }

  .E {
    background-color: rgb(159, 255, 159);
  }

  .F {
    background-color: rgb(218, 218, 218);
  }

  .G {
    background-color: rgb(255, 207, 229);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>


<!-- <li>
            Lanzar dados y calcular puntuación / Lançar os dados e calcular as pontuações / Tirare i dadi e calcolare il punteggio
          </li>
          <li>
            Determinar qué jugadores reciben dados piadosos / Determinar quais os jogadores que ganham um dado de consolação / Determinare chi ottiene i dadi pietà
          </li>
          <li>
            Canjear dados / Trocar dados / Scambiare i dadi
          </li>
          <li>
            Elegir un nuevo dado / Escolher um novo dado / Scegliere un nuovo dado
          </li> -->