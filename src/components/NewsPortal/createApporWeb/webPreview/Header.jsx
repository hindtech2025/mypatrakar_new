import { FaHome } from "react-icons/fa";
import LanguageSelector from "../../../NavigationBar/LanguageSelector";
import { useTranslation } from "react-i18next";
import { memo, useContext, useMemo } from "react";
import { PreViewContext } from "../../../../context/PreViewContext";

// Header Component - memoized to prevent unnecessary re-renders
export const Header = memo(({ bgColor, color, logo, footerColor, fontTop }) => {
  const { webPreview } = useContext(PreViewContext);
  const { t } = useTranslation();

  const hoverColor = useMemo(() => {
    if (!footerColor) return "hover:bg-gray-600";
    return `hover:bg-[${footerColor.replace('#', '')}]`;
  }, [footerColor]);

  return (
    <header
      className="w-full flex flex-col"
      style={{ fontFamily: fontTop || webPreview.font_top }}
    >
      {/* Top language/social bar */}
      <div className="px-4 py-1" style={{ background: bgColor, color: color }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          <LanguageSelector />
          <button className="bg-white text-gray-950 py-2 px-2 rounded">
            {t("webPreview.header.advertise")}
          </button>
        </div>
      </div>

      {/* Main header content */}
      <div className="flex-1 flex flex-col justify-start mt-2">
        <div className="max-w-7xl mx-auto w-full px-4 flex flex-col items-center">
          {/* Logo */}
          <div className="w-full flex justify-center items-center gap-5">
            <div className="w-80 h-28 rounded overflow-hidden flex items-center justify-center bg-gray-200">
              {webPreview.logo||logo ? (
                <img
                  src={webPreview.logo||logo}
                  alt="Logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-xs font-bold text-gray-700">LOGO</span>
              )}
            </div>

            <div className="w-full h-28 bg-gray-100 flex items-center justify-center rounded-md border border-dashed border-gray-300">
              <div className="text-gray-400">
                {t("webPreview.mainContent.advertisement")}
              </div>
            </div>
          </div>
        </div>
        {/* Combined Navigation, Search and Video Button */}
        <div
          className="w-full flex md:flex-row items-center justify-between px-2 mt-2"
          style={{ background: bgColor, color: color }}
        >
          {/* Mobile Menu Button */}
          <div>
            <FaHome
              size={20}
              className="cursor-pointer"
              style={{ color: color }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="sm:hidden p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 18 18"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden sm:flex">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm">
              {["desh", "news", "uttar_pradesh", "madhya_pradesh", "entertainment", "misc"].map(
                (key) => (
                  <div
                    key={key}
                    className={`cursor-pointer px-2 py-2 ${hoverColor} rounded`}
                  >
                    {t(`webPreview.header.navigation.${key}`)}
                  </div>
                )
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";