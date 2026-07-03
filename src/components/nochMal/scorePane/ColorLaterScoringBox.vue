<script setup lang="ts">
  import CircledIcon from '@/components/icons/CircledIcon.vue';
  import CrossIcon from '@/components/icons/CrossIcon.vue';
  import { ColorMap } from '@/constants/noch-mal/ColorMap';
  import { useScoreStore } from '@/stores/scoreStore';
  import { Mark, type Colors, type MarkedState } from '@/types/NochMalTypes';
  import { computed } from 'vue';

  const { color, index } = defineProps<{
    color: Colors;
    index: string;
  }>();

  const { deepState, setColorBoxMark } = useScoreStore();

  const isCircled = computed(
    () => deepState.colorBoxesMarkedState.find((el: MarkedState) =>
      el.index === index)!.mark === Mark.Circled
  );

  function handleClick() {
    setColorBoxMark(index, !isCircled.value ? Mark.Circled : Mark.Blank);
  };
</script>
  
<template>
  <span :class="`box ${color}`" @click="handleClick">
    <span class="light" />
    <svg
      :fill="ColorMap.get(color)"
      :stroke="ColorMap.get(color)"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="0.5"
      class="character"
    >
      <text
        x="47%"
        y="50%"
        font-size="24"
        text-anchor="middle"
        dominant-baseline="central"
      >
        3
      </text>
    </svg>
    <CircledIcon v-if="isCircled" />
  </span>
</template>

<style scoped>
  .box {
    width: 32px;
    height: 32px;
    display: flex;
    border-radius: 5px;
    position: relative !important;
  }

  .character {
    height: 30px;
    width: 30px;
    background-color: transparent;
    margin: auto;
    display: inline-block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  .light {
    width: 32px;
    height: 32px;
    border-radius: 5px;
    background-color: var(--semi-clear);
    display: inline-block;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  .blue {
    background-color: var(--blue);
  }

  .green {
    background-color: var(--green);
  }

  .orange {
    background-color: var(--orange);
  }

  .red {
    background-color: var(--red);
  }

  .yellow {
    background-color: var(--yellow);
  }
</style>