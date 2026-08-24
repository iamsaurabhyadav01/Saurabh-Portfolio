"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { resumeData } from "@/data/resume";
import { Award, GraduationCap, CheckCircle2, Clock3, Sparkles } from "lucide-react";

export default function CertificationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const statusIcon = (status: string) => {
    if (status.includes("Completed")) return <CheckCircle2 size={13} className="text-moss" />;
    if (status.includes("Progress")) return <Clock3 size={13} className="text-rust" />;
    return <Sparkles size={13} className="text-muted" />;
  };

  return (
    <section id="certifications" ref={ref} className="section-pad rule">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="index-label mb-4">05 — Credentials</div>
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-ink">
            Certifications &amp; education
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-2 mb-6 text-muted">
              <Award size={15} />
              <span className="font-mono text-xs uppercase tracking-widest">Certifications</span>
            </div>
            <div className="rule">
              {resumeData.certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  className="py-5 border-b border-line"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-ink font-medium text-sm leading-snug">{cert.name}</h3>
                    <span className="font-mono text-xs flex items-center gap-1 flex-shrink-0 text-muted">
                      {statusIcon(cert.status)}
                      {cert.status.split(":")[0].trim()}
                    </span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed">{cert.skills}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6 text-muted">
              <GraduationCap size={15} />
              <span className="font-mono text-xs uppercase tracking-widest">Education</span>
            </div>
            {resumeData.education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="card p-6"
              >
                <h3 className="text-ink font-display font-semibold text-xl mb-1">{edu.degree}</h3>
                <div className="text-rust text-sm mb-1">{edu.institution}</div>
                <div className="text-muted text-sm mb-6">{edu.location}</div>
                <div className="flex gap-8 pt-5 border-t border-line">
                  <div>
                    <div className="font-display font-semibold text-2xl text-ink">{edu.cgpa}</div>
                    <div className="font-mono text-xs text-muted mt-1">CGPA</div>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-2xl text-ink">{edu.graduated}</div>
                    <div className="font-mono text-xs text-muted mt-1">Graduated</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
