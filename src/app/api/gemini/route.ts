// src/app/api/gemini/route.ts - Updated version
import { NextResponse } from "next/server";
import {
	generateFeature,
	generateStack,
	generateRoadmap,
	processProjectUpdate,
} from "@/lib/gemini/config";
import { jsonrepair } from "jsonrepair";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const generationType = body.generationType;

		// Handle the different generation types
		if (
			generationType === "Feature" ||
			generationType === "Stack" ||
			generationType === "Roadmap"
		) {
			// Use existing functionality for initial generation
			const formData = JSON.stringify(body.formData);

			let result;
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
					result = await generateRoadmap(
						formData,
						featureForRoadmap,
						stackContext
					);
					break;
				default:
					throw new Error("Invalid generation type specified");
			}

			const responseText = result.response.text();
			let validResponse;

			try {
				JSON.parse(responseText);
				validResponse = responseText;
			} catch (jsonError) {
				try {
					const repairedJson = jsonrepair(responseText);
					JSON.parse(repairedJson);
					validResponse = repairedJson;
				} catch (repairError) {
					throw new Error("Unable to process response: Invalid JSON format");
				}
			}

			return NextResponse.json(
				{ message: JSON.parse(validResponse) },
				{ status: 200 }
			);
		}
		// Process project updates
		else if (generationType === "ProjectUpdate") {
			const userMessage = body.userMessage;
			const projectData = body.projectData;

			// Process the update request
			console.log("Project Update Req:", userMessage, projectData);
			const result = await processProjectUpdate(userMessage, projectData);

			const responseText = result.response.text();
			let validResponse;

			try {
				JSON.parse(responseText);
				validResponse = responseText;
			} catch (jsonError) {
				try {
					const repairedJson = jsonrepair(responseText);
					JSON.parse(repairedJson);
					validResponse = repairedJson;
				} catch (repairError) {
					throw new Error("Unable to process response: Invalid JSON format");
				}
			}

			return NextResponse.json(
				{ message: JSON.parse(validResponse) },
				{ status: 200 }
			);
		} else {
			throw new Error("Invalid generation type specified");
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: String(error) }, { status: 400 });
	}
}
