// import React from "react";
// import { useTranslation } from "react-i18next";

// const MissionSection = () => {
//   const { t } = useTranslation();
//   return (
//     <div className="flex md:flex-row items-start  my-36 ">
//       <div className="w-1/2">
//         <h3 className="text-center text-xl font-semibold">
//           {t("contact.visionHeading")}
//         </h3>
//         <p className="text-start px-6 mt-2 tracking-wide">
//         {t("contact.visionDesc")}
//         </p>
//       </div>
//       <div className="w-1/2">
//         <h3 className="text-center text-xl font-semibold tracking-wide">  {t("contact.missionHeading")}</h3>
//         <p className="text-start px-6 mt-2 tracking-wide">
//         {t("contact.missionDesc")}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default MissionSection;



import React from "react";
import { useTranslation } from "react-i18next";
import { FaLightbulb, FaBullseye } from "react-icons/fa";

const MissionSection = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 -z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
        {/* Vision Card */}
        <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl -z-20">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gray-800 to-gray-900 rounded-t-2xl -z-10"></div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-full p-3 shadow-lg">
              <FaLightbulb className="text-white text-3xl" />
            </div>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
            {t("contact.visionHeading")}
          </h3>
          
          <div className="relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full"></div>
            <p className="text-gray-600 text-lg leading-relaxed text-center">
              {t("contact.visionDesc")}
            </p>
          </div>
        </div>

        {/* Mission Card */}
        <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl  -z-20">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 to-red-700 rounded-t-2xl"></div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-full p-3 shadow-lg">
              <FaBullseye className="text-white text-3xl" />
            </div>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
            {t("contact.missionHeading")}
          </h3>
          
          <div className="relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-red-600 to-red-700 rounded-full"></div>
            <p className="text-gray-600 text-lg leading-relaxed text-center">
              {t("contact.missionDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;