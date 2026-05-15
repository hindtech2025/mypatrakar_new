import { useState } from "react";
import FormSection from "./FormSection";
import PreviewSection from "../components/PreviewSection";
import HowItWorks from "./HowItWorks";

import "react-toastify/dist/ReactToastify.css";


export default function ShortGenerator() {
  const [formData, setFormData] = useState({
    tone: "",
    category: "",
    country: "",
    state: "",
    city: "",
    topic: "",
  });
  // const { generateContent } = useOpenAI();
  const [generatedShort, setGeneratedShort] = useState({
    image: "",
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

//   const handleGenerate = useCallback(async () => {
//     setLoading(true);

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
//   }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 mt-20">
      <h1
        className="text-[47.6px] leading-[] md:text-4xl font-extrabold text-center text-[#FF0000] font-sans"
        style={{
          fontWeight: 800,
        }}
      >
        Create AI Shorts in Seconds
      </h1>
      <p className="text-[#16274E] text-center mt-2 max-w-xl text-[17px] font-sans">
        Select AI tone and category, optionally add location, and generate your
        AI Short instantly.
      </p>

      <div className="bg-white rounded-xl shadow-md mt-10 md:p-6 p-3 w-full max-w-6xl border-2 py-10 grid lg:grid-cols-2 gap-6 text-[#1E293B]">
        <FormSection
          formData={formData}
          setFormData={setFormData}
          setGeneratedShort={setGeneratedShort}
          // handleGenerate={handleGenerate}
          setLoading={setLoading}
          loading={loading}
        />
        <PreviewSection generatedShort={generatedShort} loading={loading} />
      </div>

      <HowItWorks />
    </div>
  );
}
