"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { GraduationCap, Zap, Bot, BrainCircuit, ArrowDown } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const { personal } = portfolioData;

const highlights = [
  { icon: <Bot size={22} />,          title: "AI Engineering",      desc: "RAG pipelines, LangChain, LLM orchestration with OpenAI, Anthropic & Google AI", color: "text-primary-light", bg: "bg-primary/10",  border: "border-primary/25" },
  { icon: <Zap size={22} />,          title: "Full-Stack Dev",       desc: "End-to-end MERN stack applications with scalable REST APIs and responsive UIs",   color: "text-accent",        bg: "bg-accent/10",   border: "border-accent/25"  },
  { icon: <BrainCircuit size={22} />, title: "RAG Specialist",       desc: "Specialized in Retrieval-Augmented Generation models and intelligent search systems", color: "text-pink-300",  bg: "bg-pink-500/10", border: "border-pink-500/25" },
  { icon: <GraduationCap size={22} />,title: "MS Computer Science",  desc: "Pace University, GPA 3.84/4.0 — graduating May 2026",                             color: "text-green-400",    bg: "bg-green-400/10",border: "border-green-400/25" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item      = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

export default function About() {
  const sectionRef = useRef(null);
  const ref        = useRef(null);
  const isInView   = useInView(ref, { once: true, margin: "-80px" });
  const [bioTyped, setBioTyped] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState<92 | 99>(92);

  useEffect(() => {
    const update = () => setTypingSpeed(window.innerWidth >= 640 ? 99 : 92 as 92 | 99);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Parallax: track scroll progress through the section ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth spring wrapping
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Individual layer speeds — slower = closer to camera
  const yLabel  = useTransform(smooth, [0, 1], ["0px",   "-30px"]);   // "About" label
  const yHeading= useTransform(smooth, [0, 1], ["0px",   "-55px"]);   // "Who I Am" h2
  const yBio    = useTransform(smooth, [0, 1], ["0px",   "-80px"]);   // bio paragraphs
  const yCards  = useTransform(smooth, [0, 1], ["0px",   "-50px"]);   // highlight cards
  const yOrb1   = useTransform(smooth, [0, 1], ["-20px", "60px"]);    // floating orb top-right
  const yOrb2   = useTransform(smooth, [0, 1], ["20px",  "-60px"]);   // floating orb bottom-left
  const opacityOrbs = useTransform(smooth, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">

      {/* ── Parallax ambient orbs ── */}
      <motion.div
        style={{ y: yOrb1, opacity: opacityOrbs }}
        className="pointer-events-none absolute -top-20 right-0 w-72 h-72 rounded-full"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-primary/8 blur-[90px]" />
      </motion.div>
      <motion.div
        style={{ y: yOrb2, opacity: opacityOrbs }}
        className="pointer-events-none absolute bottom-0 -left-16 w-64 h-64 rounded-full"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-accent/8 blur-[80px]" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "show" : "hidden"} variants={container}>

          {/* Header — fastest parallax layer */}
          <motion.div variants={item} style={{ y: yLabel }} className="text-center mb-2">
            <span className="section-label">About</span>
          </motion.div>
          <motion.div variants={item} style={{ y: yHeading }} className="text-center mb-7">
            <h2 className="text-4xl sm:text-5xl font-black text-text-primary mt-3">Who I Am</h2>
          </motion.div>

          {/* Body — mid-speed layer */}
          <motion.div style={{ y: yBio }} className="grid gap-8 items-start">
            <motion.div
              variants={item}
              className="space-y-8 w-full max-w-full mx-auto"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <div>
                <motion.h3
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="text-xl text-center sm:text-left sm:text-3xl font-black text-text-primary mb-4"
                >
                  Building the Future with AI
                </motion.h3>
                {/* Reserve full height so typing never causes layout shift */}
                <div className="relative">
                  <p className="text-text-secondary text-base text-center sm:text-left sm:text-xl leading-relaxed opacity-0 select-none pointer-events-none" aria-hidden="true">
                    {personal.bio}
                  </p>
                  {isInView && (
                    <TypeAnimation
                      key="bio-typing"
                      sequence={[personal.bio, () => setBioTyped(true)]}
                      wrapper="p"
                      speed={typingSpeed}
                      cursor={false}
                      repeat={0}
                      className="absolute top-0 left-0 right-0 text-text-secondary text-base text-center sm:text-left sm:text-xl leading-relaxed"
                    />
                  )}
                </div>
              </div>

              {/* Reserve full height for second paragraph too */}
              <div className="relative">
                <p className="text-text-secondary text-base text-center sm:text-left sm:text-xl leading-relaxed opacity-0 select-none pointer-events-none" aria-hidden="true">
                  {"I transitioned from Mechanical Engineering to Computer Science, bringing a systems-thinking mindset to software. I've shipped production applications, won a hackathon, and I'm actively building expertise in RAG architectures and LangChain pipelines."}
                </p>
                {bioTyped && (
                  <TypeAnimation
                    key="bio2-typing"
                    sequence={["I transitioned from Mechanical Engineering to Computer Science, bringing a systems-thinking mindset to software. I've shipped production applications, won a hackathon, and I'm actively building expertise in RAG architectures and LangChain pipelines."]}
                    wrapper="p"
                    speed={typingSpeed}
                    cursor={false}
                    repeat={0}
                    className="absolute top-0 left-0 right-0 text-text-secondary text-base text-center sm:text-left sm:text-xl leading-relaxed"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Highlight cards — slowest layer, feels closest */}
          <motion.div style={{ y: yCards }} className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  variants={item}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  custom={i}
                  whileHover={{ scale: 1.03, y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
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

        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex flex-col items-center gap-2 mt-10 cursor-pointer relative z-10"
        onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-text-muted">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-primary-light" />
        </motion.div>
      </motion.div>

    </section>
  );
}
