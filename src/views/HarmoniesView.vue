<script setup lang="ts">
  import ScalingContainer from '@/components/common/ScalingContainer.vue';
  import Header from '@/components/harmonies/Header.vue';
  import RockIcon from '@/components/icons/harmonies/RockIcon.vue';
  import CloverIcon from '@/components/icons/harmonies/CloverIcon.vue';
  import WaterIcon from '@/components/icons/harmonies/WaterIcon.vue';
  import HutIcon from '@/components/icons/harmonies/HutIcon.vue';
  import LeavesIcon from '@/components/icons/harmonies/LeavesIcon.vue';
  import CubeIcon from '@/components/icons/harmonies/CubeIcon.vue';
  import { reactive, ref } from 'vue';
import type { HarmoniesPlayerState } from '@/types/HarmoniesTypes';

  const players = ref([0,1,2,3]);

  const state = reactive<HarmoniesPlayerState>();
</script>

<template>
  <div class="backdrop">
    <!-- <ScalingContainer :height="542" :width="382"> -->
      <div class="base">
        <Header />
        <div class="row">
          <table>
            <tbody>
            <tr>
              <td v-for="player in players" colspan="2">
                <div class="double-cell">
                  <input :name="`p${player}-name`" />
                </div>
              </td>
            </tr>
            <tr>
              <template v-for="player in players">
                <td>
                  <div class="column">
                    <div class="cell">
                      <span class="circle green">
                        <LeavesIcon :size="16" />
                      </span>
                    </div>
                    <div class="cell">
                      <input :name="`p${player}-green`" class="light-green" />
                    </div>
                    <div class="cell">
                      <span class="circle gray">
                        <RockIcon :size="16" />
                      </span>
                    </div>
                    <div class="cell">
                      <input :name="`p${player}-gray`" class="light-gray" />
                    </div>
                    <div class="cell">
                      <span class="circle yellow">
                        <CloverIcon :size="16" />
                      </span>
                    </div>
                    <div class="cell">
                      <input :name="`p${player}-yellow`" class="light-yellow" />
                    </div>
                    <div class="cell">
                      <span class="circle red">
                        <HutIcon :size="16" />
                      </span>
                    </div>
                    <div class="cell">
                      <input :name="`p${player}-red`" class="light-red" />
                    </div>
                    <div class="cell">
                      <span class="circle blue">
                        <WaterIcon  :size="16"/>
                      </span>
                    </div>
                    <div class="cell">
                      <input :name="`p${player}-blue`"  class="light-blue" />
                    </div>
                  </div>
                </td>
                <td>
                  <div class="column">
                    <span>
                      <span class="cubes clear"><CubeIcon :size="12" /></span>
                      <span class="cubes orange"><CubeIcon :size="12" /></span>
                    </span>
                    <input :name="`p${player}-cubes0`" />
                    <input :name="`p${player}-cubes1`" />
                    <input :name="`p${player}-cubes2`" />
                    <input :name="`p${player}-cubes3`" />
                    <input :name="`p${player}-cubes4`" />
                    <input :name="`p${player}-cubes5`" />
                    <input :name="`p${player}-cubes6`" />
                    <input :name="`p${player}-cubes7`" />
                  </div>
                </td>
              </template>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    <!-- </ScalingContainer> -->
  </div>
</template>

<style scoped>
  * {
    font-family: "Bangers", sans-serif;
    paint-order: stroke fill;
    user-select: none;
    --blue-light: #9ab0fa;
    --blue: #406cfc;
    --blue-dark: #2a46a5;
    --green-light: #c1df91;
    --green: #99db2e;
    --green-dark: #628d1d;
    --gray-light: #ddd;
    --gray: #999;
    --gray-dark: #666;
    --red-light: #d6808c;
    --red: #cc0f28;
    --red-dark: #860a1a;
    --yellow-light: #ffe992;
    --yellow: #fc0;
    --yellow-dark: #927500;
  }

  .green {
    background-color: var(--green);
    color: var(--green-dark);
  }

  .light-green {
    background-color: var(--green-light);
    color: var(--green-dark);
  }

  .gray {
    background-color: var(--gray);
    color: var(--gray-dark);
  }

  .light-gray {
    background-color: var(--gray-light);
    color: var(--gray-dark);
  }

  .yellow {
    background-color: var(--yellow);
    color: var(--yellow-dark);
  }

  .light-yellow {
    background-color: var(--yellow-light);
    color: var(--yellow-dark);
  }

  .red {
    background-color: var(--red);
    color: var(--red-dark);
  }

  .light-red {
    background-color: var(--red-light);
    color: var(--red-dark);
  }

  .blue {
    background-color: var(--blue);
    color: var(--blue-dark);
  }

  .light-blue {
    background-color: var(--blue-light);
    color: var(--blue-dark);
  }

  .orange {
    color: #c96202;
  }

  .clear {
    color: #f1f6f7;
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

  .row {
    display: flex;
    flex-direction: row;
  }
  
  .column {
    display: flex;
    flex-direction: column;
    width: 24px;
  }

  .cell {
    height: 24px;
    width: 24px;
    display: inline-flex;
    overflow: hidden;
    padding: 0px;
  }

  .double-cell {
    height: 24px;
    width: 48px;
    display: inline-flex;
    overflow: hidden;
    padding: 0px;
  }

  input {
    padding: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    text-align: center;
    font-size: inherit;
    font-family: inherit;
  }

  .circle {
    margin: auto;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
  }

  .cubes {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
  }
</style>
