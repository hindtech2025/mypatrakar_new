// import Navbar_2 from '../../../NavigationBar/NavBarFOrBlog/Navbar_2';
// import BlogFooter from '../BlogFooter';
// import React from "react"

// // import { blogs } from '../Blogs';
// import Pagination from '../Pagination/PagiNation';
// import BlogReaderContent from './BlogReaderContent';
// import { useParams } from 'react-router-dom';

// export default function BlogReaderPage() {
//   const { tagName } = useParams();
// const style={
//   fontFamily:'Times New Roman'
// }

//   // Blog data variables
//   // let blogType, shortDesc, blogHeading, date;
// // const filtredBlog=blogs.filter(blog=>blog.tagName===tagName);

//   // Conditional data assignment based on `tagName`
//   // if (tagName === 'technology') {
//   //   shortDesc = 'Technology is rapidly evolving, with groundbreaking advancements shaping our future.Technology is rapidly evolving, with groundbreaking advancements shaping our future.Technology is rapidly evolving, with groundbreaking advancements shaping our future.';
//   //   // blogImage = 'https://example.com/tech-image.jpg';
//   //   blogHeading = 'The Future of Technology';
//   //   date = 'October 23, 2024';
//   //   blogType = 'Technology';
//   // }

//   return (
//     <div className="w-full">
//       {/* Navbar */}
//       <Navbar_2 height={'250px'} width={'700px'} mb={0} />

//       {/* Main Blog Content Wrapper */}
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
//           {/* Tag Section */}
//       <div className="mb-20 w-full text-left text-lg lg:text-2xl ">
//         <span
//           style={style}
//           className="capitalize text-gray-600 text-lg lg:text-3xl"
//         >
//           Tag:{" "}
//         </span>
//         <span
//           style={style}
//           className="capitalize text-gray-600 text-lg lg:text-3xl"
//         >
//           {tagName}
//         </span>
//       </div>
//       {/* {
//         filtredBlog.map((blog,i)=>( <div key={i} className=" mb-20">
//           <BlogReaderContent
//             tagName={tagName}
//             title={blog.title}
//             blogThumbnail={blog.blogThumbnail}
//             shortDesc={blog.shortDesc}
//             date={blog.date}
//             blogType={blog.blogType}
//           />

//         </div>))
//       } */}
//      <div className='flex items-start'>
//      <Pagination />
//      </div>
//    <BlogFooter/>
//       </div>
//     </div>
//   );
// }





import Navbar_2 from '../../../NavigationBar/NavBarFOrBlog/Navbar_2';
import BlogFooter from '../BlogFooter';
import React, { useState } from "react";
import Pagination from '../Pagination/PagiNation';
import { useParams } from 'react-router-dom';
import { FaShareAlt, FaBookmark, FaHeart, FaRegHeart, FaRegBookmark, FaArrowLeft } from 'react-icons/fa';
import { FiClock, FiUser, FiTag } from 'react-icons/fi';

