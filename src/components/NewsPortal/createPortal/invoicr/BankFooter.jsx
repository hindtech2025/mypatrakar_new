import React from "react";

const BankFooter = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row mt-8 border-t pt-4 border-gray-300">
      <div className="w-full md:w-1/2 pr-0 md:pr-6 mb-6 md:mb-0">
        <p className="font-bold text-xs text-gray-600 uppercase mb-2">
          Bank Details ({data.seller.businessName})
        </p>
        <div className="text-xs space-y-1">
          <p>
            <strong>Account Holder:</strong> {data.bank.accountHolder}
          </p>
          <p>
            <strong>Bank Name:</strong> {data.bank.bankName}
          </p>
          <p>
            <strong>A/C No:</strong> {data.bank.accountNumber}
          </p>
          <p>
            <strong>IFSC:</strong> {data.bank.ifsc}
          </p>
          <p>
            <strong>Branch:</strong> {data.bank.branch}
          </p>
          {data.bank.upiId && (
            <p>
              <strong>UPI ID:</strong> {data.bank.upiId}
            </p>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/2 pl-0 md:pl-6 border-l-0 md:border-l pt-6 md:pt-0 border-t md:border-t-0 border-gray-200 text-left md:text-right">
        <p className="font-bold text-xs text-gray-600 uppercase mb-2">
          For {data.seller.businessName}
        </p>
        <div className="h-16 mt-6 border-b border-dashed border-gray-400 mx-auto md:ml-auto md:mr-0 w-4/5"></div>
        <p className="text-sm font-semibold mt-1">Authorized Signatory</p>
      </div>
    </div>
  );
};

export default BankFooter;