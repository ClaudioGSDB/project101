"use client";
import { useState } from "react";

export default function Form() {
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		occupation: "",
		interests: "",
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
			<div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
				<h2 className="text-2xl font-bold text-center mb-6">
					Tell Us About Yourself
				</h2>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Full Name
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Age
						</label>
						<input
							type="number"
							name="age"
							value={formData.age}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Occupation
						</label>
						<input
							type="text"
							name="occupation"
							value={formData.occupation}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Interests
						</label>
						<textarea
							name="interests"
							value={formData.interests}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							rows={3}
							required
						/>
					</div>

					<button type="submit" className="text-blue-800">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
