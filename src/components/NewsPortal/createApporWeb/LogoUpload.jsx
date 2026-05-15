import React, { useState, useRef, useContext, useEffect } from "react";

import { PreViewContext } from "../../../context/PreViewContext";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { Info } from "lucide-react";
const LogoUpload = ({ setFile, file, onUploadComplete }) => {
  const { appPreview, webPreview, updateAppPreview, updateWebPreview } =
    useContext(PreViewContext);

  const [uploading, setUploading] = useState({
    app_logo: false,
    web_logo: false,
    owner_profile_pic: false,
  });

  const [dimensionWarning, setDimensionWarning] = useState({});
  const [popupMsg, setPopupMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const appLogoRef = useRef(null);
  const webLogoRef = useRef(null);
  const ownerProfileRef = useRef(null);

  // Auto close popup after 5 sec
  useEffect(() => {
    if (showPopup) {
      const t = setTimeout(() => setShowPopup(false), 5000);
      return () => clearTimeout(t);
    }
  }, [showPopup]);

  const openPopup = (msg) => {
    setPopupMsg(msg);
    setShowPopup(true);
  };

  // 🔥 CHECK DIMENSIONS
  const checkDimensions = (file, type) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = function () {
        const { width, height } = this;
        URL.revokeObjectURL(url);

        if (type === "app_logo" && (width !== 512 || height !== 512)) {
          return reject(`Your image is ${width}×${height}. Required: 512×512`);
        }
        if (type === "web_logo" && (width !== 200 || height !== 100)) {
          return reject(`Your image is ${width}×${height}. Required: 200×100`);
        }
        if (type === "owner_profile_pic" && (width !== 400 || height !== 400)) {
          return reject(`Your image is ${width}×${height}. Required: 400×400`);
        }

        resolve(true);
      };

      img.src = url;
    });
  };

  // Fake upload
  const mockUpload = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(URL.createObjectURL(file));
      }, 800);
    });
  };

  // 🔥 FILE HANDLING WITH DIMENSION CHECK
  const handleFileChange = async (e, type) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setDimensionWarning((p) => ({ ...p, [type]: null }));
    setUploading((p) => ({ ...p, [type]: true }));

    try {
      await checkDimensions(selectedFile, type);

      const imgUrl = await mockUpload(selectedFile);

      if (type === "app_logo")
        updateAppPreview({ ...appPreview, logo: imgUrl });
      if (type === "web_logo")
        updateWebPreview({ ...webPreview, logo: imgUrl });
      if (type === "owner_profile_pic")
        updateAppPreview({ ...appPreview, owner_profile_pic: imgUrl });

      setFile((prev) => ({
        ...prev,
        [type]: {
          file: selectedFile,
          preview: imgUrl,
        },
      }));

      onUploadComplete(type, { file: selectedFile, preview: imgUrl });
    } catch (err) {
      openPopup(err);
      setDimensionWarning((p) => ({ ...p, [type]: err }));
    }

    setUploading((p) => ({ ...p, [type]: false }));
  };

  const removeImage = (type) => {
    setFile((p) => ({ ...p, [type]: null }));
    setDimensionWarning((p) => ({ ...p, [type]: null }));

    if (type === "app_logo") updateAppPreview({ ...appPreview, logo: "" });
    if (type === "web_logo") updateWebPreview({ ...webPreview, logo: "" });
    if (type === "owner_profile_pic")
      updateAppPreview({ ...appPreview, owner_profile_pic: "" });
  };

  const previewDimensions = (type) => {
    if (type === "app_logo") return { width: 200, height: 200 };
    if (type === "web_logo") return { width: 200, height: 100 };
    if (type === "owner_profile_pic") return { width: 160, height: 160 };
    return { width: 140, height: 140 };
  };

  // COMPONENT BLOCK
  const renderUploadSection = (type, label, recommended, refObj) => {
    const preview = file[type]?.preview;
    const dims = previewDimensions(type);

    return (
      <div
        className={`border-2 rounded-lg p-6 flex flex-col items-center transition 
          ${
            dimensionWarning[type]
              ? "border-red-500"
              : "border-dashed border-gray-400"
          }`}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              style={{
                width: dims.width,
                height: dims.height,
                objectFit: "contain",
              }}
              className="rounded-md"
            />

            <button
              onClick={() => removeImage(type)}
              className="absolute top-2 right-2 bg-red-100 text-red-600 p-1 rounded-full shadow"
            >
              <FiX size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="bg-gray-200 p-3 rounded-full">
              <FiUploadCloud size={25} />
            </div>
            <p className="font-bold">{label}</p>
            <p className="text-sm text-gray-500 mb-2">{recommended}</p>

            <input
              type="file"
              ref={refObj}
              onChange={(e) => handleFileChange(e, type)}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={() => refObj.current.click()}
              className="bg-gray-100 px-4 py-2 rounded font-semibold hover:bg-gray-200"
            >
              {uploading[type] ? "Uploading..." : "Upload"}
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      {/* GRID SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {renderUploadSection(
          "app_logo",
          "App Logo",
          "512×512 PNG (Max 2MB)",
          appLogoRef
        )}

        {renderUploadSection(
          "web_logo",
          "Website Logo",
          "200×100 PNG (Max 2MB)",
          webLogoRef
        )}

        {renderUploadSection(
          "owner_profile_pic",
          "Owner Profile",
          "400×400 PNG (Max 2MB)",
          ownerProfileRef
        )}
      </div>
      {/* // Add this directly in your LogoUpload component where you want to show the message */}
     <div className="mt-6 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-5 shadow-sm hover:shadow-md transition-all duration-300">
  <div className="flex items-start gap-4">
    {/* Icon */}
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
      <Info size={18} />
    </div>

    {/* Content */}
    <div className="flex flex-col gap-4 w-full">
      {/* Tip 1 */}
      <p className="text-sm text-gray-700 leading-relaxed">
        Optimize image size using{" "}
        <a
          href="https://imageresizer.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 hover:text-indigo-700 underline underline-offset-4"
        >
          Image Resizer
        </a>{" "}
        to ensure fast loading and sharp visuals.
      </p>

      {/* Divider */}
      <div className="h-px bg-blue-200/60" />

      {/* Tip 2 */}
      <p className="text-sm text-gray-700 leading-relaxed">
        Remove unwanted backgrounds easily with{" "}
        <a
          href="https://remove.bg"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 hover:text-indigo-700 underline underline-offset-4"
        >
          AI Background Remover
        </a>{" "}
        for clean, professional-looking logos.
      </p>
    </div>
  </div>
</div>


      {/* 🔥 CENTER POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white p-5 rounded-xl shadow-lg w-80 text-center animate-pop">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-black text-xl"
            >
              &times;
            </button>

            <p className="text-red-600 font-semibold">{popupMsg}</p>
          </div>
        </div>
      )}

      {/* Animation */}
      <style>{`
        .animate-pop {
          animation: pop .25s ease-out;
        }
        @keyframes pop {
          0% { transform: scale(0.8); opacity: 0 }
          100% { transform: scale(1); opacity: 1 }
        }
      `}</style>
    </>
  );
};

export default LogoUpload;
