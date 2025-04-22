const { GoogleGenerativeAI } = require("@google/generative-ai");
import { jsonrepair } from "jsonrepair";

if (!process.env.GEMINI_API_KEY) {
	throw new Error("Missing Gemini API Key");
}

const modelVersion = "gemini-1.5-flash";

// Feature generation prompt
const featurePrompt = `
You are a JSON generator for project specifications. Generate a Feature object for a project based on the user preferences.

REQUIRED OUTPUT FORMAT:
{
  "project_name": "...",
  "project_description": "...",
  "categories": [...]
}

INSTRUCTIONS:
1. DIVERSITY REQUIREMENT: Generate a project in ANY domain - software, mobile, data science, embedded systems, AI, IoT, gaming, etc. DO NOT default to web development.

2. FEATURE OBJECT - Create exactly this structure:
   - project_name: Short, creative project name
   - project_description: Brief description (1-2 sentences)
   - categories: Array of 8-10 categories, each containing:
     - category_id: String identifier (lowercase with underscores)
     - category_name: Human-readable category name
     - category_description: Brief description
     - color: Use unique Tailwind gradient (e.g., "from-indigo-500 to-blue-500")
     - features: Array of EXACTLY 8-10 feature objects PER CATEGORY

   Each feature must have:
   - feature_id: String identifier (lowercase with underscores)
   - feature_name: Human-readable name
   - feature_description: Brief description
   - bullet_points: Array of 3-5 implementation tasks
   - related_features: Array of feature_ids that relate to this feature
   - complexity: One of "simple", "moderate", "complex"
   - user_value: One of "low", "medium", "high"
   - implementation_details: Optional implementation notes

IMPORTANT REMINDERS:
- DO NOT include any explanatory text outside the JSON
- DO NOT use markdown formatting
- DO NOT wrap the JSON in code blocks
- Provide ONLY the raw JSON object
- Ensure diversity in project types (not just web development)
`;

// Stack generation prompt
const stackPrompt = `
You are a JSON generator for project specifications. Generate a Stack object for a project.

REQUIRED OUTPUT FORMAT:
{
  "projectType": "...",
  "description": "...",
  "categories": [...]
}

INSTRUCTIONS:
1. STACK OBJECT - Create exactly this structure:
   - projectType: Type of project (be diverse - not just web)
   - description: Brief technology stack description
   - categories: Array of 4-6 technology categories, each containing:
     - id: String identifier
     - name: Human-readable name
     - description: Brief description
     - color: Unique Tailwind gradient
     - technologies: Array of 2-5 technology objects

   Each technology must have:
   - id: String identifier
   - name: Technology name
   - description: Brief description
   - url: Optional link to official site
   - projectRelevance: Why it's relevant to this project
   - differentiators: Array of 3-5 advantages
   - learningResources: Array of 2-3 resources with name/url
   - alternatives: Array of 2-3 alternatives with name/reason

IMPORTANT REMINDERS:
- DO NOT include any explanatory text outside the JSON
- DO NOT use markdown formatting
- DO NOT wrap the JSON in code blocks
- Provide ONLY the raw JSON object
- Ensure technology stack matches the provided Feature context
`;

// Roadmap generation prompt
const roadmapPrompt = `
You are a JSON generator for project specifications. Generate a Roadmap object for a project.

REQUIRED OUTPUT FORMAT:
{
  "projectName": "...",
  "projectDescription": "...",
  "startDate": "YYYY-MM-DD",
  "milestones": {...}
}

INSTRUCTIONS:
1. ROADMAP OBJECT - Create exactly this structure:
   - projectName: Same as the Feature.project_name provided
   - projectDescription: Same as the Feature.project_description provided
   - startDate: Current date (YYYY-MM-DD format)
   - milestones: Object with EXACTLY 4 milestone groups:
     - milestone1: First phase tasks
     - milestone2: Second phase tasks
     - milestone3: Third phase tasks
     - milestone4: Final phase tasks

   Each milestone array must contain 2-3 milestone objects with:
   - id: String identifier (e.g., "ms-1")
   - title: Descriptive milestone name
   - description: Detailed milestone description
   - priority: One of "low", "medium", "high", "critical"
   - tasks: Array of 3-5 task objects
   - dependencies: Array of prerequisite milestone IDs

   Each task must have:
   - id: String identifier (e.g., "t-1-1")
   - title: Task name
   - description: Brief description
   - estimatedTime: Object with value (number) and unit ("days"|"weeks"|"months")

IMPORTANT REMINDERS:
- DO NOT include any explanatory text outside the JSON
- DO NOT use markdown formatting
- DO NOT wrap the JSON in code blocks
- Provide ONLY the raw JSON object
- Tasks should be based on the features from the provided Feature context
- Distribute tasks logically across the 4 milestone groups
- Ensure dependency relationships make logical sense
`;

