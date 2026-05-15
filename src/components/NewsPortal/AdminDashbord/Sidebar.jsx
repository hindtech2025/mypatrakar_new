
import React, { useEffect, useState } from "react";
import { RxDashboard, RxCross2 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import { GetPortalList } from "../../../api/index.js";
import UserCard from "./UserCard.jsx";
import { FiChevronRight } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { useMediaQuery } from "react-responsive";
import myPtrakar from "../../../assets/MyPatrakarLogo.png"
export default function Sidebar({ isOpen, setIsOpen }) {
  const [portalList, setPortalList] = useState([]);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ top: 0 });
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 767 });
const statusClass={
  pending:"w-2 h-2 rounded-full bg-yellow-400 mr-3 animate-pulse",
  created:"w-2 h-2 rounded-full bg-green-400 mr-3 animate-pulse",
  rejected:"w-2 h-2 rounded-full bg-red-400 mr-3 animate-pulse",

}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = JSON.parse(sessionStorage.getItem("userData"));
        const res = await GetPortalList({ customer_id: userId?.userId });
        // console.log(res.data.response)
        setPortalList(res.data.response || []);
      } catch (error) {
        // console.error("Error fetching portal list:", error);
      }
    };

    fetchData();
  }, []);

  const handleOverlayClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleMouseEnter = (user, e) => {
    if (!isMobile) {
      setHoveredUser(user);
      // Get the position of the hovered element
      const rect = e.currentTarget.getBoundingClientRect();
      setHoverPosition({ top: rect.top });
    }
  };

  const classes = isOpen
    ? "fixed z-50 top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-800 to-gray-900 text-white pt-4 px-4 transform transition-all duration-300 ease-in-out shadow-xl translate-x-0 md:relative md:translate-x-0 md:shadow-none flex flex-col"
    : "-translate-x-full fixed z-50 top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-800 to-gray-900 text-white pt-4 px-4 transform transition-all duration-300 ease-in-out shadow-xl md:relative md:translate-x-0 md:shadow-none flex flex-col";

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMobile ? "md:hidden" : "hidden"
        } ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={handleOverlayClick}
      />

      {/* Sidebar */}
      <div className={classes}>
        {/* Mobile close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-700 text-gray-300 md:hidden"
          aria-label="Close sidebar"
        >
          <RxCross2 className="w-5 h-5" />
        </button>

        {/* Brand/Logo */}
        <div className="px-2 py-4 mb-2 flex items-center bg-white rounded-lg">
          <div className="md:flex hidden w-8 h-8 bg-red-500 rounded-md items-center justify-center mr-2">
            <HiOutlineBuildingOffice2 className="w-5 h-5 text-white" />
          </div>
         <div>
          <img src={myPtrakar} alt="MyPatrakar logo" />
         </div>
        </div>

        {/* Dashboard link */}
        <div className="mb-6">
          <Link
            to="/portal"
            className={`flex items-center px-4 py-3 rounded-lg transition-all ${
              location.pathname === "/portal"
                ? "bg-red-500/90 hover:bg-red-500 shadow-md"
                : "hover:bg-gray-700/50"
            }`}
          >
            <RxDashboard className="mr-3 text-lg" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
        </div>

        {/* Portal List Section */}
        <div className="flex-1 overflow-y-auto scrollbar-thin hide-scrollbar scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className="px-2 mb-2 flex justify-between items-center">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Your Portals
            </h3>
            <span className="text-xs bg-gray-700/50 px-2 py-1 rounded-md">
              {portalList.length}
            </span>
          </div>

          <ul className="space-y-1 pb-4">
            {portalList.length > 0 ? (
              portalList.map((user) => (
                <li
                  key={user?.purchase_id}
                  className="relative"
                  onMouseEnter={(e) => handleMouseEnter(user, e)}
                  // onMouseLeave={() => !isMobile && setHoveredUser(null)}
                >
                  <span
                    // to={`/portal/${user?.purchase_id}`}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all cursor-pointer ${
                      location.pathname.includes(user?.purchase_id)
                        ? "bg-gray-700/70 font-medium shadow-inner"
                        : "hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={statusClass[user?.request_status.toLowerCase()]}></div>
                      <span className="text-sm truncate max-w-[160px]">
                        {user?.agency_name}
                      </span>
                    </div>
                    <FiChevronRight className="text-gray-400" />
                  </span>
                </li>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-400 italic">
                No portals available
              </div>
            )}
          </ul>
        </div>

        {/* Hover Card - Fixed to the right of sidebar */}
        {hoveredUser && !isMobile && (
          <div 
            className="fixed left-48 my-[50%] ml-3 mb-5 z-20"
            
          >
            <div className="relative">
              {/* Arrow pointer */}
              <div className="absolute -left-1.5 top-6 w-3 h-3 bg-white rotate-45 transform border-l border-t border-gray-200 shadow-sm"></div>
              {/* Card with shadow */}
              <div className="ml-1 shadow-xl rounded-lg overflow-hidden">
                <UserCard user={hoveredUser} onMouseLeave={() => !isMobile && setHoveredUser(null)}/>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="py-3 text-center text-xs text-gray-500 border-t border-gray-700/50">
          © {new Date().getFullYear()} MyPatrakar
        </div>
      </div>
    </>
  );
}