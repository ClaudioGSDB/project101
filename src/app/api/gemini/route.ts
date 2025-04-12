import { NextResponse } from "next/server";
import { generateFeature, generateStack, generateRoadmap } from "@/lib/gemini/config";
import { jsonrepair } from "jsonrepair";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const formData = JSON.stringify(body.formData);
		const generationType = body.generationType; // "Feature", "Stack", or "Roadmap"

		console.log(`Generating ${generationType}...`);

		let result;

		// Call different generation function based on type
		switch (generationType) {
			case "Feature":
				result = await generateFeature(formData);
				break;
			case "Stack":
				const featureContext = body.featureContext;
				result = await generateStack(formData, featureContext);
				break;
			case "Roadmap":
				const featureForRoadmap = body.featureContext;
				const stackContext = body.stackContext;
				result = await generateRoadmap(formData, featureForRoadmap, stackContext);
				break;
			default:
				throw new Error("Invalid generation type specified");
		}

		const responseText = result.response.text();

		let validResponse;
		try {
			JSON.parse(responseText);
			validResponse = responseText;
			console.log(`Valid ${generationType} JSON received`);
		} catch (jsonError) {
			console.log(
				`Invalid ${generationType} JSON received, attempting to repair...`
			);
			try {
				const repairedJson = jsonrepair(responseText);
				JSON.parse(repairedJson);
				validResponse = repairedJson;
				console.log(`${generationType} JSON successfully repaired`);
			} catch (repairError) {
				console.error(`Failed to repair ${generationType} JSON:`, repairError);
				throw new Error("Unable to process response: Invalid JSON format");
			}
		}

		return NextResponse.json({ message: JSON.parse(validResponse) }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: String(error) }, { status: 400 });
	}
}
