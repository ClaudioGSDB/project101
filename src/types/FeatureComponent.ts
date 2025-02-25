// src/components/features/types.ts

export interface AIFeature {
	feature_id: string;
	feature_name: string;
	feature_description: string;
	bullet_points: string[];
	related_features: string[];
}

export interface AIResponse {
	Features: AIFeature[];
}

export interface CardData {
	id: string;
	x: number;
	y: number;
	featureName: string;
	featureDescription: string;
	bulletPoints: string[];
}

export interface Connection {
	start: string;
	end: string;
}
