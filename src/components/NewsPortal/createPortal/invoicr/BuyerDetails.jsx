import React from "react";

const BuyerDetails = ({ data,customerId }) => {
  return (
    <div className="mb-8 p-4 border border-gray-200 rounded-lg text-xs">
      <p className="font-bold text-gray-600 uppercase mb-2">Billing Details</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2">
        <div>
          <strong>Full Name:</strong> <span>{data.buyer.name}</span>
        </div>
        <div className="break-all">
          <strong>Email:</strong> <span>{data.buyer.email}</span>
        </div>
        <div>
          <strong>Mobile:</strong> <span>{data.buyer.mobile}</span>
        </div>
        <div>
          <strong>Plan Name:</strong>{" "}
          <span className="font-semibold text-red-700">
            {data.buyer.planName}
          </span>
        </div>

        <div className="col-span-full h-px bg-gray-200 my-1"></div>

        <div className="col-span-1 sm:col-span-1 md:col-span-2">
          <strong>Customer GST No:</strong>{" "}
          <span className="font-medium">{data.buyer.gstin}</span>
        </div>
        <div className="col-span-1 sm:col-span-1 md:col-span-2">
          <strong>GST Name:</strong> <span>{data.buyer.gstName}</span>
        </div>
        <div className="col-span-1 sm:col-span-1 md:col-span-2">
          <strong>Customer Id:</strong>{" "}
          <span>{customerId}</span>
        </div>
      </div>
    </div>
  );
};

export default BuyerDetails;
