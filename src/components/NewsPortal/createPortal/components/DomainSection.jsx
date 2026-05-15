// import { useState, useEffect, useContext } from "react";
// import { FiAlertTriangle, FiCheckCircle, FiSearch, FiInfo } from "react-icons/fi";
// import { IoMdRefresh, IoMdRefreshCircle } from "react-icons/io";
// import { PaymentContext } from "../../../../context/PaymentContext";

// // --- REAL-TIME ESTIMATED DOMAIN PRICES (ANNUAL) ---
// const DUMMY_DOMAINS = [
//   { name: "dainiknews.com", available: true, price: 1150 },
//   { name: "bharatlive.in", available: true, price: 649 },
//   { name: "citykhabar.org", available: true, price: 1000 },
//   { name: "hindustantimes.live", available: true, price: 1866 },
//   { name: "newsnetwork.com", available: false, price: 1150 },
//   { name: "rapidnews.in", available: true, price: 649 },
//   { name: "digitalpatrakar.com", available: true, price: 1150 },
//   { name: "samachartoday.in", available: true, price: 649 },
//   { name: "janataawaz.com", available: false, price: 1150 },
//   { name: "globalnews.live", available: true, price: 1866 },
// ];

// export default function DomainSection({
//   formData,
//   setFormData,
//   domainResult,
//   setDomainResult,
//   validation,
//   hasError,
//   handleChange,
//   handleBlur,
//   getInputBorder,
// }) {
//   const [ownDomain, setOwnDomain] = useState(false);
//   const [appliedDomain, setAppliedDomain] = useState(null);
//   const [typing, setTyping] = useState(null);
//   const [domainTouched, setDomainTouched] = useState(false);

//   const { setPortalRequestDetails, portalRequestDetail } = useContext(PaymentContext);

//   const domain = String(formData.free_domain || "")
//     .replace(/^https?:\/\//i, "")
//     .replace(/^www\./i, "")
//     .toLowerCase();

//   // ---------------------------------------------------------
//   // SIMULATED SEARCH FROM DUMMY DATA
//   // ---------------------------------------------------------
//   const checkDomainAvailability = (domainName) => {
//     setDomainResult({ loading: true });

//     setTimeout(() => {
//       const found = DUMMY_DOMAINS.find((d) => d.name === domainName);

//       if (found) {
//         if (!found.available) {
//           setDomainResult({
//             available: false,
//             message: `Oops! "${domainName}" is already taken. Try another name.`,
//           });
//         } else {
//           setDomainResult({
//             available: true,
//             price: found.price,
//             message: found.price <= 999 ? "Perfect! This domain is available for FREE." : "Premium domain found!",
//           });
//         }
//       } else {
//         // Default response if not in dummy list
//         setDomainResult({
//           available: true,
//           price: 799,
//           message: "Domain is available!",
//         });
//       }
//     }, 800);
//   };

//   const checkIfDomainExists = async (domainName) => {
//     setDomainResult({ loading: true });
//     try {
//       // Basic check simulation
//       const isOk = domainName.includes(".");
//       setTimeout(() => {
//         setDomainResult({
//           exists: isOk,
//           message: isOk ? "Domain ownership verified." : null,
//           error: isOk ? null : "Invalid domain format. Please check again.",
//         });
//       }, 800);
//     } catch (err) {
//       setDomainResult({ exists: false, error: "Verification failed." });
//     }
//   };

//   useEffect(() => {
//     if (!domain || appliedDomain) return;

//     if (typing) clearTimeout(typing);
//     const delay = setTimeout(() => {
//       if (ownDomain) checkIfDomainExists(domain);
//       else checkDomainAvailability(domain);
//     }, 600);
//     setTyping(delay);
//   }, [domain, ownDomain]);

//   // Handle Domain Selection
//   const onApplyDomain = () => {
//     setAppliedDomain(formData.free_domain);
//     // Add logic here to update global price if price > 999
//   };

