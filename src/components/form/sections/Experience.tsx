"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormData } from "@/types/form";

// Types
type ExperienceProps = {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const TECHNOLOGIES = [
	{ id: "web", label: "Web Development (HTML, CSS, JavaScript)" },
	{ id: "mobile", label: "Mobile Development" },
	{ id: "database", label: "Databases" },
	{ id: "cloud", label: "Cloud Services" },
	{ id: "ml", label: "Machine Learning/AI" },
	{ id: "game", label: "Game Development" },
	{ id: "backend", label: "Backend Development" },
];

export default function Experience({ formData, setFormData }: ExperienceProps) {
	return (
		<div className="space-y-8">
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					What's your programming experience level?
				</h3>
				<div className="relative w-full max-w-xl mx-auto">
					<RadioGroup
						className="grid grid-cols-3 relative bg-white rounded-full border-2 border-indigo-500 p-1 overflow-hidden"
						value={formData.experienceLevel}
						onValueChange={(value) =>
							setFormData((prev) => ({
								...prev,
								experienceLevel: value,
							}))
						}
					>
						{/* Moving Highlight */}
						<div
							className={`absolute transition-all duration-200 h-[calc(100%-8px)] top-1 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500
                                ${
									formData.experienceLevel === "beginner"
										? "left-1 w-[calc(33.33%-4px)]"
										: ""
								}
                                ${
									formData.experienceLevel === "intermediate"
										? "left-[33.33%] w-[calc(33.33%-4px)]"
										: ""
								}
                                ${
									formData.experienceLevel === "advanced"
										? "left-[66.66%] w-[calc(33.33%-4px)]"
										: ""
								}
                            `}
						/>
						{/* Radio Buttons */}
						<div className="relative">
							<RadioGroupItem
								value="beginner"
								id="beginner"
								className="sr-only"
							/>
							<Label
								htmlFor="beginner"
								className={`block text-center py-2 px-4 rounded-full cursor-pointer transition-colors relative z-10 select-none
                                    ${
										formData.experienceLevel === "beginner"
											? "text-white"
											: "text-gray-600 hover:text-indigo-600"
									}
                                `}
							>
								Beginner
							</Label>
						</div>
						<div className="relative">
							<RadioGroupItem
								value="intermediate"
								id="intermediate"
								className="sr-only"
							/>
							<Label
								htmlFor="intermediate"
								className={`block text-center py-2 px-4 rounded-full cursor-pointer transition-colors relative z-10 select-none
                                    ${
										formData.experienceLevel ===
										"intermediate"
											? "text-white"
											: "text-gray-600 hover:text-indigo-600"
									}
                                `}
							>
								Intermediate
							</Label>
						</div>
						<div className="relative">
							<RadioGroupItem
								value="advanced"
								id="advanced"
								className="sr-only"
							/>
							<Label
								htmlFor="advanced"
								className={`block text-center py-2 px-4 rounded-full cursor-pointer transition-colors relative z-10 select-none
                                    ${
										formData.experienceLevel === "advanced"
											? "text-white"
											: "text-gray-600 hover:text-indigo-600"
									}
                                `}
							>
								Advanced
							</Label>
						</div>
					</RadioGroup>
				</div>
			</div>
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					Which technologies have you worked with?
				</h3>
				<div className="grid grid-cols-2 gap-4">
					{TECHNOLOGIES.map((tech) => (
						<div
							key={tech.id}
							className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none
                                                        ${
															formData.technologies.includes(
																tech.id
															)
																? "border-indigo-500 bg-indigo-50"
																: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
														}`}
							onClick={() => {
								setFormData((prev) => ({
									...prev,
									technologies: prev.technologies.includes(
										tech.id
									)
										? prev.technologies.filter(
												(t) => t !== tech.id
										  )
										: [...prev.technologies, tech.id],
								}));
							}}
						>
							<Label className="font-medium cursor-pointer">
								{tech.label}
							</Label>
						</div>
					))}

					{/* Other option */}
					<div
						className={`p-4 h-16 rounded-xl border-2 transition-all duration-200 cursor-pointer
                                                        ${
															formData.otherTechnologies !==
															undefined
																? "border-indigo-500 bg-indigo-50"
																: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
														}`}
						onClick={() => {
							if (formData.otherTechnologies === undefined) {
								setFormData({
									...formData,
									otherTechnologies: "",
								});
							} else {
								setFormData({
									...formData,
									otherTechnologies: undefined,
								});
							}
						}}
					>
						<div className="flex items-center h-full">
							<Label className="font-medium">Other:</Label>
							{formData.otherTechnologies !== undefined && (
								<Input
									value={formData.otherTechnologies}
									onChange={(e) =>
										setFormData({
											...formData,
											otherTechnologies: e.target.value,
										})
									}
									onClick={(e) => e.stopPropagation()}
									className="border-0 bg-transparent focus:ring-0 ml-2 pl-2 h-8"
									placeholder="i.e. Python"
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
