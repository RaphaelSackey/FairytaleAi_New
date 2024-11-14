import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "../contexts/theme-provider";
import "./globals.css";

const suse = localFont({
	src: "./fonts/SUSE-Regular.ttf",
});

export const metadata: Metadata = {
	title: "FairytaleAI",
	description: "Your Next AI Powered Story Board Generator",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning>
			<body className={`${suse} antialiased`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
