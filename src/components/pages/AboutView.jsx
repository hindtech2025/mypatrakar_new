import { FaCheckCircle } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

export default function AboutView({
  image,
  btn1,
  btn2,
  play,
  headding,
  para,
  option,
  width,
}) {
  return (
    <div className="mx-auto max-w-6xl p-4 rounded">
      <div className=" flex flex-col lg:flex-row justify-between w-full bg-red-600 text-white p-10">
        <section className="lg:w-1/2 w-full mb-8 lg:mb-0">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-4">
            {headding}
          </h1>
          <p className="text-base lg:text-lg font-medium mb-4">{para}</p>
          <div className="flex items-center gap-3 mb-4">
            <FaCheckCircle className="text-lg" />
            <p className="text-base lg:text-lg font-medium">{option}</p>
          </div>
          {btn1 && btn2 && (
            <div className="flex flex-col lg:flex-row mt-5 items-center lg:items-start gap-5">
              <Link to={"/product/website"}>
                <button className="px-5 py-2 border-2 rounded-full text-white w-full lg:w-auto">
                  {btn1}
                </button>
              </Link>
              <Link to={"/product/app"} className="hover:no-underline focus:no-underline">
                <button className="px-5 py-2 border-2 rounded-full text-white w-full lg:w-auto">
                  {btn2}
                </button>
              </Link>
            </div>
          )}
          {play && (
            <button>
              <img
                src={play}
                alt="play store button"
                className="mt-5 w-40 lg:w-auto"
                loading="lazy"
              />
            </button>
          )}
        </section>
        <section className="flex items-center justify-center lg:w-1/2 w-full">
          <img
            src={image}
            alt=""
            className={`md:w-${width} w-2/3 h-auto lg:max-w-md rounded-lg shadow-md`}
            loading="lazy"
          />
        </section>
      </div>
    </div>
  );
}
