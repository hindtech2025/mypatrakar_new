import { useEffect, useState } from "react";

const useRazorpay = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById("razorpay-script");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.id = "razorpay-script";
      script.onload = () => setLoaded(true);
      script.onerror = () => 
      // script.onerror = () => console.error("Razorpay SDK failed to load.");
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  return loaded;
};

export default useRazorpay;
