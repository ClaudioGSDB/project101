import { NextResponse } from 'next/server';
import { chat } from '@/lib/gemini/config';

export async function POST(req: Request) {
  try{
    const body = await req.json();
    
    const formData = JSON.stringify(body.formData);
    console.log(formData);
    
    const result = await chat.sendMessage(JSON.stringify(formData));

    console.log(result.response.text());

    console.log(chat._history);

    return NextResponse.json({message: JSON.parse(result.response.text())}, { status: 200 });
  } catch (error) {
    return NextResponse.json({error: error}, { status: 400 });
  }
}