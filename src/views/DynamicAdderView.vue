<script setup lang="ts">
  import Header from '@/components/dynamic-adder/Header.vue';
  import IntegerInput from '@/components/common/IntegerInput.vue';
  import { useFontStore } from '@/stores/fontStore';
  import { useDynamicAdderStore } from '@/stores/dynamicAdderStore';
  import TrashIcon from '@/components/icons/TrashIcon.vue';
  import EraserIcon from '@/components/icons/EraserIcon.vue';
  import SquareButton from '@/components/common/SquareButton.vue';
  import AddPlayerIcon from '@/components/icons/dynamicAdder/AddPlayerIcon.vue';
  import AddRowIcon from '@/components/icons/dynamicAdder/AddRowIcon.vue';
  import ScalingContainer from '@/components/common/ScalingContainer.vue';
  import MathInput from '@/components/dynamic-adder/MathInput.vue';
  import { evaluateExpression } from '@/utils/MathMagic';

  const fontStore = useFontStore();
  const dynamicAdder = useDynamicAdderStore();
</script>

<template>
  <div class="backdrop">
    <ScalingContainer :height="900" :width="420">
      <div class="base">
        <Header />
        <div class="row">
          <table>
            <tbody>
            <tr>
              <td>
              </td>
              <td v-for="(_, pIndex) in dynamicAdder.players">
                <SquareButton
                  :width="24"
                  :height="24"
                  :action="() => dynamicAdder.clearPlayer(pIndex)"
                >
                  <EraserIcon :width="18" :height="18" color="#333" />
                </SquareButton>
                <SquareButton
                  :width="24"
                  :height="24"
                  :action="() => dynamicAdder.removePlayer(pIndex)"
                >
                  <TrashIcon :width="18" :height="18"color="#333" />
                </SquareButton>
              </td>
            </tr>
            <tr>
              <td>
                <SquareButton
                  :width="24"
                  :height="24"
                  :action="() => dynamicAdder.addPlayer()"
                >
                  <AddPlayerIcon :width="18" :height="18" color="#333" />
                </SquareButton>
              </td>
              <td v-for="(_, pIndex) in dynamicAdder.players">
                <div class="cell">
                  <input
                    v-model="dynamicAdder.players[pIndex]"
                    :name="`p${pIndex}-name`"
                    :class="`font-${fontStore.font}`"
                    :placeholder="`P ${pIndex + 1}`"
                  />
                </div>
              </td>
            </tr>
            <tr v-for="(_, rIndex) in dynamicAdder.rows">
              <td>
                <div class="cell">
                  <input
                    v-model="dynamicAdder.rows[rIndex]"
                    :name="`p${rIndex}-name`"
                    :class="`font-${fontStore.font}`"
                    :placeholder="`R ${rIndex + 1}`"
                  />
                </div>
              </td>
              <td v-for="(_, pIndex) in dynamicAdder.players">
                <div class="cell">
                  <MathInput
                    v-model="dynamicAdder.data[pIndex]![rIndex]!"
                    :name="`p${rIndex}-name`"
                    :class="`font-${fontStore.font}`"
                  />
                </div>
              </td>
              <td class="void">
                <SquareButton
                  :width="24"
                  :height="24"
                  :action="() => dynamicAdder.clearRow(rIndex)"
                >
                  <EraserIcon :width="18" :height="18" color="#333" />
                </SquareButton>
              </td>
              <td class="void">
                <SquareButton
                  :width="24"
                  :height="24"
                  :action="() => dynamicAdder.removeRow(rIndex)"
                >
                  <TrashIcon :width="18" :height="18" color="#333" />
                </SquareButton>
              </td>
            </tr>
            <tr>
              <td>
                <SquareButton
                  :width="24"
                  :height="24" :action="() => dynamicAdder.addRow()"
                >
                  <AddRowIcon :width="18" :height="18" color="#333" />
                </SquareButton>
              </td>
              <td v-for="playerTotal in dynamicAdder.totals">
                <div :class="`cell total-cell font-${fontStore.font}`">
                  {{ playerTotal }}
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ScalingContainer>
  </div>
</template>

<style scoped>
  table {
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 2px;
    background: transparent;
    outline: 2px solid transparent;
  }

  td {
    overflow: hidden;
    padding: 0;
  }

  .backdrop {
    background-color: #404040;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .base {
    background-color: #404040;
    padding: 5px;
    box-sizing: border-box;
  }

  .cell {
    height: 24px;
    width: 48px;
    display: inline-flex;
    overflow: hidden;
    padding: 0px;
    background-color: #fff;
    text-align: center;
    font-size: inherit;
    align-items: center;
    justify-content: center;
  }

  input {
    padding: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    text-align: center;
    font-size: inherit;
  }
</style>
