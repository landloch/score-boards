<script setup lang="ts">
import CircledIcon from '@/components/icons/CircledIcon.vue';
import CrossIcon from '@/components/icons/CrossIcon.vue';
import { useScoreStore } from '@/stores/scoreStore';
import { type Colors, Mark, type MarkedState } from '@/types/NochMalTypes';


const { score, color, index } = defineProps<{
  score: number; color: Colors; index: string;
}>();
  const stateArray: Mark[] = [Mark.Blank, Mark.Circled, Mark.Scratched];
  const { deepState, setColorBoxMark } = useScoreStore();

  const getState = () =>
    deepState.colorBoxesMarkedState.find((el: MarkedState) => el.index === index)!.mark;

  function handleClick() {
    const nextMark = stateArray[(getState() + 1) % 3];
    setColorBoxMark(index, nextMark!);
  }

</script>

<template>
  <span :class="`box ${color}`" @click="handleClick">
      <span class="light" />
      <svg
        fill={ColorMap.get(color)}
        stroke={ColorMap.get(color)}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={0.5}
        class="character"
      >
        <text
          x="47%"
          y="50%"
          fontSize="24"
          text-anchor="middle"
          dominant-baseline="central"
        >
          {{ score }}
        </text>
      </svg>
      <CrossIcon v-if="getState() === Mark.Scratched" />
      <CircledIcon v-else-if="getState() === Mark.Circled"/>
    </span>
</template>

<style scoped>

</style>