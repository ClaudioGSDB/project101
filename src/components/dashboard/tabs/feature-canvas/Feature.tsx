"use client";
import React, { useState, useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { DndContext } from "@dnd-kit/core";
import { FeatureCard } from "./featureCard/FeatureCard";
import Xarrow, { anchorType } from "react-xarrows";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createOptimizedLayout } from "./LayoutAlgorithm";
import { sampleData } from "./sample";
import { AIFeature, CardData, Connection } from "@/types/FeatureComponent";

// Function to determine fixed anchor points based on relative positions
const determineAnchorPoints = (
	startPos: { x: number; y: number },
	endPos: { x: number; y: number }
): { start: anchorType; end: anchorType } => {
	// Calculate the angle between positions
	const dx = endPos.x - startPos.x;
	const dy = endPos.y - startPos.y;
	const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Convert to degrees

	// Determine anchor points based on the angle
	if (angle >= -45 && angle < 45) {
		// End card is to the right of start card
		return { start: "right", end: "left" };
	} else if (angle >= 45 && angle < 135) {
		// End card is below start card
		return { start: "bottom", end: "top" };
	} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
		// End card is to the left of start card
		return { start: "left", end: "right" };
	} else {
		// End card is above start card
		return { start: "top", end: "bottom" };
	}
};

export function Feature() {
	// Transform and zoom state
	const [isPanZoomEnabled, setIsPanZoomEnabled] = useState(true);
	const transformComponentRef = useRef(null);
	const [currentScale, setCurrentScale] = useState(1);
	const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
	const [updateKey, setUpdateKey] = useState(0);

	// Card state
	const [cards, setCards] = useState<CardData[]>([]);
	const [connections, setConnections] = useState<Connection[]>([]);

	// Drag state
	const [activeDrag, setActiveDrag] = useState<string | null>(null);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

	// Container ref for proper clipping
	const containerRef = useRef<HTMLDivElement>(null);

	// Parse AI response and create card layout
	const parseAIResponse = (
		features: AIFeature[]
	): { cards: CardData[]; connections: Connection[] } => {
		// Use optimized layout algorithm
		const cards = createOptimizedLayout(features);

		// Create unique connections
		const connections: Connection[] = [];
		const addedConnections = new Set<string>();

		features.forEach((feature) => {
			feature.related_features.forEach((relatedId) => {
				// Create a unique key for this connection (ordered to avoid duplicates)
				const ids = [feature.feature_id, relatedId].sort();
				const connectionKey = `${ids[0]}-${ids[1]}`;

				if (!addedConnections.has(connectionKey)) {
					connections.push({
						start: feature.feature_id,
						end: relatedId,
					});
					addedConnections.add(connectionKey);
				}
			});
		});

		return { cards, connections };
	};

	// Initialize data
	useEffect(() => {
		const { cards, connections } = parseAIResponse(sampleData.Features);
		setCards(cards);
		setConnections(connections);
	}, []);

	// Drag handlers
	const handleDragStart = (event: any) => {
		setIsPanZoomEnabled(false);
		setActiveDrag(event.active.id);
		setDragOffset({ x: 0, y: 0 });
	};

	const handleDragMove = (event: any) => {
		if (!activeDrag) return;

		setDragOffset({
			x: event.delta.x / currentScale,
			y: event.delta.y / currentScale,
		});

		setUpdateKey((prev) => prev + 1);
	};

	const handleDragEnd = (event: any) => {
		if (!activeDrag) return;

		setCards((prevCards) =>
			prevCards.map((card) =>
				card.id === event.active.id
					? {
							...card,
							x: card.x + dragOffset.x,
							y: card.y + dragOffset.y,
					  }
					: card
			)
		);

		setIsPanZoomEnabled(true);
		setActiveDrag(null);
		setDragOffset({ x: 0, y: 0 });
		setUpdateKey((prev) => prev + 1);
	};

	// Transform handlers
	const handleTransform = (e: any) => {
		setCurrentScale(e.state.scale);
		setPanPosition({ x: e.state.positionX, y: e.state.positionY });
		setUpdateKey((prev) => prev + 1);
	};

	// Get current position for a card (accounting for drag)
	const getCardPosition = (card: CardData) => {
		if (card.id === activeDrag) {
			return {
				x: card.x + dragOffset.x,
				y: card.y + dragOffset.y,
			};
		}
		return { x: card.x, y: card.y };
	};

	// Zoom helper functions
	const handleZoomIn = () => {
		if (transformComponentRef.current) {
			// @ts-ignore - we know the ref has zoomIn method
			transformComponentRef.current.zoomIn();
		}
	};

	const handleZoomOut = () => {
		if (transformComponentRef.current) {
			// @ts-ignore - we know the ref has zoomOut method
			transformComponentRef.current.zoomOut();
		}
	};

	// Pre-compute anchor points when cards or drag state changes
	const getConnectionAnchors = (connection: Connection) => {
		const startCard = cards.find((card) => card.id === connection.start);
		const endCard = cards.find((card) => card.id === connection.end);

		if (!startCard || !endCard) {
			return { start: "right" as anchorType, end: "left" as anchorType };
		}

		// Get positions accounting for any active dragging
		const startPos = getCardPosition(startCard);
		const endPos = getCardPosition(endCard);

		return determineAnchorPoints(startPos, endPos);
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
					initialScale={0.8}
					wheel={{ smoothStep: 0.0005 }}
					disabled={!isPanZoomEnabled}
					ref={transformComponentRef}
					onTransformed={handleTransform}
					onPanning={handleTransform}
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
									featureName={card.featureName}
									featureDescription={card.featureDescription}
									bulletPoints={card.bulletPoints}
									currentScale={currentScale}
									isBeingDragged={card.id === activeDrag}
								/>
							);
						})}
					</TransformComponent>
				</TransformWrapper>

				{/* Connection arrows */}
				<div
					className="absolute inset-0 pointer-events-none overflow-hidden"
					style={{ clipPath: "inset(0)" }}
				>
					{connections.map((connection, index) => {
						// Get stable anchor points based on relative positions
						const anchors = getConnectionAnchors(connection);

						return (
							<Xarrow
								key={`${index}-${updateKey}`}
								start={connection.start}
								end={connection.end}
								color="#6366f1"
								strokeWidth={2}
								path="smooth"
								curveness={0.3}
								startAnchor={anchors.start}
								endAnchor={anchors.end}
								showHead={true}
								headSize={6}
							/>
						);
					})}
				</div>

				{/* Zoom controls */}
				<div className="absolute bottom-4 right-4 flex space-x-2">
					<Button variant="outline" size="icon" onClick={handleZoomIn}>
						<ZoomIn className="h-4 w-4" />
					</Button>
					<Button variant="outline" size="icon" onClick={handleZoomOut}>
						<ZoomOut className="h-4 w-4" />
					</Button>
				</div>
			</DndContext>
		</div>
	);
}
