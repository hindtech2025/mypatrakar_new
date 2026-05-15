import React, { useState } from "react";

const OtpMethodSelector = ({ setOtpMethod }) => {
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setOtpMethod(e.target.value);
    setError(""); // Clear error on selection
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-6">
        {/* WhatsApp Option */}
        {/* <label
          htmlFor="WhatsApp"
          className="flex items-center cursor-pointer space-x-2"
        >
          <input
            type="radio"
            name="otpMethod"
            value="WhatsApp"
            id="WhatsApp"
            className="w-4 h-4 accent-red-600"
            onChange={handleChange}
          />

          <span className="text-gray-700 font-medium">WhatsApp</span>
        </label> */}

        {/* SMS Option */}
        <label
          htmlFor="SMS"
          className="flex items-center cursor-pointer space-x-2"
        >
          <input
            type="radio"
            name="otpMethod"
            value="SMS"
            id="SMS"
           className="w-4 h-4 accent-red-600"
            onChange={handleChange}
          />
          <span className="text-gray-700 font-medium">SMS</span>
        </label>
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default OtpMethodSelector;
