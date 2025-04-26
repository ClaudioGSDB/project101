// src/app/layout.tsx
import Navbar from "@/components/ui/Navbar"; // Import Navbar
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Project 101",
	description: "Dont think just code!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				{/* <Navbar /> Add Navbar here so it's present on all pages */}
				{children}
			</body>
		</html>
	);
}
