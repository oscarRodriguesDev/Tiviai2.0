import OpenAI from "openai";
import { NextResponse } from "next/server";
import { resumeBook } from "@/src/app/util/resumebook";

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


export async function POST(req: Request) {
 const { titulo, autor } = await req.json();


  if (!titulo || !autor) {
    return NextResponse.json({ error: "Título e autor são obrigatórios." }, { status: 400 });
  }

  const prompt = resumeBook(titulo, autor);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const content = completion.choices[0]?.message?.content || "Sem resposta.";
  
   
    return NextResponse.json({ result: content });

  } catch (error: any) {
    return NextResponse.json({ error: "Erro ao gerar resposta do modelo." }, { status: 500 });
  } 
}
