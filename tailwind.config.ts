import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	safelist: [
		// All possible "from-{color}-500" classes
		'from-slate-500', 'from-gray-500', 'from-zinc-500', 'from-neutral-500', 'from-stone-500',
		'from-red-500', 'from-orange-500', 'from-amber-500', 'from-yellow-500', 'from-lime-500',
		'from-green-500', 'from-emerald-500', 'from-teal-500', 'from-cyan-500', 'from-sky-500',
		'from-blue-500', 'from-indigo-500', 'from-violet-500', 'from-purple-500', 'from-fuchsia-500',
		'from-pink-500', 'from-rose-500',
		
		// All possible "to-{color}-500" classes
		'to-slate-500', 'to-gray-500', 'to-zinc-500', 'to-neutral-500', 'to-stone-500',
		'to-red-500', 'to-orange-500', 'to-amber-500', 'to-yellow-500', 'to-lime-500',
		'to-green-500', 'to-emerald-500', 'to-teal-500', 'to-cyan-500', 'to-sky-500',
		'to-blue-500', 'to-indigo-500', 'to-violet-500', 'to-purple-500', 'to-fuchsia-500',
		'to-pink-500', 'to-rose-500',
		
		// Also include the gradient direction classes
		'bg-gradient-to-r', 'bg-gradient-to-l', 'bg-gradient-to-t', 'bg-gradient-to-b',
		'bg-gradient-to-tr', 'bg-gradient-to-tl', 'bg-gradient-to-br', 'bg-gradient-to-bl',
	],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;