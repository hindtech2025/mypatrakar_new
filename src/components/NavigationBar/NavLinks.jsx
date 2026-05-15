import React from "react";
import { useState } from "react";
import MyPatrakarLogo from "./Logo";
import { VscThreeBars } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import DemoCallCard from "../Home/ScheduleDemo/DemoCallCard";
import Dropdown from "./NavBarFOrBlog/DropDown";
import { useTranslation } from "react-i18next";
import { useAuth } from "../Authentication/auth-hook";
import LanguageSelector from "./LanguageSelector";
import ai from "../../assets/generative.png";
import { RiAiGenerate } from "react-icons/ri";

export default function ResponsiveNav() {
  const { isLogin } = useAuth();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="px-3 py-0 md:mx-12 sm:mx-5   ">
        <section className="flex items-center justify-between ">
          <div className="flex items-center gap-5  select-none">
            {/* Logo */}
            <NavLink to="/">
              <MyPatrakarLogo />
            </NavLink>

            {/* Desktop Navigation Links */}
            {/* <ul className="hidden lg:flex gap-5 items-center mt-3 font-light">
              <li>
                <Dropdown />
              </li>
              <li>
                <NavLink
                  to={"/pricing-in-my-patrakar"}
                  className=" no-underline hover:no-underline  text-md font-semibold font-Poppins hover:text-red-500 focus:text-red-500 transition-colors active:text-red-500 text-black"
                >
                  {t("menu.price")}
                </NavLink>
              </li>
              <li
                className="text-md font-semibold font-Poppins text-red-600 hover:text-red-500 focus:text-red-500 transition-colors cursor-pointer"
            
              >
                <DemoCallCard />
              </li>
              <li>
                <NavLink
                  to={"/resources-in-my-patrakar"}
                  className=" no-underline hover:no-underline  text-md font-semibold font-Poppins hover:text-red-500 focus:text-red-500 transition-colors active:text-red-500 text-black"
                >
                  {t("menu.resources")}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/blog-page"
                  target="_blank"
                  className=" no-underline hover:no-underline text-md font-semibold font-Poppins hover:text-red-500 focus:text-red-500 transition-colors active:text-red-500 text-black"
                >
                  {t("menu.blog")}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/contact"}
                  className=" no-underline hover:no-underline text-md font-semibold font-Poppins hover:text-red-500 focus:text-red-500 transition-colors active:text-red-500 text-black"
                >
                  {t("menu.contact")}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/try-mypatrakar-ai"}
                  className="no-underline hover:no-underline text-md font-semibold text-white font-Poppins hover:text-white focus:text-white transition-colors animate-pulse "
                >
                  <div className="flex items-center justify-center gap-2 bg-red-500 p-2 rounded ">
                    <span>
                   
                      <RiAiGenerate size={20} />
                    </span>
                    <span>{t("menu.AI")}</span>
                  </div>
                </NavLink>
              </li>
            </ul> */}

            <ul className="hidden xl:flex gap-3 xl:gap-5 items-center mt-3 font-light text-black">
              <li>
                <Dropdown />
              </li>

              <li>
                <NavLink
                  to={"/pricing-in-my-patrakar"}
                  className="text-sm xl:text-md font-semibold font-Poppins text-black hover:text-red-500 transition-colors active:text-red-500 focus:text-red-500"
                >
                  {t("menu.price")}
                </NavLink>
              </li>

              <li className="text-sm xl:text-md font-semibold font-Poppins text-red-600 hover:text-red-500 cursor-pointer active:text-red-500 focus:text-red-500">
                <DemoCallCard />
              </li>

              <li>
                <NavLink
                  to={"/resources-in-my-patrakar"}
                  className="text-black text-sm xl:text-md font-semibold font-Poppins hover:text-red-500 transition-colors active:text-red-500 focus:text-red-500"
                >
                  {t("menu.resources")}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/blog-page"
                  className=" text-black text-sm xl:text-md font-semibold font-Poppins hover:text-red-500 transition-colors active:text-red-500 focus:text-red-500"
                >
                  {t("menu.blog")}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/contact"}
                  className=" text-black text-sm xl:text-md font-semibold font-Poppins hover:text-red-500 transition-colors active:text-red-500 focus:text-red-500"
                >
                  {t("menu.contact")}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/try-mypatrakar-ai"}
                  className="text-white font-semibold font-Poppins hover:text-white transition-colors active:text-white focus:text-white"
                >
                  <div className="flex items-center gap-1 xl:gap-2 bg-red-500 px-2 py-1 xl:px-3 xl:py-2 rounded whitespace-nowrap">
                    <RiAiGenerate size={18} />
                    <span className="text-sm xl:text-md">{t("menu.AI")}</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Desktop Action Buttons */}
          {/* <div className="hidden lg:flex gap-2 items-center mt-3">
            {userData == "" || userData == null ? (
              <NavLink to={"/login"}>
                <button className="text-black font-semibold py-2 px-4 rounded hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white transition-colors active:text-red-500 text-black">
                  {t("menu.signin")}
                </button>
              </NavLink>
            ) : (
              <NavLink to={"/portal"}>
                <button className="text-black font-semibold py-2 px-4 rounded hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white transition-colors active:text-red-500 text-black">
                  {t("menu.signin")}
                </button>
              </NavLink>
            )}
            <NavLink to={"/signup"}>
              <button className="text-white font-semibold py-2 px-4 bg-red-500 rounded hover:bg-red-600 focus:bg-red-600 transition-colors focus:text-white">
                {t("menu.signupForFree")}
              </button>
            </NavLink>
            <LanguageSelector />
          </div> */}

          <div className="hidden xl:flex gap-2 items-center mt-3">
            {userData == "" || userData == null ? (
              <NavLink to={"/login"}>
                <button className="text-sm xl:text-md text-black font-semibold py-2 px-3 rounded hover:bg-red-600 hover:text-white transition-colors no-underline decoration-none hover:underline">
                  {t("menu.signin")}
                </button>
              </NavLink>
            ) : (
              <NavLink to={"/portal"}>
                <button className="text-sm xl:text-md text-black font-semibold py-2 px-3 rounded hover:bg-red-600 hover:text-white transition-colors no-underline decoration-none hover:underline">
                  {t("menu.signin")}
                </button>
              </NavLink>
            )}

            <NavLink to={"/signup"} className="hidden xl:flex">
              <button className="text-sm xl:text-md text-white font-semibold py-2 px-3 bg-red-500 rounded hover:bg-red-600 transition-colors no-underline decoration-none hover:underline">
                {t("menu.signupForFree")}
              </button>
            </NavLink>

            <LanguageSelector />
          </div>

          {/* Mobile Menu Icon */}
          <div className=" xl:hidden flex items-center justify-center gap-5">
            <LanguageSelector />
            <div className="cursor-pointer" onClick={handleMenuToggle}>
              <VscThreeBars size={24} />
            </div>
          </div>
        </section>
      </nav>

      {/* Mobile Side Menu */}
     <div
  className={`fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs 
  bg-gradient-to-b from-white to-gray-100 
  p-4 shadow-2xl rounded-r-2xl 
  transition-transform ease-in-out transform ${
    isMenuOpen ? "translate-x-0" : "-translate-x-full"
  } duration-300`}
