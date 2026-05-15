import  { useState } from 'react';
import React from "react"

// import { blogs } from '../Blogs';

const Prev = () => {
  const [history, setHistory] = useState([]); // Stores previously visited pages
  const [currentPage, setCurrentPage] = useState(1); // Current blog page
//   const [blogPerPage, setBlogPerPage] = useState(4); // Current blog page
//   const lastBlogIndex=currentPage*blogPerPage;
//   const firstBlogIndex=lastBlogIndex-blogPerPage;
//   let blog=blogs.slice(firstBlogIndex,lastBlogIndex);

  const blogPages = [];

  const navigateToPage = (page) => {
    setHistory((prev) => [...prev, currentPage]); // Save current page to history
    setCurrentPage(page); // Set new page
  };

  const handlePrevious = () => {
    if (history.length > 0) {
      const previousPage = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1)); // Remove the last history item
      setCurrentPage(previousPage); // Set the previous page as current
    }
  };

  return (
    <div>
      <h1>{currentPage}</h1>

      <div>
        {blogPages.map((blog) => (
          <button 
            key={blog} 
            onClick={() => navigateToPage(blog)}
            disabled={blog === currentPage}
          >
            {blog}
          </button>
        ))}
      </div>

      <button onClick={handlePrevious} disabled={history.length === 0}>
        Previous
      </button>
    </div>
  );
};

export default Prev;
