"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { resumeData } from "@/data/resume";
import { ChevronDown, Calendar, MapPin } from "lucide-react";

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="experience" ref={ref} className="section-pad rule">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="index-label mb-4">02 — Experience</div>
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-ink">
            Where I&apos;ve made impact
          </h2>
        </motion.div>

        <div className="rule">
          {resumeData.experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="border-b border-line"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full text-left py-7 flex items-start justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <span className="font-display font-semibold text-2xl text-ink">{exp.role}</span>
                    <span className="text-rust font-medium">{exp.company}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted mb-4 font-mono">
                    <span className="flex items-center gap-1"><Calendar size={12} />{exp.dates}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} />{exp.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <span key={h} className="font-mono text-xs px-3 py-1 border border-line text-muted">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-muted flex-shrink-0 mt-2"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8">
                      <div className="flex flex-wrap gap-2 mb-5 font-mono text-xs text-muted">
                        <span className="mr-1">Tools:</span>
                        {exp.tools.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-paper border border-line">{t}</span>
                        ))}
                      </div>
                      <ul className="space-y-3 max-w-3xl">
                        {exp.bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-3 text-muted text-sm leading-relaxed">
                            <span className="text-rust mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-rust" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
