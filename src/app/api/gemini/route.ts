import { NextResponse } from 'next/server';
import { chat } from '@/lib/gemini/config';
import { jsonrepair } from 'jsonrepair';


export async function POST(req: Request) {
  try{
    const body = await req.json();
    
    const formData = JSON.stringify(body.formData);
    console.log(formData);
    
    const result = await chat.sendMessage(JSON.stringify(formData));

    const responseText = result.response.text();

    let validResponse;
    try {
      JSON.parse(responseText);
      validResponse = responseText;
      console.log("Response is valid JSON");
    } catch (jsonError) {
      console.log("Invalid JSON received, attempting to repair...");
      try {
        const repairedJson = jsonrepair(responseText);
        JSON.parse(repairedJson);
        validResponse = repairedJson;
        console.log("JSON successfully repaired");
      } catch (repairError) {
        console.error("Failed to repair JSON:", repairError);
        throw new Error("Unable to process response: Invalid JSON format");
      }
    }

    console.log(validResponse)

    return NextResponse.json(validResponse, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({error: error}, { status: 400 });
  }
}