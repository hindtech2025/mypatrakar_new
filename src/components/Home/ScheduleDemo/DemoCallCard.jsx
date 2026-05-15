import React from "react";
import { useTranslation } from "react-i18next";
import { PopupButton } from "react-calendly";
// import { Helmet } from "react-helmet-async";
function DemoCallCard(props) {
  const { t } = useTranslation();
  return (
    <>
      {/* <Helmet>
        <title>
          Schedule a Demo | MyPatrakar - Experience the Future of News Portals
        </title>
        <meta
          name="description"
          content="Book a free demo with MyPatrakar and explore how our platform can help you launch and manage your own news portal with ease."
        />
        <meta
          name="keywords"
          content="MyPatrakar demo, schedule a demo, news portal demo, journalism platform demo, media software trial, news website demo"
        />
        <meta name="robots" content="index, follow" />
      </Helmet> */}
      <div
        className={`flex items-center justify-start mx-auto ${props.className}`}
      >
        <PopupButton
          url="https://calendly.com/mypatrakar/45min"
          rootElement={document.getElementById("root")}
          text={t("menu.schedule_demo")}
        />
      </div>
    </>
  );
}
export default DemoCallCard;
