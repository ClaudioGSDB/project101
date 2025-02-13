// src/components/Form/sections/Additional.tsx
"use client";
import { FormData } from "@/types/form";

type AdditionalProps = {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export default function Additional({ formData, setFormData }: AdditionalProps) {
	return (
		<div className="space-y-12">
			{/* Personal Growth */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					Are there any specific problems or challenges you're hoping
					the project will help you overcome?
					<span className="text-sm font-normal text-gray-500 ml-2">
						(Optional)
					</span>
				</h3>
				<p className="text-gray-500 mb-4 text-sm">
					This could be anything from improving specific skills to
					overcoming technical challenges.
				</p>
				<div className="bg-white rounded-xl border-2 border-gray-200 p-4">
					<textarea
						className="w-full min-h-[120px] resize-none border-none focus:ring-0 text-gray-700 placeholder:text-gray-400"
						placeholder="For example: I want to improve my understanding of databases, or I want to learn how to build scalable applications..."
						value={formData.challenges || ""}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								challenges: e.target.value,
							}))
						}
					/>
				</div>
			</div>

			{/* Constraints */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					Do you have any constraints or limitations we should be
					aware of?
					<span className="text-sm font-normal text-gray-500 ml-2">
						(Optional)
					</span>
				</h3>
				<p className="text-gray-500 mb-4 text-sm">
					This could include technical limitations, required
					technologies, or any other restrictions.
				</p>
				<div className="bg-white rounded-xl border-2 border-gray-200 p-4">
					<textarea
						className="w-full min-h-[120px] resize-none border-none focus:ring-0 text-gray-700 placeholder:text-gray-400"
						placeholder="For example: Must use specific technologies, need to work offline, limited computing resources..."
						value={formData.constraints || ""}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								constraints: e.target.value,
							}))
						}
					/>
				</div>
			</div>

			{/* Any other thoughts */}
			<div>
				<h3 className="text-xl font-semibold text-gray-800 mb-4">
					Anything else you'd like us to know?
					<span className="text-sm font-normal text-gray-500 ml-2">
						(Optional)
					</span>
				</h3>
				<p className="text-gray-500 mb-4 text-sm">
					Share any additional thoughts, preferences, or ideas that
					might help us suggest better projects.
				</p>
				<div className="bg-white rounded-xl border-2 border-gray-200 p-4">
					<textarea
						className="w-full min-h-[120px] resize-none border-none focus:ring-0 text-gray-700 placeholder:text-gray-400"
						placeholder="Any other thoughts or preferences..."
						value={formData.additionalNotes || ""}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								additionalNotes: e.target.value,
							}))
						}
					/>
				</div>
			</div>
		</div>
	);
}
