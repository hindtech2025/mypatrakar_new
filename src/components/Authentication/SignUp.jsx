import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiAlertCircle } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Description from "./Description";
import SelectCountry from "./SelectCountry";
import OtpVerificationDialog from "./OtpVerificationDialog";
import { SignupSendOtp } from "../../api";
import { PaymentContext } from "../../context/PaymentContext";

export default function SignUp() {
  const { t } = useTranslation();
  const { email } = useContext(PaymentContext);

  const guid = [
    { heading: t("signIn.featureHeading1"), para: t("signIn.featureDesc1") },
    { heading: t("signIn.featureHeading2"), para: t("signIn.featureDesc2") },
    { heading: t("signIn.featureHeading4"), para: t("signIn.featureDesc4") },
    { heading: t("signIn.featureHeading3"), para: t("signIn.featureDesc3") },
  ];

  const [open, setOpen] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [otpMethod, setOtpMethod] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [signUpUserData, setSignUpUserData] = useState({
    name: "",
    email: email || "",
    mobileNumber: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    otpMethod: "",
    general: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }));

    switch (name) {
      case "name":
        if (/^[a-zA-Z\s.'-]*$/.test(value)) {
          setSignUpUserData((prev) => ({ ...prev, name: value }));
        }
        break;
      case "email":
        setSignUpUserData((prev) => ({ ...prev, email: value }));
        break;
      case "mobileNumber":
        if (/^\d{0,10}$/.test(value)) {
          setSignUpUserData((prev) => ({ ...prev, mobileNumber: value }));
        }
        break;
      default:
        break;
    }
  };

  const sendOtpForSiup = async () => {
    try {
      const res = await SignupSendOtp({
        mobile: signUpUserData.mobileNumber,
        email: signUpUserData.email,
      });
      setAuthToken(res.data.response);
      setOpen(true);
    } catch (error) {
      const apiErrors = error.response?.data?.errors || {};
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during signup. Please try again.";
      setErrors({
        name: apiErrors.name?.[0] || "",
        email: apiErrors.email?.[0] || "",
        mobileNumber: apiErrors.mobile?.[0] || "",
        general: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUserData = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {
      name: "",
      email: "",
      mobileNumber: "",
      otpMethod: "",
      general: "",
    };

    let hasError = false;

    // Name validation
    if (!signUpUserData.name.trim()) {
      newErrors.name = "Name is required";
      hasError = true;
    } else if (!/^[a-zA-Z\s.'-]+$/.test(signUpUserData.name.trim())) {
      newErrors.name = "Name can only contain letters and basic punctuation";
      hasError = true;
    }

    // Email validation
    if (!signUpUserData.email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!emailRegex.test(signUpUserData.email.trim())) {
      newErrors.email = "Invalid email format";
      hasError = true;
    }

    // Mobile validation
    if (!signUpUserData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
      hasError = true;
    } else if (!/^\d{10}$/.test(signUpUserData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
      hasError = true;
    }

    // OTP method validation
    // if (!otpMethod) {
    //   newErrors.otpMethod = "Please select an OTP method";
    //   hasError = true;
    // }

    if (hasError) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    sendOtpForSiup();

    // try {
    //   const res = await SignupSendOtp({
    //     mobile: signUpUserData.mobileNumber,
    //     email: signUpUserData.email,
    //   });
    //   setAuthToken(res.data.response);
    //   setOpen(true);
    // } catch (error) {
    //   const apiErrors = error.response?.data?.errors || {};
    //   const errorMessage =
    //     error.response?.data?.message ||
    //     "An error occurred during signup. Please try again.";
    //   setErrors({
    //     name: apiErrors.name?.[0] || "",
    //     email: apiErrors.email?.[0] || "",
    //     mobileNumber: apiErrors.mobile?.[0] || "",
    //     general: errorMessage,
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | MyPatrakar - Create Your News Portal Account</title>
        <meta
          name="description"
          content="Sign up for MyPatrakar and launch your own news portal. Get access to powerful tools for managing and publishing news effortlessly."
        />
        <meta
          name="keywords"
          content="MyPatrakar sign up, create news portal account, journalist registration, media platform signup, news website access"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100  flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        {/* <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8"> */}

        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            // className="max-w-7xl mx-auto"
            className="flex flex-col lg:flex-row gap-0 lg:gap-8 bg-white rounded-3xl overflow-hidden shadow-2xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 bg-white rounded-3xl overflow-hidden shadow-2xl"> */}
            {/* Description Section */}
            {/* <motion.div
                className="hidden lg:flex lg:w-1/2"
                variants={itemVariants}
              > */}
            <div className="hidden lg:flex lg:w-1/2">
              <Description guid={guid} />
            </div>
            {/* </motion.div> */}

            {/* Form Section */}
            <motion.div
              className="w-full lg:w-1/2 flex justify-center py-8 sm:py-10"
              variants={itemVariants}
            >
              <div className="w-full max-w-md p-4">
                <motion.form
                  onSubmit={handleUserData}
                  className="space-y-5"
                  variants={containerVariants}
                >
                  {/* Header */}
                  <motion.div variants={itemVariants} className="text-center">
                    <h1 className="text-3xl font-bold text-red-600">
                      Create Account
                    </h1>
                    <p className="text-gray-500 mt-2">
                      Join MyPatrakar in just 2 minutes
                    </p>
                  </motion.div>

                  {/* Name Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative flex items-center justify-center">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Tej Singh"
                        value={signUpUserData.name}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                          errors.name
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-red-500"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </motion.div>

                  {/* Email Field */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="tejsingh@example.com"
                        value={signUpUserData.email}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-red-500"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </motion.div>

                  {/* Mobile Field */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Country Code Selector */}
                      <div className="w-full sm:w-auto">
                        <SelectCountry
                          setCountryCode={setCountryCode}
                          className="h-full w-full"
                        />
                      </div>

                      {/* Mobile Number Input */}
                      <div className="relative flex items-start justify-center">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none mb-3">
                          <FiPhone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="mobileNumber"
                          placeholder="Enter 10-digit mobile number"
                          value={signUpUserData.mobileNumber}
                          onChange={handleChange}
                          maxLength={10}
                          className={`w-full pl-10 pr-3 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all ${
                            errors.mobileNumber
                              ? "border-red-500 focus:ring-red-500 bg-red-50"
                              : "border-gray-300 focus:border-red-400 focus:ring-red-200 hover:border-gray-400"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {errors.mobileNumber && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 flex items-start gap-1"
                      >
                        <FiAlertCircle className="flex-shrink-0 mt-0.5" />
                        {errors.mobileNumber}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* OTP Method */}
                  {/* <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Method
                    </label>
                    <OtpMethodSelector
                      otpMethod={otpMethod}
                      setOtpMethod={setOtpMethod}
                      error={errors.otpMethod}
                    />
                    {errors.otpMethod && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.otpMethod}
                      </p>
                    )}
                  </motion.div> */}

                  {/* General Error */}
                  {errors.general && (
                    <motion.div
                      variants={itemVariants}
                      className="p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <p className="text-red-600 text-sm">{errors.general}</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.div variants={itemVariants}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-md transition-all ${
                        isSubmitting
                          ? "opacity-80 cursor-not-allowed"
                          : "hover:from-red-700 hover:to-red-800"
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
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
                        </div>
                      ) : (
                        "CONTINUE"
                      )}
                    </button>
                  </motion.div>

                  {/* Footer Links */}
                  <motion.div
                    variants={itemVariants}
                    className="text-center text-sm text-gray-600 pt-4 border-t border-gray-100"
                  >
                    <p className="mb-3">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-red-600 font-medium hover:text-red-700 transition-colors"
                      >
                        Sign In
                      </Link>
                    </p>
                    <p className="text-xs text-gray-400">
                      By continuing, you agree to our{" "}
                      <Link
                        to="/privacy-policy"
                        className="text-red-500 hover:underline"
                        target="_blank"
                      >
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/terms-and-conditions"
                        className="text-red-500 hover:underline"
                        target="_blank"
                      >
                        Terms & Conditions
                      </Link>
                    </p>
                  </motion.div>
                </motion.form>
              </div>
            </motion.div>
            {/* </div> */}
          </motion.div>
        </div>
        {/* OTP Dialog */}
        {open && !errors.general && (
          <OtpVerificationDialog
            open={open}
            sendOtpForSiup={sendOtpForSiup}
            otpMethod={otpMethod}
            countryCode={countryCode}
            setOpen={setOpen}
            authToken={authToken}
            setAuthToken={setAuthToken}
            setIsSubmitting={setIsSubmitting}
            name={signUpUserData.name}
            email={signUpUserData.email}
            mobile={signUpUserData.mobileNumber}
          />
        )}
      </div>
    </>
  );
}
