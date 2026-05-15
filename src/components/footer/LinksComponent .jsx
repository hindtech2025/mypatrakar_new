import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LinksComponent = ({ links }) => {
  const [dropdowns, setDropdowns] = useState({});

  const toggleDropdown = (index) => {
    setDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={index}>
          <div className="flex items-center gap-3">
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white hover:text-red-400 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                if (link.text === "internship" || link.text === "Internship")
                  toggleDropdown(index);
              }}
            >
              <FontAwesomeIcon icon={link.icon} className="w-5" />
              {link.text}
              {link.text === "internship" ||
                (link.text === "Internship" && (
                  <span className="ml-2 text-white hover:text-red-400 transition-colors">
                    ▼
                  </span>
                ))}
            </a>
          </div>
          {link.text === "internship" ||
            (link.text === "Internship" && dropdowns[index] && (
              <div className="mt-1 space-y-1 pl-6">
                {link.subLink?.map((sublink, subIndex) => (
                  <a
                    key={subIndex}
                    href={sublink.to}
                    className="block text-gray-300 hover:text-white pl-3 transition-colors"
                  >
                    {sublink.text}
                  </a>
                ))}
              </div>
            ))}
        </li>
      ))}
    </ul>
  );
};

export default LinksComponent;
