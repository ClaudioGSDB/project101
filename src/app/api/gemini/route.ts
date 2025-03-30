import { NextResponse } from 'next/server';
import { chat } from '@/lib/gemini/config';

export async function POST(req: Request) {
  try{
    const body = await req.json();
    
    const formData = JSON.stringify(body.formData);
    console.log(formData);
    
    const result = await chat.sendMessage(JSON.stringify(formData));

    console.log(result.response.text());

    return NextResponse.json(result.response.text(), { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({error: error}, { status: 400 });
  }
}