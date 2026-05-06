"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, Trophy, Calendar, ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const { projects } = portfolioData;

/* ── 3-D tilt wrapper ────────────────────────────── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 22 });
  const sy = useSpring(my, { stiffness: 200, damping: 22 });
  const rotX = useTransform(sy, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotY = useTransform(sx, [-0.5, 0.5], ["-8deg", "8deg"]);

  return (
    <div
      className="perspective-1200"
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      <motion.div
        ref={ref}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="transition-shadow duration-300"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Stat bubble ─────────────────────────────────── */
function StatBubble({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.06, boxShadow: "0 8px 24px rgba(99,102,241,0.2)" }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface-2/70 border border-border/60 min-w-[78px] cursor-default"
    >
      <span className="text-xl font-black gradient-text leading-none">{value}</span>
      <span className="text-xs text-text-muted mt-1 text-center leading-tight">{label}</span>
    </motion.div>
  );
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="projects" className="section-padding relative">

      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "show" : "hidden"} variants={container}>

          {/* Header */}
          <motion.div variants={item} className="text-center mb-8">
            <span className="section-label">Projects</span>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary mt-3">What I&apos;ve Built</h2>
            <p className="text-text-secondary text-lg mt-3 max-w-xl mx-auto">
              Production-grade applications — from hackathon wins to full pharmacy management systems
            </p>
          </motion.div>

          {/* All three projects — identical card layout */}
          <div className="space-y-6">
            {projects.map((project, idx) => (
              <motion.div key={project.title} variants={item}>
                <TiltCard>
                  <motion.div
                    whileHover={{ boxShadow: "0 8px 24px rgba(0,0,0,.5)" }}
                    className={`relative p-5 sm:p-7 md:p-9 rounded-3xl glass overflow-hidden ${
                      project.award ? "gradient-border-gold" : "gradient-border"
                    }`}
                  >
                    {/* Shimmer top line */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 shimmer-line" />


                    <div className="flex flex-col lg:flex-row gap-7">
                      {/* ── Left: content ── */}
                      <div className="flex-1 min-w-0">
                        {/* Award badge */}
                        {project.award && (
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full award-badge text-sm font-bold mb-4">
                            <Trophy size={14} />
                            {project.award} — Pace University × MemVerge Hackathon
                          </div>
                        )}

                        {/* Index badge for non-award projects */}
                        {!project.award && (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border text-text-muted text-xs font-bold mb-4">
                            Project {String(idx + 1).padStart(2, "0")}
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-black text-text-primary mb-2 leading-tight">
                          {project.title.includes("–") ? (
                            <>
                              {project.title.split("–")[0].trim()}
                              <span className="gradient-text"> – {project.title.split("–")[1].trim()}</span>
                            </>
                          ) : (
                            <span className="gradient-text">{project.title}</span>
                          )}
                        </h3>

                        {/* Subtitle + date */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <p className="text-text-secondary text-base font-medium">{project.subtitle}</p>
                          <span className="flex items-center gap-1.5 text-text-muted text-sm">
                            <Calendar size={12} /> {project.period}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-text-secondary text-base leading-relaxed mb-5">
                          {project.description}
                        </p>

                        {/* Bullet points */}
                        <ul className="space-y-2.5 mb-5">
                          {project.bullets.map((b, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -14 }}
                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 + i * 0.06 }}
                              className="flex gap-3 text-text-secondary text-sm leading-relaxed"
                            >
                              <ArrowRight size={14} className="mt-0.5 text-primary-light shrink-0" />
                              {b}
                            </motion.li>
                          ))}
                        </ul>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.tech.map((t) => (
                            <span key={t} className="tech-tag">{t}</span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-border hover:border-primary/50 text-text-secondary hover:text-text-primary text-sm font-semibold transition-all hover:scale-105"
                          >
                            <Github size={16} /> View Code
                          </a>
                        </div>
                      </div>

                      {/* ── Right: stats ── */}
                      <div className="lg:w-52 grid grid-cols-2 lg:grid-cols-1 gap-3 shrink-0">
                        {"stats" in project && Array.isArray(project.stats) && project.stats.map((s: { value: string; label: string }) => (
                          <StatBubble key={s.label} value={s.value} label={s.label} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div variants={item} className="mt-10 text-center">
            <a
              href="https://github.com/mankarmanas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl glass border border-border hover:border-primary/50 text-text-secondary hover:text-text-primary text-base font-semibold transition-all hover:scale-105"
            >
              <Github size={18} />
              See All Projects on GitHub
              <ExternalLink size={14} />
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
