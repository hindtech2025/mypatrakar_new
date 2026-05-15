import React from "react";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import {
  faFileAlt,
  faQuestionCircle,
  faShieldAlt,
  faTruck,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import OpenAi from "../../../assets/footer/OpenAI-Logo-2022.png";
import finance from "../../../assets/footer/Ministry_of_Finance_India.svg";

export default function UseFullLinks() {
  const { t } = useTranslation();

  const links = [
    {
      href: "/terms-and-conditions",
      icon: faFileAlt,
      text: t("footer.bottom.termsAndConditions"),
    },
    {
      href: "/privacy-policy",
      icon: faShieldAlt,
      text: t("footer.bottom.privacyPolicy"),
    },
    {
      href: "/shipping-and-delivery",
      icon: faTruck,
      text: "Shipping & Delivery",
    },
    {
      href: "/cancellation-and-refund-policy",
      icon: faUndo,
      text: "Refund Policy",
    },
    {
      href: "/resources-in-my-patrakar",
      icon: faQuestionCircle,
      text: "FAQ",
    },
  ];

  return (
    <div className="">
      {/* Useful Links */}
      <h4 className="text-2xl text-red-500 font-extrabold mb-4">
        {t("footer.bottom.heading1")}
      </h4>

      <ul className="space-y-3">
        {links.map((item, index) => (
          <li
            key={index}
            
          >
            <Link
              to={item.href}
              className="flex items-center gap-2 text-white hover:text-red-500 transition focus:text-red-500"
            >
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col  items-start md:items-start justify-between gap-6">
        {/* Powered by OpenAI */}
        <div className="flex flex-col gap-2">
          <p className="text-white font-bold text-lg sm:text-base">Powered By OpenAI</p>

          <div className="bg-white w-60 sm:w-48 h-20 sm:h-14  rounded-lg overflow-hidden shadow-md">
            <img
              src={OpenAi}
              alt="Powered By OpenAI"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Approved By Ministry of Finance */}
        <div className="flex flex-col gap-2">
          <p className="text-white font-bold text-lg sm:text-base">
            Approved by Ministry of Finance
          </p>

          <div className="bg-white w-60 sm:w-48 h-20 sm:h-14 rounded-lg overflow-hidden shadow-md">
            <img
              src={finance}
              alt="Approved by Ministry of Finance"
              className="w-full h-full object-contain p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
