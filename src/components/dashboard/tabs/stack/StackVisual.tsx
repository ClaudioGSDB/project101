// src/components/dashboard/tabs/stack/StackVisual.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Category, sampleData } from "./sample";
import { motion, AnimatePresence } from "framer-motion";

// Map gradients to explicit hex colors for consistent rendering
const gradientColorMap: Record<string, string> = {
	"from-indigo-500 to-blue-500": "#6366f1", // indigo-500
	"from-emerald-500 to-teal-500": "#10b981", // emerald-500
	"from-amber-500 to-orange-500": "#f59e0b", // amber-500
	"from-violet-500 to-purple-500": "#8b5cf6", // violet-500
	"from-pink-500 to-rose-500": "#ec4899", // pink-500
	"from-gray-500 to-slate-500": "#64748b", // slate-500
};

// Extract color from gradient string
const getColorFromGradient = (gradient: string): string => {
	return gradientColorMap[gradient] || "#64748b"; // Default to slate-500
};

interface Bubble {
	id: string;
	name: string;
	category: string;
	categoryName: string;
	color: string;
	size: number; // Diameter in pixels
	angle: number; // Position angle around the center (in radians)
	distance: number; // Distance from center
	targetDistance: number; // Ideal distance from center
	orbitSpeed: number; // Speed of orbit
	url?: string;
}

