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
					alternatives: [
						{ name: "Gatsby", reason: "Better for static sites" },
						{ name: "Create React App", reason: "Simpler setup" },
					],
				},
				{
					id: "react",
					name: "React",
					description:
						"A JavaScript library for building user interfaces with components.",
					url: "https://react.dev/",
					alternatives: [],
				},
				{
					id: "tailwind",
					name: "Tailwind CSS",
					description:
						"A utility-first CSS framework for rapidly building custom designs.",
					url: "https://tailwindcss.com/",
					alternatives: [
						{
							name: "Bootstrap",
							reason: "More pre-built components",
						},
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
					alternatives: [],
				},
				{
					id: "express",
					name: "Express",
					description:
						"Fast, unopinionated, minimalist web framework for Node.js.",
					url: "https://expressjs.com/",
					alternatives: [
						{ name: "Fastify", reason: "Better performance" },
						{ name: "NestJS", reason: "More structured" },
					],
				},
			],
		},
		{
			id: "database",
			name: "Database",
			description:
				"Technologies for storing and retrieving application data.",
			color: "from-amber-500 to-orange-500",
			technologies: [
				{
					id: "postgresql",
					name: "PostgreSQL",
					description:
						"Powerful, open source object-relational database system.",
					url: "https://www.postgresql.org/",
					alternatives: [
						{ name: "MySQL", reason: "Simpler setup" },
						{ name: "MongoDB", reason: "Better for document data" },
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
					description:
						"Platform for frontend frameworks and static sites.",
					url: "https://vercel.com/",
					alternatives: [{ name: "Netlify", reason: "Better CI/CD" }],
				},
				{
					id: "railway",
					name: "Railway",
					description:
						"Infrastructure platform for backend and database hosting.",
					url: "https://railway.app/",
					alternatives: [
						{ name: "Heroku", reason: "Easier to use" },
						{ name: "Render", reason: "Similar features" },
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
			alternatives: {
				name: string;
				reason?: string;
			}[];
		}[];
	}[];
}
