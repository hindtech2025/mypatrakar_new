
import React from "react";
export function Stepper({ currentStep }) {
  const steps = [1, 2, 3];
  return (
    <div className="flex items-center justify-center w-full max-w-md mx-auto my-12 px-4">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          {/* Step Wrapper */}
          <div className="relative flex items-center justify-center">
            
            {/* Outer Circle / Ring for Active Step */}
            {step === currentStep && (
              <div
                className={`absolute rounded-full
                  ${index === 0 
                    ? "w-12 h-12   bg-red-200 " 
                    : "w-12 h-12 bg-blue-100"
                  }
                `}
              />
            )}

            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center 
              font-bold text-sm transition-all duration-500 z-10
              ${
                step < currentStep
                  ? "bg-[#22C55E] text-white shadow-lg shadow-green-100"
                  : step === currentStep
                  ? index === 0
                    ? "bg-[#f33e2a] text-white"
                    : "bg-[#1A2B4C] text-white shadow-lg"
                  : "bg-[#E5EAF2] text-[#64748B]"
              }`}
            >
              {step < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step
              )}
            </div>
          </div>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div className="flex-1 h-[3px] mx-1 relative overflow-hidden bg-[#E5EAF2]">
              <div
                className={`absolute inset-0 transition-transform duration-700 origin-left
                ${
                  step < currentStep
                    ? "bg-[#22C55E] scale-x-100"
                    : "scale-x-0"
                }`}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

