import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { getCountryCode, requestCall } from "../../../api";

export default function ContactForm({ t, onSuccess }) {
  const [warn, setWarn] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [countryCodes, setCountryCodes] = useState([]);
  const [info, setInfo] = useState({
    countryCode: "",
    mobileNumber: "",
    message: "",
  });

  // --------------------------------
  // 1️⃣ Fetch Country Codes (API CALL)
  // --------------------------------
  const fetchCountryCodes = async () => {
    try {
      const res = await getCountryCode();

      // console.log(res.data);
      const list = res.data.country_code || [];
      setCountryCodes(list);

      // Set Default First Country Code
      if (list.length > 0) {
        setInfo((prev) => ({
          ...prev,
          countryCode: list[0].country_code,
        }));
      }
    } catch (error) {
      // console.log("Country code fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCountryCodes();
  }, []);

  // --------------------------------
  // 2️⃣ Submit Form + Call API
  // --------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!info.mobileNumber) {
      return setWarn("Mobile number is required");
    }

    if (!/^\d{10}$/.test(info.mobileNumber)) {
      return setWarn("Please enter valid 10 digit mobile");
    }

    if (!info.message) {
      return setWarn("Message is required");
    }

    setWarn("");
    setLoading(true);

    try {
      const res = await requestCall({
        country_code: info.countryCode,
        phone_no: info.mobileNumber,
        message: info.message,
      });

      // console.log(res.data);

      setSuccess(true);
      onSuccess();

      setInfo({ mobileNumber: "", message: "", countryCode: info.countryCode });
    } catch (error) {
      setWarn("Something went wrong! Try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <form className="space-y-4">
        {/* Country Code + Phone */}
        <div>
          <label className="text-sm text-gray-300 mb-1 block">
            {t("footer.top.form.phone")}
          </label>

          <div className="flex items-center bg-gray-800 border border-gray-700 rounded-xl px-4 py-3">
            {/* Dynamically Fetched Country Code */}
            <select
              value={info.countryCode}
              onChange={(e) =>
                setInfo({ ...info, countryCode: e.target.value })
              }
              className="bg-transparent text-white outline-none"
            >
              {countryCodes.length > 0 &&
                countryCodes?.map((c) => (
                  <option
                    key={c.id}
                    className="text-black"
                    value={c.country_code}
                  >
                    {c.country_code}
                  </option>
                ))}
            </select>

            <div className="h-6 w-px bg-gray-600 mx-3" />

            <input
              type="tel"
              value={info.mobileNumber}
              onChange={(e) => {
                const onlyNum = e.target.value.replace(/\D/g, "");
                if (onlyNum.length <= 10) {
                  setInfo({ ...info, mobileNumber: onlyNum });
                }
              }}
              placeholder={t("footer.top.form.phonePlaceholder")}
              className="flex-1 bg-transparent text-white outline-none"
              maxLength={10}
            />
          </div>
        </div>

        {/* Message */}
        <textarea
          value={info.message}
          onChange={(e) => setInfo({ ...info, message: e.target.value })}
          placeholder={t("footer.top.form.messagePlaceholder")}
          className="w-full h-20 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white"
        ></textarea>

        {/* Warning */}
        {warn && (
          <div className="flex items-center gap-2 bg-red-900/20 border border-red-800 p-3 rounded-lg">
            <AiOutlineExclamationCircle className="text-red-500 text-xl" />
            <p className="text-red-400 text-sm">{warn}</p>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white"
        >
          {loading
            ? "Please wait..."
            : success
              ? t("footer.top.form.button2")
              : t("footer.top.form.button1")}
        </button>
      </form>
    </div>
  );
}
