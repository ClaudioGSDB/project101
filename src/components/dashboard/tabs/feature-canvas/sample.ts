interface AIFeature {
	feature_id: string;
	feature_name: string;
	feature_description: string;
	bullet_points: string[];
	related_features: string[];
}
interface AIResponse {
	Features: AIFeature[];
}

export const sampleData: AIResponse = {
	Features: [
		{
			feature_id: "1",
			feature_name: "User Authentication",
			feature_description:
				"Secure login and registration system with email verification and password recovery",
			bullet_points: [
				"Email and password authentication",
				"Social login options (Google, GitHub)",
				"Password recovery via email",
				"Two-factor authentication (2FA)",
				"Session management with JWT tokens",
			],
			related_features: ["2", "5"],
		},
		{
			feature_id: "2",
			feature_name: "User Profile Management",
			feature_description:
				"Profile creation and management system for users to maintain their information",
			bullet_points: [
				"Editable user profile with avatar upload",
				"Profile visibility settings (public/private)",
				"Account settings management",
				"Email and notification preferences",
				"Activity history and statistics",
			],
			related_features: ["1", "3"],
		},
		{
			feature_id: "3",
			feature_name: "Project Dashboard",
			feature_description:
				"Central dashboard showing project stats, recent activities, and shortcuts",
			bullet_points: [
				"Project overview with key metrics",
				"Recent activity feed",
				"Quick action buttons for common tasks",
				"Customizable widgets and layout",
				"Project status indicators and alerts",
			],
			related_features: ["2", "4", "6"],
		},
		{
			feature_id: "4",
			feature_name: "Task Management",
			feature_description:
				"Create, assign, and track tasks with deadlines and priorities",
			bullet_points: [
				"Task creation with rich text editor",
				"Priority and deadline setting",
				"Task assignment to team members",
				"Status tracking (To Do, In Progress, Done)",
				"File attachments and comments",
			],
			related_features: ["3", "6", "7"],
		},
		{
			feature_id: "5",
			feature_name: "Team Collaboration",
			feature_description:
				"Tools for team members to work together effectively on projects",
			bullet_points: [
				"Team creation and management",
				"Role-based permissions",
				"Team chat and messaging",
				"Shared calendars and events",
				"Resource sharing and access control",
			],
			related_features: ["1", "4", "7"],
		},
		{
			feature_id: "6",
			feature_name: "Analytics & Reporting",
			feature_description:
				"Data visualization and reporting tools to track project progress and performance",
			bullet_points: [
				"Project progress tracking",
				"Performance metrics and KPIs",
				"Custom report generation",
				"Data export options (CSV, PDF)",
				"Interactive charts and graphs",
			],
			related_features: ["3", "4"],
		},
		{
			feature_id: "7",
			feature_name: "Notification System",
			feature_description:
				"Real-time alerts and notifications for important events and updates",
			bullet_points: [
				"In-app notifications",
				"Email notifications",
				"Push notifications for mobile",
				"Customizable notification preferences",
				"Mention and tagging system",
			],
			related_features: ["4", "5"],
		},
	],
};
