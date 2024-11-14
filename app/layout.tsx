import type { Metadata } from "next";
import localFont from "next/font/local";
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
    <html lang="en">
      <body
        className={`${suse} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
