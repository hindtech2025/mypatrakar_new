// LanguageContext.js
import React, { createContext, useState } from "react";
import translations from "../../public/locales/translations.js";

export const LanguageContext = createContext();
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const translate = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
