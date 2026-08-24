"use client";
import { resumeData } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="rule py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-xs text-muted">
        <div>
          &copy; {new Date().getFullYear()} <span className="text-ink">Saurabh Yadav</span> · Data Analyst · New Delhi
        </div>
        <a
          href={`https://${resumeData.basics.linkedin}`}
          target="_blank"
          rel="noopener"
          className="underline-link text-ink"
        >
          {resumeData.basics.linkedin}
        </a>
      </div>
    </footer>
  );
}
