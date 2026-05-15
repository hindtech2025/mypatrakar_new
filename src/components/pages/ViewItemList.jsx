import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function ViewItemList({
  view,
  width = "100%",
  height = "auto",
}) {
  const url = useLocation();
  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-12 my-20 tracking-wide">
      {view.map((feature, index) => (
        <div
          key={index}
          className={`flex flex-col lg:flex-row items-center mb-20 gap-12 ${
            index % 2 ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text Section */}
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <h2 className="text-4xl text-start font-bold text-red-600 uppercase tracking-wider">
              {feature.sn}
            </h2>
            <h3 className="text-5xl font-extrabold text-start text-gray-900 leading-tight">
              {feature.heading}
            </h3>
            <p className="text-lg text-gray-700 text-start ml-0 leading-relaxed max-w-prose mx-auto lg:mx-0">
              {feature.description}
            </p>
            <ul className="space-y-4">
              {feature.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-4 text-start">
                  <FaCheckCircle className="text-green-500 mt-1 text-2xl w-5 h-5" />
                  <p className="text-md text-gray-700">{feat}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center">
            <div
              className={
                url.pathname === "/product/app"
                  ? "mx-auto w-[260px] sm:w-[300px] aspect-[9/18] rounded-[40px] p-3 bg-black shadow-xl 700 relative"
                  : "group"
              }
            >
              {/* Mobile Notch */}
              {/* {url.pathname === "/product/app" && (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[24px] bg-black rounded-b-2xl"></div>
  )} */}

              <img
                src={feature.image}
                alt={feature.heading}
                className="w-full h-full object-cover rounded-[32px]"
                style={{
                  width: url.pathname === "/product/app" ? "100%" : width,
                  height: url.pathname === "/product/app" ? "100%" : height,
                }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
