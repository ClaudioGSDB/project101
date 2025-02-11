// src/components/form/sections/Interests.tsx
"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormData } from "@/types/form";

type InterestsProps = {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const INTERESTS = [
	{ id: "ui", label: "Building user interfaces" },
	{ id: "data", label: "Working with data" },
	{ id: "algorithms", label: "Solving algorithms" },
	{ id: "automation", label: "Automation" },
	{ id: "mobile", label: "Mobile apps" },
	{ id: "ai", label: "AI/Machine Learning" },
	{ id: "gaming", label: "Gaming" },
	{ id: "business", label: "Business tools" },
];

const PROBLEM_TYPES = [
	{ id: "technical", label: "Technical challenges" },
	{ id: "ux", label: "User experience problems" },
	{ id: "business", label: "Business/efficiency problems" },
	{ id: "creative", label: "Creative/design problems" },
	{ id: "data", label: "Data analysis problems" },
];

export default function Interests({ formData, setFormData }: InterestsProps) {
	return (
		<div className="space-y-8">
			{/* Areas of Interest */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					What areas of technology interest you most?
				</h3>
				<div className="grid grid-cols-2 gap-4">
					{INTERESTS.map((interest) => (
						<div
							key={interest.id}
							className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none
                                ${
									formData.interests.includes(interest.id)
										? "border-indigo-500 bg-indigo-50"
										: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
								}`}
							onClick={() => {
								setFormData((prev) => ({
									...prev,
									interests: prev.interests.includes(
										interest.id
									)
										? prev.interests.filter(
												(t) => t !== interest.id
										  )
										: [...prev.interests, interest.id],
								}));
							}}
						>
							<Label className="font-medium cursor-pointer">
								{interest.label}
							</Label>
						</div>
					))}

					{/* Other Interest option */}
					<div
						className={`p-4 h-16 rounded-xl border-2 transition-all duration-200 cursor-pointer
                            ${
								formData.otherInterests !== undefined
									? "border-indigo-500 bg-indigo-50"
									: "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
							}`}
						onClick={() => {
							if (formData.otherInterests === undefined) {
								setFormData({
									...formData,
									otherInterests: "",
								});
							} else {
								setFormData({
									...formData,
									otherInterests: undefined,
								});
							}
						}}
					>
						<div className="flex items-center h-full">
							<Label className="font-medium">Other:</Label>
							{formData.otherInterests !== undefined && (
								<Input
									value={formData.otherInterests}
									onChange={(e) =>
										setFormData({
											...formData,
											otherInterests: e.target.value,
										})
									}
									onClick={(e) => e.stopPropagation()}
									className="border-0 bg-transparent focus:ring-0 ml-2 pl-2 h-8"
									placeholder="i.e. Blockchain"
								/>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Problem Types */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					What type of problems do you enjoy solving?
				</h3>
				<div className="flex flex-wrap gap-3">
					{PROBLEM_TYPES.map((type) => (
						<div
							key={type.id}
							className={`px-6 py-3 rounded-full transition-all duration-200 cursor-pointer select-none
                    ${
						formData.problemType === type.id
							? "bg-indigo-500 text-white ring-2 ring-indigo-500"
							: "bg-white ring-2 ring-gray-200 hover:ring-indigo-200"
					}`}
							onClick={() => {
								setFormData((prev) => ({
									...prev,
									problemType: type.id,
									otherProblemType: undefined,
								}));
							}}
						>
							<Label className="font-medium cursor-pointer">
								{type.label}
							</Label>
						</div>
					))}

					<div
						className={`px-6 h-12 rounded-full transition-all duration-200 cursor-pointer select-none flex items-center w-64
							${
								formData.otherProblemType !== undefined
									? "bg-indigo-500 text-white ring-2 ring-indigo-500"
									: "bg-white ring-2 ring-gray-200 hover:ring-indigo-200"
							}`}
						onClick={() => {
							if (formData.otherProblemType === undefined) {
								setFormData({
									...formData,
									otherProblemType: "",
									problemType: undefined,
								});
							} else {
								setFormData({
									...formData,
									otherProblemType: undefined,
								});
							}
						}}
					>
						<Label className="font-medium cursor-pointer whitespace-nowrap">
							Other:
						</Label>
						<Input
							value={formData.otherProblemType || ""}
							onChange={(e) =>
								setFormData({
									...formData,
									otherProblemType: e.target.value,
								})
							}
							onClick={(e) => e.stopPropagation()}
							className={`border-0 bg-transparent focus:ring-0 ml-2 flex-1 h-8
								${
									formData.otherProblemType !== undefined
										? "text-white placeholder:text-white/70"
										: "text-gray-500 pointer-events-none"
								}`}
							placeholder="i.e. System Design"
							disabled={formData.otherProblemType === undefined}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
