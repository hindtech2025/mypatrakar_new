import React from "react";
import { FaLink } from "react-icons/fa"; // Importing an icon for the "View All Posts" link

const AuthorBox = () => {
  const style = {
    fontFamily: 'Times New Roman',
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-start p-6 gap-8 rounded-md bg-gray-50 shadow-lg">
      {/* Author Avatar */}
      <div className="mb-4 md:mb-0">
        <img
          src="https://secure.gravatar.com/avatar/313568da55f609d440eafb4a634a7c9d?s=300&d=identicon&r=g"
          alt="myptrakar"
          className="w-32 h-32 rounded-full border-4 border-red-500"
          loading="lazy"
        />
      </div>

      {/* Author Info */}
      <div>
        <h4 className="text-3xl font-bold font-Poppins text-gray-800">MyPtarkar</h4>
        <p className="text-lg text-gray-900 py-2 text-left font-sans">Team MyPtarkar</p>
        <a
          href="https://blog.myptrakar.com/author/myptrakar/"
          className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700"
        >
          <FaLink className="mr-2" /> View All Posts
        </a>
      </div>
    </div>
  );
};

export default AuthorBox;
