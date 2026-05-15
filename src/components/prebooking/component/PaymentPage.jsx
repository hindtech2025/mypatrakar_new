
import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { preBookingPayment } from "../../../api";

const PaymentPage = ({
  handleNextStep,
  amount,
  phone,
  email,
  fullName,
  country,
  prebookingId,
  setRecieptData,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Payment service unavailable");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        // ✅ REAL AMOUNT
        amount: Number(amount) * 100,
        currency: country === "India" || country === "0" ? "INR" : "USD",

        name: "MyPtrakar",
        description: "Booking Amount Payment",

        handler: async function (response) {
          console.log("RAZORPAY SUCCESS 👉", response);

          try {
            const paymentPayload = {
              prebooking_id: prebookingId,
              transaction_id: response.razorpay_payment_id,
              payment_status: "1",
            };

            console.log("PAYMENT PAYLOAD 👉", paymentPayload);

            const apiRes = await preBookingPayment(paymentPayload);
            console.log("PAYMENT API RESPONSE 👉", apiRes.data);

            if (apiRes?.data?.status || apiRes?.data?.success) {
              // ✅ Save receipt
              setRecieptData(apiRes.data.response);

              setLoading(false);

              // ✅ GO TO NEXT STEP (FINAL)
              handleNextStep();
            } else {
              throw new Error(apiRes.data.message || "Payment update failed");
            }
          } catch (apiErr) {
            console.error("BACKEND UPDATE ERROR ❌", apiErr);
            setLoading(false);
            setError(
              "Payment received but confirmation failed. Please contact support.",
            );
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
            setError("Payment cancelled by user.");
          },
        },

        prefill: {
          name: fullName,
          email: email,
          contact: phone,
        },

        theme: {
          color: "#1b2f5a",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("PAYMENT FAILED ❌", response);
        setLoading(false);
        setError(response.error.description || "Payment failed");
      });

      rzp.open();
    } catch (err) {
      setLoading(false);
      setError(err.message || "Unable to start payment");
    }
  };

  return (
    <div className="relative w-full">
      {/* ERROR */}
      {error && (
        <div className="mb-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-xs font-bold border border-red-200">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full h-16 rounded-xl font-black tracking-widest uppercase flex items-center justify-center gap-3 transition-all
          ${
            loading
              ? "bg-gray-300 cursor-not-allowed text-white"
              : "bg-gradient-to-b from-[#1b2f5a] to-[#14254a] text-white hover:opacity-95"
          }`}
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Processing...
          </>
        ) : (
          `Pay ₹${amount}`
        )}
      </button>

      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-xl z-10" />
      )}
    </div>
  );
};

export default PaymentPage;
