
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { MyPatrakar } from "./MyPatrakar";
import GetInTouchCard from "./footertop/GetInTouchCard";
import ContactForm from "./footertop/ContactForm";
import SuccessModal from "./footertop/SuccessModal";
import UseFullLinks from "./footertop/UseFullLinks";
import Navigation from "./footertop/Navigation";

export default function FooterTop() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);



  return (
    <div className="w-full bg-gradient-to-br py-4 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* LEFT SECTION (UseFullLinks + Navigation) */}
        <div
          className="w-full lg:w-1/2 flex flex-col md:flex-row 
                        items-start justify-start 
                        bg-gray-800 rounded-2xl shadow-xl p-4 
                        border border-gray-700 gap-6"
        >
          <div className="w-full md:w-1/2">
            <UseFullLinks />
          </div>

          <div className="w-full md:w-1/2">
            <Navigation />
          </div>
        </div>

        {/* RIGHT SECTION (GetInTouch + Contact Form) */}
        <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-6">
          {/* GET IN TOUCH */}
          <div className="w-full md:w-1/2 bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-700">
            <GetInTouchCard t={t}  />
          </div>

          {/* CONTACT FORM */}
          <div className="w-full md:w-1/2 bg-gray-800 rounded-2xl shadow-xl p-3.5 border border-gray-700">
            <div className="text-center mb-3">
              <MyPatrakar />
              <h2 className="text-2xl font-bold text-white my-2">
                {t("footer.top.form.heading")}
              </h2>
            </div>

            <ContactForm t={t} onSuccess={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      <SuccessModal
        t={t}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </div>
  );
}