const StackVisual = () => {
	const [stackData, setStackData] = useState(sampleData);
	const [bubbles, setBubbles] = useState<Bubble[]>([]);
	const [hoveredBubble, setHoveredBubble] = useState<string | null>(null);
	const [selectedBubble, setSelectedBubble] = useState<string | null>(null);
	const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
	const containerRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<number | null>(null);

	useEffect(() => {
		const [stackData, setStackData] = useState(sampleData);
		if (typeof window !== "undefined") {
			const storedStackData = localStorage.getItem("Stack");
			if (storedStackData) {
				try {
					const parsedData = JSON.parse(storedStackData);
					setStackData(parsedData);
				} catch (error) {
					console.error("Error parsing Stack data:", error);
				}
			}
		}
	}, []);

	// Calculate the total number of technologies
	const totalTechnologies = stackData.categories.reduce(
		(acc: number, category: Category) => {
			return acc + category.technologies.length;
		},
		0
	);

	// Initialize bubbles
	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		const width = container.clientWidth;
		const height = container.clientHeight;
		setContainerSize({ width, height });

		// Calculate base orbit radius based on container size
		const baseRadius = Math.min(width, height) * 0.35;

		// Create bubbles for all technologies
		const newBubbles: Bubble[] = [];

		// Organize bubbles by category for positioning
		const categories = stackData.categories;

		// Distribute categories around the circle
		categories.forEach((category: Category, categoryIndex: number) => {
			const color = getColorFromGradient(category.color);
			const categoryAngle = (2 * Math.PI * categoryIndex) / categories.length;
			const categoryTechCount = category.technologies.length;

			// Calculate bubble size based on name length and container size
			// Larger base size to ensure text fits
			const baseBubbleSize = Math.min(width, height) * 0.12;

			// Create bubbles for this category's technologies
			category.technologies.forEach((tech, techIndex) => {
				// Calculate angle within the category segment
				const angleOffset = (Math.PI / 3) * (techIndex / categoryTechCount - 0.5);
				const angle = categoryAngle + angleOffset;

				// Calculate distance from center - vary slightly for visual interest
				// Middle items in a category are closer to center
				const distanceVariation =
					Math.abs(techIndex - (categoryTechCount - 1) / 2) / categoryTechCount;
				const distance = baseRadius * (0.8 + distanceVariation * 0.4);

				// Size based on name length (longer names get slightly larger bubbles)
				// With a minimum size to ensure readability
				const nameLength = tech.name.length;
				const size = Math.max(
					baseBubbleSize,
					baseBubbleSize * (1 + nameLength / 30)
				);

				newBubbles.push({
					id: tech.id,
					name: tech.name,
					category: category.id,
					categoryName: category.name,
					color: color,
					size: size,
					angle: angle,
					distance: distance * (0.8 + Math.random() * 0.4), // Start with some randomness
					targetDistance: distance,
					orbitSpeed: 0.001 * (0.8 + Math.random() * 0.4), // Random orbit speed
					url: tech.url,
				});
			});
		});

		setBubbles(newBubbles);

		// Handle window resize
		const handleResize = () => {
			if (!containerRef.current) return;
			const newWidth = containerRef.current.clientWidth;
			const newHeight = containerRef.current.clientHeight;
			setContainerSize({ width: newWidth, height: newHeight });

			// Adjust bubble positions on resize
			const newBaseRadius = Math.min(newWidth, newHeight) * 0.35;
			const scaleFactor = newBaseRadius / baseRadius;

			setBubbles((prev) =>
				prev.map((bubble) => ({
					...bubble,
					targetDistance: bubble.targetDistance * scaleFactor,
					size: bubble.size * (newWidth / width),
				}))
			);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Animate bubbles
	useEffect(() => {
		if (bubbles.length === 0 || !containerRef.current) return;

		const centerX = containerSize.width / 2;
		const centerY = containerSize.height / 2;

		// Compute an even distribution of angles
		const angleStep = (2 * Math.PI) / bubbles.length;

		const animate = () => {
			setBubbles((prevBubbles) => {
				return prevBubbles.map((bubble, index) => {
					let { angle, distance, targetDistance, orbitSpeed } = bubble;

					// Force even distribution by using computed angle
					const idealAngle = index * angleStep;

					// Gentle correction towards ideal angle
					const angleDiff = idealAngle - angle;

					// Slow rotation with angle correction
					const speedModifier =
						hoveredBubble === bubble.id || selectedBubble === bubble.id
							? 0.1 // Slow down when hovered/selected
							: 1;

					// Adjust angle with correction
					angle += orbitSpeed * speedModifier + angleDiff * 0.01;

					// Pull toward target distance (orbital stability)
					const distanceDiff = targetDistance - distance;
					distance += distanceDiff * 0.03;

					// When selected, pull very close to center
					if (selectedBubble === bubble.id) {
						const pullTowardCenter = targetDistance * 0.6 - distance;
						distance += pullTowardCenter * 0.1;
					}

					// When hovered, slightly pull toward center
					if (hoveredBubble === bubble.id) {
						const pullTowardCenter = targetDistance * 0.9 - distance;
						distance += pullTowardCenter * 0.1;
					}

					return {
						...bubble,
						angle,
						distance,
					};
				});
			});

			animationRef.current = requestAnimationFrame(animate);
		};

		animationRef.current = requestAnimationFrame(animate);

		return () => {
			if (animationRef.current !== null) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [bubbles.length, hoveredBubble, selectedBubble, containerSize]);

	// Calculate bubble position from angle and distance
	const getBubblePosition = (bubble: Bubble) => {
		const centerX = containerSize.width / 2;
		const centerY = containerSize.height / 2;

		const x = centerX + Math.cos(bubble.angle) * bubble.distance;
		const y = centerY + Math.sin(bubble.angle) * bubble.distance;

		return { x, y };
	};

	return (
		<div
			className="relative h-full w-full overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100"
			ref={containerRef}
		>
			{/* Central project circle - Improved Centering */}
			<motion.div
				className="absolute rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-lg z-30 flex flex-col items-center justify-center cursor-pointer"
				style={{
					width: "250px",
					height: "250px",
					position: "absolute",
					top: "50%",
					left: "50%",
					marginLeft: "-125px", // Half of width
					marginTop: "-125px", // Half of height
					transform: "translate(0,0)", // Ensure no conflicting transforms
				}}
				initial={{ scale: 0 }}
				animate={{
					scale: 1,
				}}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 20,
					duration: 0.5,
				}}
				onClick={() => setSelectedBubble(null)}
				whileHover={{ scale: 1.05 }}
			>
				<motion.div className="text-center p-2">
					<div className="text-lg font-bold">{stackData.projectType}</div>
					<div className="text-sm opacity-80">
						{totalTechnologies} Technologies
					</div>
				</motion.div>
			</motion.div>

			{/* Subtle ring around the center */}
			<div
				className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-gray-200/20"
				style={{
					width: Math.min(containerSize.width, containerSize.height) * 0.75,
					height: Math.min(containerSize.width, containerSize.height) * 0.75,
				}}
			/>

			{/* Subtle connecting lines between bubbles and center */}
			<svg className="absolute inset-0 w-full h-full z-1 pointer-events-none">
				{bubbles.map((bubble) => {
					const { x, y } = getBubblePosition(bubble);
					const centerX = containerSize.width / 2;
					const centerY = containerSize.height / 2;
					const isHighlighted =
						hoveredBubble === bubble.id || selectedBubble === bubble.id;

					return (
						<line
							key={`center-${bubble.id}`}
							x1={centerX}
							y1={centerY}
							x2={x}
							y2={y}
							stroke={bubble.color}
							strokeWidth={isHighlighted ? 2 : 1}
							strokeOpacity={isHighlighted ? 0.4 : 0.2}
							strokeDasharray={isHighlighted ? "none" : "5,5"}
						/>
					);
				})}
			</svg>

			{/* Technology bubbles */}
			<AnimatePresence>
				{bubbles.map((bubble) => {
					const { x, y } = getBubblePosition(bubble);
					const isSelected = selectedBubble === bubble.id;
					const isHovered = hoveredBubble === bubble.id;
					const displaySize = isSelected
						? bubble.size * 1.5
						: isHovered
						? bubble.size * 1.2
						: bubble.size;

					return (
						<motion.div
							key={bubble.id}
							className="absolute rounded-full flex items-center justify-center cursor-pointer text-white font-medium shadow-md"
							style={{
								backgroundColor: bubble.color,
								fontSize: isSelected ? "1rem" : "0.85rem",
								zIndex: isSelected ? 40 : isHovered ? 30 : 5,
								boxShadow:
									isSelected || isHovered
										? "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
										: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
							}}
							initial={{ scale: 0, opacity: 0 }}
							animate={{
								scale: 1,
								opacity: 1,
								width: displaySize,
								height: displaySize,
								x: x - displaySize / 2,
								y: y - displaySize / 2,
								transition: {
									scale: { duration: 0.3 },
									opacity: { duration: 0.3 },
									width: {
										type: "spring",
										stiffness: 300,
										damping: 30,
									},
									height: {
										type: "spring",
										stiffness: 300,
										damping: 30,
									},
								},
							}}
							exit={{ scale: 0, opacity: 0 }}
							onMouseEnter={() => setHoveredBubble(bubble.id)}
							onMouseLeave={() => setHoveredBubble(null)}
							onClick={() =>
								setSelectedBubble(
									selectedBubble === bubble.id ? null : bubble.id
								)
							}
							transition={{
								type: "spring",
								stiffness: 200,
								damping: 20,
							}}
							whileHover={{ scale: 1.1 }}
						>
							{isSelected ? (
								<div className="p-3 text-center max-w-full">
									<div className="font-bold mb-1">{bubble.name}</div>
									<div className="text-xs opacity-80 mb-2">
										{bubble.categoryName}
									</div>
									{bubble.url && (
										<a
											href={bubble.url}
											target="_blank"
											rel="noopener noreferrer"
											onClick={(e) => e.stopPropagation()}
											className="mt-2 inline-block px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs transition-colors"
										>
											Learn More
										</a>
									)}
								</div>
							) : (
								<div className="text-center max-w-full p-2">
									<div className="truncate px-1">{bubble.name}</div>
								</div>
							)}
						</motion.div>
					);
				})}
			</AnimatePresence>

			{/* Category legend */}
			<div className="absolute bottom-4 left-4 right-4 bg-white/30 backdrop-blur-sm p-3 rounded-lg z-30 flex flex-wrap justify-center gap-3">
				{stackData.categories.map((category: Category) => {
					const color = getColorFromGradient(category.color);
					return (
						<div
							key={category.id}
							className="flex items-center"
							onMouseEnter={() => {
								// Highlight all bubbles in this category
								const categoryBubbles = bubbles.filter(
									(b) => b.category === category.id
								);
								if (categoryBubbles.length > 0) {
									setHoveredBubble(categoryBubbles[0].id);
								}
							}}
							onMouseLeave={() => setHoveredBubble(null)}
						>
							<div
								className="w-3 h-3 rounded-full mr-1.5"
								style={{ backgroundColor: color }}
							/>
							<span className="text-xs font-medium text-gray-800">
								{category.name}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default StackVisual;
