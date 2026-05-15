
import { checkDomainPrice } from "./checkDomainPrice";

export const useDomainCheck = (setDomainResult) => {
  const checkDomainAvailability = async (domain) => {
    if (!domain) return;

    // Start loading
    setDomainResult({ loading: true });

    const domainRegex = /^(?!:\/\/)([a-z0-9-]+\.)+[a-z]{2,}$/;
    let stripped = String(domain)
      .replace(/^https?:\/\//i, "")
      .replace(/^www\./i, "")
      .toLowerCase();

    // INVALID FORMAT → STOP & REMOVE LOADING
    if (!domainRegex.test(stripped)) {
      setDomainResult({
        loading: false,
        error: "Invalid domain format (e.g., example.com)",
      });
      return;
    }

    try {
      const result = await checkDomainPrice(stripped);

      // API ERROR
      if (result.error) {
        setDomainResult({
          loading: false,
          error: result.error,
        });
      }

      // NOT AVAILABLE
      else if (!result.available) {
        setDomainResult({
          loading: false,
          available: false,
          message: result.message || "Domain not available",
        });
      }

      // AVAILABLE
      else {
        setDomainResult({
          loading: false,
          available: true,
          price: result.price,
          currency: result.currency || "INR",
          description:
            "This domain is available for registration right now!",
        });
      }
    } catch (error) {
      setDomainResult({
        loading: false,
        error: "Failed to check domain availability",
      });
    }
  };

  return {
    checkDomainAvailability,
  };
};
