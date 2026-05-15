// // src/hooks/useOpenAI.js
// import OpenAI from "openai";
// export default function useOpenAI() {
//   const client = new OpenAI({
//     apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//     dangerouslyAllowBrowser: true, // ⚠️ Allow client-side usage (for testing only)
//   });
//   const generateContent = async (prompt) => {
//     if (!prompt) return "Please provide a prompt!";
//     try {
//       const res = await client.chat.completions.create({
//         model: "gpt-4o-mini", // Fast and capable
//         messages: [
//           {
//             role: "system",
//             content: "You are a helpful assistant that generates clean, structured responses.",
//           },
//           { role: "user", content: prompt },
//         ],
//         temperature: 0.7,
//       });

//       return res.choices?.[0]?.message?.content || "No response from AI.";
//     } catch (err) {
//       console.log(err)
//       console.error("OpenAI Error:", err);
//       return "Error generating content.";
//     }
//   };
//   return { generateContent };
// }

// src/hooks/useOpenAI.js
import OpenAI from "openai";

export default function useOpenAI() {
  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // ⚠️ testing only
  });

  // 🔹 TEXT GENERATION
  const generateContent = async (prompt) => {
    if (!prompt) return { error: "Please provide a prompt!" };

    try {
      const res = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a helpful assistant.
Always respond in VALID JSON only.
No explanation.
No markdown.
          `,
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      });

      let content = res.choices?.[0]?.message?.content;

      // 🔹 Case 1: already object (rare but safe)
      if (typeof content === "object") {
        return content;
      }

      // 🔹 Case 2: string → try JSON.parse
      if (typeof content === "string") {
        try {
          return JSON.parse(content);
        } catch (e) {
          // 🔹 Case 3: invalid JSON → wrap into JSON
          return {
            text: content,
          };
        }
      }

      // 🔹 Fallback
      return { text: "No valid response from AI" };
    } catch (err) {
      // console.log(err);

      // console.error("OpenAI Error:", err);
      return { error: "Error generating news content." };
    }
  };

  // 🔹 IMAGE GENERATION (NEWS)
  const generateNewsImage = async ({ title, description }) => {
    try {
      const imagePrompt = `
A realistic professional news photograph related to: ${title}.
Description: ${description}.
Style: journalism photography, real people, natural lighting, high resolution.
No text, no watermark.
      `;

      const imageRes = await client.images.generate({
        model: "gpt-image-1",
        prompt: imagePrompt,
        size: "1024x1024",
      });

      const base64 = imageRes.data[0].b64_json;

      return {
        image: `data:image/png;base64,${base64}`,
      };
    } catch (err) {
      console.error("Image Generation Error:", err);
      console.log(err);
      return { error: "Generation failed" };
    }
  };

  // ✅ DONO FUNCTIONS EXPORT
  return {
    generateContent,
    generateNewsImage,
  };
}
