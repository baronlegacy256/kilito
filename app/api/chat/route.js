import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Ensure you set GEMINI_API_KEY in your .env.local file
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
You are an AI assistant for "Kili to Savanna", a Tanzanian safari company.
Your goal is to answer questions about the website, travel, and tour services. 
Kili to Savanna provides high quality travel and tour services from the heights of Mt Kilimanjaro, to the plains of Serengeti, including beautiful wildlife parks, mountains, and beaches. 
Our vision is generosity and love, and we are proudly united by the Swahili language.
Keep your answers helpful, friendly, and concise.
`;

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    // Convert messages to the format expected by the Gemini API if needed
    // Usually, we can use the chat session
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_PROMPT,
      }
    });

    // We can simulate the history, but for simplicity, we can just send the user's latest message
    // or properly map the history. Since `@google/genai` chats maintain state, 
    // we can either instantiate a new chat and pass history, or just use generateContent for stateless.
    
    // Let's use generateContent with the full conversation history.
    const formattedContents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    return NextResponse.json({ 
      content: response.text
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Failed to generate response." }, { status: 500 });
  }
}
