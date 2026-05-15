import { useContext, useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { Link } from "react-router-dom";

import { LanguageContext } from "../../../context/LanguageContext";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../Authentication/auth-hook";
import { FaCircleArrowDown } from "react-icons/fa6";

export default function PriceInfoCard({
  packageName,
  packageDesc, // This is in days
  region,
  payAble, // This is the total price for the period
  discount,
  realPrice,
  atPriceFeatures,
}) {
  // console.log(packageName);
  const { isLogin } = useAuth();
  const { translate } = useContext(LanguageContext);
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Convert days to months (30 days = 1 month)
  const convertToMonths = (days) => Math.floor(days / 30);

  // Calculate monthly price
  const calculateMonthlyPrice = (totalPrice, days) => {
    const months = convertToMonths(days);
    return months > 0 ? totalPrice / months : totalPrice;
  };

  // Calculate quarterly price (3 months)
  const calculateQuarterlyPrice = (totalPrice, days) => {
    const months = convertToMonths(days);
    const quarters = Math.floor(months / 3);
    return quarters > 0 ? totalPrice / quarters : totalPrice;
  };

  // Calculate yearly price (12 months)
  const calculateYearlyPrice = (totalPrice, days) => {
    const months = convertToMonths(days);
    const years = Math.floor(months / 12);
    return years > 0 ? totalPrice / years : totalPrice;
  };

  const currencyIcon = region?.toLowerCase() === "india" ? "₹" : "$";

  const formatIndianPrice = (amount) =>
    amount.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  // Get the appropriate price based on package type
  const getDisplayPrice = () => {
    if (packageName === "MyPatrakar Enterprise") {
      return payAble; // One-time payment
    }

    // For Basic and Premium, show monthly price
    return calculateMonthlyPrice(payAble, packageDesc);
  };

  // Get billing period text and price
  const getBillingInfo = () => {
    if (packageName === "MyPatrakar Basic") {
      const quarterlyPrice = calculateQuarterlyPrice(payAble, packageDesc);
      return {
        text: `Billed Quarterly ${currencyIcon}`,
        price: quarterlyPrice,
      };
    }
    if (packageName === "MyPatrakar Premium") {
      const yearlyPrice = calculateYearlyPrice(payAble, packageDesc);
      return {
        text: `Billed Yearly ${currencyIcon}`,
        price: yearlyPrice,
      };
    }
    return {
      text: "",
      price: 0,
    };
  };

  const billingInfo = getBillingInfo();

  return (
    <div
      className={`w-full min-w-[360px] sm:max-w-[360px] mx-auto py-6 px-3 bg-white rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 ${
        isExpanded ? "max-h-full" : "max-h-[300px] overflow-hidden"
      }`}
      style={{ fontFamily: "Jost, sans-serif" }}
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-950">{packageName}</h2>

        {packageName === "MyPatrakar Basic" && (
          <p className="text-gray-800 text-md mt-1 tracking-wide">
            {t("basicDesc")}
          </p>
        )}
        {packageName === "MyPatrakar Premium" && (
          <p className="text-gray-800 text-md mt-1 tracking-wide">
            {t("premiumDesc")}
          </p>
        )}
        {packageName === "MyPatrakar Enterprise" && (
          <p className="text-gray-800 text-md mt-1 tracking-wide">
            {t("enterpriseDesc")}
          </p>
        )}

        <div className="mt-4">
          <p className="text-3xl font-medium text-gray-900 flex items-center justify-center gap-1">
            {currencyIcon}
            {formatIndianPrice(getDisplayPrice())}.00
            {packageName !== "MyPatrakar Enterprise" ? (
              <span className="text-sm font-semibold">/ monthly</span>
            ) : (
              <span className="text-sm font-semibold">/ one-time</span>
            )}
          </p>

          <p className="font-medium line-through items-center justify-center text-md text-gray-700 text-center">
            <span className="flex items-center justify-center">
              <span>{currencyIcon} </span>
              <span className="">{formatIndianPrice(realPrice)}</span>
            </span>
          </p>

          {packageName !== "MyPatrakar Enterprise" &&
            billingInfo?.price !== 0 && (
              <p className="text-md font-semibold text-gray-900 mt-2 text-center">
                {billingInfo?.text} {formatIndianPrice(billingInfo?.price)}
              </p>
            )}

          <p className="text-sm text-gray-700 mt-1 text-center">
            {t("cardTaxText")}
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-700 hover:text-black transition "
          aria-label="Toggle more info"
        >
          {isExpanded ? (
            <FaCircleArrowDown className="animate-pulse rotate-180" size={20} />
          ) : (
            <FaCircleArrowDown className="animate-pulse" size={20} />
          )}
        </button>
      </div>

      <div
        className="text-center mt-6"
        style={{ fontFamily: "Jost, sans-serif" }}
      >
        <hr />
        <div className="px-6 space-y-3 mt-4 mb-2">
          {packageName === "MyPatrakar Premium" && (
            <div className="flex items-center gap-3">
              <BsCheck2 className="text-gray-900 text-lg" />
              <p className="text-gray-800 text-md">
                Basic {t("packageFeatureText")}
              </p>
            </div>
          )}

          {packageName === "MyPatrakar Enterprise" && (
            <div className="flex items-center gap-3">
              <BsCheck2 className="text-gray-900 text-lg" />
              <p className="text-gray-800 text-md">
                Premium {t("packageFeatureText")}
              </p>
            </div>
          )}

          {(packageName == "My Patrakar Yearly" ||
            packageName == "My Patrakar Yearly (Global)") && (
            <div className="flex items-start gap-3">
              <BsCheck2 className="text-gray-900 text-lg" />
              <p className="text-gray-800 font-bold text-md">
                Custom Domain Included
              </p>
            </div>
          )}
          {atPriceFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <BsCheck2 className="text-gray-900 text-lg" />

              <p className="text-gray-800 text-md">{translate(feature)}</p>
            </div>
          ))}
        </div>

        <Link
          to={isLogin ? "/portal/createportal" : "/login"}
          className="hover:no-underline"
        >
          <button className="w-full py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
            {t("purchaseBtn")}
          </button>
        </Link>

        {packageName === "MyPatrakar Enterprise" && (
          <>
            <hr className="my-2" />
            <div className="w-full bg-gray-400 h-[0.5px] my-2"></div>
            <p>{t("enterPriseRepaiText")}</p>
          </>
        )}
      </div>
    </div>
  );
}
