<script setup lang="ts">
  import CrossIcon from '@/components/icons/CrossIcon.vue';
  import { useNochMalStore } from '@/stores/nochMalStore';
  import { computed } from 'vue';

  const { index } = defineProps<{ index: number }>();

  const { deepState, flipJokerChecked } = useNochMalStore();

  const isChecked = computed(() =>
    deepState.jokersState[index]
  );

  function handleClick() {
    flipJokerChecked(index);
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