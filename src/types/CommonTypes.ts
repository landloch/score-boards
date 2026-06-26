export const VALID_LANGUAGES = ['en', 'es', 'pt'] as const;
export type Language = typeof VALID_LANGUAGES[number];