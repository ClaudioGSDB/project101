// src/components/dashboard/Dashboard.tsx (Updated)
"use client";
import React, { useState, useEffect } from "react";
import {
	MessageSquare,
	ChevronLeft,
	ChevronRight,
	Clock,
	Sparkles,
	X,
	Layers, // New icon for Features
	Server, // New icon for Stack
	Route, // New icon for Roadmap
	FileText, // New icon for Summary
} from "lucide-react";
import { Feature } from "@/components/dashboard/tabs/feature/Feature";
import { Stack } from "@/components/dashboard/tabs/stack/Stack";
import { Roadmap } from "@/components/dashboard/tabs/roadmap/Roadmap";
import { Summary } from "@/components/dashboard/tabs/summary/Summary";
import { ProjectAssistant } from "@/components/dashboard/ProjectAssistant";

export function DashboardLayout() {
	const [sidebarExpanded, setSidebarExpanded] = useState(true);
	const [activeTab, setActiveTab] = useState("summary");
	const [projectName, setProjectName] = useState("My Awesome Project");

	useEffect(() => {
		// Load project name from localStorage if available
		const storedProjectName = JSON.parse(localStorage.getItem("Features") || "{}");
		if (storedProjectName.project_name) {
			setProjectName(storedProjectName.project_name);
		}
	}, []);

	// Define tab icons and labels for more organized code
	const tabs = [
		{ id: "summary", label: "Summary", icon: FileText },
		{ id: "features", label: "Features", icon: Layers },
		{ id: "stack", label: "Stack", icon: Server },
		{ id: "roadmap", label: "Roadmap", icon: Route },
	];

	return (
		<div className="h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex">
			<div
				className={`bg-white border-r flex flex-col transition-all duration-300 ease-in-out relative
          			${sidebarExpanded ? "w-48" : "w-16"}`}
			>
				{/* Toggle Button */}
				<button
					onClick={() => setSidebarExpanded(!sidebarExpanded)}
					className="absolute -right-3 top-8 w-6 h-6 bg-white border rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
				>
					{sidebarExpanded ? (
						<ChevronLeft className="w-3 h-3" />
					) : (
						<ChevronRight className="w-3 h-3" />
					)}
				</button>

				{/* Project Title Area */}
				<div className="p-3 border-b">
					<div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg p-3">
						{sidebarExpanded ? (
							<>
								<h1 className="font-semibold text-sm">Project101</h1>
								<p className="text-xs opacity-80 mt-1">
									AI-Powered Builder
								</p>
							</>
						) : (
							<div className="flex justify-center">
								<Sparkles className="w-5 h-5" />
							</div>
						)}
					</div>
				</div>

				{/* Tab Navigation - Enhanced with icons */}
				<nav className="flex-1 p-2 space-y-1">
					{tabs.map((tab) => {
						const TabIcon = tab.icon;
						return (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`w-full rounded-lg transition-all duration-300 relative group
                  ${
						activeTab === tab.id
							? "bg-gradient-to-r from-indigo-500/10 to-blue-500/10 text-indigo-700"
							: "hover:bg-gray-50 text-gray-600"
					}
                  ${
						sidebarExpanded
							? "px-4 py-3 text-left flex items-center"
							: "p-3 flex justify-center"
					}`}
							>
								<TabIcon
									className={`w-4 h-4 ${
										!sidebarExpanded ? "mx-auto" : "mr-2"
									}`}
								/>
								{sidebarExpanded && (
									<span className="capitalize">{tab.label}</span>
								)}
							</button>
						);
					})}
				</nav>
			</div>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Top Bar */}
				<header className="h-14 bg-white border-b px-4 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<h2 className="text-base font-medium text-gray-900">
							{projectName || "My Awesome Project"}
						</h2>
					</div>
					<button
						onClick={() => {}} // if logged in Save changes to firebase else create an account
						className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-sm hover:shadow-lg transition-shadow"
					>
						Save Changes
					</button>
				</header>

				{/* Main Content */}
				<main className="flex-1 overflow-hidden p-4">
					<div className="h-full rounded-xl bg-white border shadow-sm overflow-hidden">
						{/* Render appropriate tab content based on activeTab state */}
						{activeTab === "summary" && <Summary />}
						{activeTab === "features" && <Feature />}
						{activeTab === "stack" && <Stack />}
						{activeTab === "roadmap" && <Roadmap />}
					</div>
				</main>
			</div>
			<ProjectAssistant />
		</div>
	);
}
