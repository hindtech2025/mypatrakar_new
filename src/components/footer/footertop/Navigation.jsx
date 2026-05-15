import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import React from "react";
import DemoCallCard from "../../Home/ScheduleDemo/DemoCallCard";
import { Link } from "react-router-dom";
import {
  faCalendarAlt,
  faEnvelope,
  faGlobe,
  faMobileAlt,
  faPenNib,
  faQuestionCircle,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import razorpay from "../../../assets/footer/Razorpay-Logo.jpg";
import AWS from "../../../assets/footer/Amazon_Web_Services-Logo.wine_.png";

export default function Navigation() {
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
    // {
    //   to: "/schedule/demo",
    //   icon: faCalendarAlt,
    //   text: "Schedule Demo",
    // },

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
    <div className="">
      {/* Footer Navigation */}
      <div>
        <h4 className="text-2xl font-bold mb-4 text-red-500">
          {" "}
          {t("footer.bottom.navigation")}
        </h4>
        <div className="space-y-3">
          {footerLinks.map((item, index) =>
            item.to == "/schedule/demo" ? (
              <div
                key={index}
                className="flex items-center justify-start gap-3 group"
              >
                <span>
                  {" "}
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="w-5 text-white group-hover:text-red-500"
                  />
                </span>

                <span>
                  <DemoCallCard className="text-white group-hover:text-red-500" />
                </span>
              </div>
            ) : (
              <Link
                key={index}
                to={item.to}
                className="flex items-center gap-3 text-white hover:text-red-500 transition-colors focus:text-red-500"
              >
                <FontAwesomeIcon icon={item.icon} className="w-5" />
                {item.text}
              </Link>
            )
          )}
        </div>
      </div>
     <div className="mt-4 flex flex-col items-start md:items-start gap-6">
  {/* AWS Block */}
  <div className="flex flex-col gap-2">
    <p className="text-white font-bold text-lg sm:text-base">
      Deployed on AWS
    </p>

    <div className="bg-white w-60 sm:w-48 h-20 sm:h-14 rounded-lg overflow-hidden shadow-md flex items-center justify-center">
      <img
        src={AWS}
        alt="AWS Logo"
        className="w-full h-full object-contain p-"
      />
    </div>
  </div>

  {/* OpenAI Block */}
  <div className="flex flex-col gap-2">
    <p className="text-white font-bold text-lg sm:text-base">
      Payment Powered By
    </p>

    <div className="bg-white w-60 sm:w-48 h-20 sm:h-14 rounded-lg overflow-hidden shadow-md flex items-center justify-center">
      <img
        src={razorpay}
        alt="OpenAI Logo"
        className="w-full h-full object-contain "
      />
    </div>
  </div>
</div>

    </div>
  );
}
