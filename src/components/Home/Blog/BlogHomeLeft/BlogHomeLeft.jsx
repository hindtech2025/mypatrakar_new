import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineArrowRight,
  AiOutlineCalendar,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { FiTag } from "react-icons/fi";
import Pagination from "../Pagination/PagiNation";
import { FindBlogs } from "../../../../api";
import { BlogContext } from "../../../../context/BlogContext";
import { format } from "date-fns";
import HtmlToPlainText from "../BlogPages/HtmlToPlainText";
import { safeLocalStorage } from "../../../../utils/localStorage";

export default function BlogHomeLeft() {
  const navigate = useNavigate();
  const { blog, blogS, setBlogs, setBlog, category_id } =
    useContext(BlogContext);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Changed to 4 items per page for a better example
  const totalPages = Math.ceil(blogS.length / itemsPerPage);

  // Fetch Blogs for the selected category
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const res = await FindBlogs({
          blog_category: blog.blog_category_id || category_id,
        });
        if (res?.data?.response) {
          setBlogs(res.data.response);
        }
      } catch (error) {
        // console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [category_id, blog.blog_category_id, setBlogs]);

  // Handle blog card click
  const handleBlogClick = (blogData) => {
    setBlog(blogData);
    safeLocalStorage.set("blog", JSON.stringify(blogData));
    // localStorage.setItem("blog", JSON.stringify(blogData));
    navigate(`/blog/${blogData.blog_category}/${blogData.blog_slug}`);
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blogS.slice(indexOfFirstItem, indexOfLastItem);

  // Format reading time
  const formatReadingTime = (content) => {
    const wordsPerMinute = 200;
    // Fallback to empty string if content is null/undefined
    const contentString = content || "";
    const wordCount = contentString.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Skeleton loader for cards
  const renderSkeletons = () => {
    return Array(itemsPerPage)
      .fill(0)
      .map((_, index) => (
        <div
          key={index}
          className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer font-sans"
        >
          <div className="animate-pulse">
            <div className=" relative bg-gray-200 w-full h-52 sm:h-64 " >
              <span className="absolute top-4 left-4 bg-white text-[#d91313] text-xs sm:text-[14px] font-bold w-[100px] h-5 rounded-full shadow-md tracking-wide">
                    
                  </span>
            </div>
            <div className="p-5 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="flex gap-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded-xl w-1/3 mt-4"></div>
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      {/* HEADER SECTION */}
      <div className="mb-10 sm:mb-12 lg:mb-16 text-center px-2">
        {/* TOP SMALL HEADING */}
        <p className="text-[#d91313] font-sans text-sm font-bold tracking-wider">
          {blogS[0]?.blog_category}
        </p>

        {/* MAIN HEADING - Adjusted font size for mobile */}
        <h2 className="font-[900] font-sans text-3xl sm:text-[40px] md:text-[48px] leading-tight mt-2">
          <span className="text-black">Latest</span>{" "}
          <span className="bg-gradient-to-r from-[#010e54] to-[#f32c0e] bg-clip-text text-transparent">
            Insights
          </span>
        </h2>

        {/* SUB TEXT */}
        <p className="text-gray-500 tracking-wide mx-auto mt-4 text-sm md:text-lg max-w-3xl font-sans font-medium">
          Discover the latest news, tips, and insights in our collection of
          articles designed to keep you informed.
        </p>
      </div>

      {/* Blog Grid */}
      {isLoading ? (
        // Grid for skeletons - responsive adjustments
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full">
          {renderSkeletons()}
        </div>
      ) : blogS?.length === 0 ? (
        // No articles found state
        <div className="text-center py-16 sm:py-20 border-2 border-dashed border-gray-200 rounded-2xl mx-4">
          {/* Using a simple placeholder for the icon */}
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-100 rounded-full text-3xl text-gray-400">
            📰
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-4">
            No articles found
          </h3>
          <p className="text-gray-600 mt-2">
            We couldn't find any articles for this category.
          </p>
        </div>
      ) : (
        <>
          {/* Main Blog Grid - Adjusted for better responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full">
            {currentBlogs?.map((b, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer font-sans"
                onClick={() => handleBlogClick(b)}
              >
                {/* IMAGE */}
                <div className="relative">
                  {/* Image height adjusted for different screens */}
                  <img
                    src={b?.thumbnail_image}
                    alt={b?.blog_slug}
                    className="w-full h-52 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {/* CATEGORY TAG */}
                  <span className="absolute top-4 left-4 bg-white text-[#d91313] text-xs sm:text-[14px] font-bold px-3 sm:px-4 py-1 rounded-full shadow-md tracking-wide">
                    {b?.blog_category}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-4 sm:p-6 pb-16">
                  {/* DATE + TIME */}
                  {b?.createdAt && (
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-gray-500 text-xs sm:text-[13px] mb-3 font-medium">
                      <span className="flex items-center gap-1">
                        <AiOutlineCalendar className="text-gray-500" />
                        {/* Using date-fns format for consistent formatting */}
                        {format(new Date(b?.createdAt), "MMM dd, yyyy")}
                      </span>

                      <span className="flex items-center gap-1">
                        <AiOutlineClockCircle className="text-gray-500" />
                        {formatReadingTime(b?.blog_content)}
                      </span>
                    </div>
                  )}

                  {/* TITLE */}
                  <h2 className="text-xl sm:text-[22px] leading-snug font-extrabold text-gray-900 line-clamp-2 tracking-normal hover:text-[#d91313] transition-colors duration-200 mb-2">
                    {b?.short_description}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="text-gray-600 text-sm sm:text-[15px] mb-4 sm:mb-6 font-normal">
                    {/* Ensure HtmlToPlainText handles the HTML content correctly */}
                    <HtmlToPlainText
                      htmlContent={b?.blog_content}
                      id={1}
                      contentLength={180} // Reduced length for better card fit
                    />
                  </p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {b?.blog_tags?.split(",").map((tag, i) => (
                      <span
                        key={i}
                        className="flex items-center text-[10px] sm:text-[11px] bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full font-medium"
                      >
                        <FiTag className="mr-1 text-gray-500" /> {tag.trim()}
                      </span>
                    ))}
                  </div>

                  {/* READ ARTICLE BUTTON - fixed position at bottom */}
                  <button className="absolute left-0 right-0 bottom-0 p-4 border-t border-gray-100 bg-white w-full flex items-center text-sm font-semibold text-[#d91313] hover:text-red-700 transition-all">
                    Read Article
                    <AiOutlineArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {blogS?.length > itemsPerPage && (
            <div className="mt-10 sm:mt-12 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
