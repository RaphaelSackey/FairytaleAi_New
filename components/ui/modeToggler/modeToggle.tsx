"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		// Check stored theme preference or system preference
		const theme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;

		if (theme === "dark" || (!theme && prefersDark)) {
			setIsDarkMode(true);
			document.documentElement.classList.add("dark");
		} else {
			setIsDarkMode(false);
			document.documentElement.classList.remove("dark");
		}
	}, []);

	const toggleDarkMode = () => {
		const newTheme = !isDarkMode ? "dark" : "light";
		setIsDarkMode(!isDarkMode);

		// Update the HTML class and store preference
		document.documentElement.classList.toggle("dark", !isDarkMode);
		localStorage.setItem("theme", newTheme);
	};

	return (
		<button
			onClick={toggleDarkMode}
			className='rounded-full border p-1'>
			<img
				src={
					isDarkMode
						? "/modes_images/light.svg"
						: "/modes_images/dark.svg"
				}
				alt='theme toggle icon'
				className='h-6 w-6'
			/>
		</button>
	);
}
