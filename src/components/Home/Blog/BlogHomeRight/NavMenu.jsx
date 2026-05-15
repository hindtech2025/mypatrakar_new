import { useState } from 'react';
import React from "react"

const NavMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="elementor-widget-container">
      {/* Main Navigation Menu */}
      <nav
        role="navigation"
        className="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-vertical e--pointer-underline e--animation-fade"
      >
        <ul id="menu-1-4991c52" className="elementor-nav-menu sm-vertical">
          <li className="menu-item">
            <a href="https://blog.myptrakar.com/mobile-app/" className="elementor-item">
              Mobile App
            </a>
          </li>
          <li className="menu-item">
            <a href="https://blog.myptrakar.com/ecommerce/" className="elementor-item">
              Ecommerce
            </a>
          </li>
          <li className="menu-item">
            <a href="https://blog.myptrakar.com/no-code-app/" className="elementor-item">
              No-Code-App
            </a>
          </li>
        </ul>
      </nav>

      {/* Menu Toggle Button */}
      <div
        className="elementor-menu-toggle cursor-pointer"
        role="button"
        tabIndex="0"
        aria-label="Menu Toggle"
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        <i
          aria-hidden="true"
          role="presentation"
          className={`elementor-menu-toggle__icon--open eicon-menu-bar ${menuOpen ? 'hidden' : 'block'}`}
        ></i>
        <i
          aria-hidden="true"
          role="presentation"
          className={`elementor-menu-toggle__icon--close eicon-close ${menuOpen ? 'block' : 'hidden'}`}
        ></i>
        <span className="elementor-screen-only">Menu</span>
      </div>

      {/* Dropdown Menu */}
      <nav
        className={`elementor-nav-menu--dropdown elementor-nav-menu__container transition-all duration-300 ${
          menuOpen ? 'block' : 'hidden'
        }`}
        role="navigation"
        aria-hidden={!menuOpen}
      >
        <ul id="menu-2-4991c52" className="elementor-nav-menu sm-vertical">
          <li className="menu-item">
            <a href="https://blog.myptrakar.com/mobile-app/" className="elementor-item" tabIndex="-1">
              Mobile App
            </a>
          </li>
          <li className="menu-item">
            <a href="https://blog.myptrakar.com/ecommerce/" className="elementor-item" tabIndex="-1">
              Ecommerce
            </a>
          </li>
          <li className="menu-item">
            <a href="https://blog.myptrakar.com/no-code-app/" className="elementor-item" tabIndex="-1">
              No-Code-App
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavMenu;
