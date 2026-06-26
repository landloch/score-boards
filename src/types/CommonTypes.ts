export const VALID_LANGUAGES = ['En-Us', 'Sp-Es', 'Pt-Br'] as const;
export type Language = typeof VALID_LANGUAGES[number];