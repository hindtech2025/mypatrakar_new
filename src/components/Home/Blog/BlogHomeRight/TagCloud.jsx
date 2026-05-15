// import { Link, useNavigate } from "react-router-dom";
// import React, { useContext } from "react";
// import { BlogContext } from "../../../../context/BlogContext";
// import { FaTag } from "react-icons/fa";

// export default function BlogTags() {
//   const { blogS, setBlog } = useContext(BlogContext);
//   const navigate = useNavigate();

//   const style = {
//     fontFamily: "Times New Roman",
//   };
//   const handleNavigate = (blog, category, slug) => {
//     setBlog(blog);
//     navigate(`/blog/category/${category}/${slug}`);
//   };

//   return (
//     <div className="mx-">
//       <div className="my-10 mx-3">
//         <h1 className="text-left text-lg font-bold">
//           <FaTag className="text-xl text-red-600 mr-2 mt-1 inline-block w-7" />
//           Tags
//         </h1>
//       </div>
//       <div className="flex flex-wrap items-start justify-start gap-4 mx-3">
//         {blogS?.map((tag, index) => (
//           <div key={index} className="text-xs">
//             <button
//               onClick={() =>
//                 handleNavigate(tag, tag.blog_category, tag.blog_slug)
//               }
//               // to={`/blog/category/${tag.blog_category}/${tag.blog_slug}`}
//               className="hover:no-underline focus:no-underline text-gray-800 hover:text-red-500 focus:text-red-600 font-medium"
//             >
//               {tag.blog_tags}{" "}
//               <span className="text-sm text-red-500 font-bold">
//                 ({index + 1})
//               </span>
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlogContext } from "../../../../context/BlogContext";
import { FaTag, FaTimes } from "react-icons/fa";

export default function BlogTags() {
  const { blog,blogS } = useContext(BlogContext);
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Extract and count unique tags
  useEffect(() => {
    if (!blogS || blogS.length === 0) return;
    
    const tagMap = new Map();
    
    blogS.forEach(blog => {
      if (blog.blog_tags) {
        const tags = blog.blog_tags.split(",").map(tag => tag.trim());
        
        tags.forEach(tag => {
          if (tag) {
            tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
          }
        });
      }
    });
    
    // Convert to array and sort by count
    const sortedTags = Array.from(tagMap.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
    
    setAllTags(sortedTags);
  }, [blogS]);

  const handleTagClick = (tag) => {
    setActiveTag(tag === activeTag ? null : tag);
    // In a real implementation, you would filter blogs by this tag
    // console.log(`Filtering by tag: ${tag}`);
  };
  const filteredTags = allTags.filter(tagObj => 
    tagObj.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaTag className="text-red-500 mr-3 text-xl" />
          Popular Tags
        </h2>
        
        <div className="relative w-48">
          <input
            type="text"
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {filteredTags.length > 0 ? (
          filteredTags.map(({ tag, count }, index) => (
            <button
              key={index}
              onClick={() => handleTagClick(tag)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                flex items-center
                ${
                  activeTag === tag
                    ? "bg-red-500 text-white shadow-lg transform -translate-y-0.5"
                    : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600"
                }
              `}
            >
              <span>#{tag}</span>
              <span className="ml-2 bg-white bg-opacity-20 px-2 py-0.5 rounded-full">
                {count}
              </span>
            </button>
          ))
        ) : (
          <div className="text-gray-500 text-center w-full py-4">
            No tags found. Try a different search term.
          </div>
        )}
      </div>

      <div className="mt-6 pt-5 border-t border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Tag Tips</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-start">
            <span className="text-red-500 mr-2">•</span>
            Click on tags to filter blog content
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-2">•</span>
            Larger tags have more articles
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-2">•</span>
            Search for specific topics
          </li>
        </ul>
      </div>
    </div>
  );
}