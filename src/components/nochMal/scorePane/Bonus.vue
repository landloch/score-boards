<script setup lang="ts">
  import { Colors } from "@/types/NochMalTypes.ts";
  import BonusSvgText from "./BonusSvgText.vue";
  import { ColorMap } from "@/constants/noch-mal/ColorMap.ts";
</script>

<template>
  <span class="bonus">
    <svg
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    >
      <BonusSvgText stroke="#fff" :strokeWidth="7" :x="10">
        B
      </BonusSvgText>
      <BonusSvgText stroke="#fff" :strokeWidth="7" :x="24">
        O
      </BonusSvgText>
      <BonusSvgText stroke="#fff" :strokeWidth="7" :x="38">
        N
      </BonusSvgText>
      <BonusSvgText stroke="#fff" :strokeWidth="7" :x="52">
        U
      </BonusSvgText>
      <BonusSvgText stroke="#fff" :strokeWidth="7" :x="66">
        S
      </BonusSvgText>
      <BonusSvgText
        :fill="ColorMap.get(Colors.Green)"
        :x="10"
      >
        B
      </BonusSvgText>
      <BonusSvgText
        :fill="ColorMap.get(Colors.Yellow)"
        :x="24"
      >
        O
      </BonusSvgText>
      <BonusSvgText
        :fill="ColorMap.get(Colors.Blue)"
        :x="38"
      >
        N
      </BonusSvgText>
      <BonusSvgText
        :fill="ColorMap.get(Colors.Red)"
        :x="52"
      >
        U
      </BonusSvgText>
      <BonusSvgText
        :fill="ColorMap.get(Colors.Orange)"
        :x="66">
        S
      </BonusSvgText>
      </svg>
    </span>
</template>

<style scoped>
  .bonus {
    width: 94px;
    height: 32px;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -moz-flex;
    display: -webkit-flex;
    display: flex;
    background-color: transparent;
    font-weight: 1000;
  }
</style>