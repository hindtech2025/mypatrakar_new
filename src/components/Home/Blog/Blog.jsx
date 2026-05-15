import { useContext, useEffect, useState, useCallback } from "react";
import Navbar_2 from "../../NavigationBar/NavBarFOrBlog/Navbar_2";
import BlogHomeLeft from "./BlogHomeLeft/BlogHomeLeft";
import BlogHomeRight from "./BlogHomeRight/BlogHomeRight";
import { BlogCategoryId } from "../../../api";
// import { BlogContext } from "../../../context/BlogContext";
import BlogFooter from "./BlogFooter";
import { Helmet } from "react-helmet-async";
// import ErrorBoundary from "../../ErrorBoundary";
// import LoadingSpinner from "../../LoadingSpinner";

export default function Blog() {
  // console.log("object");
  // const { setCategory, setCategoryId } = useContext(BlogContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cat,setCat]=useState([]) 
// console.log("object1");
  const fetchBlogCategory = async () => {
// console.log("object2")

    try {
      setLoading(true);
// console.log("object3")

      const res = await BlogCategoryId();
// console.log("object4")

      // console.log(res);
      setCat(res.data?.response)
      // if (res.data?.response) {
      //   setCategory(res.data?.response[0]?.category);
      //   setCategoryId(res.data?.response[0]?.category_id);
      // }
    } catch (err) {
      // console.log("Failed to fetch blog categories:", err);
      setError("Failed to load blog categories. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogCategory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {/* <LoadingSpinner /> */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    // <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
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
          <meta property="og:title" content="MyPatrakar Blog - Journalism Insights" />
          <meta property="og:description" content="Latest news and journalism insights" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={window.location.href} />
          <link rel="canonical" href={window.location.href} />
        </Helmet>

        {/* Navbar */}
        <header className="flex items-center justify-center mt-5 select-none">
          <Navbar_2 width={"800px"} height={"300px"} mb={40} />
        </header>

        {/* Blog Content */}
        <main className="flex-grow">
          <div className="flex flex-col max-w-6xl lg:flex-row items-start justify-center gap-6 my-10 lg:mx-auto px-4">
            {/* BlogHomeLeft Component */}
            <div className="w-full lg:w-2/3">
              <BlogHomeLeft />
            </div>
            
            {/* BlogHomeRight Component */}
            <div className="w-full lg:w-1/3">
              <BlogHomeRight />
            </div>
          </div>
        </main>

        <BlogFooter />
      </div>
    // </ErrorBoundary>
  );
}