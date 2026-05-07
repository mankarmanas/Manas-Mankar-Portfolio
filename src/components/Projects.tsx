"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, Trophy, Calendar, ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const { projects } = portfolioData;

/* ── 3-D tilt wrapper (desktop) ──────────────────── */
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

/* ── Per-card animated wrapper ───────────────────── */
function ProjectCard({ project, idx, sectionInView }: {
  project: (typeof projects)[0];
  idx: number;
  sectionInView: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const fromLeft = idx % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -70 : 70, rotate: fromLeft ? -1.5 : 1.5, scale: 0.97 }}
      animate={isInView ? { opacity: 1, x: 0, rotate: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard>
        <motion.div
          whileHover={{ boxShadow: "0 8px 24px rgba(0,0,0,.5)" }}
          className={`relative p-5 sm:p-7 md:p-9 rounded-3xl glass overflow-hidden ${
            project.award ? "gradient-border-gold" : "gradient-border"
          }`}
        >
          {/* Static shimmer top line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 shimmer-line" />

          {/* Entry border sweep — animates from the entry side */}
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={isInView ? { scaleX: 1, opacity: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: fromLeft ? "left" : "right" }}
            className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-transparent pointer-events-none z-10"
          />

          {/* Entry glow flash */}
          <motion.div
            initial={{ opacity: 0.2 }}
            animate={isInView ? { opacity: 0 } : {}}
            transition={{ delay: 0.1, duration: 1 }}
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: fromLeft
                ? "linear-gradient(to right, rgba(99,102,241,0.12), transparent 60%)"
                : "linear-gradient(to left, rgba(99,102,241,0.12), transparent 60%)",
            }}
          />

          <div className="flex flex-col lg:flex-row gap-7">
            {/* ── Left: content ── */}
            <div className="flex-1 min-w-0">
              {/* Award badge */}
              {project.award && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full award-badge text-sm font-bold mb-4"
                >
                  <Trophy size={14} />
                  {project.award} — Pace University × MemVerge Hackathon
                </motion.div>
              )}

              {/* Index badge */}
              {!project.award && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border text-text-muted text-xs font-bold mb-4"
                >
                  Project {String(idx + 1).padStart(2, "0")}
                </motion.div>
              )}

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, x: fromLeft ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl md:text-3xl font-black text-text-primary mb-2 leading-tight"
              >
                {project.title.includes("–") ? (
                  <>
                    {project.title.split("–")[0].trim()}
                    <span className="gradient-text"> – {project.title.split("–")[1].trim()}</span>
                  </>
                ) : (
                  <span className="gradient-text">{project.title}</span>
                )}
              </motion.h3>

              {/* Subtitle + date */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="flex flex-wrap items-center gap-3 mb-4"
              >
                <p className="text-text-secondary text-base font-medium">{project.subtitle}</p>
                <span className="flex items-center gap-1.5 text-text-muted text-sm">
                  <Calendar size={12} /> {project.period}
                </span>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-text-secondary text-base leading-relaxed mb-5"
              >
                {project.description}
              </motion.p>

              {/* Bullet points — staggered */}
              <ul className="space-y-2.5 mb-5">
                {project.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: fromLeft ? -16 : 16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.45 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-3 text-text-secondary text-sm leading-relaxed"
                  >
                    <ArrowRight size={14} className="mt-0.5 text-primary-light shrink-0" />
                    {b}
                  </motion.li>
                ))}
              </ul>

              {/* Tech tags — pop in */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.55 + i * 0.04, duration: 0.3, type: "spring", stiffness: 300 }}
                    className="tech-tag"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              {/* Links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.65, duration: 0.4 }}
                className="flex gap-3"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-border hover:border-primary/50 text-text-secondary hover:text-text-primary text-sm font-semibold transition-all hover:scale-105"
                >
                  <Github size={16} /> View Code
                </a>
              </motion.div>
            </div>

            {/* ── Right: stats ── */}
            <div className="lg:w-52 grid grid-cols-2 lg:grid-cols-1 gap-3 shrink-0">
              {"stats" in project && Array.isArray(project.stats) && project.stats.map((s: { value: string; label: string }, i: number) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4, type: "spring", stiffness: 250 }}
                >
                  <StatBubble value={s.value} label={s.label} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────── */
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

          {/* Cards — each animates individually on scroll */}
          <div className="space-y-6">
            {projects.map((project, idx) => (
              <ProjectCard key={project.title} project={project} idx={idx} sectionInView={isInView} />
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
