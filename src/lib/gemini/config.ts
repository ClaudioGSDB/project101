const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
	throw new Error("Missing Gemini API Key");
}

const modelVersion = "gemini-1.5-flash";
const systemPrompt = `
You are a helpful assistant designed to give me jsons for features of a project idea. The json should be structured in a way where it has these specific attributes:

3 objects: "Feature", "Stack", and "Roadmap"

the final json return is EXACTLY structured with this template:
EXACTLY

{
	Feature: {},
	Stack: {},
	Roadmap: {},
}

***"Feature", "Stack", and "Roadmap" ARE ALL TOP LEVEL OBJECTS IN THE JSON***
***FOR NO REASON SHOULD THESE BE NESTED WITHIN EACHOTHER***

"Feature" IS EXACTLY structured with this template:

Feature {
	project_name: string;
	project_description: string;
	categories: AICategory[];
}

The project_name is a simple, short, yet effective and creative name for the overall project where the 
project_description is a short and informative description of the project
categories is a list of AICategory objects that are structured EXACTLY like this:

AICategory {
	category_id: string;
	category_name: string;
	category_description: string;
	color: string;
	features: AIFeature[];
}

AICategorys are to group together features that are similar, before creating and grouping categories generate AIFeatures:
**FEATURES SHOULD NOT ALL BE GROUPED INTO ONE CATEGORY**
**THERE SHOULD NOT BE MORE THAN TEN AIFEATURES IN A CATEGORY**
These are features, parts of the project, for the project that you are generating
generate EXACTLY EIGHTY AIFEATURES NO LESS

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

the feature_name is the name of the feature where the id is the same as feature_name but structured more like a variable
example: "User Authentication" -> "user_auth"
feature_description is a brief description of the use case of the feature
bullet_points is a list of key points that should be done to implement the feature
related_features is a list of other features, using their feature_id, that correlate with this current feature
complexity is how difficult it would be to implement
user_value is how valuable it is to the user
implementation_details? is an optional note/tip to help users in their implementation

After generating features, generate our AICateogries to group these features in
category_name is the name of the category where category_id is the name but structured more as a variable
category_description is a description of this category group
color is a gradient color using tailwind that will be generated, each category should have a different color, example: "from-indigo-500 to-blue-500"
Here are all possible combinations you can use:
// All possible "from-{color}-500" classes
		'from-slate-500', 'from-gray-500', 'from-zinc-500', 'from-neutral-500', 'from-stone-500',
		'from-red-500', 'from-orange-500', 'from-amber-500', 'from-yellow-500', 'from-lime-500',
		'from-green-500', 'from-emerald-500', 'from-teal-500', 'from-cyan-500', 'from-sky-500',
		'from-blue-500', 'from-indigo-500', 'from-violet-500', 'from-purple-500', 'from-fuchsia-500',
		'from-pink-500', 'from-rose-500',
		
		// All possible "to-{color}-500" classes
		'to-slate-500', 'to-gray-500', 'to-zinc-500', 'to-neutral-500', 'to-stone-500',
		'to-red-500', 'to-orange-500', 'to-amber-500', 'to-yellow-500', 'to-lime-500',
		'to-green-500', 'to-emerald-500', 'to-teal-500', 'to-cyan-500', 'to-sky-500',
		'to-blue-500', 'to-indigo-500', 'to-violet-500', 'to-purple-500', 'to-fuchsia-500',
		'to-pink-500', 'to-rose-500',
features is a list of AIFeatures by their feature_id

This is sums up the entirity of Feature
here is an example of what it should look like HOWEVER ABSOLUTELY DO NOT, I REPEAT DO NOT COPY THIS EXAMPLE VERBATIM, SIMPLY USE IT AS A REFERENCE:

exampleFeature_DO_NOT_COPY_DIRECTLY: AIResponse = {
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





"Stack" IS EXACTLY structured with this template:
TechStackResponse {
	projectType: string;
	description: string;
	categories: {
		id: string;
		name: string;
		description: string;
		color: string;
		technologies: {
			id: string;
			name: string;
			description: string;
			url?: string;
			projectRelevance: string;
			differentiators: string[];
			learningResources: {
				name: string;
				url: string;
			}[];
			alternatives: {
				name: string;
				reason?: string;
			}[];
		}[];
	}[];
}

projectType is the name of the type of project: example: "Web Application, Mobile Application"
description is a short description on the type of project
categories is the grouping of the project: example: "Frontend, Backend, Database, Deployment"
its color should be a similarly loaded unique gradient like in features
Technologies are the actual technologies going inside each category: example: "NextJS, Javascript, React"
Alternatives are a list of similar technologies but are different with a reason to prefer the similar technology over the original

here is an example of what it should look like HOWEVER ABSOLUTELY DO NOT, I REPEAT DO NOT COPY THIS EXAMPLE VERBATIM, SIMPLY USE IT AS A REFERENCE:

exampleStack_DO_NOT_COPY_DIRECTLY: AIResponse = {
	projectType: "Web Application",
	description:
		"A full-stack web application for project idea generation and management.",
	categories: [
		{
			id: "frontend",
			name: "Frontend",
			description:
				"Technologies that handle the user interface and client-side logic.",
			color: "from-indigo-500 to-blue-500",
			technologies: [
				{
					id: "next-js",
					name: "Next.js",
					description:
						"React framework that enables server-side rendering and generating static websites.",
					url: "https://nextjs.org/",
					projectRelevance:
						"Next.js is ideal for this project as it provides server-side rendering for better SEO and performance, built-in API routes for backend functionality, and an optimized developer experience with file-based routing.",
					differentiators: [
						"Server-side rendering capabilities not available in standard React",
						"File-based routing system simplifies navigation structure",
						"Built-in API routes eliminate need for separate backend for simple operations",
						"Image optimization and performance features essential for responsive web applications",
					],
					learningResources: [
						{
							name: "Official Documentation",
							url: "https://nextjs.org/docs",
						},
						{ name: "Learn Next.js Course", url: "https://nextjs.org/learn" },
					],
					alternatives: [
						{
							name: "Remix",
							reason: "More complex but offers nested routing",
						},
						{ name: "Gatsby", reason: "Better for purely static sites" },
						{
							name: "Create React App",
							reason: "Simpler setup but lacks SSR",
						},
					],
				},
				{
					id: "react",
					name: "React",
					description:
						"A JavaScript library for building user interfaces with components.",
					url: "https://react.dev/",
					projectRelevance:
						"React's component-based architecture is perfect for this project as it allows us to create reusable UI elements, making development faster and maintenance easier. React's virtual DOM also ensures optimal performance for interactive elements.",
					differentiators: [
						"Component-based architecture promotes reusability and maintainability",
						"Virtual DOM ensures efficient updates and better performance",
						"Huge ecosystem with ready-to-use libraries and components",
						"Declarative approach makes code more predictable and easier to debug",
					],
					learningResources: [
						{ name: "React Documentation", url: "https://react.dev/learn" },
						{
							name: "React Tutorial",
							url: "https://react.dev/learn/tutorial-tic-tac-toe",
						},
					],
					alternatives: [
						{
							name: "Vue.js",
							reason: "Gentler learning curve but smaller ecosystem",
						},
						{
							name: "Angular",
							reason: "More structured but steeper learning curve",
						},
					],
				},
				{
					id: "tailwind",
					name: "Tailwind CSS",
					description:
						"A utility-first CSS framework for rapidly building custom designs.",
					url: "https://tailwindcss.com/",
					projectRelevance:
						"Tailwind CSS is perfect for this project because it allows for rapid UI development without leaving the HTML. Its utility-first approach enables consistent styling across the application while still allowing for customization.",
					differentiators: [
						"Utility-first approach speeds up development without context switching",
						"Highly customizable through configuration",
						"Results in smaller CSS bundle sizes with PurgeCSS integration",
						"Responsive design utilities built-in",
					],
					learningResources: [
						{
							name: "Tailwind CSS Documentation",
							url: "https://tailwindcss.com/docs",
						},
						{
							name: "Tailwind CSS Screencasts",
							url: "https://www.youtube.com/tailwindlabs",
						},
					],
					alternatives: [
						{
							name: "Bootstrap",
							reason: "More pre-built components but less customizable",
						},
						{ name: "Material UI", reason: "More opinionated design system" },
					],
				},
			],
		},
		{
			id: "backend",
			name: "Backend",
			description:
				"Server-side technologies that handle business logic and data processing.",
			color: "from-emerald-500 to-teal-500",
			technologies: [
				{
					id: "node-js",
					name: "Node.js",
					description:
						"JavaScript runtime built on Chrome's V8 JavaScript engine.",
					url: "https://nodejs.org/",
					projectRelevance:
						"Node.js enables us to use JavaScript throughout the entire stack, simplifying development and allowing for code sharing between frontend and backend. Its non-blocking I/O model is perfect for handling multiple concurrent requests efficiently.",
					differentiators: [
						"JavaScript on the server allows for code sharing with frontend",
						"Non-blocking I/O model perfect for handling concurrent requests",
						"Vast ecosystem of packages via npm",
						"Great for real-time applications and API development",
					],
					learningResources: [
						{
							name: "Node.js Documentation",
							url: "https://nodejs.org/en/docs/",
						},
						{
							name: "Node.js Best Practices",
							url: "https://github.com/goldbergyoni/nodebestpractices",
						},
					],
					alternatives: [
						{ name: "Deno", reason: "More secure but smaller ecosystem" },
						{
							name: "Python",
							reason: "Better for data processing but separate language",
						},
					],
				},
				{
					id: "express",
					name: "Express",
					description:
						"Fast, unopinionated, minimalist web framework for Node.js.",
					url: "https://expressjs.com/",
					projectRelevance:
						"Express provides a minimal yet powerful framework for building the API layer of this project. Its flexibility allows us to structure the backend as needed, while middleware support enables features like authentication and request validation.",
					differentiators: [
						"Minimalist and unopinionated - flexible for any project structure",
						"Robust middleware ecosystem for authentication, logging, etc.",
						"Easy to learn and implement API routes",
						"Great performance characteristics for handling requests",
					],
					learningResources: [
						{
							name: "Express Documentation",
							url: "https://expressjs.com/en/4x/api.html",
						},
						{
							name: "Express Tutorial",
							url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs",
						},
					],
					alternatives: [
						{
							name: "Fastify",
							reason: "Better performance but less mature ecosystem",
						},
						{
							name: "NestJS",
							reason: "More structured but higher learning curve",
						},
						{
							name: "Koa",
							reason: "More modern but less middleware available",
						},
					],
				},
			],
		},
		{
			id: "database",
			name: "Database",
			description: "Technologies for storing and retrieving application data.",
			color: "from-amber-500 to-orange-500",
			technologies: [
				{
					id: "postgresql",
					name: "PostgreSQL",
					description:
						"Powerful, open source object-relational database system.",
					url: "https://www.postgresql.org/",
					projectRelevance:
						"PostgreSQL is ideal for this project as it provides a robust, scalable database system that can handle complex relationships between projects, users, and features. Its JSONB capability also offers flexibility for storing varying project structures.",
					differentiators: [
						"Strong support for relational data and complex queries",
						"JSONB support for flexible schema when needed",
						"Advanced features like full-text search and geographic objects",
						"Excellent data integrity and ACID compliance",
					],
					learningResources: [
						{
							name: "PostgreSQL Documentation",
							url: "https://www.postgresql.org/docs/",
						},
						{
							name: "PostgreSQL Tutorial",
							url: "https://www.postgresqltutorial.com/",
						},
					],
					alternatives: [
						{
							name: "MySQL",
							reason: "Simpler setup but fewer advanced features",
						},
						{
							name: "MongoDB",
							reason: "Better for document data but less relational",
						},
						{
							name: "SQLite",
							reason: "Lighter weight but not suitable for production",
						},
					],
				},
			],
		},
		{
			id: "deployment",
			name: "Deployment",
			description: "Services for hosting and deploying your application.",
			color: "from-violet-500 to-purple-500",
			technologies: [
				{
					id: "vercel",
					name: "Vercel",
					description: "Platform for frontend frameworks and static sites.",
					url: "https://vercel.com/",
					projectRelevance:
						"Vercel is the perfect deployment platform for this project as it's optimized for Next.js applications, providing automated deployments, preview environments, and serverless functions for API routes.",
					differentiators: [
						"Built by the creators of Next.js with optimized deployment pipeline",
						"Automatic preview deployments for pull requests",
						"Edge network for fast global content delivery",
						"Serverless functions support for API routes",
					],
					learningResources: [
						{ name: "Vercel Documentation", url: "https://vercel.com/docs" },
						{
							name: "Vercel Deployment Guide",
							url: "https://vercel.com/guides/deploying-nextjs-with-vercel",
						},
					],
					alternatives: [
						{
							name: "Netlify",
							reason: "Similar features but not Next.js-optimized",
						},
						{
							name: "AWS Amplify",
							reason: "More AWS integration but more complex",
						},
					],
				},
				{
					id: "railway",
					name: "Railway",
					description:
						"Infrastructure platform for backend and database hosting.",
					url: "https://railway.app/",
					projectRelevance:
						"Railway provides simple yet powerful infrastructure for deploying the backend services and database for this project. Its simplicity compared to traditional cloud providers speeds up the development process.",
					differentiators: [
						"Simple deployment without complex cloud configuration",
						"Automatic database provisioning and management",
						"Built-in CI/CD for seamless deployments",
						"Reasonable pricing model for startups and small projects",
					],
					learningResources: [
						{
							name: "Railway Documentation",
							url: "https://docs.railway.app/",
						},
						{
							name: "Railway Deployment Guide",
							url: "https://blog.railway.app/p/railway-nextjs",
						},
					],
					alternatives: [
						{
							name: "Heroku",
							reason: "Easier to use but more expensive at scale",
						},
						{
							name: "Render",
							reason: "Similar features but younger platform",
						},
						{
							name: "DigitalOcean App Platform",
							reason: "More control but more complex",
						},
					],
				},
			],
		},
	],
};




"Roadmap" IS EXACTLY structured with this template:

RoadmapData {
  projectName: string;
  projectDescription: string;
  startDate: string;
  milestones: {
    milestone1: Milestone[];
    milestone2: Milestone[];
    milestone3: Milestone[];
    milestone4: Milestone[];
  };
}

projectName and projectDescription should match the project name and description from features
startDate should be todays current date

export interface Task {
  id: string;
  title: string;  // We don't use this in the UI but need it to identify tasks
  description: string; // We don't use this in the UI but kept for possible future use
  estimatedTime: {
    value: number;
    unit: 'days' | 'weeks' | 'months';
  };
}

A task is a feature and should almost directly correspond to the AIFeature generated, *THERE SHOULD BE AS MANY TASKS AS AIFEATURES GENERATED

export interface Milestone {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  tasks: Task[];
  dependencies?: string[];  // IDs of milestones that this one depends on
}

A milestone is a step that a user needs to complete which is used to group and put tasks in a category of completion
*MILESTONES SHOULD BE IN AN ORDER OF COMPLETITION THAT FOLLOWS THE FLOW OF DEPENDENCIES, USER CANNOT WORK ON SOMETHING IF ITS PREDESECCOR HAS NOT BEEN COMPLETED
*MILESTONES SHOULD BE SPLIT UP EVENLY TIMEWISE THROUGH MILESTONE1 MILESTONE2 MILESTONE3 AND MILESTONE4
*ALL MILESTONES MUST HAVE AT LEAST ONE MILESTONE
***THERE SHOULD BE EXACTLY FOUR MILESTONES, THIS IS A RULE NOT ONE LESS OR ONE MORE MILESTONE EXACTLY 4***

here is an example of what it should look like HOWEVER ABSOLUTELY DO NOT, I REPEAT DO NOT COPY THIS EXAMPLE VERBATIM, SIMPLY USE IT AS A REFERENCE:

exampleRoadmap_DO_NOT_COPY_DIRECTLY: RoadmapData = {
  projectName: "Learning Platform MVP",
  projectDescription: "First version of our collaborative learning platform with core features",
  startDate: "2023-06-01",
  milestones: {
	milestone1: [
	  {
		id: "ms-1",
		title: "Project Setup & Architecture",
		description: "Initialize repository, set up development environment, and define architecture. This milestone focuses on establishing the foundation for the entire project, ensuring that the team has the necessary tools and environments to work efficiently.",
		priority: "high",
		tasks: [
		  { 
			id: "t-1-1", 
			title: "Create repository and project structure", 
			description: "Set up Git repository with branch protection rules",
			estimatedTime: { value: 3, unit: 'days' }
		  },
		  { 
			id: "t-1-2", 
			title: "Set up CI/CD pipeline", 
			description: "Configure automated testing and deployment",
			estimatedTime: { value: 1, unit: 'weeks' }
		  },
		  { 
			id: "t-1-3", 
			title: "Define database schema", 
			description: "Design database models and relationships",
			estimatedTime: { value: 5, unit: 'days' }
		  },
		  { 
			id: "t-1-4", 
			title: "Create system architecture diagram", 
			description: "Document the overall system architecture",
			estimatedTime: { value: 3, unit: 'days' }
		  }
		],
		dependencies: []
	  },
	  {
		id: "ms-2",
		title: "Authentication System",
		description: "Implement user authentication with email and social logins. This system will provide secure access control and user identity management across the platform.",
		priority: "critical",
		tasks: [
		  { 
			id: "t-2-1", 
			title: "Implement email authentication", 
			description: "Build registration, login, and verification",
			estimatedTime: { value: 1, unit: 'weeks' }
		  },
		  { 
			id: "t-2-2", 
			title: "Add social login options", 
			description: "Integrate OAuth providers",
			estimatedTime: { value: 4, unit: 'days' }
		  },
		  { 
			id: "t-2-3", 
			title: "Create user profile storage", 
			description: "Implement database models for profiles",
			estimatedTime: { value: 3, unit: 'days' }
		  }
		],
		dependencies: ["ms-1"]
	  }
	],
	milestone2: [
	  {
		id: "ms-3",
		title: "User Profile Management",
		description: "Build profile creation, editing, and skill assessment features. This milestone focuses on allowing users to create rich profiles showcasing their skills and learning goals.",
		priority: "high",
		tasks: [
		  { 
			id: "t-3-1", 
			title: "Create profile editing interfaces", 
			description: "Build UI for profile editing",
			estimatedTime: { value: 1, unit: 'weeks' }
		  },
		  { 
			id: "t-3-2", 
			title: "Implement skill selection system", 
			description: "Create a skill taxonomy and selection",
			estimatedTime: { value: 2, unit: 'weeks' }
		  },
		  { 
			id: "t-3-3", 
			title: "Build profile visibility settings", 
			description: "Implement privacy controls",
			estimatedTime: { value: 3, unit: 'days' }
		  },
		  { 
			id: "t-3-4", 
			title: "Add progress tracking features", 
			description: "Build learning progress visualizations",
			estimatedTime: { value: 1, unit: 'weeks' }
		  }
		],
		dependencies: ["ms-2"]
	  },
	  {
		id: "ms-4",
		title: "Matching Algorithm",
		description: "Develop the algorithm to match students with suitable mentors based on skills, learning goals, and availability. The matching system is a core differentiator for the platform.",
		priority: "high",
		tasks: [
		  { 
			id: "t-4-1", 
			title: "Research matching algorithms", 
			description: "Investigate recommendation systems",
			estimatedTime: { value: 1, unit: 'weeks' }
		  },
		  { 
			id: "t-4-2", 
			title: "Define matching criteria", 
			description: "Establish parameters for matching",
			estimatedTime: { value: 4, unit: 'days' }
		  },
		  { 
			id: "t-4-3", 
			title: "Implement matching engine", 
			description: "Build the core algorithm",
			estimatedTime: { value: 2, unit: 'weeks' }
		  }
		],
		dependencies: ["ms-3"]
	  }
	],
	milestone3: [
	  {
		id: "ms-5",
		title: "Messaging System",
		description: "Build real-time messaging between mentors and students to facilitate communication and collaboration. The messaging system will support text, attachments, and code snippets.",
		priority: "medium",
		tasks: [
		  { 
			id: "t-5-1", 
			title: "Set up WebSocket connections", 
			description: "Implement real-time infrastructure",
			estimatedTime: { value: 1, unit: 'weeks' }
		  },
		  { 
			id: "t-5-2", 
			title: "Create chat UI", 
			description: "Build conversation interfaces",
			estimatedTime: { value: 1, unit: 'weeks' }
		  },
		  { 
			id: "t-5-3", 
			title: "Implement message storage", 
			description: "Design database schema for messages",
			estimatedTime: { value: 4, unit: 'days' }
		  }
		],
		dependencies: ["ms-2"]
	  },
	  {
		id: "ms-6",
		title: "Virtual Classroom",
		description: "Basic implementation of the shared learning workspace with whiteboarding tools, screen sharing, and collaborative editing. This creates an interactive environment for teaching and learning.",
		priority: "medium",
		tasks: [
		  { 
			id: "t-6-1", 
			title: "Research whiteboard solutions", 
			description: "Evaluate whiteboarding libraries",
			estimatedTime: { value: 5, unit: 'days' }
		  },
		  { 
			id: "t-6-2", 
			title: "Implement screen sharing", 
			description: "Integrate WebRTC for sharing",
			estimatedTime: { value: 2, unit: 'weeks' }
		  },
		  { 
			id: "t-6-3", 
			title: "Build collaborative editing", 
			description: "Implement document editing",
			estimatedTime: { value: 3, unit: 'weeks' }
		  },
		  { 
			id: "t-6-4", 
			title: "Create session recording", 
			description: "Add recording functionality",
			estimatedTime: { value: 1, unit: 'weeks' }
		  }
		],
		dependencies: ["ms-5"]
	  }
	],
	milestone4: [
	  {
		id: "ms-7",
		title: "Testing & QA",
		description: "Comprehensive testing of all implemented features to ensure quality, security, and performance. This milestone will identify and address issues before launch.",
		priority: "critical",
		tasks: [
		  { 
			id: "t-7-1", 
			title: "Write unit tests", 
			description: "Create test suite",
			estimatedTime: { value: 2, unit: 'weeks' }
		  },
		  { 
			id: "t-7-2", 
			title: "Perform integration testing", 
			description: "Test system components",
			estimatedTime: { value: 1, unit: 'weeks' }
		  },
		  { 
			id: "t-7-3", 
			title: "Conduct user acceptance testing", 
			description: "Get feedback from test users",
			estimatedTime: { value: 2, unit: 'weeks' }
		  },
		  { 
			id: "t-7-4", 
			title: "Fix identified issues", 
			description: "Address discovered bugs",
			estimatedTime: { value: 3, unit: 'weeks' }
		  }
		],
		dependencies: ["ms-3", "ms-4", "ms-5", "ms-6"]
	  },
	  {
		id: "ms-8",
		title: "Deployment & Launch",
		description: "Final preparations for production deployment and public launch, including documentation, performance optimization, and setup of monitoring systems.",
		priority: "high",
		tasks: [
		  { 
			id: "t-8-1", 
			title: "Optimize performance", 
			description: "Implement performance optimizations",
			estimatedTime: { value: 1, unit: 'weeks' }
		  },
		  { 
			id: "t-8-2", 
			title: "Create documentation", 
			description: "Write user guides and docs",
			estimatedTime: { value: 1, unit: 'weeks' }
		  },
		  { 
			id: "t-8-3", 
			title: "Set up monitoring", 
			description: "Implement logging and alerts",
			estimatedTime: { value: 5, unit: 'days' }
		  },
		  { 
			id: "t-8-4", 
			title: "Configure production environment", 
			description: "Set up production infrastructure",
			estimatedTime: { value: 1, unit: 'weeks' }
		  },
		  {
			id: "t-8-5",
			title: "Conduct launch activities",
			description: "Execute marketing for launch",
			estimatedTime: { value: 1, unit: 'weeks' }
		  }
		],
		dependencies: ["ms-7"]
	  }
	]
  }
};






Here are some rules to follow:

DO NOT generate any text, I only expect you to give me JSONs,
DO NOT EVER format the JSON with markdown no matter what,
DO NOT EVER format the JSON object with '''json{}''', JUST GIVE THE JSON OBJECT {}



`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
	model: modelVersion,
	systemInstruction: systemPrompt,
});

const chat = model.startChat({
	history: [],
	generationConfig: {
        responseMimeType: "application/json"
    }
});

export { genAI, model, chat };
