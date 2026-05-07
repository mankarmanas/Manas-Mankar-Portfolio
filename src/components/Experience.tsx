"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, MapPin, Calendar, ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const { experience } = portfolioData;

/* ── Desktop Card — per-card scroll-triggered ─────── */
function DesktopJobCard({ job, idx }: { job: (typeof experience)[0]; idx: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const isRight = idx % 2 === 0;

  return (
    <div ref={ref} className="relative grid grid-cols-2 mb-10 items-start">

      {/* Timeline dot — pops in with pulse ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.05, type: "spring", stiffness: 320, damping: 18 }}
        className="absolute left-1/2 top-9 z-10 -translate-x-1/2"
      >
        <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-[0_0_16px_rgba(99,102,241,0.85)]" />
        <motion.div
          animate={isInView ? { scale: [1, 2.4, 1], opacity: [0.7, 0, 0.7] } : {}}
          transition={{ delay: 0.3, duration: 1.8, repeat: 3, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-primary/40"
        />
      </motion.div>

      {/* Card slot — alternating sides */}
      {isRight ? (
        <>
          <div />
          <div className="pl-10">
            <DesktopCardInner job={job} isInView={isInView} fromLeft={false} />
          </div>
        </>
      ) : (
        <>
          <div className="pr-10">
            <DesktopCardInner job={job} isInView={isInView} fromLeft={true} />
          </div>
          <div />
        </>
      )}
    </div>
  );
}

/* ── Inner card content with all animations ───────── */
function DesktopCardInner({
  job, isInView, fromLeft,
}: {
  job: (typeof experience)[0];
  isInView: boolean;
  fromLeft: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -70 : 70, scale: 0.96, rotate: fromLeft ? -0.8 : 0.8 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: "0 24px 56px rgba(99,102,241,0.22)" }}
      whileTap={{ scale: 0.99 }}
      className="relative rounded-2xl glass border border-border group overflow-hidden"
      style={{ borderLeft: fromLeft ? "2px solid rgba(99,102,241,0.45)" : undefined, borderRight: !fromLeft ? "2px solid rgba(99,102,241,0.45)" : undefined }}
    >
      {/* Shimmer line sweeps from entry side */}
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        animate={isInView ? { scaleX: 1, opacity: 0.8 } : {}}
        transition={{ delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: fromLeft ? "left" : "right" }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary via-accent to-transparent pointer-events-none z-10"
      />

      {/* Entry glow flash */}
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={isInView ? { opacity: 0 } : {}}
        transition={{ delay: 0.1, duration: 1.1 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: fromLeft
            ? "linear-gradient(to right, rgba(99,102,241,0.14), transparent 65%)"
            : "linear-gradient(to left, rgba(99,102,241,0.14), transparent 65%)",
        }}
      />

      {/* Hover top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: fromLeft ? -20 : 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-start justify-between gap-4 mb-4"
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.18, type: "spring", stiffness: 300, damping: 18 }}
              className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors duration-200"
            >
              <Briefcase size={18} className="text-primary-light" />
            </motion.div>
            <div>
              <h3 className="font-black text-text-primary text-xl leading-tight">{job.role}</h3>
              <p className="text-accent font-semibold text-base mt-0.5">{job.company}</p>
            </div>
          </div>
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.28, type: "spring", stiffness: 260 }}
            className="px-2.5 py-1 rounded-full glass border border-border text-text-muted text-xs font-medium shrink-0"
          >
            {job.type}
          </motion.span>
        </motion.div>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.32, duration: 0.4 }}
          className="flex flex-wrap gap-4 mb-4"
        >
          <div className="flex items-center gap-1.5 text-text-muted text-sm">
            <Calendar size={12} /> {job.period}
          </div>
          <div className="flex items-center gap-1.5 text-text-muted text-sm">
            <MapPin size={12} /> {job.location}
          </div>
        </motion.div>

        {/* Bullets — staggered from entry side */}
        <ul className="space-y-2.5 mb-4">
          {job.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: fromLeft ? -18 : 18 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.38 + i * 0.08, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-2.5 text-text-secondary text-base leading-relaxed"
            >
              <ArrowRight size={13} className="mt-1 text-primary/70 shrink-0" />
              {b}
            </motion.li>
          ))}
        </ul>

        {/* Tech tags — spring pop */}
        <div className="flex flex-wrap gap-1.5">
          {job.tech.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.52 + i * 0.05, duration: 0.3, type: "spring", stiffness: 300 }}
              className="tech-tag-warm"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Mobile Card — scroll-triggered, unique animation ─ */
