import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt, busData } = await req.json();
  
  // ดึง API Key จาก Environment Variable
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    const combinedPrompt = `${prompt}\n\nBus Data:\n${JSON.stringify(busData, null, 2)}`;
    const result = await model.generateContent(combinedPrompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response from AI
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Invalid JSON response from AI" }, { status: 400 });
    }

    const parsedData = JSON.parse(jsonMatch[0]);
    return NextResponse.json([parsedData]);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json([{ error: "Failed to generate content" }], { status: 500 });
  }
}