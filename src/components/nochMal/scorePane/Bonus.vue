<script setup lang="ts">
  import { Colors } from "@/types/NochMalTypes.ts";
  import BonusSvgText from "./BonusSvgText.vue";
  import { ColorMap } from "@/constants/noch-mal/ColorMap.ts";
  import { ref } from "vue";

  const bX = ref(8);
  const oX = ref(20);
  const nX = ref(32);
  const uX = ref(44);
  const sX = ref(56);

</script>

<template>
  <span class="bonus">
    <svg
      stroke="#000"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="3"
    >
      <BonusSvgText stroke="#fff" :strokeWidth="6" :x="bX">
        B
      </BonusSvgText>
      <BonusSvgText stroke="#fff" :strokeWidth="6" :x="oX">
        O
      </BonusSvgText>
      <BonusSvgText stroke="#fff" :strokeWidth="6" :x="nX">
        N
      </BonusSvgText>
      <BonusSvgText stroke="#fff" :strokeWidth="6" :x="uX">
        U
      </BonusSvgText>
      <BonusSvgText stroke="#fff" :strokeWidth="6" :x="sX">
        S
      </BonusSvgText>
      <BonusSvgText
        :fill="ColorMap.get(Colors.Green)"
        :x="bX"
      >
        B
      </BonusSvgText>
      <BonusSvgText
        :fill="ColorMap.get(Colors.Yellow)"
        :x="oX"
      >
        O
      </BonusSvgText>
      <BonusSvgText
        :fill="ColorMap.get(Colors.Blue)"
        :x="nX"
      >
        N
      </BonusSvgText>
      <BonusSvgText
        :fill="ColorMap.get(Colors.Red)"
        :x="uX"
      >
        U
      </BonusSvgText>
      <BonusSvgText
        :fill="ColorMap.get(Colors.Orange)"
        :x="sX"
      >
        S
      </BonusSvgText>
      </svg>
    </span>
</template>

<style scoped>
  .bonus {
    width: 66px;
    height: 24px;
    display: flex;
    background-color: transparent;
    font-weight: 1000;
  }
</style>