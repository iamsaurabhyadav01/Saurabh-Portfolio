"use client";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { ArrowDown, Download, ExternalLink } from "lucide-react";

export default function HeroSection() {
  const { basics, topImpact } = resumeData;

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className="index-label mb-6"
            >
              Data Analyst · New Delhi, India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="font-display font-semibold leading-[1.02] mb-8 text-ink"
              style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)" }}
            >
              Turning raw data
              <br />
              into <span className="italic text-rust">clear decisions.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
              className="text-muted text-lg leading-relaxed mb-10 max-w-xl"
            >
              {basics.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 font-medium text-sm text-surface bg-ink hover:bg-rust transition-colors"
              >
                View Experience <ArrowDown size={15} />
              </button>
              <a
                href="/resume.pdf"
                download="Saurabh_Yadav_Resume.pdf"
                className="flex items-center gap-2 px-6 py-3 font-medium text-sm text-ink border border-line hover:border-rust hover:text-rust transition-colors"
              >
                Download Resume <Download size={15} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 font-mono text-xs text-muted"
            >
              <a href={`https://${basics.linkedin}`} target="_blank" rel="noopener" className="underline-link flex items-center gap-1 text-ink">
                LinkedIn <ExternalLink size={10} />
              </a>
              <span className="text-line">/</span>
              <a href={`mailto:${basics.email}`} className="underline-link text-ink">
                {basics.email}
              </a>
              <span className="text-line">/</span>
              <span>{basics.phone}</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="card divide-y divide-line"
          >
            {topImpact.map((item, i) => (
              <div key={i} className="flex items-baseline justify-between gap-4 px-5 py-4">
                <div>
                  <div className="text-ink text-sm font-medium">{item.label}</div>
                  <div className="font-mono text-xs text-muted mt-0.5">{item.context}</div>
                </div>
                <div className="font-display font-semibold text-2xl text-rust flex-shrink-0">{item.metric}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted/50"
      >
        <ArrowDown size={18} />
      </motion.div>
    </section>
  );
}
