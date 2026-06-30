import { createI18n } from 'vue-i18n';
import { SUPPORTED_LOCALES } from './constants/Locales';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {}
});

const loadedLanguages = new Set<string>();

const localeFiles = import.meta.glob('./locales/*.json');

export async function loadLocale(locale: string) {
  if (!loadedLanguages.has(locale)) {
    const loader: any =
      localeFiles[`./locales/${locale}.json`];

    if (!loader)
      throw new Error(`Unknown locale: ${locale}`);

    const messages = await loader();

    i18n.global.setLocaleMessage(
      locale,
      messages.default
    );

    loadedLanguages.add(locale);
  }

  i18n.global.locale.value = locale;
  document.documentElement.lang = locale;
  document.title = i18n.global.t('app.title');
  localStorage.setItem('locale', locale);
}

const savedLocale =
  localStorage.getItem('locale') ??
    SUPPORTED_LOCALES.includes(navigator.language.substring(0,2)) ?
      navigator.language.substring(0,2) : 'en';
await loadLocale(savedLocale);
