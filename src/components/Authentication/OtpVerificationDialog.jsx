import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { FiLock, FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "../../context/AuthContext";
import { VerifyLoginOtp, VerifySignUpOtp } from "../../api";

export default function OtpVerificationDialog({
  open,
  setOpen,
  authToken,
  setAuthToken, // ✅ ADD THIS
  countryCode,
  sendOtpForSiup,
  sendOtpForLogin,
  name,
  email,
  mobile,
  otpMethod,
}) {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const location = useLocation();
  const inputRef = useRef(null);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [activeInput, setActiveInput] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const MAX_RESEND = 3;

  const from =
    location.state?.from?.pathname === "/" ||
    location.state?.from?.pathname === "/home"
      ? "/portal"
      : location.state?.from?.pathname || "/portal";

  // useEffect(() => {
  //   if (open) {
  //     inputRef.current?.focus();
  //     startResendTimer();
  //   } else {
  //     setOtp("");
  //     setError("");
  //     setActiveInput(0);
  //   }
  // }, [open]);

  // const startResendTimer = useCallback(() => {
  //   setResendTimer(60);
  //   const timer = setInterval(() => {
  //     setResendTimer((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(timer);
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);
  // }, []);
  const timerRef = useRef(null);

  const startResendTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setResendTimer(60);

    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      setActiveInput(value.length);
      if (error) setError("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && otp.length > 0) {
      setActiveInput(otp.length - 1);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (open) {
      // setOtp("123456"); // ✅ Default OTP
      setResendCount(0);
      setActiveInput(6); // ✅ Show filled boxes
      setError("");
      inputRef.current?.focus();
      startResendTimer();
    } else {
      setOtp("");
      setError("");
      setActiveInput(0);
      setResendCount(0);
    }
  }, [open]);

  const validateOtp = () => {
    if (otp.length !== 6 || isNaN(otp)) {
      setError("Please Enter a valid 6-digit OTP.");
      return false;
    }
    return true;
  };

  const handleResendOtp = async () => {
    if (resendCount >= MAX_RESEND) {
      setError("You have reached the maximum OTP resend limit.");
      return;
    }
    try {
      setLoading(true);
      setError("");

      if (location.pathname === "/login" && sendOtpForLogin) {
        sendOtpForLogin();
      }

      if (location.pathname !== "/login" && sendOtpForSiup) {
        await sendOtpForSiup();
      }
      setResendCount((prev) => prev + 1);
      // ✅ If backend sends new auth token
      // if (res?.data?.response) {
      //   setAuthToken(res.data.response);
      // }

      // ✅ Reset OTP UI
      setOtp("");
      setActiveInput(0);
      inputRef.current?.focus();

      // ✅ Restart timer
      startResendTimer();
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    if (!validateOtp()) {
      // keep dialog open
      return;
    }
    setLoading(true);
    setError("");

    try {
      let response;
      if (location.pathname === "/login") {
        response = await VerifyLoginOtp({
          mobile,
          otp,
          auth_token: authToken,
        });
      } else {
        response = await VerifySignUpOtp({
          name,
          email,
          mobile,
          countryCode,
          otp,
          auth_token: authToken,
        });
      }

      if (!response || !response.data || !response.data.response) {
        setError("Please Enter valid otp");
        return; // early exit, do not proceed
      }

      const { login_token, customer_id } = response.data.response;
      login(customer_id, login_token, null, email, name, null);

      // success: close and navigate
      handleClose();
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.errors?.otp?.[0] ||
          "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={(e, reason) => {
        // prevent closing via backdrop click or escape
        if (reason === "backdropClick" || reason === "escapeKeyDown") return;
        handleClose();
      }}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        className: "rounded-2xl max-w-md border border-gray-100 shadow-xl",
      }}
    >
      <div className="p-6 bg-gradient-to-b from-white to-gray-50">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-full mb-4 shadow-inner ${
              error ? "bg-red-100" : "bg-gray-100"
            }`}
          >
            <FiLock
              className={`text-3xl ${error ? "text-red-600" : "text-gray-600"}`}
            />
          </motion.div>
          <DialogTitle className="text-center text-2xl font-bold text-gray-800 p-0">
            {error ? "Verification Failed" : "Verify Your Identity"}
          </DialogTitle>
          <p className="text-gray-500 text-sm mt-3 text-center max-w-xs">
            Enter the 6-digit code sent to your{" "}
            {otpMethod === "WhatsApp" ? "WhatsApp" : "phone"}
            <span className="font-semibold text-gray-700">
              {" "}
              {countryCode} {mobile}
            </span>
          </p>
        </motion.div>
        {/* <p>123456</p> */}
        {/* OTP Input Section */}
        <DialogContent className="px-6 pb-6">
          <div className="flex justify-center space-x-3 mb-8 relative">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-14 h-20 border-2 rounded-xl flex items-center justify-center text-2xl font-bold ${
                  error
                    ? "border-red-300 bg-red-50"
                    : i === activeInput
                    ? "border-red-500 shadow-md"
                    : otp[i]
                    ? "border-gray-300 bg-white shadow-sm"
                    : "border-gray-200 bg-gray-50"
                } transition-all duration-200`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  inputRef.current?.focus();
                  setActiveInput(Math.min(i, otp.length));
                }}
              >
                <AnimatePresence mode="wait">
                  {otp[i] && (
                    <motion.span
                      key={otp[i]}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className={error ? "text-red-600" : "text-gray-800"}
                    >
                      {otp[i]}
                    </motion.span>
                  )}
                </AnimatePresence>
                {i === activeInput && !error && (
                  <motion.div
                    className="absolute bottom-2 w-2 h-2 bg-red-500 rounded-full"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
              </motion.div>
            ))}
            <input
              ref={inputRef}
              type="tel"
              value={otp}
              onChange={handleOtpChange}
              onKeyDown={handleKeyDown}
              maxLength={6}
              autoFocus
              className="absolute opacity-0 w-full h-0"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4 flex items-start gap-2"
              >
                <FiAlertCircle className="flex-shrink-0 mt-0.5 text-red-500" />
                <div>
                  <p className="font-medium">Verification failed</p>
                  <p>{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center">
            <button
              type="button"
              className={`text-sm font-medium flex items-center justify-center mx-auto gap-1 ${
                resendTimer > 0
                  ? "text-gray-400"
                  : "text-red-600 hover:text-red-700"
              } transition-colors`}
              onClick={handleResendOtp}
              disabled={resendTimer > 0 || resendCount >= MAX_RESEND}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {resendTimer > 0
                ? `Resend code in ${resendTimer}s`
                : resendCount >= MAX_RESEND
                ? "Resend limit reached"
                : "Resend verification code"}
            </button>
          </div>
        </DialogContent>

        <DialogActions className="px-6 pb-4">
          <motion.button
            onClick={handleClose}
            whileHover={{ backgroundColor: "#f3f4f6" }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 text-gray-600 font-medium rounded-lg flex items-center gap-2 transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            Back
          </motion.button>
          <motion.button
            onClick={handleFormSubmit}
            disabled={loading || otp.length !== 6}
            whileHover={
              otp.length === 6 && !loading
                ? {
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                  }
                : {}
            }
            whileTap={otp.length === 6 && !loading ? { scale: 0.98 } : {}}
            className={`px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-md transition-all flex-1 ${
              loading || otp.length !== 6
                ? "opacity-70 cursor-not-allowed"
                : "hover:shadow-lg"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <CircularProgress size={20} color="inherit" />
                Verifying...
              </div>
            ) : (
              "Verify & Continue"
            )}
          </motion.button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
