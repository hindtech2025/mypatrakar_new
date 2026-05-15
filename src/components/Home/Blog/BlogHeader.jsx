import { useState } from "react";
import React from "react"

import MyPatrakarLogo from './Logo';
import { VscThreeBars } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
export default function ResponsiveNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleNavigation = (event) => {
    const value = event.target.value;
    if (value) {
      navigate(value);  // Redirect to the selected route
    }
  };
  return (
    <>
      <nav className="mx-auto max-w-7xl px-3 lg:px-4  xl:px-8 py-1">
        <section className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo */}
          <NavLink to='/'>
          <MyPatrakarLogo />
          </NavLink>

            {/* Desktop Navigation Links */}
            <ul className="hidden lg:flex gap-8 items-center">
            <li>
      <select onChange={handleNavigation} className="text-sm font-semibold font-Poppins transition-colors">
        <option value="">Product</option>
        <option value="/mobileview" className="hover:text-red-500 focus:text-red-500 cursor-pointer ">App</option>
        <option value="/webview" className="hover:text-red-500 focus:text-red-500 ">Website</option>
      </select>
    </li>
                <li >
                  <NavLink to={'/pricing'}
                    className="text-sm font-semibold font-Poppins hover:text-red-500 focus:text-red-500 transition-colors"
                  >
                    Pricing
                  </NavLink>
                </li>
                <li >
                  <NavLink to={'/scheduledemo'}
                    className="text-sm font-semibold font-Poppins hover:text-red-500 focus:text-red-500 transition-colors"
                  >
                    Schedule Demo
                  </NavLink>
                </li>
                <li >
                  <NavLink to={'/resources'}
                    className="text-sm font-semibold font-Poppins hover:text-red-500 focus:text-red-500 transition-colors"
                  >
                    Resources
                  </NavLink>
                </li>
                <li >
                  <NavLink to={'/blog'}
                    className="text-sm font-semibold font-Poppins hover:text-red-500 focus:text-red-500 transition-colors"
                  >
                    Blog
                  </NavLink>
                </li>
                
                <li >
                  <NavLink to={'/contact'}
                    className="text-sm font-semibold font-Poppins hover:text-red-500 focus:text-red-500 transition-colors"
                  >
                    Contact
                  </NavLink>
                </li>
                
            </ul>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex gap-5 items-center">
          <NavLink to={'/login'}>
            <button className="text-black font-bold py-2 px-4 rounded hover:bg-red-600 focus:bg-red-600 focus:text-white transition-colors">
             Sign In
            </button>
            </NavLink>
            <NavLink to={'/signup'}>
            <button className="text-black font-bold py-2 px-4 rounded hover:bg-red-600 focus:bg-red-600 transition-colors focus:text-white">
             Sign Up for free
            </button>
            </NavLink>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden cursor-pointer" onClick={handleMenuToggle}>
            <VscThreeBars size={24} />
          </div>
        </section>
      </nav>

      {/* Mobile Side Menu */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-white p-6 shadow-lg transition-transform transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center mb-8">
        <NavLink to='/'>
          <MyPatrakarLogo />
          </NavLink>
          <IoClose size={24} className="cursor-pointer" onClick={handleMenuToggle} />
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-6">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink to={link.toLowerCase()}   className="text-lg font-semibold text-gray-800 hover:text-red-500 focus:text-red-500 transition-colors">
                {link}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-4">
          <button className="text-black font-bold py-2 px-4 rounded focus:bg-red-500">
           <NavLink to={'/login'}>
           Sign In
           </NavLink>
          </button>
          <button className="text-black font-bold py-2 px-4 rounded focus:bg-red-500">
          <NavLink to={'signup'}>
          Sign Up for free
          </NavLink>
          </button>
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