//   const onChangeDomain = () => {
//     setAppliedDomain(null);
//     setDomainResult(null);
//     setDomainTouched(false);
//     setFormData((p) => ({ ...p, free_domain: "" }));
//   };

//   // Auto-suggest logic
//   useEffect(() => {
//     if (!formData.website_name || domainTouched || appliedDomain || ownDomain) return;
//     const slug = formData.website_name.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
//     if (slug) setFormData((prev) => ({ ...prev, free_domain: `${slug}.com` }));
//   }, [formData.website_name, domainTouched, appliedDomain, ownDomain]);

//   return (
//     <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
//       <div className="grid md:grid-cols-2 gap-6">
//         {/* WEBSITE NAME */}
//         <div>
//           <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
//             <FiInfo className="text-red-500" /> Website Display Name
//           </label>
//           <input
//             type="text"
//             name="website_name"
//             value={formData.website_name}
//             onChange={handleChange}
//             onBlur={() => handleBlur("website_name")}
//             placeholder="e.g. Bharat News Live"
//             className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${getInputBorder("website_name")} focus:ring-4 focus:ring-red-50/50 outline-none`}
//           />
//           {hasError("website_name") && (
//             <p className="mt-1 text-xs text-red-500 font-medium">{validation.errors.website_name}</p>
//           )}
//         </div>

//         {/* DOMAIN SEARCH */}
//         <div>
//           <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
//             <FiSearch className="text-red-500" /> Search News Domain
//           </label>
//           <div className="flex group">
//             <span className="inline-flex items-center px-4 rounded-l-xl border-2 border-r-0 border-gray-200 bg-gray-50 text-gray-400 font-medium">
//               www.
//             </span>
//             <input
//               type="text"
//               name="free_domain"
//               disabled={!!appliedDomain}
//               value={domain}
//               onChange={(e) => { setDomainTouched(true); handleChange(e); }}
//               placeholder="newsname.com"
//               className={`flex-1 px-4 py-3 rounded-r-xl border-2 transition-all ${getInputBorder("free_domain")} outline-none focus:ring-4 focus:ring-red-50/50`}
//             />
//           </div>

//           {/* Verification for "Own Domain" */}
//           <div className="mt-3 flex items-center gap-2">
//             <input
//               id="own_domain"
//               type="checkbox"
//               checked={ownDomain}
//               onChange={(e) => {
//                 setOwnDomain(e.target.checked);
//                 setPortalRequestDetails({ ...portalRequestDetail, domainOwned: e.target.checked });
//                 setAppliedDomain(null);
//                 setDomainResult(null);
//               }}
//               className="w-4 h-4 accent-red-600"
//             />
//             <label htmlFor="own_domain" className="text-sm font-medium text-gray-600 cursor-pointer select-none">
//               I already own this domain
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* --- RESULTS SECTION --- */}
//       <div className="mt-4">
//         {domainResult?.loading && (
//           <div className="flex items-center gap-2 text-gray-500 animate-pulse bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
//             <IoMdRefreshCircle className="animate-spin text-red-500" size={24} />
//             <span className="text-sm font-bold">Checking availability on servers...</span>
//           </div>
//         )}

//         {/* 1. DOMAIN TAKEN */}
//         {!ownDomain && domainResult?.available === false && (
//           <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
//             <FiAlertTriangle className="text-red-500 shrink-0" size={20} />
//             <p className="text-red-800 text-sm font-bold">{domainResult.message}</p>
//           </div>
//         )}

//         {/* 2. FREE DOMAIN (UNDER 999) */}
//         {!ownDomain && domainResult?.available && domainResult.price <= 999 && !appliedDomain && (
//           <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="bg-green-500 p-1.5 rounded-full"><FiCheckCircle className="text-white" /></div>
//               <div>
//                 <p className="text-green-800 font-bold text-sm">₹0.00 <span className="text-xs line-through text-green-600/70 ml-1">₹{domainResult.price || 999}</span></p>
//                 <p className="text-green-700 text-xs font-medium">Included for free in your news portal plan!</p>
//               </div>
//             </div>
//             <button onClick={onApplyDomain} className="bg-green-600 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-green-700 transition-all shadow-md shadow-green-200">Apply Free</button>
//           </div>
//         )}

