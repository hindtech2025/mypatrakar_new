import React from "react";
import logo from "../../assets/LG1.svg";
import { FaCheckCircle } from "react-icons/fa";
import kutumb from "../../assets/reporters/kutumb.png";
import astv from "../../assets/reporters/astv.png";
import indiaupdesh from "../../assets/reporters/indiaupdesh.png";
import publicbharat from "../../assets/reporters/publicbharat.png";
import { Link } from "react-router-dom";
import DemoCallCard from "../Home/ScheduleDemo/DemoCallCard";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

const reporterIcons = [
  {
    reporterLOgo: kutumb,
    reporterName: "Kutumb Jagran News",
  },
  {
    reporterLOgo: astv,
    reporterName: "ASTV 24 Ankit snwad",
  },
  {
    reporterLOgo: indiaupdesh,
    reporterName: "India Updesh",
  },
  {
    reporterLOgo: publicbharat,
    reporterName: "Public Bharat ",
  },
];

export default function Description({ guid }) {
  const { t } = useTranslation();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (


      <motion.div
        className="hidden relative  md:flex flex-col items-start p-6 md:p-8 space-y-8 bg-gradient-to-br from-red-50 to-red-100 text-black rounded-l-2xl"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        {/* <button
  onClick={() => window.history.back()}
  title="Go Back"
  className="
    absolute top-2 left-2
    w-10 h-10 md:w-11 md:h-11
    flex items-center justify-center
    rounded-full
    bg-red-50
    shadow-md
    hover:bg-red-100
    transition-all
    active:scale-95
  "
>
  <FiArrowLeft className="text-xl text-red-500" />
</button> */}

        {/* Logo Section */}
        <motion.div className="my-2" variants={item}>
          <Link to={"/"}>
            <img
              src={logo}
              alt="My Patrakar logo"
              className=" w-48 md:w-52 lg:w-56 transition-all duration-300 hover:scale-105"
              loading="lazy"
            />
          </Link>
          <p className="text-md md:text-lg font-medium py-2 text-gray-900 opacity-90">
            {t("signIn.signInDesc")}
          </p>
        </motion.div>

        {/* Guideline Section */}
        <div className="space-y-6 w-full">
          {guid?.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4 lg:gap-5 group"
              variants={item}
            >
              <div className="text-black mt-1">
                <FaCheckCircle className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-bold text-black group-hover:text-gray-800 transition-colors duration-200">
                  {item.heading}
                </h2>
                <p className="text-sm md:text-base font-medium text-gray-950 opacity-90 leading-relaxed">
                  {item.para}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trusted By Section */}
        <motion.div className="w-full mt-4" variants={item}>
          <p className="text-sm text-gray-950 mb-3">
            Trusted by leading journalists:
          </p>
          <div className="flex flex-wrap items-center gap-4 md:gap-5 lg:gap-6  backdrop-blur-sm p-4 rounded-xl">
            {reporterIcons?.map((item, index) => (
              <motion.div
                key={index}
                className="transition-all duration-300 hover:scale-110 w-12 md:w-20 lg:w-24 h-24 overflow-hidden  bg-transparent"
                whileHover={{ y: -5 }}
              >
                <img
                  src={item.reporterLOgo}
                  alt={item.reporterName}
                  className="w-full h-full object-cover "
                  loading="lazy"
                  title={item.reporterName}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          className="flex flex-wrap items-center gap-2 pt-4 text-sm md:text-base text-gray-950"
          variants={item}
        >
          <span>Need Help?</span>
          <DemoCallCard className="text-black font-medium hover:underline" />
          <span>or</span>
          <Link
            to="/contact"
            className="text-black font-medium hover:underline transition-colors duration-200"
          >
            Contact us
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black/30 to-transparent"></div> */}
      </motion.div>

  );
}
