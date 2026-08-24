"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { resumeData } from "@/data/resume";

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="section-pad rule">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="index-label mb-4">04 — Skills</div>
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-ink">
            Tools of the trade
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {Object.entries(resumeData.skills).map(([category, items], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.1, duration: 0.5 }}
              className="pt-6 rule"
            >
              <div className="font-mono text-xs text-rust uppercase tracking-widest mb-4">{category}</div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 border border-line text-ink hover:border-rust hover:text-rust transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
