
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaGlobe, FaUser } from "react-icons/fa";
import Select from "react-select"; // सर्च फीचर के लिए
import { getCitiesBySates, getSates } from "../../../api";

// Custom styles for React Select (ताकि आपके डिजाइन से मैच करे)
const customSelectStyles = (hasError) => ({
  control: (base) => ({
    ...base,
    padding: "2px",
    backgroundColor: "#F9FAFB",
    borderColor: hasError ? "#EF4444" : "#E5E7EB",
    borderRadius: "0.5rem",
    fontWeight: "bold",
    fontSize: "0.875rem",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#EF4444",
    },
  }),
});

const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  isSelect = false,
  isSearchable = false, // नया प्रॉप
  options = [],
  error,
  loading = false,
  disabled = false,
  ...rest
}) => (
  <div className="space-y-1.5">
    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
      {label}
    </label>

    {isSearchable ? (
      <Select
        name={name}
        options={options.map((opt) => ({
          value: opt.value || opt.name,
          label: opt.opt || opt.name,
        }))}
        value={
          options
            .map((opt) => ({
              value: opt.value || opt.name,
              label: opt.opt || opt.name,
            }))
            .find((o) => o.value === value) || null
        }
        onChange={(selected) =>
          onChange({ target: { name, value: selected ? selected.value : "" } })
        }
        isDisabled={disabled || loading}
        isLoading={loading}
        placeholder={`Select ${label}...`}
        styles={customSelectStyles(!!error)}
        isClearable
      />
    ) : isSelect ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled || loading}
        className={`w-full p-3 bg-[#F9FAFB] text-black font-bold border ${
          error ? "border-red-500" : "border-gray-200"
        } rounded-lg text-sm focus:ring-2 focus:ring-red-500/20 outline-none transition-all disabled:opacity-50`}
      >
        <option value="">{loading ? "Loading..." : `Select ${label}`}</option>
        {options.map((o, index) => (
          <option key={index} value={o.value || o.name}>
            {o.opt || o.name}
          </option>
        ))}
      </select>
    ) : (
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        {...rest}
        className={`w-full p-3 text-black font-bold bg-[#F9FAFB] border ${
          error ? "border-red-500" : "border-gray-200"
        } rounded-lg text-sm focus:ring-2 focus:ring-red-500/20 outline-none transition-all`}
      />
    )}
    {error && (
      <p className="text-[10px] text-red-500 font-medium italic">*{error}</p>
    )}
  </div>
);

export function RegistrationForm({ formData, onChange, onSubmit, loading }) {
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Countries List
  const countries = [
    { name: "India", value: "India" },
    { name: "United States", value: "United States" },
    { name: "United Kingdom", value: "United Kingdom" },
    { name: "Canada", value: "Canada" },
    { name: "Australia", value: "Australia" },
    { name: "United Arab Emirates", value: "UAE" },
  ];

  // 1. Load States when Country changes
  useEffect(() => {
    const loadStates = async () => {
      if (!formData.country) {
        setStates([]);
        return;
      }
      // Note: यहाँ API से स्टेट्स तभी आएँगे अगर country India है, वरना दूसरी API लगेगी।
      try {
        setLoadingStates(true);
        const res = await getSates();
        setStates(res.data?.data || []);
      } catch (error) {
        // console.error("Error loading states:", error);
      } finally {
        setLoadingStates(false);
      }
    };
    loadStates();
  }, [formData.country]);

  // 2. Load Cities when State changes
  useEffect(() => {
    const loadCities = async () => {
      if (!formData.state) {
        setCities([]);
        return;
      }
      try {
        setLoadingCities(true);
        const res = await getCitiesBySates(formData.state);
        setCities(res.data?.data || []);
      } catch (error) {
        // console.error("Error loading cities:", error);
      } finally {
        setLoadingCities(false);
      }
    };
    loadCities();
  }, [formData.state]);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid Email is required";
    if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "10-digit number required";
    if (!formData.mediaHouse) newErrors.mediaHouse = "Media House is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit();
  };
  // console.log(formData);
  return (
    <div className="max-w-[850px] mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-[#1A2B4C] text-center py-6">
        <h3 className="text-white font-black uppercase tracking-[0.2em] text-xl">
          Portal Registration
        </h3>
      </div>

      <div className="p-8 md:p-12 space-y-10">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-red-500">
            <FaUser className="text-xs" />
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              Owner & Media Credentials
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <Input
              label="Full Name"
              placeholder={"Rajesh"}
              name="fullName"
              value={formData.fullName}
              onChange={onChange}
              error={errors.fullName}
            />
            <Input
              label="Email Address"
              placeholder={"rajesh@gmail.com"}
              name="email"
              value={formData.email}
              onChange={onChange}
              error={errors.email}
            />
            <Input
              label="Phone Number"
              name="phone"
              placeholder={"1234567890"}
              value={formData.phone}
              onChange={onChange}
              error={errors.phone}
            />
            <Input
              label="Media House Name"
              name="mediaHouse"
              placeholder={"Republic News India"}
              value={formData.mediaHouse}
              onChange={onChange}
              error={errors.mediaHouse}
            />
            <Input
              label="Registration Type"
              name="regType"
              isSelect
              options={[
                {
                  opt: "MIB (Ministry of Information and Broadcasting)",
                  value: "0",
                },
                { opt: "RNI (Registrar of Newspapers for India)", value: "1" },
                { opt: "PIB (Press Information Bureau)", value: "2" },
              ]}
              value={formData.regType}
              onChange={onChange}
            />
            <Input
              label="Registration ID"
              name="regId"
              placeholder={"Enter your Registration ID"}
              value={formData.regId}
              onChange={onChange}
              error={errors.regId}
            />
          </div>
        </div>

        <div className="space-y-6 border-t border-gray-100 pt-10">
          <div className="flex items-center gap-2 text-red-500">
            <FaGlobe className="text-xs" />
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              Operations Base
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Country"
              name="country"
              isSearchable
              options={countries}
              value={formData.country}
              onChange={(e) => {
                onChange(e);
                onChange({ target: { name: "state", value: "" } });
                onChange({ target: { name: "city", value: "" } });
              }}
              error={errors.country}
            />
            <Input
              label="State"
              name="state"
              isSearchable
              options={states}
              loading={loadingStates}
              value={formData.state}
              onChange={(e) => {
                onChange(e);
                onChange({ target: { name: "city", value: "" } });
              }}
              error={errors.state}
              disabled={!formData.country}
            />
            <Input
              label="City"
              name="city"
              isSearchable
              options={cities}
              loading={loadingCities}
              value={formData.city}
              onChange={onChange}
              error={errors.city}
              disabled={!formData.state}
            />
          </div>
        </div>

        <button
          onClick={handleProceed}
          disabled={loading}
          className="w-full bg-[#FF1E1E] text-white font-black py-4 rounded-xl uppercase tracking-widest text-[12px] flex items-center justify-center gap-2 hover:bg-red-700 transition-all"
        >
          {loading ? "Processing..." : "Proceed to Verification"}{" "}
          <span>
            {" "}
            <FaArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
}
