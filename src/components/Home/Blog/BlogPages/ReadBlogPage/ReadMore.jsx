import React, { useContext, useState } from "react";
import BlogContentsection from "./BlogContentsection";
import BlogHomeRight from "../../BlogHomeRight/BlogHomeRight";
import { FaArrowUp } from "react-icons/fa";
import BlogFooter from "../../BlogFooter";
import BlogHomeLeft from "../../BlogHomeLeft/BlogHomeLeft";
import Navbar_2 from "../../../../NavigationBar/NavBarFOrBlog/Navbar_2";
import BreadcrumbComponent from "./Breadcrumb";
import useBreadcrumbs from "./useBreadcrumbs";
import { BlogContext } from "../../../../../context/BlogContext";
import CompleteBlogHeader from "./BlogMetaAndShare";
export default function ReadMore() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const breadcrumbs = useBreadcrumbs();
  const { blog } = useContext(BlogContext);

  // Handle scroll to top functionality
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="  min-h-screen">
      {/* <ReadMoreHeader /> */}
      <header className=" top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm py-3">
        <div className="container mx-auto px-4">
          <Navbar_2 width={"800px"} height={"300px"} />
        </div>
      </header>
      {/* Floating back to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 ">
        <div className="flex flex-col lg:flex-row gap-8 mt-2">
          {/* Main content section */}
          <div className="lg:w-2/3 mb-10 xs:mx-2 xl:mx-12 lg:mx-10 md:mx-10 sm:mx-5">
            <>
              <div className="flex flex-col gap-3">
                {/* Breadcrumb */}
                <BreadcrumbComponent items={breadcrumbs} />

                <button className="py-1 px-4 self-start font-sans rounded-full text-red-600 bg-red-50 font-semibold transition duration-300 hover:bg-red-100">
                  {blog.blog_category}
                </button>

                {/* Blog Title  */}
                <h1 className="text-3xl sm:text-4xl font-sans font-extrabold text-gray-900 mt-2 mb-2 leading-snug">
                  {blog.short_description}
                </h1>

                {/* Author Meta and Share Icons */}
                <CompleteBlogHeader blog={blog} />
              </div>

              {/* Blog Content Section */}
              <div className="mt-8">
                <BlogContentsection />
              </div>
            </>

            <BlogHomeLeft />
          </div>

          {/* Sidebar section */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              <BlogHomeRight />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <BlogFooter />
    </div>
  );
}
