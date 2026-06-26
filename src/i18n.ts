import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {}
})

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
  localStorage.setItem('locale', locale);
}

const savedLocale = localStorage.getItem('locale') ?? 'en';
await loadLocale(savedLocale);
