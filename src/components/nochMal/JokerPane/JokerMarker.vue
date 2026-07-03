<script setup lang="ts">
  import CrossIcon from '@/components/icons/CrossIcon.vue';
  import { useScoreStore } from '@/stores/scoreStore';
import type { CheckedState } from '@/types/NochMalTypes';
  import { computed } from 'vue';

  const { index } = defineProps<{ index: string }>();

  const {
    deepState,
    setJokerChecked,
  } = useScoreStore();

  const isChecked = computed(
    () => deepState.jokerBoxesState.find((el: CheckedState) => el.index === index)!.isChecked
  );

  const handleClick = () => {
    setJokerChecked(index, !isChecked.value);
  };
</script>

<template>
  <span class="white-circle" @click="handleClick">
    <svg
      fill="black"
      stroke="black"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="character"
    >
      <text
        x="45%"
        y="52%"
        font-size="24"
        text-anchor="middle"
        dominant-baseline="central"
      >
        !
      </text>
    </svg>
    <CrossIcon v-if="isChecked" />
  </span>
</template>

<style>

</style>