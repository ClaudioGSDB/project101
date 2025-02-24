"use client";
import React, { useState, useRef, useEffect } from "react";
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

	// Add this to track position and force updates during panning
	const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
	const [updateKey, setUpdateKey] = useState(0);

	// Track the card being dragged and its real-time position
	const [activeDrag, setActiveDrag] = useState<string | null>(null);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

	const [cards, setCards] = useState([
		{ id: "1", x: 100, y: 100, content: "Feature 1" },
		{ id: "2", x: 400, y: 200, content: "Feature 2" },
		{ id: "3", x: 200, y: 400, content: "Feature 3" },
	]);

	const [connections, setConnections] = useState<Connection[]>([
		{ start: "1", end: "2" },
		{ start: "2", end: "3" },
	]);

	// Container ref for proper clipping
	const containerRef = useRef<HTMLDivElement>(null);

	const handleDragStart = (event: any) => {
		setIsPanZoomEnabled(false);
		setActiveDrag(event.active.id);
		setDragOffset({ x: 0, y: 0 });
	};

	const handleDragMove = (event: any) => {
		if (!activeDrag) return;

		const { delta } = event;

		// Store the delta adjusted for scale
		setDragOffset({
			x: delta.x / currentScale,
			y: delta.y / currentScale,
		});

		// Force arrows to update
		setUpdateKey((prev) => prev + 1);
	};

	const handleDragEnd = (event: any) => {
		const { active } = event;

		// Use the stored dragOffset to update card position
		setCards((prevCards) =>
			prevCards.map((card) =>
				card.id === active.id
					? {
							...card,
							x: card.x + dragOffset.x,
							y: card.y + dragOffset.y,
					  }
					: card
			)
		);

		// Reset drag state
		setIsPanZoomEnabled(true);
		setActiveDrag(null);
		setDragOffset({ x: 0, y: 0 });

		// Force arrows to update
		setUpdateKey((prev) => prev + 1);
	};

	// Handle transformation changes - this fires during panning and zooming
	const handleTransform = (e: any) => {
		setCurrentScale(e.state.scale);
		setPanPosition({ x: e.state.positionX, y: e.state.positionY });

		// Force arrows to update on each transform change
		setUpdateKey((prev) => prev + 1);
	};

	// Handle panning specifically
	const handlePanning = (e: any) => {
		setPanPosition({ x: e.state.positionX, y: e.state.positionY });

		// Force arrows to update during panning
		setUpdateKey((prev) => prev + 1);
	};

	// Get current display position for each card
	const getCardPosition = (card: CardData) => {
		if (card.id === activeDrag) {
			return {
				x: card.x + dragOffset.x,
				y: card.y + dragOffset.y,
			};
		}
		return { x: card.x, y: card.y };
	};

	return (
		<div
			ref={containerRef}
			className="w-full h-full border rounded-xl overflow-hidden relative"
		>
			<DndContext
				onDragStart={handleDragStart}
				onDragMove={handleDragMove}
				onDragEnd={handleDragEnd}
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
					onTransformed={handleTransform}
					onPanning={handlePanning}
				>
					<TransformComponent>
						<div className="min-w-[100vw] min-h-[100vh]" />

						{cards.map((card) => {
							const position = getCardPosition(card);
							return (
								<FeatureCard
									key={card.id}
									id={card.id}
									x={position.x}
									y={position.y}
									content={card.content}
									currentScale={currentScale}
									isBeingDragged={card.id === activeDrag}
								/>
							);
						})}
					</TransformComponent>
				</TransformWrapper>

				{/* Render arrows with proper containment and with key to force updates */}
				<div
					className="absolute inset-0 pointer-events-none overflow-hidden"
					style={{ clipPath: "inset(0)" }}
				>
					{connections.map((connection, index) => (
						<Xarrow
							key={`${index}-${updateKey}-${panPosition.x.toFixed(
								0
							)}-${panPosition.y.toFixed(0)}`}
							start={connection.start}
							end={connection.end}
							color="#6366f1"
							strokeWidth={2}
							path="smooth"
							curveness={0.3}
							startAnchor={["right", "left", "top", "bottom"]} // Prioritized anchor points
							endAnchor={["left", "right", "top", "bottom"]}
							showHead={true}
							headSize={6}
						/>
					))}
				</div>
			</DndContext>
		</div>
	);
}
