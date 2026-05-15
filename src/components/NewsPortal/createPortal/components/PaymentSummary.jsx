
import { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PaymentContext } from "../../../../context/PaymentContext";

export default function PaymentSummary({
  formData,
  status,
  handleSubmit,
  appliedDomain,
  domainPrice = 999,
}) {
  const { portalRequestDetail } = useContext(PaymentContext);
  const basePrice = Number(formData.price || 0);
  const discount = appliedDomain ? domainPrice : 0;
  const finalPrice = basePrice - discount;

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 w-full">
      {/* Header */}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
        Total Amount
      </h3>

      {/* Layout Wrapper */}
      <div className="flex flex-col md:flex-row md:items-center font-sans md:justify-between gap-6">
        {/* LEFT: White Card */}
        <div className="bg-white w-full md:w-[65%] p-5 rounded-xl shadow-sm border border-gray-100">
          {/* Plan Row */}
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-700 font-medium">
              Plan ({portalRequestDetail?.package_name || "selceted package "},{" "}
              {portalRequestDetail?.fixedValidity || "0 "})
            </p>
            <p className="text-gray-900 font-semibold">
              {formData?.region === "0" ? "₹" : "$"} {basePrice.toLocaleString()}
            </p>
          </div>

          {/* Domain Benefit */}
          {/* {portalRequestDetail?.domainOwned &&Number(finalPrice)>900 && (
            <div className="flex justify-between items-center mb-4">
              <p className="text-red-600 font-semibold">
                Package Domain Benefit:
              </p>
              <p className="text-red-600 font-semibold">- ₹{domainPrice}</p>
            </div>
          )} */}

          {/* Divider */}
          <div className="border-t border-dashed my-3"></div>

          {/* Taxes */}
          <div className="flex justify-between text-sm text-gray-500 mb-3">
            <span>Taxes</span>
            <span>GST exclusive</span>
          </div>

          {/* Divider */}
          <div className="border-t my-3"></div>

          {/* Total Net Payable */}
          <div className="flex justify-between items-center">
            <p className="text-gray-900 font-extrabold text-lg">
              Total Net Payable
            </p>
            <p className="text-gray-900 font-extrabold text-lg">
           {formData?.region === "0" ? "₹" : "$"}
              {portalRequestDetail&&Number(finalPrice)>900?.domainOwned
                ? (Number(finalPrice) - 900).toLocaleString()
                : Number(finalPrice).toLocaleString()}
              + GST
            </p>
          </div>
        </div>

        {/* RIGHT: Button */}
      <div className="w-full md:w-auto flex md:block justify-center md:mb-0 mb-4">
  <button
    type="submit"
    disabled={status.isLoading}
    onClick={handleSubmit}
    className="w-[300px] py-3 text-white bg-red-600 font-semibold rounded-lg shadow-sm
               hover:bg-red-700 disabled:opacity-50 transition
               flex items-center justify-center"
  >
    {status.isLoading && (
      <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 absolute" />
    )}

    <span className={status.isLoading ? "invisible" : "visible"}>
      Continue to Payment
    </span>
  </button>
</div>

      </div>

      {/* Footer Text */}
      <p className="font-sans text-md text-gray-500 font-medium">
        Payment will be processed in the next step
      </p>

      <p className="font-sans text-center text-gray-400 mt-3 text-sm">
        You won't be charged yet. Review your details before payment.
      </p>
    </div>
  );
}
