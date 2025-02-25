"use client";
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { Grip, ArrowRightLeft } from "lucide-react";

interface FeatureCardProps {
	id: string;
	x: number;
	y: number;
	featureName: string;
	featureDescription: string;
	bulletPoints?: string[];
	currentScale: number;
	isBeingDragged?: boolean;
}

export function FeatureCard({
	id,
	x,
	y,
	featureName,
	featureDescription,
	bulletPoints = [],
	currentScale,
	isBeingDragged = false,
}: FeatureCardProps) {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id: id,
	});

	return (
		<Card
			ref={setNodeRef}
			id={id}
			className="absolute w-72 overflow-hidden cursor-move rounded-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-md hover:shadow-lg transition-shadow duration-200"
			style={{
				left: x,
				top: y,
				transition: isBeingDragged ? "none" : "all 0.2s ease",
				zIndex: isBeingDragged ? 10 : 1,
			}}
			{...listeners}
			{...attributes}
		>
			{/* Header with visual handle */}
			<div className="px-4 py-3 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border-b flex items-center justify-between">
				<h3 className="font-medium text-gray-800 dark:text-gray-200 truncate">
					{featureName}
				</h3>
				<Grip className="w-4 h-4 text-gray-400" />
			</div>

			{/* Content area */}
			<div className="p-4">
				<p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
					{featureDescription}
				</p>

				{bulletPoints.length > 0 && (
					<div className="mt-3 space-y-2">
						{bulletPoints.map((point, index) => (
							<div
								key={index}
								className="flex items-start space-x-2"
							>
								<div className="h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0 mt-0.5">
									<span className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">
										{index + 1}
									</span>
								</div>
								<p className="text-xs text-gray-600 dark:text-gray-400 flex-1">
									{point}
								</p>
							</div>
						))}
					</div>
				)}
			</div>
		</Card>
	);
}
