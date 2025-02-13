import { NextResponse } from 'next/server';
import { chat } from '@/lib/gemini/config';

export async function POST(req: Request) {
  try{
    const body = await req.json();
    const prompt = body.prompt;
    
    const result = await chat.sendMessage(prompt);

    console.log(chat._history);

    return NextResponse.json({response: result.response.text()}, { status: 200 });
  } catch (error) {
    return NextResponse.json({error: error}, { status: 400 });
  }
}