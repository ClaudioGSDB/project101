"use client"; // Ensure this is a client component

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Import the reusable Button component

export default function LandingPage() {
	const router = useRouter();

	return (
		<div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-50 overflow-hidden">
			{/* Blurred Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-blue-500/30 blur-3xl opacity-50"></div>

			{/* Glowing Text Effect */}
			<h1 className="relative text-[10vw] font-extrabold uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 tracking-tight drop-shadow-lg select-none">
				Project101
			</h1>

			{/* Subtext */}
			<p className="mt-4 text-lg text-gray-600 text-center">
				Innovate. Collaborate. Build something amazing.
			</p>

			{/* Call-to-Action Buttons */}
			<div className="relative min-h-[10vh] flex flex-col justify-center items-center pointer-events-auto">
				<Button
					className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 hover:scale-105 transition-transform duration-300"
					onClick={() => (window.location.href = "/form")}
				>
					Get Started
				</Button>
			</div>
		</div>
	);
}
