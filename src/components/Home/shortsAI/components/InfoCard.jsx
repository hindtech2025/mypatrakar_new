import React from "react";

export default function InfoCard({ icon, title, description }) {
  return (
    <div className="bg-white border w-[320px] h-[290px] rounded-xl shadow-sm px-[5px] pt-10 text-center justify-start flex flex-col items-center hover:shadow-md transition">
      <div className="">
        <img src={icon} alt={title} className=""/>
      </div>
      <h3 className="font-extrabold text-[17.54px] font-sans text-[#16274E] mb-1">{title}</h3>
      <p className="text-[15.77px] font-sans text-[#475569]">{description}</p>
    </div>
  );
}
