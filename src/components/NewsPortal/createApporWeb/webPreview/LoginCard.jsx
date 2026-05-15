import React from "react";
import google from "./google.jpg";
import { useAnimate } from "framer-motion";
import { useTranslation } from "react-i18next";
export default function LoginCard({ logo }) {
  const { t } = useTranslation();
  return (
    <div className=" flex items-center justify-center bg-blue-500">
      <div className="bg-white shadow-md rounded-md  w-40 text-center p-1">
        {/* Logo */}
        {/* <div className="flex justify-center mt-2">
          <imganslati
            src={logo}  
            alt="Logo"
            className="w-12 h-12 rounded-full"
          />
        </div> */}
        <div className="flex justify-center mt-2">
          <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
            {logo ? (
              // If logo uploaded → show image
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              // Default → show text
              <span className="text-xs font-bold text-gray-700">LOGO</span>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          {t("webPreview.loginCard.welcome")}
        </h2>
        <p className="text-gray-500 text-xs mb-2">
          {t("webPreview.loginCard.desc")}
        </p>

        {/* Google Button */}
        <div className="flex items-center justify-center my-1">
          <button className="flex items-center justify-center gap-1 w-5/6 bg-white border border-gray-300 rounded-md py-1 mb-2  hover:bg-gray-50 transition">
            <img src={google} alt="Google" className="h-3 w-3" />

            <span className="text-xs font-medium text-gray-700">Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
}
