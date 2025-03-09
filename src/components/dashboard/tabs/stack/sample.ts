// src/components/dashboard/tabs/stack/sample.ts
export const stackData = {
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

// This would be the expected structure from the AI
export interface TechStackResponse {
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
