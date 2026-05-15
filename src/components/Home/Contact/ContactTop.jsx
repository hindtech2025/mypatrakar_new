import React from "react";
import contactImage from "../../../assets/MPContactImage.png";
import { FiPlay } from "react-icons/fi";
import { FiBookOpen } from "react-icons/fi";

// import { FcVideoCall } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function ContactTop() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex flex-col md:flex-row-reverse  items-center md:items-center md:justify-center mt-20 ">
        <div className="w-full md:w-1/2 p-2 flex mt-0 md:justify-end justify-center ">
          <img
            src={contactImage}
            alt="MyPatrakar Contact"
            className="max-h-[500px] object-cover"
            // loading="lazy"
          />
        </div>
        <div className="w-full lg:w-1/2 p-4 md:float-left float-none">
          <h1 className="text-4xl font-semibold text-black font-sans mb-4 leading-relaxed">
            {t("contact.topHeading")}
          </h1>
          <p className="text-lg mb-8 mt-2">{t("contact.topHeadingDesc")}</p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
  {/* Schedule Demo */}
  <button
    className="
      w-full sm:w-auto
      flex items-center justify-center gap-3
      bg-red-600 hover:bg-red-700
      text-white
      px-6 sm:px-8 py-4
      rounded-2xl
      shadow-lg
      font-semibold
      transition
    "
  >
    <FiPlay className="w-6 h-6 stroke-[2.5]" />
    <span className="whitespace-nowrap">Schedule Demo</span>
  </button>

  {/* Explore Resources */}
  <Link to="/resources-in-my-patrakar" className="w-full sm:w-auto underline-none hover:no-underline">
    <button
      className="
        w-full sm:w-auto
        flex items-center justify-center gap-3
        bg-white hover:bg-gray-100
        text-gray-800
        px-6 sm:px-8 py-4
        rounded-2xl
        shadow-md
        border border-gray-200
        font-semibold
        transition
      "
    >
      <FiBookOpen className="w-6 h-6 stroke-[2.2]" />
      <span className="whitespace-nowrap">
        {t("contact.exploreBtn")}
      </span>
    </button>
  </Link>
</div>
        </div>
      </div>
    </div>
  );
}
