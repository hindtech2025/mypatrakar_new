// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import { ContactSupport } from "../../../api";
// import { useNavigate } from "react-router-dom";
// import { errorHandller } from "../../../utils/DataFetchingComponent";
// import {countryOptions,stateOptions,cityOptions} from './data.js'
// // import Swal from "sweetalert2";
// const RequestCallbackForm = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState([]);
//   const [countryCode, setCountryCode] = useState({
//     value: "+91",
//     label: "+91(India)",
//   });
//   const [state, setState] = useState(null);
//   const [city, setCity] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     mobileNumber: "",
//     email: "",
//     city: "",
//     state: "",
//     message: "",
//     countryCode,
//   });

//   const handleChangeCountryCode = (selectedOption) => {
//     setCountryCode(selectedOption);
//     setFormData({
//       ...formData,
//       countryCode: selectedOption,
//       state: "",
//       city: "",
//     });
//     setState(null);
//     setCity(null); // Reset city when country changes
//   };

//   const handleChangeState = (selectedOption) => {
//     setState(selectedOption);
//     setFormData({ ...formData, state: selectedOption, city: "" });
//     setCity(null); // Reset city when state changes
//   };

//   const handleChangeCity = (selectedOption) => {
//     setCity(selectedOption);
//     setFormData({ ...formData, city: selectedOption });
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleCallRequestInfo(formData);
//   };

//   const handleCallRequestInfo = async (formData) => {
//     try {
//       const res = await ContactSupport(formData);
//       console.log(res);
//       let message = await errorHandller(res);
//       setError(message);
//       setFormData({
//         name: "",
//         mobileNumber: "",
//         email: "",
//         city: "",
//         state: "",
//         message: "",
//         countryCode,
//       });
//       setState(null);
//       setCity(null);
//       // Swal.fire("Success", "Your request has been submitted!", "success");
//     } catch (error) {
//       console.log(error.response.data.errors);

//       setError(error);
//       // Swal.fire("Error", error);
//     }
//   };

//   useEffect(() => {
//     setFormData({ ...formData, countryCode });
//   }, [countryCode]);

//   return (
//     <div className="contact-form p-6 bg-white rounded-lg shadow-md w-full lg:w-2/3">
//       <h2 className="text-2xl font-bold text-gray-700 mb-6">
//         Request a Callback
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div className="flex flex-wrap -mx-2">
//           {/* Name Input */}
//           <div className="w-full sm:w-1/2 px-2 mb-4">
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               placeholder="Enter your name"
//               onChange={handleChange}
//             />
//           </div>
//           {/* Email Input */}
//           <div className="w-full sm:w-1/2 px-2 mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               placeholder="Enter your email"
//             />
//           </div>
//           {/* Mobile Number Input */}
//           <div className="w-full sm:w-1/2 px-2 mb-4">
//             <label className="block text-gray-700">Select Country Code</label>
//             <Select
//               options={countryOptions}
//               value={countryCode}
//               className="w-full"
//               styles={{ control: (base) => ({ ...base, fontSize: "12px" }) }}
//               onChange={handleChangeCountryCode}
//             />
//           </div>

//           {/* Mobile Number Input */}
//           <div className="w-full sm:w-1/2 px-2 mb-4">
//             <label className="block text-gray-700">Mobile Number</label>
//             <input
//               type="tel"
//               name="mobileNumber"
//               value={formData.mobileNumber}
//               onChange={handleChange}
//               required
//               minLength={10}
//               maxLength={13}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               pattern="^[0-9]{10,13}$"
//               placeholder="Enter mobile number"
//             />
//           </div>

//           {/* State Dropdown */}
//           <div className="w-full sm:w-1/2 px-2 mb-4">
//             <label className="block text-gray-700">State</label>
//             <Select
//               options={stateOptions[countryCode.value] || []}
//               value={state}
//               className="w-full"
//               styles={{ control: (base) => ({ ...base, fontSize: "12px" }) }}
//               onChange={handleChangeState}
//               placeholder="Select state"
//               isDisabled={!stateOptions[countryCode.value]}
//             />
//           </div>

