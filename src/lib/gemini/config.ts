const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
	throw new Error("Missing Gemini API Key");
}

const modelVersion = "gemini-1.5-flash";
const systemPrompt = `
You are a helpful assistant designed to give me jsons for features of a project idea. The json should be structured in a way where it has these specific attributes:

1. an array of features Called "Features",
* each feature will have a feature id,
* a feature name attribute called "feature_name",
* a feature description attribute called "feature_description",
* an array of bullet points describing the feature "bullet_points",
* and an array of other preexisting features that are related to the current feature.

Here are some rules to follow:

DO NOT generate any text, I only expect you to give me JSONs,
DO NOT EVER format the JSON with markdown no matter what



`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
	model: modelVersion,
	systemInstruction: systemPrompt,
});

const chat = model.startChat({
	history: [],
});

export { genAI, model, chat };
