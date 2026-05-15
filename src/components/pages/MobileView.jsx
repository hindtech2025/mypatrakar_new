// import React from "react";

// import phone1 from "../../assets/mobileview/1.1.png";
// import phone2 from "../../assets/mobileview/1.2.png";
// import phone3 from "../../assets/mobileview/1.3.png";
// import phone4 from "../../assets/mobileview/1.4.png";
// import phone5 from "../../assets/mobileview/1.5.png";
// import phone6 from "../../assets/mobileview/3.png";
// import phone7 from "../../assets/mobileview/4.png";
// import phone8 from "../../assets/mobileview/5.png";
// import phone9 from "../../assets/mobileview/6.png";
// import phone10 from "../../assets/mobileview/7.png";
// import phone11 from "../../assets/mobileview/8.png";
// import phone12 from "../../assets/mobileview/9.png";
// import phone13 from "../../assets/mobileview/10.png";
// import phone14 from "../../assets/mobileview/11.png";
// import phone15 from "../../assets/mobileview/12.png";
// import phone16 from "../../assets/mobileview/13.png";
// import phone17 from "../../assets/mobileview/14.png";
// import phone18 from "../../assets/mobileview/15.png";
// import phone19 from "../../assets/mobileview/16.png";
// import phone20 from "../../assets/mobileview/17.png";
// import phone21 from "../../assets/mobileview/18.png";
// import phone22 from "../../assets/mobileview/20.png";

