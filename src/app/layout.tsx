import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira" });

export const metadata: Metadata = {
  title: "Harshit Gupta | Security Engineer",
  description:
    "Portfolio of Harshit Gupta — Cybersecurity Analyst & Full-Stack Developer at Accenture. Specializing in threat detection, data security, and security automation.",
  keywords: [
    "Harshit Gupta",
    "Cybersecurity",
    "Security Engineer",
    "Threat Detection",
    "Data Security",
    "Next.js Portfolio",
    "Full Stack Developer",
    "CrowdStrike",
    "Microsoft Defender",
  ],
  authors: [{ name: "Harshit Gupta", url: "https://github.com/HarshitGupta3017" }],
  openGraph: {
    title: "Harshit Gupta | Security Engineer",
    description:
      "Cybersecurity Analyst & Developer — threat detection, data security, and automation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Harshit Gupta | Security Engineer",
    description:
      "Cybersecurity Analyst & Developer — threat detection, data security, and automation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans bg-[#0a0e17] text-gray-200 antialiased min-h-screen relative overflow-x-hidden`}
        suppressHydrationWarning
      >
        <Cursor />
        {/* Persistent background grid */}
        <div className="fixed inset-0 z-0 pointer-events-none cyber-grid opacity-30"></div>
        <div className="relative z-10 w-full overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
