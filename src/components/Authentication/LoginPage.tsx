// src/components/Authentication/LoginPage.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Calendar, ArrowRight, Loader2 } from "lucide-react";

interface LoginPageProps {
	onClose?: () => void;
	initialTab?: "login" | "signup";
}

type FormData = {
	email: string;
	password: string;
	name: string;
	dob: string;
	confirmationCode?: string;
};

type FormError = {
	message: string;
	field?: keyof FormDataEvent;
};

export function LoginPage({ onClose, initialTab = "login" }: LoginPageProps) {
	const [activeTab, setActiveTab] = useState<"login" | "signup" | "confirm">(
		initialTab
	);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<FormError | null>(null);
	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
		name: "",
		dob: "",
		confirmationCode: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		setError(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			if (activeTab === "login") {
				const response = await fetch("/api/auth/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: formData.email,
						password: formData.password,
					}),
				});

				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.message || "Login failed");
				}

				onClose?.();
			} else if (activeTab === "signup") {
				const response = await fetch("/api/auth/signup", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: formData.email,
						password: formData.password,
						name: formData.name,
						dob: formData.dob,
					}),
				});

				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.message || "Signup failed");
				}

				setActiveTab("confirm");
			} else if (activeTab === "confirm") {
				if (!formData.confirmationCode?.trim()) {
					throw new Error("Please enter the verification code");
				}

				const response = await fetch("/api/auth/confirm", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: formData.email,
						confirmationCode: formData.confirmationCode.trim(),
					}),
				});

				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.message || "Confirmation failed");
				}

				setActiveTab("login");
				setFormData((prev) => ({ ...prev, confirmationCode: "" }));
			}
		} catch (error: any) {
			setError({ message: error.message || "An error occurred" });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-white rounded-xl overflow-hidden p-0">
			<div className="w-full max-w-md bg-transpa rounded-xl shadow-lg min-h-[520px] flex flex-col">
				{/* Tabs */}
				{activeTab !== "confirm" && (
					<div className="flex border-b rounded-xl">
						<button
							className={`flex-1 py-3 text-sm font-medium transition-all duration-300 rounded-tl-xl 
							${
								activeTab === "login"
									? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white"
									: "text-gray-600 hover:bg-gray-50"
							}`}
							onClick={() => setActiveTab("login")}
							disabled={isLoading}
						>
							Log In
						</button>
						<button
							className={`flex-1 py-3 text-sm font-medium transition-all duration-300 rounded-tr-xl
							${
								activeTab === "signup"
									? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white"
									: "text-gray-600 hover:bg-gray-50"
							}`}
							onClick={() => setActiveTab("signup")}
							disabled={isLoading}
						>
							Create Account
						</button>
					</div>
				)}

				{/* Form */}
				<form onSubmit={handleSubmit} className="p-6 flex-grow flex flex-col">
					<div className="space-y-4">
						{activeTab === "confirm" ? (
							<>
								<div className="text-center mb-6">
									<h2 className="text-xl font-semibold text-gray-800 mb-2">
										Verify Your Email
									</h2>
									<p className="text-gray-600">
										Please enter the verification code sent to{" "}
										{formData.email}
									</p>
								</div>
								<div>
									<Label htmlFor="confirmationCode">
										Verification Code
									</Label>
									<Input
										id="confirmationCode"
										name="confirmationCode"
										type="text"
										value={formData.confirmationCode}
										onChange={handleInputChange}
										placeholder="Enter verification code"
										required
									/>
								</div>
							</>
						) : (
							<>
								{/* Email Field */}
								<div>
									<Label
										htmlFor="email"
										className="flex items-center mb-2"
									>
										<Mail className="w-4 h-4 mr-2 text-gray-500" />
										Email Address
									</Label>
									<Input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleInputChange}
										placeholder="Enter your email"
										required
									/>
								</div>
								{/* Additional Signup Fields */}
								{activeTab === "signup" && (
									<>
										<div>
											<Label
												htmlFor="name"
												className="flex items-center mb-2"
											>
												<User className="w-4 h-4 mr-2 text-gray-500" />
												Full Name
											</Label>
											<Input
												id="name"
												name="name"
												type="text"
												value={formData.name}
												onChange={handleInputChange}
												placeholder="Enter your full name"
												required
											/>
										</div>

										<div>
											<Label
												htmlFor="dob"
												className="flex items-center mb-2"
											>
												<Calendar className="w-4 h-4 mr-2 text-gray-500" />
												Date of Birth
											</Label>
											<Input
												id="dob"
												name="dob"
												type="date"
												value={formData.dob}
												onChange={handleInputChange}
												required
											/>
										</div>
									</>
								)}
								{/* Password Field */}
								<div>
									<Label
										htmlFor="password"
										className="flex items-center mb-2"
									>
										<Lock className="w-4 h-4 mr-2 text-gray-500" />
										Password
									</Label>
									<Input
										id="password"
										name="password"
										type="password"
										value={formData.password}
										onChange={handleInputChange}
										placeholder="Enter your password"
										required
									/>
								</div>
							</>
						)}
						{/* Error Message */}
						{error && (
							<div className="text-red-600 text-sm mt-2">
								{error.message}
							</div>
						)}
					</div>

					<div className="mt-auto">
						{/* Submit Button */}
						<Button
							type="submit"
							className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600"
							disabled={isLoading}
						>
							{isLoading ? (
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
							) : (
								<ArrowRight className="w-4 h-4 mr-2" />
							)}
							{activeTab === "login"
								? "Log In"
								: activeTab === "signup"
								? "Create Account"
								: "Verify Email"}
						</Button>

						{/* Forgot Password Link for Login */}
						{activeTab === "login" && (
							<div className="text-center mt-4">
								<button
									type="button"
									className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
									onClick={() => {
										// Handle forgot password
									}}
								>
									Forgot Password?
								</button>
							</div>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}