//         {/* 3. PREMIUM DOMAIN (OVER 999) */}
//         {!ownDomain && domainResult?.available && domainResult.price > 999 && !appliedDomain && (
//           <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="bg-amber-500 p-1.5 rounded-full"><FiInfo className="text-white" /></div>
//               <div>
//                 <p className="text-amber-800 font-bold text-sm">Extra Pay: ₹{domainResult.price - 999}</p>
//                 <p className="text-amber-700 text-xs font-medium">₹999 discount applied. This is a premium domain.</p>
//               </div>
//             </div>
//             <button onClick={onApplyDomain} className="bg-amber-600 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-amber-700 transition-all shadow-md shadow-amber-200">Select Premium</button>
//           </div>
//         )}

//         {/* 4. DOMAIN APPLIED SUCCESS */}
//         {appliedDomain && (
//           <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="bg-blue-500 p-1.5 rounded-full"><FiCheckCircle className="text-white" /></div>
//               <p className="text-blue-800 font-bold text-sm">Domain Locked: <span className="underline">{appliedDomain}</span></p>
//             </div>
//             <button onClick={onChangeDomain} className="text-blue-600 hover:text-red-500 text-xs font-bold flex items-center gap-1 transition-colors"><IoMdRefresh size={16} /> Change</button>
//           </div>
//         )}

//         {/* 5. OWN DOMAIN VERIFICATION */}
//         {ownDomain && domainResult && !domainResult.loading && (
//           <div className={`p-4 rounded-xl border ${domainResult.exists ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} mt-2`}>
//             <div className="flex items-center gap-3">
//                {domainResult.exists ? <FiCheckCircle className="text-green-500" /> : <FiAlertTriangle className="text-red-500" />}
//                <p className={`text-sm font-bold ${domainResult.exists ? 'text-green-800' : 'text-red-800'}`}>
//                  {domainResult.message || domainResult.error}
//                </p>
//             </div>
//             {domainResult.exists && (
//                <p className="text-[10px] text-green-700 mt-2 bg-white/50 p-2 rounded italic">** Note: Please point your nameservers to our IP after portal setup.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// import { useState, useEffect, useContext } from "react";
// import {
//   FiAlertTriangle,
//   FiCheckCircle,
//   FiSearch,
//   FiInfo,
// } from "react-icons/fi";
// import { IoMdRefresh, IoMdRefreshCircle } from "react-icons/io";
// import { PaymentContext } from "../../../../context/PaymentContext";

// const DUMMY_DOMAINS = [
//   { name: "dainiknews.com", available: true, price: 1150 },
//   { name: "bharatlive.in", available: true, price: 649 },
//   { name: "citykhabar.org", available: true, price: 1000 },
//   { name: "hindustantimes.live", available: true, price: 1866 },
//   { name: "newsnetwork.com", available: false, price: 1150 },
// ];

// export default function DomainSection({
//   formData,
//   setFormData,
//   domainResult,
//   setDomainResult,
//   validation,
//   hasError,
//   handleChange,
//   handleBlur,
//   getInputBorder,
//   isDomain
// }) {
//   const [ownDomain, setOwnDomain] = useState(false);
//   const [appliedDomain, setAppliedDomain] = useState(null);
//   const [typing, setTyping] = useState(null);
//   const [domainTouched, setDomainTouched] = useState(false);

//   const { setPortalRequestDetails, portalRequestDetail } =
//     useContext(PaymentContext);

//   const isDemoMode = formData.is_demo ;

//   // ✅ DOMAIN NORMALIZATION
//   const domain = String(formData.free_domain || "")
//     .replace(/^https?:\/\//i, "")
//     .replace(/^www\./i, "")
//     .toLowerCase();

//   // ---------------------------------------------------------
//   // DOMAIN CHECK (SIMULATED)
//   // ---------------------------------------------------------
//   const checkDomainAvailability = (domainName) => {
//     setDomainResult({ loading: true });

