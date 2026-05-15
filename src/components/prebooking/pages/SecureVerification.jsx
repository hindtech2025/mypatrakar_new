
import React, { useState, useRef, useEffect } from "react";
import { LoginSendOtp, preBookingVerifyOTP } from "../../../api";

const SecureVerification = ({
  handleNext,
  handlePrevious,
  prebookingId,
  otpToken: initialOtpToken,
  phone,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // 🔥 VERY IMPORTANT — token state
  const [otpToken, setOtpToken] = useState(initialOtpToken);

  const inputRefs = useRef([]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* ---------------- INPUT HANDLERS ---------------- */
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");

    const newOtp = [...otp];
    pasted.forEach((char, i) => {
      if (!isNaN(char)) newOtp[i] = char;
    });

    setOtp(newOtp);
    inputRefs.current[pasted.length - 1]?.focus();
  };

  const formatTime = (sec) => `0:${sec < 10 ? "0" : ""}${sec}`;

/* ---------------- RESEND OTP (AXIOS HANDLED) ---------------- */
  const handleResendOtp = async () => {
    // Basic checks before calling API
    if (!canResend || isResending) return;

    setIsResending(true);
    setError("");
    setSuccess("");

    try {
      // Axios call
      const res = await LoginSendOtp({ mobile: phone });
      
      // Axios response mein data 'res.data' ke andar hota hai
      // Jaisa aapne screenshot bheja: { data: { response: "...", status_message: "Success" }, ... }
      const apiResponse = res.data; 

      // console.log("RESEND OTP API DATA 👉", apiResponse);

      if (apiResponse?.status_message === "Success") {
        
        // 1. 🔥 TOKEN UPDATE: 'response' key se token nikal kar state update karein
        if (apiResponse.response) {
          setOtpToken(apiResponse.response);
          // console.log("NEW TOKEN UPDATED 👉", apiResponse.response);
        }

        // 2. SUCCESS FEEDBACK
        setSuccess("OTP has been resent successfully!");
        
        // 3. UI RESET
        setOtp(["", "", "", "", "", ""]); // Clear existing OTP inputs
        setTimer(60); // Reset countdown timer to 60 seconds
        setCanResend(false);

        // 4. AUTO FOCUS: Pehle box par focus wapas layein
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);

      } else {
        // Agar status_message "Success" nahi hai (Validation failure)
        setError(apiResponse?.status_message || "Failed to resend OTP");
      }
    } catch (err) {
      // console.error("RESEND OTP ERROR ❌", err);
      // Agar Axios error hai (4xx, 5xx), toh uska message handle karein
      const backendError = err.response?.data?.status_message || "Server error while resending OTP";
      setError(backendError);
    } finally {
      setIsResending(false);
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
  const handleVerify = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        mobile: phone,
        token: otpToken,
        otp: otpString,
      };

      // console.log("VERIFY PAYLOAD 👉", payload);

      const response = await preBookingVerifyOTP(payload);
      // console.log("VERIFY RESPONSE 👉", response.data);

      if (response?.data?.success || response?.data?.status) {
        setSuccess(response.data.message || "OTP verified");

        setTimeout(() => {
          handleNext();
        }, 800);
      } else {
        setError(response.data.message || "Invalid OTP");
      }
    } catch (err) {
      // console.error("VERIFY OTP ERROR ❌", err);
      setError("OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  /* ---------------- UI ---------------- */
  return (
    <div className="flex items-center justify-center py-10 px-4">
      <div className="bg-white w-full max-w-[460px] p-8 rounded-3xl shadow-xl text-center border">
        <h2 className="text-2xl font-black text-[#172554] mb-2">
          Secure Verification
        </h2>

        <p className="text-gray-500 text-sm mb-1">
          We've sent a code to {phone}
        </p>
        <p className="text-xs font-bold text-[#172554] mb-6">
          ID: {prebookingId}
        </p>

        {/* OTP INPUT */}
        <div className="mb-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-10 h-12 text-center text-xl font-bold border rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* STATUS */}
        {error && <p className="text-red-500 text-sm mb-3">⚠️ {error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">✅ {success}</p>}

        {/* RESEND */}
        <button
          onClick={handleResendOtp}
          disabled={!canResend || isResending}
          className="text-sm font-bold mb-6 disabled:text-gray-400"
        >
          {isResending
            ? "Sending..."
            : canResend
            ? "Resend OTP"
            : `Resend in ${formatTime(timer)}`}
        </button>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            className="flex-1 py-3 bg-gray-100 rounded-xl"
          >
            Back
          </button>

          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="flex-[2] py-3 bg-[#172554] text-white rounded-xl disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Confirm & Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecureVerification;
