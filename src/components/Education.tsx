"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Award, Star, Users, ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const { education, certifications, volunteer, leadership } = portfolioData as any;

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22,1,0.36,1] } } };

/* ── Education Card — rises up with glow flash ────── */
function EduCard({ edu, idx }: { edu: any; idx: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: idx * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(124,58,237,.18)" }}
      whileTap={{ scale: 0.98 }}
      className={`relative p-5 sm:p-6 rounded-2xl border overflow-hidden ${
        edu.highlight ? "glass gradient-border" : "glass border-border"
      }`}
    >
      {/* Shimmer top line draws in on entry */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: idx * 0.1 + 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-transparent"
      />

      {/* Entry glow flash */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={isInView ? { opacity: 0 } : {}}
        transition={{ delay: idx * 0.1 + 0.1, duration: 0.9 }}
        className="absolute inset-0 bg-primary/8 pointer-events-none rounded-2xl"
      />

      <div className="flex items-start gap-3 sm:gap-4">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: idx * 0.1 + 0.2, type: "spring", stiffness: 300, damping: 18 }}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shrink-0 ${
            edu.highlight ? "bg-primary/15 border border-primary/30" : "bg-surface-2 border border-border"
          }`}
        >
          {edu.icon}
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <motion.h4
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: idx * 0.1 + 0.25, duration: 0.4 }}
              className="font-black text-text-primary text-base sm:text-lg"
            >
              {edu.institution}
            </motion.h4>
            {edu.highlight && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: idx * 0.1 + 0.45, type: "spring", stiffness: 400, damping: 18 }}
                className="px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-bold shrink-0"
              >
                Current
              </motion.span>
            )}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: idx * 0.1 + 0.3, duration: 0.4 }}
            className="text-text-secondary text-sm sm:text-base mt-1"
          >
            {edu.degree}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: idx * 0.1 + 0.38, duration: 0.4 }}
            className="flex flex-wrap gap-2 sm:gap-4 mt-2"
          >
            <div className="flex items-center gap-1.5 text-text-muted text-xs sm:text-sm"><MapPin size={11} />{edu.location}</div>
            <div className="flex items-center gap-1.5 text-text-muted text-xs sm:text-sm"><Calendar size={11} />{edu.period}</div>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm"><Star size={11} className="text-yellow-400" /><span className="text-yellow-400 font-bold">GPA: {edu.gpa}</span></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Cert Card — slides from right with icon pulse ── */
function CertCard({ cert, idx }: { cert: any; idx: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50, scale: 0.96 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 5, boxShadow: "0 8px 24px rgba(245,158,11,0.12)" }}
      whileTap={{ scale: 0.97 }}
      className="p-4 rounded-2xl glass border border-border cursor-pointer relative overflow-hidden"
    >
      {/* Right-side glow flash on entry */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={isInView ? { opacity: 0 } : {}}
        transition={{ delay: idx * 0.12, duration: 0.8 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "linear-gradient(to left, rgba(245,158,11,0.12), transparent 60%)" }}
      />

      {/* Top shimmer from right */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: idx * 0.12 + 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "right" }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-accent via-primary/50 to-transparent"
      />

      <div className="flex items-center gap-3">
        <motion.span
          initial={{ scale: 0, rotate: 15 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: idx * 0.12 + 0.15, type: "spring", stiffness: 350, damping: 18 }}
          className="text-2xl shrink-0"
        >
          {cert.icon}
        </motion.span>
        <div className="min-w-0">
          <motion.p
            initial={{ opacity: 0, x: 12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: idx * 0.12 + 0.2, duration: 0.4 }}
            className="text-text-primary text-sm font-bold leading-snug"
          >
            {cert.title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: idx * 0.12 + 0.28, duration: 0.4 }}
            className="text-text-muted text-xs mt-0.5 leading-snug"
          >
            {cert.issuer}
          </motion.p>
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: idx * 0.12 + 0.38, type: "spring", stiffness: 300 }}
            className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${
              cert.status === "Completed"
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
            }`}
          >
            {cert.status}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Leadership Card — slides from left + bullets stagger */
function LeaderCard({ l, idx }: { l: any; idx: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50, rotate: -1 }}
      animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
      transition={{ delay: idx * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(99,102,241,0.15)" }}
      whileTap={{ scale: 0.98 }}
      className="p-5 sm:p-6 rounded-2xl glass border border-border relative overflow-hidden"
    >
      {/* Left-side glow flash */}
      <motion.div
        initial={{ opacity: 0.25 }}
        animate={isInView ? { opacity: 0 } : {}}
        transition={{ delay: idx * 0.1 + 0.1, duration: 0.9 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(99,102,241,0.12), transparent 60%)" }}
      />

      <div className="flex items-start gap-3 mb-3">
        <motion.span
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: idx * 0.1 + 0.2, type: "spring", stiffness: 320, damping: 18 }}
          className="text-2xl shrink-0"
        >
          {l.icon}
        </motion.span>
        <div>
          <motion.p
            initial={{ opacity: 0, x: -14 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: idx * 0.1 + 0.22, duration: 0.4 }}
            className="text-text-primary font-black text-base leading-snug"
          >
            {l.role}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: idx * 0.1 + 0.3, duration: 0.4 }}
            className="text-primary-light text-sm font-semibold mt-0.5"
          >
            {l.org}
          </motion.p>
          <div className="flex items-center gap-1.5 text-text-muted text-sm mt-1">
            <Calendar size={12} />{l.period}
          </div>
        </div>
      </div>
      <ul className="space-y-2">
        {l.bullets.map((b: string, i: number) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -14 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: idx * 0.1 + 0.35 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-2.5 text-text-secondary text-sm leading-relaxed"
          >
            <ArrowRight size={13} className="mt-0.5 text-primary/70 shrink-0" />
            {b}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ── Volunteer Card — zooms up with slight rotation ─ */
function VolCard({ v, idx }: { v: any; idx: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9, rotate: idx % 2 === 0 ? 1 : -1 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
      transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(99,102,241,0.15)" }}
      whileTap={{ scale: 0.98 }}
      className="p-4 sm:p-5 rounded-2xl glass border border-border relative overflow-hidden"
    >
      {/* Top shimmer */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: idx * 0.1 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-accent/70 via-primary/40 to-transparent"
      />

      <div className="flex items-start gap-3 mb-2">
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: idx * 0.1 + 0.18, type: "spring", stiffness: 350, damping: 18 }}
          className="text-2xl shrink-0"
        >
          {v.icon}
        </motion.span>
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: idx * 0.1 + 0.22, duration: 0.4 }}
            className="text-text-primary font-black text-base leading-snug"
          >
            {v.event}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: idx * 0.1 + 0.3, duration: 0.4 }}
            className="text-primary-light text-sm font-semibold mt-0.5"
          >
            {v.role} <span className="text-text-muted font-normal">| {v.location}</span>
          </motion.p>
          <p className="text-text-muted text-sm mt-1 font-medium">{v.date}</p>
        </div>
      </div>
      {v.bullets && (
        <ul className="space-y-2 mt-2">
          {v.bullets.map((b: string, i: number) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1 + 0.38 + i * 0.08, duration: 0.4 }}
              className="flex gap-2.5 text-text-secondary text-sm leading-relaxed"
            >
              <ArrowRight size={13} className="mt-0.5 text-primary/70 shrink-0" />
              {b}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────── */
export default function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="section-padding relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "show" : "hidden"} variants={container}>

          {/* Header */}
          <motion.div variants={item} className="text-center mb-7">
            <span className="section-label">Background</span>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary mt-3">Education & Certs</h2>
          </motion.div>

          {/* Row 1 — Education + Certifications */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">

            {/* Education (2 cols) */}
            <div className="lg:col-span-2 space-y-5">
              <motion.h3 variants={item} className="text-lg font-bold text-text-secondary flex items-center gap-2">
                <GraduationCap size={18} className="text-primary-light" />
                Academic Background
              </motion.h3>
              {education.map((edu: any, idx: number) => (
                <EduCard key={idx} edu={edu} idx={idx} />
              ))}
            </div>

            {/* Certifications (1 col) */}
            <div>
              <motion.h3 variants={item} className="text-lg font-bold text-text-secondary flex items-center gap-2 mb-4">
                <Award size={18} className="text-accent" />
                Certifications
              </motion.h3>
              <div className="space-y-3">
                {certifications.map((cert: any, idx: number) => (
                  <CertCard key={idx} cert={cert} idx={idx} />
                ))}
              </div>
            </div>
          </div>

          {/* Row 2 — Leadership + Volunteer */}
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Leadership */}
            <div>
              <motion.h3 variants={item} className="text-lg font-bold text-text-secondary flex items-center gap-2 mb-4">
                <Users size={18} className="text-primary-light" />
                Leadership Experience
              </motion.h3>
              {leadership.map((l: any, idx: number) => (
                <LeaderCard key={idx} l={l} idx={idx} />
              ))}
            </div>

            {/* Volunteer */}
            <div>
              <motion.h3 variants={item} className="text-lg font-bold text-text-secondary flex items-center gap-2 mb-4">
                <span>🤝</span> Volunteer Experience
              </motion.h3>
              <div className="space-y-4">
                {volunteer.map((v: any, idx: number) => (
                  <VolCard key={idx} v={v} idx={idx} />
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
