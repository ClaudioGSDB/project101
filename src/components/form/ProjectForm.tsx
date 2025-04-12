// Path: src/components/form/ProjectForm.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormData, initialFormData } from "@/types/form";
import Experience from "@/components/form/sections/Experience";
import Goal from "@/components/form/sections/Goal";
import Interests from "@/components/form/sections/Interests";
import Practical from "@/components/form/sections/Practical";
import Additional from "./sections/Additional";

type Section = {
	title: string;
	description: string;
	type: "background" | "goals" | "interests" | "practical" | "additional";
};

const sections: Section[] = [
	{
		title: "Background & Experience",
		description:
			"Let's understand your programming experience and skills to help generate suitable project ideas.",
		type: "background",
	},
	{
		title: "Project Goals & Motivation",
		description:
			"Help us understand what you're hoping to achieve with this project.",
		type: "goals",
	},
	{
		title: "Interests & Preferences",
		description: "Tell us about the areas of technology that interest you most.",
		type: "interests",
	},
	{
		title: "Practical Considerations",
		description:
			"Let's ensure we suggest projects that fit your schedule and preferences.",
		type: "practical",
	},
	{
		title: "Additional Context",
		description: "Any other information that might help us suggest better projects.",
		type: "additional",
	},
];

export default function ProjectForm() {
	const [currentSection, setCurrentSection] = useState(0);
	const [formData, setFormData] = useState<FormData>(initialFormData);

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	const renderSectionContent = () => {
		switch (sections[currentSection].type) {
			case "background":
				return <Experience formData={formData} setFormData={setFormData} />;
			case "goals":
				return <Goal formData={formData} setFormData={setFormData} />;
			case "interests":
				return <Interests formData={formData} setFormData={setFormData} />;
			case "practical":
				return <Practical formData={formData} setFormData={setFormData} />;
			case "additional":
				return <Additional formData={formData} setFormData={setFormData} />;
			default:
				return null;
		}
	};

	async function sendPrompt() {
		try {
			// Step 1: Generate Features
			const featureResponse = await fetch("/api/gemini", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					formData: formData,
					generationType: "Feature",
				}),
			});

			const featureData = await featureResponse.json();
			localStorage.setItem("Features", JSON.stringify(featureData.message));
			console.log("Feature Response:", featureData.message);

			// Step 2: Generate Stack (passing feature context)
			const stackResponse = await fetch("/api/gemini", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					formData: formData,
					featureContext: featureData.message,
					generationType: "Stack",
				}),
			});

			const stackData = await stackResponse.json();
			localStorage.setItem("Stack", JSON.stringify(stackData.message));
			console.log("Stack Response:", stackData.message);

			// Step 3: Generate Roadmap (passing feature and stack context)
			const roadmapResponse = await fetch("/api/gemini", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					formData: formData,
					featureContext: featureData.message,
					stackContext: stackData.message,
					generationType: "Roadmap",
				}),
			});

			const roadmapData = await roadmapResponse.json();
			localStorage.setItem("Roadmap", JSON.stringify(roadmapData.message));
			console.log("Roadmap Response:", roadmapData.message);

			// Optional: Store a flag indicating all data has been generated
			localStorage.setItem("generationComplete", "true");
		} catch (error) {
			console.error("Error generating project:", error);
		}
	}

	// Rest of your component remains the same
	return (
		<div className="relative min-h-screen flex justify-center items-center bg-gray-50 overflow-hidden">
			{/* Blurred Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-blue-500/30 blur-3xl opacity-50"></div>
			<div className="relative flex">
				{/* Progress indicator */}
				<div className="absolute -left-64 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
					{sections.map((section, index) => (
						<div key={index} className="relative flex justify-center w-full">
							{/* Connecting line */}
							{index < sections.length - 1 && (
								<div className="absolute top-full left-1/2 h-4 w-0.5 bg-gray-200">
									<div
										className={`absolute top-0 left-0 w-full transition-all duration-500 ease-out bg-gradient-to-b from-indigo-500 to-blue-500
											${index < currentSection ? "h-full" : "h-0"}`}
									/>
								</div>
							)}

							{/* Progress square with text */}
							<div
								className={`px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-300
									${
										index <= currentSection
											? "bg-gradient-to-tr from-indigo-500 to-blue-500 text-white shadow-lg"
											: "bg-white border-2 border-gray-200 text-gray-400"
									}`}
							>
								<span className="font-medium w-6 h-6 flex-shrink-0 flex items-center justify-center bg-white/10 rounded-md">
									{index + 1}
								</span>
								<span className="text-sm font-medium whitespace-nowrap">
									{section.title}
								</span>
							</div>
						</div>
					))}
				</div>

				{/* Main form card */}
				<Card className="w-[768px]">
					<CardHeader>
						<CardTitle className="px-2">
							{sections[currentSection].title}
						</CardTitle>
						<p className="text-gray-500 mt-2 px-2">
							{sections[currentSection].description}
						</p>
					</CardHeader>
					<CardContent className="relative">
						<div className="max-h-[60vh] custom-scrollbar px-2">
							{renderSectionContent()}
						</div>
					</CardContent>
					<CardFooter className="flex justify-between px-9">
						<Button
							variant="outline"
							disabled={currentSection === 0}
							onClick={() => setCurrentSection(currentSection - 1)}
						>
							Back
						</Button>
						{currentSection !== sections.length - 1 ? (
							<Button
								className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 hover:scale-105 transition-transform duration-300"
								onClick={() => setCurrentSection(currentSection + 1)}
							>
								Next
							</Button>
						) : (
							<Button
								className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 hover:scale-105 transition-transform duration-300"
								onClick={() => sendPrompt()}
							>
								Submit
							</Button>
						)}
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
