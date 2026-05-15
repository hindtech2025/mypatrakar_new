import { useContext, useEffect, useState } from "react";
import Navbar_2 from "../../NavigationBar/NavBarFOrBlog/Navbar_2";
import BlogHomeLeft from "./BlogHomeLeft/BlogHomeLeft";
import BlogHomeRight from "./BlogHomeRight/BlogHomeRight";
import { BlogCategoryId } from "../../../api";
import { BlogContext } from "../../../context/BlogContext";
import BlogFooter from "./BlogFooter";
import { Helmet } from "react-helmet-async";
// import LoadingSpinner from "../../LoadingSpinner";
import { FiRefreshCw } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";

export default function BlogHome() {
  const { setCategory, setCategoryId } = useContext(BlogContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cat, setCat] = useState([]);

  const fetchBlogCategory = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await BlogCategoryId();
      // console.log(res);
      setCat(res.data?.response || []);

      if (res.data?.response?.length > 0) {
        setCategory(res.data.response[0]?.category);
        setCategoryId(res.data.response[0]?.category_id);
      }
    } catch (err) {
      // console.error("Failed to fetch blog categories:", err);
      setError("Failed to load blog content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogCategory();
  }, []);

  if (error && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-5xl text-red-500 mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchBlogCategory}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <FiRefreshCw className="animate-spin" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog | MyPatrakar - Latest News & Journalism Insights</title>
        <meta
          name="description"
          content="Stay updated with the latest news, trends, and insights in journalism and digital news portals. Read expert articles on MyPatrakar's blog."
        />
        <meta
          name="keywords"
          content="MyPatrakar blog, journalism tips, news portal insights, digital media, news website trends, journalist tools"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="MyPatrakar Blog - Journalism Insights"
        />
        <meta
          property="og:description"
          content="Latest news and journalism insights"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <header className=" top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm py-3">
        <div className="container mx-auto px-4">
          <Navbar_2 width={"800px"} height={"300px"} />
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Sticky Navbar */}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 z-40 bg-white/80 flex flex-col items-center justify-center">
            <FaCircle size={16} />
            <p className="mt-4 text-lg text-gray-600 font-medium animate-pulse">
              Loading Blog Content...
            </p>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-grow transition-opacity duration-300">
          <div className=" mx-auto px-4 py-8">
            {/* Featured Banner */}
            {/* <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 mb-10 text-white shadow-xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">MyPatrakar Blog</h1>
              <p className="text-lg max-w-2xl opacity-90">
                Insights, trends and expert opinions on journalism and digital media
              </p>
            </div> */}

            {/* Content Grid */}
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-2/3">
                <BlogHomeLeft />
              </div>

              <div className="w-full lg:w-1/3">
                <div className="sticky top-24">
                  <BlogHomeRight />
                </div>
              </div>
            </div>
          </div>
        </main>

        <BlogFooter />
      </div>
    </>
  );
}
