import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "Student's Gala",
  description: `Students’ Gala, a district-level celebration of knowledge,
            creativity, and innovation! Bringing together thousands of higher
            secondary students, Students Gala 2025 features inspiring sessions
            on higher education, entrepreneurship, AI, and emerging
            technologies, along with vibrant arts competitions and team
            activities.`,
  openGraph: {
    title: "Student's Gala",
    description: `Students’ Gala, a district-level celebration of knowledge,
            creativity, and innovation! Bringing together thousands of higher
            secondary students, Students Gala 2025 features inspiring sessions
            on higher education, entrepreneurship, AI, and emerging
            technologies, along with vibrant arts competitions and team
            activities.`,
  },
  keywords: ["gala"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`font-poppins antialiased `}>{children}</body>
    </html>
  );
}
