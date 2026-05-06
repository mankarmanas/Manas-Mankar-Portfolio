"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Brain } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeSection, setActive]    = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(s); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong border-b border-border/40 shadow-xl shadow-black/25" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between" style={{ height: "72px" }}>
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors"
          >
            <Brain size={18} className="text-primary-light" />
          </motion.div>
          <span className="font-black text-lg text-text-primary tracking-tight">
            Manas<span className="text-primary-light">.</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const sec = link.href.replace("#", "");
            const active = activeSection === sec;
            return (
              <li key={link.href}>
                <button
                  onClick={() => go(link.href)}
                  className={`relative px-4 py-2 rounded-xl text-base font-semibold transition-all duration-200 ${
                    active ? "text-primary-light" : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl bg-primary/12"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <a
          href="mailto:manasmahendra5@gmail.com"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/20 border border-primary/40 text-primary-light text-base font-bold hover:bg-primary/30 hover:border-primary/60 transition-all hover:scale-105"
        >
          Hire Me
        </a>

        {/* Mobile */}
        <button className="md:hidden p-2.5 rounded-xl glass border border-border/50" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/40 glass-strong overflow-hidden"
          >
            <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <button onClick={() => go(l.href)} className="w-full text-left px-4 py-3.5 rounded-xl text-base font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-2 transition-all">
                    {l.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <a href="mailto:manasmahendra5@gmail.com" className="block w-full text-center px-4 py-3.5 rounded-xl bg-primary/20 border border-primary/40 text-primary-light text-base font-bold">
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
