// Updated BlogSection - matching the provided screenshot UI
import React, { useContext, useEffect, useState } from "react";
import { FaRegNewspaper } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FindBlogs } from "../../../../api";
import { BlogContext } from "../../../../context/BlogContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { safeLocalStorage } from "../../../../utils/localStorage";

const BlogSection = () => {
  const navigate = useNavigate();
  const { blog, setBlog, category_id } = useContext(BlogContext);
  const [blogS, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await FindBlogs({
        blog_category: blog.blog_category_id || category_id,
      });
      setBlogs(res.data.response);
    } catch (error) {
      // console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [blog, setBlog, category_id]);

  const handleBlogClick = (blog) => {
    setBlog(blog);
    safeLocalStorage.set("blog", JSON.stringify(blog));
    // localStorage.setItem("blog", JSON.stringify(blog));
    // setBlog({
    //   blog_category: blog.blog_category,
    //   blog_category_id: blog.blog_category_id,
    //   blog_slug: blog.blog_slug,
    //   blog_content: blog.blog_content,
    //   blog_image: blog.blog_image,
    //   blog_tags: blog.blog_tags,
    // });
    navigate(`/blog/${blog.blog_category}/${blog.blog_slug}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="mt-5">
      <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-2 rounded-lg bg-[#d91313]"></div>
          <h1 className="text-2xl font-bold text-gray-900">Recent Articles</h1>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton width={95} height={95} className="rounded-xl" />
                <div className="flex-1">
                  <Skeleton width="70%" />
                  <Skeleton width="50%" />
                  <Skeleton width="40%" height={20} className="mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {blogS.slice(0, 4).map((blog, index) => (
              <article
                key={index}
                className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0 cursor-pointer"
                onClick={() => handleBlogClick(blog)}
              >
                {/* Image */}
                <div className="w-[95px] h-[95px] rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    src={blog.blog_image || "/default-blog.jpg"}
                    alt="Blog Thumbnail"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-start font-sans">
                  <h3 className="text-lg font-bold text-gray-900 hover:text-red-600 leading-tight line-clamp-2">
                    {blog.short_description}
                  </h3>

                  {blog?.date && (
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <FaClock className="mr-2 text-gray-400" />
                      <span>{formatDate(blog.date)}</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
