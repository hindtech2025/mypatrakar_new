import { memo, useContext, useMemo } from "react";
import { PreViewContext } from "../../../../context/PreViewContext";
import { useTranslation } from "react-i18next";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import FooterFaceBook from "./FooterFaceBook";
import LoginCard from "./LoginCard";

// Footer component - memoized
export const Footer = memo(
  ({ socialLinks = {}, footerColor, footerText, fontBottom, logo }) => {
    const { webPreview } = useContext(PreViewContext);
    const { t } = useTranslation();
    // console.log(socialLinks)
    const navigationItems = useMemo(
      () => [
        t("webPreview.footer.navigation.home"),
        t("webPreview.footer.navigation.about"),
        t("webPreview.footer.navigation.terms"),
        t("webPreview.footer.navigation.privacy"),
        t("webPreview.footer.navigation.contact"),
      ],
      [t],
    );

    const socialMediaIcons = useMemo(
      () => [
        {
          key: "fb_link",
          icon: FaFacebookF,
          label: "facebook",
          color: "text-[#1877F2] hover:text-[#145DBF]",
        },
        {
          key: "twitter_link",
          icon: FaTwitter,
          label: "twitter",
          color: "text-[#1DA1F2] hover:text-[#0D8DDA]",
        },
        {
          key: "linkedin_link",
          icon: FaLinkedinIn,
          label: "linkedin",
          color: "text-[#0A66C2] hover:text-[#004182]",
        },
        {
          key: "insta_link",
          icon: FaInstagram,
          label: "instagram",
          color: "text-[#E4405F] hover:text-[#D6294E]",
        },
        {
          key: "youtube_link",
          icon: FaYoutube,
          label: "youtube",
          color: "text-[#FF0000] hover:text-[#CC0000]",
        },
        {
          key: "telegram_link",
          icon: FaTelegram,
          label: "telegram",
          color: "text-[#229ED9] hover:text-[#1C8BC0]",
        },
      ],
      [],
    );

    const fontFamilyStyle = useMemo(
      () => ({ fontFamily: fontBottom || webPreview.font_bottom }),
      [fontBottom, webPreview.font_bottom],
    );

    return (
      <footer
        className="bg-[#0f2347] mt-2"
        style={{
          background: footerColor,
          color: footerText,
          ...fontFamilyStyle,
          fontFamily: fontBottom || webPreview.font_bottom,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-12">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg" style={fontFamilyStyle}>
              Navigation
            </h3>
            {navigationItems.map((item, idx) => (
              <div key={idx} className="text-sm">
                <a
                  href="#"
                  className="hover:underline cursor-pointer"
                  style={{ ...fontFamilyStyle, color: footerText }}
                >
                  {item}
                </a>
              </div>
            ))}
          </div>
          <div className="hidden md:block" style={fontFamilyStyle}>
            <FooterFaceBook url={socialLinks.fb_link} />
          </div>
          <div className="relative space-y-2 hidden md:block">
            <div>
              <h3
                className="font-semibold text-lg relative"
                style={fontFamilyStyle}
              >
                #BS_EXCLUSIVE
              </h3>
              <ul
                className="space-y-1 text-xs leading-snug"
                style={fontFamilyStyle}
              >
                <li className="relative group cursor-pointer">
                  <div className="absolute group-hover:bg-yellow-300 -left-[12.4px] bottom- h-16 w-[1.5px] bg-gray-50"></div>
                  <span className="absolute -left-4 bg-gray-50 group-hover:bg-yellow-400 h-2 w-2 rounded-full"></span>
                  <span className="group-hover:">
                    Russian President Vladimir Putin is confirmed to ...
                  </span>
                </li>
                <li className="relative group cursor-pointer">
                  <div className="absolute group-hover:bg-yellow-300 -left-[12.4px] bottom- h-12 w-[1.5px] bg-gray-50"></div>
                  <span className="absolute -left-4 bg-gray-50 group-hover:bg-yellow-400 h-2 w-2 rounded-full"></span>
                  <span className="group-hover:">
                    In a milestone for indigenous defense two stealth ...
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <LoginCard logo={logo} />
          </div>
        </div>
        <div className="flex items-center justify-between px-2 border-t border-gray-700 text-center py-2 text-[10px]">
          <div className="text-xs">
            © 2026 {t("webPreview.footer.copyright")}
          </div>

          {socialLinks && (
            <div className="flex gap-2">
              {socialMediaIcons?.map(({ key, icon: Icon, label, color }) => {
                const link = socialLinks[key];

                if (!link) return null;

                return (
                  <a key={key} aria-label={label} href={link} target="_blank">
                    <Icon size={18} className={color} />
                  </a>
                );
              })}
            </div>
          )}

          <div>{t("webPreview.footer.powered")}</div>
        </div>
      </footer>
    );
  },
);

Footer.displayName = "Footer";
