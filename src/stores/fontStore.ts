import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFontStore = defineStore('font', () => {
  const storedFont = localStorage.getItem('font');
  const font = ref(storedFont ?? 'delius');
  function setFont(newFont: string) {
    font.value = newFont;
    localStorage.setItem('font', newFont);
  }

  return { font, setFont };
})
