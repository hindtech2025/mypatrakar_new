// import React from "react";
// import download from "../../assets/download.webp";
// // import UserExpe from "../../assets/UserExp.webp";
// import vote from "../../assets/Vote.png";
// // import vote from "../../assets/Vote.png";
// import Reporter from "../../assets/Repoter.png";
// // import Revenue from "../../assets/Revanue.webp";
// import Audience from "../../assets/Youtube.png";
// // import Newscuate from "../../assets/Newscuate.webp";
// import { useCallback, useState } from "react";
// import { DownloadBochure } from "../../api";
// import { useTranslation } from "react-i18next";

// export default function Functionality() {
//   const { t } = useTranslation();
//   const [show, setshow] = useState(80);
//   const handleClick = async () => {
//     // api calling here
//     try {
//       const res = await DownloadBochure();
//       const blob = new Blob([res.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "MyPatrakar.pdf"; // Specify the file name
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//       console.log(res);
//     } catch (error) {
//       console.log(error);
//     }
//     //  end api calling
//   };
//   const features = [
//     // {
//     //   image: UserExpe,
//     //   heading: "Enhanced News Experience",
//     //   para: "Introducing Our Feature-Packed Android App for Your News Portal – Stay Informed, Anywhere, Anytime!",
//     // },
//     {
//       image: vote,
//       heading: "Vote",
//       para: "voteDesc",
//     },
//     {
//       image: Reporter,
//       heading: "reporter",
//       para: "reporterDesc",
//     },
//     // {
//     //   image: Revenue,
//     //   heading: "Boost Your Revenue",
//     //   para: "Invite Public Ad Submissions and Showcase Them on Your News Portal",
//     // },
//     {
//       image: Audience,
//       heading: "audience",
//       para: "audienceDesc",
//     },
//     // {
//     //   image: Newscuate,
//     //   heading: "ePaper Feature",
//     //   para: "Introducing ePaper Integration from Admin Panel to App and Website on Your News Portal.",
//     // },
//   ];
//   const handleShowMoreData = useCallback(
//     (len) => {
//       setshow(len);
//       // console.log("object");
//     },
//     [setshow]
//   );
//   return (
//     <div className="flex-col mx-auto max-w-screen-2xl">
//       <div className="sm:mx-10 mx-2 sm:ms-8 md:ms-10 lg:ms-14 px-1 xl:ms-14   max-w-screen-2xl">
//         <section className="my md:flex flex-1 items-center justify-center xl:gap-60 lg:gap-60 md:gap-20 sm:gap-10 ">
//           <div className="lg:w-1/2 md:w-1/2 sm:w-full w-full lg:my-0  sm:mx-10 ">
//             <h1 className="font-bold font-sans text-2xl lg:text-4xl py-3 sm:mb-5 md:mb-7 lg:mb-10 text-center sm:text-center md:text-start lg:text-start xl:text-start tracking-wide">
//               {t("functionality.mainHeading")}
//             </h1>
//           </div>
//      <button
//   onClick={handleClick}
//   className="
//     flex items-center justify-center gap-3
//     mx-auto sm:mx-0
//     w-full sm:w-64 md:w-72 lg:w-80
//     px-4 sm:px-6 lg:px-10
//     py-3
//     border-2 rounded-full
//     hover:bg-gray-200 transition
//     mb-4
//   "
// >
//   <img src={download} alt="download icon" className="w-5 h-5" />
//   <p className="font-sans whitespace-nowrap">
//     {t("functionality.button")}
//   </p>
// </button>

//         </section>
//       </div>

//       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 lg:mx-10 md:mx-10 sm:mx-10 mx-5">
//         {features.map((feature, index) => (
//           <div key={index} className="flex flex-col ">
//             {/* Image Section */}
//             <div className="">
//               <img
//                 src={feature.image}
//                 alt={feature.heading}
//                 className="w-full h-96 object-cover"
//               />
//             </div>

//             {/* Content Section */}
//             <div className="p-4">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 {/* {feature.heading} */}
//                 {t(`functionality.functions.${feature.heading}`)}
//               </h2>
//               <p
//                 className="mt-2 text-gray-600 text-sm leading-relaxed tracking-wide"
//                 onClick={() =>
//                   handleShowMoreData(
//                     t(`functionality.functions.${feature.para}`).length
//                   )
//                 }
//               >
//                 {show < t(`functionality.functions.${feature.para}`).length ? (
//                   <>
//                     {t(`functionality.functions.${feature.para}`)}{" "}
//                     <span className="text-red-500 font-medium cursor-pointer">
//                       ...
//                     </span>
//                   </>
//                 ) : (
//                   t(`functionality.functions.${feature.para}`)
//                 )}
//               </p>
//             </div>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// }



import React, { useCallback, useState } from "react";
import download from "../../assets/download.webp";
import vote from "../../assets/Vote.png";
import Reporter from "../../assets/Repoter.png";
import Audience from "../../assets/Youtube.png";
import { DownloadBochure } from "../../api";
import { useTranslation } from "react-i18next";

export default function Functionality() {
  const { t } = useTranslation();

  // Track expanded card (per card)
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Download brochure
  const handleClick = async () => {
    try {
      const res = await DownloadBochure();
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "MyPatrakar.pdf";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // console.error(error);
    }
  };

  const features = [
    {
      image: vote,
      heading: "vote",
      para: "voteDesc",
    },
    {
      image: Reporter,
      heading: "reporter",
      para: "reporterDesc",
    },
    {
      image: Audience,
      heading: "audience",
      para: "audienceDesc",
    },
  ];

  const toggleExpand = useCallback(
    (index) => {
      setExpandedIndex((prev) => (prev === index ? null : index));
    },
    []
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
      {/* ================= HEADER SECTION ================= */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 py-10">
      {/* <section className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 py-10"> */}
        <h1
          className="
            font-bold font-sans
            text-2xl sm:text-3xl lg:text-4xl
            text-center md:text-center
            tracking-wide 
          "
        >
          {t("functionality.mainHeading")}
        </h1>

        {/* <button
          onClick={handleClick}
          className="
            flex items-center justify-center gap-3
            w-full sm:w-64 md:w-72 lg:w-80
            px-4 sm:px-6 lg:px-10
            py-3
            border-2 rounded-full
            hover:bg-gray-200 transition
            active:scale-95
          "
        >
          <img src={download} alt="download icon" className="w-5 h-5" />
          <span className="font-sans whitespace-nowrap">
            {t("functionality.button")}
          </span>
        </button> */}
      </section>

      {/* ================= FEATURES GRID ================= */}
      <section
        className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-8
          py-10
        "
      >
        {features.map((feature, index) => {
          const text = t(`functionality.functions.${feature.para}`);
          const isExpanded = expandedIndex === index;
          const shortText = text.slice(0, 120);

          return (
            <div
              key={index}
              className="
                flex flex-col
                rounded-xl overflow-hidden
                border
                hover:shadow-md transition
              "
            >
              {/* Image */}
              <div className="w-full aspect-[4/3]">
                <img
                  src={feature.image}
                  alt={feature.heading}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-gray-800">
                  {t(`functionality.functions.${feature.heading}`)}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed tracking-wide">
                  {isExpanded ? text : shortText}
                  {text.length > 120 && (
                    <span
                      onClick={() => toggleExpand(index)}
                      className="text-red-500 font-medium cursor-pointer ml-1"
                    >
                      {isExpanded ? " Read less" : " ...Read more"}
                    </span>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
