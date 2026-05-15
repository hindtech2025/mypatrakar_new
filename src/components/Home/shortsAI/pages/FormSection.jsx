// import React, { useEffect, useState, memo, useCallback } from "react";
// import SelectInput from "../components/SelectInput";
// import Select from "react-select";
// import { Country, State, City } from "country-state-city";
// import handleGenerateClick from "../utils/eligible";
// import { toast } from "react-toastify";
// import useOpenAI from "../utils/useOpenAI";

// const IP_CACHE_KEY = "cached_user_ip";
// const IP_LOGS_KEY = "user_ip_logs";
// const LIMIT = 3;
// const MS_24H = 24 * 60 * 60 * 1000;

// // ✅ AI Tones with Descriptions
// // const toneOptions = [
// //   { name: "Neutral", desc: "Balanced and fact-based tone." },
// //   { name: "Crisp", desc: "Short, clear, and impactful tone." },
// //   { name: "Professional", desc: "Polished and credible writing style." },
// //   { name: "Engaging", desc: "Hooks the reader instantly." },
// //   { name: "Urgent", desc: "Perfect for breaking or developing stories." },
// // ];

// const toneOptions = [
//   {
//     name: "Neutral",
//     desc: "Balanced, fact-based, and non-opinionated reporting.",
//     useFor: "Breaking news, politics, government, business, law",
//     default: true,
//   },
//   {
//     name: "Formal",
//     desc: "Institutional, official, and policy-focused tone.",
//     useFor: "Government statements, court rulings, official releases, budgets",
//   },
//   {
//     name: "Explainer",
//     desc: "Simple language with context-first explanation.",
//     useFor: "Policies, schemes, technology, economy, education",
//   },
//   {
//     name: "Analytical",
//     desc: "Data-driven, cause-and-effect focused writing.",
//     useFor: "Economy, markets, elections, long-term trends",
//   },
//   {
//     name: "Conversational",
//     desc: "Clear, readable, and human-friendly tone.",
//     useFor: "Lifestyle, culture, travel, human-interest stories",
//   },
//   {
//     name: "Editorial",
//     desc: "Opinion-based, viewpoint-driven institutional voice.",
//     useFor: "Editorials, opinion columns, commentary",
//   },
// ];

// function FormSection({
//   // formData,
//   // setFormData,
//   setGeneratedShort,

//   loading,
//   setLoading,
// }) {
//   const categories = [
//     "Politics",
//     "Business",
//     "National",
//     "International",
//     "Technology",
//     "Education",
//     "Health",
//     "Law & Courts",
//     "Economy",
//     "Environment",
//   ];
//   const { generateContent } = useOpenAI();
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [usageCount, setUsageCount] = useState(0);
//   const [nextResetTime, setNextResetTime] = useState(null);
//   const [userIP, setUserIP] = useState("local_fallback_ip");
//   const [countdown, setCountdown] = useState("");
//   const [formData, setFormData] = useState({
//     tone: "",
//     category: "",
//     country: "",
//     state: "",
//     city: "",
//     topic: "",
//   });
//   const handleGenerate = async () => {

//     setLoading(true);
//     // setGeneratedShort({
//     //   image: "https://picsum.photos/512/266",
//     //   title: "Amazing AI Short",
//     //   description:
//     //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     // });

//     const result =
//       await generateContent(`Write a short, verified, and up-to-date news article from ${formData.city},  ${formData.state}, ${formData.country}, in the ${formData.category} category, written in a ${formData.tone} tone and topic ${formData.topic}.
// The article must reflect real developments from today or at most one day old. Consider the following topic, idea, or suggestion while generating the content:.
// Return the result strictly in JSON format with the following keys:
// {
//   "title": "A short, attention-grabbing title of 5–12 words",
//   "description": "A concise summary of exactly 59 words capturing the key points",
//   "image": "A relevant and verified image URL from a real source"
// }
// Do not include any extra text, commentary, or markdown — only return valid JSON.`);
//     console.log(result);
//     setGeneratedShort(result);
//     result !== "Error generating content." && toast.success("Short generated!");
//     setLoading(false);

//     // Mock API delay
//     setTimeout(() => {
//       setGeneratedShort(result);
//       setLoading(false);
//     }, 1500);
//   };
//   // --- Fetch or use cached IP ---
//   useEffect(() => {
//     async function fetchPublicIP() {
//       try {
//         const cached = localStorage.getItem(IP_CACHE_KEY);
//         if (cached) {
//           const obj = JSON.parse(cached);
//           if (obj.ip && obj.fetchedAt && Date.now() - obj.fetchedAt < MS_24H) {
//             setUserIP(obj.ip);
//             return obj.ip;
//           }
//         }

//         const res = await fetch("https://api.ipify.org?format=json");
//         const data = await res.json();
//         const ip = data.ip || "local_fallback_ip";

//         localStorage.setItem(
//           IP_CACHE_KEY,
//           JSON.stringify({ ip, fetchedAt: Date.now() })
//         );

//         setUserIP(ip);
//         return ip;
//       } catch {
//         console.warn("IP fetch failed, using fallback");
//         setUserIP("local_fallback_ip");
//         return "local_fallback_ip";
//       }
//     }

//     fetchPublicIP().then(() => {
//       setCountries(Country.getAllCountries());
//     });
//   }, []);

//   // --- Watch for IP change ---
//   useEffect(() => {
//     if (userIP) checkUsageLimit(userIP);
//   }, [userIP]);

//   // --- Load States when Country Changes ---
//   useEffect(() => {
//     if (formData.country) {
//       const c = countries.find((x) => x.name === formData.country);
//       setStates(c ? State.getStatesOfCountry(c.isoCode) : []);
//     } else setStates([]);
//   }, [formData.country, countries]);

//   // --- Load Cities when State Changes ---
//   useEffect(() => {
//     if (formData.state && formData.country) {
//       const c = countries.find((x) => x.name === formData.country);
//       const s = states.find((x) => x.name === formData.state);
//       setCities(c && s ? City.getCitiesOfState(c.isoCode, s.isoCode) : []);
//     } else setCities([]);
//   }, [formData.state, formData.country, states, countries]);

//   // --- Check usage limit ---
//   const checkUsageLimit = (ip) => {
//     const raw = localStorage.getItem(IP_LOGS_KEY);
//     const logs = raw ? JSON.parse(raw) : {};
//     const timestamps = logs[ip] || [];

//     const now = Date.now();
//     const validTimestamps = timestamps.filter((t) => now - t < MS_24H);
//     const nextReset =
//       validTimestamps.length >= LIMIT ? validTimestamps[0] + MS_24H : null;

//     setUsageCount(validTimestamps.length);
//     setNextResetTime(nextReset);

//     logs[ip] = validTimestamps;
//   };