//     setTimeout(() => {
//       const found = DUMMY_DOMAINS.find((d) => d.name === domainName);

//       if (found) {
//         if (!found.available) {
//           setDomainResult({
//             available: false,
//             message: `"${domainName}" is already taken`,
//           });
//         } else {
//           setDomainResult({
//             available: true,
//             price: found.price,
//             message: "Domain available",
//           });
//         }
//       } else {
//         setDomainResult({
//           available: true,
//           price: 799,
//           message: "Domain available",
//         });
//       }
//     }, 800);
//   };

//   // ---------------------------------------------------------
//   // AUTO CHECK
//   // ---------------------------------------------------------
//   useEffect(() => {
//     if (isDomain !== 1) return;
//     if (!domain || appliedDomain) return;

//     if (typing) clearTimeout(typing);

//     const delay = setTimeout(() => {
//       checkDomainAvailability(domain);
//     }, 600);

//     setTyping(delay);
//   }, [domain, isDomain]);

//   // ---------------------------------------------------------
//   // AUTO SUGGEST
//   // ---------------------------------------------------------
//   useEffect(() => {
//     if (isDomain !== 1) return;
//     if (!formData.website_name || domainTouched || appliedDomain) return;

//     const slug = formData.website_name
//       .toLowerCase()
//       .replace(/[^a-z0-9]/g, "");

//     if (slug) {
//       setFormData((prev) => ({
//         ...prev,
//         free_domain: `${slug}.com`,
//       }));
//     }
//   }, [formData.website_name, isDomain]);

//   // ---------------------------------------------------------
//   // HANDLERS
//   // ---------------------------------------------------------
//   const onApplyDomain = () => {
//     setAppliedDomain(formData.free_domain);
//   };

//   const onChangeDomain = () => {
//     setAppliedDomain(null);
//     setDomainResult(null);
//     setDomainTouched(false);
//     setFormData((p) => ({ ...p, free_domain: "" }));
//   };

//   return (
//     <section className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">

//       {/* GRID */}
//       <div className={`grid ${isDomain  ? "md:grid-cols-2" : "md:grid-cols-1"} gap-6`}>

//         {/* ✅ WEBSITE NAME (ALWAYS SHOW) */}
//         <div>
//           <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
//             <FiInfo className="text-red-500" />
//             Website Display Name
//           </label>

//           <input
//             type="text"
//             name="website_name"
//             value={formData.website_name}
//             onChange={handleChange}
//             onBlur={() => handleBlur("website_name")}
//             placeholder="e.g. Bharat News Live"
//             className={`w-full px-4 py-3 rounded-xl border-2 ${getInputBorder("website_name")}`}
//           />

//           {hasError("website_name") && (
//             <p className="text-xs text-red-500 mt-1">
//               {validation.errors.website_name}
//             </p>
//           )}
//         </div>

//         {/* ✅ DOMAIN INPUT (ONLY IF isDomain = 1) */}
//         {isDomain  && (
//           <div>
//             <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
//               <FiSearch className="text-red-500" />
//               Search Domain
//             </label>

//             <div className="flex">
//               <span className="px-4 flex items-center border rounded-l-xl bg-gray-50">
//                 www.
//               </span>

//               <input
//                 type="text"
//                 name="free_domain"
//                 value={domain}
//                 onChange={(e) => {
//                   setDomainTouched(true);
//                   handleChange(e);
//                 }}
//                 placeholder="newsname.com"
//                 className={`flex-1 px-4 py-3 border rounded-r-xl ${getInputBorder("free_domain")}`}
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ❌ HIDE MESSAGE */}
//       {isDomain !== 1 && (
//         <p className="text-xs text-gray-500">
//           Domain selection is not available for this package.
//         </p>
//       )}

//       {/* ✅ RESULT SECTION */}
//       {isDomain  && domainResult?.loading && (
//         <div className="flex items-center gap-2 text-gray-500">
//           <IoMdRefreshCircle className="animate-spin text-red-500" />
//           Checking domain...
//         </div>
//       )}

