import { FiTag, FiXCircle, FiCheckCircle } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TbReceiptTax } from "react-icons/tb";

export default function GstBox({
  gstNumber,
  setGstNumber,
  handleGstSubmit,
  gstLoading,
  error,
  success,
}) {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="space-y-4">

      {/* -------- DEFAULT VIEW -------- */}
      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="flex items-center gap-2 text-[#d52f4f] font-semibold"
        >
          <TbReceiptTax size={20} />
          <span>Have a GST number?</span>
        </button>
      )}

      {/* -------- FORM VIEW -------- */}
      {showInput && (
        <div className="bg-white border rounded-lg p-4 shadow-sm">
             <button
                        onClick={() => setShowInput(false)}
                        className="absolute right-10 -mt-3 text-red-500"
                      >
                        <RxCross2 />
                      </button>
          <form onSubmit={handleGstSubmit} className="space-y-4">

            <div>
              <label className="text-xs font-semibold text-gray-600">
                GST NUMBER
              </label>

              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Enter GST (e.g. 22AAAAA0000A1Z5)"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                  disabled={gstLoading}
                  autoFocus
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-50 border focus:ring-2 focus:ring-blue-600 outline-none uppercase"
                />

                <button
                  type="submit"
                  disabled={gstLoading || !gstNumber}
                  className={`px-6 py-2 rounded-lg flex items-center justify-center text-white font-medium transition
                  ${
                    gstLoading || !gstNumber
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#0f172a] hover:bg-[#0b1327]"
                  }`}
                >
                  {gstLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    "Apply"
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                <FiXCircle /> {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                <FiCheckCircle /> {success}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
