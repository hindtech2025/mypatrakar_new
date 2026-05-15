import HtmlToPlainText from "../HtmlToPlainText";
import { useContext } from "react";

import { BlogContext } from "../../../../../context/BlogContext";

const BlogContentsection = () => {
  const { blog } = useContext(BlogContext);
  // console.log(blog);
  // const breadcrumbs = useBreadcrumbs();
  return (
    <section className=" ">
      <div className=" mx-auto ">
        {/* <BreadcrumbComponent items={breadcrumbs} /> */}
        <div className="shadow-lg pb-2 rounded-lg">
          <img
            src={blog.blog_image}
            alt={blog.blog_category}
            className="w-full h-full rounded-lg"
            loading="lazy"
          />
          <p className="text-center py-2 px-3 font-sans">{blog.short_description}</p>
        </div>{" "}
        <div className="my-">
          {/* <h2>{blog.short_description}</h2> */}
          <HtmlToPlainText htmlContent={blog.blog_content} className=" " />
        </div>
        {/* Social Sharing */}
        {/* <SocialSharing />
        <LikeWidget />
        <SocialIcons />
        <AuthorBox />
        <BlogNavigation />
        <CommentSection /> */}
      </div>
    </section>
  );
};
export default BlogContentsection;
