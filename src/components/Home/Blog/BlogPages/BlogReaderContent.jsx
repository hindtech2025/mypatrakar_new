import { CiUser } from "react-icons/ci";
import React from "react"

import { FaRegCalendarAlt } from "react-icons/fa";
import { GoFileDirectory } from "react-icons/go";
import { BsTag } from "react-icons/bs";
export default function BlogReaderContent({
 
  title,
  blogThumbnail,
  shortDesc,
  date,
  blogType,
}) {
  const style = {
    fontFamily: "Times New Roman",
  };

  return (
    <div className="flex  flex-col items-start justify-start  px-4 lg:px-10 max-w-4xl">
   

      {/* Blog Content */}
      <article className="w-full">
        <section>
          <div className="mb-8">
            <a href=""><h1 className="text-xl lg:text-2xl font-medium  font-Poppins text-gray-900">{title}</h1></a>
          </div>

          {/* Blog Image */}
          {blogThumbnail && (
            <div className="mb-6">
              <img
                src={blogThumbnail}
                alt={title}
                className="w-full h-96  rounded-lg"
                loading="lazy"
              />
            </div>
          )}

          {/* Blog Description */}
          <p
            className="text-base lg:text-lg leading-relaxed text-gray-500"
            style={style}
          >
            {shortDesc}...
          </p>
        </section>

        {/* Blog Metadata */}
        <section className="mt-8">
          <div className="flex items-center justify-center md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 text-sm lg:text-base">
            <div className="flex items-center justify-center gap-3">
              <CiUser />
              <span style={style} className="text-gray-500 text-md">
                MyPatrakar
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <FaRegCalendarAlt />

              <span className="text-sm text-gray-900" style={style}>
                <a href="">{date}</a>
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <GoFileDirectory />
              <span className="text-sm text-gray-900" style={style}>
                <a href="">{blogType}</a>
              </span>
            </div>
          </div>
        </section>
      </article>

      {/* Additional Content Section */}
      <section className="flex items-center justify-center mt-10">
        <div className="flex  items-start justify-center gap-4">
          <BsTag />
          <div
            className="flex flex-wrap items-start justify-start gap-1 text-md"
            style={style}
          >
            {/* Additional elements can go here border*/}
            <a href="" className="border-b border-gray-500 hover:border-none">
              links,
            </a>
            <a href="" className="border-b border-gray-500 hover:border-none">
              links,
            </a>
            <a href="" className="border-b border-gray-500 hover:border-none">
              links,
            </a>
            <a href="" className="border-b border-gray-500 hover:border-none">
              links,
            </a>
            <a href="" className="border-b border-gray-500 hover:border-none">
              links,
            </a>
            <a href="" className="border-b border-gray-500 hover:border-none">
              links,
            </a>{" "}
            <a href="" className="border-b border-gray-500 hover:border-none">
              links,
            </a>
            <a href="" className="border-b border-gray-500 hover:border-none">
              links,
            </a>
            <a href="" className="border-b border-gray-500 hover:border-none">
              links,
            </a>
            <a href="" className="border-b border-gray-500 hover:border-none">
              links,
            </a>
            <a href="" className="border-b border-gray-500 hover:border-none">
            links,   links,   links,   links,   links,   links,   links,
            links,
            </a>
            <a href="" className="border-b border-gray-500 hover:border-none">
            links,   links,   links,   links,   links,   links,   links,
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}