// Project update prompt
const projectUpdatePrompt = `
You are a JSON generator for project updates. Your task is to modify project data based on user instructions.

REQUIRED OUTPUT FORMAT:
{
  "Features": { ... updated Features data ... },
  "Stack": { ... updated Stack data ... },
  "Roadmap": { ... updated Roadmap data ... }
}

INSTRUCTIONS:
1. The user will provide a message requesting changes to their project.
2. The current project data will be provided in JSON format containing Features, Stack, and Roadmap objects.
3. You must analyze the user's request and modify the appropriate parts of the JSON.
4. Return the COMPLETE updated project data, maintaining the same structure but with the requested changes applied.
5. Do not add any explanation or commentary outside the JSON.

IMPORTANT GUIDELINES:
- Maintain all existing object structures and naming conventions.
- Make minimal changes - only modify what's explicitly requested.
- Ensure all IDs remain consistent and create new unique IDs for new items.
- Keep the same format for timestamps and dates.
- Make changes as natural as possible - they should fit with the existing project.
`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate Feature object
async function generateFeature(formData: string) {
	const model = genAI.getGenerativeModel({
		model: modelVersion,
		systemInstruction: featurePrompt,
	});

	const chat = model.startChat({
		history: [],
		generationConfig: {
			responseMimeType: "application/json",
		},
	});

	return await chat.sendMessage(
		`Generate a Feature object based on these user preferences: ${formData}`
	);
}

// Generate Stack object
async function generateStack(formData: string, featureContext: string) {
	const model = genAI.getGenerativeModel({
		model: modelVersion,
		systemInstruction: stackPrompt,
	});

	const chat = model.startChat({
		history: [],
		generationConfig: {
			responseMimeType: "application/json",
		},
	});

	return await chat.sendMessage(
		`Generate a Stack object for this Feature context: ${JSON.stringify(
			featureContext
		)}. User preferences: ${formData}`
	);
}

// Generate Roadmap object
async function generateRoadmap(
	formData: string,
	featureContext: string,
	stackContext: string
) {
	const model = genAI.getGenerativeModel({
		model: modelVersion,
		systemInstruction: roadmapPrompt,
	});

	const chat = model.startChat({
		history: [],
		generationConfig: {
			responseMimeType: "application/json",
		},
	});

	return await chat.sendMessage(
		`Generate a Roadmap object for this project. Feature context: ${JSON.stringify(
			featureContext
		)}. Stack context: ${JSON.stringify(stackContext)}. User preferences: ${formData}`
	);
}

// Process project updates based on user messages
async function processProjectUpdate(userMessage: string, projectData: any) {
	const model = genAI.getGenerativeModel({
		model: modelVersion,
		systemInstruction: projectUpdatePrompt,
	});

	const chat = model.startChat({
		history: [],
		generationConfig: {
			responseMimeType: "application/json",
		},
	});

	// Send the user message and project data to Gemini
	const response = await chat.sendMessage(`
    User message: ${userMessage}
    
    Current project data: ${JSON.stringify(projectData)}
    
    Please analyze the user message and return an updated version of the project data with any requested changes applied.
  `);

	const responseText = response.text();

	// Direct parsing without repair
	let result;
	try {
		result = JSON.parse(responseText);
	} catch (jsonError) {
		console.error("JSON parse error:", jsonError);
		throw new Error("Unable to process response: Invalid JSON format");
	}

	return result;
}

export { genAI, generateFeature, generateStack, generateRoadmap, processProjectUpdate };