// // import phone24 from "../../assets/mobileview/21.png";
// // import phone25 from "../../assets/mobileview/22.png";
// import play from "../../assets/mobileview/grid.png";
// import phone from "../../assets/mobileview/Mobile.webp";
// import ViewItemList from "./ViewItemList";
// import AboutView from "./AboutView";
// import { useTranslation } from "react-i18next";
// import { Helmet } from "react-helmet-async";
// export default function MobileView() {
//   const { t } = useTranslation();
//   const mobileView = [
//     {
//       sn: t("app.feature1.heading"),
//       heading: t("app.feature1.subHeading"),
//       description: t("app.feature1.desc"),
//       features: [
//         t("app.feature1.features.feature1"),
//         t("app.feature1.features.feature2"),
//         t("app.feature1.features.feature3"),
//       ],
//       image: phone1,
//     },
//     {
//       sn: t("app.feature2.heading"),
//       heading: t("app.feature2.subHeading"),
//       description: t("app.feature2.desc"),
//       features: [
//         t("app.feature2.features.feature1"),
//         t("app.feature2.features.feature2"),
//         t("app.feature2.features.feature3"),
//       ],
//       image: phone2,
//     },
//     {
//       sn: t("app.feature3.heading"),
//       heading: t("app.feature3.subHeading"),
//       description: t("app.feature3.desc"),
//       features: [
//         t("app.feature3.features.feature1"),
//         t("app.feature3.features.feature2"),
//         t("app.feature3.features.feature3"),
//       ],
//       image: phone3,
//     },
//     {
//       sn: t("app.feature4.heading"),
//       heading: t("app.feature4.subHeading"),
//       description: t("app.feature4.desc"),
//       features: [
//         t("app.feature4.features.feature1"),
//         t("app.feature4.features.feature2"),
//         t("app.feature4.features.feature3"),
//       ],
//       image: phone4,
//     },
//     {
//       sn: t("app.feature5.heading"),
//       heading: t("app.feature5.subHeading"),
//       description: t("app.feature5.desc"),
//       features: [
//         t("app.feature5.features.feature1"),
//         t("app.feature5.features.feature2"),
//         t("app.feature5.features.feature3"),
//       ],
//       image: phone5,
//     },
//     {
//       sn: t("app.feature6.heading"),
//       heading: t("app.feature6.subHeading"),
//       description: t("app.feature6.desc"),
//       features: [
//         t("app.feature6.features.feature1"),
//         t("app.feature6.features.feature2"),
//         t("app.feature6.features.feature3"),
//       ],
//       image: phone6,
//     },
//     {
//       sn: t("app.feature7.heading"),
//       heading: t("app.feature7.subHeading"),
//       description: t("app.feature7.desc"),
//       features: [
//         t("app.feature7.features.feature1"),
//         t("app.feature7.features.feature2"),
//         t("app.feature7.features.feature3"),
//       ],
//       image: phone7,
//     },
//     {
//       sn: t("app.feature8.heading"),
//       heading: t("app.feature8.subHeading"),
//       description: t("app.feature8.desc"),
//       features: [
//         t("app.feature8.features.feature1"),
//         t("app.feature8.features.feature2"),
//         t("app.feature8.features.feature3"),
//       ],
//       image: phone8,
//     },
//         {
//       sn: t("app.feature9.heading"),
//       heading: t("app.feature9.subHeading"),
//       description: t("app.feature9.desc"),
//       features: [
//         t("app.feature9.features.feature1"),
//         t("app.feature9.features.feature2"),
//         t("app.feature9.features.feature3"),
//       ],
//       image: phone9,
//     },
//      {
//       sn: t("app.feature10.heading"),
//       heading: t("app.feature10.subHeading"),
//       description: t("app.feature10.desc"),
//       features: [
//         t("app.feature10.features.feature1"),
//         t("app.feature10.features.feature2"),
//         t("app.feature10.features.feature3"),
//       ],
//       image: phone10,
//     },
//      {
//       sn: t("app.feature11.heading"),
//       heading: t("app.feature11.subHeading"),
//       description: t("app.feature11.desc"),
//       features: [
//         t("app.feature11.features.feature1"),
//         t("app.feature11.features.feature2"),
//         t("app.feature11.features.feature3"),
//       ],
//       image: phone11,
//     },
//      {
//       sn: t("app.feature12.heading"),
//       heading: t("app.feature12.subHeading"),
//       description: t("app.feature12.desc"),
//       features: [
//         t("app.feature12.features.feature1"),
//         t("app.feature12.features.feature2"),
//         t("app.feature12.features.feature3"),
//       ],
//       image: phone12,
//     },
//      {
//       sn: t("app.feature13.heading"),
//       heading: t("app.feature13.subHeading"),
//       description: t("app.feature13.desc"),
//       features: [
//         t("app.feature13.features.feature1"),
//         t("app.feature13.features.feature2"),
//         t("app.feature13.features.feature3"),
//       ],
//       image: phone13,
//     },
//      {
//       sn: t("app.feature14.heading"),
//       heading: t("app.feature14.subHeading"),
//       description: t("app.feature14.desc"),
//       features: [
//         t("app.feature14.features.feature1"),
//         t("app.feature14.features.feature2"),
//         t("app.feature14.features.feature3"),
//       ],
//       image: phone14,
//     },
//      {
//       sn: t("app.feature15.heading"),
//       heading: t("app.feature15.subHeading"),
//       description: t("app.feature15.desc"),
//       features: [
//         t("app.feature15.features.feature1"),
//         t("app.feature15.features.feature2"),
//         t("app.feature15.features.feature3"),
//       ],
//       image: phone15,
//     },
//      {
//       sn: t("app.feature16.heading"),
//       heading: t("app.feature16.subHeading"),
//       description: t("app.feature16.desc"),
//       features: [
//         t("app.feature16.features.feature1"),
//         t("app.feature16.features.feature2"),
//         t("app.feature16.features.feature3"),
//       ],
//       image: phone16,
//     },
//      {
//       sn: t("app.feature17.heading"),
//       heading: t("app.feature17.subHeading"),
//       description: t("app.feature17.desc"),
//       features: [
//         t("app.feature17.features.feature1"),
//         t("app.feature17.features.feature2"),
//         t("app.feature17.features.feature3"),
//       ],
//       image: phone17,
//     },
//      {
//       sn: t("app.feature18.heading"),
//       heading: t("app.feature18.subHeading"),
//       description: t("app.feature18.desc"),
//       features: [
//         t("app.feature18.features.feature1"),
//         t("app.feature18.features.feature2"),
//         t("app.feature18.features.feature3"),
//       ],
//       image: phone18,
//     },
//      {
//       sn: t("app.feature19.heading"),
//       heading: t("app.feature19.subHeading"),
//       description: t("app.feature19.desc"),
//       features: [
//         t("app.feature19.features.feature1"),
//         t("app.feature19.features.feature2"),
//         t("app.feature19.features.feature3"),
//       ],
//       image: phone19,
//     },
//      {
//       sn: t("app.feature20.heading"),
//       heading: t("app.feature20.subHeading"),
//       description: t("app.feature20.desc"),
//       features: [
//         t("app.feature20.features.feature1"),
//         t("app.feature20.features.feature2"),
//         t("app.feature20.features.feature3"),
//       ],
//       image: phone20,
//     },
//      {
//       sn: t("app.feature21.heading"),
//       heading: t("app.feature21.subHeading"),
//       description: t("app.feature21.desc"),
//       features: [
//         t("app.feature21.features.feature1"),
//         t("app.feature21.features.feature2"),
//         t("app.feature21.features.feature3"),
//       ],
//       image: phone21,
//     },
//       {
//       sn: t("app.feature22.heading"),
//       heading: t("app.feature22.subHeading"),
//       description: t("app.feature22.desc"),
//       features: [
//         t("app.feature22.features.feature1"),
//         t("app.feature22.features.feature2"),
//         t("app.feature22.features.feature3"),
//       ],
//       image: phone22,
//     },
//   ];

