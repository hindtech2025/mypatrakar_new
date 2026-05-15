import React, { useCallback, useContext, useEffect, useState } from "react";

import Select from "react-select";
// i18n और t का उपयोग अब LanguageModeSelector में होगा
import i18n from "../../../i18n";
import LogoUpload from "./LogoUpload";
import { getCitiesByState, statesOfIndia } from "./data/data";
import { getCitiesBySates, getSates } from "../../../api";
import useRecommendedLanguage from "../../../hooks/useRecommendedLanguage";
import { PreViewContext } from "../../../context/PreViewContext";
import LanguageModeSelector from "./LanguageModeSelector";
import { memo } from "react"; // React.memo के लिए

// =========================================================================
// 1. प्रेजेंटेशनल कंपोनेंट्स को मेमोइज़ करें (Memomized Presentational Components)
// =========================================================================

// InputField को React.memo से रैप करें
const InputField = memo(
  ({
    label,
    name,
    placeholder,
    value,
    onChange,
    type = "text",
    required = false,
    error,
  }) => (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        id={name}
        name={name}
        className={`w-full px-3 py-2 border rounded-md shadow-sm ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  ),
);
InputField.displayName = "InputField"; // Debugging के लिए

// SelectSearchField को React.memo से रैप करें
const SelectSearchField = memo(
  ({
    label,
    name,
    value,
    onChange,
    options,
    required = false,
    error,
    loading = false,
    disabled = false,
  }) => {
    const selectOptions = Array.isArray(options)
      ? options.map((opt) => ({
          value: opt.name || opt.language,
          label: opt.name || opt.language,
        }))
      : [];

    const selectedValue =
      selectOptions.find((opt) => opt.value === value) || null;

    return (
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        <Select
          id={name}
          name={name}
          className={`w-full ${error ? "border-red-500" : ""}`}
          value={selectedValue}
          onChange={onChange}
          options={selectOptions}
          isDisabled={disabled || loading}
          isLoading={loading}
          placeholder={loading ? "Loading..." : `Select ${label}`}
          isSearchable
        />

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  },
);
SelectSearchField.displayName = "SelectSearchField"; // Debugging के लिए

// =========================================================================
// 2. मुख्य कंपोनेंट (Main Component)
// =========================================================================

const BasicDetails = ({
  setUserRequest,
  setEmpty,
  submitForm,
  setSubmitForm,
}) => {
  const [file, setFile] = useState({
    app_logo: null,
    web_logo: null,
    owner_profile_pic: null,
  });

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const { appPreview, updateAppPreview } = useContext(PreViewContext);
  const { data: languageOptions, loading: languagesLoading } =
    useRecommendedLanguage();

  const [languageMode, setLanguageMode] = useState(0);

  const [basicDetails, setBasicDetails] = useState({
    agency_name: "",
    reg_number: "",
    owner_add: "",
    owner_name: "",
    owner_mobile: "",
    owner_email: "",
    owner_city: "",
    owner_state: "",
    language: {
      language_mode: 0,
      language: "",
    },
  });

  const [errors, setErrors] = useState({});

  const validateField = useCallback((name, value, currentLanguageMode) => {
    // Handle language validation
    if (name === "language") {
      if (currentLanguageMode === 1 && !value.language) {
        return "Please select a language for single language mode";
      }
      return "";
    }

    // File validation uses the 'file' state, which is outside basicDetails.
    // We check file state inside validateAllFields for simplicity and correctness.
    if (name === "agency_name" && typeof value === "string" && !value.trim())
      return "News Agency Name is required";

    if (name === "reg_number" && typeof value === "string" && !value.trim())
      return "Registration Number is required";

    if (name === "owner_name" && typeof value === "string" && !value.trim())
      return "Owner Name is required";

    if (name === "owner_add" && typeof value === "string" && !value.trim())
      return "Address is required";

    if (name === "owner_state" && !value) return "State is required";

    if (name === "owner_city" && !value) return "City is required";

    if (name === "owner_mobile") {
      const cleaned = (value || "").replace(/\D/g, "");
      if (!/^\d{10}$/.test(cleaned))
        return "Mobile number must be exactly 10 digits";
    }

    if (name === "owner_email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !emailRegex.test(value)) return "Invalid email format";
    }

    return "";
  }, []); // dependencies: none, क्योंकि यह केवल input values पर निर्भर करता है।

  // validateAllFields को useCallback से रैप करें
  const validateAllFields = useCallback(() => {
    const newErrors = {};
    const { language, ...fieldsToCheck } = basicDetails;

    // Check basic text/select fields
    Object.entries(fieldsToCheck).forEach(([key, value]) => {
      const error = validateField(key, value, languageMode);
      if (error) newErrors[key] = error;
    });

    // Check files separately
    if (!file.app_logo?.preview) newErrors.app_logo = "App logo is required";
    if (!file.web_logo?.preview) newErrors.web_logo = "Web logo is required";
    if (!file.owner_profile_pic?.preview)
      newErrors.owner_profile_pic = "Owner profile picture is required";

    // Check language mode
    const langError = validateField("language", language, languageMode);
    if (langError) newErrors.language = langError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [basicDetails, file, languageMode, validateField]);

  // -----------------------------------------------------------------------

  // -----------------------------------------------------------------------

  const handleChange = useCallback(
    (e) => {
      setEmpty(false);
      const { name, value } = e.target;

      setBasicDetails((prev) => ({
        ...prev,
        [name]: value,
        ...(name === "owner_state" && { owner_city: "" }),
      }));

      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value, languageMode),
      }));
    },
    [setEmpty, validateField, languageMode],
  );

  // handleSelectChange useCallback से रैप करें
  const handleSelectChange = useCallback(
    (name, selectedOption) => {
      setEmpty(false);
      const value = selectedOption.value;

      setBasicDetails((prev) => ({
        ...prev,
        [name]: value,
        // ...(name === "owner_state" && { owner_city: "" }),
      }));

      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value, languageMode),
      }));
    },
    [setEmpty, validateField, languageMode],
  );

  // handleLogoUpload with useCallback
  const handleLogoUpload = useCallback((type, fileData) => {
    setFile((prev) => ({ ...prev, [type]: fileData }));

    setErrors((prev) => ({
      ...prev,
      [type]: "",
    }));
  }, []);

  // Handle language mode change
  const handleLanguageModeChange = useCallback((mode) => {
    setLanguageMode(mode);
    setBasicDetails((prev) => ({
      ...prev,
      language: {
        language_mode: mode,
        language: mode === 0 ? "" : prev.language.language,
      },
    }));

    // Clear language error
    setErrors((prev) => ({ ...prev, language: "" }));
  }, []);

  // Handle language selection
  const handleLanguageSelect = useCallback(
    (language) => {
      setBasicDetails((prev) => ({
        ...prev,
        language: {
          ...prev.language,
          language: language,
        },
      }));

      // Update app preview if in single language mode
      if (languageMode === 1) {
        updateAppPreview((prev) => ({ ...prev, language }));
      }
    },
    [languageMode, updateAppPreview],
  );

  // -----------------------------------------------------------------------
  // useEffect (useEffect Hooks)
  // -----------------------------------------------------------------------

  // [Effect 1] Change i18n language when language changes
  useEffect(() => {
    if (languageMode === 1 && basicDetails.language.language) {
      const langMap = {
        English: "en",
        Hindi: "hi",
        Gujarati: "gu",
        Marathi: "mr",
        Bengali: "bn",
        Tamil: "ta",
        Telugu: "te",
        Kannada: "kn",
      };

      const langCode = langMap[basicDetails.language.language] || "hi";
      i18n.changeLanguage(langCode);
    }
  }, [basicDetails.language.language, languageMode]);

  // [Effect 2] Load states on mount (fetch API)
  useEffect(() => {
    const loadStates = async () => {
      try {
        setLoadingStates(true);
        const res = await getSates();
        setStates(res.data?.data || statesOfIndia || []);
      } catch (error) {
        console.error("Error loading states:", error);
        setStates(statesOfIndia || []);
      } finally {
        setLoadingStates(false);
      }
    };

    loadStates();
  }, []);

  // [Effect 3] Load cities when state changes (fetch API)
  useEffect(() => {
    const loadCities = async () => {
      if (!basicDetails.owner_state) {
        setCities([]);
        return;
      }

      try {
        setLoadingCities(true);
        const res = await getCitiesBySates(basicDetails.owner_state);
        setCities(
          res.data?.data || getCitiesByState(basicDetails.owner_state) || [],
        );
      } catch (error) {
        // console.error("Error loading cities:", error);
        setCities(getCitiesByState(basicDetails.owner_state) || []);
      } finally {
        setLoadingCities(false);
      }
    };

    loadCities();
  }, [basicDetails.owner_state]);

  // [Effect 4] Update userRequest (Parent Component State Update)

  useEffect(() => {
    setUserRequest((prev) => ({
      ...prev,
      basicDetails: {
        ...basicDetails,
        app_logo: file.app_logo,
        web_logo: file.web_logo,
        owner_profile_pic: file.owner_profile_pic,
      },
    }));
  }, [basicDetails, file, setUserRequest]);

  // [Effect 5] Re-validate on submit (from Parent Component)
  useEffect(() => {
    if (submitForm) {
      // validateAllFields
      validateAllFields();
      setSubmitForm(false);
    }
  }, [submitForm, setSubmitForm, validateAllFields]);

  return (
    <div className="max-w-7xl mx-auto font-sans p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 my-6 md:my-12 transition-all duration-300 hover:shadow-xl">
      <section>
        <div className="flex flex-col gap-1 pb-6 mb-3 border-b border-[#E0E0E0] border700 ">
          <h2 className="text-[#111418] font-sans text-2xl font-black">
            Basic Details
          </h2>

          <p>
            Add official details of your news agency, including logos, owner
            information, registration number, and location.
          </p>
        </div>

        {/* Logo Upload */}
        <div className="mb-6">
          <LogoUpload
            // LogoUpload with  React.memo to manage file state

            setFile={setFile}
            file={file}
            onUploadComplete={handleLogoUpload}
          />
        </div>

        {/* Form Fields */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <InputField
            label="News Agency Name"
            name="agency_name"
            placeholder="e.g India News Network"
            value={basicDetails.agency_name}
            onChange={handleChange}
            required
            error={errors.agency_name || errors.app_logo} // app_logo error
          />

          <InputField
            label="Registration Number"
            name="reg_number"
            placeholder="Enter Your Registration Number"
            value={basicDetails.reg_number}
            onChange={handleChange}
            required
            error={errors.reg_number || errors.web_logo} // web_logo error
          />
        </section>

        {/* Language Mode Selector Component */}
        <LanguageModeSelector
          languageMode={languageMode}
          onLanguageModeChange={handleLanguageModeChange}
          selectedLanguage={basicDetails.language.language}
          onLanguageSelect={handleLanguageSelect}
          languageOptions={languageOptions?.response || []}
          loading={languagesLoading}
          error={errors.language}
          required
        />

        {/* Owner Info */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <InputField
            label="Owner Name"
            name="owner_name"
            placeholder="e.g. Tej Pratap Singh"
            value={basicDetails.owner_name}
            onChange={handleChange}
            required
            error={errors.owner_name || errors.owner_profile_pic} // owner_profile_pic error
          />

          <InputField
            label="Owner Mobile Number"
            name="owner_mobile"
            placeholder="e.g. 0987654321"
            value={basicDetails.owner_mobile}
            onChange={(e) => {
              if (/^\d{0,10}$/.test(e.target.value)) handleChange(e);
            }}
            type="tel"
            required
            error={errors.owner_mobile}
          />

          <InputField
            label="Owner Email ID"
            name="owner_email"
            placeholder="e.g.tejpratap12@example.com"
            value={basicDetails.owner_email}
            onChange={handleChange}
            type="email"
            required
            error={errors.owner_email}
          />
        </section>

        {/* Address */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <SelectSearchField
            label="State"
            name="owner_state"
            value={basicDetails.owner_state}
            onChange={(selected) => handleSelectChange("owner_state", selected)}
            options={states}
            loading={loadingStates}
            required
            error={errors.owner_state}
          />

          <SelectSearchField
            label="City"
            name="owner_city"
            value={basicDetails.owner_city}
            onChange={(selected) => handleSelectChange("owner_city", selected)}
            options={cities}
            loading={loadingCities}
            disabled={!basicDetails.owner_state || loadingCities}
            required
            error={errors.owner_city}
          />

          <InputField
            label="Address"
            name="owner_add"
            placeholder="Enter full address"
            value={basicDetails.owner_add}
            onChange={handleChange}
            required
            error={errors.owner_add}
          />
        </section>
      </section>
    </div>
  );
};

// 3. BasicDetails with React.memo
export default memo(BasicDetails);
