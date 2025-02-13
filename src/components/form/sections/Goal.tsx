// src/components/Form/sections/Goals.tsx
"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormData } from "@/types/form";

type GoalsProps = {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const PRIMARY_GOALS = [
	{
		id: "learning",
		label: "Learning new skills",
		description:
			"I want to improve my knowledge and learn new technologies",
	},
	{
		id: "portfolio",
		label: "Building a portfolio piece",
		description: "I want to create something that showcases my abilities",
	},
	{
		id: "problem_solving",
		label: "Solving a real-world problem",
		description: "I want to address a specific need or challenge",
	},
	{
		id: "fun",
		label: "Personal project",
		description: "I want to work on something fun and engaging",
	},
	{
		id: "other",
		label: "Other",
		description: "I have a different goal in mind",
	},
];

export default function Goals({ formData, setFormData }: GoalsProps) {
	return (
		<div className="space-y-12">
			{/* Primary Goal Selection */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-6">
					What is your primary goal for this project?
				</h3>
				<div className="grid grid-cols-2 gap-4">
					{PRIMARY_GOALS.map((goal) => (
						<div
							key={goal.id}
							className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer select-none
                                ${
									formData.primaryGoal === goal.id
										? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 transform scale-[1.02]"
										: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
								}`}
							onClick={() =>
								setFormData((prev) => ({
									...prev,
									primaryGoal:
										goal.id as typeof formData.primaryGoal,
									goalDetails: "", // Reset details when changing primary goal
								}))
							}
						>
							<div className="space-y-2">
								<h4
									className={`font-semibold transition-colors
                                    ${
										formData.primaryGoal === goal.id
											? "text-indigo-700"
											: "text-gray-700"
									}`}
								>
									{goal.label}
								</h4>
								<p className="text-sm text-gray-500">
									{goal.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Conditional Follow-up Question */}
			{formData.primaryGoal && (
				<div className="animate-fadeIn">
					<h3 className="text-xl font-semibold text-gray-800 mb-4">
						{formData.primaryGoal === "learning" &&
							"What specific skills or technologies do you hope to learn?"}
						{formData.primaryGoal === "portfolio" &&
							"What kind of projects do you think would impress potential employers?"}
						{formData.primaryGoal === "problem_solving" &&
							"Can you briefly describe the problem you'd like to address?"}
						{formData.primaryGoal === "fun" &&
							"What kind of project would you find most engaging?"}
						{formData.primaryGoal === "other" &&
							"Tell us more about your goal:"}
					</h3>
					<div className="bg-white rounded-xl border-2 border-gray-200 p-4">
						<textarea
							className="w-full min-h-[100px] resize-none border-none focus:ring-0 text-gray-700 placeholder:text-gray-400"
							placeholder="Share your thoughts..."
							value={formData.goalDetails || ""}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									goalDetails: e.target.value,
								}))
							}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
