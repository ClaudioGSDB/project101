"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
	const pathname = usePathname();

	if (pathname === "/dashboard") return null; // Don't render Navbar on the root path

	return (
		<nav className="bg-gradient-to-r from-indigo-500 to-blue-500 p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className="text-white text-2xl font-bold">
					Project101
				</Link>
				<div className="space-x-4">
					<Button
						className="bg-gradient-to-r from-indigo-600 to-blue-575 hover:from-indigo-600 hover:to-blue-600 hover:scale-105 transition-transform duration-300 hover:ring-2 hover:ring-white hover:ring-offset-1 hover:ring-offset-white-700 font-bold"
						onClick={() => (window.location.href = "/home")}
					>
						Home
					</Button>

					<Button
						className="bg-gradient-to-r from-indigo-600 to-blue-575 hover:from-indigo-600 hover:to-blue-600 hover:scale-105 transition-transform duration-300 hover:ring-2 hover:ring-white hover:ring-offset-1 hover:ring-offset-white-700 font-bold"
						onClick={() => (window.location.href = "/dashboard")}
					>
						Dashboard
					</Button>
					<Button
						className="bg-gradient-to-r from-indigo-600 to-blue-575 hover:from-indigo-600 hover:to-blue-600 hover:scale-105 transition-transform duration-300 hover:ring-2 hover:ring-white hover:ring-offset-1 hover:ring-offset-white-700 font-bold"
						onClick={() => (window.location.href = "/form")}
					>
						Project
					</Button>
				</div>
			</div>
		</nav>
	);
}
