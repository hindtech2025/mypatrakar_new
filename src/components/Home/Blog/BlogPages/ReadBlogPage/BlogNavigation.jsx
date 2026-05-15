import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing FontAwesome icons

const BlogNavigation = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between py-5 px-4 border-t border-gray-300">
      {/* Previous Post */}
      <div className="flex items-center space-x-4 mb-4 lg:mb-0">
        <a
          href="#"
          rel="prev"
          className="flex items-center text-red-600 hover:text-red-700 transition duration-300"
        >
          <FaArrowLeft className="text-3xl lg:mr-2" /> {/* FontAwesome Icon */}
          <div>
            <p className="text-sm font-semibold uppercase">Previous</p>
            <p className="text-lg font-medium text-gray-800 hover:text-red-700 transition duration-300">
              Advantages of Mobile...
            </p>
          </div>
        </a>
      </div>

      {/* Next Post */}
      <div className="flex items-center space-x-4 text-right">
        <a
          href="#"
          rel="next"
          className="flex items-center text-red-600 hover:text-red-700 transition duration-300"
        >
          <div>
            <p className="text-sm font-semibold uppercase">Next</p>
            <p className="text-lg font-medium text-gray-800 hover:text-red-700 transition duration-300">
              Advantages of E-commerce...
            </p>
          </div>
          <FaArrowRight className="text-3xl lg:ml-2" /> {/* FontAwesome Icon */}
        </a>
      </div>
    </div>
  );
};

export default BlogNavigation;
