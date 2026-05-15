import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { PreViewContext } from "../../../context/PreViewContext";

const SocialMediaLinks = ({
  setUserRequest,
  setEmpty,
  submitForm,
  setSubmitForm,
}) => {
  const { webPreview, updateWebPreview } = useContext(PreViewContext);

  const [links, setLinks] = useState({
    fb_link: "",
    insta_link: "",
    twitter_link: "",
    linkedin_link: "",
    youtube_link: "",
    whats_link: "",
    koo_link: "",
    telegram_link: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [activeField, setActiveField] = useState(null);

  // Keep patterns memoized (stable reference)
  const PLATFORM_PATTERNS = useMemo(
    () => ({
      fb_link: {
        domains: ["facebook.com"],
        example: "facebook.com/yourpage",
        prefixes: ["facebook.com", "www.facebook.com", "fb.com"],
      },
      insta_link: {
        domains: ["instagram.com"],
        example: "instagram.com/username",
        prefixes: ["instagram.com", "www.instagram.com"],
      },
      twitter_link: {
        domains: ["x.com", "twitter.com"],
        example: "x.com/username",
        prefixes: ["x.com", "twitter.com", "www.x.com", "www.twitter.com"],
      },
      linkedin_link: {
        domains: ["linkedin.com"],
        example: "linkedin.com/in/username",
        prefixes: ["linkedin.com", "www.linkedin.com"],
      },
      youtube_link: {
        domains: ["youtube.com"],
        example: "youtube.com/c/channelname",
        prefixes: ["youtube.com", "www.youtube.com", "youtu.be"],
      },
      koo_link: {
        domains: ["kooapp.com"],
        example: "kooapp.com/profile/username",
        prefixes: ["kooapp.com", "www.kooapp.com"],
      },
      telegram_link: {
        domains: ["t.me"],
        example: "t.me/username",
        prefixes: ["t.me"],
      },
    }),
    []
  );

  // Format WhatsApp number automatically
  const formatWhatsAppNumber = useCallback((value) => {
    if (!value) return "";

    // Allow only numbers and +
    let cleaned = value.replace(/[^\d+]/g, "");

    // Auto-add country code if Indian number
    if (cleaned.length >= 10 && !cleaned.startsWith("+")) {
      if (cleaned.startsWith("0")) {
        cleaned = `+91${cleaned.substring(1)}`;
      } else if (cleaned.length === 10) {
        cleaned = `+91${cleaned}`;
      }
    }

    return cleaned.substring(0, 13); // limit length (kept same as original)
  }, []);

  // Complete partial URLs
  const completeUrl = useCallback(
    (value, name) => {
      if (!value) return "";

      // Skip if already has protocol
      if (value.startsWith("http://") || value.startsWith("https://")) {
        return value;
      }

      const platform = PLATFORM_PATTERNS[name];
      if (!platform) return `https://${value}`;

      const hasDomain = platform.prefixes.some(
        (prefix) => value.startsWith(prefix) || value.includes(`.${prefix}`)
      );

      if (hasDomain) {
        return `https://${value}`;
      }

      const mainDomain = platform.domains[0];
      if (!value.startsWith("www.")) {
        return `https://www.${mainDomain}/${value.replace(/^\/+/, "")}`;
      }

      return `https://${value}`;
    },
    [PLATFORM_PATTERNS]
  );

  // Validate field: empty is allowed; non-empty must conform
  const validateField = useCallback(
    (name, value) => {
      if (!value || !value.trim()) return ""; // optional

      if (name === "whats_link") {
        if (!/^\+?\d{10,15}$/.test(value)) {
          return "Enter valid WhatsApp number (e.g., +911234567890)";
        }
        return "";
      }

      try {
        const url = completeUrl(value, name);
        new URL(url); // throws if invalid

        const domain = url.split("/")[2]?.toLowerCase() || "";
        const validDomains = PLATFORM_PATTERNS[name]?.domains || [];

        if (validDomains.length && !validDomains.some((d) => domain.includes(d))) {
          return `URL must contain ${validDomains.join(" or ")}`;
        }

        return "";
      } catch {
        return "Please enter a valid URL";
      }
    },
    [completeUrl, PLATFORM_PATTERNS]
  );

  // Unified handleChange (kept same external behavior)
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      // keep parent notified (original behavior)
      setEmpty(false);

      if (name === "whats_link") {
        const formatted = formatWhatsAppNumber(value);
        setLinks((prev) => {
          if (prev[name] === formatted) return prev;
          return { ...prev, [name]: formatted };
        });

        if (touched[name]) {
          setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, formatted),
          }));
        }
        return;
      }

      setLinks((prev) => {
        if (prev[name] === value) return prev;
        return { ...prev, [name]: value };
      });

      if (touched[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: validateField(name, value),
        }));
      }
    },
    [formatWhatsAppNumber, touched, validateField, setEmpty]
  );

  const handleFocus = useCallback(
    (name) => {
      setActiveField(name);
      setTouched((prev) => {
        if (prev[name]) return prev;
        return { ...prev, [name]: true };
      });
    },
    [setTouched]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setActiveField(null);

      if (name !== "whats_link" && value) {
        const completedUrl = completeUrl(value, name);
        // Only update if different to avoid extra render
        setLinks((prev) => {
          const current = prev[name] || "";
          // compare after normalising leading protocol removal if user had input protocol earlier
          if (current === completedUrl || current === value) return prev;
          return { ...prev, [name]: completedUrl };
        });
      }

      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    },
    [completeUrl, validateField]
  );

  // Sync formatted data upward — keep behavior but clearer
  useEffect(() => {
    // Build formattedLinks without mutating original state
    const formattedLinks = Object.keys(links).reduce((acc, key) => {
      const val = links[key];
      if (!val) {
        acc[key] = "";
      } else if (key === "whats_link") {
        acc[key] = val;
      } else {
        acc[key] = completeUrl(val, key);
      }
      return acc;
    }, {});

    // update preview and parent
    updateWebPreview({ ...webPreview, socialMedia: formattedLinks });
    setUserRequest((prev) => ({ ...prev, socialMediaLinks: formattedLinks }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links, completeUrl]); // intentionally minimal deps: updateWebPreview and setUserRequest come from context/props, but they are stable in your app

  // Validate on submitForm trigger (improved clarity; behavior unchanged)
  useEffect(() => {
    if (!submitForm) return;

    const newErrors = {};
    let hasErrors = false;

    Object.keys(links).forEach((key) => {
      const val = (links[key] || "").toString();
      if (val.trim()) {
        newErrors[key] = validateField(key, val);
        if (newErrors[key]) hasErrors = true;
      } else {
        newErrors[key] = "";
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(links).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    setSubmitForm(false);
    setEmpty(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitForm, links, validateField]); // keep minimal deps

  // Social media fields config with icons and styling from HTML (kept identical)
  const socialMediaFields = useMemo(
    () => [
      {
        label: "WhatsApp",
        name: "whats_link",
        icon: (
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.46 3.48 1.32 4.95L2 22l5.25-1.38c1.41.79 3.02 1.22 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91s-4.45-9.9-9.91-9.9zM12.04 20.13c-1.53 0-2.99-.4-4.28-1.12L7.1 18.7l-3.08.81.83-3.02-.32-.5c-.8-1.33-1.22-2.84-1.22-4.41 0-4.54 3.69-8.23 8.23-8.23 4.54 0 8.23 3.69 8.23 8.23s-3.69 8.23-8.23 8.23zm4.52-6.19c-.25-.12-1.47-.72-1.7-.82-.22-.09-.38-.12-.54.12-.16.25-.64.82-.79.98-.15.16-.3.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.66-1.22-1.48-1.36-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.38-.43.12-.14.16-.25.25-.41.09-.17.04-.31-.02-.43s-.54-1.3-.74-1.78c-.2-.48-.4-.42-.54-.42-.14 0-.3 0-.46 0s-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.88 2.4 1 2.56c.12.17 1.73 2.63 4.19 3.7.59.26 1.05.41 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.12-.22-.19-.46-.31z" />
          </svg>
        ),
        required: true,
        bgColor: "bg-[#25D366]",
        placeholder: "https://wa.me/",
        requiredMessage: "Please enter your Number",
      },
      {
        label: "YouTube",
        name: "youtube_link",
        icon: (
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        ),
        bgColor: "bg-[#FF0000]",
        placeholder: "https://youtube.com/",
        required: true,
        requiredMessage: "Please enter your official YouTube channel link",
      },
      {
        label: "Facebook",
        name: "fb_link",
        icon: (
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.196h3.312z" />
          </svg>
        ),
        bgColor: "bg-[#1877F2]",
        placeholder: "https://facebook.com/",
      },
      {
        label: "Twitter / X",
        name: "twitter_link",
        icon: (
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-1.78 12.95h1.98L4.65 2.125H2.525l8.297 11.575Z" />
          </svg>
        ),
        bgColor: "bg-black",
        placeholder: "https://twitter.com/",
      },
      {
        label: "Instagram",
        name: "insta_link",
        icon: (
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.25-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919C8.415 2.175 8.796 2.163 12 2.163m0-1.663C8.74 0.5 8.31 0.512 7.053 0.572c-3.552.162-6.024 2.634-6.188 6.188C0.512 8.31 0.5 8.74 0.5 12s.012 3.69.072 4.947c.164 3.554 2.636 6.026 6.188 6.188 1.257.06 1.687.072 4.947.072s3.69-.012 4.947-.072c3.552-.164 6.026-2.636 6.188-6.188.06-1.257.072-1.687.072-4.947s-.012-3.69-.072-4.947c-.162-3.554-2.636-6.026-6.188-6.188C15.69 0.512 15.26 0.5 12 0.5zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
          </svg>
        ),
        bgColor: "bg-gradient-to-br from-[#FCAF45] via-[#E1306C] to-[#833AB4]",
        placeholder: "https://instagram.com/",
      },

      {
        label: "Koo",
        name: "koo_link",
        icon: (
          <svg
            className="w-5 h-5 text-black"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.62 12.28c-.33.33-.77.5-1.22.5-.46 0-.89-.17-1.22-.5l-1.18-1.18c-.33-.33-.5-.77-.5-1.22s.17-.89.5-1.22l2.39-2.39c.33-.33.77-.5 1.22-.5s.89.17 1.22.5.5.77.5 1.22-.17.89-.5 1.22l-1.2 1.18 1.18 1.18c.33.33.5.77.5 1.22s-.17.89-.5 1.22zm-6.03-3.66c-.33.33-.77.5-1.22.5s-.89-.17-1.22-.5-.5-.77-.5-1.22.17-.89.5-1.22l2.39-2.39c.33-.33.77-.5 1.22-.5s.89.17 1.22.5.5.77.5 1.22-.17.89-.5 1.22l-2.39 2.39z"
              fill="black"
            />
          </svg>
        ),
        bgColor: "bg-[#FFC107]",
        placeholder: "https://www.kooapp.com/",
        // required: true,
        requiredMessage: "Koo profile link is required.",
      },
      {
        label: "LinkedIn",
        name: "linkedin_link",
        icon: (
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.54 1.54 0 0013 14.19a1.53 1.53 0 00-1 1.25V19H9v-9h3v1.38a4 4 0 013.3-1.66c2.43 0 3.7 1.58 3.7 4.34z" />
          </svg>
        ),
        bgColor: "bg-[#0A66C2]",
        placeholder: "https://linkedin.com/company/",
      },

      {
        label: "Telegram",
        name: "telegram_link",
        icon: (
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9.78 18.39a.74.74 0 001.06 0l1.72-1.72 3.84 2.85c.6.45 1.25.21 1.44-.52l2.9-13.56c.21-.99-.5-1.38-1.28-.96L4.2 11.23c-.96.38-.95 1.07-.15 1.34l3.52 1.1 8.24-5.18c.4-.25.76-.11.45.18l-6.66 6.01-0.2 3.71z" />
          </svg>
        ),
        bgColor: "bg-[#0088CC]",
        placeholder: "https://t.me/",
      },
    ],
    []
  );

  // Arrange in 2 columns (4 rows of 2)
  const rows = [];
  for (let i = 0; i < socialMediaFields.length; i += 2) {
    rows.push(socialMediaFields.slice(i, i + 2));
  }

  return (
    <div className="bg-white bg-bacd-dark rounded-lg shadow-md p-6 font-sans">
      {/* Page Heading */}
      <div className="flex flex-col gap-1 pb-6 border-b border-[#E0E0E0] border700">
        <p className="text-[#1C1C1C]  text-2xl font-bold leading-tight">
          Social Media Links
        </p>
        <p className="text-[#616161]  text-sm font-normal leading-normal">
          Add official handles of your news agency across platforms.
        </p>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 pt-6">
        {socialMediaFields.map((field) => {
          const isActive = activeField === field.name;
          const isTouched = touched[field.name];
          const error = errors[field.name];
          const showError = isTouched && error;
          const hasError = showError || (field.required && !links[field.name]);

          const inputValue =
            field.name === "whats_link"
              ? links[field.name]
              : links[field.name]?.replace(/^https?:\/\/(www\.)?/, "") || "";

          return (
            <div key={field.name} className="flex flex-col">
              <label
                className="text-[#1C1C1C] text-g0 text-sm font-medium leading-normal pb-2"
                htmlFor={`${field.name}-input`}
              >
                {field.label}
                {field.required && <span className="text-[#D32F2F]"> *</span>}
              </label>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${field.bgColor} transition-transform duration-200 group-hover:scale-105`}
                    title={`Open ${field.label}`}
                  >
                    {field.icon}
                  </div>
                </div>

                <input
                  id={`${field.name}-input`}
                  name={field.name}
                  type={field.name === "whats_link" ? "tel" : "text"}
                  value={inputValue}
                  onChange={handleChange}
                  onFocus={() => handleFocus(field.name)}
                  onBlur={handleBlur}
                  placeholder={field.placeholder}
                  className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#1C1C1C] text-wocus:outline-0 focus:ring-0 border ${
                    hasError
                      ? "border-[#D32F2F] border00"
                      : "border-[#E0E0E0] border600"
                  } bg-white bg-grah-12 placeholder:text-gray-400 pl-12 pr-4 py-2 text-sm font-normal leading-normal`}
                  aria-required={field.required}
                  aria-describedby={
                    hasError ? `${field.name}-error` : undefined
                  }
                />

                {/* <span className="absolute top-full left-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 text-white text-xs rounded py-1 px-2 pointer-events-none">
                  Paste your official page or handle link.
                </span> */}
              </div>

              {/* Error or Required Message */}
              {(showError || (field.required && !links[field.name])) && (
                <p
                  id={`${field.name}-error`}
                  aria-live="polite"
                  className="text-[#D32F2F] text-xs mt-1"
                >
                  {showError ? error : field.requiredMessage}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons
      <div className="flex items-center justify-end gap-4 pt-8 mt-6 border-t border-[#E0E0E0] border700">
        <button className="text-sm font-medium text-[#616161] text-g0 hover:underline">
          Skip for now
        </button>
        <button className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium shadow-sm hover:shadow-md hover:bg-blue-700 transition-all duration-200">
          Save & Continue
        </button>
      </div> */}
    </div>
  );
};

SocialMediaLinks.propTypes = {
  setUserRequest: PropTypes.func.isRequired,
  setEmpty: PropTypes.func.isRequired,
  submitForm: PropTypes.bool.isRequired,
  setSubmitForm: PropTypes.func.isRequired,
};

export default SocialMediaLinks;
