<script setup lang="ts">
  import CrossIcon from '@/components/icons/CrossIcon.vue';
  import CircleIcon from '@/components/icons/nochMal/CircleIcon.vue';
  import StarIcon from '@/components/icons/nochMal/StarIcon.vue';
  import { useScoreStore } from '@/stores/scoreStore';
  import { BoxData, type MainGridCheckedState } from '@/types/NochMalTypes';
  import { computed } from 'vue';

  const { box, centerLine } = defineProps({
    box: {
      type: BoxData,
      required: true
    },
    centerLine: Boolean
  });
  const { deepState, setMainGridChecked } =
    useScoreStore();

  const isChecked = computed(
    () => deepState.mainGridState.find(
      (el: MainGridCheckedState) => el.index === box.index
    )!.checked
  );

  function handleClick(boxIndex: number) {
    if (deepState.mainGridState[boxIndex]!.enabled) {
      setMainGridChecked(boxIndex, !isChecked.value);
    }
  };

  const checkIfDisabled = computed(() => {
    const realRowIndex = box.rowId.charCodeAt(0) - 'A'.charCodeAt(0);
    const i = realRowIndex * 7 + box.column;
    return deepState.mainGridState[i]!.enabled ? "enabled" : "disabled";
  });
</script>

<template>
  <span
    :id="box.index.toString()"
    :key="box.index"
    :class="`box ${box.color} ${checkIfDisabled} ${centerLine ? 'center-column' : ''}`"
    @click="() => handleClick(box.index)"
  >
    <StarIcon v-if="box.stared" />
    <CircleIcon v-else />
    <CrossIcon v-if="isChecked"/>
  </span>
</template>

<style scoped>
  .box {
    width: 32px;
    height: 32px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    border-radius: 5px;
    position: relative;
  }

  .disabled {
    opacity: 0.5;
  }

  .center-column {
    border: 2px solid white;
    margin: -2px;
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