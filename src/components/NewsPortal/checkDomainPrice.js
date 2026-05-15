import { Currency } from "lucide-react";

// utils/checkDomainPrice.js
export async function checkDomainPrice(domain) {
  if (!domain) {
    return { error: "Domain name is required" };
  }

  try {
    const res = await fetch(
      `https://domainprie.onrender.com/?domain=${encodeURIComponent(domain)}`,
    );

    if (!res.ok) {
      const errData = await res.json();
      return { error: errData.error || "Failed to check domain" };
    }

    const data = await res.json();

    if (data?.available) {
      return {
        available: true,
        price: data.price ? data.price : "N/A", // Godaddy returns in micros
        currency: data.currency,
      };
    } else {
      return { available: false };
    }
  } catch (err) {
    return { error: err.message || "Something went wrong" };
  }
}
