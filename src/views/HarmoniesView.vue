<script setup lang="ts">
  import ScalingContainer from '@/components/common/ScalingContainer.vue';
  import Header from '@/components/nochMal/Header.vue';
  import RockIcon from '@/components/icons/harmonies/RockIcon.vue';
  import CloverIcon from '@/components/icons/harmonies/CloverIcon.vue';
  import WaterIcon from '@/components/icons/harmonies/WaterIcon.vue';
  import HutIcon from '@/components/icons/harmonies/HutIcon.vue';
  import LeavesIcon from '@/components/icons/harmonies/LeavesIcon.vue';
  import CubeIcon from '@/components/icons/harmonies/CubeIcon.vue';
</script>

<template>
  <div class="backdrop">
    <ScalingContainer :height="542" :width="382">
      <div class="base">
        <Header />
        <div class="row">
          <table>
            <tbody>
            <tr>
              <td colspan="2">
                <input name="p1-name" />
              </td>
            </tr>
            <tr>
              <td>
                <div class="column">
                  <span class="circle green">
                    <LeavesIcon :size="12" />
                  </span>
                  <input name="p1-green" />
                  <span class="circle gray">
                    <RockIcon :size="12" />
                  </span>
                  <input name="p1-gray" />
                  <span class="circle yellow">
                    <CloverIcon :size="12" />
                  </span>
                  <input name="p1-yellow" />
                  <span class="circle red">
                    <HutIcon :size="12" />
                  </span>
                  <input name="p1-red" />
                  <span class="circle blue">
                    <WaterIcon  :size="12"/>
                  </span>
                  <input name="p1-blue" />
                </div>
              </td>
              <td>
                <div class="column">
                  <span>
                    <span class="cubes clear"><CubeIcon :size="12" /></span>
                    <span class="cubes orange"><CubeIcon :size="12" /></span>
                  </span>
                  <input name="p1-cubes0" />
                  <input name="p1-cubes1" />
                  <input name="p1-cubes2" />
                  <input name="p1-cubes3" />
                  <input name="p1-cubes4" />
                  <input name="p1-cubes5" />
                  <input name="p1-cubes6" />
                  <input name="p1-cubes7" />
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
  * {
    font-family: "Bangers", sans-serif;
    paint-order: stroke fill;

    user-select: none;
    --blue: #406cfc;
    --blue-dark: #2a46a5;
    --green: #99db2e;
    --green-dark: #628d1d;
    --gray: #999;
    --gray-dark: #666;
    --red: #cc0f28;
    --red-dark: #860a1a;
    --yellow: #fc0;
    --yellow-dark: #927500;
  }

  .green {
    background-color: var(--green);
    color: var(--green-dark);
  }

  .gray {
    background-color: var(--gray);
    color: var(--gray-dark);
  }

  .yellow {
    background-color: var(--yellow);
    color: var(--yellow-dark);
  }

  .red {

    background-color: var(--red);
    color: var(--red-dark);
  }

  .blue {
    background-color: var(--blue);
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
    gap: 2px;
    width: 32px;
  }

  .circle {
    height: 16px;
    width: 16px;
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
