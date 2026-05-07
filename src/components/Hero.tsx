"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Brain, Code2, Cpu, Zap, Star } from "lucide-react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";

const { personal, stats } = portfolioData;

/* ── Particle canvas ─────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 80;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
        grad.addColorStop(0, `rgba(165,180,252,${p.alpha})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ── Floating corner shape ───────────────────────── */
function FloatingShape({ size, top, left, delay, color }: { size: number; top: string; left: string; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, left, width: size, height: size }}
      animate={{ y: [0, -18, 0], rotate: [0, 180, 360] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div
        className="w-full h-full rounded-lg opacity-20"
        style={{ background: `linear-gradient(135deg, ${color}, transparent)`, border: `1px solid ${color}40`, transform: "rotate(45deg)", boxShadow: `0 0 20px ${color}30` }}
      />
    </motion.div>
  );
}

/* ── Floating badge (around photo card) ─────────── */
function FloatingBadge({ text, icon, style, delay, small }: { text: string; icon: React.ReactNode; style: React.CSSProperties; delay: number; small?: boolean }) {
  return (
    <motion.div
      className={`absolute flex rounded-full glass border border-border/60 font-semibold text-text-secondary whitespace-nowrap z-20 shadow-lg ${small ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"}`}
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{ opacity: { delay: 0.8 + delay, duration: 0.4 }, scale: { delay: 0.8 + delay, duration: 0.4 }, y: { duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay: delay } }}
    >
      <span className="flex items-center gap-1 text-text-primary">{icon}{text}</span>
    </motion.div>
  );
}

