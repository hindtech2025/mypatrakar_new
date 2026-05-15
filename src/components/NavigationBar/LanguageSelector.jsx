import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { MdOutlineLanguage, MdCheck } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

const languages = [
  { code: "en", label: "English", flag: "" },
  { code: "hi", label: "हिंदी", flag: "" },
  { code: "ta", label: "தமிழ்", flag: "" },
  { code: "te", label: "తెలుగు", flag: "" },
  { code: "mr", label: "मराठी", flag: "" },
  { code: "gu", label: "ગુજરાતી", flag: "" },
  { code: "pa", label: "ਪੰਜਾਬੀ", flag: "" },
];

const LanguageSelector = ({className}) => {
  const [selectedLang, setSelectedLang] = useState("en");
  const { i18n } = useTranslation();
  const { language,setLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    i18n.changeLanguage(selectedLang);
    setLanguage(selectedLang);
  }, [i18n, selectedLang, setLanguage]);

  return (
    <div className="relative">
      <button
        className={className||"flex items-center py-2 px-1 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 group"}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdOutlineLanguage size={20} className="text-gray-700 group-hover:text-red-600 mr-2" />
        <span className="font-medium text-gray-800 group-hover:text-red-600">
          {languages.find((lang) => lang.code === language)?.label}
        </span>
        <FiChevronDown 
          size={18} 
          className={`ml-2 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg w-48 py-2 z-50 border border-gray-200 animate-fadeIn">
          <div className="text-xs uppercase text-gray-500 px-4 py-1 mb-1">Select Language</div>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`w-full flex items-center px-4 py-2 hover:bg-red-50 transition-colors duration-150 ${
                selectedLang === lang.code ? "bg-red-50" : ""
              }`}
              onClick={() => {
                setSelectedLang(lang.code);
                setIsOpen(false);
              }}
            >
              <span className="text-lg mr-3">{lang.flag}</span>
              <span className="flex-1 text-left font-medium text-gray-800">
                {lang.label}
              </span>
              {selectedLang === lang.code && (
                <MdCheck className="text-red-600 text-xl" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;