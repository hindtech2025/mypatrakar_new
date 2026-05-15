import React, { useContext, useEffect, useState } from "react";
import { BlogCategoryId } from "../../../../api";
import { BlogContext } from "../../../../context/BlogContext";
import { FiFolder } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {
  const [blog_categories, setCategories] = useState([]);
  const { setBlog, setCategory } = useContext(BlogContext);
  const [activeCategory, setActiveCategory] = useState(null);
const navigate=useNavigate();
  const blogCategoryId = async () => {
    try {
      const res = await BlogCategoryId();
      setCategories(res.data.response);
    } catch (error) {
      // console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    blogCategoryId();
  }, []);

  const handleCategoryId = (id, categoryName) => {
    setCategory(categoryName);
    setActiveCategory(id);
    setBlog((pre) => ({ ...pre, blog_category_id: id }));
    navigate("/blog-page")
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 w-full">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-1.5 h-7 bg-[#E63946] rounded-full mr-3"></div>
        <h2 className="text-xl font-semibold text-[#1F2937]">Explore Topics</h2>
      </div>

      {/* Category list */}
      <ul className="space-y-3">
        {blog_categories.map((category, index) => {
          const isActive = activeCategory === category.category_id;

          return (
            <li
              key={index}
              onClick={() =>
                handleCategoryId(category.category_id, category.category)
              }
              className={`flex justify-between items-center cursor-pointer transition rounded-2xl px-4 py-3
                ${
                  isActive
                    ? "bg-[#F8FAFC] border border-gray-200 shadow-sm"
                    : ""
                }
              `}
            >
              {/* Left Side: Icon + Name */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border
                    ${
                      isActive
                        ? "bg-[#FEECEC] border-none"
                        : "bg-[#FFF5F5] border-none"
                    }
                  `}
                >
                  <FiFolder className="text-[#E63946] text-xl" />
                </div>

                <span
                  className={`text-[16px] font-medium ${
                    isActive ? "text-[#1F2937]" : "text-[#374151]"
                  }`}
                >
                  {category.category}
                </span>
              </div>

              {/* Count Bubble */}
              {/* <div
                className={`text-[13px] font-semibold px-3 py-1 rounded-xl
                  ${
                    isActive
                      ? "bg-[#F3F4F6] text-[#1F2937]"
                      : "bg-[#F3F4F6] text-[#6B7280]"
                  }
                `}
              >
                {category?.length}
              </div> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesSection;
