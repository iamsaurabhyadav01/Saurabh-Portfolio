"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { resumeData } from "@/data/resume";
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight, Download } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { basics } = resumeData;

  return (
    <section id="contact" ref={ref} className="section-pad rule">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="index-label mb-4">06 — Contact</div>
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-ink mb-4">
            Let&apos;s build something with data
          </h2>
          <p className="text-muted max-w-xl">
            Open to full-time Data Analyst roles, hybrid positions, and freelance analytics projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-line border border-line mb-12">
          {[
            { icon: Mail, label: "Email", value: basics.email, href: `mailto:${basics.email}` },
            { icon: Phone, label: "Phone", value: basics.phone, href: `tel:${basics.phone}` },
            { icon: Linkedin, label: "LinkedIn", value: basics.linkedin, href: `https://${basics.linkedin}` },
            { icon: MapPin, label: "Location", value: basics.location, href: null },
          ].map(({ icon: Icon, label, value, href }, i) => {
            const content = (
              <div className="bg-surface p-5 flex items-center gap-4 group h-full">
                <Icon size={18} className="text-rust flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[11px] text-muted uppercase tracking-wider mb-0.5">{label}</div>
                  <div className="text-ink text-sm truncate">{value}</div>
                </div>
                {href && <ArrowUpRight size={14} className="text-muted/40 group-hover:text-rust transition-colors flex-shrink-0" />}
              </div>
            );
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              >
                {href ? (
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="block">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex flex-wrap items-center gap-6"
        >
          <a
            href={`mailto:${basics.email}`}
            className="inline-flex items-center gap-2 px-8 py-4 font-medium text-surface bg-ink hover:bg-rust transition-colors"
          >
            <Mail size={17} />
            Send me a message
          </a>
          <a
            href="/resume.pdf"
            download="Saurabh_Yadav_Resume.pdf"
            className="inline-flex items-center gap-2 text-muted text-sm hover:text-rust transition-colors"
          >
            <Download size={14} />
            Download Resume PDF
          </a>
        </motion.div>
      </div>
    </section>
  );
}
