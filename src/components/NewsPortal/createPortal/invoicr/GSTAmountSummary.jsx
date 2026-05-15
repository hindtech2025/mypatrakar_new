import React from "react";

const GSTAmountSummary = ({ data }) => {
  const hasDiscount = parseFloat(data.totals.discount) > 0;

  return (
    <div className="flex flex-col md:flex-row mt-6 gap-6">
      {/* GST Summary Table */}
      <div className="w-full md:w-1/2">
        <p className="font-bold text-gray-600 uppercase mb-2 text-xs">
          GST Tax Summary
        </p>
        <div className="table-container rounded-lg overflow-x-auto border border-gray-300">
          <table className="w-full text-left text-xs min-w-[350px]">
            <thead className="bg-gray-100 uppercase text-gray-700 tracking-wider">
              <tr className="h-8">
                <th className="p-2 w-3/12">SAC</th>
                <th className="p-2 w-3/12 text-right">Taxable Value (₹)</th>
                <th className="p-2 w-2/12 text-right">CGST (9%)</th>
                <th className="p-2 w-2/12 text-right">SGST (9%)</th>
                <th className="p-2 w-2/12 text-right font-semibold">
                  Total Tax
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-2">{data.hsnSac}</td>
                <td className="p-2 text-right">
                  {data.gstSummary.taxable}
                </td>
                <td className="p-2 text-right">{data.gstSummary.cgst}</td>
                <td className="p-2 text-right">{data.gstSummary.sgst}</td>
                <td className="p-2 text-right font-bold">
                  {data.gstSummary.total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Amount Summary */}
      <div className="w-full md:w-1/2">
        <p className="font-bold text-gray-600 uppercase mb-2 text-xs">
          Amount Summary
        </p>
        <div className="space-y-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex justify-between">
            <p>Subtotal (Before Discount & Tax)</p>
            <p className="font-medium text-right">
              ₹ {data.totals.subtotal}
            </p>
          </div>
          {hasDiscount && (
            <div className="flex justify-between">
              <p>
                Discount (<span>{data.discount.code}</span>)
              </p>
              <p className="font-medium text-red-600 text-right">
                - ₹ {data.totals.discount}
              </p>
            </div>
          )}
          <div className="flex justify-between">
            <p>Tax Amount (CGST + SGST)</p>
            <p className="font-medium text-right">
              + ₹ {data.totals.tax}
            </p>
          </div>
          <div className="h-px bg-gray-300 my-2"></div>
          <div className="flex justify-between items-center text-lg font-bold">
            <p className="text-blue-900">Final Payable Amount</p>
            <p className="text-blue-900 text-right">
              ₹ {data.totals.final}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GSTAmountSummary;