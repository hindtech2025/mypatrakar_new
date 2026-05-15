import React from "react";

import MyPatrakarLogo from "../../assets/LG1.png";

export default function Logo() {
  return (
    <div className="flex justify-center items-center py-4 mt-1 select-none">
      <img
        src={MyPatrakarLogo}
        alt="MyPatrakar Logo"
        className="w-48 sm:w-48 md:w-48 lg:w-48 xl:w-52 object-contain"
      />
    </div>
  );
}
