import React from "react";

const ControlPanel = ({
  isDemo,
  setIsDemo,
  loading,
  sellerData,
  purchaseId,
  customerId,
  error,
  handleManualFetch,
  clearApiData,
  handlePrint,
  handleGoBack
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 print-hidden">
      <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-300 space-y-3 min-w-[280px] max-h-[80vh] overflow-y-auto">
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Back
        </button>

        {/* Demo Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="demoToggle"
            checked={isDemo}
            onChange={(e) => setIsDemo(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-600 rounded"
            disabled={sellerData !== null}
          />
          <label htmlFor="demoToggle" className="text-sm font-medium text-gray-700">
            Use Demo Data
          </label>
        </div>

        {/* Manual Fetch Button */}
        {purchaseId && sellerData === null && (
          <button
            onClick={handleManualFetch}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            {loading ? "Loading API Data..." : "Load Invoice from API"}
          </button>
        )}

        {/* Clear API Data Button */}
        {sellerData && (
          <button
            onClick={clearApiData}
            className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm font-medium"
          >
            Clear API Data & Use Demo
          </button>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-2 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Data Source Info */}
        <div className="text-xs text-gray-500 pt-2 border-t border-gray-200">
          <p>
            <strong>Data Source:</strong>{" "}
            <span className={sellerData ? "text-green-600 font-semibold" : isDemo ? "text-blue-600" : "text-gray-600"}>
              {sellerData ? "API (Real Data)" : isDemo ? "Demo" : "Placeholder"}
            </span>
          </p>
          {purchaseId && (
            <p className="truncate">
              <strong>Purchase ID:</strong> <span className="font-mono">{purchaseId}</span>
            </p>
          )}
          {customerId && (
            <p className="truncate">
              <strong>Customer ID:</strong> <span className="font-mono">{customerId}</span>
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-700 mb-2">Quick Actions:</p>
          <div className="space-y-2">
            <button
              onClick={handlePrint}
              className="w-full px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;