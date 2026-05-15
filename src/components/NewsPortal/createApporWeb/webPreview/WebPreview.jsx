import React, { useContext, useMemo, memo } from "react";
import { PreViewContext } from "../../../../context/PreViewContext";
// import LoginCard from "./LoginCard";
import { useTranslation } from "react-i18next";
import { Header } from "./Header";
import { Footer } from "./Footer";
// Skeleton card helper - memoized
const Skeleton = memo(({ className }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded-md ${className}`}
    aria-hidden="true"
  ></div>
));

Skeleton.displayName = "Skeleton";

// Main Content Placeholder - memoized
const MainContent = memo(() => {
  const { t } = useTranslation();

  const skeletonItems = useMemo(() => Array.from({ length: 6 }), []);
  const sidebarItems = useMemo(() => Array.from({ length: 2 }), []);

  return (
    <main className="flex-1 bg-white py-2">
      <div className="max-w-7xl mx-auto px-4 space-y-4">
        {/* Advertisement Banner */}
        <div className="w-full h-28 bg-gray-100 flex items-center justify-center rounded-md border border-dashed border-gray-300">
          <div className="text-gray-400">
            {t("webPreview.mainContent.advertisement")}
          </div>
        </div>

        {/* Top big section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left large preview */}
          <div className="lg:col-span-2 space-y-3">
            <Skeleton className="w-full h-28" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skeletonItems.map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-20 h-10 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="w-3/4 h-2" />
                    <Skeleton className="w-full h-2" />
                    <Skeleton className="w-full h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right sidebar */}
          <div className="space-y-6">
            {sidebarItems.map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="w-full h-28 rounded-md" />
                <Skeleton className="w-5/6 h-2" />
                <Skeleton className="w-full h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
});

MainContent.displayName = "MainContent";

// Full Page Wrapper - memoized
const WebPreview = memo(({
  bgColor,
  color,
  footerColor,
  footerText,
  fontTop,
  fontBottom
}) => {
  const { webPreview, appPreview } = useContext(PreViewContext);

  // Memoize computed values
  const computedBgColor = useMemo(() => webPreview.backgroundColor || bgColor, [webPreview.backgroundColor, bgColor]);
  const computedColor = useMemo(() => webPreview.color || color, [webPreview.color, color]);

  return (
    <div className="flex flex-col">
      <Header
        logo={webPreview.logo}
        bgColor={computedBgColor}
        color={computedColor}
        fontTop={fontTop}
        footerColor={footerColor}
      />
      <MainContent />
      <Footer
        fontBottom={fontBottom}
        socialLinks={webPreview.socialMedia || {}}
        footerColor={footerColor}
        color={computedColor}
        logo={appPreview.logo}
        footerText={footerText}
      />
    </div>
  );
});

WebPreview.displayName = "WebPreview";

export default WebPreview;