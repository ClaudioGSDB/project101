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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

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
		title: "technology 2",
		description: "asdasdasd",
		type: "technology",
	},
	{
		title: "purpose 3",
		description: "asdasdasd",
		type: "purpose",
	},
	{
		title: "scope 4",
		description: "asdasdasd",
		type: "scope",
	},
	{
		title: "additional 5",
		description: "asdasdasd",
		type: "additional",
	},
];

type FormData = {
	// Section 1: Technical Background
	experienceLevel?: string;
	technologies: string[];
	otherTechnologies?: string | undefined;

	// Section 2: Interests/Motivation
	interests: string[];
	otherInterests?: string;
	problemType?: string;
	otherProblemType?: string;

	// Section 3: Purpose
	purpose?: string;
	courseInfo?: string; // shown if educational
	industryInfo?: string; // shown if professional

	// Section 4: Project Scope
	timeCommitment?: string;
	projectSize?: string;
	teamPreference?: string;

	// Section 5: Additional Context
	specificProblems?: string;
	constraints?: string;
};

export default function ProjectForm() {
	const [currentSection, setCurrentSection] = useState(0);
	const [formData, setFormData] = useState<FormData>({
		technologies: [],
		interests: [],
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
					<div className="space-y-8">
						<div>
							<h3 className="text-lg font-medium">
								What's your programming experience level?
							</h3>
							<RadioGroup
								className="mt-4 space-y-3"
								value={formData.experienceLevel}
								onValueChange={(value) =>
									setFormData((prev) => ({
										...prev,
										experienceLevel: value,
									}))
								}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="beginner"
										id="beginner"
									/>
									<Label htmlFor="beginner">
										Beginner (Less than 1 year)
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="intermediate"
										id="intermediate"
									/>
									<Label htmlFor="intermediate">
										Intermediate (1-3 years)
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="advanced"
										id="advanced"
									/>
									<Label htmlFor="advanced">
										Advanced (3+ years)
									</Label>
								</div>
							</RadioGroup>
						</div>
						<div>
							<h3 className="text-lg font-medium mb-4">
								Which technologies have you worked with?
							</h3>
							<div className="space-y-4">
								{TECHNOLOGIES.map((tech) => (
									<div
										key={tech.id}
										className="flex items-center space-x-2"
									>
										<Checkbox
											id={tech.id}
											checked={formData.technologies.includes(
												tech.id
											)}
											onCheckedChange={(checked) => {
												setFormData((prev) => ({
													...prev,
													technologies: checked
														? [
																...prev.technologies,
																tech.id,
														  ]
														: prev.technologies.filter(
																(t) =>
																	t !==
																	tech.id
														  ),
												}));
											}}
										/>
										<Label htmlFor={tech.id}>
											{tech.label}
										</Label>
									</div>
								))}
								<div className="flex items-center space-x-2">
									<Checkbox
										id="other-tech"
										// If otherTechnology exists, checkbox is checked
										checked={
											formData.otherTechnologies !==
											undefined
										}
										onCheckedChange={(checked) => {
											if (
												formData.otherTechnologies ===
												undefined
											) {
												setFormData({
													...formData,
													otherTechnologies: "",
												});
											} else {
												setFormData({
													...formData,
													otherTechnologies:
														undefined,
												});
											}
										}}
									/>
									<Label htmlFor="other-tech">Other: </Label>
									{formData.otherTechnologies !==
										undefined && (
										<Input
											value={formData.otherTechnologies}
											onChange={(e) =>
												setFormData({
													...formData,
													otherTechnologies:
														e.target.value,
												})
											}
											className="ml-2 w-48"
											placeholder="i.e. Python"
										/>
									)}
								</div>
							</div>
						</div>
					</div>
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
