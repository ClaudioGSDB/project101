// src/components/dashboard/tabs/summary/Summary.tsx
"use client";
import React, { useState, useEffect } from "react";
import {
	Download,
	ExternalLink,
	Check,
	Clock,
	Code,
	Layers,
	Route,
	FileText,
	ChevronRight,
	Star,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sampleRoadmapData as sampleRoadmapData } from "../roadmap/Sample";
import { sampleData as stackSampleData } from "../stack/sample";
import { sampleData as featureSampleData } from "../feature/sampleData";

export function Summary() {
	const [activeExportOption, setActiveExportOption] = useState<string | null>(null);
	const [featureData, setFeatureData] = useState(featureSampleData);
	const [stackData, setStackData] = useState(stackSampleData);
	const [roadmapData, setRoadmapData] = useState(sampleRoadmapData);

	// Load data from localStorage on component mount
	useEffect(() => {
		try {
			// Load Feature data
			const storedFeatures = localStorage.getItem("Features");
			if (storedFeatures) {
				const parsedFeatures = JSON.parse(storedFeatures);
				if (parsedFeatures) setFeatureData(parsedFeatures);
			}

			// Load Stack data
			const storedStack = localStorage.getItem("Stack");
			if (storedStack) {
				const parsedStack = JSON.parse(storedStack);
				if (parsedStack) setStackData(parsedStack);
			}

			// Load Roadmap data
			const storedRoadmap = localStorage.getItem("Roadmap");
			if (storedRoadmap) {
				const parsedRoadmap = JSON.parse(storedRoadmap);
				if (parsedRoadmap) setRoadmapData(parsedRoadmap);
			}
		} catch (error) {
			console.error("Error loading data from localStorage:", error);
		}
	}, []);

	// Calculate metrics from loaded data
	const featuresCount =
		featureData.categories?.reduce(
			(total, category) => total + (category.features?.length || 0),
			0
		) || 0;

	const technologiesCount =
		stackData.categories?.reduce(
			(total, category) => total + (category.technologies?.length || 0),
			0
		) || 0;

	const calculateTotalEstimate = () => {
		// Get all milestones or empty arrays if not available
		const milestone1 = roadmapData.milestones?.milestone1 || [];
		const milestone2 = roadmapData.milestones?.milestone2 || [];
		const milestone3 = roadmapData.milestones?.milestone3 || [];
		const milestone4 = roadmapData.milestones?.milestone4 || [];

		const allMilestones = [
			...milestone1,
			...milestone2,
			...milestone3,
			...milestone4,
		];

		// Sum up all task times in days
		let totalDays = 0;
		allMilestones.forEach((milestone) => {
			milestone.tasks?.forEach((task) => {
				switch (task.estimatedTime?.unit) {
					case "days":
						totalDays += task.estimatedTime.value || 0;
						break;
					case "weeks":
						totalDays += (task.estimatedTime.value || 0) * 7;
						break;
					case "months":
						totalDays += (task.estimatedTime.value || 0) * 30; // approximate
						break;
				}
			});
		});

		// Convert to most appropriate unit
		if (totalDays >= 90) {
			return `${Math.round(totalDays / 30)} months`;
		} else if (totalDays >= 14) {
			return `${Math.round(totalDays / 7)} weeks`;
		} else {
			return `${totalDays} days`;
		}
	};

	// Get highest priority features (assuming user_value = "high" indicates priority)
	const getHighPriorityFeatures = () => {
		const highPriorityFeatures: Array<{ feature: any; category: any }> = [];

		featureData.categories?.forEach((category) => {
			category.features?.forEach((feature) => {
				if (feature.user_value === "high") {
					highPriorityFeatures.push({
						feature,
						category,
					});
				}
			});
		});

		return highPriorityFeatures.slice(0, 3); // Return top 3
	};

	// Get core technologies (first from each category for simplicity)
	const getCoreStack = () => {
		return (
			stackData.categories?.map((category) => ({
				category: category.name,
				technology: category.technologies?.[0], // Get first technology in each category
				color: category.color,
			})) || []
		);
	};

	// Get key milestones (first from each phase)
	const getKeyMilestones = () => {
		return [
			roadmapData.milestones?.milestone1?.[0],
			roadmapData.milestones?.milestone2?.[0],
			roadmapData.milestones?.milestone3?.[0],
			roadmapData.milestones?.milestone4?.[0],
		].filter(Boolean); // Filter out undefined entries
	};

	return (
		<div className="h-full flex flex-col overflow-auto">
			{/* Header */}
			<div className="p-6 border-b bg-white">
				<div className="flex justify-between items-start">
					<div>
						<h1 className="text-2xl font-bold text-gray-800">
							{featureData.project_name || "Project Summary"}
						</h1>
						<p className="text-gray-600 mt-1">
							{featureData.project_description || "Your project overview"}
						</p>
					</div>
					<div className="flex gap-2">
						<div className="relative">
							<Button
								className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600"
								onClick={() =>
									setActiveExportOption(
										activeExportOption ? null : "menu"
									)
								}
							>
								<Download className="w-4 h-4 mr-2" />
								Export
							</Button>

							{activeExportOption === "menu" && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
									<div className="py-1">
										<button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
											<FileText className="w-4 h-4 mr-2" />
											Export as PDF
										</button>
										<button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
											<Code className="w-4 h-4 mr-2" />
											Generate README.md
										</button>
										<button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
											<ExternalLink className="w-4 h-4 mr-2" />
											Share project
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Summary Content */}
			<div className="flex-1 p-6 space-y-8 overflow-auto bg-gray-50">
				{/* Project Summary Metrics */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<Card className="p-4 flex flex-col items-center text-center bg-white hover:shadow-md transition-shadow">
						<div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
							<Layers className="w-6 h-6 text-indigo-600" />
						</div>
						<span className="text-3xl font-bold text-gray-800">
							{featuresCount}
						</span>
						<span className="text-gray-500 text-sm">Total Features</span>
					</Card>

					<Card className="p-4 flex flex-col items-center text-center bg-white hover:shadow-md transition-shadow">
						<div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
							<Code className="w-6 h-6 text-emerald-600" />
						</div>
						<span className="text-3xl font-bold text-gray-800">
							{technologiesCount}
						</span>
						<span className="text-gray-500 text-sm">Technologies</span>
					</Card>

					<Card className="p-4 flex flex-col items-center text-center bg-white hover:shadow-md transition-shadow">
						<div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3">
							<Clock className="w-6 h-6 text-amber-600" />
						</div>
						<span className="text-2xl font-bold text-gray-800">
							{calculateTotalEstimate()}
						</span>
						<span className="text-gray-500 text-sm">Estimated Timeline</span>
					</Card>

					<Card className="p-4 flex flex-col items-center text-center bg-white hover:shadow-md transition-shadow">
						<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
							<Route className="w-6 h-6 text-blue-600" />
						</div>
						<span className="text-3xl font-bold text-gray-800">4</span>
						<span className="text-gray-500 text-sm">Development Phases</span>
					</Card>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Key Features */}
					<div>
						<div className="flex items-center mb-4">
							<Layers className="w-5 h-5 mr-2 text-indigo-600" />
							<h2 className="text-xl font-semibold text-gray-800">
								Key Features
							</h2>
						</div>

						<Card className="overflow-hidden">
							{getHighPriorityFeatures().map((item, index) => (
								<div
									key={item.feature.feature_id}
									className={`p-4 ${
										index !== getHighPriorityFeatures().length - 1
											? "border-b"
											: ""
									}`}
								>
									<div className="flex justify-between">
										<div>
											<div className="flex items-center">
												<div
													className={`w-3 h-3 rounded-full mr-2 bg-gradient-to-r ${item.category.color}`}
												/>
												<h3 className="font-medium text-gray-800">
													{item.feature.feature_name}
												</h3>
											</div>
											<p className="text-sm text-gray-600 mt-1">
												{item.feature.feature_description}
											</p>
										</div>
										<div className="flex items-start">
											<div className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 flex items-center">
												<Star className="w-3 h-3 mr-1" />
												High Value
											</div>
										</div>
									</div>

									{item.feature.bullet_points.length > 0 && (
										<div className="mt-3">
											<div className="flex items-start space-x-2">
												<div className="mt-0.5 h-4 w-4 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
													<Check className="w-3 h-3 text-gray-500" />
												</div>
												<p className="text-xs text-gray-600 flex-1">
													{item.feature.bullet_points[0]}
												</p>
											</div>
											{item.feature.bullet_points.length > 1 && (
												<div className="mt-1 ml-6">
													<p className="text-xs text-gray-500">
														+
														{item.feature.bullet_points
															.length - 1}{" "}
														more points
													</p>
												</div>
											)}
										</div>
									)}
								</div>
							))}

							<div className="bg-gray-50 p-3 text-center">
								<Button
									variant="ghost"
									className="text-indigo-600 text-sm"
								>
									View All Features{" "}
									<ChevronRight className="w-4 h-4 ml-1" />
								</Button>
							</div>
						</Card>
					</div>

					{/* Technology Stack */}
					<div>
						<div className="flex items-center mb-4">
							<Code className="w-5 h-5 mr-2 text-emerald-600" />
							<h2 className="text-xl font-semibold text-gray-800">
								Technology Stack
							</h2>
						</div>

						<Card className="overflow-hidden">
							{getCoreStack().map((item, index) => (
								<div
									key={item.category}
									className={`p-4 ${
										index !== getCoreStack().length - 1
											? "border-b"
											: ""
									}`}
								>
									<div className="flex justify-between items-center">
										<div className="flex items-center">
											<div
												className={`w-10 h-10 rounded-md mr-3 bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-bold text-lg`}
											>
												{item.technology.name.charAt(0)}
											</div>
											<div>
												<h3 className="font-medium text-gray-800">
													{item.technology.name}
												</h3>
												<p className="text-xs text-gray-500">
													{item.category}
												</p>
											</div>
										</div>
										{item.technology.url && (
											<a
												href={item.technology.url}
												target="_blank"
												rel="noopener noreferrer"
												className="text-indigo-600 hover:text-indigo-800"
											>
												<ExternalLink className="w-4 h-4" />
											</a>
										)}
									</div>
								</div>
							))}

							<div className="bg-gray-50 p-3 text-center">
								<Button
									variant="ghost"
									className="text-indigo-600 text-sm"
								>
									Explore Full Stack{" "}
									<ChevronRight className="w-4 h-4 ml-1" />
								</Button>
							</div>
						</Card>
					</div>
				</div>

				{/* Timeline Summary */}
				<div>
					<div className="flex items-center mb-4">
						<Clock className="w-5 h-5 mr-2 text-amber-600" />
						<h2 className="text-xl font-semibold text-gray-800">
							Development Timeline
						</h2>
					</div>

					<Card className="p-6">
						<div className="relative">
							{/* Timeline line */}
							<div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200"></div>

							{/* Timeline items */}
							<div className="space-y-8 ml-6">
								{getKeyMilestones().length > 0 ? (
									getKeyMilestones().map((milestone, index) => (
										<div
											key={milestone.id || index}
											className="relative"
										>
											{/* Timeline dot */}
											<div
												className={`absolute -left-9 w-4 h-4 rounded-full border-2 border-white
											${
												milestone.priority === "critical"
													? "bg-red-500"
													: milestone.priority === "high"
													? "bg-amber-500"
													: milestone.priority === "medium"
													? "bg-blue-500"
													: "bg-green-500"
											}
											`}
											></div>

											<div>
												<h3 className="font-medium text-gray-800">
													Phase {index + 1}: {milestone.title}
												</h3>

												<div className="mt-1 flex flex-wrap gap-2">
													<span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 flex items-center">
														<Clock className="w-3 h-3 mr-1" />
														{milestone.tasks?.length ||
															0}{" "}
														Tasks
													</span>

													<span
														className={`text-xs px-2 py-1 rounded-full flex items-center
													${
														milestone.priority === "critical"
															? "bg-red-100 text-red-800"
															: milestone.priority ===
															  "high"
															? "bg-amber-100 text-amber-800"
															: milestone.priority ===
															  "medium"
															? "bg-blue-100 text-blue-800"
															: "bg-green-100 text-green-800"
													}
													`}
													>
														Priority: {milestone.priority}
													</span>
												</div>

												<p className="text-sm text-gray-600 mt-2">
													{milestone.description &&
													milestone.description.length > 120
														? `${milestone.description.substring(
																0,
																120
														  )}...`
														: milestone.description}
												</p>
											</div>
										</div>
									))
								) : (
									<div className="p-6 text-center text-gray-500">
										No timeline data found
									</div>
								)}
							</div>
						</div>

						<div className="mt-6 text-center">
							<Button
								variant="outline"
								className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
								onClick={() => (window.location.href = "/dashboard")}
							>
								View Detailed Roadmap{" "}
								<ChevronRight className="w-4 h-4 ml-1" />
							</Button>
						</div>
					</Card>
				</div>

				{/* Next Steps */}
				<div>
					<div className="flex items-center mb-4">
						<ChevronRight className="w-5 h-5 mr-2 text-purple-600" />
						<h2 className="text-xl font-semibold text-gray-800">
							Next Steps
						</h2>
					</div>

					<Card className="p-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="p-4 border rounded-lg bg-white hover:shadow-md transition-all">
								<div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
									<FileText className="w-5 h-5 text-indigo-600" />
								</div>
								<h3 className="font-medium text-gray-800 mb-2">
									Export Documentation
								</h3>
								<p className="text-sm text-gray-600">
									Download a complete project brief to share with
									stakeholders or team members.
								</p>
							</div>

							<div className="p-4 border rounded-lg bg-white hover:shadow-md transition-all">
								<div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
									<Code className="w-5 h-5 text-emerald-600" />
								</div>
								<h3 className="font-medium text-gray-800 mb-2">
									Set Up Project Repository
								</h3>
								<p className="text-sm text-gray-600">
									Initialize your development environment with our
									recommended tech stack.
								</p>
							</div>

							<div className="p-4 border rounded-lg bg-white hover:shadow-md transition-all">
								<div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mb-3">
									<Route className="w-5 h-5 text-amber-600" />
								</div>
								<h3 className="font-medium text-gray-800 mb-2">
									Create Project Board
								</h3>
								<p className="text-sm text-gray-600">
									Set up your project management tool with our
									pre-defined milestones and tasks.
								</p>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
