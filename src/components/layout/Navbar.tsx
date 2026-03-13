"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certs" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navItems.map((n) => document.getElementById(n.id));
      let cur = "";
      sections.forEach((sec) => {
        if (sec && window.scrollY >= sec.offsetTop - 200) cur = sec.id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-bg/80 backdrop-blur-md border-b border-border/50" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-sm text-cyan-400 font-medium tracking-wider hover:text-white transition-colors">
            SY<span className="text-muted">.</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3 py-2 text-sm transition-colors rounded-md ${
                  active === item.id ? "text-white" : "text-muted hover:text-white"
                }`}>
                {active === item.id && (
                  <motion.span layoutId="nav-pill"
                    className="absolute inset-0 rounded-md"
                    style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-muted hover:text-white p-2">
            <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-16 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-b border-border md:hidden"
        >
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="w-full text-left px-6 py-4 text-sm text-muted hover:text-white hover:bg-white/5 border-b border-border/30 transition-colors">
              {item.label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Scroll progress */}
      <ScrollProgress />
    </>
  );
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((window.scrollY / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50">
      <motion.div className="h-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#00d4ff,#7c3aed)" }} />
    </div>
  );
}
