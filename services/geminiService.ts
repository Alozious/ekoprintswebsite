import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

export const generatePrintAdvice = async (userPrompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are 'EkoBot', a friendly and expert printing consultant for 'Eko Prints'. 
        Eko Prints specializes in Design, Branding, Large Format Printing, DTF (Direct to Film), T-Shirt Customization, and Digital Printing.
        
        Your goal is to help customers choose the best printing method for their needs.
        - Recommend DTF for complex, colorful apparel designs.
        - Recommend Large Format for banners, signage, and posters.
        - Recommend Digital Printing for flyers, business cards, and brochures.
        - Keep answers concise, helpful, and professional. 
        - Always sound enthusiastic about bringing their ideas to life.
        - If asked about prices, say "Please use the contact form below for a custom quote tailored to your specific needs."
        `,
      }
    });

    return response.text || "I'm having a little trouble thinking of a design right now. Try asking again!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to get advice from EkoBot.");
  }
};

export const generateAIImage = async (prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned");
  } catch (error) {
    console.error("Image Generation Error:", error);
    // Fallback to a high-quality Unsplash image if generation fails
    return `https://images.unsplash.com/photo-1626785774573-4b7993143a2d?q=80&w=2070&auto=format&fit=crop`;
  }
};
