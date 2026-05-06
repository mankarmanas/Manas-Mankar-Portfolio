"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, MapPin, Calendar, ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const { experience } = portfolioData;

/* ── Variants ─────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const headerVariant = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariant = {
  hidden: (isRight: boolean) => ({
    opacity: 0,
    x: isRight ? 55 : -55,
  }),
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Card ─────────────────────────────────────────── */
function JobCard({ job }: { job: (typeof experience)[0] }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(99,102,241,0.18)" }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className="relative p-5 sm:p-8 rounded-2xl glass border border-border group overflow-hidden"
    >
      {/* Hover shimmer top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors duration-200">
            <Briefcase size={18} className="text-primary-light" />
          </div>
          <div>
            <h3 className="font-black text-text-primary text-xl leading-tight">{job.role}</h3>
            <p className="text-primary-light font-semibold text-base mt-0.5">{job.company}</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full glass border border-border text-text-muted text-xs font-medium shrink-0">
          {job.type}
        </span>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-1.5 text-text-muted text-sm">
          <Calendar size={12} /> {job.period}
        </div>
        <div className="flex items-center gap-1.5 text-text-muted text-sm">
          <MapPin size={12} /> {job.location}
        </div>
      </div>

      {/* Bullets */}
      <ul className="space-y-2.5 mb-4">
        {job.bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5 text-text-secondary text-base leading-relaxed">
            <ArrowRight size={13} className="mt-1 text-primary/70 shrink-0" />
            {b}
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {job.tech.map((t) => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────── */
export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={container}
        >
          {/* Header — decoupled from card variant propagation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full text-center mb-8"
          >
            <span className="section-label">Experience</span>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary mt-3">
              Work Experience
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative w-full">

            {/* Center vertical line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(29,78,216,0.8) 0%, rgba(29,78,216,0.35) 60%, transparent 100%)",
              }}
            />

            {experience.map((job, idx) => {
              const isRight = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  custom={isRight}
                  variants={cardVariant}
                  className="relative grid grid-cols-1 md:grid-cols-2 mb-7 items-start"
                >
                  {/* Timeline dot — sits exactly on the center line */}
                  <div className="absolute left-1/2 top-8 z-10 -translate-x-1/2 hidden md:flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-background" />
                  </div>

                  {isRight ? (
                    <>
                      {/* Left spacer */}
                      <div className="hidden md:block" />
                      {/* Card on the right, padded away from center dot */}
                      <div className="md:pl-8">
                        <JobCard job={job} />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Card on the left, padded away from center dot */}
                      <div className="md:pr-8">
                        <JobCard job={job} />
                      </div>
                      {/* Right spacer */}
                      <div className="hidden md:block" />
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
