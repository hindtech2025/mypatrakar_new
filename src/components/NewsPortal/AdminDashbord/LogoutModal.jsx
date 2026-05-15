import React from "react";
import { IoClose } from "react-icons/io5";
import LogoutImg from "../../../assets/footer/logout.png";
// Add any similar illustration image to match UI

export default function LogoutModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 font-sans bg-black bg-opacity-40 flex items-center justify-center z-[9999] backdrop-blur-[1px]">
      <div className="bg-white w-[90%] md:w-[380px] rounded-2xl p-5 shadow-2xl relative animate-scaleIn">
        {/* Close Icon */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <IoClose size={22} />
        </button>

        {/* Illustration */}
        <div className="flex items-center justify-center mx-auto mb-4 w-24 h-24 overflow-hidden p-3 rounded-full bg-gray-200 ">
          <img
            src={LogoutImg}
            alt="logout illustration "
            className="w-full h-full object-contain "
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-bold text-gray-900 mb-2">
          Are You Logging Out?
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-600 text-sm mb-6">
          You can always log back in at any time. If you just want to switch
          accounts, you can add another account.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onCancel}
            className="w-1/2 py-2 border border-red-300 bg-red-500 text-white rounded-full font-semibold font-sans hover:bg-red-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-1/2 py-2 bg-gray-900 font-sans text-white rounded-full font-semibold hover:bg-gray-950"
          >
            Log out
          </button>
        </div>
      </div>

      {/* Animation CSS */}
      <style>{`
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
        @keyframes scaleIn {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
