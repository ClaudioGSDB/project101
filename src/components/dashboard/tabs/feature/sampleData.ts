// src/components/dashboard/tabs/feature/sampleData.ts

export interface AIFeature {
	feature_id: string;
	feature_name: string;
	feature_description: string;
	bullet_points: string[];
	related_features: string[];
	complexity: "simple" | "moderate" | "complex";
	user_value: "low" | "medium" | "high";
	implementation_details?: string;
}

export interface AICategory {
	category_id: string;
	category_name: string;
	category_description: string;
	color: string;
	features: AIFeature[];
}

export interface AIResponse {
	project_name: string;
	project_description: string;
	categories: AICategory[];
}

export const sampleData: AIResponse = {
	project_name: "LearnTogether - Collaborative Learning Platform",
	project_description:
		"An online platform that connects students and mentors for collaborative learning experiences, skill sharing, and project-based education.",
	categories: [
		{
			category_id: "user",
			category_name: "User Management",
			category_description:
				"Features related to user accounts, profiles, and authentication",
			color: "from-indigo-500 to-blue-500",
			features: [
				{
					feature_id: "auth",
					feature_name: "User Authentication",
					feature_description:
						"Secure login and registration system with email verification and social login options",
					bullet_points: [
						"Email and password authentication",
						"Social login options (Google, GitHub)",
						"Password recovery via email",
						"Session management with JWT tokens",
					],
					related_features: ["user_profile", "skill_profiles"],
					complexity: "moderate",
					user_value: "high",
					implementation_details:
						"Use Firebase Authentication or Auth0 for faster implementation. Consider adding two-factor authentication as an enhancement feature.",
				},
				{
					feature_id: "user_profile",
					feature_name: "User Profile Management",
					feature_description:
						"Detailed user profiles with customization options and skill showcases",
					bullet_points: [
						"Editable user profiles with avatars",
						"Skill listing and proficiency indicators",
						"Portfolio/project showcase section",
						"Learning goals and interests",
					],
					related_features: ["auth", "skill_profiles"],
					complexity: "moderate",
					user_value: "high",
					implementation_details:
						"Store user profile data in Firebase Firestore or MongoDB. Use cloud storage for profile images and portfolio artifacts.",
				},
				{
					feature_id: "skill_profiles",
					feature_name: "Skill Assessment & Tracking",
					feature_description:
						"System for users to track their skills, complete assessments, and show progress",
					bullet_points: [
						"Self-assessment skill rating system",
						"Skill verification through quizzes",
						"Progress tracking over time",
						"Endorsements from other users",
					],
					related_features: ["user_profile", "matching"],
					complexity: "complex",
					user_value: "medium",
					implementation_details:
						"Create a skills taxonomy and assessment algorithm. Consider using spaced repetition techniques for skill verification.",
				},
			],
		},
		{
			category_id: "collaboration",
			category_name: "Collaboration Tools",
			category_description:
				"Features that enable users to work together and communicate effectively",
			color: "from-emerald-500 to-teal-500",
			features: [
				{
					feature_id: "matching",
					feature_name: "Mentor/Student Matching",
					feature_description:
						"Algorithm to connect students with suitable mentors based on skills, goals, and availability",
					bullet_points: [
						"Skill-based matching algorithm",
						"Availability calendar integration",
						"Learning style preferences",
						"Rating and review system",
					],
					related_features: ["skill_profiles", "messaging"],
					complexity: "complex",
					user_value: "high",
					implementation_details:
						"Implement a recommendation engine using skills as tags/vectors. Consider using a weighted match score based on multiple factors including availability and past ratings.",
				},
				{
					feature_id: "messaging",
					feature_name: "Real-time Messaging",
					feature_description:
						"In-app messaging system for communication between mentors and students",
					bullet_points: [
						"Direct messaging",
						"Group chats for learning circles",
						"File and code snippet sharing",
						"Read receipts and typing indicators",
					],
					related_features: ["matching", "virtual_classroom"],
					complexity: "complex",
					user_value: "high",
					implementation_details:
						"Use Socket.io or Firebase Realtime Database for real-time functionality. Consider integration with WebRTC for potential voice/video chat.",
				},
				{
					feature_id: "virtual_classroom",
					feature_name: "Virtual Classroom",
					feature_description:
						"Interactive space for conducting lessons with whiteboarding, screen sharing, and collaborative tools",
					bullet_points: [
						"Interactive whiteboard",
						"Screen sharing capabilities",
						"Collaborative document editing",
						"Recording of sessions",
					],
					related_features: ["messaging", "resource_library"],
					complexity: "complex",
					user_value: "high",
					implementation_details:
						"Consider integrating with existing solutions like Miro for whiteboarding. Use WebRTC for screen sharing. For MVP, start with a simpler shared workspace and expand features over time.",
				},
			],
		},
		{
			category_id: "content",
			category_name: "Learning Content",
			category_description:
				"Features related to educational resources and learning materials",
			color: "from-amber-500 to-orange-500",
			features: [
				{
					feature_id: "resource_library",
					feature_name: "Resource Library",
					feature_description:
						"Shared repository of learning resources, tutorials, and reference materials",
					bullet_points: [
						"Categorized learning resources",
						"User-contributed materials",
						"Rating and commenting system",
						"Bookmarking and favorites",
					],
					related_features: ["virtual_classroom", "progress_tracking"],
					complexity: "moderate",
					user_value: "medium",
					implementation_details:
						"Use a content management system with tagging functionality. Consider implementing content moderation workflows for user-contributed materials.",
				},
				{
					feature_id: "progress_tracking",
					feature_name: "Learning Progress Tracking",
					feature_description:
						"System to track and visualize learning progress across different skills and projects",
					bullet_points: [
						"Visual progress indicators",
						"Milestone achievements",
						"Learning streaks and consistency tracking",
						"Skill growth visualization",
					],
					related_features: ["resource_library", "skill_profiles"],
					complexity: "moderate",
					user_value: "medium",
					implementation_details:
						"Design a flexible progress tracking system that works across different learning formats. Use interactive charts and visual elements to make progress engaging.",
				},
				{
					feature_id: "project_challenges",
					feature_name: "Project-Based Challenges",
					feature_description:
						"Structured learning challenges and projects for practical skill development",
					bullet_points: [
						"Tiered difficulty levels",
						"Real-world project scenarios",
						"Collaborative team challenges",
						"Mentor review and feedback",
					],
					related_features: ["progress_tracking", "virtual_classroom"],
					complexity: "moderate",
					user_value: "high",
					implementation_details:
						"Design a challenge framework with clear objectives, resources, and evaluation criteria. Enable mentor customization of challenges for specific learning needs.",
				},
			],
		},
	],
};
