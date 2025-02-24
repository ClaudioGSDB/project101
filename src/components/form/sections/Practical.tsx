// src/components/Form/sections/Practical.tsx
"use client";
import { Label } from "@/components/ui/label";
import { FormData } from "@/types/form";

type PracticalProps = {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const TIME_COMMITMENT = [
	{
		id: "few_hours",
		label: "A few hours per week",
		description: "I can work on it occasionally",
	},
	{
		id: "part_time",
		label: "10-20 hours per week",
		description: "I can dedicate significant time",
	},
	{
		id: "full_time",
		label: "40+ hours per week",
		description: "I can work on it full-time",
	},
	{
		id: "flexible",
		label: "Flexible schedule",
		description: "My time commitment may vary",
	},
];

const PROJECT_TIMELINE = [
	{ id: "short", label: "Short-term", description: "1-2 weeks" },
	{ id: "medium", label: "Medium-term", description: "1-2 months" },
	{ id: "long", label: "Long-term", description: "3+ months" },
	{
		id: "ongoing",
		label: "Ongoing/Flexible",
		description: "No specific timeline",
	},
];

const TEAM_PREFERENCE = [
	{
		id: "solo",
		label: "Solo Project",
		description: "I prefer working independently",
	},
	{
		id: "team",
		label: "Team Project",
		description: "I prefer collaborating with others",
	},
	{
		id: "either",
		label: "Either",
		description: "I'm comfortable with both options",
	},
];

const TEAM_SIZE = [
	{ id: "small", label: "Small Team", description: "2-3 people" },
	{ id: "medium", label: "Medium Team", description: "4-6 people" },
	{ id: "large", label: "Large Team", description: "7+ people" },
];

export default function Practical({ formData, setFormData }: PracticalProps) {
	return (
		<div className="space-y-12">
			{/* Time Commitment */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-6">
					How much time can you realistically commit to this project
					each week?
				</h3>
				<div className="grid grid-cols-2 gap-4">
					{TIME_COMMITMENT.map((time) => (
						<div
							key={time.id}
							className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer select-none
                                ${
									formData.timeCommitment === time.id
										? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 transform scale-[1.02]"
										: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
								}`}
							onClick={() =>
								setFormData((prev) => ({
									...prev,
									timeCommitment: time.id,
								}))
							}
						>
							<div className="space-y-2">
								<h4
									className={`font-semibold transition-colors
                                    ${
										formData.timeCommitment === time.id
											? "text-indigo-700"
											: "text-gray-700"
									}`}
								>
									{time.label}
								</h4>
								<p className="text-sm text-gray-500">
									{time.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Project Timeline */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-6">
					What is your ideal project timeline?
				</h3>
				<div className="grid grid-cols-2 gap-4">
					{PROJECT_TIMELINE.map((timeline) => (
						<div
							key={timeline.id}
							className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer select-none
                                ${
									formData.projectTimeline === timeline.id
										? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 transform scale-[1.02]"
										: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
								}`}
							onClick={() =>
								setFormData((prev) => ({
									...prev,
									projectTimeline: timeline.id,
								}))
							}
						>
							<div className="space-y-2">
								<h4
									className={`font-semibold transition-colors
                                    ${
										formData.projectTimeline === timeline.id
											? "text-indigo-700"
											: "text-gray-700"
									}`}
								>
									{timeline.label}
								</h4>
								<p className="text-sm text-gray-500">
									{timeline.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Team Preference */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-6">
					Do you prefer working solo or as part of a team?
				</h3>
				<div className="grid grid-cols-3 gap-4">
					{TEAM_PREFERENCE.map((pref) => (
						<div
							key={pref.id}
							className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer select-none
                                ${
									formData.teamPreference === pref.id
										? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 transform scale-[1.02]"
										: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
								}`}
							onClick={() =>
								setFormData((prev) => ({
									...prev,
									teamPreference: pref.id,
									teamSize:
										pref.id === "solo" ? "" : prev.teamSize,
								}))
							}
						>
							<div className="space-y-2">
								<h4
									className={`font-semibold transition-colors text-center
                                    ${
										formData.teamPreference === pref.id
											? "text-indigo-700"
											: "text-gray-700"
									}`}
								>
									{pref.label}
								</h4>
								<p className="text-sm text-gray-500 text-center">
									{pref.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Conditional Team Size */}
			{formData.teamPreference === "team" && (
				<div className="animate-fadeIn">
					<h3 className="text-xl font-semibold text-gray-800 mb-6">
						What is your preferred team size?
					</h3>
					<div className="grid grid-cols-3 gap-4">
						{TEAM_SIZE.map((size) => (
							<div
								key={size.id}
								className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer select-none
                                    ${
										formData.teamSize === size.id
											? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 transform scale-[1.02]"
											: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
									}`}
								onClick={() =>
									setFormData((prev) => ({
										...prev,
										teamSize: size.id,
									}))
								}
							>
								<div className="space-y-2">
									<h4
										className={`font-semibold transition-colors text-center
                                        ${
											formData.teamSize === size.id
												? "text-indigo-700"
												: "text-gray-700"
										}`}
									>
										{size.label}
									</h4>
									<p className="text-sm text-gray-500 text-center">
										{size.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Time Constraints */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					Are there any deadlines or time constraints?{" "}
					<span className="text-sm font-normal text-gray-500">
						(Optional)
					</span>
				</h3>
				<div className="bg-white rounded-xl border-2 border-gray-200 p-4">
					<textarea
						className="w-full min-h-[100px] resize-none border-none focus:ring-0 text-gray-700 placeholder:text-gray-400"
						placeholder="Share any specific deadlines or time constraints..."
						value={formData.timeConstraints}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								timeConstraints: e.target.value,
							}))
						}
					/>
				</div>
			</div>
		</div>
	);
}
