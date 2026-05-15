// import NavLinks from "./NavLinks"
import React from "react";

import Navlinks_2 from "./Navlinks_2";
import myPatrakar from "../../../assets/LG1.png";
import { Link } from "react-router-dom";

export default function NavBar({ height, width, mb }) {
  return (
    <div>
      <header className="flex items-center justify-center ">
        <Navlinks_2 />
     
      </header>
      {/* Image Container */}
      <div className={`flex items-center justify-center mb-${mb} w-full my-1 sm:my-2 md:my-5 lg:my-5 `}>
       <Link to={"/"}>
       
        <img
          src={myPatrakar}
          alt={"myPatrakar Logo"}
          style={{
            width: width, // Should be less than or equal to the native width
            height: "auto", // Maintain aspect ratio
            objectFit: "contain",
          }}
        />
       </Link>
      </div>
    </div>
  );
}
