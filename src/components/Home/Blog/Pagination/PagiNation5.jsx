// import Prev from "./Prev";
import React from "react"

export default function Pagination() {
 
  return (
    <nav
      className="flex items-center justify-center mx-auto lg:space-x-2 space-x-1"
      role="navigation"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <a
        href=""
        className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition"
        // onClick={handlePreviousBlogs}
      >
           «<span className="lg:flex hidden">  Previous</span>
      </a>
      {/* Page Numbers */}
      <a
        href=""
        className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition"
      >
        <span className="sr-only">Page</span>1
      </a>
    <a href="">
    <span
        aria-current="page"
        className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100  rounded-md"
      >
        <span className="sr-only">Page</span>2
      </span>
    </a>
      <a
        href=""
        className=" lg:block hidden px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition"
      >
        <span className="sr-only lg:block hidden">Page</span>3
      </a>
      <a
        href=""
        className="lg:block hidden px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition"
      >
        <span className="sr-only">Page</span>4
      </a>

      {/* Dots */}
      <span className="px-3 py-1 text-gray-500">…</span>

      {/* Last Page */}
      <a
        href=""
        className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition"
      >
        <span className="sr-only">Page</span>10
      </a>

      {/* Next Button */}
      <a
        href=""
        className="px-3 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition"
      >
       <span className="lg:flex hidden"> Next</span> »
      </a>
    </nav>
  );
}
