const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing Gemini API Key");
}

const modelVersion = "gemini-1.5-flash";
const systemPrompt = "You are a helpful, creative, and concise assistant helping come up with team project ideas";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: modelVersion,
    systemInstruction: systemPrompt 
});

const chat = model.startChat({
    history: []
});

export {genAI, model, chat};