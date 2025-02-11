// src/types/form.ts
export type FormData = {
	// Section 1: Technical Background
	experienceLevel?:
		| "brand_new"
		| "learning_basics"
		| "some_experience"
		| "professional";
	techInterests?: string; // For brand new/learning basics
	languages: string[]; // For some experience/professional
	expertiseAreas: string[];
	frameworksLibraries?: string;

	// // Section 2: Interests/Motivation
	// interests: string[];
	// otherInterests?: string;
	// problemType?: string;
	// otherProblemType?: string;

	// // Section 3: Purpose
	// purpose?: string;
	// courseInfo?: string;
	// industryInfo?: string;

	// // Section 4: Project Scope
	// timeCommitment?: string;
	// projectSize?: string;
	// teamPreference?: string;

	// // Section 5: Additional Context
	// specificProblems?: string;
	// constraints?: string;
};
