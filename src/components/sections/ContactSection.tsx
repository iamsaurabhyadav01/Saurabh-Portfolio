"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { resumeData } from "@/data/resume";
import { generateResumePDF } from "@/lib/generateResume";
import { Mail, Phone, MapPin, Linkedin, ExternalLink, Download } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { basics } = resumeData;

  return (
    <section id="contact" ref={ref} className="section-pad relative overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)" }} />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="font-mono text-xs text-cyan-400/70 tracking-[0.2em] uppercase mb-4">06 / Contact</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Let&apos;s Build Something with <span className="gradient-text">Data</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Open to full-time Data Analyst roles, hybrid positions, and freelance analytics projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Mail, label: "Email", value: basics.email, href: `mailto:${basics.email}` },
            { icon: Phone, label: "Phone", value: basics.phone, href: `tel:${basics.phone}` },
            { icon: Linkedin, label: "LinkedIn", value: basics.linkedin, href: `https://${basics.linkedin}` },
            { icon: MapPin, label: "Location", value: basics.location, href: null },
          ].map(({ icon: Icon, label, value, href }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
            >
              {href ? (
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener"
                  className="glass rounded-xl p-5 flex items-center gap-4 hover-glow group transition-all block">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                    style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
                    <Icon size={18} className="text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-muted uppercase tracking-wider mb-0.5">{label}</div>
                    <div className="text-white text-sm truncate">{value}</div>
                  </div>
                  <ExternalLink size={14} className="text-muted/40 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                </a>
              ) : (
                <div className="glass rounded-xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)" }}>
                    <Icon size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted uppercase tracking-wider mb-0.5">{label}</div>
                    <div className="text-white text-sm">{value}</div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a href={`mailto:${basics.email}`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-black transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg,#00d4ff,#0099cc)", boxShadow: "0 0 30px rgba(0,212,255,0.3)" }}>
            <Mail size={18} />
            Send Me a Message
          </a>
          <div className="mt-4">
            <a
              href="/resume.pdf"
              download="Saurabh_Yadav_Resume.pdf"
              className="inline-flex items-center gap-2 text-muted text-sm hover:text-white transition-colors cursor-pointer"
            >
              <Download size={14} />
              Download Resume PDF
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
