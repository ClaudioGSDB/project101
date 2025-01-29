// src/app/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export default function DashboardPage() {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.push("/login");
		}
	}, [user, loading, router]);

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			router.push("/login");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	if (loading || !user) return null;

	return (
		<div className="min-h-screen bg-gray-50">
			<nav className="bg-white shadow">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<h1 className="text-xl font-bold">Dashboard</h1>
						</div>
						<div className="flex items-center gap-4">
							<p className="text-gray-600">{user.email}</p>
							<button
								onClick={handleSignOut}
								className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
							>
								Sign Out
							</button>
						</div>
					</div>
				</div>
			</nav>

			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
						<h2 className="text-2xl font-bold mb-4">Welcome!</h2>
						<p>You are signed in as {user.email}</p>
					</div>
				</div>
			</main>
		</div>
	);
}
