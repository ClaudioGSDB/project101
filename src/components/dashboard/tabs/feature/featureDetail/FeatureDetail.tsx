"use client";
import React from "react";
import { X, Zap, Award, ArrowRight } from "lucide-react";
import { AIFeature, AICategory } from "../sampleData";

interface FeatureDetailProps {
	feature: AIFeature;
	category: AICategory;
	allCategories: AICategory[];
	onClose: () => void;
	onHighlightRelated: (featureIds: string[]) => void;
}

export function FeatureDetail({
	feature,
	category,
	allCategories,
	onClose,
	onHighlightRelated,
}: FeatureDetailProps) {
	// Find all related features across all categories
	const relatedFeatures: Array<{ feature: AIFeature; category: AICategory }> = [];

	// Loop through each related feature ID
	feature.related_features.forEach((relatedId) => {
		// Find the feature and its category
		for (const cat of allCategories) {
			const found = cat.features.find((f) => f.feature_id === relatedId);
			if (found) {
				relatedFeatures.push({
					feature: found,
					category: cat,
				});
				break; // Found the feature, no need to continue searching
			}
		}
	});

	return (
		<div className="h-full overflow-y-auto bg-white">
			{/* Header */}
			<div className="sticky top-0 z-10 bg-white border-b">
				<div className="flex justify-between items-center p-4">
					<h2 className="text-xl font-semibold text-gray-800">
						{feature.feature_name}
					</h2>
					<button
						onClick={onClose}
						className="p-1 rounded-full hover:bg-gray-100"
					>
						<X size={20} className="text-gray-500" />
					</button>
				</div>

				<div className="px-4 pb-3">
					<div
						className={`text-xs px-2 py-1 inline-block rounded-full bg-gradient-to-r ${category.color} text-white mb-2`}
					>
						{category.category_name}
					</div>

					<div className="flex gap-2">
						<div className="bg-indigo-100 text-indigo-800 border border-indigo-200 px-2 py-1 rounded-full text-xs flex items-center">
							<Zap size={12} className="mr-1" />
							{feature.complexity === "simple"
								? "Simple"
								: feature.complexity === "moderate"
								? "Moderate"
								: "Complex"}{" "}
							Complexity
						</div>
						<div className="bg-purple-100 text-purple-800 border border-purple-200 px-2 py-1 rounded-full text-xs flex items-center">
							<Award size={12} className="mr-1" />
							{feature.user_value === "high"
								? "High"
								: feature.user_value === "medium"
								? "Medium"
								: "Low"}{" "}
							User Value
						</div>
					</div>
				</div>
			</div>

			{/* Content sections */}
			<div className="p-4 space-y-6">
				{/* Description */}
				<div>
					<h3 className="font-medium text-gray-700 mb-2">Description</h3>
					<p className="text-gray-600">{feature.feature_description}</p>
				</div>

				{/* Key Points */}
				<div>
					<h3 className="font-medium text-gray-700 mb-2">Key Points</h3>
					<ul className="space-y-2">
						{feature.bullet_points.map((point, index) => (
							<li key={index} className="flex items-start gap-2">
								<div className="h-5 w-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 mt-0.5">
									<span className="text-xs font-medium">
										{index + 1}
									</span>
								</div>
								<span className="text-gray-600">{point}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Implementation Details */}
				{feature.implementation_details && (
					<div>
						<h3 className="font-medium text-gray-700 mb-2">
							Implementation Notes
						</h3>
						<div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-600 text-sm">
							{feature.implementation_details}
						</div>
					</div>
				)}

				{/* Related Features */}
				{relatedFeatures.length > 0 && (
					<div>
						<div className="flex justify-between items-center mb-2">
							<h3 className="font-medium text-gray-700">
								Related Features
							</h3>
							<button
								onClick={() =>
									onHighlightRelated(feature.related_features)
								}
								className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
							>
								<span>Highlight All</span>
								<ArrowRight size={12} />
							</button>
						</div>
						<div className="space-y-2">
							{relatedFeatures.map(
								({
									feature: relatedFeature,
									category: relatedCategory,
								}) => (
									<div
										key={relatedFeature.feature_id}
										className="border rounded-lg p-3"
									>
										<div className="flex justify-between items-start mb-1">
											<h4 className="font-medium text-gray-700">
												{relatedFeature.feature_name}
											</h4>
											<div
												className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${relatedCategory.color} text-white`}
											>
												{relatedCategory.category_name}
											</div>
										</div>
										<p className="text-sm text-gray-500 mb-2">
											{relatedFeature.feature_description}
										</p>
										<div className="flex gap-2">
											<div className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full text-xs">
												{relatedFeature.complexity} complexity
											</div>
											<div className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-xs">
												{relatedFeature.user_value} value
											</div>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
