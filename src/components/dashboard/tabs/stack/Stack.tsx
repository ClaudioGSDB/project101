// src/components/dashboard/tabs/stack/Stack.tsx
"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
	ExternalLink,
	Info,
	LayoutGrid,
	LayoutList,
	ChevronDown,
	ChevronRight,
	Book,
	Plus,
	Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StackVisual from "./StackVisual";
import { stackData } from "./sample";

export function Stack() {
	const [hoveredTech, setHoveredTech] = useState<string | null>(null);
	const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
	const [viewMode, setViewMode] = useState<"list" | "visual">("list");

	// Check if a category is expanded
	const isCategoryExpanded = (categoryId: string) => {
		return expandedCategories.includes(categoryId);
	};

	// Toggle a single category
	const toggleCategory = (categoryId: string) => {
		if (isCategoryExpanded(categoryId)) {
			setExpandedCategories(
				expandedCategories.filter((id) => id !== categoryId)
			);
		} else {
			setExpandedCategories([...expandedCategories, categoryId]);
		}
	};

	// Expand all categories
	const expandAllCategories = () => {
		setExpandedCategories(stackData.categories.map((cat) => cat.id));
	};

	// Collapse all categories
	const collapseAllCategories = () => {
		setExpandedCategories([]);
	};

	// Calculate if all categories are expanded
	const areAllCategoriesExpanded =
		stackData.categories.length > 0 &&
		stackData.categories.every((cat) =>
			expandedCategories.includes(cat.id)
		);

	// Helper function to get color class variations for contrast
	const getCategoryColorClasses = (colorClass: string) => {
		// Extract the base color and intensity from the Tailwind class
		const matches = colorClass.match(/from-([a-z]+)-(\d+)/);
		if (!matches)
			return {
				textColor: "text-white",
				bgColor: colorClass,
				hoverBgColor: "hover:bg-gray-100",
				lightBgColor: "bg-gray-50",
			};

		const [_, colorName, intensity] = matches;
		const intensityNum = parseInt(intensity);

		// Determine text color based on background intensity
		// Darker backgrounds (500+) get white text, lighter get dark text
		const textColor = intensityNum >= 500 ? "text-white" : "text-gray-900";

		// Create variations for hover states, etc.
		const hoverBgColor =
			intensityNum >= 500
				? `hover:bg-${colorName}-${Math.min(intensityNum + 100, 900)}`
				: `hover:bg-${colorName}-${Math.max(intensityNum - 100, 50)}`;

		// Light background variation for containers
		const lightBgColor = `bg-${colorName}-${Math.max(
			intensityNum - 400,
			50
		)}`;

		return { textColor, bgColor: colorClass, hoverBgColor, lightBgColor };
	};

	return (
		<div className="h-full flex flex-col overflow-hidden">
			{/* Header with project info and navigation */}
			<div className="p-5 bg-white border-b">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div>
						<h2 className="text-xl font-semibold text-gray-800 mb-1">
							Technology Stack
						</h2>
						<div className="flex items-center">
							<span className="text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1 rounded-full shadow-sm">
								{stackData.projectType}
							</span>
							<p className="ml-3 text-sm text-gray-500">
								{stackData.description}
							</p>
						</div>
					</div>

					{/* View toggle buttons */}
					<div className="flex bg-gray-100 rounded-lg p-1 shadow-sm">
						<Button
							variant={viewMode === "list" ? "default" : "ghost"}
							size="sm"
							className={
								viewMode === "list"
									? "bg-white shadow-sm text-gray-800 hover:text-gray-200"
									: "bg-transparent hover:bg-gray-200 text-gray-600 hover:text-gray-800"
							}
							onClick={() => setViewMode("list")}
						>
							<LayoutList className="h-4 w-4 mr-1" />
							List
						</Button>
						<Button
							variant={
								viewMode === "visual" ? "default" : "ghost"
							}
							size="sm"
							className={
								viewMode === "visual"
									? "bg-white shadow-sm text-gray-800 hover:text-gray-200"
									: "bg-transparent hover:bg-gray-200 text-gray-600 hover:text-gray-800"
							}
							onClick={() => setViewMode("visual")}
						>
							<LayoutGrid className="h-4 w-4 mr-1" />
							Visual
						</Button>
					</div>
				</div>
			</div>

			{/* Main content - Either list view or visual view */}
			{viewMode === "list" ? (
				<div className="flex-1 overflow-y-auto p-5 bg-gray-50 space-y-6">
					{/* Category navigation and expand/collapse all */}
					<div className="flex justify-between items-center mb-2">
						<div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
							{stackData.categories.map((category) => {
								const { textColor, bgColor } =
									getCategoryColorClasses(category.color);
								return (
									<button
										key={category.id}
										className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
											isCategoryExpanded(category.id)
												? `bg-gradient-to-r ${bgColor} ${textColor} shadow-md`
												: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
										}`}
										onClick={() =>
											toggleCategory(category.id)
										}
									>
										{category.name} (
										{category.technologies.length})
									</button>
								);
							})}
						</div>

						<Button
							variant="outline"
							size="sm"
							onClick={
								areAllCategoriesExpanded
									? collapseAllCategories
									: expandAllCategories
							}
							className="ml-2 whitespace-nowrap"
						>
							{areAllCategoriesExpanded ? (
								<>
									<Minus className="h-3.5 w-3.5 mr-1" />
									Collapse All
								</>
							) : (
								<>
									<Plus className="h-3.5 w-3.5 mr-1" />
									Expand All
								</>
							)}
						</Button>
					</div>

					{stackData.categories.map((category) => {
						const { textColor, lightBgColor } =
							getCategoryColorClasses(category.color);
						return (
							<div
								key={category.id}
								className={`mb-5 rounded-lg border transition-all duration-300 ${
									isCategoryExpanded(category.id)
										? "shadow-md border-gray-300"
										: "border-gray-200 hover:border-gray-300"
								}`}
							>
								{/* Category header with adaptive text color */}
								<div
									className={`p-4 flex items-center cursor-pointer ${
										isCategoryExpanded(category.id)
											? `bg-gradient-to-r ${category.color} ${textColor}`
											: "bg-white text-gray-800"
									}`}
									onClick={() => toggleCategory(category.id)}
								>
									<div
										className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${category.color} text-white shadow-md flex-shrink-0`}
									>
										<span className="text-lg font-bold">
											{category.name.charAt(0)}
										</span>
									</div>
									<div className="ml-4 flex-1">
										<h3 className="text-lg font-medium flex items-center">
											{category.name}
											<span
												className={`text-sm font-normal ml-2 ${
													isCategoryExpanded(
														category.id
													)
														? textColor
														: "text-gray-600"
												} opacity-80`}
											>
												{category.technologies.length}{" "}
												technologies
											</span>
										</h3>
										<p
											className={`text-sm mt-1 ${
												isCategoryExpanded(category.id)
													? textColor
													: "text-gray-600"
											} opacity-90`}
										>
											{category.description}
										</p>
									</div>
									<div
										className={
											isCategoryExpanded(category.id)
												? textColor
												: "text-gray-600"
										}
									>
										{isCategoryExpanded(category.id) ? (
											<ChevronDown className="h-5 w-5" />
										) : (
											<ChevronRight className="h-5 w-5" />
										)}
									</div>
								</div>

								{/* Technologies grid - Animated expand/collapse */}
								{isCategoryExpanded(category.id) && (
									<div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50 animate-in fade-in">
										{category.technologies.map((tech) => {
											const { textColor, bgColor } =
												getCategoryColorClasses(
													category.color
												);
											return (
												<Card
													key={tech.id}
													className="overflow-hidden transition-all duration-300 border-gray-200 hover:shadow-md"
													onMouseEnter={() =>
														setHoveredTech(tech.id)
													}
													onMouseLeave={() =>
														setHoveredTech(null)
													}
												>
													{/* Tech header with adaptive coloring */}
													<div
														className={`p-4 flex items-center justify-between bg-gradient-to-r ${bgColor} ${textColor}`}
													>
														<div className="flex items-center">
															<h4 className="font-medium">
																{tech.name}
															</h4>
														</div>
														<div className="flex items-center space-x-1">
															{tech.url && (
																<a
																	href={
																		tech.url
																	}
																	target="_blank"
																	rel="noopener noreferrer"
																	className={`p-1.5 rounded-full ${textColor} bg-white/20 hover:bg-white/40`}
																>
																	<ExternalLink className="h-3.5 w-3.5" />
																</a>
															)}
														</div>
													</div>

													{/* Tech description */}
													<div className="p-4 bg-white">
														<p className="text-sm text-gray-700">
															{tech.description}
														</p>

														<div className="mt-3 flex items-center space-x-2">
															{/* Documentation link */}
															{tech.url && (
																<a
																	href={
																		tech.url
																	}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="inline-flex items-center text-xs font-medium text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-full"
																>
																	<Book className="h-3 w-3 mr-1" />
																	Documentation
																</a>
															)}
														</div>

														{/* Alternatives section */}
														{(hoveredTech ===
															tech.id ||
															tech.alternatives
																.length <= 3) &&
															tech.alternatives
																.length > 0 && (
																<div className="mt-3 pt-3 border-t border-dashed">
																	<div className="text-xs font-medium text-gray-700 mb-2 flex items-center">
																		<Info className="h-3 w-3 mr-1" />
																		Alternatives:
																	</div>
																	<ul className="space-y-1">
																		{tech.alternatives.map(
																			(
																				alt,
																				index
																			) => (
																				<li
																					key={
																						index
																					}
																					className="text-xs text-gray-700 flex items-start"
																				>
																					<span className="text-gray-400 mr-1.5 mt-0.5">
																						•
																					</span>
																					<div>
																						<span className="font-medium text-gray-800">
																							{
																								alt.name
																							}
																						</span>
																						{alt.reason && (
																							<span className="ml-1 text-gray-600">
																								(
																								{
																									alt.reason
																								}

																								)
																							</span>
																						)}
																					</div>
																				</li>
																			)
																		)}
																	</ul>
																</div>
															)}
													</div>
												</Card>
											);
										})}
									</div>
								)}
							</div>
						);
					})}
				</div>
			) : (
				// Visual view content
				<div className="flex-1 overflow-hidden bg-gray-50">
					<StackVisual />
				</div>
			)}

			{/* Footer with summary */}
			<div className="p-4 bg-white border-t">
				<p className="text-sm text-gray-700">
					This technology stack was selected based on your project
					requirements and will provide a robust foundation for your
					development.
				</p>
			</div>
		</div>
	);
}
