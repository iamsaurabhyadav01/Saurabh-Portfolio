"use client";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import { ArrowDown, Download, ExternalLink } from "lucide-react";

export default function HeroSection() {
  const { basics, topImpact } = resumeData;

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-16 grid-bg">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-mono text-xs text-cyan-400/70 tracking-[0.2em] uppercase mb-6 accent-line"
            >
              Data Analyst · New Delhi, India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-display font-bold leading-[1.0] mb-6"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              <span className="text-white">Saurabh</span>
              <br />
              <span className="gradient-text glow-text">Yadav</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-muted text-lg leading-relaxed mb-10 max-w-lg"
            >
              {basics.summary.slice(0, 180)}…
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-black transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg,#00d4ff,#0099cc)", boxShadow: "0 0 20px rgba(0,212,255,0.3)" }}
              >
                View Experience <ArrowDown size={16} />
              </button>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-white border border-white/10 hover:border-cyan-500/40 hover:bg-white/5 transition-all"
              >
                Download Resume <Download size={16} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-6 mt-10"
            >
              <a href={`https://${basics.linkedin}`} target="_blank" rel="noopener"
                className="font-mono text-xs text-muted hover:text-cyan-400 transition-colors flex items-center gap-1">
                LinkedIn <ExternalLink size={10} />
              </a>
              <span className="text-border">|</span>
              <a href={`mailto:${basics.email}`}
                className="font-mono text-xs text-muted hover:text-cyan-400 transition-colors">
                {basics.email}
              </a>
              <span className="text-border">|</span>
              <span className="font-mono text-xs text-muted">{basics.phone}</span>
            </motion.div>
          </div>

          {/* Right — Impact metrics */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {topImpact.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="glass rounded-xl p-5 hover-glow cursor-default"
              >
                <div className="font-display font-bold text-3xl gradient-text mb-1">{item.metric}</div>
                <div className="text-white text-sm font-medium mb-1">{item.label}</div>
                <div className="font-mono text-xs text-muted">{item.context}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted/40"
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
}
