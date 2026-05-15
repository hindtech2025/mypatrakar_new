import React, { useContext } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { BlogContext } from "../../../../../context/BlogContext";

export default function Heading() {
  const { blog } = useContext(BlogContext);

  return (
    <div>
      <section className="w-full bg-white py-10 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start">
            {/* Title with animation */}
            <h1 className="lg:text-5xl md:text-4xl text-3xl text-center font-bold text-gray-900 mb-6 animate-slideInUp md:animate-fadeIn">
              {blog.blog_category}
            </h1>

            {/* Post Info */}
            <ul className="flex space-x-8 text-gray-600 mb-6 animate-slideInUp md:animate-fadeIn">
              <li className="flex items-center space-x-2 font-semibold text-gray-400 hover:text-gray-600 transition-colors duration-300">
                <SlCalender className="text-lg" />
                <span>April 30, 2023</span>
              </li>
              <li className="flex items-center space-x-2 font-semibold text-gray-400 hover:text-gray-600 transition-colors duration-300">
                <AiOutlineComment className="text-lg" />
                <span>No Comments</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
