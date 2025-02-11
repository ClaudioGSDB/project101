// Path: src/components/Form/ProjectForm.tsx
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
import { FormData } from "@/types/form";
import Experience from "@/components/form/sections/Experience";
import Interests from "@/components/form/sections/Interests";

type Section = {
	title: string;
	description: string;
	type: "experience" | "technology" | "purpose" | "scope" | "additional";
};

const sections: Section[] = [
	{
		title: "Technical Background",
		description:
			"First, let's understand your technical experience to help generate project ideas that match your skill level.",
		type: "experience",
	},
	{
		title: "Technology",
		description: "asdasdasd",
		type: "technology",
	},
	{
		title: "Purpose 3",
		description: "asdasdasd",
		type: "purpose",
	},
	{
		title: "Scope 4",
		description: "asdasdasd",
		type: "scope",
	},
	{
		title: "Additional 5",
		description: "asdasdasd",
		type: "additional",
	},
];

export default function ProjectForm() {
	const [currentSection, setCurrentSection] = useState(0);
	const [formData, setFormData] = useState<FormData>({
		technologies: [],
		interests: [],
		experienceLevel: "beginner",
	});

	const TECHNOLOGIES = [
		{ id: "web", label: "Web Development (HTML, CSS, JavaScript)" },
		{ id: "mobile", label: "Mobile Development" },
		{ id: "database", label: "Databases" },
		{ id: "cloud", label: "Cloud Services" },
		{ id: "ml", label: "Machine Learning/AI" },
		{ id: "game", label: "Game Development" },
		{ id: "backend", label: "Backend Development" },
	];

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	const renderSectionContent = () => {
		switch (sections[currentSection].type) {
			case "experience":
				return (
					<Experience formData={formData} setFormData={setFormData} />
				);
			case "technology":
				return (
					<Interests formData={formData} setFormData={setFormData} />
				);
			default:
				return null;
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
			{/* Progress indicator */}
			<div className="w-full max-w-2xl mb-2">
				<div className="flex justify-between items-center">
					{sections.map((_, index) => (
						<div
							key={index}
							className="flex-1 mx-3 h-3 rounded-full bg-gray-200/60 overflow-hidden relative"
						>
							<div
								className={`absolute top-0 left-0 h-full bg-gradient-to-tr from-indigo-500 to-blue-500 transition-all duration-300 
                                ${index <= currentSection ? "w-full" : "w-0"}`}
							/>
						</div>
					))}
				</div>
			</div>
			{/*Card */}
			<Card className="w-full max-w-2xl">
				<CardHeader>
					<CardTitle>{sections[currentSection].title}</CardTitle>
				</CardHeader>
				<CardContent>{renderSectionContent()}</CardContent>
				<CardFooter className="flex justify-between">
					<Button
						variant="outline"
						disabled={currentSection === 0}
						onClick={() => setCurrentSection(currentSection - 1)}
					>
						Back
					</Button>
					<Button
						className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 hover:scale-105 transition-transform duration-300"
						disabled={currentSection === sections.length - 1}
						onClick={() => setCurrentSection(currentSection + 1)}
					>
						Next
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
