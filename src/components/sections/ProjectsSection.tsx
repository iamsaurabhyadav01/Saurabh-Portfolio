"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { resumeData } from "@/data/resume";
import { Zap } from "lucide-react";

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="section-pad">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-400/70 tracking-[0.2em] uppercase mb-4 accent-line">03 / Projects</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Built With <span className="gradient-text">Real Data</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {resumeData.projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass rounded-2xl p-6 hover-glow flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="font-mono text-xs text-muted">0{i + 1} / 04</div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
                  <Zap size={14} className="text-cyan-400" />
                </div>
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-1">{proj.title}</h3>
              <div className="text-cyan-400 text-sm mb-4">{proj.company}</div>

              <div className="flex flex-wrap gap-2 mb-4">
                {proj.stack.map((s) => (
                  <span key={s} className="font-mono text-xs px-2 py-1 rounded border border-border text-muted"
                    style={{ background: "rgba(124,58,237,0.06)" }}>
                    {s}
                  </span>
                ))}
              </div>

              <ul className="space-y-2 mb-5 flex-1">
                {proj.bullets.map((b, bi) => (
                  <li key={bi} className="text-muted text-sm leading-relaxed flex gap-2">
                    <span className="text-cyan-500/50 mt-1 flex-shrink-0 text-xs">▹</span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="border-t border-border/50 pt-4">
                <div className="font-mono text-xs text-cyan-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-slow" />
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
