import OpenAI from "openai";
import { NextResponse } from "next/server";
import { generateAnamnese } from "@/src/app/util/Anamnese";


export const runtime = 'edge';
//export const runtime = 'nodejs';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});



export async function POST(req: Request) {
  const { message: responses } = await req.json();
  if (!responses) {
    return NextResponse.json({ error: "Mensagem não fornecida." }, { status: 400 });
  }
  const promptMessage = `${generateAnamnese(responses)} `;
   try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: promptMessage }],
      temperature: 0.2,
    });
    const content = completion.choices[0]?.message?.content || "Sem resposta.";
    return NextResponse.json({ response: content });
  } catch (error: any) {
    return NextResponse.json({ error: "Erro ao gerar resposta do modelo." }, { status: 500 });
  }  
}


