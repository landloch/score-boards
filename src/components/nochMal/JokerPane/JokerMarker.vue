<script setup lang="ts">
  import CrossIcon from '@/components/icons/CrossIcon.vue';
import { useScoreStore } from '@/stores/scoreStore';
  import { computed } from 'vue';

  const { index } = defineProps<{ index: string }>();

  const {
    deepState,
    setJokerChecked,
  } = useScoreStore();

  const isChecked = computed(
    () => deepState.jokerBoxesState.find((el) => el.index === index)!.isChecked
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
    <CrossIcon v-if="isChecked" />
  </span>
</template>

<style>

</style>