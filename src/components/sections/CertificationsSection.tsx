"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { resumeData } from "@/data/resume";
import { Award, GraduationCap, CheckCircle, Clock, Star } from "lucide-react";

export default function CertificationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const statusIcon = (status: string) => {
    if (status.includes("Completed")) return <CheckCircle size={14} className="text-green-400" />;
    if (status.includes("Progress")) return <Clock size={14} className="text-amber-400" />;
    return <Star size={14} className="text-purple-400" />;
  };
  const statusColor = (status: string) => {
    if (status.includes("Completed")) return "text-green-400 bg-green-400/10 border-green-400/20";
    if (status.includes("Progress")) return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    return "text-purple-400 bg-purple-400/10 border-purple-400/20";
  };

  return (
    <section id="certifications" ref={ref} className="section-pad">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-400/70 tracking-[0.2em] uppercase mb-4 accent-line">05 / Credentials</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Certifications & <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Certifications */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Award size={16} className="text-cyan-400" />
              <span className="font-mono text-xs text-cyan-400/70 uppercase tracking-widest">Certifications</span>
            </div>
            <div className="space-y-4">
              {resumeData.certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  className="glass rounded-xl p-5 hover-glow"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-white font-medium text-sm leading-snug">{cert.name}</h3>
                    <span className={`font-mono text-xs px-2 py-1 rounded-full border flex items-center gap-1 flex-shrink-0 ${statusColor(cert.status)}`}>
                      {statusIcon(cert.status)}
                      {cert.status.split(":")[0].trim()}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-muted leading-relaxed">{cert.skills}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap size={16} className="text-cyan-400" />
              <span className="font-mono text-xs text-cyan-400/70 uppercase tracking-widest">Education</span>
            </div>
            {resumeData.education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="glass rounded-xl p-6 hover-glow"
              >
                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(0,212,255,0.1))", border: "1px solid rgba(124,58,237,0.3)" }}>
                  <GraduationCap size={22} className="text-purple-400" />
                </div>
                <h3 className="text-white font-display font-bold text-xl mb-1">{edu.degree}</h3>
                <div className="text-cyan-400 text-sm mb-1">{edu.institution}</div>
                <div className="text-muted text-sm mb-4">{edu.location}</div>
                <div className="flex gap-4">
                  <div className="glass rounded-lg px-4 py-2 text-center">
                    <div className="font-display font-bold text-2xl gradient-text">{edu.cgpa}</div>
                    <div className="font-mono text-xs text-muted">CGPA</div>
                  </div>
                  <div className="glass rounded-lg px-4 py-2 text-center">
                    <div className="font-display font-bold text-2xl text-white">{edu.graduated}</div>
                    <div className="font-mono text-xs text-muted">Graduated</div>
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
