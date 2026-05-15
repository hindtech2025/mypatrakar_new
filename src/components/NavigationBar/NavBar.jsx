import React from "react";
import NavLinks from "./NavLinks";
export default function NavBar() {
  return (
    <header className="fixed bg-white w-full z-50 mx-auto  ">
      <NavLinks />
    </header>
  );
}
