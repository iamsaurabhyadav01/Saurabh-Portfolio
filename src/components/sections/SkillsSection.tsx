"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { resumeData } from "@/data/resume";

const skillLevels: Record<string, number> = {
  "SQL (MySQL, PostgreSQL, Redshift)": 95,
  "Python (pandas, numpy, matplotlib)": 70,
  "Power BI": 92,
  "Tableau": 88,
  "Looker Studio": 82,
  "Advanced Excel (Pivot Tables, VLOOKUP, INDEX-MATCH, Macros)": 90,
  "Data Cleaning": 94,
  "EDA": 88,
  "Descriptive Statistics": 82,
  "KPI Tracking": 95,
  "A/B Testing": 75,
  "Hypothesis Testing": 70,
  "Data Modeling": 80,
  "ETL Processes": 84,
  "Data Warehousing": 78,
  "Window Functions": 90,
  "Joins": 95,
  "Git": 72,
  "GitHub": 72,
  "Google BigQuery": 68,
  "Amazon AWS (Fundamentals)": 55,
  "Google Sheets": 88,
};

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="section-pad"
      style={{ background: "linear-gradient(180deg, transparent, rgba(124,58,237,0.02), transparent)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-400/70 tracking-[0.2em] uppercase mb-4 accent-line">04 / Skills</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Tools of the <span className="gradient-text">Trade</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {Object.entries(resumeData.skills).map(([category, items], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.1, duration: 0.6 }}
              className="glass rounded-2xl p-6"
            >
              <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-5">{category}</div>
              <div className="space-y-4">
                {items.map((skill, si) => {
                  const level = skillLevels[skill] ?? 75;
                  return (
                    <div key={skill}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm text-muted">{skill}</span>
                        <span className="font-mono text-xs text-muted/60">{level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: level >= 85 ? "linear-gradient(90deg,#00d4ff,#0099cc)" : "linear-gradient(90deg,#7c3aed,#5b21b6)" }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${level}%` } : { width: 0 }}
                          transition={{ delay: 0.3 + ci * 0.1 + si * 0.05, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
