import React from "react";


const DownloadControls = ({
  sellerData,
  customerData,
  data,
  purchaseId,
  loading,
  downloading,
  handleManualFetch,
  handlePrint,
  handleDownload,
}) => {
  return (
    <div className="mt-10 pt-6 border-t border-gray-300 print-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600">
          {/* <p>
            <strong>Invoice Status:</strong>{" "}
            <span className={sellerData ? "text-green-600 font-semibold" : "text-blue-600"}>
              {sellerData ? "✅ Real Data from API" : "🔄 Using Demo Data"}
            </span>
          </p> */}
          {purchaseId && (
            <p className="text-xs mt-1">
              Invoice:{" "}
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                {data.invoiceNo}
              </span>
            </p>
          )}
          {customerData && (
            <div className="text-xs mt-2 space-y-1">
              <p>
                <strong>Customer:</strong> {customerData.customer_name}
              </p>
               <p>
                <strong>Customer_Id:</strong> {customerData.customer_Id||"MPCU260410056"}
              </p>
              <p>
                <strong>Package:</strong> {customerData.package_name}
              </p>
              <p>
                <strong>Amount Paid:</strong> ₹{customerData.payable}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Manual Fetch Button */}
          {purchaseId && sellerData === null && (
            <button
              onClick={handleManualFetch}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh from API
                </>
              )}
            </button>
          )}

          {/* Print Button */}
          {/* <button
            onClick={handlePrint}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button> */}
          {/* <Link
            to={"/portal"}
            className="px-4  hover:text-gray-50 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium flex items-center justify-center"
          >
            Go To Dashboard
          </Link> */}

          {/* Main Download Button */}
          <button
            onClick={handleDownload}
            disabled={downloading || loading}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium flex items-center justify-center shadow-md"
          >
            {downloading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* API Status Banner */}
      {sellerData && customerData && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600 mr-2 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              {/* <p className="text-sm font-medium text-green-800">✅ Real-time Data Loaded from APIs</p> */}
              <div className="text-xs text-green-700 mt-1 grid grid-cols-1 md:grid-cols-2 gap-1">
                <div>
                  <strong>Seller :</strong> {sellerData.business_name} | GSTIN:{" "}
                  {sellerData.gstin_number}
                </div>
                <div>
                  <strong>Customer :</strong> {customerData.customer_name} |
                  Amount: ₹{customerData.payable}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadControls;
