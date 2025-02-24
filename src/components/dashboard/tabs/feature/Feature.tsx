"use client";
import React, { useState, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { DndContext } from "@dnd-kit/core";
import { FeatureCard } from "./featureCard/FeatureCard";
import Xarrow from "react-xarrows";

interface CardData {
	id: string;
	x: number;
	y: number;
	content: string;
}

interface Connection {
	start: string;
	end: string;
}

export function Feature() {
	const [isPanZoomEnabled, setIsPanZoomEnabled] = useState(true);
	const transformComponentRef = useRef(null);
	const [currentScale, setCurrentScale] = useState(1);

	const [cards, setCards] = useState([
		{ id: "1", x: 100, y: 100, content: "Feature 1" },
		{ id: "2", x: 400, y: 200, content: "Feature 2" },
		{ id: "3", x: 200, y: 400, content: "Feature 3" },
	]);

	// Connections state
	const [connections, setConnections] = useState<Connection[]>([
		{ start: "1", end: "2" },
		{ start: "2", end: "3" },
	]);

	const handleDragEnd = (event: any) => {
		const { active, delta } = event;

		// Adjust the delta based on the current scale
		const adjustedDelta = {
			x: delta.x / currentScale,
			y: delta.y / currentScale,
		};

		setCards((prevCards) =>
			prevCards.map((card) =>
				card.id === active.id
					? {
							...card,
							x: card.x + adjustedDelta.x,
							y: card.y + adjustedDelta.y,
					  }
					: card
			)
		);
		setIsPanZoomEnabled(true);
	};

	return (
		<div className="w-full h-full border rounded-xl overflow-hidden">
			<DndContext
				onDragEnd={handleDragEnd}
				onDragStart={() => setIsPanZoomEnabled(false)}
			>
				<TransformWrapper
					limitToBounds={false}
					centerOnInit={false}
					minScale={0.1}
					maxScale={3}
					initialScale={1}
					wheel={{ smoothStep: 0.0005 }}
					disabled={!isPanZoomEnabled}
					ref={transformComponentRef}
					onTransformed={(e) => {
						// Update the current scale whenever transformation changes
						setCurrentScale(e.state.scale);
					}}
				>
					<TransformComponent>
						{/* This invisible div makes the entire area draggable */}
						<div className="min-w-[100vw] min-h-[100vh]" />

						{/* Render all cards */}
						{cards.map((card) => (
							<FeatureCard
								key={card.id}
								id={card.id}
								x={card.x}
								y={card.y}
								content={card.content}
								currentScale={currentScale}
							/>
						))}

						{/* Render all connections */}
						{connections.map((connection, index) => (
							<Xarrow
								key={index}
								start={connection.start}
								end={connection.end}
								color="#6366f1"
								strokeWidth={2}
								path="smooth"
								curveness={0.8}
								startAnchor="auto"
								endAnchor="auto"
								showHead={true}
								headSize={6}
							/>
						))}
					</TransformComponent>
				</TransformWrapper>
			</DndContext>
		</div>
	);
}
