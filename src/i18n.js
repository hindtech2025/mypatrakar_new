import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { Suspense } from "react";

i18n
  .use(HttpBackend) // Loads translations from public/locales
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Default language
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    Suspense: false,
  });

export default i18n;
