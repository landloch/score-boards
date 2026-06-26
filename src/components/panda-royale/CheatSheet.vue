<script setup lang="ts">
  const props = defineProps({
    width: {
      type: Number,
      default: 274
    }
  });
</script>

<template>
  <div class="cheat-sheet" :style="{ width }">
    <ul>
      <li>
        {{ $t('panda-royale.cheat-sheet.step1') }}
      </li>
      <li>
        {{ $t('panda-royale.cheat-sheet.step2') }}
      </li>
      <li>
        {{ $t('panda-royale.cheat-sheet.step3') }}
      </li>
      <li>
        {{ $t('panda-royale.cheat-sheet.step4') }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .cheat-sheet {
    font-family: Calibri, sans-serif;
    box-sizing: border-box;
    color: #333;
    margin: 4px;
    border-radius: 5px;
    background-color: white;
    border: 3px solid #666;
    width: 274px;
    text-align: start;
    vertical-align: top;
  }

  ul {
    margin: 2px;
    padding-left: 12px;
  }

  li {
    font-size: 8px;
  }

  li::marker {
    content: counter(list-item, number) ". ";
    color: #333;
  }

</style>