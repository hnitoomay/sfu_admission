import { en } from "./en";
import { my } from "./my";

export const DEFAULT_LANGUAGE = "en";
export const LANGUAGE_STORAGE_KEY = "sfu-language";

export const dictionaries = {
  en,
  my,
} as const;

export type Language = keyof typeof dictionaries;
export type Dictionary = typeof en;
export type TranslationKey = string;
export type LocalizedText = string | { en?: string; my?: string };

export const languageLabels: Record<Language, string> = {
  en: en.common.language,
  my: my.common.language,
};

export function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "my";
}

export function localizedText(
  value: LocalizedText | null | undefined,
  language: Language
) {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  return value[language] ?? value[DEFAULT_LANGUAGE] ?? value.en ?? "";
}
