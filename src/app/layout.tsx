import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saurabh Yadav — Data Analyst",
  description:
    "Data Analyst with 3+ years of experience transforming raw data into actionable business decisions across EdTech and Consumer Electronics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
