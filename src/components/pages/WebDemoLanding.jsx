import { useCallback, useContext, useMemo, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import {
  formatUrl,
  typographyPersonalities,
} from "./webdemo/utils/webDemoHelpers";
import { webDemo } from "../../api";
import WebDemoHeader from "./webdemo/WebDemoHeader";

import PreviewSection from "./webdemo/PreviewSection";
import BrandingEssentials from "./webdemo/BrandingEssentials";
import TypographySection from "./webdemo/TypographySection";
import ColorsCommunication from "./webdemo/ColorsCommunication";
import SocialNetworks from "./webdemo/SocialNetworks";
import CallToAction from "./webdemo/CallToAction";
import Swal from "sweetalert2";
import { showError, showWarning } from "../../utils/swal";

const DEFAULT_HEADER_COLOR = "#e81303";
const DEFAULT_FOOTER_COLOR = "#16274F";

const WebDemoLanding = () => {
  const { language } = useContext(LanguageContext);

  // ================= STATES =================
  const [brandName, setBrandName] = useState("");
  const [logo, setLogo] = useState(null);
  const [file, setFile] = useState(null);
  const [fontFamily, setFontFamily] = useState("");
  const [headerColor, setHeaderColor] = useState(DEFAULT_HEADER_COLOR);
  const [footerColor, setFooterColor] = useState(DEFAULT_FOOTER_COLOR);
  const [isLoading, setIsLoading] = useState(false);

  const [socialLinks, setSocialLinks] = useState({
    fb_link: "",
    twitter_link: "",
    insta_link: "",
    youtube_link: "",
    telegram_link: "",
  });

  const [supportPhone, setSupportPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // ================= MEMOS =================
  const selectedFont = useMemo(() => {
    return (
      typographyPersonalities.find((f) => f.name === fontFamily)?.family ||
      "serif"
    );
  }, [fontFamily]);

  const validatedLinks = useMemo(() => {
    return Object.keys(socialLinks).reduce((acc, key) => {
      acc[key] = socialLinks[key] ? formatUrl(socialLinks[key]) : "";
      return acc;
    }, {});
  }, [socialLinks]);

  // ================= RESET =================
  const resetForm = useCallback(() => {
    setBrandName("");
    setLogo(null);
    setFile(null);
    setFontFamily("");
    setHeaderColor(DEFAULT_HEADER_COLOR);
    setFooterColor(DEFAULT_FOOTER_COLOR);
    setSupportPhone("");
    setWhatsapp("");
    setSocialLinks({
      fb_link: "",
      twitter_link: "",
      insta_link: "",
      youtube_link: "",
      telegram_link: "",
    });
  }, []);

  // ================= LOGO UPLOAD =================
  const handleLogoUpload = useCallback((e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      showWarning("File size must be less than 5MB");
      return;
    }

    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
      "image/webp",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      showWarning("Please upload a valid image file");
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result);
    reader.onerror = () => {
      showError("Error reading file");
      setFile(null);
      setLogo(null);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  // ================= SUBMIT =================
  const handleSubmit = useCallback(async () => {
    if (!brandName.trim()) {
      showWarning("Please enter a website name");
      return;
    }

    if (!file) {
      showWarning("Please upload a logo");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("web_logo", file);
      formData.append("website_name", brandName.trim());
      formData.append("web_font_family", fontFamily);
      formData.append("header_color", headerColor);
      formData.append("footer_color", footerColor);
      formData.append("support", supportPhone);
      formData.append("whatsapp", whatsapp);
      formData.append("primary_language", language);

      Object.entries(validatedLinks).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await webDemo(formData);

      if (res?.success || res?.status === 200) {
        const demoId = res.data?.response?.web_demo_id;

        // ✅ clear form
        resetForm();

        // ✅ open demo
        window.open(
          `${import.meta.env.VITE_REACT_APP_NAVIGATE_URL}/${demoId}`,
          "_blank",
          "noopener,noreferrer",
        );
      } else {
        throw new Error(res.message || "Submission failed");
      }
    } catch (error) {
      // ingnore
    } finally {
      setIsLoading(false);
    }
  }, [
    brandName,
    file,
    fontFamily,
    headerColor,
    footerColor,
    supportPhone,
    whatsapp,
    language,
    validatedLinks,
    resetForm,
  ]);

  // ================= JSX =================
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans my-10">
      <WebDemoHeader />

      <div className="max-w-5xl mx-auto space-y-16 p-6 md:p-12">
        <PreviewSection
          headerColor={headerColor}
          footerColor={footerColor}
          logo={logo}
          selectedFont={selectedFont}
          socialLinks={socialLinks}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-10">
            <BrandingEssentials
              brandName={brandName}
              setBrandName={setBrandName}
              handleLogoUpload={handleLogoUpload}
              logo={logo}
              file={file}
            />
            <TypographySection
              fontFamily={fontFamily}
              setFontFamily={setFontFamily}
            />
          </div>

          <div className="space-y-10">
            <ColorsCommunication
              headerColor={headerColor}
              setHeaderColor={setHeaderColor}
              footerColor={footerColor}
              setFooterColor={setFooterColor}
              supportPhone={supportPhone}
              setSupportPhone={setSupportPhone}
              whatsapp={whatsapp}
              setWhatsapp={setWhatsapp}
            />
            <SocialNetworks
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
            />
          </div>
        </div>
      </div>

      <div className="mt-16 mb-10">
        <CallToAction onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default WebDemoLanding;
