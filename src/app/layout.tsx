// src/app/layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/ui/Navbar"; // Import Navbar
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Project 101",
	description: "TESTING DESCRIPTION",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<AuthProvider>
					<Navbar /> {/* Add Navbar here so it's present on all pages */}
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
