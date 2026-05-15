import { useNavigate } from "react-router-dom";
import { CreateNewPortal } from "../../../../api";

export const useFormSubmission = (
  formData,
  validateForm,
  normalizeDomain,
  setSessionData,
  setStatus
) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setStatus((prev) => ({ ...prev, error: null }));
    
    if (!validateForm()) return;

    try {
      setStatus((prev) => ({ ...prev, isLoading: true }));
      const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");

      const cleanedDomain = formData.free_domain
        ? normalizeDomain(formData.free_domain)
        : "";

      const payload = {
        customer_id: userData.userId,
        ...formData,
        free_domain: cleanedDomain,
      };

      const res = await CreateNewPortal(payload);
      
      if (res.data?.response) {
        setSessionData("packageDetails", {
          purchaseId: res.data.response.purchase_id,
          packageId: res.data.response.package_id,
          userId: res.data.response.user_id,
        });
        
        navigate(
          `/portal/payment/${res.data.response.package_id}/${res.data.response.purchase_id}/${res.data.response.user_id}`
        );
      }
    } catch (error) {
      console.error("Portal creation error:", error);

      let serverErrorMessage = "Failed to create portal. Please try again.";

      if (error.response?.data) {
        const data = error.response.data;

  
        if (data.errors && typeof data.errors === 'object') {

          serverErrorMessage = Object.values(data.errors)
            .flat() 
            .join(" | ");
        } 
    
        else if (data.status_message) {
          serverErrorMessage = data.status_message;
        }
      } else if (error.message) {
        serverErrorMessage = error.message;
      }

      setStatus({
        isLoading: false,
        error: serverErrorMessage, 
      });
    }
  };

  return {
    handleSubmit,
  };
};