import { NextResponse } from 'next/server';
import { chat } from '@/lib/gemini/config';

export async function POST(req: Request) {
  try{
    const body = await req.json();
    const formData = body.formData;
    
    const result = await chat.sendMessage(formData);

    console.log(chat._history);

    return NextResponse.json({message: result.response.text()}, { status: 200 });
  } catch (error) {
    return NextResponse.json({error: error}, { status: 400 });
  }
}