//           {/* City Dropdown */}
//           <div className="w-full sm:w-1/2 px-2 mb-4">
//             <label className="block text-gray-700">City</label>
//             <Select
//               options={cityOptions[countryCode.value]?.[state?.value] || []}
//               value={city}
//               className="w-full"
//               styles={{ control: (base) => ({ ...base, fontSize: "12px" }) }}
//               onChange={handleChangeCity}
//               placeholder="Select city"
//               isDisabled={!cityOptions[countryCode.value]?.[state?.value]}
//             />
//           </div>

//           {/* Message Textarea */}
//           <div className="w-full px-2 mb-4">
//             <label className="block text-gray-700">Message</label>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               rows="3"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//               placeholder="Write your message here..."
//             ></textarea>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end mt-6">
//           <button
//             type="submit"
//             className="px-7 w-36 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RequestCallbackForm;

import React, { useState } from "react";
import Select from "react-select";
import { ContactSupport } from "../../../api";
import { errorHandller } from "../../../utils/DataFetchingComponent";
import { countryOptions, stateOptions, cityOptions } from "./data.js";
import Swal from "sweetalert2";

import "react-phone-number-input/style.css";

const RequestCallbackForm = () => {

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    mobileNumber: null,
    state: null,
    city: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState({
    value: "+91",
    label: "+91 (India)",
  });
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    mobileNumber: "",
  });

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phoneNumber) {
      newErrors.mobileNumber = "Phone number is required";
    } else if (!phoneRegex.test(phoneNumber)) {
      newErrors.mobileNumber = "Please enter a valid phone number";
    }

    if (!state) {
      newErrors.state = "State is required";
    }

    if (!city) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangeCountryCode = (selectedOption) => {
    setCountryCode(selectedOption);
    setState(null);
    setCity(null);
    setPhoneNumber("");
  };

  const handleChangeState = (selectedOption) => {
    setState(selectedOption);
    setCity(null);
    setErrors({ ...errors, state: null });
  };

  const handleChangeCity = (selectedOption) => {
    setCity(selectedOption);
    setErrors({ ...errors, city: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handlePhoneChange = (e) => {
    // Remove all non-digit characters and limit to 10 digits
    const numericValue = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(numericValue);

    // Clear any existing errors
    if (errors.mobileNumber) {
      setErrors({ ...errors, mobileNumber: null });
    }

    // Optional: Validate length immediately (10 digits for Indian numbers)
    if (numericValue.length < 10) {
      setErrors({
        ...errors,
        mobileNumber: "Phone number must be 10 digits",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors).find((key) => errors[key]);
      if (firstError) {
        document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        mobileNumber: phoneNumber,
        state: state?.value,
        city: city?.value,
        countryCode: countryCode.value,
      };

      const res = await ContactSupport(payload);

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Your request has been submitted successfully. We'll contact you shortly.",
          icon: "success",
          confirmButtonColor: "#dc2626", // red
          confirmButtonText: "OK",
          customClass: {
            popup: "rounded-lg shadow-xl",
            title: "text-2xl font-bold text-gray-800",
            confirmButton:
              "px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-700",
          },
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
          mobileNumber: "",
        });
        setState(null);
        setCity(null);
        setPhoneNumber("");
        setErrors({});
      } else {
        const message = await errorHandller(res);
        throw new Error(message || "Failed to submit request");
      }
    } catch (error) {
      // console.log(error);
      Swal.fire({
        title: "Error!",
        text:
          error?.response?.data?.errors?.mobileNumber?.[0] ||
          error?.response?.data?.errors?.email?.[0] ||
          error?.response?.data?.errors?.message?.[0] ||
          "Failed to submit request. Please try again.",
        icon: "error",
        confirmButtonColor: "#dc2626", // red
        confirmButtonText: "OK",
        customClass: {
          popup: "rounded-lg shadow-xl",
          title: "text-2xl font-bold text-gray-800",
          confirmButton:
            "px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-700",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form   w-full max-w-2xl mx-auto ">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Request a Callback
        </h2>
        <p className="text-gray-600">
          Fill out the form and we'll get back to you shortly
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name Input */}
          <div className="space-y-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all duration-200 ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder="Enter your full name"
              onChange={handleChange}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all duration-200 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                {errors.email}
              </p>
            )}
          </div>

          {/* Country Code Selector */}
          <div className="space-y-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Country Code <span className="text-red-500">*</span>
            </label>
            <Select
              options={countryOptions}
              value={countryCode}
              className="w-full"
              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: "48px",
                  borderColor: errors.countryCode ? "#ef4444" : "#d1d5db",
                  "&:hover": {
                    borderColor: errors.countryCode ? "#ef4444" : "#9ca3af",
                  },
                  boxShadow: "none",
                  borderRadius: "0.5rem",
                  transition: "all 0.2s",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#4f46e5"
                    : state.isFocused
                      ? "#e0e7ff"
                      : "white",
                  color: state.isSelected ? "white" : "#1f2937",
                }),
              }}
              onChange={handleChangeCountryCode}
              isSearchable
              placeholder="Select country code"
            />
          </div>

          {/* Phone Number Input */}
          <div className="space-y-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div
              className={`border rounded-lg transition-all duration-200 ${
                errors.mobileNumber
                  ? "border-red-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none"
                placeholder="Enter phone number"
                pattern="[0-9]*"
                inputMode="numeric"
              />
            </div>
            {errors.mobileNumber && (
              <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                {errors.mobileNumber}
              </p>
            )}
          </div>

          {/* State Dropdown */}
          <div className="space-y-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <Select
              options={stateOptions[countryCode.value] || []}
              value={state}
              className="w-full"
              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: "48px",
                  borderColor: errors.state ? "#ef4444" : "#d1d5db",
                  "&:hover": {
                    borderColor: errors.state ? "#ef4444" : "#9ca3af",
                  },
                  boxShadow: "none",
                  borderRadius: "0.5rem",
                  transition: "all 0.2s",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#4f46e5"
                    : state.isFocused
                      ? "#e0e7ff"
                      : "white",
                  color: state.isSelected ? "white" : "#1f2937",
                }),
              }}
              onChange={handleChangeState}
              placeholder="Select state"
              isDisabled={!stateOptions[countryCode.value]}
              isSearchable
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                {errors.state}
              </p>
            )}
          </div>

          {/* City Dropdown */}
          <div className="space-y-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <Select
              options={cityOptions[countryCode.value]?.[state?.value] || []}
              value={city}
              className="w-full"
              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: "48px",
                  borderColor: errors.city ? "#ef4444" : "#d1d5db",
                  "&:hover": {
                    borderColor: errors.city ? "#ef4444" : "#9ca3af",
                  },
                  boxShadow: "none",
                  borderRadius: "0.5rem",
                  transition: "all 0.2s",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#4f46e5"
                    : state.isFocused
                      ? "#e0e7ff"
                      : "white",
                  color: state.isSelected ? "white" : "#1f2937",
                }),
              }}
              onChange={handleChangeCity}
              placeholder="Select city"
              isDisabled={!cityOptions[countryCode.value]?.[state?.value]}
              isSearchable
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500 animate-fadeIn">
                {errors.city}
              </p>
            )}
          </div>
        </div>

        {/* Message Textarea */}
        <div className="space-y-1">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all duration-200 hover:border-gray-400"
            placeholder="How can we help you?"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg ${
              isSubmitting ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="font-medium">Submit Request</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestCallbackForm;
