// import React from "react";

// import operate from "../../assets/operate.svg";
// import support from "../../assets/support.svg";
// import price from "../../assets/price.svg";
// import vectorImage from "../../assets/vector (1).svg";
// import { useTranslation } from "react-i18next";
// export default function Instructions() {
//   const { t } = useTranslation();
//   const instruction = [
//     {
//       logo: operate,
//       heading: "operate",
//       para: "operateDesc",
//     },
//     {
//       logo: price,
//       heading: "pricing",
//       para: "pricingDesc",
//     },
//     {
//       logo: support,
//       heading: "support",
//       para: "supportDesc",
//     },
//   ];

//   return (
//     <div className="flex items-center justify-center max-w-6xl sm:mx-auto md:mx-auto lg:mx-auto  lg:h-96 h-auto ">
//       <div className="md:flex  sm:py-5 px-2 sm:px-1 md:px-11 lg:p-12 py-5  bg-red-50 rounded lg:justify-around gap-10 lg:mx-14 ms-20  md:mx-12 sm:mx-12 mx-3">
//         {/* Left Section */}
//         <section className="flex flex-col lg:w-1/2 w-full mb-10 lg:mb-0 ">
//           <h1 className="font-bold font-sans text-2xl lg:text-4xl p-3">
//             {t("instructions.mainHeading")}
//           </h1>
//           <p className="text-left ms-3 text-gray-600 lg:text-xs text-sm font-medium font-Poppins mt-2 tracking-wide ">
//             {t("instructions.mainHeadingDesc")}
//           </p>
//           <div className="flex gap-2 mt-4 items-start">
//             <div className="  mt-3">
//               <img src={vectorImage} alt="pc" className="w-24 h-12 " />
//             </div>
//             <div className="flex-col items-start">
//               <h2 className="text-left font-semibold text-lg font-sans lg:text-2xl py-2 lg:py-2 font-Poppins text-gray-800">
//                 {t("instructions.mainSubheading")}
//               </h2>
//               <p className="text-left  text-gray-600 lg:text-xs text-sm font-medium font-Poppins">
//                 <span className="text-md font-semibold tracking-wide ">MyPatrakar</span>{" "}
//                 {t("instructions.mainSubheadingDesc")}
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Right Section */}
//         <section className="flex flex-col lg:w-1/2 w-full gap-8 me-3">
//           {instruction.map((item, index) => (
//             <div key={index} className="flex gap-2 items-start">
//               <div className="  mt-3 ">
//                 <img src={item.logo} alt={item.heading} className="w-24 h-12" />
//               </div>
//               <div>
//                 <h2 className="text-left font-semibold text-lg font-sans lg:text-2xl py-2 lg:py-2 font-Poppins text-gray-800">
//                   {t(`instructions.instructionHeadings.${item.heading}`)}
//                 </h2>
//                 <p className="text-left  text-gray-600 lg:text-xs text-sm font-medium font-Poppins tracking-wide ">
//                 {t(`instructions.instructionHeadings.${item.para}`)}
                
//                 </p>
//               </div>
//             </div>
//           ))}
//         </section>
//       </div>
//     </div>
//   );
// }



import React from "react";
import operate from "../../assets/operate.svg";
import support from "../../assets/support.svg";
import price from "../../assets/price.svg";
import vectorImage from "../../assets/vector (1).svg";
import { useTranslation } from "react-i18next";

export default function Instructions() {
  const { t } = useTranslation();
  const instruction = [
    {
      logo: operate,
      heading: "operate",
      para: "operateDesc",
    },
    {
      logo: price,
      heading: "pricing",
      para: "pricingDesc",
    },
    {
      logo: support,
      heading: "support",
      para: "supportDesc",
    },
  ];

  return (
    <div className="flex items-center justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row w-full bg-red-50 rounded-xl p-6 md:p-8 lg:p-12 gap-8 md:gap-6 lg:gap-10">
        {/* Left Section */}
        <section className="flex flex-col w-full md:w-1/2">
          <h1 className="font-bold font-sans text-2xl lg:text-3xl xl:text-4xl mb-3">
            {t("instructions.mainHeading")}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-medium font-Poppins mb-4 md:mb-6">
            {t("instructions.mainHeadingDesc")}
          </p>
          <div className="flex gap-3 items-start">
            <div className="mt-1">
              <img 
                src={vectorImage} 
                alt="pc" 
                className="w-16 sm:w-20 md:w-24 h-auto" 
              />
            </div>
            <div className="flex flex-col">
              <h2 className="font-semibold text-lg md:text-xl lg:text-2xl font-Poppins text-gray-800">
                {t("instructions.mainSubheading")}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base font-medium font-Poppins">
                <span className="font-semibold">MyPatrakar</span>{" "}
                {t("instructions.mainSubheadingDesc")}
              </p>
            </div>
          </div>
        </section>

        {/* Right Section */}
        <section className="flex flex-col w-full md:w-1/2 gap-6 md:gap-5 lg:gap-8">
          {instruction.map((item, index) => (
            <div key={index} className="flex gap-3 items-start">
              <div className="mt-1">
                <img 
                  src={item.logo} 
                  alt={item.heading} 
                  className="w-16 sm:w-20 md:w-24 h-auto" 
                />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-lg md:text-xl lg:text-2xl font-Poppins text-gray-800 mb-1">
                  {t(`instructions.instructionHeadings.${item.heading}`)}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base font-medium font-Poppins">
                  {t(`instructions.instructionHeadings.${item.para}`)}
                </p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}