"use client";
import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { DndContext } from "@dnd-kit/core";
import { FeatureCard } from "./featureCard/FeatureCard";

interface CardData {
	id: string;
	x: number;
	y: number;
	content: string;
} //changing once we have the actual json data

export function Feature() {
	const cards: CardData[] = [
		{
			id: "1",
			x: 0,
			y: 0,
			content: "Card 1",
		},
		{
			id: "2",
			x: 100,
			y: 100,
			content: "Card 2",
		},
		{
			id: "3",
			x: 200,
			y: 200,
			content: "Card 3",
		},
	];

	return (
		<div className="w-full h-full border rounded-xl overflow-hidden">
			<DndContext>
				<TransformWrapper
					limitToBounds={false}
					centerOnInit={false}
					minScale={0.1}
					maxScale={3}
					initialScale={1}
					wheel={{ smoothStep: 0.0005 }}
				>
					<TransformComponent>
						{/* This invisible div makes the entire area draggable */}
						<div className="min-w-[100vw] min-h-[100vh]" />

						{/* Your content goes here */}
						<div className="absolute top-1/2 left-1/2 h-64 w-64 bg-blue-600 -translate-y-1/2">
							Centered Box
						</div>
					</TransformComponent>
				</TransformWrapper>
			</DndContext>
		</div>
	);
}
