import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const generatePages = () => {
    let pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-4 my-10">

      {/* Prev */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
        bg-white shadow-sm border border-gray-200 
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:bg-gray-50 transition-all"
      >
        <AiOutlineLeft className="text-gray-600" /> Prev
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {generatePages().map((pg, index) =>
          pg === "..." ? (
            <span
              key={index}
              className="px-3 py-2 text-gray-400 font-semibold select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={pg}
              onClick={() => onPageChange(pg)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border
                ${
                  currentPage === pg
                    ? "bg-red-600 text-white shadow-md border-red-600"
                    : "bg-white text-gray-700 hover:bg-red-50 border-gray-200"
                }`}
            >
              {pg}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
        bg-white shadow-sm border border-gray-200
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:bg-gray-50 transition-all"
      >
        Next <AiOutlineRight className="text-gray-600" />
      </button>
    </div>
  );
};

export default Pagination;
