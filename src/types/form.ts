// src/types/form.ts
export type FormData = {
	// Section 1: Background & Experience
	experienceLevel?:
		| "brand_new"
		| "learning_basics"
		| "some_experience"
		| "professional";
	techInterests?: string; // For brand new/learning basics
	languages: string[]; // For some experience/professional
	expertiseAreas: string[];
	frameworksLibraries?: string;

	// Section 2: Project Goals & Motivation
	primaryGoal?:
		| "learning"
		| "portfolio"
		| "problem_solving"
		| "fun"
		| "other";
	otherGoal?: string; // Used when primaryGoal is 'other'
	goalDetails?: string; // For the conditional follow-up responses

	// Section 3: Interests & Preferences
	techAreas: string[];
	otherTechArea?: string;
	devPreferences: string[];
	otherDevPreference?: string;
	projectIdeas?: string;

	// Section 4: Project Scope
	timeCommitment?: string;
	projectTimeline?: string;
	teamPreference?: string;
	teamSize?: string;
	timeConstraints?: string;

	// Section 5: Additional Context
	challenges?: string;
	constraints?: string;
	additionalNotes?: string;
};
