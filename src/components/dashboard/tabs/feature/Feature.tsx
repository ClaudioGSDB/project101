"use client";
import React, { useState, useEffect } from "react";
import { Search, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { FeatureCard } from "./featureCard/FeatureCard";
import { FeatureDetail } from "./featureDetail/FeatureDetail";
import { sampleData, AIFeature, AICategory } from "./sampleData";

const storedData = localStorage.getItem("generation");

const featureData = storedData ? JSON.parse(storedData)?.Feature ?? sampleData : sampleData;


console.log(featureData)


export function Feature() {
	// State for managing expanded categories
	const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

	// State for selecting a feature
	const [selectedFeature, setSelectedFeature] = useState<{
		feature: AIFeature;
		category: AICategory;
	} | null>(null);

	// State for search functionality
	const [searchQuery, setSearchQuery] = useState("");

	// State for highlighting related features
	const [highlightedFeatureIds, setHighlightedFeatureIds] = useState<string[]>([]);

	// Initialize with first category expanded
	useEffect(() => {
		if (featureData.categories.length > 0) {
			setExpandedCategories([featureData.categories[0].category_id]);
		}
	}, []);

	// Toggle category expansion
	const toggleCategory = (categoryId: string) => {
		setExpandedCategories((prev) =>
			prev.includes(categoryId)
				? prev.filter((id) => id !== categoryId)
				: [...prev, categoryId]
		);
	};

	// Select a feature to view details
	const handleSelectFeature = (feature: AIFeature, category: AICategory) => {
		setSelectedFeature({ feature, category });
		// Clear any highlighted features when selecting a new one
		setHighlightedFeatureIds([]);
	};

	// Close the feature detail panel
	const handleCloseDetail = () => {
		setSelectedFeature(null);
		setHighlightedFeatureIds([]);
	};

	// Highlight related features when requested
	const handleHighlightRelated = (featureIds: string[]) => {
		setHighlightedFeatureIds(featureIds);

		// Make sure categories containing related features are expanded
		const categoriesToExpand: string[] = [];

		featureData.categories.forEach((category: AICategory) => {
			category.features.forEach((feature: AIFeature) => {
				if (
					featureIds.includes(feature.feature_id) &&
					!expandedCategories.includes(category.category_id)
				) {
					categoriesToExpand.push(category.category_id);
				}
			});
		});

		if (categoriesToExpand.length > 0) {
			setExpandedCategories((prev) => [...prev, ...categoriesToExpand]);
		}
	};

	// Filter categories and features based on search
	const filteredCategories = searchQuery
		? featureData.categories
				.map((category: AICategory) => ({
					...category,
					features: category.features.filter(
						(feature: AIFeature) =>
							feature.feature_name
								.toLowerCase()
								.includes(searchQuery.toLowerCase()) ||
							feature.feature_description
								.toLowerCase()
								.includes(searchQuery.toLowerCase()) ||
							feature.bullet_points.some((point) =>
								point.toLowerCase().includes(searchQuery.toLowerCase())
							)
					),
				}))
				.filter((category: AICategory) => category.features.length > 0)
		: featureData.categories;

	return (
		<div className="h-full flex flex-col">
			{/* Header with project info and search */}
			<div className="p-4 border-b bg-white">
				<div className="flex justify-between items-center mb-3">
					<div>
						<h1 className="text-xl font-bold text-gray-800">
							{featureData.project_name}
						</h1>
						<p className="text-sm text-gray-600 mt-1">
							{featureData.project_description}
						</p>
					</div>
					<button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center gap-2">
						<Plus size={16} />
						<span>Add Feature</span>
					</button>
				</div>

				<div className="relative">
					<Search
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
						size={18}
					/>
					<input
						type="text"
						placeholder="Search features..."
						className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			{/* Main content area */}
			<div className="flex-1 overflow-hidden flex">
				{/* Features list */}
				<div
					className={`${
						selectedFeature ? "w-2/3" : "w-full"
					} overflow-y-auto bg-gray-50`}
				>
					<div className="p-4">
						{filteredCategories.map((category: AICategory) => (
							<div key={category.category_id} className="mb-4">
								{/* Category header */}
								<div
									className={`p-3 rounded-lg cursor-pointer transition-all duration-200
                    ${
						expandedCategories.includes(category.category_id)
							? `bg-gradient-to-r ${category.color} text-white`
							: "bg-white border border-gray-200 hover:border-gray-300"
					}`}
									onClick={() => toggleCategory(category.category_id)}
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<h2 className="font-semibold">
												{category.category_name}
											</h2>
											<span
												className={`text-xs px-2 py-0.5 rounded-full 
                        ${
							expandedCategories.includes(category.category_id)
								? "bg-white/20"
								: "bg-gray-100"
						}`}
											>
												{category.features.length}
											</span>
										</div>
										{expandedCategories.includes(
											category.category_id
										) ? (
											<ChevronUp size={18} />
										) : (
											<ChevronDown size={18} />
										)}
									</div>

									{expandedCategories.includes(
										category.category_id
									) && (
										<p
											className={`mt-1 text-sm ${
												expandedCategories.includes(
													category.category_id
												)
													? "text-white/80"
													: "text-gray-500"
											}`}
										>
											{category.category_description}
										</p>
									)}
								</div>

								{/* Feature cards */}
								{expandedCategories.includes(category.category_id) && (
									<div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
										{category.features.map((feature) => (
											<div
												key={feature.feature_id}
												className={`transition-all duration-300 ${
													highlightedFeatureIds.includes(
														feature.feature_id
													)
														? "ring-2 ring-indigo-500 ring-offset-2"
														: ""
												}`}
											>
												<FeatureCard
													feature={feature}
													category={category}
													isSelected={
														selectedFeature?.feature
															.feature_id ===
														feature.feature_id
													}
													onSelect={() =>
														handleSelectFeature(
															feature,
															category
														)
													}
													onHighlightRelated={() =>
														handleHighlightRelated(
															feature.related_features
														)
													}
												/>
											</div>
										))}
									</div>
								)}
							</div>
						))}

						{filteredCategories.length === 0 && (
							<div className="flex flex-col items-center justify-center p-8 text-center">
								<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
									<Search size={24} className="text-gray-400" />
								</div>
								<h3 className="text-lg font-medium text-gray-700">
									No features found
								</h3>
								<p className="text-gray-500 mt-1">
									Try adjusting your search query
								</p>
							</div>
						)}
					</div>
				</div>

				{/* Selected feature detail panel */}
				{selectedFeature && (
					<div className="w-1/3 border-l">
						<FeatureDetail
							feature={selectedFeature.feature}
							category={selectedFeature.category}
							allCategories={sampleData.categories}
							onClose={handleCloseDetail}
							onHighlightRelated={handleHighlightRelated}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
