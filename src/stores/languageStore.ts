import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { VALID_LANGUAGES, type Language } from '@/types/CommonTypes';

const isValidLanguage = (value: unknown): value is Language => 
  VALID_LANGUAGES.includes(value as Language);

export const useLanguageStore = defineStore('language', () => {
  const storedLanguage = localStorage.getItem('language');
  const language = ref<Language>(isValidLanguage(storedLanguage) ? storedLanguage : 'En-Us');
  function setLanguage(lang: Language) {
    language.value = lang;
    localStorage.setItem('language', lang);
  }

  return { language, setLanguage };
})
