"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
	Sparkles,
	Code,
	Layers,
	Route,
	Rocket,
	Terminal,
	Braces,
	Link as LinkIcon,
	ArrowRight,
	Check,
	Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LandingPage() {
	const router = useRouter();
	const [isScrolled, setIsScrolled] = useState(false);

	// Handle scroll events to show/hide sticky header
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Features section data
	const features = [
		{
			icon: <Sparkles className="h-10 w-10 text-indigo-500" />,
			title: "AI-Powered Project Generation",
			description:
				"Get intelligent project ideas tailored to your skill level, interests, and goals.",
		},
		{
			icon: <Layers className="h-10 w-10 text-indigo-500" />,
			title: "Feature Breakdown",
			description:
				"See your project broken down into organized features with detailed requirements.",
		},
		{
			icon: <Code className="h-10 w-10 text-indigo-500" />,
			title: "Technology Stack",
			description:
				"Receive recommended technologies with explanations of why they're right for your project.",
		},
		{
			icon: <Route className="h-10 w-10 text-indigo-500" />,
			title: "Development Roadmap",
			description:
				"Follow a clear milestone-based roadmap to build your project from start to finish.",
		},
	];

	// How it works section data
	const steps = [
		{
			number: "01",
			title: "Share Your Preferences",
			description:
				"Tell us about your experience level, interests, and project goals.",
		},
		{
			number: "02",
			title: "AI Generates Your Project",
			description:
				"Our intelligent system creates a customized project plan tailored to you.",
		},
		{
			number: "03",
			title: "Review & Customize",
			description:
				"Explore your project features, tech stack, and roadmap in an interactive dashboard.",
		},
		{
			number: "04",
			title: "Start Building",
			description:
				"Begin development with a clear plan and all the information you need to succeed.",
		},
	];

	// Animation variants for staggered animations
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	return (
		<div className="relative min-h-screen bg-gray-50 overflow-x-hidden">
			{/* Sticky Header - appears when scrolled */}
			<div
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-3"
				}`}
			>
				<div className="container mx-auto flex justify-between items-center px-4">
					<div className="flex items-center">
						<Sparkles
							className={`h-6 w-6 ${
								isScrolled ? "text-indigo-600" : "text-white"
							}`}
						/>
						<h1
							className={`text-xl font-bold ml-2 ${
								isScrolled ? "text-gray-800" : "text-white"
							}`}
						>
							Project101
						</h1>
					</div>
					<Button
						className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white"
						onClick={() => router.push("/form")}
					>
						Get Started
					</Button>
				</div>
			</div>

			{/* Hero Section */}
			<div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
				{/* Background gradient */}
				<div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-600"></div>

				{/* Animated background shapes */}
				<div className="absolute inset-0 overflow-hidden">
					{[...Array(8)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute rounded-full bg-white opacity-5"
							style={{
								width: Math.random() * 300 + 50,
								height: Math.random() * 300 + 50,
								top: `${Math.random() * 100}%`,
								left: `${Math.random() * 100}%`,
							}}
							animate={{
								y: [Math.random() * 100, Math.random() * -100],
								x: [Math.random() * 100, Math.random() * -100],
							}}
							transition={{
								duration: Math.random() * 20 + 10,
								repeat: Infinity,
								repeatType: "reverse",
							}}
						/>
					))}
				</div>

				<div className="container mx-auto px-4 py-20 z-10 text-center pt-32">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
							Turn Ideas Into Reality
							<br />
							With <span className="text-indigo-200">AI-Powered</span>{" "}
							Projects
						</h1>
						<p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto mb-10">
							Create complete, personalized project plans with features,
							tech stack, and development roadmap in minutes.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="flex flex-col sm:flex-row gap-4 justify-center"
					>
						<Button
							size="lg"
							className="bg-white text-indigo-600 hover:bg-indigo-50 hover:scale-105 transition-transform duration-300 text-lg font-semibold px-8 py-6"
							onClick={() => router.push("/form")}
						>
							<Rocket className="w-5 h-5 mr-2" />
							Start Your Project
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="bg-transparent border-2 border-white text-white hover:bg-white/10 hover:scale-105 transition-transform duration-300 text-lg font-semibold px-8 py-6"
							onClick={() => {
								const featuresSection =
									document.getElementById("features");
								if (featuresSection) {
									featuresSection.scrollIntoView({
										behavior: "smooth",
									});
								}
							}}
						>
							<Lightbulb className="w-5 h-5 mr-2" />
							Learn More
						</Button>
					</motion.div>
				</div>

				{/* Dashboard Preview Image */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="w-full max-w-5xl mx-auto mt-8 mb-4 px-4"
				>
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-t from-indigo-600 to-transparent z-10 rounded-t-xl"></div>
						<div className="bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-white">
							<div className="bg-gray-800 text-white px-4 py-2 flex items-center gap-2 text-sm">
								<div className="flex gap-1.5">
									<div className="w-3 h-3 rounded-full bg-red-500"></div>
									<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
									<div className="w-3 h-3 rounded-full bg-green-500"></div>
								</div>
								<span className="ml-2 opacity-70">
									project101-dashboard.vercel.app
								</span>
							</div>
							<div className="bg-gradient-to-b from-gray-100 to-white p-4 flex justify-center">
								<div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
									<div className="bg-white shadow rounded-lg p-3 h-40">
										<div className="flex items-center mb-3">
											<Layers className="text-indigo-500 w-5 h-5 mr-2" />
											<h3 className="text-lg font-semibold text-gray-800">
												Features
											</h3>
										</div>
										<div className="space-y-2">
											<div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
											<div className="h-4 bg-gray-200 rounded-full w-full"></div>
											<div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
										</div>
									</div>
									<div className="bg-white shadow rounded-lg p-3 h-40">
										<div className="flex items-center mb-3">
											<Code className="text-indigo-500 w-5 h-5 mr-2" />
											<h3 className="text-lg font-semibold text-gray-800">
												Tech Stack
											</h3>
										</div>
										<div className="space-y-2">
											<div className="h-4 bg-gray-200 rounded-full w-full"></div>
											<div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
											<div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
										</div>
									</div>
									<div className="bg-white shadow rounded-lg p-3 h-40">
										<div className="flex items-center mb-3">
											<Route className="text-indigo-500 w-5 h-5 mr-2" />
											<h3 className="text-lg font-semibold text-gray-800">
												Roadmap
											</h3>
										</div>
										<div className="space-y-2">
											<div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
											<div className="h-4 bg-gray-200 rounded-full w-full"></div>
											<div className="h-4 bg-gray-200 rounded-full w-3/5"></div>
										</div>
									</div>
									<div className="bg-white shadow rounded-lg p-3 h-40">
										<div className="flex items-center mb-3">
											<Terminal className="text-indigo-500 w-5 h-5 mr-2" />
											<h3 className="text-lg font-semibold text-gray-800">
												Summary
											</h3>
										</div>
										<div className="space-y-2">
											<div className="h-4 bg-gray-200 rounded-full w-3/5"></div>
											<div className="h-4 bg-gray-200 rounded-full w-full"></div>
											<div className="h-4 bg-gray-200 rounded-full w-4/5"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Features Section */}
			<section id="features" className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
						>
							<h2 className="text-4xl font-bold text-gray-900 mb-4">
								Powerful Features
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Project101 uses AI to help developers plan and build
								better projects, whether you're a beginner or
								professional.
							</p>
						</motion.div>
					</div>

					<motion.div
						className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
						variants={container}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
					>
						{features.map((feature, index) => (
							<motion.div
								key={index}
								className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
								variants={item}
							>
								<div className="mb-5 p-3 rounded-xl bg-indigo-50 inline-block">
									{feature.icon}
								</div>
								<h3 className="text-xl font-semibold text-gray-800 mb-3">
									{feature.title}
								</h3>
								<p className="text-gray-600 leading-relaxed">
									{feature.description}
								</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
						>
							<h2 className="text-4xl font-bold text-gray-900 mb-4">
								How It Works
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Getting started with Project101 is simple. Our AI does the
								heavy lifting so you can focus on building.
							</p>
						</motion.div>
					</div>

					<div className="relative">
						{/* Connector Line */}
						<div className="absolute top-1/2 left-0 right-0 h-1 bg-indigo-100 -translate-y-1/2 hidden md:block"></div>

						<motion.div
							className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
							variants={container}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
						>
							{steps.map((step, index) => (
								<motion.div
									key={index}
									className="bg-white p-8 rounded-xl shadow-md relative"
									variants={item}
								>
									<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
										{index + 1}
									</div>
									<h3 className="text-xl font-semibold text-gray-800 mt-4 mb-3">
										{step.title}
									</h3>
									<p className="text-gray-600 leading-relaxed">
										{step.description}
									</p>
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>
			</section>

			{/* Use Cases Section */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<div className="text-center mb-16">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
						>
							<h2 className="text-4xl font-bold text-gray-900 mb-4">
								Perfect For
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Project101 helps developers at all levels create better
								projects.
							</p>
						</motion.div>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<motion.div
							className="bg-gradient-to-br from-indigo-500 to-blue-600 p-8 rounded-xl text-white shadow-lg"
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
						>
							<h3 className="text-2xl font-bold mb-4">Students</h3>
							<ul className="space-y-3">
								<li className="flex items-start gap-2">
									<Check className="h-5 w-5 text-indigo-200 mt-0.5 flex-shrink-0" />
									<span>Create portfolio-worthy projects</span>
								</li>
								<li className="flex items-start gap-2">
									<Check className="h-5 w-5 text-indigo-200 mt-0.5 flex-shrink-0" />
									<span>Learn technology stacks methodically</span>
								</li>
								<li className="flex items-start gap-2">
									<Check className="h-5 w-5 text-indigo-200 mt-0.5 flex-shrink-0" />
									<span>Practice with structured milestones</span>
								</li>
								<li className="flex items-start gap-2">
									<Check className="h-5 w-5 text-indigo-200 mt-0.5 flex-shrink-0" />
									<span>Build confidence in development skills</span>
								</li>
							</ul>
						</motion.div>

						<motion.div
							className="bg-gradient-to-br from-indigo-500 to-blue-600 p-8 rounded-xl text-white shadow-lg"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							<h3 className="text-2xl font-bold mb-4">Professionals</h3>
							<ul className="space-y-3">
								<li className="flex items-start gap-2">
									<Check className="h-5 w-5 text-indigo-200 mt-0.5 flex-shrink-0" />
									<span>Jump-start side projects quickly</span>
								</li>
								<li className="flex items-start gap-2">
									<Check className="h-5 w-5 text-indigo-200 mt-0.5 flex-shrink-0" />
									<span>Explore new technology stacks</span>
								</li>
								<li className="flex items-start gap-2">
									<Check className="h-5 w-5 text-indigo-200 mt-0.5 flex-shrink-0" />
									<span>Validate project complexity & scope</span>
								</li>
								<li className="flex items-start gap-2">
									<Check className="h-5 w-5 text-indigo-200 mt-0.5 flex-shrink-0" />
									<span>Create prototypes for startups</span>
								</li>
							</ul>
						</motion.div>

						<motion.div
							className="bg-gradient-to-br from-indigo-500 to-blue-600 p-8 rounded-xl text-white shadow-lg"
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<h3 className="text-2xl font-bold mb-4">Educators</h3>
							<ul className="space-y-3">
								<li className="flex items-start gap-2">
									<Check className="h-5 w-5 text-indigo-200 mt-0.5 flex-shrink-0" />
									<span>Generate example projects for classes</span>
								</li>
								<li className="flex items-start gap-2">
									<Check className="h-5 w-5 text-indigo-200 mt-0.5 flex-shrink-0" />
									<span>Create structured learning exercises</span>
								</li>
								<li className="flex items-start gap-2">
									<Check className="h-5 w-5 text-indigo-200 mt-0.5 flex-shrink-0" />
									<span>Personalize assignments by skill level</span>
								</li>
								<li className="flex items-start gap-2">
									<Check className="h-5 w-5 text-indigo-200 mt-0.5 flex-shrink-0" />
									<span>Teach software planning techniques</span>
								</li>
							</ul>
						</motion.div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
				<div className="container mx-auto px-4 text-center">
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<h2 className="text-4xl font-bold mb-6">
							Ready to Build Something Amazing?
						</h2>
						<p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-10">
							Stop struggling with project planning and get started with
							AI-powered development today.
						</p>
						<Button
							size="lg"
							className="bg-white text-indigo-600 hover:bg-indigo-50 hover:scale-105 transition-transform duration-300 text-lg font-semibold px-8 py-6"
							onClick={() => router.push("/form")}
						>
							<Rocket className="w-5 h-5 mr-2" />
							Launch Your Project
							<ArrowRight className="w-5 h-5 ml-2" />
						</Button>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="flex items-center mb-6 md:mb-0">
							<Sparkles className="h-6 w-6 text-indigo-400" />
							<h3 className="text-xl font-bold ml-2">Project101</h3>
						</div>
						<div className="text-gray-400 text-sm">
							© 2025 Project101. All rights reserved.
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
