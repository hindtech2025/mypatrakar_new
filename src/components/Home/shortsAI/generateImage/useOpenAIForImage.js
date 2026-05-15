import OpenAI from "openai";

export default function useOpenAI() {
  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
 const generateNewsImage = async (prompt) => {
    try {
      const imagePrompt = `
A realistic professional news photograph related to: ${prompt.title}.
Description is : ${prompt.description}.
Style: journalism photography, real people, natural lighting, high resolution, no text, no watermark.
      `;

      // 3️⃣ Generate AI Image
      const imageRes = await client.images.generate({
        model: "gpt-image-1",
        prompt: imagePrompt,
        size: "1024x1024",
      });

      const base64 = imageRes.data[0].b64_json;
      const imageUrl = `data:image/png;base64,${base64}`;

      // 4️⃣ Final Result
      return {
        image: imageUrl,
      };
    } catch (err) {
      // console.error("AI Error:", err);
      return { error: "Generation failed" };
    }
  };

  return { generateNewsImage };
}