//   // --- Record usage ---
//   const recordUsage = (ip) => {
//     const raw = localStorage.getItem(IP_LOGS_KEY);
//     const logs = raw ? JSON.parse(raw) : {};
//     const now = Date.now();

//     if (!logs[ip]) logs[ip] = [];
//     logs[ip].push(now);
//     checkUsageLimit(ip);
//   };

//   // --- Countdown Timer ---
//   useEffect(() => {
//     if (!nextResetTime) return;

//     const interval = setInterval(() => {
//       const diff = nextResetTime - Date.now();
//       if (diff <= 0) {
//         clearInterval(interval);
//         checkUsageLimit(userIP);
//       } else {
//         const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
//         const mins = String(Math.floor((diff % 3600000) / 60000)).padStart(
//           2,
//           "0"
//         );
//         const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
//         setCountdown(`${hours}:${mins}:${secs}`);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [nextResetTime, userIP]);

//   // --- Handle input change ---
//   const handleChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   // --- Handle location type ---
//   const handleLocationTypeChange = (value) => {
//     setFormData((prev) => ({
//       ...prev,
//       locationType: value,
//       country: "",
//       state: "",
//       city: "",
//     }));
//   };

//   // --- Generate Click ---
//   const onGenerateClick = () => {
//     const { tone, category } = formData;

//     if (!tone || !category) {
//       toast.error(
//         `Please select ${!tone ? "AI Tone" : ""}${
//           !tone && !category ? " and " : ""
//         }${!category ? "Category" : ""} before generating.`
//       );
//       return;
//     }

//     if (usageCount >= LIMIT) {
//       toast.error("You’ve reached today’s limit. Try again later.");
//       return;
//     }

//     handleGenerateClick(handleGenerate, setLoading);
//     recordUsage(userIP);
//   };

//   const currentToneDesc =
//     toneOptions.find((t) => t.name === formData.tone)?.desc || "";

//   return (
//     <div className="flex flex-col gap-4 w-full px-4 sm:px-6 md:px-8">
//       {/* Optional Topic Input */}
//       <div className="w-full">
//         <label className="block text-gray-900  text-sm sm:text-base font-medium mb-1">
//           Topic (optional)
//         </label>
//         <input
//           type="text"
//           name="topic"
//           value={formData.topic || ""}
//           onChange={(e) => handleChange("topic", e.target.value)}
//           placeholder="Enter topic, idea, or suggestions for AI to consider while generating (OPTIONAL)"
//           className="md:w-full w-11/12 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//         />
//       </div>
//       {/* Tone Selector */}
//       <SelectInput
//         label="AI Tone / Writing Style"
//         value={formData.tone}
//         onChange={(e) => handleChange("tone", e.target.value)}
//         options={toneOptions.map((t) => t.name)}
//         required
//       />
//       {formData.tone && (
//         <p className="text-sm text-gray-600 italic pl-1">{currentToneDesc}</p>
//       )}

//       {/* Category Selector */}
//       <SelectInput
//         label="Category"
//         value={formData.category}
//         onChange={(e) => handleChange("category", e.target.value)}
//         options={categories}
//         required
//       />

//       {/* Location Section */}
//       <div>
//         <label className="block font-medium mb-1">Optional Location</label>
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 mb-3">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               name="locationType"
//               checked={formData.locationType === "global"}
//               onChange={() => handleLocationTypeChange("global")}
//               className="accent-[#16274E] w-4 h-4"
//             />
//             <span className="text-sm text-[#1E293B] font-medium">Global</span>
//           </label>
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               name="locationType"
//               checked={formData.locationType === "country"}
//               onChange={() => handleLocationTypeChange("country")}
//               className="accent-[#16274E] w-4 h-4"
//             />
//             <span className="text-sm text-[#1E293B] font-medium">Country</span>
//           </label>
//         </div>

//         {formData.locationType === "country" && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
//             <Select
//               options={countries.map((c) => ({ value: c.name, label: c.name }))}
//               value={
//                 formData.country
//                   ? { value: formData.country, label: formData.country }
//                   : null
//               }
//               onChange={(sel) => handleChange("country", sel?.value || "")}
//               placeholder="Select Country"
//               isClearable
//             />
//             <Select
//               options={states.map((s) => ({ value: s.name, label: s.name }))}
//               value={
//                 formData.state
//                   ? { value: formData.state, label: formData.state }
//                   : null
//               }
//               onChange={(sel) => handleChange("state", sel?.value || "")}
//               placeholder="Select State"
//               isDisabled={!formData.country}
//               isClearable
//             />
//             <Select
//               options={cities.map((c) => ({ value: c.name, label: c.name }))}
//               value={
//                 formData.city
//                   ? { value: formData.city, label: formData.city }
//                   : null
//               }
//               onChange={(sel) => handleChange("city", sel?.value || "")}
//               placeholder="Select City"
//               isDisabled={!formData.state}
//               isClearable
//             />
//           </div>
//         )}
//       </div>

