import React from "react";

import line from "../../assets/Line.webp";
import Phone from "../../assets/mobileview/mobileOnHome.svg";
import Laptop from "../../assets/webview/webViewOnHome.svg";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AppViewOnHome() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center p-4 lg:mx-10 md:mx-10 sm:mx-10   ">
      <div className="flex items-center justify-center lg:gap-0 xl:gap-12 md:gap-5 sm:gap-7 gap-0  ">
        <div className="hidden md:block mt-2">
          <img src={line} alt="line" className="w-20 lg:w-20" loading="lazy" />
        </div>
        <div>
          <h1 className="lg:w-2/3 md:w-2/3 sm:w-full w-full mt-4  sm:mb-6 md:mb-8 lg:mb-10  lg:mx-auto md:mx-auto sm:mx-auto mx-auto font-bold text-2xl lg:text-4xl py-4 text-center sm:text-center md:text-center lg:text-center xl:text-center tracking-wide font-sans">
            {t("appOrWebViewOnHome.heading")}{" "}
            {/* <span className="lg:text-4xl  font-bold font-sans text-pretty">
              MyPatrakar
            </span> */}
          </h1>
        </div>
        <div className=" hidden md:block md:mt-3">
          <img src={line} alt="line" className="w-20 lg:w-20" loading="lazy" />
        </div>
      </div>
      <section className="lg:flex items-center justify-center gap-10 py-10 flex-1">
        <div className="flex flex-col items-center justify-center mb-10">
          <NavLink to={"/product/app"}>
            <img
              src={Phone}
              alt="Phone view of application"
              className="h-80 lg:h-96"
              loading="lazy"
            />
          </NavLink>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <NavLink to={"/product/web-demo"}>
            <img
              src={Laptop}
              alt="Phone view of application"
              className="w-full h-full lg:h-96"
              loading="lazy"
            />
          </NavLink>
        </div>
      </section>
    </div>
  );
}
