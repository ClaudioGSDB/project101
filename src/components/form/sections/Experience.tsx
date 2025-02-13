"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormData } from "@/types/form";

type ExperienceProps = {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const EXPERIENCE_LEVELS = [
	{
		id: "brand_new",
		label: "Brand New Explorer",
		description: "I'm new to programming and excited to start the journey",
	},
	{
		id: "learning_basics",
		label: "Learning the Ropes",
		description: "I'm currently learning the fundamentals of programming",
	},
	{
		id: "some_experience",
		label: "Building Experience",
		description: "I've built small projects and am comfortable with basics",
	},
	{
		id: "professional",
		label: "Seasoned Developer",
		description: "I work professionally building complex applications",
	},
];

const PROGRAMMING_LANGUAGES = [
	{ id: "javascript", label: "JavaScript" },
	{ id: "python", label: "Python" },
	{ id: "java", label: "Java" },
	{ id: "csharp", label: "C#" },
	{ id: "cpp", label: "C++" },
	{ id: "ruby", label: "Ruby" },
	{ id: "php", label: "PHP" },
	{ id: "swift", label: "Swift" },
	{ id: "go", label: "Go" },
	{ id: "rust", label: "Rust" },
];

const EXPERTISE_AREAS = [
	{ id: "web", label: "Web Development" },
	{ id: "mobile", label: "Mobile Development" },
	{ id: "data", label: "Data Science" },
	{ id: "backend", label: "Backend Development" },
	{ id: "devops", label: "DevOps" },
	{ id: "game", label: "Game Development" },
	{ id: "ai", label: "AI/Machine Learning" },
	{ id: "security", label: "Security" },
];

const YEARS_OF_EXPERIENCE = [
	{ id: "less_than_1", label: "Less than 1 year" },
	{ id: "1_2_years", label: "1-2 years" },
	{ id: "2_5_years", label: "2-5 years" },
	{ id: "5_plus_years", label: "5+ years" },
];

export default function Experience({ formData, setFormData }: ExperienceProps) {
	return (
		<div className="space-y-12">
			{/* Experience Level Selection */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-6">
					What is your current experience with programming?
				</h3>
				<div className="grid grid-cols-2 gap-4">
					{EXPERIENCE_LEVELS.map((level) => (
						<div
							key={level.id}
							className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer select-none
                                ${
									formData.experienceLevel === level.id
										? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 transform scale-[1.02]"
										: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
								}`}
							onClick={() =>
								setFormData((prev) => ({
									...prev,
									experienceLevel:
										level.id as typeof formData.experienceLevel,
								}))
							}
						>
							<div className="space-y-2">
								<h4
									className={`font-semibold transition-colors
                                    ${
										formData.experienceLevel === level.id
											? "text-indigo-700"
											: "text-gray-700"
									}`}
								>
									{level.label}
								</h4>
								<p className="text-sm text-gray-500">
									{level.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Conditional Question for Beginners */}
			{(formData.experienceLevel === "brand_new" ||
				formData.experienceLevel === "learning_basics") && (
				<div className="animate-fadeIn">
					<h3 className="text-xl font-semibold text-gray-800 mb-4">
						What areas of technology or programming interest you
						most?
					</h3>
					<div className="bg-white rounded-xl border-2 border-gray-200 p-4">
						<textarea
							className="w-full min-h-[100px] resize-none border-none focus:ring-0 text-gray-700 placeholder:text-gray-400"
							placeholder="Tell us what fascinates you about programming... For example: building websites, creating apps, working with data, etc."
							value={formData.techInterests || ""}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									techInterests: e.target.value,
								}))
							}
						/>
					</div>
				</div>
			)}

			{/* Programming Languages for Experienced Users */}
			{(formData.experienceLevel === "some_experience" ||
				formData.experienceLevel === "professional") && (
				<div className="animate-fadeIn">
					<h3 className="text-xl font-semibold text-gray-800 mb-4">
						Which programming languages are you comfortable using?
					</h3>
					<div className="flex flex-wrap gap-3">
						{PROGRAMMING_LANGUAGES.map((lang) => (
							<div
								key={lang.id}
								className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer select-none
                                    ${
										formData.languages.includes(lang.id)
											? "bg-indigo-500 text-white ring-2 ring-indigo-500"
											: "bg-white ring-2 ring-gray-200 hover:ring-indigo-200"
									}`}
								onClick={() => {
									setFormData((prev) => ({
										...prev,
										languages: prev.languages.includes(
											lang.id
										)
											? prev.languages.filter(
													(l) => l !== lang.id
											  )
											: [...prev.languages, lang.id],
									}));
								}}
							>
								<span className="font-medium">
									{lang.label}
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Expertise Areas */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					Which of these best describes your areas of expertise?
				</h3>
				<div className="grid grid-cols-2 gap-4">
					{EXPERTISE_AREAS.map((area) => (
						<div
							key={area.id}
							className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
                                ${
									formData.expertiseAreas.includes(area.id)
										? "border-indigo-500 bg-indigo-50"
										: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
								}`}
							onClick={() => {
								setFormData((prev) => ({
									...prev,
									expertiseAreas:
										prev.expertiseAreas.includes(area.id)
											? prev.expertiseAreas.filter(
													(a) => a !== area.id
											  )
											: [...prev.expertiseAreas, area.id],
								}));
							}}
						>
							<Label className="font-medium cursor-pointer">
								{area.label}
							</Label>
						</div>
					))}
				</div>
			</div>

			{/* Frameworks/Libraries */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					Are you familiar with any specific frameworks or libraries?
				</h3>
				<div className="bg-white rounded-xl border-2 border-gray-200 p-4">
					<textarea
						className="w-full min-h-[100px] resize-none border-none focus:ring-0 text-gray-700 placeholder:text-gray-400"
						placeholder="List any frameworks or libraries you're comfortable with... (e.g., React, Django, TensorFlow)"
						value={formData.frameworksLibraries || ""}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								frameworksLibraries: e.target.value,
							}))
						}
					/>
				</div>
			</div>
		</div>
	);
}
