// src/components/dashboard/Dashboard.tsx (Updated)
"use client";
import React, { useState } from "react";
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
import { Stack } from "@/components/dashboard/tabs/stack/Stack"; // Import the new Stack component
import { Roadmap } from "@/components/dashboard/tabs/roadmap/Roadmap";

export function DashboardLayout() {
	const [sidebarExpanded, setSidebarExpanded] = useState(true);
	const [activeTab, setActiveTab] = useState("features");
	const [assistantExpanded, setAssistantExpanded] = useState(false);

	// Define tab icons and labels for more organized code
	const tabs = [
		{ id: "features", label: "Features", icon: Layers },
		{ id: "stack", label: "Stack", icon: Server },
		{ id: "roadmap", label: "Roadmap", icon: Route },
		{ id: "summary", label: "Summary", icon: FileText },
	];

	return (
		<div className="h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex">
			{/* Collapsible Sidebar */}
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

				{/* Version History Button */}
				<button className="p-3 border-t border-b text-gray-600 hover:bg-gray-50">
					{sidebarExpanded ? (
						<div className="flex items-center space-x-2">
							<Clock className="w-4 h-4" />
							<span className="text-sm">History</span>
						</div>
					) : (
						<Clock className="w-4 h-4 mx-auto" />
					)}
				</button>

				{/* Project Assistant */}
				<div
					className={`flex flex-col transition-all duration-300 ease-in-out
          ${assistantExpanded ? "h-72" : "h-12"}`}
				>
					<button
						onClick={() => setAssistantExpanded(!assistantExpanded)}
						className="flex items-center px-3 py-2 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 hover:from-indigo-500/10 hover:to-blue-500/10"
					>
						{sidebarExpanded ? (
							<>
								<div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
									<Sparkles className="w-3 h-3 text-white" />
								</div>
								<span className="ml-2 text-sm font-medium text-gray-700">
									Assistant
								</span>
							</>
						) : (
							<div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center mx-auto">
								<Sparkles className="w-3 h-3 text-white" />
							</div>
						)}
					</button>

					{/* Chat Interface - Only visible when both sidebar and assistant are expanded */}
					{sidebarExpanded && assistantExpanded && (
						<div className="flex-1 flex flex-col p-3">
							<div className="flex-1 overflow-auto">
								{/* Messages will go here */}
							</div>
							<div className="mt-2">
								<input
									type="text"
									placeholder="Ask anything..."
									className="w-full px-3 py-2 text-sm rounded-lg border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
								/>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Top Bar */}
				<header className="h-14 bg-white border-b px-4 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<h2 className="text-base font-medium text-gray-900">
							My Awesome Project
						</h2>
						<span className="px-2 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/10 text-indigo-700 text-xs font-medium">
							In Progress
						</span>
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
						{activeTab === "features" && <Feature />}
						{activeTab === "stack" && <Stack />}
						{activeTab === "roadmap" && <Roadmap />}

						{activeTab === "summary" && (
							<div className="flex items-center justify-center h-full">
								<p className="text-gray-500">
									Summary tab content coming soon!
								</p>
							</div>
						)}
					</div>
				</main>
			</div>
		</div>
	);
}
