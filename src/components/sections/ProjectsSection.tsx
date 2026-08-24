"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { resumeData } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="section-pad rule">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="index-label mb-4">03 — Projects</div>
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-ink">
            Built with real data
          </h2>
        </motion.div>

        <div className="rule">
          {resumeData.projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="border-b border-line py-8 grid md:grid-cols-[auto_1fr_auto] gap-x-8 gap-y-3 items-start group"
            >
              <div className="font-mono text-sm text-muted">0{i + 1}</div>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 mb-2">
                  <h3 className="font-display font-semibold text-2xl text-ink group-hover:text-rust transition-colors">
                    {proj.title}
                  </h3>
                  <span className="text-muted text-sm">{proj.company}</span>
                </div>
                <ul className="space-y-1.5 mb-3 max-w-2xl">
                  {proj.bullets.map((b, bi) => (
                    <li key={bi} className="text-muted text-sm leading-relaxed flex gap-2">
                      <span className="text-rust mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-rust" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-3">
                  {proj.stack.map((s) => (
                    <span key={s} className="font-mono text-xs px-2 py-0.5 border border-line text-muted">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="font-mono text-xs text-rust flex items-center gap-1.5">
                  <ArrowUpRight size={13} />
                  {proj.impact}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
