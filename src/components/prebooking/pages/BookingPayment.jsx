
import React from "react";
import { ShieldCheck, Layout } from "lucide-react";
import PaymentPage from "../component/PaymentPage";

const BookingPayment = ({
  amount = 999.0,
  phone,
  email,
  clientName = "Republic Bharat",
  handleNextStep,
  country = "india",
  setCurrentStep,
  currentStep,
  prebookingId,
  setRecieptData
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* HEADER */}
        <div className="bg-[#17254A] p-8 pt-10 pb-10 text-white relative">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-[10px] font-bold tracking-[0.15em] uppercase mb-1">
                Development Booking
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight">
                ₹{amount.toFixed(2)}
              </h1>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-500/50 bg-white/5 rounded-full backdrop-blur-sm">
              <ShieldCheck size={14} className="text-red-100" />
              <span className="text-[10px] font-bold tracking-wide text-red-100 uppercase">
                Secure Portal
              </span>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-8">
          {/* Fee Row */}
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <span className="text-gray-500 text-xs font-bold tracking-widest uppercase">
              Advance Portal Fee
            </span>
            <span className="text-[#17254A] text-xl font-extrabold">
              ₹{amount.toFixed(2)}
            </span>
          </div>

          {/* Info Box */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-8 flex gap-4 items-start">
            <div className="min-w-[20px] pt-1">
              <Layout className="text-red-500" size={20} strokeWidth={2.5} />
            </div>
            <p className="text-[#17254A] text-[13px] font-bold leading-relaxed">
              Infrastructure slot reserved for{" "}
              <span className="text-black">{clientName}</span>. This booking
              amount will be adjusted in your final development cost.
            </p>
          </div>

          {/* PAYMENT ENGINE */}
          <PaymentPage
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            fullName={clientName}
            email={email}
            phone={phone}
            country={
              country?.toLowerCase() === "india" ||
              country?.toLowerCase() === "in"
                ? "0"
                : "1"
            }
            amount={amount}
            handleNextStep={handleNextStep}
            prebookingId={prebookingId}
            setRecieptData={setRecieptData}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;
