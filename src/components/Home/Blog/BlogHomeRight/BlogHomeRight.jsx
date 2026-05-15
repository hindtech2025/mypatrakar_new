import React from "react";

import BlogSection from "./BlogSection";
import CategoriesSection from "./CategoriesSection";
import BlogTags from "./TagCloud";
// import NavMenu from "./NavMenu";

export default function BlogHomeRight() {
  // console.log("dwrtyuiodp][")
  return (
    <div>
      <div className=" ">
        <CategoriesSection />
        <BlogSection />
        {/* <BlogTags /> */}
      </div>
    </div>
  );
}
