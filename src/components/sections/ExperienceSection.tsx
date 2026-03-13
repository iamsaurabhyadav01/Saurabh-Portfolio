"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { resumeData } from "@/data/resume";
import { ChevronDown, Building2, Calendar, MapPin } from "lucide-react";

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="experience" ref={ref} className="section-pad relative"
      style={{ background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.02), transparent)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-400/70 tracking-[0.2em] uppercase mb-4 accent-line">02 / Experience</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Where I&apos;ve Made <span className="gradient-text">Impact</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {resumeData.experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <div
                className={`glass rounded-2xl overflow-hidden hover-glow cursor-pointer transition-all duration-300 ${open === i ? "border-cyan-500/30" : ""}`}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                {/* Header */}
                <div className="p-6 md:p-8 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg,rgba(0,212,255,0.2),rgba(124,58,237,0.2))", border: "1px solid rgba(0,212,255,0.2)" }}>
                        <Building2 size={18} className="text-cyan-400" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-xl text-white">{exp.role}</div>
                        <div className="text-cyan-400 font-medium">{exp.company}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted mb-4">
                      <span className="flex items-center gap-1"><Calendar size={12} />{exp.dates}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} />{exp.location}</span>
                    </div>
                    {/* Highlight chips */}
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((h) => (
                        <span key={h} className="font-mono text-xs px-3 py-1 rounded-full text-cyan-400 font-medium"
                          style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-muted flex-shrink-0 mt-1"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 border-t border-border/50">
                        {/* Tools */}
                        <div className="flex flex-wrap gap-2 py-5">
                          <span className="font-mono text-xs text-muted mr-2">Tools:</span>
                          {exp.tools.map((t) => (
                            <span key={t} className="font-mono text-xs px-2 py-1 rounded border border-border text-muted"
                              style={{ background: "rgba(124,58,237,0.06)" }}>
                              {t}
                            </span>
                          ))}
                        </div>
                        {/* Bullets */}
                        <ul className="space-y-3">
                          {exp.bullets.map((b, bi) => (
                            <motion.li
                              key={bi}
                              initial={{ opacity: 0, x: -16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: bi * 0.06 }}
                              className="flex gap-3 text-muted text-sm leading-relaxed"
                            >
                              <span className="text-cyan-500 mt-1 flex-shrink-0 text-xs">▹</span>
                              <span>{b}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