/* ── 3D Photo Card with mouse spotlight ──────────── */
function PhotoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });
  const [photoError, setPhotoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22 });
  const sy = useSpring(my, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-14deg", "14deg"]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    setSpotPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  }, [mx, my]);

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
    setHovering(false);
  }, [mx, my]);

  return (
    <div className="relative flex items-center justify-center py-8">
      {/* Floating skill badges */}
      <FloatingBadge text="AI Engineer"    icon={<Cpu   size={isMobile ? 9 : 11} className="text-primary-light" />} small={isMobile} style={{ top: isMobile ? "6%"  : "8%",   left:  isMobile ? "3%"  : "-5%"                                }} delay={0}   />
      <FloatingBadge text="RAG Specialist" icon={<Brain size={isMobile ? 9 : 11} className="text-pink-400"     />} small={isMobile} style={{ top: isMobile ? "6%"  : "22%",  right: isMobile ? "3%"  : "-8%"                                }} delay={1.2} />
      <FloatingBadge text="Full-Stack"     icon={<Code2 size={isMobile ? 9 : 11} className="text-green-400"    />} small={isMobile} style={{ bottom: isMobile ? "3%" : "8%", left: isMobile ? "4%" : "-3%" }} delay={1.8} />
      <FloatingBadge text="GPA 3.84"       icon={<Star  size={isMobile ? 9 : 11} className="text-yellow-400"   />} small={isMobile} style={{ top: isMobile ? "52%" : "50%",  right: isMobile ? "3%"  : "-10%", transform: isMobile ? "none" : "translateY(-50%)" }} delay={2.4} />
      <FloatingBadge text="LangChain"      icon={<Zap   size={isMobile ? 9 : 11} className="text-accent"       />} small={isMobile} style={{ bottom: isMobile ? "24%" : "16%", right: isMobile ? "3%"  : "-5%"                                }} delay={0.6} />

      {/* 3D perspective wrapper */}
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-[300px] h-[440px] sm:w-[22.5rem] sm:h-[420px] lg:w-[24.5rem] lg:h-[520px] rounded-[2.25rem] cursor-pointer select-none"
      >
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-3xl p-px"
          style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.9), rgba(165,180,252,0.5), rgba(245,158,11,0.9))" }}
        >
          {/* Inner card */}
          <div className="relative h-full rounded-3xl bg-surface overflow-hidden">
            {/* Ambient background — near black */}
            <div className="absolute inset-0 bg-[#0a0a0a]" />

            {/* Mouse-tracking spotlight */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              animate={{ opacity: hovering ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: `radial-gradient(220px circle at ${spotPos.x}% ${spotPos.y}%, rgba(99,102,241,0.3), transparent 70%)`,
              }}
            />

            {/* ─── PHOTO / AVATAR ─────────────────────────────
                To use your photo:
                1. Copy your photo to: public/photo.jpg (or .png / .webp)
                2. The <Image> below will automatically display it.
                The "MM" avatar shows as fallback if the photo is missing.
            ──────────────────────────────────────────────── */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pb-16">
              <div className="relative">
                {!photoError ? (
                  <div className="relative w-40 h-40 sm:w-60 sm:h-60 rounded-full overflow-hidden border-2 border-primary/50 shadow-2xl">
                    <Image
                      src="/photo.png"
                      alt="Manas Mankar"
                      fill
                      className="object-cover"
                      onError={() => setPhotoError(true)}
                      priority
                    />
                  </div>
                ) : (
                  /* MM avatar fallback when photo.jpg is not found */
                  <div className="w-40 h-40 sm:w-60 sm:h-60 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 border-2 border-primary/50 flex items-center justify-center shadow-2xl">
                    <span className="text-6xl font-black gradient-text">MM</span>
                  </div>
                )}
                {/* Orbiting ring */}
                <motion.div
                  className="absolute -inset-3 rounded-full border border-primary/30 border-dashed"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary-light" />
                </motion.div>
              </div>

              <div className="text-center z-10">
                <p className="text-text-primary font-black text-xl sm:text-3xl lg:text-4xl">Manas Mankar</p>
                <p className="text-text-muted text-sm sm:text-base lg:text-lg mt-1">AI Engineer & Developer</p>
              </div>
            </div>

            {/* Available badge pinned to bottom */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-5 py-3 rounded-full glass border border-green-400/40 text-green-400 text-base font-semibold whitespace-nowrap shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              Available for hire
            </div>

            {/* Shimmer sweep on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: hovering ? 0.12 : 0, backgroundPosition: hovering ? ["200% 0", "-200% 0"] : "200% 0" }}
              transition={{ opacity: { duration: 0.3 }, backgroundPosition: { duration: 1.2, ease: "easeInOut" } }}
              style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)", backgroundSize: "200% 100%" }}
            />
          </div>
        </div>

      </motion.div>
    </div>
  );
}

/* ── Hero ────────────────────────────────────────── */
export default function Hero() {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Pure black background — crystal clean */}
      <div className="absolute inset-0 dot-grid opacity-8" />
      <ParticleCanvas />

      {/* Main content — split layout on desktop */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 md:pt-10 pb-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-8 items-center">

          {/* Left: text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center md:items-start text-center md:text-left md:pl-10 lg:pl-16 gap-4 max-w-xl mx-auto md:mx-0"
          >
            {/* Name */}
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
              <span className="text-text-primary">Hi, I&apos;m </span>
              <span className="text-white">Manas</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={itemVariants} className="text-2xl sm:text-3xl font-bold h-10">
              <TypeAnimation
                sequence={["AI Engineer", 2000, "Full-Stack Developer", 2000, "RAG Model Specialist", 2000, "LLM Builder", 2000]}
                wrapper="span"
                speed={50}
                className="gradient-text"
                repeat={Infinity}
              />
            </motion.div>

            {/* Specialization chip */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary-light text-sm font-semibold">
              <Brain size={14} />
              {personal.specialization}
            </motion.div>

            {/* Subtitle */}
            <motion.p variants={itemVariants} className="text-text-secondary text-base max-w-xl leading-relaxed">
              {personal.subtitle}
            </motion.p>

            {/* CTA and social links on one line */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center md:justify-start gap-3 py-1">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                View My Work
              </a>
              <a
                href="mailto:manasmahendra5@gmail.com"
                className="px-6 py-3 rounded-xl glass border border-border hover:border-primary/50 text-text-primary text-sm font-semibold transition-all duration-200 hover:bg-surface-2 hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                Get In Touch
              </a>
              {[
                { href: personal.github,              icon: <Github size={18} />,   label: "GitHub",   hover: "hover:text-text-primary hover:border-primary/40" },
                { href: personal.linkedin,            icon: <Linkedin size={18} />, label: "LinkedIn", hover: "hover:text-accent hover:border-accent/40" },
                { href: `mailto:${personal.email}`,   icon: <Mail size={18} />,     label: "Email",    hover: "hover:text-primary-light hover:border-primary/40" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`p-3 rounded-xl glass border border-border/50 text-text-secondary ${s.hover} transition-all duration-200 hover:scale-110 no-underline`}
                  style={{ textDecoration: "none" }}
                  aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-3 w-full max-w-md md:max-w-none">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.06, y: -3 }}
                  className="p-4 rounded-2xl glass border border-border/40 text-center"
                >
                  <div className="text-2xl font-black gradient-text mb-0.5">{stat.value}</div>
                  <div className="text-xs text-text-muted leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: interactive 3D photo card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            <PhotoCard />
          </motion.div>
        </div>

        {/* Mobile-only scroll indicator — sits between photo card and About */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="flex sm:hidden flex-col items-center gap-2 text-text-muted mt-2 mb-2 mx-auto"
          aria-label="Scroll down"
        >
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </div>

      {/* Desktop scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-text-muted z-10"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
