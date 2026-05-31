import { GoogleGenerativeAI } from "@google/generative-ai";
import cloudinary from "./cloudinary";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export function uploadToCloudinary(
  fileBuffer: Buffer,
): Promise<{ secure_url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "resumeiq/resumes",
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload failed."));
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );
    uploadStream.end(fileBuffer);
  });
}

export async function callGemini(
  base64Data: string,
  prompt: string,
): Promise<any> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined in env variables.");
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const response = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          {
            inlineData: {
              data: base64Data,
              mimeType: "application/pdf",
            },
          },
        ],
      },
    ],
  });

  const text = response.response.text();
  const cleanText = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleanText);
}
