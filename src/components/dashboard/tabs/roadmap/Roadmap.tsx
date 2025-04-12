// src/components/dashboard/tabs/roadmap/Roadmap.tsx
"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
	Calendar,
	Clock,
	Plus,
	ChevronDown,
	ChevronUp,
	Circle,
	Search,
} from "lucide-react";
import { sampleRoadmapData, Milestone, Task } from "./Sample";

// Get roadmap data from localStorage
const storedRoadmapData = localStorage.getItem("Roadmap");
const roadmapData = storedRoadmapData
	? JSON.parse(storedRoadmapData) ?? sampleRoadmapData
	: sampleRoadmapData;

console.log("Roadmap data:", roadmapData);

// Define milestone columns
const columns = [
	{ id: "milestone1", name: "Milestone 1" },
	{ id: "milestone2", name: "Milestone 2" },
	{ id: "milestone3", name: "Milestone 3" },
	{ id: "milestone4", name: "Milestone 4" },
];

export function Roadmap() {
	const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(new Set());
	const [searchQuery, setSearchQuery] = useState("");

	// Toggle a milestone's expanded state
	const toggleMilestone = (id: string) => {
		setExpandedMilestones((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(id)) {
				newSet.delete(id);
			} else {
				newSet.add(id);
			}
			return newSet;
		});
	};

	// Calculate total estimated time for a milestone
	const calculateTotalTime = (tasks: Task[]) => {
		if (!tasks || tasks.length === 0) return { value: 0, unit: "days" as const };

		// Convert all estimates to days for a common unit
		let totalDays = 0;

		tasks.forEach((task) => {
			switch (task.estimatedTime.unit) {
				case "days":
					totalDays += task.estimatedTime.value;
					break;
				case "weeks":
					totalDays += task.estimatedTime.value * 7;
					break;
				case "months":
					totalDays += task.estimatedTime.value * 30; // approximate
					break;
			}
		});

		// Convert back to most appropriate unit for display
		if (totalDays >= 60) {
			return { value: Math.round(totalDays / 30), unit: "months" as const };
		} else if (totalDays >= 14) {
			return { value: Math.round(totalDays / 7), unit: "weeks" as const };
		} else {
			return { value: totalDays, unit: "days" as const };
		}
	};

	// Calculate total estimated time for all milestones in a column
	const calculateColumnTotalTime = (milestones: Milestone[]) => {
		if (!milestones || milestones.length === 0)
			return { value: 0, unit: "days" as const };

		// Convert all estimates to days for a common unit
		let totalDays = 0;

		milestones.forEach((milestone) => {
			const milestoneTime = calculateTotalTime(milestone.tasks);
			switch (milestoneTime.unit) {
				case "days":
					totalDays += milestoneTime.value;
					break;
				case "weeks":
					totalDays += milestoneTime.value * 7;
					break;
				case "months":
					totalDays += milestoneTime.value * 30; // approximate
					break;
			}
		});

		// Convert back to most appropriate unit for display
		if (totalDays >= 60) {
			return { value: Math.round(totalDays / 30), unit: "months" as const };
		} else if (totalDays >= 14) {
			return { value: Math.round(totalDays / 7), unit: "weeks" as const };
		} else {
			return { value: totalDays, unit: "days" as const };
		}
	};

	// Filter milestones based on search query
	const filterMilestones = (milestones: Milestone[]) => {
		if (!searchQuery) return milestones;

		return milestones.filter(
			(milestone) =>
				milestone.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				milestone.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
				milestone.tasks.some(
					(task) =>
						task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
						task.description.toLowerCase().includes(searchQuery.toLowerCase())
				)
		);
	};

	// Get priority badge style
	const getPriorityBadge = (priority: string) => {
		switch (priority) {
			case "critical":
				return "bg-red-100 text-red-800 border-red-200";
			case "high":
				return "bg-amber-100 text-amber-800 border-amber-200";
			case "medium":
				return "bg-blue-100 text-blue-800 border-blue-200";
			case "low":
				return "bg-green-100 text-green-800 border-green-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	// Format time estimate as a range
	const formatTimeEstimateAsRange = (estimate: {
		value: number;
		unit: "days" | "weeks" | "months";
	}) => {
		if (estimate.value <= 1) {
			const unitSingular = estimate.unit.slice(0, -1); // Remove 's' for singular
			return `1 ${unitSingular}`;
		}

		// For values like 2, 3, 4, etc., just show the exact value
		if (Number.isInteger(estimate.value)) {
			return `${estimate.value} ${estimate.unit}`;
		}

		// For non-integer values, show a range like "2-3 weeks"
		const lowerBound = Math.floor(estimate.value);
		const upperBound = Math.ceil(estimate.value);
		return `${lowerBound}-${upperBound} ${estimate.unit}`;
	};

	return (
		<div className="h-full flex flex-col">
			{/* Header with project info and search */}
			<div className="p-4 border-b bg-white">
				<div className="flex justify-between items-center mb-3">
					<div>
						<h1 className="text-xl font-bold text-gray-800">
							{roadmapData.projectName}
						</h1>
						<div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
							<p>{roadmapData.projectDescription}</p>
							<span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full flex items-center gap-1">
								<Calendar size={12} />
								<span>
									Started:{" "}
									{new Date(roadmapData.startDate).toLocaleDateString()}
								</span>
							</span>
						</div>
					</div>
					{/* <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center gap-2">
            <Plus size={16} />
            <span>Add Milestone</span>
          </button> */}
				</div>

				<div className="relative">
					<Search
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
						size={18}
					/>
					<input
						type="text"
						placeholder="Search milestones and tasks..."
						className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			{/* Milestone board */}
			<div className="flex-1 overflow-hidden flex p-4 space-x-4 bg-gray-50">
				{columns.map((column) => {
					const milestones = filterMilestones(
						roadmapData.milestones[
							column.id as keyof typeof roadmapData.milestones
						] || []
					);
					const columnTotalTime = calculateColumnTotalTime(milestones);

					return (
						<div
							key={column.id}
							className="flex-1 flex flex-col min-w-[280px] bg-gray-100 rounded-lg border border-gray-200"
						>
							{/* Column header */}
							<div
								className={`p-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-t-lg`}
							>
								<div className="flex justify-between items-center">
									<div>
										<h3 className="font-medium">{column.name}</h3>
										<div className="flex items-center text-xs text-white/90 mt-0.5">
											<Clock size={12} className="mr-1" />
											<span>
												{formatTimeEstimateAsRange(
													columnTotalTime
												)}
											</span>
										</div>
									</div>
									<span className="bg-white/20 text-white text-xs font-medium px-2 py-0.5 rounded-full">
										{milestones?.length || 0}
									</span>
								</div>
							</div>

							{/* Column content - scrollable */}
							<div className="flex-1 overflow-y-auto p-2 space-y-3">
								{milestones?.length ? (
									milestones.map((milestone) => {
										const totalEstimate = calculateTotalTime(
											milestone.tasks
										);
										const isExpanded = expandedMilestones.has(
											milestone.id
										);

										return (
											<Card
												key={milestone.id}
												className={`bg-white shadow-sm hover:shadow transition-all cursor-pointer
                          ${isExpanded ? "ring-2 ring-indigo-300" : ""}`}
											>
												{/* Milestone header */}
												<div
													className="p-3"
													onClick={() =>
														toggleMilestone(milestone.id)
													}
												>
													<div className="flex justify-between items-start mb-1">
														<h4 className="font-medium text-gray-800">
															{milestone.title}
														</h4>
														<div className="flex items-center">
															{isExpanded ? (
																<ChevronUp
																	size={16}
																	className="text-gray-500"
																/>
															) : (
																<ChevronDown
																	size={16}
																	className="text-gray-500"
																/>
															)}
														</div>
													</div>

													{/* Estimated time directly under title */}
													<div className="flex items-center mb-2 text-sm text-gray-600">
														<Clock
															size={14}
															className="mr-1"
														/>
														<span>
															{formatTimeEstimateAsRange(
																totalEstimate
															)}
														</span>
													</div>

													<div className="flex items-center gap-2">
														<span
															className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityBadge(
																milestone.priority
															)}`}
														>
															{milestone.priority
																.charAt(0)
																.toUpperCase() +
																milestone.priority.slice(
																	1
																)}
														</span>
													</div>

													{/* Expanded content */}
													{isExpanded && (
														<div className="mt-3 pt-3 border-t border-gray-200">
															<p className="text-sm text-gray-600 mb-4">
																{milestone.description}
															</p>

															{/* Dependencies */}
															{milestone.dependencies &&
																milestone.dependencies
																	.length > 0 && (
																	<div className="mt-3">
																		<h5 className="font-medium text-sm text-gray-700 mb-2">
																			Dependencies
																		</h5>
																		<div className="flex flex-wrap gap-2">
																			{milestone.dependencies.map(
																				(
																					depId
																				) => {
																					// Find the dependency milestone across all columns
																					let dep:
																						| Milestone
																						| undefined;
																					for (const colKey in roadmapData.milestones) {
																						const colMilestones =
																							roadmapData
																								.milestones[
																								colKey as keyof typeof roadmapData.milestones
																							];
																						dep =
																							colMilestones.find(
																								(
																									m: Milestone
																								) =>
																									m.id ===
																									depId
																							);
																						if (
																							dep
																						)
																							break;
																					}

																					return dep ? (
																						<span
																							key={
																								depId
																							}
																							className="text-xs px-2 py-1 bg-gray-100 rounded-lg border border-gray-200 flex items-center gap-1"
																						>
																							<Circle
																								size={
																									12
																								}
																								className="text-blue-500"
																							/>
																							{
																								dep.title
																							}
																						</span>
																					) : null;
																				}
																			)}
																		</div>
																	</div>
																)}
														</div>
													)}
												</div>
											</Card>
										);
									})
								) : (
									<div className="flex flex-col items-center justify-center p-4 text-center h-32 border border-dashed border-gray-300 rounded-lg bg-gray-50">
										<p className="text-gray-500 text-sm">
											No milestones
										</p>
										<button className="mt-2 text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
											<Plus size={12} />
											Add milestone
										</button>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
