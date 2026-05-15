// import { useEffect, useState } from "react";
// import React from "react";
// import PriceInfoCard from "./PriceInfoCard";
// import { GetPriceDetails } from "../../../api";
// import { useTranslation } from "react-i18next";
// import { Helmet } from "react-helmet-async";
// import { useLocation } from "react-router-dom";

// const Pricing = () => {
//   const location = useLocation();
//   const [region, setRegion] = useState(0);
//   const [pricingDetails, setPricingDetails] = useState([]);
//   const handleRegionClick = (region) => {
//     setRegion(region);
//   };

//   const { t } = useTranslation();

//   // api calling here
//   const handlePricingDetails = async () => {
//     try {
//       const res = await GetPriceDetails();
//       console.log(res.data.response);
//       let data = res.data.response.filter((rgn) => rgn.region == region);
//       setPricingDetails(data);
//     } catch (error) {
//       // console.log(error);
//     }
//   };
//   useEffect(() => {
//     handlePricingDetails();
//   }, [region]);
//   // end api calling
//   return (
//     <>
//       {location.pathname == "/pricing-in-my-patrakar" && (
//         <Helmet>
//           <title>
//             Pricing | MyPatrakar - Affordable News Portal Development
//           </title>
//           <meta
//             name="description"
//             content="Explore MyPatrakar's simple and economical pricing plans. Get your own news portal website and mobile app at an affordable cost with top-notch features."
//           />
//           <meta
//             name="keywords"
//             content="MyPatrakar pricing, news portal pricing, affordable news website, news app cost, MyPatrakar plans, news portal development cost"
//           />
//           <meta name="robots" content="index, follow" />
//         </Helmet>
//       )}
//       <div className="lg:mx-auto sm:mx-10 mx-0 px-3 md:px-10 p-0 my-24 sm:my-20 md:my-20 lg:my-20 py-3 ">
//         <h2 className="lg:w-2/3 md:w-2/3 sm:w-full w-full mt-4  sm:mb-6 md:mb-8 lg:mb-10  lg:mx-auto md:mx-auto sm:mx-auto mx-auto font-bold text-2xl lg:text-4xl py-4 text-center sm:text-center md:text-center lg:text-center xl:text-center tracking-wide font-sans">
//           {t("pricing")}
//         </h2>
//         <div className="relative w-full my-5  md:w-1/2  mx-auto border rounded-full flex">
//           {/* Active Highlight */}
//           <div
//             className={`absolute top-0  h-full w-1/2 bg-red-500 rounded-full shadow-md transform transition-transform duration-300 ${
//               region === 0 ? "translate-x-0" : "translate-x-full"
//             }`}
//           ></div>

//           {/* Buttons */}
//           <button
//             onClick={() => handleRegionClick(0)}
//             className={`relative z-10 w-1/2 py-3  font-semibold text-center transition-colors duration-300 ${
//               region === 0 ? "text-white" : "text-gray-800"
//             }`}
//           >
//             India
//           </button>

//           <button
//             onClick={() => handleRegionClick(1)}
//             className={`relative z-10 w-1/2 py-3 text-center font-semibold transition-colors duration-300 ${
//               region === 1 ? "text-white" : "text-gray-800"
//             }`}
//           >
//             Outside of India
//           </button>
//         </div>

//         <div className="md:flex md:flex-wrap flex-1 lg:space-y-0 space-y-4 items-start justify-center gap-4">
//           {pricingDetails.length > 0 &&
//             pricingDetails.map((pkg) => {
//               return (
//                 <div key={pkg.package_id}>
//                   <PriceInfoCard
//                     region={pkg.region == 0 ? "India" : "OutSide of India"}
//                     realPrice={pkg.mrp}
//                     payAble={pkg.payable}
//                     discount={pkg.discount}
//                     packageDesc={pkg.validity}
//                     packageName={pkg.package_name}
//                     // mrp={pkg.mrp}
//                     atPriceFeatures={
//                       pkg?.features?.length > 0 ? pkg.features : []
//                     }
//                   />
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Pricing;



