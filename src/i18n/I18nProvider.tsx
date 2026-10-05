import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LANGUAGE,
  dictionaries,
  isLanguage,
  Language,
  LANGUAGE_STORAGE_KEY,
  TranslationKey,
} from ".";

interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  children: ReactNode;
}

function getNestedValue(source: unknown, key: string): string | undefined {
  const value = key.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return (current as Record<string, unknown>)[part];
    }

    return undefined;
  }, source);

  return typeof value === "string" ? value : undefined;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguage(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language === "my" ? "my" : "en";
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((currentLanguage) =>
      currentLanguage === "my" ? "en" : "my"
    );
  }, []);

  const t = useCallback(
    (key: TranslationKey) => {
      return (
        getNestedValue(dictionaries[language], key) ??
        getNestedValue(dictionaries[DEFAULT_LANGUAGE], key) ??
        getNestedValue(dictionaries.en, key) ??
        key
      );
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
    }),
    [language, setLanguage, toggleLanguage, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
