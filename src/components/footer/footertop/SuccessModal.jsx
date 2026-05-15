import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function SuccessModal({ t, isOpen, closeModal }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-700 animate-scaleIn">
        <div className="text-center">
          <div className="flex justify-center mb-5">
            <div className="bg-green-500/10 p-4 rounded-full">
              <AiOutlineCheckCircle className="text-green-500 text-5xl animate-pulse" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-green-400 mb-3">
            {t("footer.top.modal.title")}
          </h3>

          <p className="text-gray-300 mb-6">
            {t("footer.top.modal.description")}
          </p>

          <button
            className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
            onClick={closeModal}
          >
            {t("footer.top.modal.button")}
          </button>
        </div>
      </div>
    </div>
  );
}
