import React from "react"

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import TableItem from "./TableItem";
const TableComponent = ({ columns, data }) => {
  const [rowCount, setRowCount] = useState(10); // Default to 10 rows
  const [searchValue, setSearchValue] = useState("");
  const handleRowChange = (e) => {
    setRowCount(Number(e.target.value));
  };
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  let filteredData = searchValue
    ? data.filter((item) => {
        return Object.values(item).some((value) =>
          value.toLowerCase().includes(searchValue.toLowerCase())
        );
      })
    : data;
  return (
    <>
      <div className="w-full flex items-center justify-evenly mt-10 border-b">
        <div>
          <input
            type="text"
            name="searchValue"
            placeholder="search"
            value={searchValue}
            className="border-none outline-none bg-gray-100 p-1 rounded-xl w-96"
            onChange={handleChange}
          />
        </div>
        <button type="button">
          <FaSearch />
        </button>
      </div>
      <section className="flex flex-col  items-center justify-center my-10">
        <label className="mb-4">
          Rows per page:
          <input
            type="number"
            value={rowCount}
            onChange={handleRowChange}
            min="1"
            max={data.length}
            className="ml-2 border border-gray-300 p-1"
          />
        </label>
        <TableItem
          columns={columns}
          rowCount={rowCount}
          filteredData={filteredData}
        />
      </section>
      <div className="flex items-center justify-end">
        <p>{rowCount} Rows per page</p>
      </div>
    </>
  );
};

export default TableComponent;