//   return (
//     <>
//       <Helmet>
//         <title>MyPatrakar App | Launch Your Own News Portal App</title>
//         <meta
//           name="description"
//           content="Get your own news portal mobile app with MyPatrakar. A feature-rich, fast, and scalable app for journalists, news agencies, and media houses."
//         />
//         <meta
//           name="keywords"
//           content="MyPatrakar app, news portal app, mobile news app, digital journalism, news agency app, MyPatrakar mobile platform"
//         />
//         <meta name="robots" content="index, follow" />
//       </Helmet>
//       <div className="tracking-wide">
//         <ViewItemList view={mobileView} width="1/4" height={"60vh"} />
//         <AboutView
//           image={phone}
//           play={play}
//           headding={t("app.viewHeading")}
//           para={t("app.viewDesc")}
//           option={t("app.viewFeature")}
//           width="1/2"
//         />
//       </div>
//     </>
//   );
// }



import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

import ViewItemList from "./ViewItemList";
import AboutView from "./AboutView";

// static assets (Safari safe)
import play from "../../assets/mobileview/grid.png";
import phone from "../../assets/mobileview/Mobile.webp";

// images grouped (better memory handling)
import phone1 from "../../assets/mobileview/1.1.png";
import phone2 from "../../assets/mobileview/1.2.png";
import phone3 from "../../assets/mobileview/1.3.png";
import phone4 from "../../assets/mobileview/1.4.png";
import phone5 from "../../assets/mobileview/1.5.png";
import phone6 from "../../assets/mobileview/3.png";
import phone7 from "../../assets/mobileview/4.png";
import phone8 from "../../assets/mobileview/5.png";
import phone9 from "../../assets/mobileview/6.png";
import phone10 from "../../assets/mobileview/7.png";
import phone11 from "../../assets/mobileview/8.png";
import phone12 from "../../assets/mobileview/9.png";
import phone13 from "../../assets/mobileview/10.png";
import phone14 from "../../assets/mobileview/11.png";
import phone15 from "../../assets/mobileview/12.png";
import phone16 from "../../assets/mobileview/13.png";
import phone17 from "../../assets/mobileview/14.png";
import phone18 from "../../assets/mobileview/15.png";
import phone19 from "../../assets/mobileview/16.png";
import phone20 from "../../assets/mobileview/17.png";
import phone21 from "../../assets/mobileview/18.png";
import phone22 from "../../assets/mobileview/20.png";

const images = [
  phone1, phone2, phone3, phone4, phone5, phone6, phone7, phone8,
  phone9, phone10, phone11, phone12, phone13, phone14, phone15,
  phone16, phone17, phone18, phone19, phone20, phone21, phone22
];

export default function MobileView() {
  const { t } = useTranslation();

  // 🔥 MAIN OPTIMIZATION (no recreation on re-render)
  const mobileView = useMemo(() => {
    return images.map((img, index) => {
      const i = index + 1;
      return {
        sn: t(`app.feature${i}.heading`),
        heading: t(`app.feature${i}.subHeading`),
        description: t(`app.feature${i}.desc`),
        features: [
          t(`app.feature${i}.features.feature1`),
          t(`app.feature${i}.features.feature2`),
          t(`app.feature${i}.features.feature3`),
        ],
        image: img,
      };
    });
  }, [t]);

  return (
    <>
      <Helmet>
        <title>MyPatrakar App | Launch Your Own News Portal App</title>
        <meta
          name="description"
          content="Get your own news portal mobile app with MyPatrakar. A feature-rich, fast, and scalable app for journalists, news agencies, and media houses."
        />
        <meta
          name="keywords"
          content="MyPatrakar app, news portal app, mobile news app, digital journalism, news agency app"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="tracking-wide">
        <ViewItemList
          view={mobileView}
          width="1/4"
          height="60vh"
        />

        <AboutView
          image={phone}
          play={play}
          headding={t("app.viewHeading")}
          para={t("app.viewDesc")}
          option={t("app.viewFeature")}
          width="1/2"
        />
      </div>
    </>
  );
}

