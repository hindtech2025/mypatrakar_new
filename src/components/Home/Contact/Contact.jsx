import ContactInfo from "./ContactInfo";
import React, { useState } from "react";
import ContactTop from "./ContactTop";
import MissionSection from "./MissionSection ";
import RequestCallbackForm from "./RequestCallbackForm ";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [address, setAddress] = useState(
    "Building No 10/703, Ground Floor, near Arvindo Park Road, Sector 10, Indira Nagar, Lucknow, Uttar Pradesh 226016",
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -z-10">
      <Helmet>
        <title>Contact Us | MyPatrakar - Connect with Our Team</title>
        <meta
          name="description"
          content="Get in touch with MyPatrakar team. We're here to answer your questions and support your journalism needs. Contact us today!"
        />
        <meta
          name="keywords"
          content="contact MyPatrakar, journalism support, media contact, press inquiry, reporter assistance"
        />
        <meta name="author" content="MyPatrakar" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.mypatrakar.com/contact" />
      </Helmet>

      {/* Contact Top Section */}
      <div className="mb-12 md:mb-16">
        <ContactTop />
      </div>

      {/* Mission Section */}
      <div className="mb-16">
        <MissionSection />
      </div>

      {/* Contact Info + Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 mb-20">
        <ContactInfo setAddress={setAddress} />

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
          {/* <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-red-500 inline-block">
            Request a Callback
          </h2> */}
          <RequestCallbackForm />
        </div>
      </div>

      {/* Google Map Section */}
      <div className="mb-20 rounded-xl overflow-hidden shadow-xl border border-gray-200">
        <iframe
          title="MyPatrakar Office Location"
          src="https://www.google.com/maps?q=My+Patrakar&output=embed"
          className="w-full h-[300px] sm:h-[400px] md:h-[450px]"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Contact;
