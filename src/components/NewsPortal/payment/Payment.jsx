import React, { useState } from "react";
import Cancel from "../Cancel";
import OrderSummery from "./OrderSummery";

export default function Payment() {
  const [activeStep, setActiveStep] = useState(1); // 1 for cart, 2 for checkout
  const [circleColor, setCircleColor] = useState({
    circle: "bg-gray-600",
    hr: "border-gray-200",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Cancel option */}
      <Cancel text="Checkout" />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
              <OrderSummery />

        {/* Progress Stepper - Visible on larger screens */}
        {/* <div className="hidden md:flex items-center justify-center mb-10"> */}
          {/* <div className="flex items-center w-full max-w-lg"> */}
            {/* Cart Step */}
            {/* <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${
                  activeStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                } font-medium`}
              >
                1
              </div>
              <span className={`mt-2 ${activeStep >= 1 ? "text-blue-600 font-medium" : "text-gray-500"}`}>
                Cart
              </span>
            </div> */}
            
            {/* Connecting Line */}
            {/* <div className="flex-1 mx-4">
              <hr className={`border-t-2 ${activeStep >= 2 ? "border-blue-600" : "border-gray-200"}`} />
            </div> */}
            
            {/* Checkout Step */}
            {/* <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${
                  activeStep >= 2 ? "bg-blue-600 text-white" : "bg-white text-gray-600 border-2 border-gray-300"
                } font-medium`}
              >
                2
              </div>
              <span className={`mt-2 ${activeStep >= 2 ? "text-blue-600 font-medium" : "text-gray-500"}`}>
                Checkout
              </span>
            </div> */}
          {/* </div> */}
        {/* </div> */}

        {/* Mobile Progress Indicator */}
        {/* <div className="md:hidden flex justify-center mb-6">
          <div className="text-sm text-gray-600">
            Step {activeStep} of 2 • {activeStep === 1 ? "Cart" : "Checkout"}
          </div>
        </div> */}

        {/* Main Content Grid */}
        {/* <div className="flex flex-col lg:flex-row gap-8"> */}
          {/* Payment Method Section - Left Column */}
          {/* <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Method</h2>
              <PaymentMethod 
                setCircleColor={setCircleColor} 
                onComplete={() => setActiveStep(2)}
              />
            </div>
          </div> */}

          {/* Order Summary Section - Right Column */}
          {/* <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              <OrderSummery />
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}