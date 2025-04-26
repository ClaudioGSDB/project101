// src/components/dashboard/ProjectAssistant.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	MessageSquare,
	Clock,
	Send,
	ChevronLeft,
	ChevronRight,
	History,
	Loader,
} from "lucide-react";

// Define the structure of a message
interface Message {
	id: string;
	text: string;
	timestamp: Date;
	status: "sent" | "processing" | "completed" | "error";
}

export function ProjectAssistant() {
	// State for panel and tab management
	const [isPanelExpanded, setIsPanelExpanded] = useState(true);
	const [activeTab, setActiveTab] = useState<"assistant" | "history">("assistant");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isProcessing, setIsProcessing] = useState(false);

	// Auto-resizing textarea logic
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

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

	// Scroll to bottom when new messages appear
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// Handle sending a message
	const handleSendMessage = async () => {
		if (message.trim() === "" || isProcessing) return;

		const newMessage: Message = {
			id: Date.now().toString(),
			text: message,
			timestamp: new Date(),
			status: "sent",
		};

		setMessages((prevMessages) => [...prevMessages, newMessage]);
		setMessage("");
		setIsProcessing(true);

		try {
			// Update message status to processing
			setMessages((prevMessages) =>
				prevMessages.map((msg) =>
					msg.id === newMessage.id ? { ...msg, status: "processing" } : msg
				)
			);

			// Send to Gemini and process changes
			console.log("Sending to Gemini", newMessage.text, newMessage.id);
			await sendToGemini(newMessage.text, newMessage.id);

			// Update the message status to completed
			setMessages((prevMessages) =>
				prevMessages.map((msg) =>
					msg.id === newMessage.id ? { ...msg, status: "completed" } : msg
				)
			);
		} catch (error) {
			console.error("Error processing request:", error);

			// Update the message status to error
			setMessages((prevMessages) =>
				prevMessages.map((msg) =>
					msg.id === newMessage.id ? { ...msg, status: "error" } : msg
				)
			);
		} finally {
			setIsProcessing(false);
		}
	};

	// Function to collect project data from localStorage
	const getProjectData = () => {
		try {
			const features = JSON.parse(localStorage.getItem("Features") || "{}");
			const stack = JSON.parse(localStorage.getItem("Stack") || "{}");
			const roadmap = JSON.parse(localStorage.getItem("Roadmap") || "{}");

			return {
				Features: features,
				Stack: stack,
				Roadmap: roadmap,
			};
		} catch (error) {
			console.error("Error parsing project data from localStorage:", error);
			throw new Error("Could not load project data");
		}
	};

	// Function to update localStorage with the changes
	const updateProject = (updatedData: any) => {
		try {
			// Update each localStorage item with its corresponding data
			if (updatedData.Features) {
				localStorage.setItem("Features", JSON.stringify(updatedData.Features));
				console.log("Firing Event");
				window.dispatchEvent(new Event("featuresUpdated"));
			}

			if (updatedData.Stack) {
				localStorage.setItem("Stack", JSON.stringify(updatedData.Stack));
				window.dispatchEvent(new Event("stackUpdated"));
			}

			if (updatedData.Roadmap) {
				localStorage.setItem("Roadmap", JSON.stringify(updatedData.Roadmap));
				window.dispatchEvent(new Event("roadmapUpdated"));
			}

			// Force a UI refresh - this is a simple approach
			// In a real app, you might use a state management solution
			window.dispatchEvent(new Event("storage"));

			return true;
		} catch (error) {
			console.error("Error updating project data:", error);
			throw new Error("Failed to update project data");
		}
	};

	// Function to send data to Gemini API and process response
	const sendToGemini = async (userMessage: string, messageId: string) => {
		try {
			// Get all project data
			const projectData = getProjectData();

			// Prepare the payload for Gemini
			const payload = {
				userMessage: userMessage,
				projectData: projectData,
				generationType: "ProjectUpdate",
			};

			// Send to API
			console.log("Sending payload", payload);
			const response = await fetch(
				"https://dr8rn41bv4.execute-api.us-east-2.amazonaws.com/GeminiStage",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);
			console.log("Gemini Response:", response);

			if (!response.ok) {
				throw new Error(`API responded with status ${response.status}`);
			}

			const data = await response.json();

			console.log(data);

			// Check if the response contains the updated project data
			if (data.message && typeof data.message === "object") {
				// Update the project with the changes
				updateProject(data.message);
				return true;
			} else {
				throw new Error("Invalid response format from API");
			}
		} catch (error) {
			console.error("Error in Gemini processing:", error);
			throw error;
		}
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
									className={`p-3 rounded-lg shadow-sm border ${
										msg.status === "error"
											? "border-red-200 bg-red-50"
											: "border-gray-100 bg-white"
									}`}
								>
									<div className="text-gray-700 text-sm whitespace-pre-wrap">
										{msg.text}
									</div>
									<div className="text-xs text-gray-400 mt-1 flex justify-between items-center">
										<span>
											{new Date(msg.timestamp).toLocaleTimeString(
												[],
												{
													hour: "2-digit",
													minute: "2-digit",
												}
											)}
										</span>
										{msg.status === "processing" && (
											<span className="flex items-center text-amber-500">
												<Loader className="w-3 h-3 mr-1 animate-spin" />
												Processing...
											</span>
										)}
										{msg.status === "completed" && (
											<span className="text-green-500">
												Applied
											</span>
										)}
										{msg.status === "error" && (
											<span className="text-red-500">
												Failed to apply
											</span>
										)}
									</div>
								</div>
							))
						)}
						<div ref={messagesEndRef} />
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
								disabled={isProcessing}
							/>
							<Button
								onClick={handleSendMessage}
								disabled={message.trim() === "" || isProcessing}
								className={`absolute right-1 top-1/2 transform -translate-y-1/2 p-1.5 h-auto rounded-md ${
									message.trim() === "" || isProcessing
										? "text-gray-300"
										: "text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50"
								}`}
								variant="ghost"
							>
								{isProcessing ? (
									<Loader className="h-5 w-5 animate-spin" />
								) : (
									<Send className="h-5 w-5" />
								)}
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
								disabled={isProcessing}
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
