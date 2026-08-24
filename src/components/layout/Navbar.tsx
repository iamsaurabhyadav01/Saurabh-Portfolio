"use client";
import { useEffect, useState } from "react";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = navItems.map((n) => document.getElementById(n.id));
      let cur = "";
      sections.forEach((sec) => {
        if (sec && window.scrollY >= sec.offsetTop - 200) cur = sec.id;
      });
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-paper/90 backdrop-blur-sm border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display font-semibold text-lg tracking-tight text-ink"
        >
          Saurabh Yadav
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                active === item.id ? "text-rust" : "text-muted hover:text-ink"
              }`}
            >
              <span className="mr-1 text-[10px] opacity-60">0{i + 1}</span>
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-ink p-2"
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-[1.5px] bg-current mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <div className={`w-5 h-[1.5px] bg-current mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-[1.5px] bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface border-b border-line">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="w-full text-left px-6 py-4 font-mono text-xs uppercase tracking-wider text-muted hover:text-rust border-t border-line first:border-t-0"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
