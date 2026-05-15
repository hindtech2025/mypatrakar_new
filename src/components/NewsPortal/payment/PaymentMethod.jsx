import React, { useContext, useState } from "react";
import Bitcoin from "../../../assets/Bitcoin.webp";
import GooglePay from "../../../assets/GPay.webp";
import { PaymentContext } from "../../../context/PaymentContext";

export default function PaymentMethod({ setCircleColor }) {
  const { setPaymentData, paymentData } = useContext(PaymentContext);
  const [cardType, setCardType] = useState(null);

  const getCardType = (number) => {
    const re = {
      visa: /^4[0-9]{6,}$/,
      mastercard: /^5[1-5][0-9]{5,}$/,
      amex: /^3[47][0-9]{5,}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
      rupay: /^(508[5-9]|60[0-9]|652[1-9]|653[0-9]|654[0-9])/,
    };

    for (const [card, pattern] of Object.entries(re)) {
      if (pattern.test(number)) return card;
    }
    return null;
  };

  const formatCardNumber = (number) =>
    number.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "cardNumber") {
      const formatted = formatCardNumber(value);
      const clean = formatted.replace(/\s/g, "");
      const type = getCardType(clean);
      setCardType(type);
      setPaymentData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      const val = type === "checkbox" ? checked : value;
      setPaymentData((prev) => ({ ...prev, [name]: val }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCircleColor({
      circle: "bg-green-700",
      hr: "border-green-600",
    });
    // console.log("Submitted paymentData:", paymentData);

    setPaymentData((prev) => {
      const cleared = {};
      for (const key in prev) cleared[key] = "";
      return cleared;
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-md hover:shadow-xl rounded-2xl p-8 space-y-8">
      <p className="text-2xl font-bold text-gray-800">Payment Method</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="cash"
              name="paymentMethod"
              value="card"
              checked={paymentData.paymentMethod === "card"}
              onChange={handleChange}
              className="accent-red-600 w-5 h-5"
            />
            <label htmlFor="cash" className="text-lg font-semibold text-gray-700">
              Credit Card / Debit Card
            </label>
          </div>

          <div className="flex items-center border rounded-lg p-3 bg-gray-50">
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number (.... .... .... 3458)"
              className="flex-1 bg-transparent border-none outline-none text-lg text-gray-800"
              onChange={handleChange}
              value={paymentData.cardNumber || ""}
              maxLength={19}
            />
            {cardType && (
              <span className="bg-red-600 text-white font-bold py-2 px-4 rounded-md text-sm capitalize">
                {cardType}
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="date"
              name="expiryDate"
              className="border rounded-md py-2 px-4 w-full"
              onChange={handleChange}
              value={paymentData.expiryDate || ""}
            />
            <input
              type="text"
              name="Cvv"
              placeholder="CVV"
              className="border rounded-md py-2 px-4 w-full"
              onChange={handleChange}
              value={paymentData.Cvv || ""}
            />
            <input
              type="text"
              name="ZIPCode"
              placeholder="ZIP Code"
              className="border rounded-md py-2 px-4 w-full"
              onChange={handleChange}
              value={paymentData.ZIPCode || ""}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="save-card"
                name="saveCard"
                onChange={handleChange}
                checked={paymentData.saveCard || false}
              />
              <label htmlFor="save-card" className="text-gray-700">
                Save this card for future payments
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="remember-me"
                name="rememberMe"
                onChange={handleChange}
                checked={paymentData.rememberMe || false}
              />
              <label htmlFor="remember-me" className="text-gray-700">
                Billing address same as shipping address
              </label>
            </div>
          </div>

          <input
            type="text"
            name="billingAddress"
            placeholder="Street Address"
            className="w-full border rounded-md p-3"
            onChange={handleChange}
            value={paymentData.billingAddress || ""}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="aptNumber"
              placeholder="Apt Number"
              className="border rounded-md p-3 w-full"
              onChange={handleChange}
              value={paymentData.aptNumber || ""}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              className="border rounded-md p-3 w-full"
              onChange={handleChange}
              value={paymentData.state || ""}
            />
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              className="border rounded-md p-3 w-full"
              onChange={handleChange}
              value={paymentData.zip || ""}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <button
            type="button"
            className="w-full md:w-auto py-3 px-6 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full md:w-auto py-3 px-6 bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition"
          >
            Save Address
          </button>
        </div>
      </form>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between border rounded-lg p-3 hover:shadow transition">
          <div className="flex items-center gap-4">
            <input
              type="radio"
              id="bitcoin"
              name="paymentMethod"
              value="bitcoin"
              checked={paymentData.paymentMethod === "bitcoin"}
              onChange={handleChange}
              className="accent-yellow-500 w-5 h-5"
            />
            <label htmlFor="bitcoin" className="text-lg font-semibold text-gray-700">
              Bitcoin
            </label>
          </div>
          <img src={Bitcoin} alt="Bitcoin logo" className="w-10 h-10" loading="lazy" />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-3 hover:shadow transition">
          <div className="flex items-center gap-4">
            <input
              type="radio"
              id="Gpay"
              name="paymentMethod"
              value="Gpay"
              checked={paymentData.paymentMethod === "Gpay"}
              onChange={handleChange}
              className="accent-green-500 w-5 h-5"
            />
            <label htmlFor="Gpay" className="text-lg font-semibold text-gray-700">
              Google Pay
            </label>
          </div>
          <img src={GooglePay} alt="Google Pay logo" className="w-10 h-10" loading="lazy" />
        </div>
      </div>
    </div>
  );
}
