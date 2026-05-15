
import React, { useEffect, useState } from "react";

import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "react-loading-skeleton/dist/skeleton.css";
import ContactCardSkeleton from "./ContactCardSkeleton";
import { ContactDetails } from "../../../api";


export default function GetInTouchCard({ t }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGetInTouch = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await ContactDetails();

      if (res?.data?.data) {
        setData(res.data.data);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (err) {
      // console.error(err);
      setError("Failed to load contact details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGetInTouch();
  }, []);

  /* --------- UI HELPERS --------- */

  if (loading) {
    return <ContactCardSkeleton />;
  }

  if (error) {
    return <div className="rounded-2xl text-red-400">{error}</div>;
  }

  const contact = data?.contactInfo;

  const getInTouchItems = [
    contact?.phone_1 && {
      text: contact.phone_1,
      link: `tel:${contact.phone_1.replace(/\D/g, "")}`,
      icon: <FaPhone className="text-red-500 rotate-90" />,
    },
    contact?.email && {
      text: contact.email,
      link: `mailto:${contact.email}`,
      icon: <FaEnvelope className="text-red-500" />,
    },
    (contact?.state || contact?.city || contact?.pincode) && {
      text: [contact.address, contact.pincode]
        // text: [contact.state, contact.city, contact.pincode]
        .filter(Boolean)
        .join(", "),
      link: "https://www.google.com/maps/place/My+Patrakar/@19.6888401,61.014591,4z/data=!4m10!1m2!2m1!1smypatrakar!3m6!1s0x399be363798144e7:0xf7eac03b4cbfe9aa!8m2!3d26.8854242!4d81.0023677!15sCghwYXRyYWthcpIBEHNvZnR3YXJlX2NvbXBhbnngAQA!16s%2Fg%2F11yx46cb51?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
      icon: <FaMapMarkerAlt className="text-red-500" />,
    },
  ].filter(Boolean);

  return (
    <div className="rounded-2xl">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent mb-4">
        {t("footer.top.mainHeading")}
      </h2>

      <p className="text-gray-300 mb-3">{t("footer.top.mainHeadingDesc")}</p>

      <h3 className="text-2xl font-bold text-red-500 mb-2">
        {t("footer.top.getInTouch")}
      </h3>

      <div className="space-y-1">
        {getInTouchItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target={item.link !== "#" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="flex items-start gap-2 p-1 transition-all hover:text-red-400 hover:no-underline"
          >
            <div className="bg-gray-900 p-1 rounded-full">{item.icon}</div>

            <p className="text-gray-200 font-medium">{item.text}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
