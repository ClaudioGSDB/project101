import { AIFeature, CardData } from "@/types/FeatureComponent";

export const createOptimizedLayout = (
	features: AIFeature[],
	canvasWidth = 1600, // Larger canvas
	canvasHeight = 1200, // Larger canvas
	iterationCount = 200
): CardData[] => {
	// Create initial widely-spaced positions
	const cards: CardData[] = features.map((feature, index) => {
		// Convert feature to card data
		return {
			id: feature.feature_id,
			x: 0, // Will be set properly below
			y: 0, // Will be set properly below
			featureName: feature.feature_name,
			featureDescription: feature.feature_description,
			bulletPoints: feature.bullet_points,
		};
	});

	// Create connections graph
	const connections: { source: string; target: string }[] = [];
	const connectionCount: Record<string, number> = {};

	features.forEach((feature) => {
		connectionCount[feature.feature_id] = 0;
		feature.related_features.forEach((relatedId) => {
			connections.push({
				source: feature.feature_id,
				target: relatedId,
			});

			connectionCount[feature.feature_id] =
				(connectionCount[feature.feature_id] || 0) + 1;
			connectionCount[relatedId] = (connectionCount[relatedId] || 0) + 1;
		});
	});

	// Initial wide spacing in a large circle
	const centerX = canvasWidth / 2;
	const centerY = canvasHeight / 2;
	const initialRadius = Math.min(canvasWidth, canvasHeight) * 0.4; // 40% of canvas size

	cards.forEach((card, index) => {
		const angle = (2 * Math.PI * index) / cards.length;
		card.x = centerX + initialRadius * Math.cos(angle);
		card.y = centerY + initialRadius * Math.sin(angle);
	});

	// Force-directed algorithm constants
	const cardWidth = 280;
	const cardHeight = 180;
	const repulsionForce = 50000; // Significantly higher repulsion
	const attractionForce = 0.08; // Lower attraction
	const dampingFactor = 0.9;
	const minDistance = cardWidth * 1.3; // Much larger minimum distance

	// Store velocities
	const velocities = cards.map(() => ({ x: 0, y: 0 }));

	// Run iterations
	for (let iteration = 0; iteration < iterationCount; iteration++) {
		const forces = cards.map(() => ({ x: 0, y: 0 }));

		// Apply strong repulsion forces between all pairs of cards
		for (let i = 0; i < cards.length; i++) {
			for (let j = i + 1; j < cards.length; j++) {
				const dx = cards[j].x - cards[i].x;
				const dy = cards[j].y - cards[i].y;
				const distanceSquared = dx * dx + dy * dy;
				const distance = Math.sqrt(distanceSquared);

				// Stronger repulsion for all cards
				const force = repulsionForce / Math.max(distanceSquared, 1);
				const fx = (dx / distance) * force;
				const fy = (dy / distance) * force;

				forces[i].x -= fx;
				forces[i].y -= fy;
				forces[j].x += fx;
				forces[j].y += fy;

				// Extra penalty for cards that are too close
				if (distance < minDistance) {
					const extraForce = (minDistance - distance) * 2;
					const efx = (dx / distance) * extraForce;
					const efy = (dy / distance) * extraForce;

					forces[i].x -= efx;
					forces[i].y -= efy;
					forces[j].x += efx;
					forces[j].y += efy;
				}
			}
		}

		// Apply much weaker attraction forces for connected cards
		for (const connection of connections) {
			const sourceCard = cards.find(
				(card) => card.id === connection.source
			);
			const targetCard = cards.find(
				(card) => card.id === connection.target
			);

			if (sourceCard && targetCard) {
				const dx = targetCard.x - sourceCard.x;
				const dy = targetCard.y - sourceCard.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				// Skip if cards are too close
				if (distance < minDistance) continue;

				// Weaker attraction force that maxes out at a certain distance
				const maxAttractionDistance = minDistance * 2.5;
				const attractDist = Math.min(distance, maxAttractionDistance);
				const force = attractionForce * attractDist;

				const fx = (dx / distance) * force;
				const fy = (dy / distance) * force;

				forces[cards.indexOf(sourceCard)].x += fx;
				forces[cards.indexOf(sourceCard)].y += fy;
				forces[cards.indexOf(targetCard)].x -= fx;
				forces[cards.indexOf(targetCard)].y -= fy;
			}
		}

		// Weak central gravity to keep layout centered
		for (let i = 0; i < cards.length; i++) {
			const dx = centerX - cards[i].x;
			const dy = centerY - cards[i].y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance > initialRadius * 1.2) {
				// Only apply if card is drifting too far
				const gravityForce = 0.01;
				forces[i].x += dx * gravityForce;
				forces[i].y += dy * gravityForce;
			}
		}

		// Update positions with cooling
		const progress = iteration / iterationCount;
		const velocityScale = 1 - Math.pow(progress, 2);

		for (let i = 0; i < cards.length; i++) {
			velocities[i].x = velocities[i].x * dampingFactor + forces[i].x;
			velocities[i].y = velocities[i].y * dampingFactor + forces[i].y;

			cards[i].x += velocities[i].x * velocityScale;
			cards[i].y += velocities[i].y * velocityScale;
		}

		// Periodically check for overlaps and correct
		if (iteration % 10 === 0) {
			for (let i = 0; i < cards.length; i++) {
				for (let j = i + 1; j < cards.length; j++) {
					const dx = cards[j].x - cards[i].x;
					const dy = cards[j].y - cards[i].y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < minDistance) {
						// Move cards apart immediately
						const overlap = minDistance - distance;
						const moveX = ((dx / distance) * overlap) / 2;
						const moveY = ((dy / distance) * overlap) / 2;

						cards[i].x -= moveX;
						cards[i].y -= moveY;
						cards[j].x += moveX;
						cards[j].y += moveY;
					}
				}
			}
		}
	}

	// Ensure no cards are too close in the final layout
	for (let attempt = 0; attempt < 5; attempt++) {
		let overlapsFixed = 0;

		for (let i = 0; i < cards.length; i++) {
			for (let j = i + 1; j < cards.length; j++) {
				const dx = cards[j].x - cards[i].x;
				const dy = cards[j].y - cards[i].y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < minDistance) {
					const overlap = minDistance - distance;
					const moveX = ((dx / distance) * overlap) / 2;
					const moveY = ((dy / distance) * overlap) / 2;

					cards[i].x -= moveX;
					cards[i].y -= moveY;
					cards[j].x += moveX;
					cards[j].y += moveY;

					overlapsFixed++;
				}
			}
		}

		if (overlapsFixed === 0) break;
	}

	return cards;
};
