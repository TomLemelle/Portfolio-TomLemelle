import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import it from "../locales/it.json";

export type Locale = "fr" | "en" | "it";

export type TranslationContextType = {
  locale: Locale;
  dictionary: any;
  changeLanguage: (lang: Locale) => void;
  getFlag: (lang: Locale) => string;
};

const translations = { en, fr, it };

const TranslationContext = createContext<TranslationContextType>({
  locale: "fr",
  dictionary: translations.fr,
  changeLanguage: () => {},
  getFlag: () => "",
});

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    return (localStorage.getItem("locale") as Locale) || "fr";
  });

  const [dictionary, setDictionary] = useState<any>(translations[locale]);

  useEffect(() => {
    setDictionary(translations[locale]);
    localStorage.setItem("locale", locale);
  }, [locale]);

  const changeLanguage = (lang: Locale) => {
    setLocale(lang);
  };

  const getFlag = (lang: Locale) => {
    switch (lang) {
      case "en":
        return "🇬🇧";
      case "fr":
        return "🇫🇷";
      case "it":
        return "🇮🇹";
      default:
        return "🏳️";
    }
  };

  return (
    <TranslationContext.Provider
      value={{ locale, dictionary, changeLanguage, getFlag }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }

  return context;
};
