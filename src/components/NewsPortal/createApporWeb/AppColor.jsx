
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import {
  Info,
  Palette,
  Layout,
  Smartphone,
  Home,
  Search,
  Video,
  BarChart2,
  Megaphone,
} from "lucide-react";

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
          backgroundColor: isHexColor(backgroundColor)
            ? backgroundColor
            : "#f3f4f6",
          fontFamily: fontFamily,
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
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/30">
              {logo ? (
                <img
                  src={logo}
                  className="w-full h-full object-cover"
                  alt="App Logo"
                />
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
                color: activeTab === tab ? headerColor : "",
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
          style={{
            backgroundColor: isHexColor(bottomBarColor)
              ? bottomBarColor
              : "#ffffff",
          }}
        >
          {navItems.map((it) => {
            const Icon = it.icon;
            const isActive = activeNav === it.name;
            const iconColor = isActive ? headerColor : bottomTextColor;

            return (
              <div
                key={it.name}
                className="flex flex-col items-center justify-center cursor-pointer"
                onClick={() => setActiveNav(it.name)}
              >
                <Icon size={20} style={{ color: bottomTextColor }} />
                <div
                  style={{ color: bottomTextColor }}
                  className={`text-[10px] mt-1 ${
                    isActive ? "font-bold" : "font-medium"
                  }`}
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

const AppColor = ({ setUserRequest, logo }) => {
  const [headerColor, setHeaderColor] = useState("#3b82f6");
  const [bottomBarColor, setBottomBarColor] = useState("#ffffff");
  const [bottomTextColor, setBottomTextColor] = useState("#64748b");
  const [fontFamily, setFontFamily] = useState("Inter");
  // console.log(logo);
  const presetColors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#000000",
    "#ffffff",
    "#64748b",
    "#f97316",
    "#06b6d4",
    "#d946ef",
  ];

  useEffect(() => {
    setUserRequest((prev) => ({
      ...prev,
      app_color: {
        header: headerColor,
        bottomBar: bottomBarColor,
        bottomText: bottomTextColor,
        font: fontFamily,
      },
    }));
  }, [
    headerColor,
    bottomBarColor, 
    bottomTextColor,
    fontFamily,
    setUserRequest,
  ]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 my-6 md:my-12">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Palette size={24} className="text-blue-500" />
          Branding & UI Customization
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Customize individual sections of your application interface.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* 🎨 Controls Section */}
        <div className="w-full lg:w-1/2 space-y-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Picker 1: Header */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Layout size={16} className="text-blue-500" />
                Header Background
              </label>
              <SketchPicker
                color={headerColor}
                onChange={(c) => setHeaderColor(c.hex)}
                width="100%"
                presetColors={presetColors}
              />
            </div>
            {/* Font Selector */}
            <div className="space-y-1 ">
              <div className="space-y-2 bg-white shadow-xl px-2 py-2 mt-8 border border-gray-300 rounded">
                <div className="bg-blue-50 p-3  rounded-xl border border-blue-100">
                  <label className="block text-sm font-semibold text-blue-800 mb-2">
                    Typography
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    style={{ fontFamily }}
                  >
                    <option value="Inter">Inter (Modern)</option>
                    <option value="Poppins">Poppins (Clean)</option>
                    <option value="Roboto">Roboto (Standard)</option>
                    <option value="Montserrat">Montserrat (Bold)</option>
                  </select>
                </div>

                <div className="p-4 bg-gray-100 rounded-xl space-y-2">
                  <h4 className="text-xs text-gray-800 font-bold font-sans uppercase tracking-wider">
                    Color Summary
                  </h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex  justify-between text-xs font-bold font-sans">
                      <span>Header:</span>
                      <div>
                        {" "}
                        <span className="font-mono font-bold">
                          {headerColor}
                        </span>
                        <div
                          className="w-20 h-10 rounded-md "
                          style={{
                            background: headerColor,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs font-bold font-sans">
                      <span>Menu BG:</span>

                      <div>
                        {" "}
                        <span className="font-mono font-bold">
                          {bottomBarColor}
                        </span>
                        <div
                          className="w-20 h-10 rounded-md "
                          style={{
                            background: bottomBarColor,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs font-bold font-sans">
                      <span>Menu Text:</span>
                      <div>
                        <span className="font-mono font-bold">
                          {bottomTextColor}
                        </span>
                        <div
                          className="w-20 h-10 rounded-md "
                          style={{
                            background: bottomTextColor,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Picker 2: Bottom Menu BG */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Smartphone size={16} className="text-indigo-500" />
                Bottom Menu Background
              </label>
              <SketchPicker
                color={bottomBarColor}
                onChange={(c) => setBottomBarColor(c.hex)}
                width="100%"
                presetColors={presetColors}
              />
            </div>

            {/* Picker 3: Bottom Menu Text/Icons */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Info size={16} className="text-pink-500" />
                Bottom Menu Text/Icons
              </label>
              <SketchPicker
                color={bottomTextColor}
                onChange={(c) => setBottomTextColor(c.hex)}
                width="100%"
                presetColors={presetColors}
              />
            </div>
          </div>
        </div>

        {/* 📱 Live Preview Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="sticky top-8 text-center w-full">
            <h2 className="text-lg font-bold text-gray-700 mb-2">
              Live App Preview
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Real-time visualization of your branding
            </p>
            <PreviewApp
              backgroundColor="#f9fafb"
              headerColor={headerColor}
              textColor="#ffffff"
              bottomBarColor={bottomBarColor}
              bottomTextColor={bottomTextColor}
              fontFamily={fontFamily}
              logo={logo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

AppColor.propTypes = {
  setUserRequest: PropTypes.func.isRequired,
  logo: PropTypes.string,
};

export default React.memo(AppColor);