export default function BlogReaderPage() {
  const { tagName } = useParams();
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, name: "Sarah Johnson", avatar: "", content: "This article provided valuable insights. I particularly appreciated the section on responsive design best practices.", time: "2 hours ago" },
    { id: 2, name: "Michael Chen", avatar: "", content: "Could you elaborate more on the performance optimization techniques? Great read overall!", time: "5 hours ago" }
  ]);
  
  // Mock blog data - replace with your actual data source
  const blogData = {
    title: "The Future of Web Development: Trends to Watch in 2024",
    shortDesc: "As we move further into the digital age, web development continues to evolve at a rapid pace. This article explores the key trends that will shape the future of web development.",
    content: `<p>The landscape of web development is constantly shifting, with new technologies emerging and existing ones maturing at an unprecedented rate. In 2024, we're seeing several key trends that are reshaping how developers build for the web.</p>
      
      <h2>AI-Powered Development</h2>
      <p>Artificial Intelligence is no longer just a buzzword - it's becoming an integral part of the development workflow. From automated code generation to intelligent debugging tools, AI is helping developers work more efficiently.</p>
      
      <h2>WebAssembly Adoption</h2>
      <p>WebAssembly continues to gain traction, enabling near-native performance for web applications. This technology is particularly valuable for complex applications like video editors, 3D modeling tools, and games.</p>
      
      <h2>Progressive Web Apps (PWAs)</h2>
      <p>The line between web and native apps continues to blur with Progressive Web Apps. Offering offline capabilities, push notifications, and app-like experiences, PWAs are becoming the preferred solution for many businesses.</p>
      
      <h2>Serverless Architecture</h2>
      <p>Serverless computing is revolutionizing backend development, allowing developers to focus on writing code without worrying about infrastructure management.</p>
      
      <h2>Conclusion</h2>
      <p>As we look ahead, the web development landscape promises exciting innovations. Staying current with these trends will be crucial for developers who want to build cutting-edge web experiences.</p>`,
    date: "May 15, 2024",
    readTime: "8 min read",
    author: {
      name: "Alex Thompson",
      role: "Senior Web Developer",
      bio: "With over 10 years of experience in web development, Alex specializes in modern JavaScript frameworks and performance optimization."
    },
    tags: ["web development", "technology", "trends", "programming"]
  };

  const relatedArticles = [
    { id: 1, title: "Mastering React Performance Optimization", tag: "react", date: "Apr 28, 2024", readTime: "6 min read" },
    { id: 2, title: "CSS Grid vs Flexbox: When to Use Which", tag: "css", date: "Apr 20, 2024", readTime: "5 min read" },
    { id: 3, title: "Building Accessible Web Applications", tag: "accessibility", date: "Apr 12, 2024", readTime: "7 min read" },
    { id: 4, title: "The State of JavaScript 2024", tag: "javascript", date: "Apr 5, 2024", readTime: "9 min read" }
  ];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') return;
    
    const newComment = {
      id: comments.length + 1,
      name: "You",
      avatar: "",
      content: comment,
      time: "Just now"
    };
    
    setComments([newComment, ...comments]);
    setComment('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar_2 height={'250px'} width={'700px'} mb={0} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <a 
            href="#" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft className="mr-2" /> Back to articles
          </a>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Featured Image */}
              <div className="h-80 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl font-bold mb-4">{blogData.title}</h1>
                  <div className="flex flex-wrap justify-center items-center gap-4">
                    <div className="flex items-center">
                      <FiUser className="mr-2" />
                      <span>{blogData.author.name}</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="mr-2" />
                      <span>{blogData.date} • {blogData.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Article Content */}
              <div className="p-6 md:p-8">
                <div className="mb-8">
                  <p className="text-xl text-gray-700 italic mb-8">{blogData.shortDesc}</p>
                  
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: blogData.content }}
                  />
                </div>
                
                {/* Tags */}
                <div className="mb-8 pt-4 border-t border-gray-200">
                  <div className="flex items-center mb-4">
                    <FiTag className="text-gray-500 mr-2 text-xl" />
                    <h3 className="text-lg font-semibold">Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blogData.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 py-6 border-t border-gray-200">
                  <button 
                    className={`flex items-center px-4 py-2 rounded-lg ${liked ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'} transition-colors`}
                    onClick={() => setLiked(!liked)}
                  >
                    {liked ? <FaHeart className="mr-2" /> : <FaRegHeart className="mr-2" />}
                    {liked ? 'Liked' : 'Like'}
                  </button>
                  
                  <button 
                    className={`flex items-center px-4 py-2 rounded-lg ${bookmarked ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-700'} transition-colors`}
                    onClick={() => setBookmarked(!bookmarked)}
                  >
                    {bookmarked ? <FaBookmark className="mr-2" /> : <FaRegBookmark className="mr-2" />}
                    {bookmarked ? 'Saved' : 'Save'}
                  </button>
                  
                  <div className="relative">
                    <button 
                      className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg transition-colors hover:bg-gray-200"
                      onClick={() => setShareOpen(!shareOpen)}
                    >
                      <FaShareAlt className="mr-2" /> Share
                    </button>
                    {shareOpen && (
                      <div className="absolute z-10 bottom-full left-0 mb-2 w-48 bg-white rounded-lg shadow-lg p-3">
                        <h4 className="text-sm font-medium mb-2">Share via</h4>
                        <div className="flex justify-between">
                          {['Twitter', 'Facebook', 'LinkedIn', 'Copy'].map((platform) => (
                            <button 
                              key={platform}
                              className="text-gray-600 hover:text-indigo-600"
                              aria-label={`Share on ${platform}`}
                            >
                              {platform}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Author Bio */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16 mr-4" />
                    <div>
                      <h3 className="text-xl font-bold">{blogData.author.name}</h3>
                      <p className="text-gray-600">{blogData.author.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{blogData.author.bio}</p>
                </div>
                
                {/* Comments Section */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
                  
                  <form onSubmit={handleCommentSubmit} className="mb-8">
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-200 border-2 border-dashed rounded-full w-12 h-12 flex-shrink-0" />
                      <div className="flex-grow">
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Share your thoughts..."
                          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          rows={3}
                        />
                        <div className="flex justify-end mt-2">
                          <button 
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                            disabled={!comment.trim()}
                          >
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-4">
                        <div className="bg-gray-200 border-2 border-dashed rounded-full w-12 h-12 flex-shrink-0" />
                        <div className="bg-gray-50 rounded-xl p-4 flex-grow">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold">{comment.name}</h4>
                            <span className="text-sm text-gray-500">{comment.time}</span>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Pagination */}
                <div className="py-6 border-t border-gray-200">
                  <Pagination />
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-8">
              {/* About Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">About This Blog</h3>
                <p className="text-gray-600 mb-4">
                  We explore the latest trends in web development, design, and technology. 
                  Our mission is to help developers stay current in this rapidly evolving field.
                </p>
                <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                  Subscribe to Newsletter
                </button>
              </div>
              
              {/* Related Articles */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map((article) => (
                    <a 
                      key={article.id}
                      href="#"
                      className="block group"
                    >
                      <div className="flex items-start">
                        <div className="bg-gray-200 border-2 border-dashed rounded-lg w-16 h-16 flex-shrink-0 mr-4" />
                        <div>
                          <h4 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                            {article.title}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span>{article.date}</span>
                            <span className="mx-2">•</span>
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Popular Tags */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['react', 'javascript', 'css', 'webdev', 'design', 'accessibility', 'performance', 'typescript'].map((tag) => (
                    <a
                      key={tag}
                      href="#"
                      className={`px-3 py-1 rounded-full text-sm font-medium ${tag === tagName ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BlogFooter />
    </div>
  );
}