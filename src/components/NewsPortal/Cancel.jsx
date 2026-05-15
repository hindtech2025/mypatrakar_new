import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

import React from "react";

export default function Cancel(props) {
  const naviget = useNavigate();
  const handleCancel = () => {
    naviget(-1);
  };
  return (
    <div>
      <div className="bg-red-600 flex items-center justify-start md:gap-5 gap-1  p-3 w-full">
        <span
          className="text-white text-2xl p-2 hover:bg-red-400 rounded-full font-semibold cursor-pointer"
          onClick={handleCancel}
        >
          <RxCross2 className="" />
        </span>
        <p className="text-white font-medium text-lg text-center my-auto">
          {props.text}
        </p>
      </div>
    </div>
  );
}
