import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import AppColor from "./AppColor";
import Cancel from "../Cancel";
import SocialMediaLinks from "./SocialMediaLinks";
import WebColor from "./WebColor";
import { checkObjNotEmpty } from "../../../utils/CheckObjEmptyOrNot";
import { AuthContext } from "../../../context/Auth-context";
import { CreateAppOrWebCustomer, DecryptString } from "../../../api";
import { useSessionStorage } from "../../../hooks/sessionStorage";
import BasicDetails from "./BasicDetails"
const CreateAppOrWeb = () => {
  const [empty, setEmpty] = useState(false);
  const [submitForm, setSubmitForm] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setRequesteStatus } = useContext(AuthContext);
  const navigate = useNavigate();
  const { getSessionData } = useSessionStorage();

  const [ids, setIds] = useState({
    package_id: "",
    purchase_id: "",
    user_id: "",
  });

  // const packageData = getSessionData("packageDetails");

  const packageData = useMemo(
    () => getSessionData("packageDetails"),
    [getSessionData],
  );

  useEffect(() => {
    // Only decrypt if packageData exists and IDs not already set
    if (!packageData || ids.package_id) return;

    const decryptParams = async () => {
      try {
        const [pkg, pur, usr] = await Promise.all([
          DecryptString(packageData.packageId),
          DecryptString(packageData.purchaseId),
          DecryptString(packageData.userId),
        ]);
        setIds({
          package_id: pkg.data.response,
          purchase_id: pur.data.response,
          user_id: usr.data.response,
        });
      } catch (err) {
        // console.error("Error decrypting IDs:", err);
        setError("Failed to process your request. Please try again later.");
      }
    };

    decryptParams();
  }, [packageData, ids.package_id]);

  const [userRequest, setUserRequest] = useState({
    basicDetails: {
      app_logo: null,
      web_logo: null,
      owner_profile_pic: null,
      agency_name: "",
      language: {
        language_mode: "0",
        language: "",
      },
      reg_number: "",
      owner_name: "",
      owner_mobile: "",
      owner_email: "",
      state: "",
      owner_state: "",
      owner_city: "",
      owner_add: "",
    },
    socialMediaLinks: {
      fb_link: "",
      twitter_link: "",
      insta_link: "",
      youtube_link: "",
      koo_link: "",
      linkedin_link: "",
      whats_link: "",
      telegram_link: "",
    },
    web_color: {
      primary: "",
      text: "",
    },
    web_footer_color: {
      primary: "",
      text: "",
    },
    app_color: {
      primary: "",
      text: "",
    },
  });

  // Save App/Web data
  const saveAppOrWebData = useCallback(
    async (currentRequest) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();

        formData.append(
          "purchase_id",
          ids.purchase_id.includes(":")
            ? ids.purchase_id.split(":")[1]
            : ids.purchase_id,
        );
        formData.append(
          "package_id",
          ids.package_id.includes(":")
            ? ids.package_id.split(":")[1]
            : ids.package_id,
        );
        formData.append(
          "customer_id",
          ids.user_id.includes(":") ? ids.user_id.split(":")[1] : ids.user_id,
        );
        formData.append("theme_id", currentRequest.web_color.primary);

        // Append files
        if (currentRequest.basicDetails.app_logo) {
          formData.append(
            "app_logo",
            currentRequest.basicDetails.app_logo.file,
          );
        }
        if (currentRequest.basicDetails.web_logo) {
          formData.append(
            "web_logo",
            currentRequest.basicDetails.web_logo.file,
          );
        }
        if (currentRequest.basicDetails.owner_profile_pic) {
          formData.append(
            "owner_profile_pic",
            currentRequest.basicDetails.owner_profile_pic.file,
          );
        }

        // Append other fields
        formData.append("agency_name", currentRequest.basicDetails.agency_name);
        formData.append("reg_number", currentRequest.basicDetails.reg_number);
        formData.append("owner_number", currentRequest.basicDetails.reg_number);
        formData.append("owner_name", currentRequest.basicDetails.owner_name);
        formData.append(
          "owner_mobile",
          currentRequest.basicDetails.owner_mobile,
        );
        formData.append("owner_email", currentRequest.basicDetails.owner_email);
        formData.append(
          "owner_state",
          currentRequest.basicDetails.owner_state,
        );

        formData.append("owner_city", currentRequest.basicDetails.owner_city);
        formData.append("owner_add", currentRequest.basicDetails.owner_add);

        // Social Media Links
        Object.entries(currentRequest.socialMediaLinks).forEach(
          ([key, value]) => {
            if (key === "whats_link") {
              const whatsappNumber = value?.replace(/\D/g, "");
              formData.append(
                "whats_link",
                whatsappNumber ? `https://wa.me/${whatsappNumber}` : "",
              );
            } else {
              formData.append(key, value);
            }
          },
        );

        formData.append(
          "language",
          JSON.stringify(
            currentRequest.basicDetails.language.language || "english",
          ),
        );
        formData.append(
          "language_mode",
          JSON.stringify(currentRequest.basicDetails.language.language_mode),
        );

        formData.append(
          "socialMediaLinks",
          JSON.stringify(currentRequest.socialMediaLinks),
        );

        formData.append(
          "app_main_theme_color",
          JSON.stringify(currentRequest.app_color.header),
        );
         formData.append(
          "app_color",
          JSON.stringify(currentRequest.app_color),
        );
        formData.append(
          "app_bottom_nav_background_color",
          JSON.stringify(currentRequest.app_color.bottomBar),
        );
        formData.append(
          "app_bottom_nav_text_color",
          JSON.stringify(currentRequest.app_color.bottomText),
        );
        formData.append(
          "app_font_family",
          JSON.stringify(currentRequest.app_color.font),
        );
        formData.append(
          "web_font_family",
          JSON.stringify(currentRequest.web_color.font_top),
        );

        formData.append("web_color", JSON.stringify(currentRequest.web_color));

        formData.append(
          "web_footer_color",
          JSON.stringify(currentRequest.web_footer_color),
        );

        formData.append(
          "web_color",
          currentRequest.web_color.primary || "#000000",
        );
        formData.append(
          "web_footer_color",
          currentRequest.web_footer_color.primary || "#000000",
        );

        const res = await CreateAppOrWebCustomer(formData, true);
        setRequesteStatus(true);
        // console.log(res);
        return res.status;
      } catch (err) {
        // console.log("API Error:", err);
        setError(
          err?.response?.data?.status_message ||
            "An unexpected error occurred. Please try again.",
        );
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [ids, setRequesteStatus],
  );

  const handleUsersRequest = useCallback(async () => {
    setSubmitForm(true);
    try {
      setError("");
      if (!checkObjNotEmpty(userRequest)) {
        setEmpty(true);
        return;
      }

      const status = await saveAppOrWebData(userRequest);
      // console.log(status);
      if (status === 200) {
        navigate("/portal");
        // console.log(status);
      }
    } catch (err) {
      // console.log("Submission Error:", err);
    }
    // }, [userRequest, saveAppOrWebData]);
  }, [userRequest, saveAppOrWebData, navigate]);
  // console.log(userRequest);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Cancel text="Create App & Website" />
      <div className="flex-1 p-4 max-w-7xl mx-auto w-full">
        <header className="my-6">
          <h1 className="text-3xl font-bold text-gray-800">MyPatrakar</h1>
          <p className="text-gray-500 font-medium text-sm mt-2">
            Create Fully Functional Website & App
          </p>
        </header>
        <div className="space-y-8">
          <BasicDetails
            setUserRequest={setUserRequest}
            setEmpty={setEmpty}
            submitForm={submitForm}
            setSubmitForm={setSubmitForm}
          />
          <SocialMediaLinks
            setUserRequest={setUserRequest}
            setEmpty={setEmpty}
            submitForm={submitForm}
            setSubmitForm={setSubmitForm}
          />
          <AppColor
            setUserRequest={setUserRequest}
            setEmpty={setEmpty}
            submitForm={submitForm}
            setSubmitForm={setSubmitForm}
            logo={userRequest.basicDetails?.app_logo?.preview}
          />
          <WebColor
            setUserRequest={setUserRequest}
            setEmpty={setEmpty}
            submitForm={submitForm}
            setSubmitForm={setSubmitForm}
          />
        </div>
      </div>
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="flex flex-col items-end space-y-2">
          <button
            onClick={handleUsersRequest}
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-md border-2 font-medium transition-colors ${
              isSubmitting
                ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                : "border-red-500 text-red-500 hover:bg-red-50"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
          {empty && (
            <p className="text-red-500 text-sm">
              Please fill all required fields
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm max-w-md text-right">{error}</p>
          )}
          {!empty && !error && (
            <p className="text-gray-600 text-sm">
              Your App & Website will be live within 48 hours if all
              requirements are met
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};

export default CreateAppOrWeb;
