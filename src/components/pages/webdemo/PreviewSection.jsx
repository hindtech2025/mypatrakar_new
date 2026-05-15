// import { Header } from "../NewsPortal/createApporWeb/webPreview/Header";
// import { Footer } from "../NewsPortal/createApporWeb/webPreview/Footer";
// import { getContrastColor } from "./utils/webDemoHelpers";

import { Footer } from "../../NewsPortal/createApporWeb/webPreview/Footer";
import { Header } from "../../NewsPortal/createApporWeb/webPreview/Header";
import { getContrastColor } from "./utils/webDemoHelpers";


const PreviewSection = ({ headerColor, footerColor, logo, selectedFont, socialLinks }) => {
  return (
    <div className="space-y-4">
      <div className="bg-white border p-5 rounded-lg shadow-xl">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Live Header Preview
          </h2>
        </div>
        <Header
          bgColor={headerColor}
          color={getContrastColor(headerColor)}
          logo={logo}
          footerColor={footerColor}
          fontTop={selectedFont}
        />
      </div>
      <Footer
        socialLinks={socialLinks}
        footerColor={footerColor}
        footerText={getContrastColor(footerColor)}
        fontBottom={selectedFont}
        logo={logo}
      />
    </div>
  );
};

export default PreviewSection;