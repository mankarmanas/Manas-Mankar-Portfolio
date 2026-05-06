import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manas Mankar | AI Engineer & Full-Stack Developer",
  description:
    "Portfolio of Manas Mankar — AI Engineer and Full-Stack Developer specializing in intelligent applications, LLM integrations, and modern web development.",
  keywords: [
    "Manas Mankar",
    "AI Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Python",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Manas Mankar" }],
  openGraph: {
    title: "Manas Mankar | AI Engineer & Full-Stack Developer",
    description:
      "Building intelligent systems at the intersection of AI and modern web development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background text-text-primary`}>
        {children}
      </body>
    </html>
  );
}
