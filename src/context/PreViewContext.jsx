

import React, { createContext, useState } from "react";

const defaultAppPreview = {
  name: "My Awesome App",
  color: "#4F46E5",
  backgroundColor: "#FFFFFF",
  logo: "",
  language: "",
  owner_profile_pic: "",
  socialMedia: {
    fb_link: "",
    insta_link: "",
    twitter_link: "",
    linkedin_link: "",
    youtube_link: "",
    whats_link: "",
    koo_link: "",
    telegram_link: "",
  },
};

const defaultWebPreview = {
  title: "My Website",
  themeColor: "",
  color: "",
  backgroundColor: "",
  logo: "",
  font_top: "Roboto",
  font_bottom: "Roboto",
  socialMedia: {
    fb_link: "",
    insta_link: "",
    twitter_link: "",
    linkedin_link: "",
    youtube_link: "",
    whats_link: "",
    koo_link: "",
    telegram_link: "",
  },
};

export const PreViewContext = createContext();

export const PreviewProvider = ({ children }) => {
  const [appPreview, setAppPreview] = useState(defaultAppPreview);
  const [webPreview, setWebPreview] = useState(defaultWebPreview);

  const updateAppPreview = (newSettings) => {
    setAppPreview((prev) => ({ ...prev, ...newSettings }));
  };

  const updateWebPreview = (newSettings) => {
    setWebPreview((prev) => ({ ...prev, ...newSettings }));
  };

  const resetAppPreview = () => setAppPreview(defaultAppPreview);
  const resetWebPreview = () => setWebPreview(defaultWebPreview);

  return (
    <PreViewContext.Provider
      value={{
        appPreview,
        webPreview,
        updateAppPreview,
        updateWebPreview,
        resetAppPreview,
        resetWebPreview,
      }}
    >
      {children}
    </PreViewContext.Provider>
  );
};
