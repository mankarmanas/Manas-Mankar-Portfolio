"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, GraduationCap, Zap, Bot, BrainCircuit } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const { personal } = portfolioData;

const highlights = [
  { icon: <Bot size={22} />,         title: "AI Engineering",       desc: "RAG pipelines, LangChain, LLM orchestration with OpenAI, Anthropic & Google AI", color: "text-primary-light", bg: "bg-primary/10",  border: "border-primary/25" },
  { icon: <Zap size={22} />,         title: "Full-Stack Dev",        desc: "End-to-end MERN stack applications with scalable REST APIs and responsive UIs",   color: "text-accent",        bg: "bg-accent/10",   border: "border-accent/25"  },
  { icon: <BrainCircuit size={22} />, title: "RAG Specialist",       desc: "Specialized in Retrieval-Augmented Generation models and intelligent search systems", color: "text-pink-300",    bg: "bg-pink-500/10", border: "border-pink-500/25" },
  { icon: <GraduationCap size={22} />,title: "MS Computer Science",  desc: "Pace University, GPA 3.84/4.0 — graduating May 2026",                             color: "text-green-400",    bg: "bg-green-400/10",border: "border-green-400/25" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22,1,0.36,1] } } };

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding relative">

      <div className="max-w-6xl mx-auto px-6">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "show" : "hidden"} variants={container}>

          {/* Header */}
          <motion.div variants={item} className="text-center mb-7">
            <span className="section-label">About</span>
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary mt-3">Who I Am</h2>
          </motion.div>

          <div className="grid gap-8 items-start">
            {/* Right: Text */}
            <motion.div variants={item} className="space-y-8 w-full max-w-full mx-auto" whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 120, damping: 18 }}>
              <div>
                <motion.h3 whileHover={{ y: -4 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="text-2xl sm:text-3xl font-black text-text-primary mb-4">
                  Building the Future with AI
                </motion.h3>
                <p className="text-text-secondary text-xl leading-relaxed">
                  {personal.bio}
                </p>
              </div>

              <p className="text-text-secondary text-xl leading-relaxed">
                I transitioned from{" "}
                <span className="text-text-primary">Mechanical Engineering</span> to
                Computer Science, bringing a systems-thinking mindset to software. I&apos;ve shipped
                production applications, won a{" "}
                <span className="text-primary-light font-bold">hackathon</span>, and I&apos;m
                actively building expertise in{" "}
                <span className="text-pink-300 font-bold">RAG architectures</span> and{" "}
                <span className="text-accent font-bold">LangChain pipelines</span>.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    variants={item}
                    whileHover={{ scale: 1.03, y: -4, boxShadow: "0 16px 36px rgba(0,0,0,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={`flex items-start gap-3 p-4 rounded-2xl ${h.bg} border ${h.border} cursor-pointer`}
                  >
                    <div className={`mt-0.5 ${h.color} shrink-0`}>{h.icon}</div>
                    <div>
                      <div className="font-bold text-text-primary text-base">{h.title}</div>
                      <div className="text-text-muted text-sm mt-0.5 leading-snug">{h.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
