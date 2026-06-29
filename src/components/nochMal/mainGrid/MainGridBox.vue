<script setup lang="ts">
import { useScoreStore } from '@/stores/scoreStore';
import { BoxData } from '@/types/NochMalTypes';
import { computed } from 'vue';

  const { box, centerLine } = defineProps({
    box: {
      type: BoxData,
      required: true
    },
    centerLine: Boolean
  });
  const { mainGridState, setMainGridChecked } =
    useScoreStore();

  const isChecked = computed(
    () => mainGridState.find(
      (el) => el.index === box.index
    )!.isChecked
  );

  function handleClick(boxIndex: string) {
    setMainGridChecked(box.index, !isChecked);
  };
</script>

<template>
  <span
    id={box.index}
    key={box.index}
    :class="`box ${box.color} ${centerLine ? 'center-column' : ''}`"
    @click="() => handleClick(box.index)"
  >
    {box.stared || <Circle />}
    {box.stared && <Star />}
    {isChecked && <Cross />}
  </span>
</template>

<style>

</style>