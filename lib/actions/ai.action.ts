"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAIAnswer(question: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      As an AI expert, provide a comprehensive answer to the following question. 
      Make sure to include relevant examples, explanations, and code snippets if necessary.
      Use markdown formatting for better readability.
      
      Question: ${question}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { response: text };
  } catch (error: any) {
    console.error("Error generating AI answer:", error);
    throw new Error(`Failed to generate AI answer: ${error.message}`);
  }
}