//       {/* AVAILABLE */}
//       {isDomain  && domainResult?.available && !appliedDomain && (
//         <div className="p-4 bg-green-50 border rounded-xl flex justify-between">
//           <p className="text-green-700 text-sm font-bold">
//             ₹{domainResult.price} - Available
//           </p>

//           <button
//             onClick={onApplyDomain}
//             className="bg-green-600 text-white px-4 py-1 rounded"
//           >
//             Apply
//           </button>
//         </div>
//       )}

//       {/* TAKEN */}
//       {isDomain  && domainResult?.available === false && (
//         <div className="p-4 bg-red-50 border rounded-xl text-red-600 text-sm">
//           {domainResult.message}
//         </div>
//       )}

//       {/* APPLIED */}
//       {isDomain  && appliedDomain && (
//         <div className="p-4 bg-blue-50 border rounded-xl flex justify-between">
//           <p className="text-blue-700 text-sm">
//             Applied: {appliedDomain}
//           </p>

//           <button onClick={onChangeDomain} className="text-red-500 text-xs">
//             Change
//           </button>
//         </div>
//       )}
//     </section>
//   );
// }
import { useState, useEffect, useContext, useRef } from "react";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiSearch,
  FiInfo,
} from "react-icons/fi";
import { IoMdRefresh, IoMdRefreshCircle } from "react-icons/io";
import { PaymentContext } from "../../../../context/PaymentContext";
import { checkDomainAvailability as checkDomain } from "../../../../api";

// Currency conversion API (using free API)
const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    console.log(`🔄 Converting ${amount} ${fromCurrency} to ${toCurrency}`);
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
    );
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const convertedAmount = amount * rate;
    console.log(`✅ Conversion successful: ${convertedAmount} ${toCurrency}`);
    return convertedAmount;
  } catch (error) {
    console.error("❌ Currency conversion failed:", error);
    // Fallback approximate rates if API fails
    const fallbackRates = { USD: 1, INR: 83 };
    const rate = fallbackRates[toCurrency] / fallbackRates[fromCurrency];
    const convertedAmount = amount * rate;
    console.log(`⚠️ Using fallback conversion: ${convertedAmount} ${toCurrency}`);
    return convertedAmount;
  }
};

