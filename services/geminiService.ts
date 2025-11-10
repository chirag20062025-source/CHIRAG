
import { GoogleGenAI } from "@google/genai";

const getMotivationalQuote = async (): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate a short, powerful motivational quote for a student who is feeling overwhelmed or stressed. The quote should be inspiring and encourage perseverance. Keep it to one or two sentences.",
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching motivational quote:", error);
    return "The journey of a thousand miles begins with a single step. Keep going!";
  }
};

export { getMotivationalQuote };
