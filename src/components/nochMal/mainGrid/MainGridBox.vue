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
    return deepState.mainGridState[i]!.enabled ? "" : "trans-";
  });
</script>

<template>
  <span
    :id="box.index.toString()"
    :key="box.index"
    :class="`box ${checkIfDisabled}${box.color} ${centerLine ? 'center-column' : ''}`"
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

  .trans-blue {
    background-color: var(--trans-blue);
    opacity: 0.8;
  }

  .trans-green {
    background-color: var(--trans-green);
    opacity: 0.8;
  }

  .trans-orange {
    background-color: var(--trans-orange);
    opacity: 0.8;
  }

  .trans-red {
    background-color: var(--trans-red);
    opacity: 0.8;
  }

  .trans-yellow {
    background-color: var(--trans-yellow);
    opacity: 0.8;
  }
</style>