export default function DomainSection({
  formData,
  setFormData,
  domainResult,
  setDomainResult,
  validation,
  hasError,
  handleChange,
  handleBlur,
  getInputBorder,
  isDomain,
  region = 0, // 0 = India (INR), 1 = Other (USD)
}) {
  const [ownDomain, setOwnDomain] = useState(false);
  const [appliedDomain, setAppliedDomain] = useState(null);
  const [typing, setTyping] = useState(null);
  const [domainTouched, setDomainTouched] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [autoFillInProgress, setAutoFillInProgress] = useState(false);
  
  // Add ref to track if auto-fill was triggered by user
  const isAutoFillTriggered = useRef(false);
  
  console.log("🔍 DomainSection Rendered - isDomain:", isDomain);
  console.log("📝 Current free_domain:", formData.free_domain);
  console.log("🎯 Applied Domain:", appliedDomain);

  const { setPortalRequestDetails, portalRequestDetail } =
    useContext(PaymentContext);

  const isDemoMode = formData.is_demo;

  // Get currency symbol based on region
  const getCurrencySymbol = () => {
    return region === 0 ? "₹" : "$";
  };

  // Format price based on region
  const formatPrice = (price, currency = "USD") => {
    if (region === 0) {
      return `₹${Math.round(price).toLocaleString("en-IN")}`;
    } else {
      return `$${price.toLocaleString("en-US")}`;
    }
  };

  // Get display price with conversion
  const getDisplayPrice = async (apiPrice, apiCurrency = "USD") => {
    console.log("💰 Getting display price for:", apiPrice, apiCurrency);
    if (region === 0) {
      try {
        const inrPrice = await convertCurrency(apiPrice, apiCurrency, "INR");
        return {
          amount: inrPrice,
          formatted: `₹${Math.round(inrPrice).toLocaleString("en-IN")}`,
          currency: "INR",
        };
      } catch (error) {
        console.error("Conversion error:", error);
        const inrPrice = apiPrice * 83;
        return {
          amount: inrPrice,
          formatted: `₹${Math.round(inrPrice).toLocaleString("en-IN")}`,
          currency: "INR",
        };
      }
    } else {
      return {
        amount: apiPrice,
        formatted: `$${apiPrice.toLocaleString("en-US")}`,
        currency: "USD",
      };
    }
  };

  // ✅ DOMAIN NORMALIZATION
  const domain = String(formData.free_domain || "")
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .toLowerCase();

  // ---------------------------------------------------------
  // REAL API DOMAIN CHECK
  // ---------------------------------------------------------
  const checkDomainAvailability = async (domainName) => {
    console.log("🔍 Checking domain availability for:", domainName);
    setDomainResult({ loading: true });
    setIsConverting(true);

    try {
      const response = await checkDomain({ domain: domainName });
      console.log("📡 API Response:", response);

      if (response.status === 200 && response.data) {
        const {
          available,
          price,
          currency = "USD",
          domain: checkedDomain,
        } = response.data.response;

        console.log(`✅ Domain ${domainName} is ${available ? "available" : "taken"}`);
        console.log(`💰 Price: ${price} ${currency}`);

        const displayPrice = await getDisplayPrice(price, currency);
        setIsConverting(false);

        if (!available) {
          setDomainResult({
            available: false,
            message: `"${domainName}" is already taken`,
            originalPrice: price,
            displayPrice: displayPrice,
          });
        } else {
          setDomainResult({
            available: true,
            price: price,
            displayPrice: displayPrice,
            originalCurrency: currency,
            message: "Domain available",
            domain: checkedDomain,
          });
        }
      } else {
        console.log("❌ API Error:", response.status_message);
        setDomainResult({
          available: false,
          message:
            response.status_message || "Failed to check domain availability",
        });
      }
    } catch (error) {
      console.error("❌ Domain check error:", error);
      setDomainResult({
        available: false,
        message: "Error checking domain availability. Please try again.",
      });
    } finally {
      setIsConverting(false);
    }
  };

  // ---------------------------------------------------------
  // AUTO CHECK (when domain changes)
  // ---------------------------------------------------------
  useEffect(() => {
    console.log("🔄 Auto-check useEffect triggered - isDomain:", isDomain, "domain:", domain, "appliedDomain:", appliedDomain);
    
    if (isDomain !== 1) {
      console.log("⏭️ Skipping - isDomain is not 1");
      return;
    }
    if (!domain || appliedDomain) {
      console.log("⏭️ Skipping - No domain or domain already applied");
      return;
    }

    if (typing) {
      console.log("🧹 Clearing previous timeout");
      clearTimeout(typing);
    }

    const delay = setTimeout(() => {
      console.log("⏰ Checking domain after delay:", domain);
      checkDomainAvailability(domain);
    }, 600);

    setTyping(delay);
  }, [domain, isDomain]);

  // ---------------------------------------------------------
  // AUTO SUGGEST (Website Name -> Domain)
  // This is the main auto-fill functionality
  // ---------------------------------------------------------
  useEffect(() => {
    console.log("🔄 Auto-suggest useEffect triggered");
    console.log("  - isDomain:", isDomain);
    console.log("  - website_name:", formData.website_name);
    console.log("  - domainTouched:", domainTouched);
    console.log("  - appliedDomain:", appliedDomain);
    console.log("  - autoFillInProgress:", autoFillInProgress);
    
    // Only proceed if:
    // 1. Package includes domain (isDomain === 1)
    // 2. Website name exists
    // 3. User hasn't manually touched the domain input
    // 4. No domain has been applied yet
    // 5. Auto-fill is not already in progress (prevent loops)
    if (isDomain !== 1) {
      console.log("⏭️ Skipping - isDomain is not 1");
      return;
    }
    
    if (!formData.website_name || domainTouched || appliedDomain || autoFillInProgress) {
      console.log("⏭️ Skipping auto-suggest - Conditions not met");
      console.log("  - website_name exists:", !!formData.website_name);
      console.log("  - domainTouched:", domainTouched);
      console.log("  - appliedDomain exists:", !!appliedDomain);
      console.log("  - autoFillInProgress:", autoFillInProgress);
      return;
    }

    // Generate slug from website name (remove special characters, spaces)
    const slug = formData.website_name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .trim();
    
    console.log("🔨 Generated slug from website name:", slug);
    
    if (slug) {
      const suggestedDomain = `${slug}.com`;
      console.log("💡 Auto-filling domain with:", suggestedDomain);
      
      // Set flag to prevent infinite loop
      setAutoFillInProgress(true);
      
      // Update the domain in form data
      setFormData((prev) => {
        console.log("✏️ Updating formData with suggested domain:", suggestedDomain);
        return {
          ...prev,
          free_domain: suggestedDomain,
        };
      });
      
      // Reset the flag after a short delay
      setTimeout(() => {
        setAutoFillInProgress(false);
        console.log("🔓 Auto-fill flag reset");
      }, 100);
    }
  }, [formData.website_name, isDomain, domainTouched, appliedDomain, autoFillInProgress]);

  // ---------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------
  const onApplyDomain = () => {
    console.log("✅ Applying domain:", formData.free_domain);
    setAppliedDomain(formData.free_domain);
    
    if (domainResult?.available) {
      setPortalRequestDetails({
        ...portalRequestDetail,
        selectedDomain: formData.free_domain,
        domainPrice: domainResult.displayPrice?.amount || domainResult.price,
        domainCurrency: domainResult.displayPrice?.currency || "USD",
      });
      console.log("📦 Updated portal request details with domain info");
    }
  };

  const onChangeDomain = () => {
    console.log("🔄 Changing/removing domain");
    setAppliedDomain(null);
    setDomainResult(null);
    setDomainTouched(false);
    setFormData((p) => ({ ...p, free_domain: "" }));
    setPortalRequestDetails({
      ...portalRequestDetail,
      selectedDomain: null,
      domainPrice: null,
    });
  };

  const handleDomainChange = (e) => {
    console.log("✏️ User manually changed domain input:", e.target.value);
    setDomainTouched(true); // Mark that user has touched/edited the domain
    handleChange(e); // Call the parent's handleChange
  };

  return (
    <section className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
      {/* Debug Info Panel (Remove in production) */}
      {/* {process.env.NODE_ENV === "development" && (
        <div className="bg-gray-100 p-3 rounded text-xs font-mono mb-4">
          <details>
            <summary className="cursor-pointer font-bold">🔧 Debug Info</summary>
            <div className="mt-2">
              <p>isDomain: {isDomain}</p>
              <p>website_name: {formData.website_name || "(empty)"}</p>
              <p>free_domain: {formData.free_domain || "(empty)"}</p>
              <p>domainTouched: {domainTouched ? "Yes" : "No"}</p>
              <p>appliedDomain: {appliedDomain || "(none)"}</p>
              <p>autoFillInProgress: {autoFillInProgress ? "Yes" : "No"}</p>
              <p>domainResult: {domainResult ? JSON.stringify(domainResult) : "(none)"}</p>
            </div>
          </details>
        </div>
      )} */}

      {/* GRID */}
      <div
        className={`grid ${
          isDomain ? "md:grid-cols-2" : "md:grid-cols-1"
        } gap-6`}
      >
        {/* ✅ WEBSITE NAME (ALWAYS SHOW) */}
        <div>
          <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
            <FiInfo className="text-red-500" />
            Website Display Name
          </label>

          <input
            type="text"
            name="website_name"
            value={formData.website_name}
            onChange={handleChange}
            onBlur={() => handleBlur("website_name")}
            placeholder="e.g. Bharat News Live"
            className={`w-full px-4 py-3 rounded-xl border-2 ${getInputBorder(
              "website_name",
            )}`}
          />
          <p className="text-xs text-gray-500 mt-1">
            {isDomain === 1 && !domainTouched && !appliedDomain && 
              "💡 Domain will be auto-filled based on this name"}
          </p>

          {hasError("website_name") && (
            <p className="text-xs text-red-500 mt-1">
              {validation.errors.website_name}
            </p>
          )}
        </div>

        {/* ✅ DOMAIN INPUT (ONLY IF isDomain = 1) */}
        {isDomain === 1 && (
          <div>
            <label className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <FiSearch className="text-red-500" />
              Search Domain
            </label>

            <div className="flex">
              <span className="px-4 flex items-center border rounded-l-xl bg-gray-50">
                www.
              </span>

              <input
                type="text"
                name="free_domain"
                value={domain}
                onChange={handleDomainChange}
                onFocus={() => {
                  console.log("🎯 Domain input focused");
                  if (!domainTouched && !appliedDomain) {
                    console.log("📝 Marking domain as touched on focus");
                    setDomainTouched(true);
                  }
                }}
                placeholder="newsname.com"
                className={`flex-1 px-4 py-3 border rounded-r-xl ${getInputBorder(
                  "free_domain",
                )} ${appliedDomain ? "bg-gray-100 cursor-not-allowed" : ""}`}
                disabled={!!appliedDomain}
              />
            </div>
            
            {!domainTouched && !appliedDomain && formData.website_name && (
              <p className="text-xs text-green-600 mt-1">
                ✨ Auto-suggested from website name. You can edit it if needed.
              </p>
            )}
          </div>
        )}
      </div>

      {/* ❌ HIDE MESSAGE */}
      {isDomain !== 1 && (
        <p className="text-xs text-gray-500">
          Domain selection is not available for this package.
        </p>
      )}

      {/* ✅ RESULT SECTION */}
      {isDomain === 1 && (domainResult?.loading || isConverting) && (
        <div className="flex items-center gap-2 text-gray-500 p-4 bg-gray-50 rounded-xl">
          <IoMdRefreshCircle className="animate-spin text-red-500" size={20} />
          <span className="text-sm">
            {isConverting ? "Converting price..." : "Checking domain..."}
          </span>
        </div>
      )}

      {/* AVAILABLE */}
      {isDomain === 1 && domainResult?.available && !appliedDomain && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-green-700 font-bold">
              {domainResult.displayPrice?.formatted ||
                formatPrice(
                  domainResult.price,
                  domainResult.originalCurrency || "USD",
                )}
            </p>
            <p className="text-green-600 text-xs">
              ✅ Domain available for registration
            </p>
            {region === 0 && domainResult.originalCurrency === "USD" && (
              <p className="text-gray-500 text-xs mt-1">
                *Converted from USD (approx.)
              </p>
            )}
          </div>

          <button
            onClick={onApplyDomain}
            className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-green-700 transition-all shadow-md"
          >
            Select Domain
          </button>
        </div>
      )}

      {/* TAKEN */}
      {isDomain === 1 && domainResult?.available === false && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
          <FiAlertTriangle className="text-red-500 shrink-0" />
          <div>
            <p className="text-red-700 text-sm font-medium">
              {domainResult.message}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              💡 Try a different name or extension
            </p>
          </div>
        </div>
      )}

      {/* APPLIED */}
      {isDomain === 1 && appliedDomain && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-blue-700 font-medium">
              ✅ Applied: <span className="font-bold">{appliedDomain}</span>
            </p>
            {domainResult?.displayPrice && (
              <p className="text-blue-600 text-xs mt-1">
                Price: {domainResult.displayPrice.formatted}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              You can change this domain anytime before final submission
            </p>
          </div>

          <button
            onClick={onChangeDomain}
            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors"
          >
            <IoMdRefresh size={16} /> Change
          </button>
        </div>
      )}
    </section>
  );
}