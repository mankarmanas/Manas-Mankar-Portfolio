"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Calendar, Award, Star, Users, ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const { education, certifications, volunteer, leadership } = portfolioData as any;

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22,1,0.36,1] } } };

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
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary mt-3">Education & Experience</h2>
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
                <motion.div
                  key={idx}
                  variants={item}
                  whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(124,58,237,.18)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className={`relative p-5 sm:p-6 rounded-2xl border overflow-hidden ${
                    edu.highlight ? "glass gradient-border" : "glass border-border"
                  }`}
                >
                  {edu.highlight && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shrink-0 ${
                      edu.highlight ? "bg-primary/15 border border-primary/30" : "bg-surface-2 border border-border"
                    }`}>{edu.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h4 className="font-black text-text-primary text-base sm:text-lg">{edu.institution}</h4>
                        {edu.highlight && (
                          <span className="px-2.5 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-bold shrink-0">Current</span>
                        )}
                      </div>
                      <p className="text-text-secondary text-sm sm:text-base mt-1">{edu.degree}</p>
                      <div className="flex flex-wrap gap-2 sm:gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-text-muted text-xs sm:text-sm"><MapPin size={11} />{edu.location}</div>
                        <div className="flex items-center gap-1.5 text-text-muted text-xs sm:text-sm"><Calendar size={11} />{edu.period}</div>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm"><Star size={11} className="text-yellow-400" /><span className="text-yellow-400 font-bold">GPA: {edu.gpa}</span></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
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
                  <motion.div
                    key={idx}
                    variants={item}
                    whileHover={{ x: 5, boxShadow: "0 8px 24px rgba(245,158,11,0.12)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="p-4 rounded-2xl glass border border-border cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl shrink-0">{cert.icon}</span>
                      <div className="min-w-0">
                        <p className="text-text-primary text-sm font-bold leading-snug">{cert.title}</p>
                        <p className="text-text-muted text-xs mt-0.5 leading-snug">{cert.issuer}</p>
                        <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${
                          cert.status === "Completed"
                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                            : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                        }`}>
                          {cert.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
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
                <motion.div
                  key={idx}
                  variants={item}
                  whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(99,102,241,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 280, damping: 24 }}
                  className="p-5 sm:p-6 rounded-2xl glass border border-border"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl shrink-0">{l.icon}</span>
                    <div>
                      <p className="text-text-primary font-black text-base leading-snug">{l.role}</p>
                      <p className="text-primary-light text-sm font-semibold mt-0.5">{l.org}</p>
                      <div className="flex items-center gap-1.5 text-text-muted text-sm mt-1">
                        <Calendar size={12} />{l.period}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {l.bullets.map((b: string, i: number) => (
                      <li key={i} className="flex gap-2.5 text-text-secondary text-sm leading-relaxed">
                        <ArrowRight size={13} className="mt-0.5 text-primary/70 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Volunteer */}
            <div>
              <motion.h3 variants={item} className="text-lg font-bold text-text-secondary flex items-center gap-2 mb-4">
                <span>🤝</span> Volunteer Experience
              </motion.h3>
              <div className="space-y-4">
                {volunteer.map((v: any, idx: number) => (
                  <motion.div
                    key={idx}
                    variants={item}
                    whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(99,102,241,0.15)" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    className="p-4 sm:p-5 rounded-2xl glass border border-border"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-2xl shrink-0">{v.icon}</span>
                      <div>
                        <p className="text-text-primary font-black text-base leading-snug">{v.event}</p>
                        <p className="text-primary-light text-sm font-semibold mt-0.5">{v.role} <span className="text-text-muted font-normal">| {v.location}</span></p>
                        <p className="text-text-muted text-sm mt-1 font-medium">{v.date}</p>
                      </div>
                    </div>
                    {v.bullets && (
                      <ul className="space-y-2 mt-2">
                        {v.bullets.map((b: string, i: number) => (
                          <li key={i} className="flex gap-2.5 text-text-secondary text-sm leading-relaxed">
                            <ArrowRight size={13} className="mt-0.5 text-primary/70 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
