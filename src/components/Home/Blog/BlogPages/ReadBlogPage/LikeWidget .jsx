import { IoStarOutline } from "react-icons/io5";
import React, { useState } from "react";

const LikeWidget = () => {
  const style = {
    fontFamily: 'Times New Roman',
  };

  return (
    <div className="max-w-xl  my-8">
      <hr className="w-16  border-t-2 border-gray-300 mb-4" />
      
      <h3 className="text-gray-700 text-start text-xs my-1" style={style}>
        Like this:
      </h3>

      <section className="flex flex-col lg:flex-row items-start justify-start gap-6">
        {/* Like Button Section */}
        <div className="flex items-start justify-start gap-3">
          <button className="flex items-start justify-start gap-2 py-2 px-4 rounded-md border-2 border-red-500 hover:border-red-700 transition duration-300">
            <IoStarOutline className="text-2xl text-red-500" />
            <span style={style}>Like</span>
          </button>
        </div>

        {/* Liked User Avatars */}
        <div className="flex items-start justify-start gap-3">
          {[1, 2, 3, 4].map((like, index) => (
            <div key={index} className="flex items-start justify-start rounded-full border-2 border-gray-300">
              <img
                src="https://i0.wp.com/blog.myptrakar.com/wp-content/uploads/2023/04/WhatsApp.jpg?w=1000&ssl=1"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Like Count */}
      <span style={style} className="text-gray-700 text-start text-xs block mt-3">
        10 Likes
      </span>
    </div>
  );
};

export default LikeWidget;
