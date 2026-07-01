<script setup lang="ts">
  import { useScoreStore } from '@/stores/scoreStore';
  import { computed } from 'vue';

  const { index } = defineProps<{ index: string }>();

  const {
    jokerBoxesState,
    setJokerChecked,
  } = useScoreStore();

  const isChecked = computed(
    () => jokerBoxesState.find((el) => el.index === index)!.isChecked
  );

  const handleClick = () => {
    setJokerChecked(index, !isChecked);
  };
</script>

<template>
  <span class="white-circle" @click="handleClick">
    <svg
      fill="black"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="character"
    >
      <text
        x="45%"
        y="52%"
        fontSize="24"
        textAnchor="middle"
        dominantBaseline="central"
      >
        !
      </text>
    </svg>
    <Cross v-if="isChecked" />
  </span>
</template>

<style>

</style>