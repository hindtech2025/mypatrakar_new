import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { GrPinterest } from "react-icons/gr";
import React from "react";

const SocialIcons = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Tag */}
          <div className="p-2 bg-red-500 text-white rounded-lg text-sm font-semibold">
            <a
              href="https://blog.Myptrakar.com/category/mobile-app/"
              rel="tag"
              className="hover:text-white"
            >
              Mobile App
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white transition transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-lg" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white transition transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-lg" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white transition transform hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GrPinterest className="text-lg" />
            </a>
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
      </div>
    </section>
  );
};

export default React.memo(SocialIcons);
