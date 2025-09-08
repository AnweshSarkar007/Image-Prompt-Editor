import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import type { EditedImage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const editImageWithGemini = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<EditedImage> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let imageUrl: string | null = null;
    let text: string | null = null;

    if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          const imageMimeType: string = part.inlineData.mimeType;
          imageUrl = `data:${imageMimeType};base64,${base64ImageBytes}`;
        } else if (part.text) {
          text = part.text;
        }
      }
    }

    if (!imageUrl && !text) {
      const blockReason = response.promptFeedback?.blockReason;
      if (blockReason) {
        let reasonMessage = `Request blocked due to safety policies. Reason: ${blockReason}.`;
        const harmfulCategories = response.promptFeedback?.safetyRatings
          ?.filter(rating => rating.blocked)
          .map(rating => rating.category.replace('HARM_CATEGORY_', ''))
          .join(', ');

        if (harmfulCategories) {
            reasonMessage += ` Harmful categories detected: ${harmfulCategories}.`;
        }
        throw new Error(reasonMessage);
      }
      throw new Error("API returned an empty response. Please try a different prompt or image.");
    }

    return { imageUrl, text };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to edit image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while editing the image.");
  }
};