import type { Component } from "vue";

export const VALID_LANGUAGES = ['en', 'es', 'pt'] as const;
export type Language = typeof VALID_LANGUAGES[number];

export type Tab = {
  id: string;
  label: string;
  icon: Component
}