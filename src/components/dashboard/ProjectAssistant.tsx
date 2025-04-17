// src/components/dashboard/ProjectAssistant.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	MessageSquare,
	Clock,
	Send,
	X,
	ChevronLeft,
	ChevronRight,
	History,
} from "lucide-react";

export function ProjectAssistant() {
	// State for panel and tab management
	const [isPanelExpanded, setIsPanelExpanded] = useState(true);
	const [activeTab, setActiveTab] = useState<"assistant" | "history">("assistant");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<
		{ id: string; text: string; timestamp: Date }[]
	>([]);

	// Auto-resizing textarea logic
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Adjust textarea height based on content
	useEffect(() => {
		if (textareaRef.current) {
			// Reset height - important to shrink on delete
			textareaRef.current.style.height = "inherit";
			// Set height
			const scrollHeight = textareaRef.current.scrollHeight;
			textareaRef.current.style.height = `${scrollHeight}px`;
		}
	}, [message]);

	// Handle sending a message
	const handleSendMessage = () => {
		if (message.trim() === "") return;

		const newMessage = {
			id: Date.now().toString(),
			text: message,
			timestamp: new Date(),
		};

		setMessages([...messages, newMessage]);
		setMessage("");

		// Here you would typically call your API to send the message to your backend
		// but we're just focusing on UI for now
	};

	// Handle key press (send on Enter without Shift)
	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	return (
		<div
			className={`h-full flex flex-col bg-white border-l transition-all duration-300 overflow-hidden ${
				isPanelExpanded ? "w-96" : "w-0"
			}`}
		>
			{/* Toggle button */}
			<button
				onClick={() => setIsPanelExpanded(!isPanelExpanded)}
				className="absolute -left-3 top-8 w-6 h-6 bg-white border rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow z-10"
			>
				{isPanelExpanded ? (
					<ChevronRight className="w-3 h-3" />
				) : (
					<ChevronLeft className="w-3 h-3" />
				)}
			</button>

			{/* Header */}
			<div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 flex justify-between items-center">
				<h2 className="font-semibold flex items-center gap-2">
					{activeTab === "assistant" ? (
						<>
							<MessageSquare className="w-4 h-4" />
							Project Assistant
						</>
					) : (
						<>
							<History className="w-4 h-4" />
							Version History
						</>
					)}
				</h2>
				<div className="flex">
					<button
						className={`px-3 py-1 text-xs rounded-l-md transition ${
							activeTab === "assistant"
								? "bg-white/20"
								: "hover:bg-white/10"
						}`}
						onClick={() => setActiveTab("assistant")}
					>
						Assistant
					</button>
					<button
						className={`px-3 py-1 text-xs rounded-r-md transition ${
							activeTab === "history" ? "bg-white/20" : "hover:bg-white/10"
						}`}
						onClick={() => setActiveTab("history")}
					>
						<Clock className="w-3 h-3 mr-1 inline-block" />
						History
					</button>
				</div>
			</div>

			{/* Content area - conditionally show based on active tab */}
			{activeTab === "assistant" ? (
				<>
					{/* Message History */}
					<div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
						{messages.length === 0 ? (
							<div className="text-center text-gray-400 mt-8">
								<MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-20" />
								<p>No messages yet</p>
								<p className="text-sm mt-2">
									Ask the AI to modify or enhance your project
								</p>
							</div>
						) : (
							messages.map((msg) => (
								<div
									key={msg.id}
									className="bg-white p-3 rounded-lg shadow-sm border border-gray-100"
								>
									<div className="text-gray-700 text-sm whitespace-pre-wrap">
										{msg.text}
									</div>
									<div className="text-xs text-gray-400 mt-1">
										{new Date(msg.timestamp).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</div>
								</div>
							))
						)}
					</div>

					{/* Input Area */}
					<div className="p-4 border-t bg-white">
						<div className="relative">
							<textarea
								ref={textareaRef}
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								onKeyDown={handleKeyPress}
								placeholder="Modify your project..."
								className="w-full resize-none overflow-hidden bg-gray-50 border rounded-lg px-3 py-2 pr-10 min-h-[44px] max-h-[200px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
								rows={1}
							/>
							<Button
								onClick={handleSendMessage}
								disabled={message.trim() === ""}
								className={`absolute right-1 top-1/2 transform -translate-y-4 p-1.5 h-auto rounded-md ${
									message.trim() === ""
										? "text-gray-300"
										: "text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
								}`}
								variant="ghost"
							>
								<Send className="h-5 w-5" />
							</Button>
						</div>
						<div className="text-xs text-gray-500 mt-2 flex items-center">
							<div className="flex-1 text-left">
								Press{" "}
								<kbd className="px-1 py-0.5 bg-gray-100 rounded">
									Shift
								</kbd>{" "}
								+{" "}
								<kbd className="px-1 py-0.5 bg-gray-100 rounded">
									Enter
								</kbd>{" "}
								for new line
							</div>
							<button
								onClick={() => setMessage("")}
								className="text-gray-400 hover:text-gray-600"
							>
								Clear
							</button>
						</div>
					</div>
				</>
			) : (
				// Version History Tab Content
				<div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
					<div className="text-center text-gray-400">
						<Clock className="w-12 h-12 mx-auto mb-2 opacity-20" />
						<p>Version History</p>
						<p className="text-sm mt-2">
							This feature will be implemented soon
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
