// src/components/dashboard/tabs/stack/Stack.tsx
"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
	ExternalLink,
	Info,
	LayoutGrid,
	LayoutList,
	Book,
	CheckCircle,
	Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StackVisual from "./StackVisual";
import { stackData } from "./sample";
import { motion, AnimatePresence } from "framer-motion";

export function Stack() {
	const [viewMode, setViewMode] = useState<"list" | "visual">("list");
	const [activeCategory, setActiveCategory] = useState(stackData.categories[0].id);
	const [activeTech, setActiveTech] = useState<string | null>(null);

	// Get current category
	const currentCategory = stackData.categories.find((cat) => cat.id === activeCategory);

	// Get color classes for the current category
	const getCategoryColorClasses = (colorClass: string) => {
		// Extract the base color from the Tailwind class
		const matches = colorClass.match(/from-([a-z]+)-(\d+)/);
		if (!matches)
			return {
				textColor: "text-white",
				bgColor: colorClass,
				hoverBgColor: "hover:bg-gray-100",
				lightBgColor: "bg-gray-50",
				borderColor: "border-gray-200",
			};

		const [_, colorName, intensity] = matches;
		const intensityNum = parseInt(intensity);

		// Determine color variations
		const textColor = intensityNum >= 500 ? "text-white" : "text-gray-900";
		const borderColor = `border-${colorName}-${Math.max(intensityNum - 200, 200)}`;
		const lightBgColor = `bg-${colorName}-${Math.max(intensityNum - 400, 50)}`;

		return {
			textColor,
			bgColor: colorClass,
			borderColor,
			lightBgColor,
		};
	};

	// Get current colors
	const currentColors = currentCategory
		? getCategoryColorClasses(currentCategory.color)
		: {
				textColor: "text-white",
				bgColor: "from-gray-500 to-gray-700",
				borderColor: "border-gray-300",
				lightBgColor: "bg-gray-50",
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
									? "bg-white shadow-sm text-gray-800 hover:text-gray-800"
									: "bg-transparent hover:bg-gray-200 text-gray-600 hover:text-gray-800"
							}
							onClick={() => setViewMode("list")}
						>
							<LayoutList className="h-4 w-4 mr-1" />
							List
						</Button>
						<Button
							variant={viewMode === "visual" ? "default" : "ghost"}
							size="sm"
							className={
								viewMode === "visual"
									? "bg-white shadow-sm text-gray-800 hover:text-gray-800"
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
				<div className="flex-1 overflow-hidden flex flex-col">
					{/* Category Tabs */}
					<div className="px-5 py-3 bg-gray-50 border-b overflow-x-auto hide-scrollbar">
						<div className="flex space-x-2">
							{stackData.categories.map((category) => {
								const isActive = activeCategory === category.id;
								const { textColor, bgColor, borderColor } =
									getCategoryColorClasses(category.color);

								return (
									<button
										key={category.id}
										className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                      ${
							isActive
								? `bg-gradient-to-r ${bgColor} ${textColor} shadow-md`
								: `bg-white hover:bg-gray-50 text-gray-700 border ${borderColor}`
						}`}
										onClick={() => {
											setActiveCategory(category.id);
											setActiveTech(null);
										}}
									>
										<div className="flex items-center">
											<div
												className={`w-6 h-6 rounded-md flex items-center justify-center mr-2 
                        ${
							isActive
								? "bg-white/20"
								: `bg-gradient-to-r ${bgColor} ${textColor}`
						}`}
											>
												<span
													className={
														isActive
															? textColor
															: "text-white"
													}
												>
													{category.name.charAt(0)}
												</span>
											</div>
											{category.name}
											<span
												className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
													isActive
														? "bg-white/20"
														: "bg-gray-100 text-gray-600"
												}`}
											>
												{category.technologies.length}
											</span>
										</div>
									</button>
								);
							})}
						</div>
					</div>

					{/* Technology Content Area with 2-column layout */}
					<div className="flex-1 flex overflow-hidden">
						{/* Left column: Technology list */}
						<div className="w-1/3 border-r bg-gray-50 overflow-y-auto p-3 space-y-2">
							{currentCategory?.technologies.map((tech) => {
								const isActive = activeTech === tech.id;
								const { bgColor, textColor } = currentColors;

								return (
									<div
										key={tech.id}
										className={`p-3 rounded-lg cursor-pointer transition-all duration-200
                      ${
							isActive
								? `bg-gradient-to-r ${bgColor} ${textColor} shadow-md`
								: "bg-white border border-gray-200 hover:border-gray-300 text-gray-800"
						}`}
										onClick={() => setActiveTech(tech.id)}
									>
										<div className="flex items-center justify-between">
											<h3 className="font-medium">{tech.name}</h3>
											{isActive && (
												<CheckCircle className="h-4 w-4 text-white" />
											)}
										</div>
										<p
											className={`text-xs mt-1 ${
												isActive
													? "text-white/80"
													: "text-gray-500"
											}`}
										>
											{tech.description}
										</p>
									</div>
								);
							})}
						</div>

						{/* Right column: Technology details */}
						<div className="w-2/3 overflow-y-auto p-5">
							<AnimatePresence mode="wait">
								{activeTech ? (
									<TechnologyDetail
										key={activeTech}
										technology={currentCategory?.technologies.find(
											(t) => t.id === activeTech
										)}
										categoryColors={currentColors}
									/>
								) : (
									<motion.div
										key="no-selection"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="h-full flex items-center justify-center"
									>
										<div className="text-center p-8 max-w-md">
											<div
												className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${currentColors.bgColor} flex items-center justify-center mb-4`}
											>
												<Layers className="h-8 w-8 text-white" />
											</div>
											<h3 className="text-xl font-semibold text-gray-700 mb-2">
												{currentCategory?.name} Technologies
											</h3>
											<p className="text-gray-500">
												{currentCategory?.description} Select a
												technology from the list to see detailed
												information.
											</p>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			) : (
				// Visual view content
				<div className="flex-1 overflow-hidden bg-gray-50">
					<StackVisual />
				</div>
			)}
		</div>
	);
}

interface TechnologyDetailProps {
	technology: any; // Using any for now, should be properly typed
	categoryColors: {
		textColor: string;
		bgColor: string;
		borderColor: string;
		lightBgColor: string;
	};
}

function TechnologyDetail({ technology, categoryColors }: TechnologyDetailProps) {
	if (!technology) return null;

	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ duration: 0.2 }}
			className="h-full"
		>
			{/* Header */}
			<div
				className={`p-4 rounded-t-lg bg-gradient-to-r ${categoryColors.bgColor} ${categoryColors.textColor}`}
			>
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-semibold">{technology.name}</h2>
					{technology.url && (
						<a
							href={technology.url}
							target="_blank"
							rel="noopener noreferrer"
							className={`p-2 rounded-full ${categoryColors.textColor} bg-white/20 hover:bg-white/40`}
						>
							<ExternalLink className="h-5 w-5" />
						</a>
					)}
				</div>
				<p className="mt-1 opacity-90">{technology.description}</p>
			</div>

			{/* Main content */}
			<div className="p-5 space-y-6">
				{/* Project relevance */}
				<section>
					<h3
						className={`flex items-center text-lg font-medium mb-2 text-gray-800`}
					>
						<div
							className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center bg-gradient-to-r ${categoryColors.bgColor} ${categoryColors.textColor}`}
						>
							<CheckCircle className="h-4 w-4" />
						</div>
						Why we chose this for your project
					</h3>
					<p className="text-gray-700 leading-relaxed">
						{technology.projectRelevance}
					</p>
				</section>

				{/* Differentiators */}
				<section>
					<h3
						className={`flex items-center text-lg font-medium mb-3 text-gray-800`}
					>
						<div
							className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center bg-gradient-to-r ${categoryColors.bgColor} ${categoryColors.textColor}`}
						>
							<Info className="h-4 w-4" />
						</div>
						Key advantages
					</h3>
					<ul className="space-y-2">
						{technology.differentiators.map(
							(point: string, index: number) => (
								<li key={index} className="flex items-start">
									<div
										className={`mt-1 h-4 w-4 rounded-full bg-gradient-to-r ${categoryColors.bgColor} flex-shrink-0 mr-2`}
									/>
									<span className="text-gray-700">{point}</span>
								</li>
							)
						)}
					</ul>
				</section>

				{/* Learning Resources */}
				<section>
					<h3
						className={`flex items-center text-lg font-medium mb-3 text-gray-800`}
					>
						<div
							className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center bg-gradient-to-r ${categoryColors.bgColor} ${categoryColors.textColor}`}
						>
							<Book className="h-4 w-4" />
						</div>
						Learning Resources
					</h3>
					<div className="flex flex-wrap gap-2">
						{technology.learningResources.map(
							(resource: any, index: number) => (
								<a
									key={index}
									href={resource.url}
									target="_blank"
									rel="noopener noreferrer"
									className={`py-2 px-4 rounded-lg bg-white border ${categoryColors.borderColor} hover:shadow-md transition-shadow flex items-center`}
								>
									<Book className="h-4 w-4 mr-2 text-gray-600" />
									<span className="text-sm font-medium text-gray-700">
										{resource.name}
									</span>
									<ExternalLink className="h-3.5 w-3.5 ml-2 text-gray-400" />
								</a>
							)
						)}
					</div>
				</section>

				{/* Alternatives */}
				{technology.alternatives.length > 0 && (
					<section>
						<h3
							className={`flex items-center text-lg font-medium mb-3 text-gray-800`}
						>
							<div
								className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center bg-gradient-to-r ${categoryColors.bgColor} ${categoryColors.textColor}`}
							>
								<Layers className="h-4 w-4" />
							</div>
							Alternatives Considered
						</h3>
						<div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
							{technology.alternatives.map((alt: any, index: number) => (
								<div
									key={index}
									className={`${
										index !== 0
											? "border-t border-gray-200 mt-3 pt-3"
											: ""
									}`}
								>
									<div className="flex items-center">
										<span className="font-medium text-gray-800 mr-2">
											{alt.name}
										</span>
										{alt.reason && (
											<span className="text-sm text-gray-600">
												— {alt.reason}
											</span>
										)}
									</div>
								</div>
							))}
						</div>
					</section>
				)}
			</div>
		</motion.div>
	);
}
