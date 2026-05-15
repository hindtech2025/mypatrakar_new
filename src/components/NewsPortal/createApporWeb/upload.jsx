
import React, { useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import {
  FiUpload,
  FiCheck,
  FiX,
  FiImage,
  FiExternalLink,
  FiUser,
} from "react-icons/fi";
import { PreViewContext } from "../../../context/PreViewContext";

const LogoUpload = ({ setFile, file, onUploadComplete }) => {
  const { appPreview, webPreview, updateAppPreview, updateWebPreview } =
    useContext(PreViewContext);
  const [uploading, setUploading] = useState({
    app_logo: false,
    web_logo: false,
    owner_profile_pic: false,
  });

  const [errors, setErrors] = useState({
    app_logo: null,
    web_logo: null,
    owner_profile_pic: null,
  });

  const [dimensionWarning, setDimensionWarning] = useState({
    app_logo: null,
    web_logo: null,
    owner_profile_pic: null,
  });

  const appLogoRef = useRef(null);
  const webLogoRef = useRef(null);
  const ownerProfileRef = useRef(null);

  const checkDimensions = (file, type) => {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = function () {
        const { width, height } = this;
        URL.revokeObjectURL(url);

        if (type === "app_logo") {
          if (width !== 512 || height !== 512) {
            setDimensionWarning((prev) => ({
              ...prev,
              app_logo: `Your image is ${width}×${height}. Recommended: 512×512 square`,
            }));
          } else {
            setDimensionWarning((prev) => ({ ...prev, app_logo: null }));
          }
        } else if (type === "web_logo") {
          if (width !== 200 || height !== 100) {
            setDimensionWarning((prev) => ({
              ...prev,
              web_logo: `Your image is ${width}×${height}. Recommended: 200×100 horizontal`,
            }));
          } else {
            setDimensionWarning((prev) => ({ ...prev, web_logo: null }));
          }
        } else if (type === "owner_profile_pic") {
          if (width !== 400 || height !== 400) {
            setDimensionWarning((prev) => ({
              ...prev,
              owner_profile_pic: `Your image is ${width}×${height}. Recommended: 400×400 square`,
            }));
          } else {
            setDimensionWarning((prev) => ({
              ...prev,
              owner_profile_pic: null,
            }));
          }
        }
        resolve(true);
      };

      img.src = url;
    });
  };

  const mockUpload = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        resolve(url);
      }, 1000);
    });
  };

  const handleFileChange = async (e, type) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setErrors((prev) => ({ ...prev, [type]: null }));
    setDimensionWarning((prev) => ({ ...prev, [type]: null }));

    if (!selectedFile.type.match(/image\/(png|jpeg|jpg|svg\+xml)/)) {
      setErrors((prev) => ({
        ...prev,
        [type]: "Only PNG, JPEG, JPG or SVG images are allowed",
      }));
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [type]: "File size must be less than 2MB",
      }));
      return;
    }

    setUploading((prev) => ({ ...prev, [type]: true }));

    try {
      await checkDimensions(selectedFile, type);
      const imageUrl = await mockUpload(selectedFile);

      // Update the correct preview based on the type
      if (type === "app_logo") {
        updateAppPreview({ ...appPreview, logo: imageUrl });
      } else if (type === "web_logo") {
        updateWebPreview({ ...webPreview, logo: imageUrl });
      } else if (type === "owner_profile_pic") {
        updateAppPreview({ ...appPreview, owner_profile_pic: imageUrl });
      }

      setFile((prev) => ({
        ...prev,
        [type]: {
          file: selectedFile,
          preview: imageUrl,
        },
      }));

      onUploadComplete(type, {
        file: selectedFile,
        preview: imageUrl,
      });
    } catch (error) {
      // console.error("Upload failed:", error);
      setErrors((prev) => ({
        ...prev,
        [type]: "Upload failed. Please try again.",
      }));
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const removeImage = (type) => {
    if (file[type]?.preview) {
      URL.revokeObjectURL(file[type].preview);
    }

    setFile((prev) => ({
      ...prev,
      [type]: null,
    }));

    onUploadComplete(type, null);
    setErrors((prev) => ({ ...prev, [type]: null }));
    setDimensionWarning((prev) => ({ ...prev, [type]: null }));

    // Clear the logo from the appropriate preview
    if (type === "app_logo") {
      updateAppPreview({ ...appPreview, logo: "" });
    } else if (type === "web_logo") {
      updateWebPreview({ ...webPreview, logo: "" });
    }

    if (type === "app_logo" && appLogoRef.current) {
      appLogoRef.current.value = "";
    } else if (type === "web_logo" && webLogoRef.current) {
      webLogoRef.current.value = "";
    } else if (type === "owner_profile_pic" && ownerProfileRef.current) {
      ownerProfileRef.current.value = "";
    }
  };

  const triggerFileInput = (type) => {
    if (type === "app_logo") {
      appLogoRef.current?.click();
    } else if (type === "web_logo") {
      webLogoRef.current?.click();
    } else if (type === "owner_profile_pic") {
      ownerProfileRef.current?.click();
    }
  };

  const openResizerTool = () => {
    window.open("https://imageresizer.com", "_blank");
  };

  const renderUploadSection = (type, label, recommended, refObj, icon) => {
    return (
      <div
        className={`border-2 ${
          errors[type]
            ? "border-red-500"
            : dimensionWarning[type]
            ? "border-yellow-400"
            : "border-gray-200"
        } rounded-xl p-5 transition-all duration-200 bg-white hover:border-blue-400`}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
            <p className="text-sm text-gray-500">Recommended: {recommended}</p>
          </div>
          {file[type]?.preview && !uploading[type] && (
            <button
              onClick={() => removeImage(type)}
              className="text-red-500 hover:text-red-700 transition-colors"
              aria-label="Remove logo"
            >
              <FiX size={18} />
            </button>
          )}
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div
            className="relative w-24 h-24 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden flex items-center justify-center cursor-pointer"
            onClick={() => triggerFileInput(type)}
          >
            {file[type]?.preview ? (
              <img
                src={file[type].preview}
                alt="Logo preview"
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <div className="text-gray-400 flex flex-col items-center">
                {icon || <FiImage size={24} className="mb-1" />}
                <span className="text-xs">Click to upload</span>
              </div>
            )}

            {uploading[type] && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>

          <div className="w-full">
            <input
              type="file"
              ref={refObj}
              accept="image/png, image/jpeg, image/jpg, image/svg+xml"
              onChange={(e) => handleFileChange(e, type)}
              className="hidden"
              disabled={uploading[type]}
            />

            <button
              type="button"
              onClick={() => triggerFileInput(type)}
              disabled={uploading[type]}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors w-full ${
                uploading[type]
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
              }`}
            >
              {uploading[type] ? (
                "Uploading..."
              ) : file[type]?.preview ? (
                <>
                  <FiCheck className="mr-2" />
                  Change Image
                </>
              ) : (
                <>
                  <FiUpload className="mr-2" />
                  Upload Image
                </>
              )}
            </button>

            {errors[type] && (
              <p className="mt-2 text-sm text-red-500">{errors[type]}</p>
            )}

            {dimensionWarning[type] && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
                <p>{dimensionWarning[type]}</p>
                <button
                  onClick={openResizerTool}
                  className="mt-1 text-blue-700 hover:text-blue-800 flex items-center text-xs"
                >
                  <FiExternalLink className="mr-1" size={12} />
                  Resize your image online
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderUploadSection("app_logo", "App Logo", "512×512 PNG", appLogoRef)}
        {renderUploadSection(
          "web_logo",
          "Website Logo",
          "200×100 PNG",
          webLogoRef
        )}
        {renderUploadSection(
          "owner_profile_pic",
          "Owner Profile",
          "400×400 PNG",
          ownerProfileRef,
          <FiUser size={24} className="mb-1" />
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h4 className="text-sm font-medium text-blue-800 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
              clipRule="evenodd"
            />
          </svg>
          Image Guidelines
        </h4>
        <ul className="mt-2 text-sm text-blue-600 list-disc pl-5 space-y-1">
          <li>Use high-quality images with transparent background for logos</li>
          <li>PNG format recommended for best quality</li>
          <li>Maximum file size: 2MB per image</li>
          <li>Square logo (512×512) works best for app icon</li>
          <li>Horizontal logo (200×100) works best for website header</li>
          <li>Profile picture (400×400) recommended for owner profile</li>
          <li>
            Need to resize?{" "}
            <button
              onClick={openResizerTool}
              className="text-red-700 hover:text-red-800 underline flex items-center inline-flex"
            >
              Use online image resizer{" "}
              <FiExternalLink className="ml-1" size={12} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

LogoUpload.propTypes = {
  setFile: PropTypes.func.isRequired,
  file: PropTypes.shape({
    app_logo: PropTypes.shape({
      preview: PropTypes.string,
      file: PropTypes.instanceOf(File),
    }),
    web_logo: PropTypes.shape({
      preview: PropTypes.string,
      file: PropTypes.instanceOf(File),
    }),
    owner_profile_pic: PropTypes.shape({
      preview: PropTypes.string,
      file: PropTypes.instanceOf(File),
    }),
  }).isRequired,
  onUploadComplete: PropTypes.func.isRequired,
};

export default LogoUpload;










<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>News Agency Onboarding</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<style>
.material-symbols-outlined {
font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>
<script id="tailwind-config">tailwind.config = {darkMode: "class", theme: {extend: {colors: {primary: "#EA2831", "background-light": "#f8f6f6", "background-dark": "#211111"}, fontFamily: {display: "Inter"}, borderRadius: {DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px"}}}};</script>
</head>
<body class="bg-background-light dark:bg-background-dark font-display">
<div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
<div class="layout-container flex h-full grow flex-col">
<div class="px-4 sm:px-6 lg:px-8 flex flex-1 justify-center py-10 sm:py-12 lg:py-16">
<div class="layout-content-container flex flex-col w-full max-w-4xl flex-1 bg-white dark:bg-background-dark/50 shadow-sm rounded-xl p-6 sm:p-8">
<div class="flex flex-wrap justify-between gap-3 p-4">
<div class="flex min-w-72 flex-col gap-3">
<h1 class="text-[#111418] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Basic Details</h1>
<p class="text-[#5f718c] dark:text-slate-400 text-base font-normal leading-normal">Provide your agency and owner information below.</p>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
<div class="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#dbdfe6] dark:border-slate-700 px-6 py-14">
<div class="flex max-w-[480px] flex-col items-center gap-2 text-center">
<p class="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">App Logo</p>
<p class="text-[#5f718c] dark:text-slate-400 text-sm font-normal leading-normal">Click or drag to upload (512x512 PNG, max 2MB)</p>
</div>
<button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f5] dark:bg-slate-700 text-[#111418] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
<span class="truncate">Upload</span>
</button>
</div>
<div class="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#dbdfe6] dark:border-slate-700 px-6 py-14">
<div class="flex max-w-[480px] flex-col items-center gap-2 text-center">
<p class="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Website Logo</p>
<p class="text-[#5f718c] dark:text-slate-400 text-sm font-normal leading-normal">Click or drag to upload (200x100 PNG, max 2MB)</p>
</div>
<button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f5] dark:bg-slate-700 text-[#111418] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
<span class="truncate">Upload</span>
</button>
</div>
<div class="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#dbdfe6] dark:border-slate-700 px-6 py-14">
<div class="flex max-w-[480px] flex-col items-center gap-2 text-center">
<p class="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Owner Profile</p>
<p class="text-[#5f718c] dark:text-slate-400 text-sm font-normal leading-normal">Click or drag to upload (400x400 PNG, max 2MB)</p>
</div>
<button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f5] dark:bg-slate-700 text-[#111418] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
<span class="truncate">Upload</span>
</button>
</div>
</div>
<div class="p-4">
<div class="flex gap-4 bg-primary/10 dark:bg-primary/20 p-4 rounded-lg">
<div class="text-primary flex items-center justify-center shrink-0 size-12 -mt-1">
<span class="material-symbols-outlined text-3xl">info</span>
</div>
<div class="flex flex-1 flex-col justify-center">
<p class="text-[#111418] dark:text-white text-base font-medium leading-normal">Image Guidelines</p>
<ul class="text-[#5f718c] dark:text-slate-300 text-sm font-normal leading-normal list-disc pl-5 mt-2 space-y-1">
<li>Use high-quality images with transparent background for logos.</li>
<li>PNG format recommended for best quality. Maximum file size: 2MB per image.</li>
<li>Square logo (512×512) works best for app icon.</li>
<li>Horizontal logo (200×100) works best for website header.</li>
<li>Profile picture (400×400) recommended for owner profile.</li>
<li>Need to resize? Use online image resizer: <a class="text-primary dark:text-blue-400 font-medium hover:underline" href="#">https://imageresizer.com/</a></li>
</ul>
</div>
</div>
</div>
<div class="p-4">
<div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
<div>
<label class="block text-sm font-medium text-[#111418] dark:text-slate-300" for="agency-name">News Agency Name <span class="text-red-500">*</span></label>
<input class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50" id="agency-name" placeholder="e.g. India News Network" type="text"/>
</div>
<div>
<label class="block text-sm font-medium text-[#111418] dark:text-slate-300" for="language">Preferred Language <span class="text-red-500">*</span></label>
<select class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50" id="language">
<option>English</option>
<option>Hindi</option>
<option>Urdu</option>
<option>Bengali</option>
<option>Tamil</option>
<option>Telugu</option>
</select>
</div>
<div>
<label class="block text-sm font-medium text-[#111418] dark:text-slate-300" for="reg-number">Registration Number <span class="text-red-500">*</span></label>
<input class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50" id="reg-number" placeholder="e.g. U12345AB6789CDE012" type="text"/>
</div>
<div>
<label class="block text-sm font-medium text-[#111418] dark:text-slate-300" for="owner-name">Owner Name <span class="text-red-500">*</span></label>
<input class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50" id="owner-name" placeholder="e.g. John Doe" type="text"/>
</div>
<div>
<label class="block text-sm font-medium text-[#111418] dark:text-slate-300" for="owner-mobile">Owner Mobile Number <span class="text-red-500">*</span></label>
<input class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50" id="owner-mobile" placeholder="e.g. 9876543210" type="tel"/>
</div>
<div>
<label class="block text-sm font-medium text-[#111418] dark:text-slate-300" for="owner-email">Owner Email ID <span class="text-red-500">*</span></label>
<input class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50" id="owner-email" placeholder="e.g. john.doe@example.com" type="email"/>
</div>
<div>
<label class="block text-sm font-medium text-[#111418] dark:text-slate-300" for="state">State <span class="text-red-500">*</span></label>
<select class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50" id="state">
<option>Maharashtra</option>
<option>Karnataka</option>
<option>Delhi</option>
<option>Tamil Nadu</option>
<option>West Bengal</option>
</select>
</div>
<div>
<label class="block text-sm font-medium text-[#111418] dark:text-slate-300" for="city">City <span class="text-red-500">*</span></label>
<input class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50" id="city" placeholder="e.g. Mumbai" type="text"/>
</div>
<div class="md:col-span-2">
<label class="block text-sm font-medium text-[#111418] dark:text-slate-300" for="address">Address <span class="text-red-500">*</span></label>
<textarea class="mt-1 block w-full rounded-lg border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white shadow-sm focus:border-primary focus:ring-primary focus:ring-opacity-50" id="address" placeholder="Enter full address" rows="3"></textarea>
</div>
</div>
</div>
<div class="flex justify-end items-center gap-4 p-4 mt-4 border-t border-slate-200 dark:border-slate-700">
<button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-[#5f718c] dark:text-slate-300 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
<span class="truncate">Cancel</span>
</button>
<button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow">
<span class="truncate">Save &amp; Continue</span>
</button>
</div>
</div>
</div>
</div>
</div>
</body></html>