>
  {/* Close Button */}
  <div className="flex justify-between items-center mb-6 border-b pb-3">
    <NavLink to="/">
      <MyPatrakarLogo />
    </NavLink>
    <IoClose
      size={26}
      className="cursor-pointer text-gray-700 hover:text-red-500 transition-colors"
      onClick={handleMenuToggle}
    />
  </div>

  {/* Navigation Links */}
  <ul className="flex flex-col gap-5">
    <li className="text-gray-500 text-xs tracking-wide uppercase">
      {t("menu.product.product")}
    </li>

    <li>
      <NavLink
        to={"/product/app"}
        className="block p-2 rounded-lg text-sm font-semibold font-Poppins 
        hover:bg-red-50 hover:text-red-500 transition-all text-black"
        onClick={handleCloseMenu}
      >
        {t("menu.product.app")}
      </NavLink>
    </li>

    <li>
      <NavLink
        to={"/product/website"}
        className="block p-2 rounded-lg text-sm font-semibold font-Poppins 
        hover:bg-red-50 hover:text-red-500 transition-all text-black"
        onClick={handleCloseMenu}
      >
        {t("menu.product.website")}
      </NavLink>
    </li>

    <li>
      <NavLink
        to={"/pricing-in-my-patrakar"}
        className="block p-2 rounded-lg text-sm font-semibold font-Poppins 
        hover:bg-red-50 hover:text-red-500 transition-all text-black"
        onClick={handleCloseMenu}
      >
        {t("menu.price")}
      </NavLink>
    </li>

    <li className="text-left text-sm font-semibold font-Poppins text-red-500">
      <DemoCallCard />
    </li>

    <li>
      <NavLink
        to={"/resources-in-my-patrakar"}
        className="block p-2 rounded-lg text-sm font-semibold font-Poppins 
        hover:bg-red-50 hover:text-red-500 transition-all text-black"
        onClick={handleCloseMenu}
      >
        {t("menu.resources")}
      </NavLink>
    </li>

    <li>
      <NavLink
        to="/blog-page"
        className="block p-2 rounded-lg text-sm font-semibold font-Poppins 
        hover:bg-red-50 hover:text-red-500 transition-all text-black"
      >
        {t("menu.blog")}
      </NavLink>
    </li>

    <li>
      <NavLink
        to={"/contact"}
        className="block p-2 rounded-lg text-sm font-semibold font-Poppins 
        hover:bg-red-50 hover:text-red-500 transition-all text-black"
        onClick={handleCloseMenu}
      >
        {t("menu.contact")}
      </NavLink>
    </li>
  </ul>

  {/* Action Buttons */}
  <div className="mt-6 flex flex-col gap-3 border-t pt-4">
    {userData == "" || userData == null ? (
      <NavLink to={"/login"} className="flex items-center justify-center hover:no-underline">
        <button
          className="w-full text-sm text-white font-semibold py-2.5 px-3 
          bg-red-500 rounded-lg hover:bg-red-600 transition-all shadow-md"
        >
          {t("menu.signin")}
        </button>
      </NavLink>
    ) : (
      <NavLink to={"/portal"} className="flex items-center justify-center hover:no-underline">
        <button
          className="w-full text-sm text-white font-semibold py-2.5 px-3 
          bg-red-500 rounded-lg hover:bg-red-600 transition-all shadow-md"
        >
          {t("menu.signin")}
        </button>
      </NavLink>
    )}

    <NavLink
      to={"/signup"}
      onClick={handleCloseMenu}
      className="flex items-center justify-center hover:no-underline"
    >
      <button
        className="w-full text-sm text-white font-semibold py-2.5 px-3 
        bg-black rounded-lg hover:bg-gray-900 transition-all shadow-md "
      >
        {t("menu.signupForFree")}
      </button>
    </NavLink>
  </div>
</div>


      {/* Background Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleMenuToggle}
        ></div>
      )}
    </>
  );
}
