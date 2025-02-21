"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormData } from "@/types/form";
import { useRef } from "react";

type InterestsProps = {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const TECH_AREAS = [
	{
		id: "gaming",
		label: "Gaming & Entertainment",
		description: "Games, streaming platforms, media apps",
	},
	{
		id: "business",
		label: "Business & Finance",
		description: "Fintech, e-commerce, productivity tools",
	},
	{
		id: "social",
		label: "Social & Communication",
		description: "Social platforms, messaging, communities",
	},
	{
		id: "education",
		label: "Education & Learning",
		description: "Teaching tools, learning platforms",
	},
	{
		id: "health",
		label: "Health & Wellness",
		description: "Fitness tracking, medical apps, wellness",
	},
];

const DEV_PREFERENCES = [
	{
		id: "frontend",
		label: "Frontend Development",
		description: "Building beautiful user interfaces and experiences",
	},
	{
		id: "backend",
		label: "Backend Development",
		description: "Server-side logic, APIs, and databases",
	},
	{
		id: "fullstack",
		label: "Full-Stack Development",
		description: "End-to-end application development",
	},
	{
		id: "mobile",
		label: "Mobile Development",
		description: "iOS, Android, and cross-platform apps",
	},
	{
		id: "data",
		label: "Data & Analytics",
		description: "Data processing, visualization, and analysis",
	},
];

export default function Interests({ formData, setFormData }: InterestsProps) {
	const otherTecInputRef = useRef<HTMLInputElement>(null);
	const otherDevInputRef = useRef<HTMLInputElement>(null);
	return (
		<div className="space-y-12">
			{/* Areas of Interest */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-6">
					What areas of technology interest you most?
				</h3>
				<div className="grid grid-cols-2 gap-4">
					{TECH_AREAS.map((area) => (
						<div
							key={area.id}
							className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none
                                ${
									formData.techAreas.includes(area.id)
										? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50"
										: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
								}`}
							onClick={() => {
								setFormData((prev) => ({
									...prev,
									techAreas: prev.techAreas.includes(area.id)
										? prev.techAreas.filter(
												(a) => a !== area.id
										  )
										: [...prev.techAreas, area.id],
								}));
							}}
						>
							<div className="space-y-2">
								<h4
									className={`font-semibold transition-colors
                                    ${
										formData.techAreas.includes(area.id)
											? "text-indigo-700"
											: "text-gray-700"
									}`}
								>
									{area.label}
								</h4>
								<p className="text-sm text-gray-500">
									{area.description}
								</p>
							</div>
						</div>
					))}

					{/* Other option */}
					<div
						className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer h-full
                            ${
								formData.otherTechArea !== ""
									? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50"
									: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
							}`}
						onClick={() => {
							setFormData((prev) => ({
								...prev,
								otherTechArea:
									prev.otherTechArea === "" ? " " : "",
								techAreas:
									prev.otherTechArea === ""
										? [...prev.techAreas, "other"]
										: prev.techAreas.filter(
												(a) => a !== "other"
										  ),
							}));
							if (formData.otherTechArea === "") {
								setTimeout(() => {
									otherTecInputRef.current?.focus();
								}, 0);
							}
						}}
					>
						<div className="space-y-2">
							<h4
								className={`font-semibold transition-colors
                                ${
									formData.otherTechArea !== ""
										? "text-indigo-700"
										: "text-gray-700"
								}`}
							>
								Other Areas
							</h4>
							{formData.otherTechArea !== "" ? (
								<Input
									ref={otherTecInputRef}
									value={formData.otherTechArea}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											otherTechArea: e.target.value,
										}))
									}
									onClick={(e) => e.stopPropagation()}
									className="mt-2 border-0 bg-transparent focus:ring-0 p-0"
									placeholder="Tell us what interests you..."
								/>
							) : (
								<p className="text-sm text-gray-500">
									Other areas not listed above
								</p>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Development Preferences */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-6">
					What kind of development work do you find most engaging?
				</h3>
				<div className="grid grid-cols-2 gap-4">
					{DEV_PREFERENCES.map((pref) => (
						<div
							key={pref.id}
							className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none
                                ${
									formData.devPreferences.includes(pref.id)
										? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50"
										: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
								}`}
							onClick={() => {
								setFormData((prev) => ({
									...prev,
									devPreferences:
										prev.devPreferences.includes(pref.id)
											? prev.devPreferences.filter(
													(p) => p !== pref.id
											  )
											: [...prev.devPreferences, pref.id],
								}));
								setTimeout(() => {
									otherDevInputRef.current?.focus(); // Focus after React updates DOM
								}, 0);
							}}
						>
							<div className="space-y-2">
								<h4
									className={`font-semibold transition-colors
                                    ${
										formData.devPreferences.includes(
											pref.id
										)
											? "text-indigo-700"
											: "text-gray-700"
									}`}
								>
									{pref.label}
								</h4>
								<p className="text-sm text-gray-500">
									{pref.description}
								</p>
							</div>
						</div>
					))}

					{/* Other option */}
					<div
						className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer h-full
                            ${
								formData.otherDevPreference !== ""
									? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50"
									: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
							}`}
						onClick={() => {
							setFormData((prev) => ({
								...prev,
								otherDevPreference:
									prev.otherDevPreference === "" ? " " : "",
								devPreferences:
									prev.otherDevPreference === ""
										? [...prev.devPreferences, "other"]
										: prev.devPreferences.filter(
												(p) => p !== "other"
										  ),
							}));
						}}
					>
						<div className="space-y-2">
							<h4
								className={`font-semibold transition-colors
                                ${
									formData.otherDevPreference !== ""
										? "text-indigo-700"
										: "text-gray-700"
								}`}
							>
								Other Focus
							</h4>
							{formData.otherDevPreference !== "" ? (
								<Input
									ref={otherDevInputRef}
									value={formData.otherDevPreference}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											otherDevPreference: e.target.value,
										}))
									}
									onClick={(e) => e.stopPropagation()}
									className="mt-2 border-0 bg-transparent focus:ring-0 p-0"
									placeholder="Tell us what you prefer..."
								/>
							) : (
								<p className="text-sm text-gray-500">
									Other development focus not listed
								</p>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Optional Project Ideas */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					Do you have any specific project ideas in mind?{" "}
					<span className="text-sm font-normal text-gray-500">
						(Optional)
					</span>
				</h3>
				<div className="bg-white rounded-xl border-2 border-gray-200 p-4">
					<textarea
						className="w-full min-h-[100px] resize-none border-none focus:ring-0 text-gray-700 placeholder:text-gray-400"
						placeholder="Share any project ideas you're thinking about..."
						value={formData.projectIdeas}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								projectIdeas: e.target.value,
							}))
						}
					/>
				</div>
			</div>
		</div>
	);
}
