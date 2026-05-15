import { checkDomainPrice } from "./checkDomainPrice";

export const useValidation = (
  formData,
  validation,
  setValidation,
  domainResult,
  setDomainResult
) => {
  const validateField = async (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "app_name":
        if (!value) error = "App name is required";
        else if (String(value).trim().length < 3)
          error = "Minimum 3 characters required";
        break;
      case "website_name":
        if (!value) error = "Website name is required";
        else if (String(value).trim().length < 3)
          error = "Minimum 3 characters required";
        break;
      case "region":
        if (!value) error = "Please select a region";
        break;
      case "package_id":
        if (!value) error = "Please select a plan";
        break;
      case "agency_name":
        if (!value) error = "Agency name is required";
        break;
      case "agency_add":
        if (!value) error = "Agency address is required";
        break;
      case "registration_type":
        if (!value) error = "Please select registration type";
        break;
      case "free_domain":
        if (value) {
          const domainRegex = /^(?!:\/\/)([a-z0-9-]+\.)+[a-z]{2,}$/;
          let stripped = String(value)
            .replace(/^https?:\/\//i, "")
            .replace(/^www\./i, "")
            .toLowerCase();

          if (!domainRegex.test(stripped)) {
            setDomainResult({
              error: "Invalid domain format (e.g., example.com)",
            });
            error = "Invalid domain format";
          } else {
            // Check availability and price
            const result = await checkDomainPrice(stripped);

            if (result.error) {
              setDomainResult({ error: result.error });
              error = result.error;
            } else if (!result.available) {
              setDomainResult({
                available: false,
                message: result.message || "Domain not available",
              });
              error = "Domain not available";
            } else {
              setDomainResult({
                available: true,
                price: result.price,
                currency: result.currency || "INR",
                description: "This domain is available for registration right now!",
              });
            }
          }
        }
        break;
      default:
        break;
    }

    setValidation((prev) => ({
      ...prev,
      errors: { ...prev.errors, [fieldName]: error },
    }));
    return !error;
  };

  const validateForm = () => {
    const requiredFields = [
      "app_name",
      "website_name",
      "region",
      "registration_type",
      "package_id",
      "agency_name",
      "agency_add",
    ];
    let isValid = true;
    requiredFields.forEach((field) => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    if (
      formData.free_domain &&
      !validateField("free_domain", formData.free_domain)
    ) {
      isValid = false;
    }
    return isValid;
  };

  return {
    validateField,
    validateForm,
  };
};