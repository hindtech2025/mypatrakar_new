import React from "react";

const ItemSummary = ({ data }) => {
  const hasDiscount = parseFloat(data.discount.amount) > 0;

  return (
    <>
      <p className="font-bold text-gray-600 uppercase mb-2 text-xs">
        Item Summary (SAC: {data.hsnSac})
      </p>
      <div className="table-container rounded-lg overflow-x-auto border border-gray-300 mb-6">
        <table className="w-full text-left text-xs min-w-[750px]">
          <thead className="bg-gray-100 uppercase text-gray-700 tracking-wider">
            <tr className="h-10">
              <th className="p-3 w-5/12">Description</th>
              <th className="p-3 w-1/12 text-center">SAC</th>
              <th className="p-3 w-1/12 text-center">Qty</th>
              <th className="p-3 w-1/12 text-right">Rate (₹)</th>
              <th className="p-3 w-1/12 text-right">Taxable Amount (₹)</th>
              <th className="p-3 w-1/12 text-right">CGST 9% (₹)</th>
              <th className="p-3 w-1/12 text-right">SGST 9% (₹)</th>
              <th className="p-3 w-1/12 text-right font-semibold">
                Total (₹)
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Main Item */}
            <tr className="border-b border-gray-200 hover:bg-red-50/50">
              <td className="p-3 font-semibold text-red-700">
                <span>{data.item.name}</span>
                <p className="text-gray-500 font-normal text-xs mt-0.5">
                  Subscription for digital content services.
                </p>
              </td>
              <td className="p-3 text-center">{data.hsnSac}</td>
              <td className="p-3 text-center">1</td>
              <td className="p-3 text-right">{data.item.rate}</td>
              <td className="p-3 text-right">{data.item.taxable}</td>
              <td className="p-3 text-right">{data.item.cgst}</td>
              <td className="p-3 text-right">{data.item.sgst}</td>
              <td className="p-3 text-right font-bold text-gray-900">
                {data.item.total}
              </td>
            </tr>
            
            {/* Discount Row - Only show if discount exists */}
            {hasDiscount && (
              <tr className="bg-yellow-50/50 border-b border-gray-200">
                <td className="p-3 text-gray-600 italic">
                  Discount Applied: <span>{data.discount.code}</span>
                </td>
                <td className="p-3 text-center">—</td>
                <td className="p-3 text-center">—</td>
                <td className="p-3 text-right">—</td>
                <td className="p-3 text-right font-medium text-red-600">
                  -{data.discount.amount}
                </td>
                <td className="p-3 text-right">—</td>
                <td className="p-3 text-right">—</td>
                <td className="p-3 text-right font-bold text-red-600">
                  -{data.discount.total}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemSummary;