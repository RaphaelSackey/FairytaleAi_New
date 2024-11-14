'use client'

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const theme = localStorage.getItem("theme");
		if (
			theme === "dark" ||
			(!theme &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			setIsDarkMode(true);
			document.documentElement.classList.add("dark");
		}
	}, []);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		document.documentElement.classList.toggle("dark");
		localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
	};

	return (
		<button
			onClick={toggleDarkMode}
			className='rounded-full border-black border p-1'>
			<img
				src={!isDarkMode? '/modes_images/light.svg': '/modes_images/dark.svg'}
				alt='theme images'
				className='h-6 w-6'
			/>
		</button>
	);
}
