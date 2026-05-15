import { useState } from 'react';
import React from "react"

import { useNavigate } from 'react-router-dom';

function Drop() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setIsOpen(false);
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="relative inline-block ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" font-semibold font-Poppins px-3 border-none bg-white hover:bg-gray-100 focus:outline-none"
      >
        Products
      </button>
      {isOpen && (
        <div className="absolute z-10 py-3  bg-white border rounded shadow-lg">
          <div
            onClick={() => handleNavigation('/product/app')}
            className="text-xs font-medium font-Poppins   transition-colors px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-red-600 hover:no-underline"
          >
            App - MyPatrakar V1
          </div>
          <div
            onClick={() => handleNavigation('/product/website')}
            className=" text-xs font-medium font-Poppins   transition-colors px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-red-600 hover:no-underline"
          >
            Website
          </div>
        </div>
      )}
    </div>
  );
}

export default Drop;
