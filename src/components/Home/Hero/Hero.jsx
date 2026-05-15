import vector32 from "../../../assets/Vector_32.png";
import { useTranslation } from "react-i18next";
import "../../../i18n"; // Import i18n config
import MyPatrakarThumbNail from "../../../assets/My Patrakar Thumbnail Image.png";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
// import logo from "../../../assets/LG2.svg";
// import User from "../../NewsPortal/AdminDashbord/shared/User";
export default function Hero() {
  const { t } = useTranslation();
  // const logoUrl = "https://mypatrakar.com/assets/LG2-CcMgpPb7.svg";

  const buttons = [
    {
      text: "android",
      href: "/product/app-demo",
    },
    // {
    //   text: "ios",
    //   href: "/product/app",
    // },
    {
      text: "website",
      href: "/product/web-demo",
    },
    {
      text: "admin",
      href: "/product/website",
    },
  ];

  return (
    <>
      <Helmet>
        <title>MyPatrakar | Complete News Portal Development Solution</title>
        <meta
          name="description"
          content="MyPatrakar is the one-stop solution for building a complete news portal."
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta for Social Media Sharing */}
        <meta
          property="og:title"
          content="MyPatrakar - Best Journalist Platform"
        />
        <meta
          property="og:description"
          content="Create your own journalism website with MyPatrakar."
        />
        {/* <meta property="og:image" content={logoUrl} /> */}
        <meta property="og:url" content="https://mypatrakar.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card for Twitter Previews */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="MyPatrakar - Best Journalist Platform"
        />
        <meta
          name="twitter:description"
          content="Create your own journalism website with MyPatrakar."
        />
        {/* <meta name="twitter:image" content={logoUrl} /> */}

        {/* Schema.org JSON-LD for Google Logo Display */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MyPatrakar",
            url: "https://mypatrakar.com",
            // logo: logoUrl, // Updated absolute URL
          })}
        </script>
      </Helmet>
      <div
        
        className="screen-max-w-2xl md:flex flex-row-reverse  md:items-start items-center lg:justify-start sm:justify-center justify-center md:py-5 md:mt-24 lg:mt-24 sm:mt-24 mt-24  md:px-10 select-none"
      >
        {/* Left Section: Text & Images */}
        <div
          className="md:col-4 sm:col-3 
      rounded-xl lg:w-2/5 md:2/3 sm:w-1/2 xs:w-1/2 w-5/6 flex items-center justify-center mx-auto   lg:px-0 px-3 "
        >
          <img
            src={MyPatrakarThumbNail}
            alt=""
            className="rounded-xl"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-start md:justify-start xl:w-5/6  lg:w-5/6 md:5/6 w-full px-4 lg:px-6 space-y-6 md:mx-0 mx-auto">
          {/* Hero Text Image */}
          <h1 className="xl:text-7xl lg:text-6xl text-5xl xl:w-5/6 lg:w-5/6  font-bold font-Poppins text-black md:mx-0  md:text-start  sm:text-center  md:tracking-wide leading-tight xs:text-center lg:mt-0 md:mt-0 sm:mt-1 mt-3">
            {t("hero")}
          </h1>
          {/* Vector Image */}
          <div className="flex md:items-start lg:justify-start md:justify-start sm:justify-center   md:mx-0 sm:mx-auto xs:mx-auto md:my-0 ">
            {" "}
            <img
              src={vector32}
              alt="vector 32"
              className="xl:w-5/6 xl:my-5 lg:w-2/3 w-2/3 "
            />
          </div>

          <div className="sm:w-full xl:w-5/6 xl:text-2xl  lg:w-2/3 md:w-5/6 sm:mx-auto md:mx-0 mx-0 ">
            {/* Description */}
            <p className="2xl:w-1/2 xl:w-2/3 lg:w-2/3 md:w-2/3  sm:w-5/6 xl:text-md  w-full text-base  font-medium font-Poppins xl:text-left lg:text-left  md:mx-0  tracking-wide md:text-left  sm:text-center xs:text-center md:my-0 my-3">
              {t("heroDesc")}{" "}
            </p>
            {/* Action Buttons */}

            <div className="flex flex-wrap justify-center gap-4 xl:justify-start lg:justify-start md:justify-start sm:justify-start">
              {buttons.map((button) => (
                <div key={button.text} className="w-full sm:w-auto">
                  <Link to={`${button.href}`}>
                    <button className="w-full sm:w-auto px-6 py-2 border border-gray-700 text-gray-800 font-medium rounded-full bg-gray-50 hover:bg-red-200 transition-all duration-200 text-sm sm:text-base lg:text-lg xl:text-xl  sm:py-3 md:py-2 lg:py-2">
                      {t(`heroButtons.${button.text}`)}
                    </button>
                  </Link>
                </div>
              ))}
              <div className="w-full sm:w-auto">
                <Link to="/portal/createPortal">
                  <button className="w-full sm:w-auto px-6 py-2 sm:py-3 md:py-2 lg:py-2 border border-red-700 text-gray-50 hover:text-gray-800 font-medium rounded-full bg-red-500 hover:bg-red-200 transition-all duration-200 text-sm sm:text-base lg:text-lg xl:text-xl">
                    {t("heroButtonsFree")}
                    {/* <span className="inline-block ml-2 scale-90">✨</span> */}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
