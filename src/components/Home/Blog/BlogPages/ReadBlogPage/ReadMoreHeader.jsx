import React, { useContext } from "react";
import { BlogContext } from "../../../../../context/BlogContext";
import myPatrakar from "../../../../../assets/LG1.png";

const ReadMoreHeader = ({ width="800px", height="300px",mb="0"}) => {
  const { blog } = useContext(BlogContext);
  // console.log(blog.title)

  return (
    <section className="w-full bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div
            className={`flex items-center justify-center mb-${mb} w-full my-1 sm:my-2 md:my-5 lg:my-5 `}
          >
            <img
              src={myPatrakar}
              alt={"myPatrakar Logo"}
              style={{
                width: width, // Should be less than or equal to the native width
                height: "auto", // Maintain aspect ratio
                objectFit: "contain",
              }}
            />
          </div>
          {/* <p className="text-gray-600 text-lg mb-2">{blog.blog_category}</p>
          <hr className="w-1/4 border-t border-gray-300 mb-" /> */}
        </div>
      </div>
    </section>
  );
};
export default ReadMoreHeader;
