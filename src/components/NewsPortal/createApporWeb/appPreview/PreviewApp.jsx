

import React, { useState} from "react";

import {  Home, Search, Video, BarChart2, Megaphone } from "lucide-react";

const navItems = [
  { name: "Top Stories", icon: Home },
  { name: "Explore", icon: Search },
  { name: "Shorts", icon: Video },
  { name: "YouTube", icon: BarChart2 },
  { name: "Polls", icon: Megaphone },
];

const topTabs = ["Top News", "Shorts", "Trending", "Politics", "Sports"];

// Updated Preview Component with your specific logic
const PreviewApp = ({
  backgroundColor = "#f3f4f6",
  headerColor = "#2563eb",
  textColor = "#ffffff",
  bottomBarColor = "#ffffff",
  bottomTextColor = "#9ca3af",
  activeColor = "#2563eb",
  inactiveColor = "#9ca3af",
  logo,
  fontFamily,
}) => {
  const [activeTab, setActiveTab] = useState("Top News");
  const [activeNav, setActiveNav] = useState("Top Stories");

  const isHexColor = (color) => /^#([0-9A-F]{3}){1,2}$/i.test(color);

  return (
    <div className="flex items-center justify-center py-4">
      <div 
        className="w-[320px] h-[640px] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border-[8px] border-gray-800 relative bg-white"
        style={{
          backgroundColor: isHexColor(backgroundColor) ? backgroundColor : "#f3f4f6",
          fontFamily: fontFamily
        }}
      >
        {/* Header */}
        <div
          className="flex items-center px-4 pt-8 pb-4 transition-colors duration-300"
          style={{
            backgroundColor: isHexColor(headerColor) ? headerColor : "#2563eb",
          }}
        >
          <div className="flex-1 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white ">
              {logo ? (
                <img src={logo} className="w-full h-full object-cover" alt="logo" />
              ) : (
                <span className="text-[10px] font-bold text-white">LOGO</span>
              )}
            </div>

            <div
              className="text-lg font-bold truncate"
              style={{ color: isHexColor(textColor) ? textColor : "#ffffff" }}
            >
              Daily News Live
            </div>
          </div>
        </div>

        {/* Top Tabs */}
        <div className="flex px-2 py-2 text-sm font-medium overflow-x-auto bg-white border-b hide-scrollbar">
          {topTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-3 py-2 transition-all text-xs whitespace-nowrap ${
                activeTab === tab ? "font-bold" : "text-gray-500"
              }`}
              style={{
                color: activeTab === tab ? headerColor : ""
              }}
            >
              {tab}
              {activeTab === tab && (
                <span 
                  className="absolute left-0 bottom-0 w-full h-[3px] rounded-full"
                  style={{ backgroundColor: headerColor }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-2 space-y-3"
            >
              <div className="w-full h-32 bg-gray-100 rounded-xl" />
              <div className="space-y-2 px-1">
                <div className="w-4/5 h-2 bg-gray-100 rounded-md" />
                <div className="w-2/3 h-2 bg-gray-50 rounded-md" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div 
          className="border-t py-3 flex justify-between items-center px-4 transition-colors duration-300"
          style={{ backgroundColor: isHexColor(bottomBarColor) ? bottomBarColor : "#ffffff" }}
        >
          {navItems.map((it) => {
            const Icon = it.icon;
            const isActive = activeNav === it.name;
            // Use headerColor for active state in bottom bar too, or sync with text color
            const iconColor = isActive ? headerColor : bottomTextColor;

            return (
              <div
                key={it.name}
                className="flex flex-col items-center justify-center cursor-pointer"
                onClick={() => setActiveNav(it.name)}
              >
                <Icon
                  size={20}
                  // style={{ color: iconColor }}
                />
                <div
                  // style={{ color: iconColor }}
                  className={`text-[10px] mt-1 ${isActive ? "font-bold" : "font-medium"}`}
                >
                  {it.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