//       {/* Generate Button */}
//       <button
//         onClick={onGenerateClick}
//         disabled={loading || usageCount >= LIMIT}
//         className={`md:w-full w-11/12 mt-3 py-3 text-white font-bold rounded-md transition ${
//           loading || usageCount >= LIMIT
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-[#16274E] hover:bg-blue-900"
//         }`}
//       >
//         {loading ? "Generating..." : "Generate Short"}
//       </button>

//       {/* Limit Info */}
//       <div className="text-center mt-2 text-sm text-gray-700 font-medium">
//         {usageCount < LIMIT ? (
//           <>
//             You’ve generated <span className="font-bold">{usageCount}</span> of{" "}
//             <span className="font-bold">{LIMIT}</span> shorts today.
//           </>
//         ) : (
//           <>
//             <span className="text-red-600 font-semibold">
//               Daily limit reached!
//             </span>{" "}
//             You can generate more after{" "}
//             <span className="font-bold text-blue-700">
//               {new Date(nextResetTime).toLocaleTimeString([], {
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 hour12: true,
//               })}
//             </span>{" "}
//             (in {countdown}).
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default memo(FormSection);

// import React, { useEffect, useState, memo, useRef } from "react";
// import Select from "react-select";
// import { Country, State, City } from "country-state-city";
// import handleGenerateClick from "../utils/eligible";
// import { toast } from "react-toastify";
// import useOpenAI from "../utils/useOpenAI";
// import SelectInput from "../components/SelectInput";
// import { categoriesData, toneOptions } from "../data/data";

// const IP_CACHE_KEY = "cached_user_ip";
// const IP_LOGS_KEY = "user_ip_logs";
// const LIMIT = 3;
// const MS_24H = 24 * 60 * 60 * 1000;
// function FormSection({ setGeneratedShort, loading, setLoading }) {
//   const { generateContent } = useOpenAI();
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [usageCount, setUsageCount] = useState(0);
//   const [nextResetTime, setNextResetTime] = useState(null);
//   const [userIP, setUserIP] = useState("local_fallback_ip");
//   const [countdown, setCountdown] = useState(MS_24H);
//   const [formData, setFormData] = useState({
//     tone: "Neutral",
//     category: "",
//     subcategory: "",
//     country: "",
//     state: "",
//     city: "",
//     topic: "",
//     locationType: "global",
//   });

//   // Fetch IP & Countries on Mount
//   useEffect(() => {
//     async function initData() {
//       try {
//         const res = await fetch("https://api.ipify.org?format=json");
//         const data = await res.json();
//         setUserIP(data.ip || "local_fallback_ip");
//       } catch {
//         setUserIP("local_fallback_ip");
//       }
//       setCountries(Country.getAllCountries());
//     }
//     initData();
//   }, []);

//   useEffect(() => {
//     if (userIP) checkUsageLimit(userIP);
//   }, [userIP]);

//   // Dependent Select Logic: State/City
//   useEffect(() => {
//     if (formData.country) {
//       const c = Country.getAllCountries().find(
//         (x) => x.name === formData.country,
//       );
//       setStates(c ? State.getStatesOfCountry(c.isoCode) : []);
//     }
//   }, [formData.country]);

//   useEffect(() => {
//     if (formData.state && formData.country) {
//       const c = Country.getAllCountries().find(
//         (x) => x.name === formData.country,
//       );
//       const s = states.find((x) => x.name === formData.state);
//       setCities(c && s ? City.getCitiesOfState(c.isoCode, s.isoCode) : []);
//     }
//   }, [formData.state, states]);

//   const checkUsageLimit = (ip) => {
//     const raw = localStorage.getItem(IP_LOGS_KEY);
//     const logs = raw ? JSON.parse(raw) : {};
//     const timestamps = logs[ip] || [];
//     const now = Date.now();
//     const validTimestamps = timestamps.filter((t) => now - t < MS_24H);
//     setUsageCount(validTimestamps.length);
//     setNextResetTime(
//       validTimestamps.length >= LIMIT ? validTimestamps[0] + MS_24H : null,
//     );
//   };

//   const recordUsage = (ip) => {
//     const raw = localStorage.getItem(IP_LOGS_KEY);
//     const logs = raw ? JSON.parse(raw) : {};
//     if (!logs[ip]) logs[ip] = [];
//     logs[ip].push(Date.now());
//     localStorage.setItem(IP_LOGS_KEY, JSON.stringify(logs));
//     checkUsageLimit(ip);
//   };

//   const handleChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   // Logic: When category changes, reset subcategory
//   const handleCategoryChange = (selectedOption) => {
//     setFormData((prev) => ({
//       ...prev,
//       category: selectedOption?.value || "",
//       subcategory: "", // Reset subcategory on category change
//     }));
//   };

//   const handleGenerate = async () => {
//     setLoading(true);
//     // const prompt = `Write a short, verified, and up-to-date news article.
//     // Location: ${formData.locationType === 'global' ? 'Global' : `${formData.city}, ${formData.state}, ${formData.country}`}.
//     // Category: ${formData.category} > ${formData.subcategory}.
//     // Tone: ${formData.tone}.
//     // Topic: ${formData.topic}.
//     // The article must reflect real developments from today or at most one day old.
//     // Return JSON format: {"title": "...", "description": "Exactly 59 words", "image": "URL"}`;

//     const prompt = `Generate a short, factual, and realistic news article from ${formData.locationType === "global" ? "Global" : `${formData.city}, ${formData.state}, ${formData.country}`}, related to ${formData.category} > ${formData.subcategory} (Topic: ${formData.topic}), in a ${formData.tone} tone.
// **Rules:**
// 1. Summarize verified and up-to-date sources.
// 2. The article must reflect real developments from today or at most one day old.
// 3. If no recent news exists, write a realistic fact-based update on the topic.
// 4. Keep the tone consistent with: ${formData.tone}.
// 5. Include a relevant Unsplash image.

// **Output Format:**
// Return valid JSON only:
// {
//   "title": "5–12 word headline",
//   "description": "Exactly 59 words summary",
//   "image": "Unsplash direct link"
// }`;

//     const result = await generateContent(prompt);
//     setGeneratedShort(result);
//     if (result !== "Error generating content.")
//       toast.success("Short generated!");
//     setLoading(false);
//   };

//   const onGenerateClick = () => {
//     if (!formData.tone || !formData.category || !formData.subcategory) {
//       toast.error("Please select Tone, Category and Subcategory.");
//       return;
//     }
//     if (usageCount >= LIMIT) {
//       toast.error("Daily limit reached.");
//       return;
//     }
//     handleGenerateClick(handleGenerate, setLoading);
//     recordUsage(userIP);
//   };

//   // Custom styles for React-Select to match your UI
//   const selectStyles = {
//     control: (base) => ({
//       ...base,
//       borderRadius: "0.375rem",
//       borderColor: "#D1D5DB",
//       padding: "1px",
//       fontSize: "14px",
//     }),
//   };
// console.log(countdown)
//   return (
//     <div className="flex flex-col gap-4 w-full px-4 sm:px-6 md:px-8">
//       {/* Topic */}
//       <div className="w-full">
//         <label className="block text-gray-900 text-sm font-medium mb-1">
//           Topic (optional)
//         </label>
//         <input
//           type="text"
//           value={formData.topic}
//           onChange={(e) => handleChange("topic", e.target.value)}
//           placeholder="Enter topic or suggestions..."
//           className="md:w-full w-11/12 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//         />
//       </div>

//       {/* Tone */}
//       <SelectInput
//         label="AI Tone / Writing Style"
//         value={formData.tone}
//         onChange={(e) => handleChange("tone", e.target.value)}
//         options={toneOptions.map((t) => t.name)}
//         required
//       />

//       {/* SEARCHABLE CATEGORY */}
//       <div className="w-full">
//         <label className="block text-gray-900 text-sm font-medium mb-1">
//           Category (Searchable)
//         </label>
//         <Select
//           className="md:w-full w-11/12"
//           options={Object.keys(categoriesData).map((cat) => ({
//             value: cat,
//             label: cat,
//           }))}
//           onChange={handleCategoryChange}
//           placeholder="Search & Select Category..."
//           styles={selectStyles}
//         />
//       </div>

//       {/* SEARCHABLE SUBCATEGORY (Only shows if Category is selected) */}
//       <div className="w-full">
//         <label className="block text-gray-900 text-sm font-medium mb-1">
//           Subcategory (Searchable)
//         </label>
//         <Select
//           className="md:w-full w-11/12"
//           options={
//             formData.category
//               ? categoriesData[formData.category].map((sub) => ({
//                   value: sub,
//                   label: sub,
//                 }))
//               : []
//           }
//           value={
//             formData.subcategory
//               ? { value: formData.subcategory, label: formData.subcategory }
//               : null
//           }
//           onChange={(sel) => handleChange("subcategory", sel?.value || "")}
//           placeholder={
//             formData.category
//               ? "Search & Select Subcategory..."
//               : "Select Category First"
//           }
//           isDisabled={!formData.category}
//           styles={selectStyles}
//         />
//       </div>

//       {/* Location */}
//       <div>
//         <label className="block font-medium mb-1 text-sm">
//           Optional Location
//         </label>
//         <div className="flex gap-6 mb-3">
//           {["global", "country"].map((type) => (
//             <label
//               key={type}
//               className="flex items-center gap-2 cursor-pointer capitalize text-sm"
//             >
//               <input
//                 type="radio"
//                 checked={formData.locationType === type}
//                 onChange={() => handleChange("locationType", type)}
//                 className="accent-[#16274E]"
//               />{" "}
//               {type}
//             </label>
//           ))}
//         </div>

//         {formData.locationType === "country" && (
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:w-full w-11/12">
//             <Select
//               styles={selectStyles}
//               options={countries.map((c) => ({ value: c.name, label: c.name }))}
//               onChange={(sel) => handleChange("country", sel?.value || "")}
//               placeholder="Country"
//             />
//             <Select
//               styles={selectStyles}
//               options={states.map((s) => ({ value: s.name, label: s.name }))}
//               onChange={(sel) => handleChange("state", sel?.value || "")}
//               placeholder="State"
//               isDisabled={!formData.country}
//             />
//             <Select
//               styles={selectStyles}
//               options={cities.map((c) => ({ value: c.name, label: c.name }))}
//               onChange={(sel) => handleChange("city", sel?.value || "")}
//               placeholder="City"
//               isDisabled={!formData.state}
//             />
//           </div>
//         )}
//       </div>

//       {/* Generate Button */}
//       <button
//         onClick={onGenerateClick}
//         disabled={loading || usageCount >= LIMIT}
//         className={`md:w-full w-11/12 mt-3 py-3 text-white font-bold rounded-md transition ${
//           loading || usageCount >= LIMIT
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-[#16274E] hover:bg-blue-900"
//         }`}
//       >
//         {loading ? "Generating..." : "Generate Short"}
//       </button>

//       {/* Usage Info */}
// <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2 text-center text-xs font-medium">

//   {usageCount < LIMIT ? (
//     <p className="text-gray-600">
//       You have{" "}
//       <span className="font-semibold text-blue-600">
//         {LIMIT - usageCount}
//       </span>{" "}
//       generations remaining
//     </p>
//   ) : (
//     <p className="flex items-center justify-center gap-1 text-red-500">
//       ⛔ Limit reached
//       <span className="text-gray-500">
//         · Resets in {countdown}
//       </span>
//     </p>
//   )}

// </div>

//     </div>
//   );
// }

// export default memo(FormSection);

// import React, { useEffect, useState, memo } from "react"; // useRef hata diya, zaroorat nahi thi
// import Select from "react-select";
// import { Country, State, City } from "country-state-city";
// import handleGenerateClick from "../utils/eligible";
// import { toast } from "react-toastify";
// import useOpenAI from "../utils/useOpenAI";
// import SelectInput from "../components/SelectInput";
// import { categoriesData, toneOptions } from "../data/data";

// const IP_CACHE_KEY = "cached_user_ip";
// const IP_LOGS_KEY = "user_ip_logs";
// const LIMIT = 3;
// const MS_24H = 24 * 60 * 60 * 1000;

// function FormSection({ setGeneratedShort, loading, setLoading }) {
//   const { generateContent, generateNewsImage } = useOpenAI();

//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   const [usageCount, setUsageCount] = useState(0);
//   const [nextResetTime, setNextResetTime] = useState(null); // Kab reset hoga timestamp
//   const [countdown, setCountdown] = useState(""); // Dikhaane ke liye string (HH:MM:SS)

//   const [userIP, setUserIP] = useState("local_fallback_ip");

//   const [formData, setFormData] = useState({
//     tone: "Neutral",
//     category: "",
//     subcategory: "",
//     country: "",
//     state: "",
//     city: "",
//     topic: "",
//     locationType: "global",
//   });

//   // 1. Helper: Time format karne ke liye (Milliseconds -> HHh MMm SSs)
//   const formatTime = (ms) => {
//     if (ms <= 0) return "00h 00m 00s";
//     const h = Math.floor(ms / 3600000);
//     const m = Math.floor((ms % 3600000) / 60000);
//     const s = Math.floor((ms % 60000) / 1000);
//     return `${h}h ${m}m ${s}s`;
//   };

//   // Fetch IP & Countries on Mount
//   useEffect(() => {
//     async function initData() {
//       try {
//         const res = await fetch("https://api.ipify.org?format=json");
//         const data = await res.json();
//         setUserIP(data.ip || "local_fallback_ip");
//       } catch {
//         setUserIP("local_fallback_ip");
//       }
//       setCountries(Country.getAllCountries());
//     }
//     initData();
//   }, []);

//   useEffect(() => {
//     if (userIP) checkUsageLimit(userIP);
//   }, [userIP]);

//   // Dependent Select Logic: State/City
//   useEffect(() => {
//     if (formData.country) {
//       const c = Country.getAllCountries().find(
//         (x) => x.name === formData.country,
//       );
//       setStates(c ? State.getStatesOfCountry(c.isoCode) : []);
//     }
//   }, [formData.country]);

//   useEffect(() => {
//     if (formData.state && formData.country) {
//       const c = Country.getAllCountries().find(
//         (x) => x.name === formData.country,
//       );
//       const s = states.find((x) => x.name === formData.state);
//       setCities(c && s ? City.getCitiesOfState(c.isoCode, s.isoCode) : []);
//     }
//   }, [formData.state, states]);

//   // 2. Logic: Real-time Countdown Timer
//   useEffect(() => {
//     let interval;

//     // Agar limit reach ho gayi hai aur reset time set hai
//     if (nextResetTime) {
//       // Turant ek baar update karo taki delay na lage
//       const updateTimer = () => {
//         const now = Date.now();
//         const diff = nextResetTime - now;

//         if (diff <= 0) {
//           // Time poora ho gaya, limit reset karo
//           checkUsageLimit(userIP);
//           setNextResetTime(null);
//           setCountdown("");
//           clearInterval(interval);
//         } else {
//           setCountdown(formatTime(diff));
//         }
//       };

//       updateTimer(); // Initial call
//       interval = setInterval(updateTimer, 1000); // Har second update
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [nextResetTime, userIP]);

//   const checkUsageLimit = (ip) => {
//     const raw = localStorage.getItem(IP_LOGS_KEY);
//     const logs = raw ? JSON.parse(raw) : {};
//     const timestamps = logs[ip] || [];
//     const now = Date.now();

//     // Sirf pichle 24 ghante ke logs rakho
//     const validTimestamps = timestamps.filter((t) => now - t < MS_24H);

//     setUsageCount(validTimestamps.length);

//     // Agar limit reach ho gayi hai, to sabse purane timestamp + 24H calculate karo
//     if (validTimestamps.length >= LIMIT) {
//       // validTimestamps[0] sabse purana entry hai
//       setNextResetTime(validTimestamps[0] + MS_24H);
//     } else {
//       setNextResetTime(null);
//     }
//   };

//   const recordUsage = (ip) => {
//     const raw = localStorage.getItem(IP_LOGS_KEY);
//     const logs = raw ? JSON.parse(raw) : {};
//     if (!logs[ip]) logs[ip] = [];
//     logs[ip].push(Date.now());
//     localStorage.setItem(IP_LOGS_KEY, JSON.stringify(logs));
//     checkUsageLimit(ip);
//   };

//   const handleChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleCategoryChange = (selectedOption) => {
//     setFormData((prev) => ({
//       ...prev,
//       category: selectedOption?.value || "",
//       subcategory: "",
//     }));
//   };

//   const handleGenerate = async () => {
//     setLoading(true);
//     const prompt = `Generate a short, factual, and realistic news article from ${formData.locationType === "global" ? "Global" : `${formData.city}, ${formData.state}, ${formData.country}`}, related to ${formData.category} > ${formData.subcategory} (Topic: ${formData.topic}), in a ${formData.tone} tone.
// **Rules:**
// 1. Summarize verified and up-to-date sources.
// 2. The article must reflect real developments from today or at most one day old.
// 3. If no recent news exists, write a realistic fact-based update on the topic.
// 4. Keep the tone consistent with: ${formData.tone}.
// 5. Include a relevant Unsplash image.

// **Output Format:**
// Return valid JSON only:
// {
//   "title": "5–12 word headline",
//   "description": "Exactly 59 words summary",
//   "image": ""
// }`;

//     const result = await generateContent(prompt);
//     const image = await generateNewsImage({
//       title: result.title,
//       description: result.description,
//     });
//     setGeneratedShort({ ...result, image: image });
//     if (result !== "Error generating content.")
//       toast.success("Short generated!");

//     // Generate hone ke baad record usage call karo (yahan logic fix kiya hai)
//     recordUsage(userIP);

//     setLoading(false);
//   };

//   const onGenerateClick = () => {
//     if (!formData.tone || !formData.category || !formData.subcategory) {
//       toast.error("Please select Tone, Category and Subcategory.");
//       return;
//     }
//     // Check limit before triggering API
//     if (usageCount >= LIMIT) {
//       toast.error("Daily limit reached.");
//       return;
//     }

//     // Pass handleGenerate directly, recordUsage ko andar shift kiya hai (upar dekho)
//     handleGenerateClick(handleGenerate, setLoading);
//   };

//   const selectStyles = {
//     control: (base) => ({
//       ...base,
//       borderRadius: "0.375rem",
//       borderColor: "#D1D5DB",
//       padding: "1px",
//       fontSize: "14px",
//     }),
//   };

//   return (
//     <div className="flex flex-col gap-4 w-full px-4 sm:px-6 md:px-8">
//       {/* Topic */}
//       <div className="w-full">
//         <label className="block text-gray-900 text-sm font-medium mb-1">
//           Topic (optional)
//         </label>
//         <input
//           type="text"
//           value={formData.topic}
//           onChange={(e) => handleChange("topic", e.target.value)}
//           placeholder="Enter topic or suggestions..."
//           className="md:w-full w-11/12 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//         />
//       </div>

//       {/* Tone */}
//       <SelectInput
//         label="AI Tone / Writing Style"
//         value={formData.tone}
//         onChange={(e) => handleChange("tone", e.target.value)}
//         options={toneOptions.map((t) => t.name)}
//         required
//       />

//       {/* CATEGORY */}
//       <div className="w-full">
//         <label className="block text-gray-900 text-sm font-medium mb-1">
//           Category (Searchable)
//         </label>
//         <Select
//           className="md:w-full w-11/12"
//           options={Object.keys(categoriesData).map((cat) => ({
//             value: cat,
//             label: cat,
//           }))}
//           onChange={handleCategoryChange}
//           placeholder="Search & Select Category..."
//           styles={selectStyles}
//         />
//       </div>

//       {/* SUBCATEGORY */}
//       <div className="w-full">
//         <label className="block text-gray-900 text-sm font-medium mb-1">
//           Subcategory (Searchable)
//         </label>
//         <Select
//           className="md:w-full w-11/12"
//           options={
//             formData.category
//               ? categoriesData[formData.category].map((sub) => ({
//                   value: sub,
//                   label: sub,
//                 }))
//               : []
//           }
//           value={
//             formData.subcategory
//               ? { value: formData.subcategory, label: formData.subcategory }
//               : null
//           }
//           onChange={(sel) => handleChange("subcategory", sel?.value || "")}
//           placeholder={
//             formData.category
//               ? "Search & Select Subcategory..."
//               : "Select Category First"
//           }
//           isDisabled={!formData.category}
//           styles={selectStyles}
//         />
//       </div>

//       {/* Location */}
//       <div>
//         <label className="block font-medium mb-1 text-sm">
//           Optional Location
//         </label>
//         <div className="flex gap-6 mb-3">
//           {["global", "country"].map((type) => (
//             <label
//               key={type}
//               className="flex items-center gap-2 cursor-pointer capitalize text-sm"
//             >
//               <input
//                 type="radio"
//                 checked={formData.locationType === type}
//                 onChange={() => handleChange("locationType", type)}
//                 className="accent-[#16274E]"
//               />{" "}
//               {type}
//             </label>
//           ))}
//         </div>

//         {formData.locationType === "country" && (
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:w-full w-11/12">
//             <Select
//               styles={selectStyles}
//               options={countries.map((c) => ({ value: c.name, label: c.name }))}
//               onChange={(sel) => handleChange("country", sel?.value || "")}
//               placeholder="Country"
//             />
//             <Select
//               styles={selectStyles}
//               options={states.map((s) => ({ value: s.name, label: s.name }))}
//               onChange={(sel) => handleChange("state", sel?.value || "")}
//               placeholder="State"
//               isDisabled={!formData.country}
//             />
//             <Select
//               styles={selectStyles}
//               options={cities.map((c) => ({ value: c.name, label: c.name }))}
//               onChange={(sel) => handleChange("city", sel?.value || "")}
//               placeholder="City"
//               isDisabled={!formData.state}
//             />
//           </div>
//         )}
//       </div>

//       {/* Generate Button */}
//       <button
//         onClick={onGenerateClick}
//         disabled={loading || usageCount >= LIMIT}
//         className={`md:w-full w-11/12 mt-3 py-3 text-white font-bold rounded-md transition ${
//           loading || usageCount >= LIMIT
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-[#16274E] hover:bg-blue-900"
//         }`}
//       >
//         {loading ? "Generating..." : "Generate Short"}
//       </button>

//       {/* Usage Info */}
//       <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2 text-center text-xs font-medium">
//         {usageCount < LIMIT ? (
//           <p className="text-gray-600">
//             You have{" "}
//             <span className="font-semibold text-blue-600">
//               {LIMIT - usageCount}
//             </span>{" "}
//             generations remaining
//           </p>
//         ) : (
//           <p className="flex items-center justify-center gap-1 text-red-500">
//             ⛔ Limit reached
//             <span className="text-gray-500">· Resets in {countdown}</span>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default memo(FormSection);

// import React, { useEffect, useState, memo } from "react";
// import Select from "react-select";
// import { Country, State, City } from "country-state-city";
// import handleGenerateClick from "../utils/eligible";
// import { toast } from "react-toastify";
// import useOpenAI from "../utils/useOpenAI";
// import SelectInput from "../components/SelectInput";
// import { categoriesData, toneOptions } from "../data/data";

// // const IP_CACHE_KEY = "cached_user_ip";
// const IP_LOGS_KEY = "user_ip_logs";
// // const LIMIT = 3; // LIMIT KI ZAROORAT NAHI AB
// const MS_24H = 24 * 60 * 60 * 1000;

// function FormSection({ setGeneratedShort, loading, setLoading }) {
//   const { generateContent, generateNewsImage } = useOpenAI();

//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   // Ye sab state rehne do taaki code crash na ho, par use nahi karenge limit rokne ke liye
//   const [usageCount, setUsageCount] = useState(0);
//   const [nextResetTime, setNextResetTime] = useState(null);
//   const [countdown, setCountdown] = useState("");

//   const [userIP, setUserIP] = useState("local_fallback_ip");

//   const [formData, setFormData] = useState({
//     tone: "Neutral",
//     category: "",
//     subcategory: "",
//     country: "",
//     state: "",
//     city: "",
//     topic: "",
//     locationType: "global",
//   });

//   // Fetch IP & Countries on Mount
//   useEffect(() => {
//     async function initData() {
//       try {
//         const res = await fetch("https://api.ipify.org?format=json");
//         const data = await res.json();
//         setUserIP(data.ip || "local_fallback_ip");
//       } catch {
//         setUserIP("local_fallback_ip");
//       }
//       setCountries(Country.getAllCountries());
//     }
//     initData();
//   }, []);

//   // Dependent Select Logic: State/City
//   useEffect(() => {
//     if (formData.country) {
//       const c = Country.getAllCountries().find(
//         (x) => x.name === formData.country,
//       );
//       setStates(c ? State.getStatesOfCountry(c.isoCode) : []);
//     }
//   }, [formData.country]);

//   useEffect(() => {
//     if (formData.state && formData.country) {
//       const c = Country.getAllCountries().find(
//         (x) => x.name === formData.country,
//       );
//       const s = states.find((x) => x.name === formData.state);
//       setCities(c && s ? City.getCitiesOfState(c.isoCode, s.isoCode) : []);
//     }
//   }, [formData.state, states]);

//   // *** LOGIC FOR RECORDING (OPTIONAL - Just for analytics, wont stop user) ***
//   // const recordUsage = (ip) => {
//   //   const raw = localStorage.getItem(IP_LOGS_KEY);
//   //   const logs = raw ? JSON.parse(raw) : {};
//   //   if (!logs[ip]) logs[ip] = [];
//   //   logs[ip].push(Date.now());
//   //   localStorage.setItem(IP_LOGS_KEY, JSON.stringify(logs));
//   //   // checkUsageLimit(ip); // Iski ab zaroorat nahi
//   // };

//   const handleChange = (key, value) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleCategoryChange = (selectedOption) => {
//     setFormData((prev) => ({
//       ...prev,
//       category: selectedOption?.value || "",
//       subcategory: "",
//     }));
//   };

//   const handleGenerate = async () => {
//     setLoading(true);

//     const prompt = `Generate a short, factual, and realistic news article from ${formData.locationType === "global" ? "Global" : `${formData.city}, ${formData.state}, ${formData.country}`}, related to ${formData.category} > ${formData.subcategory} (Topic: ${formData.topic}), in a ${formData.tone} tone.

// **Rules:**
// 1. The entire article (Title and Description) MUST be in Hindi (हिंदी).
// 2. Summarize verified and up-to-date sources.
// 3. The article must reflect real developments from today or at most one day old.
// 4. If no recent news exists, write a realistic fact-based update on the topic.
// 5. Keep the tone consistent with: ${formData.tone}.
// 6. Include a relevant Unsplash image URL in the "image" field.

// **Output Format:**
// Return valid JSON only (Ensure content is in Hindi):
// {
//   "title": "5–12 words headline in Hindi",
//   "description": "Exactly 59 words summary in Hindi",
//   "image": ""
// }`;

//     try {
//       // Step 1: पहले सिर्फ टेक्स्ट जनरेट करें
//       const result = await generateContent(prompt);

//       if (result && result.title) {
//         // Step 2: जैसे ही टेक्स्ट आए, उसे तुरंत UI में भेज दें (इमेज अभी खाली रहेगी)
//         setGeneratedShort({ ...result, image: null });

//         // Loading state को false कर दें ताकि UI दिखने लगे (या बटन इनेबल हो जाए)
//         setLoading(false);
//         toast.success("Content generated! Loading image...");

//         // Step 3: अब बैकग्राउंड में इमेज जनरेट करना शुरू करें
//         const imageResponse = await generateNewsImage({
//           title: result.title,
//           description: result.description,
//         });

//         // Step 4: इमेज आने के बाद दोबारा स्टेट अपडेट करें
//         // इसमें हम पुराना टेक्स्ट रखते हैं और सिर्फ इमेज अपडेट करते हैं
//         setGeneratedShort((prev) => ({
//           ...prev,
//           image: imageResponse,
//         }));
//       } else {
//         setLoading(false);
//         toast.error("Failed to generate news content.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setLoading(false);
//       toast.error("Something went wrong!");
//     } finally {
//       setFormData({
//         tone: "",
//         category: "",
//         subcategory: "",
//         country: "",
//         state: "",
//         city: "",
//         topic: "",
//         locationType: "",
//       });
//     }
//   };

//   const onGenerateClick = () => {
//     if (!formData.tone || !formData.category || !formData.subcategory) {
//       toast.error("Please select Tone, Category and Subcategory.");
//       return;
//     }

//     // *** UNLIMITED MOD: LIMIT CHECK REMOVED ***
//     /* if (usageCount >= LIMIT) {
//       toast.error("Daily limit reached.");
//       return;
//     }
//     */
//     handleGenerate();
//     // handleGenerateClick(handleGenerate, setLoading);
//   };

//   const selectStyles = {
//     control: (base) => ({
//       ...base,
//       borderRadius: "0.375rem",
//       borderColor: "#D1D5DB",
//       padding: "1px",
//       fontSize: "14px",
//     }),
//   };

//   return (
//     <div className="flex flex-col gap-4 w-full px-4 sm:px-6 md:px-8">
//       {/* Topic */}
//       <div className="w-full">
//         <label className="block text-gray-900 text-sm font-medium mb-1">
//           Topic (optional)
//         </label>
//         <input
//           type="text"
//           value={formData.topic}
//           onChange={(e) => handleChange("topic", e.target.value)}
//           placeholder="Enter topic or suggestions..."
//           className="md:w-full w-11/12 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//         />
//       </div>

//       {/* Tone */}
//       <SelectInput
//         label="AI Tone / Writing Style"
//         value={formData.tone}
//         onChange={(e) => handleChange("tone", e.target.value)}
//         options={toneOptions.map((t) => t.name)}
//         required
//       />

//       {/* CATEGORY */}
//       <div className="w-full">
//         <label className="block text-gray-900 text-sm font-medium mb-1">
//           Category
//         </label>
//         <Select
//           className="md:w-full w-11/12"
//           options={Object.keys(categoriesData).map((cat) => ({
//             value: cat,
//             label: cat,
//           }))}
//           onChange={handleCategoryChange}
//           placeholder="Search & Select Category..."
//           styles={selectStyles}
//         />
//       </div>

//       {/* SUBCATEGORY */}
//       <div className="w-full">
//         <label className="block text-gray-900 text-sm font-medium mb-1">
//           Subcategory
//         </label>
//         <Select
//           className="md:w-full w-11/12"
//           options={
//             formData.category
//               ? categoriesData[formData.category].map((sub) => ({
//                   value: sub,
//                   label: sub,
//                 }))
//               : []
//           }
//           value={
//             formData.subcategory
//               ? { value: formData.subcategory, label: formData.subcategory }
//               : null
//           }
//           onChange={(sel) => handleChange("subcategory", sel?.value || "")}
//           placeholder={
//             formData.category
//               ? "Search & Select Subcategory..."
//               : "Select Category First"
//           }
//           isDisabled={!formData.category}
//           styles={selectStyles}
//         />
//       </div>

//       {/* Location */}
//       <div>
//         <label className="block font-medium mb-1 text-sm">
//           Optional Location
//         </label>
//         <div className="flex gap-6 mb-3">
//           {["global", "country"].map((type) => (
//             <label
//               key={type}
//               className="flex items-center gap-2 cursor-pointer capitalize text-sm"
//             >
//               <input
//                 type="radio"
//                 checked={formData.locationType === type}
//                 onChange={() => handleChange("locationType", type)}
//                 className="accent-[#16274E]"
//               />{" "}
//               {type}
//             </label>
//           ))}
//         </div>

//         {formData.locationType === "country" && (
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:w-full w-11/12">
//             <Select
//               styles={selectStyles}
//               options={countries.map((c) => ({ value: c.name, label: c.name }))}
//               onChange={(sel) => handleChange("country", sel?.value || "")}
//               placeholder="Country"
//             />
//             <Select
//               styles={selectStyles}
//               options={states.map((s) => ({ value: s.name, label: s.name }))}
//               onChange={(sel) => handleChange("state", sel?.value || "")}
//               placeholder="State"
//               isDisabled={!formData.country}
//             />
//             <Select
//               styles={selectStyles}
//               options={cities.map((c) => ({ value: c.name, label: c.name }))}
//               onChange={(sel) => handleChange("city", sel?.value || "")}
//               placeholder="City"
//               isDisabled={!formData.state}
//             />
//           </div>
//         )}
//       </div>

//       {/* Generate Button - UNLIMITED, Disabled logic removed for limit */}
//       <button
//         onClick={onGenerateClick}
//         disabled={loading} // removed: || usageCount >= LIMIT
//         className={`md:w-full w-11/12 mt-3 py-3 text-white font-bold rounded-md transition ${
//           loading
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-[#16274E] hover:bg-blue-900"
//         }`}
//       >
//         {loading ? "Generating..." : "Generate Short (Unlimited)"}
//       </button>

//       {/* Usage Info - Display changed */}
//       <div className="mt-2 rounded-lg bg-green-50 px-3 py-2 text-center text-xs font-medium">
//         <p className="flex items-center justify-center gap-1 text-green-700">
//           ✅ Unlimited Mode Active
//         </p>
//       </div>
//     </div>
//   );
// }

// export default memo(FormSection);

import React, { useEffect, useState, memo } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import handleGenerateClick, {
  getNextResetTime,
  getUsageCount,
} from "../utils/eligible"; // Utility import
import { toast } from "react-toastify";
import useOpenAI from "../utils/useOpenAI";
import SelectInput from "../components/SelectInput";
import { categoriesData, toneOptions } from "../data/data";

function FormSection({ setGeneratedShort, loading, setLoading }) {
  const { generateContent, generateNewsImage } = useOpenAI();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [count, setCount] = useState(0);

  // ... Component के अंदर

  const [resetTime, setResetTime] = useState(null);
  const [countdown, setCountdown] = useState("");

  const updateUsageInfo = async () => {
    const currentUsage = await getUsageCount();
    setCount(currentUsage);

    if (currentUsage >= 3) {
      const nextTime = await getNextResetTime();
      setResetTime(nextTime);
    } else {
      setResetTime(null);
    }
  };

  // शुरुआती लोड पर चेक करें
  useEffect(() => {
    updateUsageInfo();
  }, []);

  // लाइव टाइमर के लिए Effect
  useEffect(() => {
    let interval;
    if (resetTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const distance = resetTime - now;

        if (distance <= 0) {
          clearInterval(interval);
          updateUsageInfo(); // लिमिट रीसेट होने पर रिफ्रेश करें
        } else {
          const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
          const m = Math.floor((distance / (1000 * 60)) % 60);
          const s = Math.floor((distance / 1000) % 60);
          setCountdown(`${h}h ${m}m ${s}s`);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resetTime]);
  const [formData, setFormData] = useState({
    tone: "Neutral",
    category: "",
    subcategory: "",
    country: "",
    state: "",
    city: "",
    topic: "",
    locationType: "global",
  });
  useEffect(() => {
    const fetchCount = async () => {
      const currentUsage = await getUsageCount();
      setCount(currentUsage);
    };
    fetchCount();
  }, []);
  // Fetch Countries on Mount
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Dependent Select Logic: State/City
  useEffect(() => {
    if (formData.country) {
      const c = Country.getAllCountries().find(
        (x) => x.name === formData.country,
      );
      setStates(c ? State.getStatesOfCountry(c.isoCode) : []);
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state && formData.country) {
      const c = Country.getAllCountries().find(
        (x) => x.name === formData.country,
      );
      const s = states.find((x) => x.name === formData.state);
      setCities(c && s ? City.getCitiesOfState(c.isoCode, s.isoCode) : []);
    }
  }, [formData.state, states]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      category: selectedOption?.value || "",
      subcategory: "",
    }));
  };

  // Actual Generation Logic
  const handleGenerate = async () => {
    const prompt = `Generate a short, factual, and realistic news article from ${
      formData.locationType === "global"
        ? "Global"
        : `${formData.city}, ${formData.state}, ${formData.country}`
    }, related to ${formData.category} > ${formData.subcategory} (Topic: ${formData.topic}), in a ${formData.tone} tone.

**Rules:**
1. The entire article (Title and Description) MUST be in Hindi (हिंदी).
2. Summarize verified and up-to-date sources.
3. The article must reflect real developments from today or at most one day old.
4. If no recent news exists, write a realistic fact-based update on the topic.
5. Keep the tone consistent with: ${formData.tone}.
6. Include a relevant Unsplash image URL in the "image" field.

**Output Format:**
Return valid JSON only (Ensure content is in Hindi):
{
  "title": "5–12 words headline in Hindi",
  "description": "Exactly 59 words summary in Hindi",
  "image": ""
}`;

    try {
      const result = await generateContent(prompt);

      if (result && result.title) {
        setGeneratedShort({ ...result, image: null });
        setLoading(false); // Image loading starts, but content is ready
        toast.success("Content generated! Loading image...");

        const imageResponse = await generateNewsImage({
          title: result.title,
          description: result.description,
        });

        setGeneratedShort((prev) => ({ ...prev, image: imageResponse }));
      } else {
        toast.error("Failed to generate news content.");
      }
    } catch (error) {
      // console.error("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      setFormData({
        tone: "Neutral",
        category: "",
        subcategory: "",
        country: "",
        state: "",
        city: "",
        topic: "",
        locationType: "global",
      });
    }
  };

  const onGenerateClick = () => {
    if (!formData.category || !formData.subcategory) {
      toast.error("Please select Category and Subcategory.");
      return;
    }

    // Yaha connect kiya hai: Utility handle karega check aur actual function call
    handleGenerateClick(handleGenerate, setLoading);
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "0.375rem",
      borderColor: "#D1D5DB",
      padding: "1px",
      fontSize: "14px",
    }),
  };

  return (
    <div className="flex flex-col gap-4 w-full px-4 sm:px-6 md:px-8">
      {/* Form Fields */}
      <div className="w-full">
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Topic (optional)
        </label>
        <input
          type="text"
          value={formData.topic}
          onChange={(e) => handleChange("topic", e.target.value)}
          placeholder="Enter topic..."
          className="md:w-full w-11/12 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <SelectInput
        label="AI Tone / Writing Style"
        value={formData.tone}
        onChange={(e) => handleChange("tone", e.target.value)}
        options={toneOptions.map((t) => t.name)}
      />

      {/* Category & Subcategory Selectors (Kept your logic) */}
      <div className="w-full">
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Category
        </label>
        <Select
          className="md:w-full w-11/12"
          options={Object.keys(categoriesData).map((cat) => ({
            value: cat,
            label: cat,
          }))}
          onChange={handleCategoryChange}
          styles={selectStyles}
        />
      </div>

      <div className="w-full">
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Subcategory
        </label>
        <Select
          className="md:w-full w-11/12"
          options={
            formData.category
              ? categoriesData[formData.category].map((sub) => ({
                  value: sub,
                  label: sub,
                }))
              : []
          }
          value={
            formData.subcategory
              ? { value: formData.subcategory, label: formData.subcategory }
              : null
          }
          onChange={(sel) => handleChange("subcategory", sel?.value || "")}
          isDisabled={!formData.category}
          styles={selectStyles}
        />
      </div>

      {/* Location Radio and Dropdowns */}
      <div>
        <label className="block font-medium mb-1 text-sm">
          Optional Location
        </label>
        <div className="flex gap-6 mb-3">
          {["global", "country"].map((type) => (
            <label
              key={type}
              className="flex items-center gap-2 cursor-pointer capitalize text-sm"
            >
              <input
                type="radio"
                checked={formData.locationType === type}
                onChange={() => handleChange("locationType", type)}
                className="accent-[#16274E]"
              />{" "}
              {type}
            </label>
          ))}
        </div>
        {formData.locationType === "country" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:w-full w-11/12">
            <Select
              styles={selectStyles}
              options={countries.map((c) => ({ value: c.name, label: c.name }))}
              onChange={(sel) => handleChange("country", sel?.value || "")}
              placeholder="Country"
            />
            <Select
              styles={selectStyles}
              options={states.map((s) => ({ value: s.name, label: s.name }))}
              onChange={(sel) => handleChange("state", sel?.value || "")}
              placeholder="State"
              isDisabled={!formData.country}
            />
            <Select
              styles={selectStyles}
              options={cities.map((c) => ({ value: c.name, label: c.name }))}
              onChange={(sel) => handleChange("city", sel?.value || "")}
              placeholder="City"
              isDisabled={!formData.state}
            />
          </div>
        )}
      </div>

      <button
        onClick={onGenerateClick}
        disabled={loading}
        className={`md:w-full w-11/12 mt-3 py-3 text-white font-bold rounded-md transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#16274E] hover:bg-blue-900"
        }`}
      >
        {loading ? "Generating..." : "Generate Short"}
      </button>

      {/* Usage UI Section */}
      <div className="mt-4 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {count < 3 ? (
          <div className="flex items-center justify-between px-4 py-3 bg-blue-50/50">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              <p className="text-sm font-semibold text-blue-900">
                Credits Available
              </p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 w-6 rounded-full ${i <= 3 - count ? "bg-blue-500" : "bg-gray-200"}`}
                />
              ))}
            </div>
            <p className="text-xs font-bold text-blue-700">{3 - count} Left</p>
          </div>
        ) : (
          <div className="bg-orange-50 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-orange-500">⏳</span>
                <p className="text-sm font-bold text-orange-900">
                  Daily Limit Reached
                </p>
              </div>
              <div className="rounded-md bg-orange-100 px-2 py-1">
                <p className="font-mono text-xs font-bold text-orange-700">
                  {countdown}
                </p>
              </div>
            </div>
            <p className="mt-1 text-[10px] text-orange-600">
              Next credit will be added automatically in {countdown}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(FormSection);
