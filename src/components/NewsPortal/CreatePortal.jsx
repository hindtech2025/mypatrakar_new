
import { useContext, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { PaymentContext } from "../../context/PaymentContext";
import { useSessionStorage } from "../../hooks/sessionStorage";
import { usePackageLoader } from "./createPortal/hooks/usePackageLoader";
import { useFormLogic } from "./createPortal/hooks/useFormLogic";
import { useValidation } from "./createPortal/hooks/useValidation";
import { useFormSubmission } from "./createPortal/hooks/useFormSubmission";
import FormLayout from "./createPortal/components/FormLayout";
import Cancel from "./Cancel";
import RegionPlanSection from "./createPortal/components/RegionPlanSection";
import AgencySection from "./createPortal/components/AgencySection";
import AppWebsiteSection from "./createPortal/components/AppWebsiteSection";
import RegistrationSection from "./createPortal/components/RegistrationSection";
import DomainSection from "./createPortal/components/DomainSection";
import PaymentSummary from "./createPortal/components/PaymentSummary";

export default function CreatePortal() {
  // Context
  const { setPortalRequestDetails, portalRequestDetail } =
    useContext(PaymentContext);
  const { setSessionData } = useSessionStorage();

  // State
  const [formData, setFormData] = useState({
    app_name: "",
    website_name: "",
    region: "0",
    registration_no: "",
    registration_type: "",
    app_package_name: "",
    agency_name: "",
    agency_add: "",
    free_domain: "",
    package_id: "",
    price: 0.0,
    is_demo: 0, // 0 = Live Mode, 1 = Demo Mode
  });

  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
  });

  const [domainResult, setDomainResult] = useState(null);
  const [status, setStatus] = useState({ isLoading: false, error: null });
  const [isTyping, setIsTyping] = useState(false);
  const [isDomain, setIsDomain] = useState(true);

  // Load packages based on region and demo mode
  const { packages, isLoadingPackages, loadPackages } = usePackageLoader(
    formData.region,
    formData.is_demo
  );

  const { normalizeDomain } = useFormLogic(formData, setFormData);
  const { validateField, validateForm } = useValidation(
    formData,
    validation,
    setValidation,
    domainResult,
    setDomainResult
  );

  const { handleSubmit: originalSubmit } = useFormSubmission(
    formData,
    validateForm,
    normalizeDomain,
    setSessionData,
    setStatus
  );

  // Reset package when region or demo mode changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      package_id: "",
      price: 0,
      app_package_name: "",
    }));
    
    // Reset portal request details
    setPortalRequestDetails((prev) => ({
      ...prev,
      package_id: "",
      payable: 0,
      price: 0,
      package_name: "",
    }));
  }, [formData.region, formData.is_demo]);

  const handleFinalSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const fieldsToTouch = {};
    Object.keys(formData).forEach((key) => {
      fieldsToTouch[key] = true;
    });

    setValidation((prev) => ({
      ...prev,
      touched: fieldsToTouch,
    }));

    const isValid = validateForm();

    if (isValid) {
      originalSubmit(e);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setStatus((prev) => ({
        ...prev,
        error: "Please fix the errors in the form before proceeding.",
      }));
    }
  };

  // SEO Metadata
  const metaData = {
    title: "Create News Portal - MyPatrakar",
    description: "Create your own news portal website and app with MyPatrakar",
    canonicalUrl: "https://mypatrakar.com/portal/createportal",
    logoUrl: "https://mypatrakar.com/assets/LG2-CcMgpPb7.svg",
  };

  // Event Handlers
  const handleBlur = (field) => {
    setValidation((prev) => ({
      ...prev,
      touched: { ...prev.touched, [field]: true },
    }));
    validateField(field, formData[field]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      let updated = { ...prev, [name]: value };
      if (name === "app_name") {
        updated = { ...updated, app_package_name: generatePackageName(value) };
      }
      return updated;
    });

    if (validation.errors[name]) {
      setValidation((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: "" },
      }));
    }
  };

  const handlePackageSelect = (e) => {
    const packageId = e.target.value;
    const selectedPackage = packages.find(
      (pkg) => pkg.package_id === packageId
    );

    if (selectedPackage) {
      // Update form data
      setFormData((prev) => ({
        ...prev,
        package_id: packageId,
        app_package_name: selectedPackage.package_name,
        price: selectedPackage.payable,
      }));
      
      // Update isDomain based on selected package
      setIsDomain(selectedPackage.is_domain === 1);
      
      // Update portal request details
      setPortalRequestDetails((prev) => ({
        ...prev,
        payable: selectedPackage.payable,
        price: selectedPackage.payable,
        discount: selectedPackage.discount,
        validity: selectedPackage.validity,
        package_name: selectedPackage.package_name,
        package_id: selectedPackage.package_id,
        region: selectedPackage.region,
        fixedValidity: selectedPackage.validity === 365 ? "Yearly" : "Monthly",
        is_demo: formData.is_demo,
      }));
      
      // Reset domain if package doesn't include domain
      if (selectedPackage.is_domain !== 1) {
        setFormData((prev) => ({
          ...prev,
          free_domain: "",
        }));
        setDomainResult(null);
      }
    }
  };

  const generatePackageName = (appName) => {
    if (!appName) return "";
    let packageName = appName
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
    return `com.app.${packageName}_app`;
  };

  const hasError = (field) =>
    validation.touched[field] && validation.errors[field];

  const getInputBorder = (field) => {
    if (!validation.touched[field]) return "border-gray-300";
    return validation.errors[field]
      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
      : "border-green-500 focus:border-green-500 focus:ring-green-200";
  };

  const errorCount = Object.values(validation.errors).filter(
    (err) => err
  ).length;

  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <link rel="canonical" href={metaData.canonicalUrl} />
      </Helmet>

      <FormLayout
        status={status}
        handleSubmit={handleFinalSubmit}
        isLoading={status.isLoading}
      >
        <Cancel text="New news portal" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-5">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                Create Your News Portal
              </h1>
              <p className="text-red-100 mt-1 text-sm font-medium">
                Fill in the details to launch your professional news platform
              </p>
            </div>

            {/* Demo Mode Toggle - Fixed Radio Button Section */}
            <div className="px-6 pt-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="demo_mode"
                        checked={formData.is_demo === 0}
                        onChange={() => {
                          setFormData((prev) => ({
                            ...prev,
                            is_demo: 0,
                            package_id: "",
                            price: 0,
                            app_package_name: "",
                          }));
                          setPortalRequestDetails((prev) => ({
                            ...prev,
                            package_id: "",
                            payable: 0,
                            price: 0,
                          }));
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        <span className="block font-semibold">Live Mode</span>
                        <span className="text-xs text-gray-500">
                          Real packages with actual pricing
                        </span>
                      </span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="demo_mode"
                        checked={formData.is_demo === 1}
                        onChange={() => {
                          setFormData((prev) => ({
                            ...prev,
                            is_demo: 1,
                            package_id: "",
                            price: 0,
                            app_package_name: "",
                          }));
                          setPortalRequestDetails((prev) => ({
                            ...prev,
                            package_id: "",
                            payable: 0,
                            price: 0,
                          }));
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        <span className="block font-semibold">Demo Mode</span>
                        <span className="text-xs text-gray-500">
                          Trial packages
                        </span>
                      </span>
                    </label>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      formData.is_demo === 1
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {formData.is_demo === 1 ? "DEMO MODE ACTIVE" : "LIVE MODE"}
                  </div>
                </div>
              </div>
            </div>

            {/* Error Panel */}
            {(status.error ||
              (errorCount > 0 &&
                Object.keys(validation.touched).length > 0)) && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide">
                      Submission Blocked: {errorCount} Errors Found
                    </h3>
                    <div className="mt-1 text-xs text-red-700 space-y-1">
                      {status.error && (
                        <p className="font-bold underline">{status.error}</p>
                      )}
                      <ul className="list-disc list-inside">
                        {Object.entries(validation.errors).map(
                          ([key, msg]) => msg && <li key={key}>{msg}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleFinalSubmit} className="p-6 space-y-8">
              <RegionPlanSection
                formData={formData}
                packages={packages}
                isLoadingPackages={isLoadingPackages}
                portalRequestDetail={portalRequestDetail}
                hasError={hasError}
                getInputBorder={getInputBorder}
                handleChange={handleChange}
                handleBlur={handleBlur}
                validation={validation}
                handlePackageSelect={handlePackageSelect}
              />

              <AgencySection
                formData={formData}
                hasError={hasError}
                getInputBorder={getInputBorder}
                handleChange={handleChange}
                handleBlur={handleBlur}
                validation={validation}
              />

              <AppWebsiteSection
                formData={formData}
                hasError={hasError}
                getInputBorder={getInputBorder}
                handleChange={handleChange}
                handleBlur={handleBlur}
                validation={validation}
              />

              <RegistrationSection
                formData={formData}
                hasError={hasError}
                getInputBorder={getInputBorder}
                handleChange={handleChange}
                handleBlur={handleBlur}
                validation={validation}
              />

              {/* Domain Section - Only show if package includes domain */}
              { (
                <DomainSection
                  formData={formData}
                  domainResult={domainResult}
                  setDomainResult={setDomainResult}
                  hasError={hasError}
                  setFormData={setFormData}
                  getInputBorder={getInputBorder}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  validation={validation}
                  isTyping={isTyping}
                  setIsTyping={setIsTyping}
                  isDomain={isDomain ? 1 : 0}
                  region={parseInt(formData.region)}
                />
              )}

              <PaymentSummary
                formData={formData}
                status={status}
                handleSubmit={handleFinalSubmit}
              />
            </form>
          </div>
        </div>
      </FormLayout>
    </>
  );
}