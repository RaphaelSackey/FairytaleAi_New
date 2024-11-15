"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Ensure component is mounted before accessing the theme to prevent SSR issues
	useEffect(() => setMounted(true), []);

	if (!mounted) return null; // Avoid rendering on the server to prevent mismatches

	return (
		<button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className='rounded-full border p-1'>
			<img
				src={
					theme === "dark"
						? "/modes_images/light.svg"
						: "/modes_images/dark.svg"
				}
				alt='theme toggle icon'
				className='h-6 w-6'
			/>
		</button>
	);
}