function MobileJobCard({ job, index }: { job: (typeof experience)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });

  return (
    <div ref={ref} className="relative pl-8 mb-8">

      {/* Glowing pulsing timeline dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.05, type: "spring", stiffness: 300, damping: 18 }}
        className="absolute left-0 top-6 -translate-x-1/2 z-10"
      >
        <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-[0_0_14px_rgba(99,102,241,0.9)]" />
        <motion.div
          animate={isInView ? { scale: [1, 2, 1], opacity: [0.6, 0, 0.6] } : {}}
          transition={{ delay: 0.3, duration: 1.6, repeat: 3, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-primary/40"
        />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl glass border border-border/70 overflow-hidden"
        style={{ borderLeft: "2px solid rgba(99,102,241,0.5)" }}
      >
        {/* Shimmer line sweeping left→right on entry */}
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={isInView ? { scaleX: 1, opacity: 0.7 } : {}}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary via-accent to-transparent"
        />

        {/* Entry glow flash */}
        <motion.div
          initial={{ opacity: 0.25 }}
          animate={isInView ? { opacity: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.9 }}
          className="absolute inset-0 bg-primary/8 pointer-events-none rounded-2xl"
        />

        <div className="p-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start justify-between gap-2 mb-3"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                <Briefcase size={15} className="text-primary-light" />
              </div>
              <div>
                <h3 className="font-black text-text-primary text-base leading-tight">{job.role}</h3>
                <p className="text-accent font-semibold text-sm mt-0.5">{job.company}</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full glass border border-border text-text-muted text-[10px] font-medium shrink-0 mt-1">
              {job.type}
            </span>
          </motion.div>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-wrap gap-3 mb-3"
          >
            <div className="flex items-center gap-1 text-text-muted text-xs">
              <Calendar size={10} /> {job.period}
            </div>
            <div className="flex items-center gap-1 text-text-muted text-xs">
              <MapPin size={10} /> {job.location}
            </div>
          </motion.div>

          {/* Bullets — staggered slide in */}
          <ul className="space-y-2 mb-3">
            {job.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -14 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-2 text-text-secondary text-xs leading-relaxed"
              >
                <ArrowRight size={11} className="mt-0.5 text-primary/70 shrink-0" />
                {b}
              </motion.li>
            ))}
          </ul>

          {/* Tech tags — pop in */}
          <div className="flex flex-wrap gap-1.5">
            {job.tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.3, type: "spring", stiffness: 300 }}
                className="tech-tag-warm"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────── */
export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full text-center mb-10"
        >
          <span className="section-label">Experience</span>
          <h2 className="text-4xl sm:text-5xl font-black text-text-primary mt-3">
            Work Experience
          </h2>
        </motion.div>

        {/* ── MOBILE layout (hidden on md+) ── */}
        <div className="block md:hidden relative">
          {/* Glowing left vertical timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(99,102,241,0.9) 0%, rgba(99,102,241,0.4) 70%, transparent 100%)",
              boxShadow: "0 0 8px rgba(99,102,241,0.5)",
            }}
          />
          {experience.map((job, idx) => (
            <MobileJobCard key={idx} job={job} index={idx} />
          ))}
        </div>

        {/* ── DESKTOP layout — per-card scroll-triggered at 60% ── */}
        <div className="hidden md:block">
          <div className="relative w-full">
            {/* Center vertical timeline line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, rgba(99,102,241,0.8) 0%, rgba(99,102,241,0.35) 60%, transparent 100%)",
                boxShadow: "0 0 8px rgba(99,102,241,0.3)",
              }}
            />
            {experience.map((job, idx) => (
              <DesktopJobCard key={idx} job={job} idx={idx} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