import { useEffect, useState } from "react";
import React from "react";
import PriceInfoCard from "./PriceInfoCard";
import { GetPriceDetails } from "../../../api";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const Pricing = () => {
  const location = useLocation();
  const [region, setRegion] = useState(0);
  const [packageType, setPackageType] = useState("live"); // 'live' or 'demo'
  const [pricingDetails, setPricingDetails] = useState([]);
  const [allPackages, setAllPackages] = useState([]); // Store all packages
  const handleRegionClick = (region) => {
    setRegion(region);
  };

  const { t } = useTranslation();

  // api calling here
  const handlePricingDetails = async () => {
    try {
      const res = await GetPriceDetails();
      // console.log(res.data.response);
      let data = res.data.response.filter((rgn) => rgn.region == region);
      setAllPackages(data);
      
      // Apply package type filter
      filterPackagesByType(data, packageType);
    } catch (error) {
      // console.log(error);
    }
  };

  // Filter packages based on demo/live
  const filterPackagesByType = (packages, type) => {
    let filteredData;
    if (type === "demo") {
      // Show only demo packages (is_demo == 1)
      filteredData = packages.filter((pkg) => pkg.is_demo == 1);
    } else {
      // Show only live packages (is_demo == 0)
      filteredData = packages.filter((pkg) => pkg.is_demo == 0);
    }
    setPricingDetails(filteredData);
  };

  // Handle package type click
  const handlePackageTypeClick = (type) => {
    setPackageType(type);
    filterPackagesByType(allPackages, type);
  };

  useEffect(() => {
    handlePricingDetails();
  }, [region]);

  // Re-apply filter when packageType changes (if allPackages is already loaded)
  useEffect(() => {
    if (allPackages.length > 0) {
      filterPackagesByType(allPackages, packageType);
    }
  }, [packageType]);

  // end api calling
  return (
    <>
      {location.pathname == "/pricing-in-my-patrakar" && (
        <Helmet>
          <title>
            Pricing | MyPatrakar - Affordable News Portal Development
          </title>
          <meta
            name="description"
            content="Explore MyPatrakar's simple and economical pricing plans. Get your own news portal website and mobile app at an affordable cost with top-notch features."
          />
          <meta
            name="keywords"
            content="MyPatrakar pricing, news portal pricing, affordable news website, news app cost, MyPatrakar plans, news portal development cost"
          />
          <meta name="robots" content="index, follow" />
        </Helmet>
      )}
      <div className="lg:mx-auto sm:mx-10 mx-0 px-3 md:px-10 p-0 my-24 sm:my-20 md:my-20 lg:my-20 py-3 ">
        <h2 className="lg:w-2/3 md:w-2/3 sm:w-full w-full mt-4  sm:mb-6 md:mb-8 lg:mb-10  lg:mx-auto md:mx-auto sm:mx-auto mx-auto font-bold text-2xl lg:text-4xl py-4 text-center sm:text-center md:text-center lg:text-center xl:text-center tracking-wide font-sans">
          {t("pricing")}
        </h2>
        
        {/* Region Toggle */}
        <div className="relative w-full my-5 md:w-1/2 mx-auto border rounded-full flex">
          {/* Active Highlight */}
          <div
            className={`absolute top-0 h-full w-1/2 bg-red-500 rounded-full shadow-md transform transition-transform duration-300 ${
              region === 0 ? "translate-x-0" : "translate-x-full"
            }`}
          ></div>

          {/* Buttons */}
          <button
            onClick={() => handleRegionClick(0)}
            className={`relative z-10 w-1/2 py-3 font-semibold text-center transition-colors duration-300 ${
              region === 0 ? "text-white" : "text-gray-800"
            }`}
          >
            India
          </button>

          <button
            onClick={() => handleRegionClick(1)}
            className={`relative z-10 w-1/2 py-3 text-center font-semibold transition-colors duration-300 ${
              region === 1 ? "text-white" : "text-gray-800"
            }`}
          >
            Outside of India
          </button>
        </div>

        {/* Demo/Live Package Toggle Buttons */}
        <div className="relative w-full my-5 md:w-1/3 mx-auto border rounded-full flex">
          {/* Active Highlight */}
          <div
            className={`absolute top-0 h-full w-1/2 bg-red-500 rounded-full shadow-md transform transition-transform duration-300 ${
              packageType === "live" ? "translate-x-0" : "translate-x-full"
            }`}
          ></div>

          {/* Buttons */}
          <button
            onClick={() => handlePackageTypeClick("live")}
            className={`relative z-10 w-1/2 py-3 font-semibold text-center transition-colors duration-300 ${
              packageType === "live" ? "text-white" : "text-gray-800"
            }`}
          >
            Live Packages
          </button>

          <button
            onClick={() => handlePackageTypeClick("demo")}
            className={`relative z-10 w-1/2 py-3 text-center font-semibold transition-colors duration-300 ${
              packageType === "demo" ? "text-white" : "text-gray-800"
            }`}
          >
            Demo Packages
          </button>
        </div>

        <div className="md:flex md:flex-wrap flex-1 lg:space-y-0 space-y-4 items-start justify-center gap-4">
          {pricingDetails.length > 0 ? (
            pricingDetails.map((pkg) => {
              return (
                <div key={pkg.package_id}>
                  <PriceInfoCard
                    region={pkg.region == 0 ? "India" : "OutSide of India"}
                    realPrice={pkg.mrp}
                    payAble={pkg.payable}
                    discount={pkg.discount}
                    packageDesc={pkg.validity}
                    packageName={pkg.package_name}
                    atPriceFeatures={
                      pkg?.features?.length > 0 ? pkg.features : []
                    }
                  />
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-10 w-full">
              No {packageType === "demo" ? "demo" : "live"} packages available for this region
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pricing;