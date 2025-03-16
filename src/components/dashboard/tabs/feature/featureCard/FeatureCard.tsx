"use client";
import React from "react";
import { ArrowRight, Zap, Award } from "lucide-react";
import { AIFeature, AICategory } from "../sampleData";

interface FeatureCardProps {
	feature: AIFeature;
	category: AICategory;
	isSelected: boolean;
	onSelect: () => void;
	onHighlightRelated: () => void;
}

// ComplexityBadge component for showing feature complexity
const ComplexityBadge = ({ complexity }: { complexity: AIFeature["complexity"] }) => {
	const getComplexityInfo = () => {
		switch (complexity) {
			case "simple":
				return {
					color: "bg-green-100 text-green-800 border-green-200",
					label: "Simple",
				};
			case "moderate":
				return {
					color: "bg-amber-100 text-amber-800 border-amber-200",
					label: "Moderate",
				};
			case "complex":
				return {
					color: "bg-indigo-100 text-indigo-800 border-indigo-200",
					label: "Complex",
				};
			default:
				return {
					color: "bg-gray-100 text-gray-800 border-gray-200",
					label: "Unknown",
				};
		}
	};

	const { color, label } = getComplexityInfo();

	return (
		<span
			className={`text-xs font-medium px-2 py-1 rounded-full border ${color} flex items-center gap-1`}
		>
			<Zap size={12} />
			<span>{label}</span>
		</span>
	);
};

// ValueBadge component for showing user value
const ValueBadge = ({ value }: { value: AIFeature["user_value"] }) => {
	const getValueInfo = () => {
		switch (value) {
			case "high":
				return {
					color: "bg-purple-100 text-purple-800 border-purple-200",
					label: "High Value",
				};
			case "medium":
				return {
					color: "bg-blue-100 text-blue-800 border-blue-200",
					label: "Medium Value",
				};
			case "low":
				return {
					color: "bg-gray-100 text-gray-800 border-gray-200",
					label: "Low Value",
				};
			default:
				return {
					color: "bg-gray-100 text-gray-800 border-gray-200",
					label: "Unknown",
				};
		}
	};

	const { color, label } = getValueInfo();

	return (
		<span
			className={`text-xs font-medium px-2 py-1 rounded-full border ${color} flex items-center gap-1`}
		>
			<Award size={12} />
			<span>{label}</span>
		</span>
	);
};

export function FeatureCard({
	feature,
	category,
	isSelected,
	onSelect,
	onHighlightRelated,
}: FeatureCardProps) {
	return (
		<div
			className={`border rounded-lg transition-all duration-200 cursor-pointer bg-white h-full
        ${
			isSelected
				? "border-2 border-indigo-500 shadow-md transform scale-[1.02]"
				: "border-gray-200 hover:border-indigo-300 hover:shadow"
		}`}
			onClick={onSelect}
		>
			<div className="p-4">
				<div className="flex justify-between items-start mb-2">
					<div>
						<h3 className="font-medium text-gray-800">
							{feature.feature_name}
						</h3>
						<div
							className={`mt-1 text-xs px-2 py-0.5 inline-block rounded-full bg-gradient-to-r ${category.color} bg-opacity-10 text-gray-700`}
						>
							{category.category_name}
						</div>
					</div>
				</div>

				<p className="text-sm text-gray-600 my-2 line-clamp-2">
					{feature.feature_description}
				</p>

				<div className="flex flex-wrap gap-2 mt-3 mb-3">
					<ComplexityBadge complexity={feature.complexity} />
					<ValueBadge value={feature.user_value} />
				</div>

				{/* Preview bullet points */}
				{feature.bullet_points.length > 0 && (
					<div className="mt-2">
						<div className="flex items-start space-x-2 mb-1">
							<div className="h-4 w-4 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
								<span className="text-xs text-indigo-700 font-medium">
									•
								</span>
							</div>
							<p className="text-xs text-gray-600 flex-1 line-clamp-1">
								{feature.bullet_points[0]}
							</p>
						</div>
						{feature.bullet_points.length > 1 && (
							<p className="text-xs text-gray-500 ml-6">
								+{feature.bullet_points.length - 1} more points
							</p>
						)}
					</div>
				)}

				{/* Related features link */}
				{feature.related_features.length > 0 && (
					<div className="mt-3 pt-2 border-t border-gray-100">
						<button
							onClick={(e) => {
								e.stopPropagation();
								onHighlightRelated();
							}}
							className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
						>
							<span>
								{feature.related_features.length} Related Features
							</span>
							<ArrowRight size={12} />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
