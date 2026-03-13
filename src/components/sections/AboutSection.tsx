"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { resumeData } from "@/data/resume";
import { MapPin, Mail, Phone, Briefcase } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { basics } = resumeData;

  return (
    <section id="about" ref={ref} className="section-pad relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-xs text-cyan-400/70 tracking-[0.2em] uppercase mb-4 accent-line">About</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-16">
            The Story Behind the <span className="gradient-text">Data</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-muted text-lg leading-relaxed mb-6">{basics.summary}</p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: MapPin, label: "Location", value: basics.location },
                { icon: Mail, label: "Email", value: basics.email },
                { icon: Phone, label: "Phone", value: basics.phone },
                { icon: Briefcase, label: "Status", value: basics.openTo },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass rounded-xl p-4 hover-glow">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} className="text-cyan-400" />
                    <span className="font-mono text-xs text-muted uppercase tracking-wider">{label}</span>
                  </div>
                  <div className="text-white text-sm">{value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="font-mono text-xs text-cyan-400/70 uppercase tracking-widest mb-4">Tech Stack</div>
            {Object.entries(resumeData.skills).map(([cat, items], ci) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + ci * 0.08 }}
              >
                <div className="text-xs text-muted mb-2">{cat}</div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill}
                      className="font-mono text-xs px-3 py-1.5 rounded-md border border-border text-muted hover:border-cyan-500/40 hover:text-white transition-all cursor-default"
                      style={{ background: "rgba(0,212,255,0.03)" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
