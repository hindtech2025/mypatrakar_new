
import axios from "axios";

/**
 * Check domain availability & price using GoDaddy API
 * Frontend-only (DEMO / TESTING PURPOSE)
 *
 * @param {string} domain - example.com
 * @returns {Promise<object>}
 */
const CORS_PROXY = "https://corsproxy.io/?";

export const checkDomainPrice = async (domain) => {
  try {
    const url = `${CORS_PROXY}https://api.godaddy.com/v1/domains/available?domain=${domain}`;

    const res = await axios.get(url, {
      headers: {
        Authorization: `sso-key ${import.meta.env.VITE_GODADDY_API_KEY}:${import.meta.env.VITE_GODADDY_API_SECRET}`,
        Accept: "application/json",
      },
    });

    return {
      domain,
      available: res.data.available,
      price: res.data.price ? res.data.price / 1000000 : null,
      currency: res.data.currency,
    };
  } catch (err) {
    // console.error("CORS Proxy Error:", err);
    return {
      available: false,
      error: "CORS blocked / proxy failed",
    };
  }
};


export default checkDomainPrice;
