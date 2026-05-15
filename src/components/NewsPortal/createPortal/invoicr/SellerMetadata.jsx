import React from "react";

const SellerMetadata = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-xs">
      {/* Seller Details */}
      <div className="col-span-1 md:col-span-2 p-4 bg-gray-50 rounded-lg">
        <p className="font-bold text-gray-600 uppercase mb-2">
          Seller ({data.seller.businessName})
        </p>
        <p>
          <strong>Address:</strong> {data.seller.address}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 mt-2">
          <p>
            <strong>GSTIN:</strong>{" "}
            <span className="text-blue-900 font-medium">
              {data.seller.gstin}
            </span>
          </p>
          <p>
            <strong>PAN:</strong>{" "}
            <span className="font-medium">{data.seller.pan}</span>
          </p>
        </div>
      </div>

      {/* Invoice Metadata */}
      <div className="col-span-1 p-4 bg-red-50 rounded-lg">
        <p className="font-bold text-gray-600 uppercase mb-2">
          Invoice Details
        </p>
        <div className="space-y-1">
          <p>
            <strong>Invoice No:</strong>{" "}
            <span className="font-medium text-red-700">
              {data.invoiceNo}
            </span>
          </p>
          <p>
            <strong>Invoice Date:</strong> <span>{data.invoiceDate}</span>
          </p>
          <p>
            <strong>Order ID:</strong>{" "}
            <span className="break-all">{data.orderId}</span>
          </p>
          <p>
            <strong>Payment Method:</strong>{" "}
            <span>{data.paymentMethod}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerMetadata;