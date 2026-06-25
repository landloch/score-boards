import type { Directive } from 'vue';

export const vNaturalNumber: Directive<HTMLInputElement> = {
  mounted(el) {
    el.addEventListener('input', () => {
      // Strips anything that isn't a digit on every input stroke
      el.value = el.value.replace(/\D/g, '');
    });
  }
};