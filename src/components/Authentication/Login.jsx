import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiSmartphone, FiArrowRight } from "react-icons/fi";

// Component Imports
import Description from "./Description";
import SelectCountry from "./SelectCountry";
// import OtpMethodSelector from "./OtpMethodSelector";
import OtpVerificationDialog from "./OtpVerificationDialog";
import { LoginSendOtp } from "../../api";

export default function Login() {
  const { t } = useTranslation();
  // const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState("+91");
  const [otpMethod, setOtpMethod] = useState("");
  const [open, setOpen] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({
    countryCode: "",
    mobileNumber: "",
    otpMethod: "",
  });

  const [loginUserData, setLoginUserData] = useState({
    mobileNumber: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setLoginUserData({ ...loginUserData, mobileNumber: value });
      setError((prev) => ({ ...prev, mobileNumber: "" }));
    }
  };

  const sendOtpForLogin = async () => {
    const phone = loginUserData.mobileNumber.trim();
    const newErrors = {
      mobileNumber: "",
      otpMethod: "",
    };
    try {
      const res = await LoginSendOtp({ mobile: phone });
      // console.log(res)
      if (res?.data?.response) {
        setAuthToken(res.data.response);
        setOpen(true);
      } else {
        setError({
          ...newErrors,
          mobileNumber: "Unexpected response from server",
        });
      }
    } catch (err) {
      const errMsg =
        err?.response?.data?.errors?.mobile?.[0] || "Failed to send OTP";
      setError({ ...newErrors, mobileNumber: errMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUsersAuth = async (e) => {
    e.preventDefault();
    setOpen(false);
    setIsSubmitting(true);

    const phone = loginUserData.mobileNumber.trim();

    const newErrors = {
      mobileNumber: "",
      otpMethod: "",
    };

    let hasError = false;

    if (!phone) {
      newErrors.mobileNumber = "Mobile number is required";
      hasError = true;
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
      hasError = true;
    }

    // if (!otpMethod) {
    //   newErrors.otpMethod = "Please select an OTP method";
    //   hasError = true;
    // }

    if (hasError) {
      setError(newErrors);
      setIsSubmitting(false);
      return;
    }

    sendOtpForLogin();
    // try {
    //   const res = await LoginSendOtp({ mobile: phone });
    //   if (res?.data?.response) {
    //     setAuthToken(res.data.response);
    //     setOpen(true);
    //   } else {
    //     setError({ ...newErrors, mobileNumber: "Unexpected response from server" });
    //   }
    // } catch (err) {
    //   const errMsg =
    //     err?.response?.data?.errors?.mobile?.[0] || "Failed to send OTP";
    //   setError({ ...newErrors, mobileNumber: errMsg });
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

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

  return (
    <>
      <Helmet>
        <title>Sign In | MyPatrakar - Access Your News Portal</title>
        <meta
          name="description"
          content="Sign in to your MyPatrakar account to manage your news portal, publish content, and engage with your audience. Secure and easy login."
        />
        <meta
          name="keywords"
          content="MyPatrakar sign in, news portal login, journalist account, media dashboard access"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl mx-auto">
       
          <motion.div
            className="flex flex-col lg:flex-row gap-0 lg:gap-8 bg-white rounded-3xl overflow-hidden shadow-2xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
        
            {/* Description Panel */}
            <div className="hidden lg:flex lg:w-1/2">
            
              <Description
                guid={[
                  {
                    heading: t("signIn.featureHeading1"),
                    para: t("signIn.featureDesc1"),
                  },
                  {
                    heading: t("signIn.featureHeading2"),
                    para: t("signIn.featureDesc2"),
                  },
                  {
                    heading: t("signIn.featureHeading3"),
                    para: t("signIn.featureDesc3"),
                  },
                ]}
              />
            </div>

            {/* Form Section */}
            <motion.div
              className="w-full lg:w-1/2 p-8 sm:p-10"
              variants={containerVariants}
            >
              <div className="max-w-md mx-auto">
                <motion.div
                  variants={itemVariants}
                  className="text-center mb-8"
                >
                  <h1 className="text-3xl font-bold text-gray-800">
                    Welcome Back
                  </h1>
                  <p className="mt-2 text-gray-500">
                    Sign in to access your MyPatrakar dashboard
                  </p>
                </motion.div>

                <form onSubmit={handleUsersAuth} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <SelectCountry setCountryCode={setCountryCode} />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1">
                    <label
                      htmlFor="mobileNumber"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSmartphone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={loginUserData.mobileNumber}
                        onChange={handleChange}
                        placeholder="Enter 10-digit mobile number"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        maxLength={10}
                      />
                    </div>
                    {error.mobileNumber && (
                      <p className="text-sm text-red-500 mt-1">
                        {error.mobileNumber}
                      </p>
                    )}
                  </motion.div>

                  {/* <motion.div variants={itemVariants} className="space-y-1">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Verification Method
                    </p>
                    <OtpMethodSelector
                      otpMethod={otpMethod}
                      setOtpMethod={setOtpMethod}
                      error={error}
                      setError={setError}
                    />
                    {error.otpMethod && (
                      <p className="text-sm text-red-500 mt-1">
                        {error.otpMethod}
                      </p>
                    )}
                  </motion.div> */}

                  <motion.div variants={itemVariants}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center py-3 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-md hover:from-red-700 hover:to-red-800 transition-all duration-300 ${
                        isSubmitting ? "opacity-90" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          Continue <FiArrowRight className="ml-2" />
                        </>
                      )}
                    </button>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="text-center text-sm text-gray-600 pt-4 border-t border-gray-100"
                  >
                    <p className="mb-3">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-red-600 font-medium hover:text-red-700 transition-colors"
                      >
                        Create account
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
                </form>

                {/* OTP Dialog */}
                {open && (
                  <OtpVerificationDialog
                    open={open}
                    sendOtpForLogin={sendOtpForLogin}
                    otpMethod={otpMethod}
                    countryCode={countryCode}
                    setOpen={setOpen}
                    authToken={authToken}
                    mobile={loginUserData.mobileNumber}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
