import React, { useState } from "react";
import { SlArrowUp } from "react-icons/sl";

const FAQDropdown = ({ question, answer }) => {
  // State to manage dropdown open/close
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="border rounded-xl shadow-md bg-white overflow-hidden transition-all duration-300">
        {/* Question Section */}
        <button
          onClick={toggleAnswer}
          className="w-full text-start flex justify-between items-center px-6 py-4 bg-white  focus:outline-none transition-colors rounded-t-lg"
        >
          <span
            className="text-base md:text-md lg:text-md font-semibold text-gray-800"
            style={{
              fontFamily: "Jost ",
            }}
          >
            {question}
          </span>
          <span
            className={`text-gray-600 transform transition-transform duration-300 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          >
            <SlArrowUp className="w-3 h-3 text-gray-900 font-bold" />
          </span>
        </button>

        {/* Answer Section */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-6 pb-3">
            <p
              className="text-sm md:text-md font-medium "
              style={{
                fontFamily: "Jost ",
              }}
            >
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQDropdown;
