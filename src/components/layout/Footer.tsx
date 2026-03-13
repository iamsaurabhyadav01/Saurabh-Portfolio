"use client";
import { resumeData } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-muted">
          © 2025 <span className="text-cyan-400">Saurabh Yadav</span> · Data Analyst · New Delhi
        </div>
        <div className="font-mono text-xs text-muted/40">
          Built with Next.js · TypeScript · Framer Motion
        </div>
        <a href={`https://${resumeData.basics.linkedin}`} target="_blank" rel="noopener"
          className="font-mono text-xs text-muted hover:text-cyan-400 transition-colors">
          {resumeData.basics.linkedin}
        </a>
      </div>
    </footer>
  );
}
