import React, { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const LanguageModeSelector = ({
  languageMode,
  onLanguageModeChange,
  selectedLanguage,
  onLanguageSelect,
  languageOptions,
  loading,
  error,
  required = false,
}) => {
  const [internalError, setInternalError] = useState("");

  const formatLanguageOptions = () => {
    if (!Array.isArray(languageOptions)) return [];
    return languageOptions.map((opt) => ({
      value: opt.name || opt.language || opt.value,
      label: opt.name || opt.language || opt.label || opt,
    }));
  };

  const handleModeChange = (mode) => {
    onLanguageModeChange(mode); // 1 = multi, 0 = single
    setInternalError("");
  };

  const handleLanguageChange = (selected) => {
    onLanguageSelect(selected ? selected.value : "");
    setInternalError("");
  };

  // 🔥 language always required
  useEffect(() => {
    if (required && !selectedLanguage) {
      setInternalError("Please select a language");
    } else {
      setInternalError("");
    }
  }, [selectedLanguage, required]);

  return (
    // <div className="w-full">
    //   <label className="block text-sm font-medium text-gray-700 mb-2">
    //     Preferred Language Mode <span className="text-red-500">*</span>
    //   </label>
    //   <div className="w-full md:flex grid  items-center justify-between gap-5">
    //     {/* MULTI LANGUAGE MODE */}
    //     <div
    //       className={`px-4 py-3 border w-full rounded-lg cursor-pointer transition-all ${
    //         languageMode === 1
    //           ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
    //           : "border-gray-300 hover:bg-gray-50"
    //       }`}
    //       onClick={() => handleModeChange(1)}
    //     >
    //       <h3 className="font-medium text-sm text-gray-900">
    //         Multilingual Mode
    //       </h3>
    //       <p className="text-sm text-gray-600 mt-1">
    //         Auto translate content to all languages
    //       </p>

    //       {/* LANGUAGE SELECT (INSIDE BOX) */}
    //       {languageMode === 1 && (
    //         <div
    //           className="mt-3"
    //           onClick={(e) => e.stopPropagation()} // 🔥 IMPORTANT FIX
    //         >
    //           <label className="block text-sm font-medium text-gray-700 mb-1">
    //             Select Language <span className="text-red-500">*</span>
    //           </label>
    //           <Select
    //             value={
    //               formatLanguageOptions().find(
    //                 (opt) => opt.value === selectedLanguage,
    //               ) || null
    //             }
    //             onChange={handleLanguageChange}
    //             options={formatLanguageOptions()}
    //             isDisabled={loading}
    //             isLoading={loading}
    //             placeholder={
    //               loading ? "Loading languages..." : "Select a language..."
    //             }
    //             isSearchable
    //           />
    //         </div>
    //       )}
    //     </div>

    //     {/* SINGLE LANGUAGE MODE */}
    //     <div
    //       className={`px-4 py-3 border w-full rounded-lg cursor-pointer transition-all ${
    //         languageMode === 0
    //           ? "border-green-500 bg-green-50 ring-2 ring-green-100"
    //           : "border-gray-300 hover:bg-gray-50"
    //       }`}
    //       onClick={() => handleModeChange(0)}
    //     >
    //       <h3 className="font-medium text-sm text-gray-900">
    //         Single Language Mode
    //       </h3>
    //       <p className="text-sm text-gray-600 mt-1">
    //         Best performance, one language only
    //       </p>

    //       {/* LANGUAGE SELECT (INSIDE BOX) */}
    //       {languageMode === 0 && (
    //         <div
    //           className="mt-3"
    //           onClick={(e) => e.stopPropagation()} // 🔥 IMPORTANT FIX
    //         >
    //           <label className="block text-sm font-medium text-gray-700 mb-1">
    //             Select Language <span className="text-red-500">*</span>
    //           </label>
    //           <Select
    //             value={
    //               formatLanguageOptions().find(
    //                 (opt) => opt.value === selectedLanguage,
    //               ) || null
    //             }
    //             onChange={handleLanguageChange}
    //             options={formatLanguageOptions()}
    //             isDisabled={loading}
    //             isLoading={loading}
    //             placeholder={
    //               loading ? "Loading languages..." : "Select a language..."
    //             }
    //             isSearchable
    //           />
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   {(error || internalError) && (
    //     <p className="text-red-500 text-sm mt-2">{error || internalError}</p>
    //   )}
    // </div>


    <div className="w-full">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Preferred Language Mode <span className="text-red-500">*</span>
  </label>
  <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-5">
    {/* MULTI LANGUAGE MODE */}
    <div
      className={`px-4 py-3 border w-full md:w-1/2 rounded-lg cursor-pointer transition-all ${
        languageMode === 1
          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
          : "border-gray-300 hover:bg-gray-50"
      }`}
      onClick={() => handleModeChange(1)}
    >
      <h3 className="font-medium text-sm text-gray-900">
        Multilingual Mode
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        Auto translate content to all languages
      </p>

      {languageMode === 1 && (
        <div className="mt-3" onClick={(e) => e.stopPropagation()}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Language <span className="text-red-500">*</span>
          </label>
          <Select
            value={
              formatLanguageOptions().find(
                (opt) => opt.value === selectedLanguage
              ) || null
            }
            onChange={handleLanguageChange}
            options={formatLanguageOptions()}
            isDisabled={loading}
            isLoading={loading}
            placeholder={
              loading ? "Loading languages..." : "Select a language..."
            }
            isSearchable
          />
        </div>
      )}
    </div>

    {/* SINGLE LANGUAGE MODE */}
    <div
      className={`px-4 py-3 border w-full md:w-1/2 rounded-lg cursor-pointer transition-all ${
        languageMode === 0
          ? "border-green-500 bg-green-50 ring-2 ring-green-100"
          : "border-gray-300 hover:bg-gray-50"
      }`}
      onClick={() => handleModeChange(0)}
    >
      <h3 className="font-medium text-sm text-gray-900">
        Single Language Mode
      </h3>
      <p className="text-sm text-gray-600 mt-1">
        Best performance, one language only
      </p>

      {languageMode === 0 && (
        <div className="mt-3" onClick={(e) => e.stopPropagation()}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Language <span className="text-red-500">*</span>
          </label>
          <Select
            value={
              formatLanguageOptions().find(
                (opt) => opt.value === selectedLanguage
              ) || null
            }
            onChange={handleLanguageChange}
            options={formatLanguageOptions()}
            isDisabled={loading}
            isLoading={loading}
            placeholder={
              loading ? "Loading languages..." : "Select a language..."
            }
            isSearchable
          />
        </div>
      )}
    </div>
  </div>

  {(error || internalError) && (
    <p className="text-red-500 text-sm mt-2">{error || internalError}</p>
  )}
</div>

  );
};

LanguageModeSelector.propTypes = {
  languageMode: PropTypes.oneOf([0, 1]).isRequired, // 1 = multi, 0 = single
  onLanguageModeChange: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string,
  onLanguageSelect: PropTypes.func.isRequired,
  languageOptions: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
};

LanguageModeSelector.defaultProps = {
  selectedLanguage: "",
  languageOptions: [],
  loading: false,
  error: "",
  required: true,
};

export default LanguageModeSelector;



