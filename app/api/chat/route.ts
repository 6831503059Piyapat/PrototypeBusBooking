import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  
  // ดึง API Key จาก Environment Variable
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}