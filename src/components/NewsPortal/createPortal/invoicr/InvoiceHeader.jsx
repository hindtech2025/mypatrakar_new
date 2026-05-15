import React from "react";
import logo from "../../../../assets/LG1.png";
// import logo from "../../assets/LG1.png";

const API_CONFIG = {
  BASE_URL: "https://super-admin.hindtechitsolutions.com",
};

const InvoiceHeader = ({ sellerData, data }) => {
    // console.log(data)
  return (
    <div className="flex flex-col md:flex-row justify-between items-start border-b pb-6 mb-6 border-gray-300 gap-4 md:gap-0">
      <div>
        <div className="flex items-center justify-start">
          {sellerData?.logo_url ? (
            <img
              src={logo}
              alt={`${data.seller.businessName} Logo`}
              className="h-auto w-52"
              crossOrigin="anonymous"
            />
          ) : (
            <img
              src={logo}
              alt="MY PATRAKAR Official Logo"
              className="h-auto w-52"
            />
          )}
        </div>
        <p className="text-lg font-semibold text-gray-600">
          GST Tax Invoice
        </p>
        <p className="text-xs text-gray-500">
          Legal Proprietor: {data.seller.ownerName} (Proprietorship)
        </p>
      </div>
      <div className="text-right w-full md:w-auto flex justify-end">
        <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 15l-2 5L9 9l5-2 2-5m3 3l-2 5L9 9l5-2 2-5m3 3l-2 5L9 9l5-2 2-5m3 3l-2 5L9 9l5-2 2-5M9 19H5a2 2 0 01-2-2V5a2 2 0 012-2h4l2 4h4l2 4h4a2 2 0 012 2v4a2 2 0 01-2 2h-4l-2 4h-4z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;