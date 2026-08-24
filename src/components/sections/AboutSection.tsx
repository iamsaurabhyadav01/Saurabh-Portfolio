"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { resumeData } from "@/data/resume";
import { MapPin, Mail, Phone, Briefcase } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { basics } = resumeData;

  return (
    <section id="about" ref={ref} className="section-pad rule">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="index-label mb-4">01 — About</div>
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-ink mb-14">
            The story behind the data
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.6 }}
          >
            <p className="text-ink text-xl leading-relaxed font-display mb-10">
              {basics.summary}
            </p>
            <div className="grid grid-cols-2 gap-px bg-line border border-line">
              {[
                { icon: MapPin, label: "Location", value: basics.location },
                { icon: Mail, label: "Email", value: basics.email },
                { icon: Phone, label: "Phone", value: basics.phone },
                { icon: Briefcase, label: "Status", value: basics.openTo },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-surface p-4">
                  <div className="flex items-center gap-2 mb-1.5 text-muted">
                    <Icon size={13} />
                    <span className="font-mono text-[11px] uppercase tracking-wider">{label}</span>
                  </div>
                  <div className="text-ink text-sm">{value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="font-mono text-xs text-rust uppercase tracking-widest mb-5">Tech Stack</div>
            <div className="space-y-6">
              {Object.entries(resumeData.skills).map(([cat, items]) => (
                <div key={cat}>
                  <div className="text-sm text-ink font-medium mb-2">{cat}</div>
                  <div className="text-muted text-sm leading-relaxed">
                    {items.join("  ·  ")}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
