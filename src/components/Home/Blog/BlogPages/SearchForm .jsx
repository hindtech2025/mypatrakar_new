// import { useState } from "react";
import React, { useContext } from "react";

import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../../../context/BlogContext";
// import { blogs } from "../Blogs";
// import Blog from "../Blog";
const SearchForm = () => {
  const { blogS } = useContext(BlogContext);
  // const [searchTerm,setSearchTerm]=useState("");
  // const [data,setData]=useState("");
  const navigate = useNavigate();
  let blog;
  const handleChange = (e) => {
    if (e.target.value.trim() !== "") {
      blog = blogS.filter((item) => {
        return Object.values(item).some((value) =>
          value.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    // navigate(`/blog`, { data: blog });

  };
  // /blog/tag/retailbusiness"
  return (
    <div className="py-10 mx-2">
      <div className="mx-auto lg:mx-5 elementor-widget-container shadow-md bg-gray-100 py-10 px-8">
        <form className="flex items-center border rounded-3xl py-2  bg-white  overflow-hidden shadow-sm">
          <input
            type="search"
            name="s"
            placeholder="Search..."
            title="Search"
            onChange={handleChange}
            className="flex-grow rounded-xl pl-3 py-1 outline-none w-full"
          />
          <button
            type="submit"
            title="Search"
            aria-label="Search"
            className="pr-3 py-2 "
            onClick={handleSearch}
          >
            <FaSearch className=" text-gray-500 hover:text-gray-700 " />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
