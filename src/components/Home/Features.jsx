import React, { useContext, useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { GetFeature } from "../../api";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../context/LanguageContext";


export default function Features() {
  const { translate } = useContext(LanguageContext);
  const { t } = useTranslation();
  const [features, setFeatures] = useState([]);

  // API call to fetch features
  const showFeatures = async () => {
    try {
      const res = await GetFeature();
      // console.log(res.data.response);
      setFeatures(res.data.response);
    } catch (error) {
      // console.error(error);
    }
  };
  useEffect(() => {
    showFeatures();
  }, []);

  return (
    <>
      {/* <Helmet>
        <title>Features | MyPatrakar - Powerful Tools for News Portals</title>
        <meta
          name="description"
          content="Discover the powerful features of MyPatrakar. Build your own news portal with advanced tools for content management, monetization, and audience engagement."
        />
        <meta
          name="keywords"
          content="MyPatrakar features, news portal tools, content management, audience engagement, digital journalism, SEO for news websites"
        />
        <meta name="robots" content="index, follow" />
      </Helmet> */}
      <div className="max-w-screen-2xl  lg:mx-20 md:mx-12 sm:mx-8">
        {/* Heading Section */}
        <h1 className="lg:w-2/3 md:w-2/3 sm:w-full w-full mt-4  sm:mb-6 md:mb-8 lg:mb-10  lg:mx-auto md:mx-auto sm:mx-auto mx-auto font-bold text-2xl lg:text-4xl py-4 text-center sm:text-center md:text-center lg:text-center xl:text-center tracking-wide font-sans">
          {t("features.mainHeading")}
          {/* {translate("welcome")} */}
        </h1>

        {/* Features Grid Section */}
        <section className="flex items-center justify-center  ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                {/* Icon Section */}
                <div className="flex items-center justify-center w-12 h-10 bg-red-600 rounded-full">
                  <i className={`${feature.icons} text-lg text-white`} />
                </div>
                {/* Text Section */}
                <h2 className="ml-1 text-gray-800 font-semibold text-sm w-full">
                  {translate(feature.features)}
                </h2>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
