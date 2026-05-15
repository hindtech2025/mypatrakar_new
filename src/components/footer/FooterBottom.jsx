import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAslInterpreting,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import {
  faPaperPlane,
  faGlobe,
  faCalendarAlt,
  faUndo,
  faTruck,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faQuestionCircle,
  faFileAlt,
} from "@fortawesome/free-regular-svg-icons";

import DemoCallCard from "../Home/ScheduleDemo/DemoCallCard";
import { useTranslation } from "react-i18next";
import LinksComponent from "./LinksComponent ";
export default function FooterBottom() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    // setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    navigate("/signup");
  };

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
    // {
    //   text: "Internship",
    //   icon: faAslInterpreting,
    //   subLink: [
    //     {
    //       to: "/register",
    //       icon: faAslInterpreting,
    //       text: "Register",
    //     },
    //     {
    //       to: "/download-certificate",
    //       icon: faAslInterpreting,
    //       text: "Download Certificate",
    //     },
    //   ],
    // },
  ];

  const footerLinks = [
    {
      to: "/product/website",
      icon: faGlobe,
      text: t("menu.product.website"),
    },
    {
      to: "/product/app",
      icon: faMobileAlt,
      text: t("menu.product.app"),
    },
    {
      to: "/pricing-in-my-patrakar",
      icon: faTags,
      text: t("menu.price"),
    },
    {
      to: "/schedule/demo",
      icon: faCalendarAlt,
      text: "Schedule Demo",
    },
    {
      to: "/resources-in-my-patrakar",
      icon: faQuestionCircle,
      text: "FAQ",
    },
    {
      to: "/blog-page",
      icon: faPenNib,
      text: t("menu.blog"),
    },
    {
      to: "/contact",
      icon: faEnvelope,
      text: t("menu.contact"),
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full lg:px-5 pt-5 px-3 mx-auto gap-4">
      <div className="w-full  text-white px-7 ">
        {/* Header */}

        {/* Useful Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div>
            <h4 className="text-lg font-bold mb-4">
              {" "}
              {t("footer.bottom.heading1")}
            </h4>
            {/* <ul className="space-y-3">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white hover:text-red-400 transition-colors"
                  >
                    <FontAwesomeIcon icon={link.icon} className="w-5" />
                    {link.text}
                  </a>
                  {link.text === "internship" &&
                    link.subLink?.map((sublink, subIndex) => (
                      <a
                        key={subIndex}
                        href={sublink.to}
                        className="block text-gray-300 hover:text-white pl-6"
                      >
                        {sublink.text}
                      </a>
                    ))}
                </li>
              ))}
            </ul> */}
            <LinksComponent links={links} />
          </div>

          {/* Footer Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-4">
              {" "}
              {t("footer.bottom.navigation")}
            </h4>
            <div className="space-y-3">
              {footerLinks.map((item, index) =>
                item.to == "/schedule/demo" ? (
                  <div
                    key={index}
                    className="flex items-center justify-start gap-3"
                  >
                    <span>
                      {" "}
                      <FontAwesomeIcon icon={item.icon} className="w-5" />
                    </span>

                    <span>
                      <DemoCallCard className="" />
                    </span>
                  </div>
                ) : (
                  <Link
                    key={index}
                    to={item.to}
                    className="flex items-center gap-3 text-white hover:text-red-400 transition-colors"
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-5" />
                    {item.text}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Subscription Form
          <div>
            <section className=" flex items-center justify-end text-end mb-10">
              <div className="text-center">
                <h2 className="md:text-2xl text-xl font-bold mb-3">
                  {" "}
                  {t("footer.bottom.heading2")}
                </h2>
                <p className="text-gray-400 md:text-sm text- md:px-5 px-2 tracking-wide">
                  {t("footer.bottom.headingDesc")}
                </p>
              </div>
            </section>
            <h4 className="text-lg font-bold mb-4">{""}</h4>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4"
            >
              {error.email && (
                <p className="text-red-500 text-sm">{error.email.message}</p>
              )}
              <div className="flex items-center gap-3 border-2 border-gray-700 rounded-full sm:px-4 px-2 sm:py-2 py-2 bg-gray-800 w-full">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email here"
                  // onChange={(e) => setEmail(e.target.value)}
                  // {...register("email")}
                  onChange={handleChange}
                  className="bg-transparent flex-1 text-sm text-white placeholder-gray-400 border-none outline-none"
                />
                <button
                  type="submit"
                  className={`rounded-full p-3 flex items-center justify-center transition-colors duration-300 ${
                    success
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
                </button>
              </div>
              {success && (
                <p className="text-green-500 text-sm mt-3">
                  Subscription successful!
                </p>
              )}
            </form>
          </div> */}
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-sm">
          <span>
            © {new Date().getFullYear()} Copyright{" "}
            <Link
              to={"https://www.hindtechitsolutions.com/"}
              className="hover:no-underline hover:text-red-500 focus:no-underline focus:text-red-500"
            >
              Hindtech It Solutions
            </Link>
            . All Rights Reserved
          </span>

          <p className="mt-2">
            <Link
              to="/terms-and-conditions"
              className="hover:no-underline hover:text-red-500 focus:no-underline focus:text-red-500 font-bold "
            >
              {t("footer.bottom.termsAndConditions")}
            </Link>{" "}
            |{" "}
            <Link
              to="/privacy-policy"
              className="hover:no-underline hover:text-red-500 focus:no-underline  focus:text-red-500 font-bold"
            >
              {t("footer.bottom.privacyPolicy")}
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
