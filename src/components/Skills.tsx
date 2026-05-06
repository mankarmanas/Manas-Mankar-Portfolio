"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";

const { skills } = portfolioData;

const categoryMeta: Record<string, { color: string; bg: string; border: string; dot: string; glow: string }> = {
  "Languages":      { color: "text-violet-300", bg: "bg-violet-500/10", border: "border-violet-500/20", dot: "bg-violet-400", glow: "rgba(167,139,250,0.15)" },
  "Frontend":       { color: "text-cyan-300",   bg: "bg-cyan-500/10",   border: "border-cyan-500/20",   dot: "bg-cyan-400",   glow: "rgba(34,211,238,0.15)"  },
  "Backend":        { color: "text-blue-300",   bg: "bg-blue-500/10",   border: "border-blue-500/20",   dot: "bg-blue-400",   glow: "rgba(96,165,250,0.15)"  },
  "Databases":      { color: "text-emerald-300",bg: "bg-emerald-500/10",border: "border-emerald-500/20",dot: "bg-emerald-400",glow: "rgba(52,211,153,0.15)"  },
  "AI & ML":        { color: "text-pink-300",   bg: "bg-pink-500/10",   border: "border-pink-500/20",   dot: "bg-pink-400",   glow: "rgba(244,114,182,0.15)" },
  "DevOps & Tools": { color: "text-orange-300", bg: "bg-orange-500/10", border: "border-orange-500/20", dot: "bg-orange-400", glow: "rgba(251,146,60,0.15)"  },
  "Design":         { color: "text-fuchsia-300",bg: "bg-fuchsia-500/10",border: "border-fuchsia-500/20",dot: "bg-fuchsia-400",glow: "rgba(232,121,249,0.15)" },
  "Cloud":          { color: "text-yellow-300", bg: "bg-yellow-500/10", border: "border-yellow-500/20", dot: "bg-yellow-400", glow: "rgba(250,204,21,0.15)"  },
};

// Group skills by category
const skillsByCategory = (skills as any[]).reduce((acc: any, skill: any) => {
  if (!acc[skill.category]) acc[skill.category] = [];
  acc[skill.category].push(skill);
  return acc;
}, {});

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22,1,0.36,1] } },
};

/* ── Each card watches itself ────────────────────── */
function SkillCard({ category, categorySkills }: { category: string; categorySkills: any[] }) {
  const cardRef = useRef(null);
  // once: true so it fires once per card when it enters viewport
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  const m = categoryMeta[category] ?? categoryMeta["Languages"];

  const getGradientColor = (dot: string) => {
    if (dot === "bg-violet-400")  return "#a78bfa";
    if (dot === "bg-cyan-400")    return "#22d3ee";
    if (dot === "bg-blue-400")    return "#60a5fa";
    if (dot === "bg-emerald-400") return "#34d399";
    if (dot === "bg-pink-400")    return "#f472b6";
    if (dot === "bg-orange-400")  return "#fb923c";
    if (dot === "bg-fuchsia-400") return "#e879f9";
    return "#fbbf24";
  };

  const color = getGradientColor(m.dot);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
      whileHover={{ y: -6, boxShadow: `0 20px 48px ${m.glow}` }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="p-6 rounded-2xl bg-surface border border-border"
    >
      {/* Category header */}
      <div className="flex items-center gap-2 mb-6">
        <div className={`w-2.5 h-2.5 rounded-full ${m.dot} shadow-lg`} style={{ boxShadow: `0 0 8px ${m.glow}` }} />
        <h3 className={`text-sm font-bold ${m.color}`}>{category}</h3>
      </div>

      {/* Skills with proficiency bars */}
      <div className="space-y-4">
        {(categorySkills as any[]).map((skill: any, idx: number) => (
          <div key={skill.name} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className={`text-sm font-medium ${m.color}`}>{skill.name}</span>
              <motion.span
                className="text-xs font-semibold text-text-muted"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 + 0.3 }}
              >
                {skill.proficiency}%
              </motion.span>
            </div>

            {/* Bar track */}
            <div className="h-2 rounded-full bg-surface-2 border border-border/50 overflow-hidden relative">
              {/* Filled bar — slides from 0 to proficiency when THIS card enters view */}
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.08 + 0.1 }}
              />

              {/* Slider dot */}
              <motion.div
                className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full ${m.dot} shadow-lg border-2 border-surface`}
                style={{ boxShadow: `0 0 12px ${color}` }}
                initial={{ left: 0 }}
                animate={isInView ? { left: `${skill.proficiency}%` } : { left: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.08 + 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────── */
export default function Skills() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
          variants={headerVariants}
          className="text-center mb-8"
        >
          <span className="section-label">Skills</span>
          <h2 className="text-4xl sm:text-5xl font-black text-text-primary mt-3">Tech Proficiency</h2>
          <p className="text-text-secondary text-xl mt-4 max-w-xl mx-auto">
            Tools and technologies I master at 80%+ proficiency
          </p>
        </motion.div>

        {/* Specialization callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22,1,0.36,1] }}
          className="mb-8 p-4 rounded-2xl animated-border glass text-center"
        >
          <p className="text-xl font-semibold text-text-primary">
            🧠 Specialized in{" "}
            <span className="gradient-text font-black">RAG Models</span>,{" "}
            <span className="text-pink-300 font-bold">LangChain</span>, and{" "}
            <span className="text-accent font-bold">LLM Orchestration</span>
          </p>
        </motion.div>

        {/* Skills Grid — each card has its own InView trigger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <SkillCard key={category} category={category} categorySkills={categorySkills as any[]} />
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
          className="mt-10 p-7 rounded-2xl glass border border-border text-center"
        >
          <p className="text-text-secondary text-xl">
            Currently deepening expertise in{" "}
            <span className="text-primary-light font-bold">LangChain pipelines</span>,{" "}
            <span className="text-accent font-bold">RAG architectures</span>, and{" "}
            <span className="text-pink-300 font-bold">AI agent systems</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
