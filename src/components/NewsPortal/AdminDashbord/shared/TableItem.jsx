import React from "react";
export default function TableItem({ filteredData, rowCount, columns }) {
  return (
    <table className=" flex-1 items-center justify-center mx-auto w-full border-collapse">
      <thead className="border-b">
        <tr>
          {columns.map((item) => {
            return (
              <th
                key={columns.indexOf(item)}
                className="border border-gray-300 p-2 text-md text-center        "
              >
                {item}
              </th>
            );
          })}
        </tr>
      </thead>
      {filteredData.length > 0 ? (
        <tbody>
          {filteredData.slice(0, rowCount).map((item, index) => (
            <tr key={index} className="py-3 border-b">
              {Object.values(item).map((value, index) => (
                <td
                  key={index}
                  className="border border-gray-300 p-1 text-sm text-center"
                >
                  {iseditItem ? (
                    <input
                      type="text"
                      value={value}
                      // onChange={(e) => console.log(e.target.value)}
                      className="w-2/3 p-2"
                    />
                  ) : value ? (
                    typeof value === "boolean" ? (
                      <p>Yes</p>
                    ) : (
                      value
                    )
                  ) : (
                    <span className="text-red-500 ">-</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td colSpan={6}>
              <p className="text-center text-gray-500 my-10">No Data Found</p>
            </td>
          </tr>
        </tbody>
      )}
    </table>
  );
}
