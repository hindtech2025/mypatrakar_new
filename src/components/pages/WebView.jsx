import React from "react";

import web1 from "../../assets/webview/WebView.webp";
import web2 from "../../assets/webview/WebView2.webp";
import web3 from "../../assets/webview/WebView3.webp";
import web4 from "../../assets/webview/WebView4.webp";
import web5 from "../../assets/webview/WebView5.webp";
import web6 from "../../assets/webview/WebView6.webp";
import web7 from "../../assets/webview/WebView.png";
import web8 from "../../assets/webview/WebView8.webp";
import WebViewFooter from "../../assets/webview/WebViewFooter.png";
import AboutView from "./AboutView";
import ViewItemList from "./ViewItemList";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
export default function WebView() {
  const { t } = useTranslation();
  const webView = [
    {
      sn: t("website.feature1.heading"),
      heading: t("website.feature1.subHeading"),
      description: t("website.feature1.desc"),
      features: [
        t("website.feature1.features.feature1"),
        t("website.feature1.features.feature2"),
        t("website.feature1.features.feature3"),
      ],
      image: web1,
    },
    {
      sn: t("website.feature2.heading"),
      heading: t("website.feature2.subHeading"),
      description: t("website.feature2.desc"),
      features: [
        t("website.feature2.features.feature1"),
        t("website.feature2.features.feature2"),
        t("website.feature2.features.feature3"),
      ],
      image: web2,
    },
    {
      sn: t("website.feature3.heading"),
      heading: t("website.feature3.subHeading"),
      description: t("website.feature3.desc"),
      features: [
        t("website.feature3.features.feature1"),
        t("website.feature3.features.feature2"),
        t("website.feature3.features.feature3"),
      ],
      image: web3,
    },
    {
      sn: t("website.feature4.heading"),
      heading: t("website.feature4.subHeading"),
      description: t("website.feature4.desc"),
      features: [
        t("website.feature4.features.feature1"),
        t("website.feature4.features.feature2"),
        t("website.feature4.features.feature3"),
      ],
      image: web4,
    },
    //  Portal's comprehensive news coverage
    {
      sn: t("website.feature5.heading"),
      heading: t("website.feature5.subHeading"),
      description: t("website.feature5.desc"),
      features: [
        t("website.feature5.features.feature1"),
        t("website.feature5.features.feature2"),
        t("website.feature5.features.feature3"),
      ],
      image: web5,
    },
    {
      sn: t("website.feature6.heading"),
      heading: t("website.feature6.subHeading"),
      description: t("website.feature6.desc"),
      features: [
        t("website.feature6.features.feature1"),
        t("website.feature6.features.feature2"),
        t("website.feature6.features.feature3"),
      ],
      image: web6,
    },
    {
      sn: t("website.feature7.heading"),
      heading: t("website.feature7.subHeading"),
      description: t("website.feature7.desc"),
      features: [
        t("website.feature7.features.feature1"),
        t("website.feature7.features.feature2"),
        t("website.feature7.features.feature3"),
      ],
      image: web7,
    },
    {
      sn: t("website.feature8.heading"),
      heading: t("website.feature8.subHeading"),
      description: t("website.feature8.desc"),
      features: [
        t("website.feature8.features.feature1"),
        t("website.feature8.features.feature2"),
        t("website.feature8.features.feature3"),
      ],
      image: web8,
    },
  ];
  return (
    <>
      <Helmet>
        <title>MyPatrakar Website | Build Your Own News Portal Website</title>
        <meta
          name="description"
          content="Create a fully functional news portal website with MyPatrakar. Get a customizable, SEO-friendly, and feature-rich platform for your journalism needs."
        />
        <meta
          name="keywords"
          content="MyPatrakar website, news portal website, digital journalism, news website development, SEO-friendly news site, media platform"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <ViewItemList view={webView} witdh={"80vw"} height={"35vh"} />
      <AboutView
        image={WebViewFooter}
        btn1={t("website.btn1")}
        btn2={t("website.btn2")}
        headding={t("website.viewHeading")}
        para={t("website.viewDesc")}
        option={t("website.vewFeature")}
      />
    </>
  );
}
